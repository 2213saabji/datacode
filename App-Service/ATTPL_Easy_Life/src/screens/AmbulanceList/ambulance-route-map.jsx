import React, { useState, useEffect, useCallback, useRef } from 'react';
import PropTypes from 'prop-types';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Geolocation from '@react-native-community/geolocation'; // Install if needed

const { width, height } = Dimensions.get('window');

const MapRoute = ({ driverLocation, userLocation }) => {
    console.log("driver",driverLocation,"==", userLocation )
  const [routeInfo, setRouteInfo] = useState({ duration: '', distance: '' });
  const [loading, setLoading] = useState(true);
  const [routeCoords, setRouteCoords] = useState([]);
  const [error, setError] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    const calculateRoute = async () => {
      if (!userLocation.latitude || !userLocation.longitude || !driverLocation.latitude || !driverLocation.longitude) {
        return;
      }

      try {
        const response = await fetch(`https://maps.googleapis.com/maps/api/directions/json?origin=${driverLocation.latitude},${driverLocation.longitude}&destination=${userLocation.latitude},${userLocation.longitude}&key=YOUR_GOOGLE_MAPS_API_KEY`);
        const data = await response.json();
       console.log("status",data.status)
        if (data.status === 'OK') {
          const { routes } = data;
          const route = routes[0];
          const legs = route.legs[0];
          setRouteInfo({
            distance: legs.distance.text,
            duration: legs.duration.text,
          });
          const coordinates = route.overview_polyline.points;
          const decodedCoords = decodePolyline(coordinates);
          setRouteCoords(decodedCoords);
        } else {
          setError('Unable to fetch route');
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError('Error fetching route');
        setLoading(false);
      }
    };

    calculateRoute();
  }, [driverLocation, userLocation]);

  const decodePolyline = (t) => {
    // Decode polyline algorithm
    let index = 0, lat = 0, lng = 0;
    const coordinates = [];
    while (index < t.length) {
      let b, shift = 0, result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlat = (result & 1) ? ~(result >> 1) : (result >> 1);
      lat += dlat;
      shift = 0;
      result = 0;
      do {
        b = t.charCodeAt(index++) - 63;
        result |= (b & 0x1f) << shift;
        shift += 5;
      } while (b >= 0x20);
      const dlng = (result & 1) ? ~(result >> 1) : (result >> 1);
      lng += dlng;
      coordinates.push({
        latitude: (lat / 1E5),
        longitude: (lng / 1E5),
      });
    }
    return coordinates;
  };

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker coordinate={driverLocation} title="Driver Location" />
        <Marker coordinate={userLocation} title="User Location" />
        <Polyline
          coordinates={routeCoords}
          strokeColor="#FF0000"
          strokeWidth={6}
        />
      </MapView>
      <View style={styles.infoContainer}>
        <Text>Distance: {routeInfo.distance}</Text>
        <Text>Duration: {routeInfo.duration}</Text>
      </View>
    </View>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  map: {
    width: width,
    height: height * 0.7,
  },
  infoContainer: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
});

export default MapRoute;
