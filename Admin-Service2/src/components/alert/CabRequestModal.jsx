import PropTypes from 'prop-types';
import { fromLatLng } from 'react-geocode';
import { enqueueSnackbar } from 'notistack';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

export function CabRequest({ isOpen, onConfirm, onCancel, data }) {
  const [duration, setDuration] = useState('');
  const [distance, setDistance] = useState('');
  const [address, setAddress] = useState({ source: null, drop: null });

  const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } = data;

  const calculateRoute = useCallback(async () => {
    if (!pickupLocationLat || !pickupLocationLong || !dropoffLocationLat || !dropoffLocationLong) {
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

      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Route Finding Error:', error);
      enqueueSnackbar('Route Finding is not supported by this browser.', { variant: 'error' });
    }
  }, [pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong]);

  const memoizedFromLatLng = useMemo(() => fromLatLng, []);

  const getAddressFromCoordinates = useCallback((lat, lng, isSource) => {
    if (!lat || !lng) return;

    memoizedFromLatLng(lat, lng)
      .then((response) => {
        const newAddress = response.results[0].formatted_address;
        setAddress(prev => ({
          ...prev,
          [isSource ? 'source' : 'drop']: newAddress
        }));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [memoizedFromLatLng]);

  useEffect(() => {
    if (pickupLocationLat && pickupLocationLong) {
      getAddressFromCoordinates(pickupLocationLat, pickupLocationLong, true);
    }
    if (dropoffLocationLat && dropoffLocationLong) {
      getAddressFromCoordinates(dropoffLocationLat, dropoffLocationLong, false);
    }
  }, [pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong, getAddressFromCoordinates]);

  useEffect(() => {
    if (pickupLocationLat && pickupLocationLong && dropoffLocationLat && dropoffLocationLong) {
      calculateRoute();
    }
  }, [calculateRoute, pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong]);

  const getName = (userProfile) => {
    const userName = [userProfile?.firstName, userProfile?.middleName, userProfile?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();
    return userName;
  }

  return (
    <Modal
      open={isOpen}
      onClose={onCancel}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div
        style={{
          position: 'absolute',
          width: '90%', // Adjusted width for better mobile view
          maxWidth: 700,
          backgroundColor: 'white',
          border: 'none',
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
          padding: 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 8,
        }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 2, color: 'primary.main' }}>
            Cab Request Details
          </Typography>
          <Grid container spacing={2}>
            {[
              { label: 'User Name', value: getName(data?.requester?.UserProfile) },
              { label: 'Phone Number', value: data?.requester?.phone },
              { label: 'Distance', value: distance },
              { label: 'Duration', value: duration },
              { label: 'Pickup Address', value: address.source },
              { label: 'Drop Address', value: address.drop },
            ].map((item, index) => (
              <Grid item xs={6} sm={6} key={index}>
                <Paper elevation={1} sx={{ p: 2, height: '100%' }}>
                  <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                    {item.label}
                  </Typography>
                  <Typography variant="body1">{item.value || 'N/A'}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
        <div style={{ textAlign: 'right', marginTop: 20 }}>
          <Button onClick={onCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}

CabRequest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
