/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// import FormControlLabel from '@mui/material/FormControlLabel';

import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { useTheme } from '@mui/material/styles';
import { Box, Grid, Alert, Snackbar, Skeleton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { createCabRequest } from 'src/api/cab_service';
import { ATTPL_TMS_SOCKET_API } from 'src/config-global';
import { getVehicleOptions } from 'src/api/delivery_service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';


// ----------------------------------------------------------------------

export default function CabNewEditForm() {
  const [coordinates, setCoordinates] = useState({
    pickupLocationLat: null,
    pickupLocationLong: null,
    dropoffLocationLat: null,
    dropoffLocationLong: null,
  });

  const [loading, setLoading] = useState(false);

  const [showDistanceData, setShowDistanceData] = useState(false);

  // const [directionResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  // const mdUp = useResponsive('up', 'md');
  // map open
  const [open, setOpen] = useState({ pickupLocationMap: false, dropLocationMap: false });
  const { user } = useAuthContext();

  const [buttonDisable, setbuttonDisable] = useState(false);

  const [vehicleOptions, setVehicleOption] = useState([]);

  console.log(vehicleOptions);

  const router = useRouter();

  const { userId } = user;

  // default value
  const defaultValues = useMemo(
    () => ({
      pickupLocationLat: '',
      pickupLocationLong: '',
      dropoffLocationLat: '',
      dropoffLocationLong: '',
      vehicleType: null,
    }),
    []
  );

  // schema
  const NewJobSchema = Yup.object().shape({
    vehicleType: Yup.mixed('Please Select Vehicle Type'),
  });

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const value = watch();

  // socket Connection
  const socketRef = useRef(null);
  const [socketConnected, setSocketConnected] = useState(false);

  useEffect(() => {
    const initializeSocket = () => {
      try {
        if (!socketRef.current) {
          socketRef.current = io(`${ATTPL_TMS_SOCKET_API}`, {
            query: { userId },
            reconnection: true,
            reconnectionAttempts: 5,
            reconnectionDelay: 1000,
          });

          socketRef.current.on('connect', () => {
            console.log('Socket connected successfully');
            setSocketConnected(true);
          });

          socketRef.current.on('disconnect', () => {
            console.log('Socket disconnected');
            setSocketConnected(false);
          });

          socketRef.current.on('connect_error', (error) => {
            console.error('Socket connection error:', error);
            setSocketConnected(false);
          });
        }
      } catch (error) {
        console.error('Error initializing socket:', error);
        setSocketConnected(false);
      }
    };

    initializeSocket();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [userId]);

  useEffect(() => {
    if (socketRef.current) {
      console.log('component rerender');
      socketRef.current.on('cabRequestAccepted', (data) => {
        console.log(data);

        enqueueSnackbar('Cab Request Accepted Driver', { variant: 'success' });
        const cab_request_id = data?.cabTripDetails?.cab_request_id;
        reset();
        if (cab_request_id) {
          router.push(paths.dashboard.cabService.details(cab_request_id));
        } else {
          router.push(paths.dashboard.cabService.list);
        }
      });

      socketRef.current.on('noDriver', (data) => {
        setbuttonDisable(false);
        enqueueSnackbar(`Driver Not Available For Vehicle Type ${data.vehicleType}.`, {
          variant: 'warning',
        });
        console.log(data);
      });
    }
  }, [socketRef, enqueueSnackbar, router, reset]);

  // Use socketConnected state to check if socket is ready
  useEffect(() => {
    if (socketConnected) {
      console.log('Socket is ready to use');
      // You can perform any actions that require socket connection here
    }
  }, [socketConnected]);

  function onConfirm(selectedLocation, location) {
    const { lat, lng } = selectedLocation;

    if (location === 'pickup') {
      setValue('pickupLocationLat', lat);
      setValue('pickupLocationLong', lng);
    } else if (location === 'drop') {
      setValue('dropoffLocationLat', lat);
      setValue('dropoffLocationLong', lng);
    }
    setOpen({ ...open, [`${location}LocationMap`]: false });
    setLoading(false);
  }

  useEffect(() => {
    const successCallback = (position) => {
      const { latitude, longitude } = position.coords;
      if (
        !coordinates.dropoffLocationLat ||
        !coordinates.dropoffLocationLong ||
        !coordinates.pickupLocationLat ||
        !coordinates.pickupLocationLong
      ) {
        setCoordinates({
          dropoffLocationLat: latitude,
          dropoffLocationLong: longitude,
          pickupLocationLat: latitude,
          pickupLocationLong: longitude,
        });
        setOpen({ dropLocationMap: false, pickupLocationMap: false });
      }
      setLoading(false);
    };

    const errorCallback = (error) => {
      console.error('Error retrieving geolocation:', error);
      setLoading(false);
    };

    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(successCallback, errorCallback);
      return () => navigator.geolocation.clearWatch(watchId);
    }
    console.error('Geolocation is not supported by this browser.');

    return false;
  }, [coordinates]); // Ensure useEffect runs only when coordinates change


  const geocodeSelectedPlace = async (selectedPlace,type) => {
    try {
      console.log(selectedPlace)
      const geocoder = new window.google.maps.Geocoder();
      const result = await new Promise((resolve, reject) => {
        geocoder.geocode({ placeId: selectedPlace.value.place_id }, (results, status) => {
          if (status === 'OK') {
            resolve(results[0]);
          } else {
            reject(status);
          }
        });
      });

      const { lat, lng } = result.geometry.location;
      if (type === 'pickup') {
        setLoading(false);
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          pickupLocationLat: lat(),
          pickupLocationLong: lng(),
        }));
        setValue('pickupLocationLat', lat());
        setValue('pickupLocationLong', lng());
      } else {
        setLoading(false);
        setCoordinates((prevCoordinates) => ({
          ...prevCoordinates,
          dropoffLocationLat: lat(),
          dropoffLocationLong: lng(),
        }));
        setValue('dropoffLocationLat', lat());
        setValue('dropoffLocationLong', lng());
      }
     
    } catch (error) {
      console.error('Error geocoding place:', error);
    }
  };


  const handleSelectLocation = useCallback((coords, location) => {
    setLoading(true);   
    if (location === 'pickup') {
      setLoading(false);
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        pickupLocationLat: coords.lat,
        pickupLocationLong: coords.lng,
      }));
    } else {
      setLoading(false);
      setCoordinates((prevCoordinates) => ({
        ...prevCoordinates,
        dropoffLocationLat: coords.lat,
        dropoffLocationLong: coords.lng,
      }));
    }
  }, []);

  
  function handleChooseMap(location) {
    setLoading(true);
    if (location === 'pickup' && coordinates.pickupLocationLat && coordinates.pickupLocationLong) {
      setOpen({ ...open, pickupLocationMap: true });
    } else if (
      location === 'drop' &&
      coordinates.dropoffLocationLat &&
      coordinates.dropoffLocationLong
    ) {
      setShowDistanceData(true);
      setOpen({ ...open, dropLocationMap: true });
    }
    setLoading(false);
  }

  // // vehicle Option
  // const vehicleOptions = [
  //   { vehicle: 'Bike', rentPerKm: 10, baseCharege: 10, seatingCapacity: 1 },
  //   { vehicle: 'Auto', rentPerKm: 18, baseCharege: 30, seatingCapacity: 3 },
  //   { vehicle: 'Mini Prime', rentPerKm: 25, baseCharege: 50, seatingCapacity: 4 },
  //   { vehicle: 'Sedan Prime', rentPerKm: 22, baseCharege: 50, seatingCapacity: 4 },
  //   { vehicle: 'SUV Prime', rentPerKm: 16, baseCharege: 50, seatingCapacity: 6 },
  // ];

  async function fetchCabsVehicleOption() {
    try {
      const res = await getVehicleOptions('Cab Service');
      if (res && res.length) {
        setVehicleOption(res);
      }
    } catch (error) {
      console.log('Error while fetching list all vehicle option for cab', error);
    }
  }

  useEffect(() => {
    fetchCabsVehicleOption();
  }, []);

  const calculateRoute = useCallback(async () => {
    console.log('calculate route called');

    const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } =
      coordinates;

    if (!pickupLocationLat || !pickupLocationLong || !dropoffLocationLat || !dropoffLocationLong) {
      console.log('calculate route return');
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: pickupLocationLat, lng: pickupLocationLong },
        destination: { lat: dropoffLocationLat, lng: dropoffLocationLong },
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: 'pessimistic',
        },
        provideRouteAlternatives: true,
      });

      // setDirectionsResponse(results);
      setLoading(false);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Route Finding Error:', error);
      enqueueSnackbar('Route Finding is not supported by this browser.', { variant: 'error' });
    }
  }, [coordinates, enqueueSnackbar, setDistance, setDuration, setLoading]);

  useEffect(() => {
    if (
      value.pickupLocationLat &&
      value.pickupLocationLong &&
      value.dropoffLocationLat &&
      value.dropoffLocationLong
    ) {
      calculateRoute();
    }
  }, [calculateRoute, value]);

  const onSubmit = handleSubmit(async (data) => {
    const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } =
    data;
    if (!pickupLocationLat || !pickupLocationLong) {
      enqueueSnackbar('Please Select Pickup Location', { variant: 'error' });
      return false;
    }

    if (!dropoffLocationLat || !dropoffLocationLong) {
      enqueueSnackbar('Please Select Drop Location', { variant: 'error' });
      return false;
    }

    try {
      if (socketConnected) {
        const response = await createCabRequest(data);

        if (response.success) {
          console.log(response.data);

          // enqueueSnackbar('Create success!', { variant: 'error' });
          // // reset();
          // // router.push(paths.dashboard.deliveryService.list);
          // // return true;
          // if (socketConnected) {
          const dataTosend = {
            cabRequestId: response.data.cabRequestId,
            vehicleType: data.vehicleType,
          };
          socketRef.current.emit('cabBookRequest', dataTosend);
          enqueueSnackbar('Cab Request Added Waiting For Driver...', { variant: 'success' });
          // setbuttonDisable(true);
        }
      } else {
        console.log('Socket is not connected. Unable to emit event.');
        enqueueSnackbar('Delivery Item Creation Failed', { variant: 'error' });
      }
    } catch (error) {
      console.error('Delivery Service Error:', error);
      enqueueSnackbar('An error occurred', { variant: 'error' });
    }

    return false;
  });

  const renderNewForm = (
    <Grid item xs={12} md={4} sx={{height:'100%'}}>
      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Card>
          <Stack spacing={3} sx={{ p: 3 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Request For:</Typography>
              <RHFAutocomplete
                name="vehicleType"
                label="Vehicle Type"
                placeholder="Vehicle Type"
                fullWidth
                value={value.vehicleType}
                options={vehicleOptions.map((option) => option)}
                getOptionLabel={(option) => `${option.vehicleType}`}
                onChange={(event, item) => setValue('vehicleType', item)}
              />
              {value.vehicleType && (
                <Typography variant="string">
                  Seating Capacity: {value.vehicleType.seatingCapacity} Person
                </Typography>
              )}
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Pickup Location:</Typography>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: value.source,
                  onChange: (val) =>  geocodeSelectedPlace(val,"pickup"),
                  placeholder: 'Pickup Location',
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '6px',
                      height: '50px',
                      // backgroundColor: '#f0f0f0',
                    }),
                  },
                }}
              />
            </Stack>
            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Drop Location:</Typography>
              <GooglePlacesAutocomplete
                selectProps={{
                  value: value.source,
                  onChange: (val) =>  geocodeSelectedPlace(val,"drop"),
                  placeholder: 'Drop Location',
                  styles: {
                    control: (provided) => ({
                      ...provided,
                      borderRadius: '6px',
                      height: '50px',
                      // backgroundColor: '#f0f0f0',
                    }),
                  },
                }}
              />
            </Stack>
            {/* {['pickup', 'drop'].map((type) => (
              <Stack key={type} spacing={1.5}>
                <Typography variant="subtitle2">{`${type.charAt(0).toUpperCase() + type.slice(1)} Location`}</Typography>
                <Stack sx={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <LoadingButton
                    onClick={() => handleChooseMap(type)}
                    loading={loading}
                    loadingIndicator="Loading…"
                    variant="contained"
                  >
                    Choose On Map
                  </LoadingButton>
                </Stack>
              </Stack>
            ))} */}

            {showDistanceData && (
              <Stack spacing={1.5}>
                <Grid container>
                  {distance && (
                    <Grid item xs={12} md={4}>
                      Total Distance: {distance}
                    </Grid>
                  )}
                  {duration && (
                    <Grid item xs={12} md={4}>
                      Total Time: {duration}
                    </Grid>
                  )}
                </Grid>
              </Stack>
            )}
          </Stack>
          <Stack direction="row" justifyContent="center" spacing={1.5} sx={{mb:1}}>
          <LoadingButton
            type="submit"
            variant="contained"
            size="large"
            loading={isSubmitting}
            sx={{ bgcolor: theme.palette.primary.main }}
            disabled={buttonDisable}
          >
            Book Cab
          </LoadingButton>
        </Stack>
        </Card>
      
      </FormProvider>
    </Grid>
  );


  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
    libraries: ['places'],
  });

  const onMarkerDragEnd = useCallback(
    (e,location) => {
      const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
      handleSelectLocation(newCoordinates,location);
    },
    [handleSelectLocation]
  );
  const mapContainerStyle = { width: '100%', height: '100%' };


  // Define map options
const mapOptions = {
  disableDefaultUI: true, // This disables all default controls
  zoomControl: false,
  mapTypeControl: false,
  scaleControl: false,
  streetViewControl: false,
  rotateControl: false,
  fullscreenControl: false
};
  const renderActions = (
    <Grid item xs={12} md={8} sx={{ position: 'relative', padding: '16px' }}> {/* Adding padding */}
    <Box 
      sx={{ 
        height: '400px', // Fixed height, adjust as needed
        width: '100%', 
        position: 'relative',
        borderRadius: '16px', // Adding border radius to the outer box
        overflow: 'hidden', // Ensures the map doesn't overflow the rounded corners
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' // Optional: adds a subtle shadow
      }}
    >
      {isLoaded ? (
        <GoogleMap
          center={{
            lat: coordinates.pickupLocationLat,
            lng: coordinates.pickupLocationLong,
          }}
          zoom={15}
          mapContainerStyle={mapContainerStyle}
          options={mapOptions}
        >
          <Marker
            position={{
              lat: coordinates.pickupLocationLat,
              lng: coordinates.pickupLocationLong,
            }}
            draggable
            onDragEnd={(e)=>onMarkerDragEnd(e,"pickup")}
          />
        </GoogleMap>
      ) : (
        <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
      )}
    </Box>
  </Grid>
  );

  return (
    <>
      <Snackbar
        open={loading}
        autoHideDuration={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="warning" variant="standard">
          Please Wait, Location Fetching...
        </Alert>
      </Snackbar>

      <Grid container spacing={1}>
        {renderNewForm}
        {renderActions}
      </Grid>

    </>
  );
}
