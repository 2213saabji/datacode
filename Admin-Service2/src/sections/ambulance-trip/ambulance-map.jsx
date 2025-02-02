import PropTypes from 'prop-types';
import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

import { Box, Stack, Skeleton } from '@mui/material';

export default function AmbulanceMap({ coordinates, setCoordinates }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
    libraries: ['places'],
  });

  if (!isLoaded) {
    return <Skeleton />;
  }

  const onMarkerDragEnd = (e) => {
    const newCoordinates = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    setCoordinates((old) => ({ ...old, source: newCoordinates }));
  };

  return (
    <Stack sx={{ height: '550px', width: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
        <GoogleMap
          center={coordinates.source}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          //   onLoad={(maps)=>{setUpdateMap(maps)}}
        >
          <Marker position={coordinates.source} draggable onDragEnd={onMarkerDragEnd} />
        </GoogleMap>
      </Box>
    </Stack>
  );
}

AmbulanceMap.propTypes = {
  coordinates: PropTypes.shape({
    source: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    // Add any other properties of coordinates if necessary
  }).isRequired,
  setCoordinates: PropTypes.func.isRequired,
};
