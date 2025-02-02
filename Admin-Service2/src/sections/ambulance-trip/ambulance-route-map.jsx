/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import React, { useRef, useMemo, useState, useEffect, useCallback } from 'react';
import { Marker, GoogleMap, useJsApiLoader, DirectionsRenderer } from '@react-google-maps/api';

import { Box, Stack, Typography } from '@mui/material';

import { LoadingScreen } from '../../components/loading-screen';

const MapRoute = ({ driverLocation, userLocation }) => {
  const [directionResponse, setDirectionsResponse] = useState(null);
  const [routeInfo, setRouteInfo] = useState({ duration: '', distance: '' });
  const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [markerRotation, setMarkerRotation] = useState(0);
  const prevDriverLocationRef = useRef(driverLocation);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
    libraries: ['places'],
  });

  const calculateBearing = useCallback((startLat, startLng, destLat, destLng) => {
    startLat = (startLat * Math.PI) / 180;
    startLng = (startLng * Math.PI) / 180;
    destLat = (destLat * Math.PI) / 180;
    destLng = (destLng * Math.PI) / 180;

    const y = Math.sin(destLng - startLng) * Math.cos(destLat);
    const x =
      Math.cos(startLat) * Math.sin(destLat) -
      Math.sin(startLat) * Math.cos(destLat) * Math.cos(destLng - startLng);
    let brng = Math.atan2(y, x);
    brng = (brng * 180) / Math.PI;
    return (brng + 360) % 360;
  }, []);

  const calculateRoute = useCallback(async () => {
    if (
      !userLocation.latitude ||
      !userLocation.longitude ||
      !driverLocation.latitude ||
      !driverLocation.longitude
    ) {
      return;
    }

    try {
      const directionsService = new window.google.maps.DirectionsService();
      const results = await directionsService.route({
        origin: { lat: driverLocation.latitude, lng: driverLocation.longitude },
        destination: { lat: userLocation.latitude, lng: userLocation.longitude },
        travelMode: window.google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date(),
          trafficModel: 'pessimistic',
        },
        provideRouteAlternatives: true,
      });

      setDirectionsResponse(results);
      setLoading(false);
      setRouteInfo({
        distance: results.routes[0].legs[0].distance.text,
        duration: results.routes[0].legs[0].duration.text,
      });

      // Calculate and set marker rotation
      const prevLoc = prevDriverLocationRef.current;
      const newRotation = calculateBearing(
        prevLoc.latitude,
        prevLoc.longitude,
        driverLocation.latitude,
        driverLocation.longitude
      );
      setMarkerRotation(newRotation);
      prevDriverLocationRef.current = driverLocation;
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Route Finding is not supported by this browser.', { variant: 'error' });
    }
  }, [userLocation, driverLocation, calculateBearing]);

  useEffect(() => {
    calculateRoute();
  }, [calculateRoute]);

  const mapOptions = useMemo(
    () => ({
      center: userLocation,
      zoom: 2,
      tilt: 45,
    }),
    [userLocation]
  );

  const mapContainerStyle = { width: '100%', height: '100%' };

  const ambulanceIcon = useMemo(
    () => ({
      url: '/assets/Ambulance.png', // Path to your ambulance image
      scaledSize: new window.google.maps.Size(60, 60), // Adjust size as needed
      origin: new window.google.maps.Point(0, 0),
      anchor: new window.google.maps.Point(20, 20), // Center of the image
    }),
    []
  );

  const userIcon = useMemo(
    () => ({
      // url: '/assets/UserIcon.png', // Make sure to have this icon in your assets folder
      // scaledSize: new window.google.maps.Size(30, 30), // Adjust size as needed
      // origin: new window.google.maps.Point(0, 0),
      // anchor: new window.google.maps.Point(15, 15), // Center of the image
    }),
    []
  );

  const handleRouteClick = useCallback((index) => {
    setSelectedRouteIndex(index);
  }, []);

  if (!isLoaded || loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack sx={{ height: '100%', width: '100%', position: 'relative' }}>
      <Box sx={{ height: '100%', width: '100%', position: 'absolute' }}>
        <Stack spacing={5} sx={{ display: 'flex', flexDirection: 'row', mb: 2 }}>
          <Typography>
            <strong>Distance:</strong> {routeInfo.distance}
          </Typography>
          <Typography>
            <strong>Duration:</strong> {routeInfo.duration}
          </Typography>
        </Stack>
        <GoogleMap options={mapOptions} mapContainerStyle={mapContainerStyle}>
          {directionResponse?.routes.map((route, index) => (
            <DirectionsRenderer
              key={index}
              directions={directionResponse}
              routeIndex={index}
              options={{
                polylineOptions: {
                  strokeColor: index === selectedRouteIndex ? 'blue' : 'gray',
                  strokeOpacity: 0.7,
                  strokeWeight: 5,
                },
                suppressMarkers: true,
              }}
              onClick={() => handleRouteClick(index)}
            />
          ))}
          <Marker
            position={{ lat: driverLocation.latitude, lng: driverLocation.longitude }}
            icon={ambulanceIcon}
            options={{
              optimized: false, // This is important for rotation to work properly
            }}
          >
            <div
              style={{
                position: 'absolute',
                transform: `translate(-50%, -50%) rotate(${markerRotation}deg)`,
                width: '40px',
                height: '40px',
              }}
            >
              <img
                src="/assets/Ambulance.png"
                alt="Ambulance"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </Marker>
          <Marker
            position={{ lat: userLocation.latitude, lng: userLocation.longitude }}
            // icon={userIcon}
          />
          <Marker position={userLocation} />
        </GoogleMap>
      </Box>
    </Stack>
  );
};

MapRoute.propTypes = {
  driverLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
  userLocation: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
  }).isRequired,
};

export default MapRoute;
