import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';
import {Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { Box,Modal,Stack, Button, Skeleton } from '@mui/material';


const mapContainerStyle = { width: '100%', height: '100%' };

function DeliveryServiceMap({ open, onClose, coordinates, onConfirm, handleSelectLocation }) {
  const [selectLocation, setSelectLocation] = useState(coordinates);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
    libraries: ['places'],
  });

  const onMarkerDragEnd = useCallback((e) => {
    const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setSelectLocation(newCoordinates);
    handleSelectLocation(newCoordinates);
  }, [handleSelectLocation]);

  const handleConfirm = useCallback(() => {
    onConfirm(selectLocation);
  }, [onConfirm, selectLocation]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        p: 2,
      }}>
        <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1, bgcolor: '#fff' }}>
          <Stack sx={{
            height: '400px',
            width: { md: '600px', xs: '80vw' },
            position: 'relative',
            border: '1px solid #2222',
            borderRadius: '10px',
          }}>
            <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
              {isLoaded ? (
                <GoogleMap
                  center={coordinates}
                  zoom={15}
                  mapContainerStyle={mapContainerStyle}
                >
                  <Marker position={coordinates} draggable onDragEnd={onMarkerDragEnd} />
                </GoogleMap>
              ) : (
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
              )}
            </Box>
          </Stack>
          <Stack sx={{ justifyContent: 'space-around', flexDirection: 'row', mt: 1 }}>
            <Button variant="contained" onClick={handleConfirm}>
              Confirm
            </Button>
            <Button variant="contained" onClick={onClose}>
              Close
            </Button>
          </Stack>
        </Box>
      </Box>
    </Modal>
  );
}

DeliveryServiceMap.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  onConfirm: PropTypes.func.isRequired,
  handleSelectLocation: PropTypes.func.isRequired,
};

export default React.memo(DeliveryServiceMap);