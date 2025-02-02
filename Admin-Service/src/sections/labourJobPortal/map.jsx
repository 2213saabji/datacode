import React from 'react';
import PropTypes from 'prop-types'; // Import PropTypes
import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { Box, Modal, Stack, Button, Skeleton } from '@mui/material';

function MapModal({ open, onClose, coordinates, setCoordinates, onConfirm, handleSelectLocation }) {
  // console.log(coordinates)

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
    libraries: ['places'],
  });

  const onMarkerDragEnd = (e) => {
    const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCoordinates(newCoordinates);

    handleSelectLocation(newCoordinates);
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          width: '100%',
          p: 2,
          height: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ borderRadius: '10px', overflow: 'hidden', p: 1, backgroundColor: '#fff' }}>
          <Stack
            sx={{
              height: '400px',
              width: { md: '600px', xs: '80vw' },
              position: 'relative',
              border: '1px solid #2222',
              borderRadius: '10px',
            }}
          >
            <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
              {isLoaded ? (
                <GoogleMap
                  center={coordinates}
                  zoom={15}
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                >
                  <Marker position={coordinates} draggable onDragEnd={onMarkerDragEnd} />
                </GoogleMap>
              ) : (
                <Skeleton animation="wave" variant="rectangular" width="100%" height="100%" />
              )}
            </Box>
          </Stack>
          <Stack sx={{ justifyContent: 'space-around', flexDirection: 'row', mt: 1 }}>
            <Button variant="contained" onClick={onConfirm}>
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

MapModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  coordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  setCoordinates: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  handleSelectLocation: PropTypes.func.isRequired,
};

export default MapModal;
