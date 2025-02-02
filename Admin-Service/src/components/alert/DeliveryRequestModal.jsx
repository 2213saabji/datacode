import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import React, { useState, useEffect, useCallback } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { Box, Grid, Paper } from '@mui/material';
import Typography from '@mui/material/Typography';

export function DeliveryRequest({ isOpen, onConfirm, onCancel, data }) {
  // const [directionResponse, setDirectionsResponse] = useState(null);
  const [duration, setDuration] = useState('');
  console.log(duration);
  const [distance, setDistance] = useState('');

  const calculateRoute = useCallback(async () => {
    console.log('calculate route called');

    const { pickupLocationLat, pickupLocationLong, dropoffLocationLat, dropoffLocationLong } = data;

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
      // setLoading(false);
      setDistance(results.routes[0].legs[0].distance.text);
      setDuration(results.routes[0].legs[0].duration.text);
    } catch (error) {
      console.error('Route Finding Error:', error);
      enqueueSnackbar('Route Finding is not supported by this browser.', { variant: 'error' });
    }
  }, [data, setDistance, setDuration]);

  // console.log(data)
  useEffect(() => {
    if (
      data?.pickupLocationLat &&
      data?.pickupLocationLong &&
      data?.dropoffLocationLat &&
      data?.dropoffLocationLong
    ) {
      calculateRoute();
    }
  }, [calculateRoute, data]);

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
          width: 700,
          backgroundColor: 'white',
          border: 'none', // Remove the border
          boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.3)',
          padding: 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 8,
        }}
      >
        <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2, boxShadow: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mb: 3, color: 'primary.main' }}>
            Item Details
          </Typography>
          <Grid container spacing={3}>
            {[
              { label: 'Item Name', value: data?.itemName },
              { label: 'Item Height', value: data?.height },
              { label: 'Item Width', value: data?.width },
              { label: 'Weight', value: data?.weight },
              { label: 'Contact Number', value: data?.contactNumber },
              { label: 'Distance', value: distance },
            ].map((item, index) => (
              <Grid item xs={12} sm={6} key={index}>
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
        <div style={{ textAlign: 'right' }}>
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
DeliveryRequest.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};
