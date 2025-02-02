import io from 'socket.io-client';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import GooglePlacesAutocomplete, {
  getLatLng,
  geocodeByPlaceId,
} from 'react-google-places-autocomplete';

import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Grid, Card, Stack, Alert, Snackbar } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';
import { ATTPL_TMS_SOCKET_API } from 'src/config-global';

import { useSnackbar } from 'src/components/snackbar';

import AmbulanceMap from './ambulance-map';

export default function AmbulanceTripNewEditForm() {
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [value, setValue] = useState({ source: null });
  const [coordinates, setCoordinates] = useState({
    source: { lat: null, lng: null },
  });

  const handleChange = useCallback(async (val, name) => {
    setValue((prev) => ({ ...prev, [name]: val }));
    try {
      const results = await geocodeByPlaceId(val.value.place_id);
      const { lat, lng } = await getLatLng(results[0]);
      setCoordinates((prev) => ({ ...prev, [name]: { lat, lng } }));
    } catch (error) {
      console.error('Error getting coordinates: ', error);
    }
  }, []);

  const onBookAmbulance = useCallback(() => {
    setIsButtonDisabled(true);
    socket.current.emit('bookTrip', {
      latitude: coordinates.source.lat,
      longitude: coordinates.source.lng,
    });
  }, [coordinates.source]);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition((position) => {
        const newPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCoordinates((prev) => ({ ...prev, source: newPosition }));
      });
      return () => navigator.geolocation.clearWatch(watchId);
    }
    return null;
  }, []);

  const {
    user: { userId },
  } = useAuthContext();
  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(`${ATTPL_TMS_SOCKET_API}`, { query: { userId } });
    }

    const handleTripAccepted = (response) => {
      const tripId = response?.updatedTrip?.updatedTrip?.tripId;
      router.push(paths.dashboard.ambulancetrip.details(tripId));
      if (response.success) {
        enqueueSnackbar(
          `Trip Accepted By ${response?.updatedTrip?.updatedTrip?.driver?.driverDetails.fullName}`,
          { variant: 'success' }
        );
      } else {
        enqueueSnackbar(response.message, { variant: 'error' });
      }
    };

    socket.current.on('tripAccepted', handleTripAccepted);

    return () => {
      socket.current.off('tripAccepted', handleTripAccepted);
      socket.current.disconnect();
    };
  }, [userId, enqueueSnackbar, router]);

  return (
    <>
      <Snackbar open={isButtonDisabled} anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert severity="info" variant="standard">
          Request Sent, Waiting For Driver.
        </Alert>
      </Snackbar>
      <Grid xs={12} md={8}>
        <Card sx={{ p: 3 }}>
          <Box
            rowGap={3}
            columnGap={2}
            display="grid"
            gridTemplateColumns={{
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(1, 1fr)',
            }}
          >
            <GooglePlacesAutocomplete
              selectProps={{
                value: value.source,
                onChange: (val) => handleChange(val, 'source'),
                placeholder: 'Pickup Location',
                styles: {
                  control: (provided) => ({
                    ...provided,
                    borderRadius: '20px',
                    height: '50px',
                    backgroundColor: '#f0f0f0',
                  }),
                },
              }}
            />
            {coordinates.source?.lat && coordinates.source?.lng && (
              <AmbulanceMap coordinates={coordinates} setCoordinates={setCoordinates} />
            )}
          </Box>
        </Card>
      </Grid>
      <Stack alignItems="flex-end" sx={{ mt: 3 }}>
        <LoadingButton
          variant="contained"
          onClick={onBookAmbulance}
          disabled={isButtonDisabled}
          style={{ height: 35 }}
        >
          {isButtonDisabled ? 'Booking...' : 'Book Ambulance'}
        </LoadingButton>
      </Stack>
    </>
  );
}
