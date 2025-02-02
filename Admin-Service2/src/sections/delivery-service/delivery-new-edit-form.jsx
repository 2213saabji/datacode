import * as Yup from 'yup';
import io from 'socket.io-client';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

// import FormControlLabel from '@mui/material/FormControlLabel';

import { useTheme } from '@mui/material/styles';
import { Grid, Alert, Snackbar } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { uploadTMSFileInAWSS3, deleteTMSFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';
import { ATTPL_TMS_SOCKET_API } from 'src/config-global';
import { getVehicleOptions, createDeliveryService } from 'src/api/delivery_service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import DeliveryServiceMap from './delivery-service-map';

// ----------------------------------------------------------------------

export default function DeliveryNewEditForm() {
  const [coordinates, setCoordinates] = useState({
    pickupLocationLat: null,
    pickupLocationLong: null,
    dropoffLocationLat: null,
    dropoffLocationLong: null,
  });

  const [loading, setLoading] = useState(false);

  const [uploadBtn, setUploadBtn] = useState(false);

  const [showDistanceData, setShowDistanceData] = useState(false);

  // const [directionResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');

  const [vehicleOptions, setVehicleOptions] = useState([]);

  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();
  // const mdUp = useResponsive('up', 'md');
  // map open
  const [open, setOpen] = useState({ pickupLocationMap: false, dropLocationMap: false });
  const { user } = useAuthContext();

  const [buttonDisable, setbuttonDisable] = useState(false);

  const router = useRouter();

  const { userId } = user;

  // default value
  const defaultValues = useMemo(
    () => ({
      businessmanId: user?.userId || '',
      itemName: '',
      contactNumber: '',
      dropLocationContactNumber: '',
      height: '',
      width: '',
      size: '',
      weight: '',
      imageDetails: null,
      pickupLocationLat: '',
      pickupLocationLong: '',
      dropoffLocationLat: '',
      dropoffLocationLong: '',
      vehicleOptionId: '',
      vehicleOptionLabel: '',
    }),
    [user]
  );

  // schema
  const NewJobSchema = Yup.object().shape({
    itemName: Yup.string().required('Item Title is required'),
    contactNumber: Yup.string().required('Contact Number is required'),
    dropLocationContactNumber: Yup.string().required('Drop Contact Number is required'),
    height: Yup.string().required('Item Height is required'),
    width: Yup.string().required('Item Width is required'),
    size: Yup.string().required('Item Size is required'),
    weight: Yup.string().required('Item Weight is required'),
    imageDetails: Yup.mixed('Item Image is required'),
    vehicleOptionId: Yup.number('Please Select Vehicle Type'),
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
      socketRef.current.on('deliveryTripAccepted', (data) => {
        // alert("Request Accepted");
        const bookingId = data?.updatedTrip?.bookingDetails?.booking_id;
        console.log(bookingId, data);
        enqueueSnackbar('Delivery Request Accepted Driver', { variant: 'success' });
        reset();
        if (bookingId) {
          router.push(paths.dashboard.deliveryService.details(bookingId));
        } else {
          router.push(paths.dashboard.deliveryService.list);
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

  function handleSelectLocation(coords, location) {
    setLoading(true);
    if (location === 'pickup') {
      setLoading(false);
      setCoordinates({
        ...coordinates,
        pickupLocationLat: coords.lat,
        pickupLocationLong: coords.lng,
      });
    } else {
      setLoading(false);
      setCoordinates({
        ...coordinates,
        dropoffLocationLat: coords.lat,
        dropoffLocationLong: coords.lng,
      });
    }
  }

  function handleChooseMap(location) {
    console.log('----->', coordinates);
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

  // upload images

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadTMSFileInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data.data;

        if (imageUrl) {
          console.log(imageUrl);
          setValue('imageDetails', imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [setValue, enqueueSnackbar]
  );

  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );

  const deleteImage = useCallback(async () => {
    const dataToSend = { url: value.imageDetails.preview };
    await deleteTMSFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('imageDetails', null);
        console.log(data);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });

    // console.log("values.preview =>", values.preview);
  }, [setValue, enqueueSnackbar, value.imageDetails]);

  // vehicle Option
  // const vehicleOptions = [
  //   { vehicle: 'Bike', weightCapcity:"5 Kg", rentPerKm: 10, baseCharege: 10 },
  //   { vehicle: 'Tempo',weightCapcity:"100 Kg", rentPerKm: 18, baseCharege: 30 },
  //   { vehicle: 'Tractor',weightCapcity:"7 Ton", rentPerKm: 22, baseCharege: 50 },
  //   { vehicle: 'Truck',weightCapcity:"10 Ton", rentPerKm: 25, baseCharege: 50 },
  //   { vehicle: 'Truck',weightCapcity:"15 Ton", rentPerKm: 25, baseCharege: 50 },
  //   { vehicle: 'Truck',weightCapcity:"20 Ton", rentPerKm: 25, baseCharege: 50 },
  //   { vehicle: 'Truck',weightCapcity:"25 Ton", rentPerKm: 25, baseCharege: 50 }
  // ];

  // get vehicle option

  useEffect(() => {
    async function getVehicleOption() {
      try {
        const vehicleOption = await getVehicleOptions('Delivery Service');
        if (vehicleOption && vehicleOption.length) {
          setVehicleOptions(vehicleOption);
        }
      } catch (error) {
        console.log('error while fetching vehicle List', error);
      }
    }

    getVehicleOption();
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
    // console.log(data);

    const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } =
      value;

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
        const response = await createDeliveryService(data);

        if (response.success) {
          console.log(response.data);
          const { itemId, businessmanId } = response.data;

          const dataForBooking = {
            estimatedDeliveryTime: duration,
            itemId,
            businessmanId,
          };
          // enqueueSnackbar('Create success!', { variant: 'error' });
          // // reset();
          // // router.push(paths.dashboard.deliveryService.list);
          // // return true;
          // if (socketConnected) {

          console.log("reached here")
          socketRef.current.emit('deliveryBookingRequest', { ...data, ...dataForBooking });
          enqueueSnackbar('Delivery Item Added Waiting For Driver...', { variant: 'success' });
          setbuttonDisable(true);
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

  const renderDetails = (
    <Card>
      <Stack spacing={3} sx={{ p: 3 }}>
        {[
          { name: 'itemName', label: 'Item Name' },
          { name: 'contactNumber', label: 'Contact Number' },
          { name: 'height', label: 'Item Height' },
          { name: 'width', label: 'Item Width' },
          { name: 'size', label: 'Item Size' },
          { name: 'weight', label: 'Weight' },
          { name: 'dropLocationContactNumber', label: 'Drop Location Contact Number' },
        ].map(({ name, label }) => (
          <Stack key={name} spacing={1.5}>
            <Typography variant="subtitle2">{label}</Typography>
            <RHFTextField
              name={name}
              placeholder={label}
              InputProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                },
              }}
              InputLabelProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                },
              }}
            />
          </Stack>
        ))}
        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Select Vehicle</Typography>
          <RHFAutocomplete
            name="vehicleOptionLabel"
            label="Vehicle Type"
            placeholder="Vehicle Type"
            fullWidth
            value={vehicleOptions.find(option => 
              `${option.vehicleType} ${option.weightCapacity}` === value.vehicleOptionLabel
            ) || null}
            options={vehicleOptions}
            getOptionLabel={(option) => `${option.vehicleType} ${option.weightCapacity}`}
            onChange={(event, item) => {
              if (item) {
                setValue('vehicleOptionId', item.VehicleOptionId);
                setValue('vehicleOptionLabel', `${item.vehicleType} ${item.weightCapacity}`);
              } else {
                setValue('vehicleOptionId', '');
                setValue('vehicleOptionLabel', '');
              }
            }}
          />
        </Stack>

        {['pickup', 'drop'].map((type) => (
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
        ))}

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

        <Stack spacing={1.5}>
          <Typography variant="subtitle2">Item Image</Typography>
          <RHFUpload
            thumbnail
            disabled={uploadBtn}
            name="imageDetails"
            maxSize={8388608}
            onDrop={handleDropSingleFile}
            onDelete={deleteImage}
            onRemove={(inputFile) => {
              setValue(
                'imageDetails',
                value.imageDetails?.filter((file) => file !== inputFile),
                { shouldValidate: true }
              );
              if (value.imageDetails?.length === 1) {
                setUploadBtn(false);
              }
            }}
            onRemoveAll={() => {
              setValue('imageDetails', [], { shouldValidate: true });
              setUploadBtn(false);
              setValue('imageDetails', '');
            }}
          />
        </Stack>
      </Stack>
    </Card>
  );

  const renderActions = (
    <Stack direction="row" justifyContent="flex-end" alignItems="center">
      <LoadingButton
        type="submit"
        variant="contained"
        size="large"
        loading={isSubmitting}
        sx={{ bgcolor: theme.palette.primary.main }}
        disabled={buttonDisable}
      >
        Book Delivery
      </LoadingButton>
    </Stack>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Snackbar
        open={loading}
        autoHideDuration={null}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert severity="warning" variant="standard">
          Please Wait, Location Fetching...
        </Alert>
      </Snackbar>

      <Stack spacing={3}>
        {renderDetails}
        {renderActions}
      </Stack>

      {/* pickup location  */}
      <DeliveryServiceMap
        open={open.pickupLocationMap}
        onClose={() => setOpen({ ...open, pickupLocationMap: false })}
        coordinates={{
          lat: coordinates.pickupLocationLat,
          lng: coordinates.pickupLocationLong,
        }}
        // setCoordinates={(newCoordinates) => {
        //   handleSetCoordinates(newCoordinates, 'pickup');
        // }}
        onConfirm={(Selectedlocation) => onConfirm(Selectedlocation, 'pickup')}
        handleSelectLocation={(coords) => handleSelectLocation(coords, 'pickup')}
      />

      {/* Drop location  */}
      <DeliveryServiceMap
        open={open.dropLocationMap}
        onClose={() => setOpen({ ...open, dropLocationMap: false })}
        coordinates={{
          lat: coordinates.dropoffLocationLat,
          lng: coordinates.dropoffLocationLong,
        }}
        // setCoordinates={(newCoordinates) => {
        //   handleSetCoordinates(newCoordinates, 'drop');
        // }}
        onConfirm={(Selectedlocation) => onConfirm(Selectedlocation, 'drop')}
        handleSelectLocation={(coords) => handleSelectLocation(coords, 'drop')}
      />
    </FormProvider>
  );
}
