 import React, {useState, useRef,useCallback,useEffect} from 'react';
import io from 'socket.io-client';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Button

} from 'react-native';
import Geolocation from '@react-native-community/geolocation';
import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';
import { selectUser } from '../../redux/selectors/UMS/authSelectors';
import {ATTPL_TMS_SOCKET_HOST_API} from '../../config/config';
import LoadingSpinner from 'react-native-loading-spinner-overlay';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import { initializeSocket } from '../../redux/slices/TMS/TMS-socket';
const AmbulanceBookingScreen = () => {
  const { showAlert } = useCustomAlert();
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);
  const user = useSelector(selectUser);
  const userId = user?.userId;
  const [socket, setSocket] = useState();

  // const [coordinates, setCoordinates] = useState({
  //   source: { lat: null, lng: null },
  // });
  const [mapType, setMapType] = useState('standard');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const {colors} = useSelector(selectTheme);
  // const socket = useRef(null);
  const styles = getStyles(colors);

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

  const onBookAmbulance = useCallback(() => {
    if (socket ) {
       setIsButtonDisabled(true);
      console.log("Socket connected and emitting bookTrip event");
  
      socket.emit('bookTrip', {
        latitude: selectedLocation?.latitude,
        longitude: selectedLocation?.longitude,
      }, (response) => {
       
        if (response.success) {
          console.log('Server response:', response.message);

          Alert.alert('Success', response.message);
        } else {
          console.error('Server response:', response.message);
          Alert.alert('Error', response.message);
        }
       
      });

      showAlert('Waiting for Ambulance to be Assigned','success');
      // Emit the event with payload
      // socket.emit('bookTrip', {
      //   latitude: selectedLocation?.latitude,
      //   longitude: selectedLocation?.longitude,
      // });
  
      socket.on('bookTrip', (data, callback) => {
        console.log("Hi form server")
        // Process the booking here
        const success = true; // Or false, depending on the processing result
        callback({ success, message: success ? 'Ambulance booked successfully' : 'Booking failed' });
      });
      console.log("Payload sent:", selectedLocation?.latitude, selectedLocation?.longitude);
    } else {
      console.error("Socket is not connected");
    }
  }, [selectedLocation]);
  
  // const [coordinates, setCoordinates] = useState({ source: { lat: null, lng: null } });

  useEffect(() => {
    Geolocation.requestAuthorization();

    const watchId = Geolocation.watchPosition(
      (position) => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setSelectedLocation(newPosition);
        console.log("default", newPosition);
      },
      (error) => {
        console.error(error);
        Alert.alert('Location Error', 'Unable to fetch location.');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
      }
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  const handlePlaceSelect = (data, details) => {
    if (details && details.geometry) {
      const {lat, lng} = details.geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setSelectedLocation({latitude: lat, longitude: lng});

      // Ensure the ref is set before calling animateToRegion
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000); // Add animation duration if necessary
      }
    }
  };

  //useEffect(() => {
    //     if (!socket.current) {
    //       socket.current = io(https://tmsdevapi.attplems.com, { query: { userId } });

useEffect(() => {
  const socket = initializeSocket({
    query:  {userId: user?.userId} ,
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  });
  setSocket(socket);


  socket.on('connect',()=>{
    console.log("user connected")
  })
socket.on('tripAccepted', handleTripAccepted);

return () => {
  socket.off('tripAccepted', handleTripAccepted);
  socket.disconnect();
};
}, [userId]);

const handleTripAccepted = (response) => {
  console.log(response)
  const tripId = response?.updatedTrip?.updatedTrip?.tripId;
  // navigation.navigate('AmbulanceTripDetails', { tripId }); // Adjust navigation to match your setup
  if (response.success) {
    setIsButtonDisabled(false);
    Alert.alert('Success', `Trip Accepted By ${response?.updatedTrip?.updatedTrip?.driver?.driverDetails.fullName}`);
  } else {
    Alert.alert('Error', response.message);
  }
};
 

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />

      <Text style={styles.title}>BOOK AMBULANCE</Text>
      <Text style={styles.subtitle}>New Booking</Text>

      <View style={styles.card}>
        <GooglePlacesAutocomplete
          placeholder="Search Pickup Location"
          fetchDetails={true}
          onPress={handlePlaceSelect}
          query={{
            key: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8', // Replace with your actual API key
            language: 'en',
          }}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
          }}
        />

        <View style={styles.mapContainer}>
          <MapView
            ref={mapRef}
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              latitude: 21.1702,
              longitude: 72.8311,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            mapType={mapType}
            onPress={handleMapPress}>
            {selectedLocation && <Marker coordinate={selectedLocation} />}
          </MapView>
          <View style={styles.mapTypeContainer}>
            <TouchableOpacity
              style={[
                styles.mapTypeButton,
                mapType === 'standard' && styles.activeMapType,
              ]}
              onPress={() => setMapType('standard')}>
              <Text style={styles.mapTypeText}>Map</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.mapTypeButton,
                mapType === 'satellite' && styles.activeMapType,
              ]}
              onPress={() => setMapType('satellite')}>
              <Text style={styles.mapTypeText}>Satellite</Text>
            </TouchableOpacity>
          </View>
        </View>

        {selectedLocation && (
          <View style={styles.selectedLocationContainer}>
            <Text style={styles.selectedLocationText}>
              Selected Location: {selectedLocation.latitude.toFixed(6)},{' '}
              {selectedLocation.longitude.toFixed(6)}
            </Text>
          </View>
        )}


      {/* <Button
        title={isButtonDisabled ? 'Booking...' : 'Book Ambulance'}
        onPress={onBookAmbulance}
        disabled={isButtonDisabled}
        style={styles.bookButton} 
      /> */}
      <TouchableOpacity style={styles.bookButton} onPress={onBookAmbulance}>
          <Text style={styles.bookButtonText}>{isButtonDisabled ? 'Booking...' : 'Book Ambulance'}</Text>
        </TouchableOpacity> 
      
      <LoadingSpinner
        visible={isButtonDisabled}
        textContent={'Booking...'}
        textStyle={styles.spinnerTextStyle}
      />
        {/* <TouchableOpacity style={styles.bookButton} onPress={onBookAmbulance}>
          <Text style={styles.bookButtonText}>Book Ambulance</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginLeft: 16,
      marginTop: 16,
      color: colors.primary,
    },
    subtitle: {
      fontSize: 18,
      color: colors.secondary,
      marginLeft: 16,
      marginTop: 8,
    },
    card: {
      margin: 16,
      backgroundColor: colors.surface,
      borderRadius: 8,
      overflow: 'hidden',
      elevation: 4,
    },
    autocompleteContainer: {
      flex: 0,
      marginHorizontal: 16,
      marginTop: 16,
    },
    autocompleteInput: {
      height: 50,
      fontSize: 16,
      backgroundColor: colors.background,
      color: colors.text,
    },
    mapContainer: {
      height: 350,
      marginTop: 16,
    },
    map: {
      ...StyleSheet.absoluteFillObject,
    },
    mapTypeContainer: {
      flexDirection: 'row',
      position: 'absolute',
      top: 10,
      left: 10,
      backgroundColor: colors.surface,
      borderRadius: 5,
    },
    mapTypeButton: {
      paddingHorizontal: 10,
      paddingVertical: 5,
    },
      spinnerTextStyle: {
    color: '#FFF',
  },
    activeMapType: {
      backgroundColor: colors.primary,
    },
    mapTypeText: {
      fontSize: 14,
      color: colors.text,
    },
    selectedLocationContainer: {
      marginHorizontal: 16,
      marginTop: 16,
    },
    selectedLocationText: {
      fontSize: 14,
      color: colors.text,
    },
    bookButton: {
      backgroundColor: colors.primary,
      marginHorizontal: 16,
      marginVertical: 16,
      paddingVertical: 12,
      borderRadius: 8,
      alignItems: 'center',
    },
    bookButtonText: {
      color: colors.background,
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default AmbulanceBookingScreen;


// import React, { useState, useEffect, useRef, useCallback } from 'react';
// import io from 'socket.io-client';
// import { View, Text, Button, Alert, StyleSheet, Dimensions } from 'react-native';
// import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
// import { useNavigation } from '@react-navigation/native';
// import LoadingSpinner from 'react-native-loading-spinner-overlay';
// import {useSelector} from 'react-redux';
// import {selectTheme} from '../../redux/selectors';
// import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import { TouchableOpacity } from 'react-native-gesture-handler';
// // import { useAuthContext } from 'src/auth/hooks'; // Adjust this import based on your setup

// const { width, height } = Dimensions.get('window');

// const AmbulanceBookingScreen = () => {
  
//   const [mapType, setMapType] = useState('standard');
//   const userId = useSelector(state => state?.auth?.user?.userId);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);
//   const [value, setValue] = useState({ source: null });
//   const {colors} = useSelector(selectTheme);
//   const [coordinates, setCoordinates] = useState({
//     source: { lat: null, lng: null },
//   });
//   const mapRef = useRef(null);
//   const socket = useRef(null);
//   const navigation = useNavigation();
//   // const { user: { userId } } = useAuthContext();

//   const handleChange = useCallback(async (data, details) => {
//     setValue((prev) => ({ ...prev, source: data }));
//     try {
//       const { lat, lng } = details.geometry.location;
//       setCoordinates((prev) => ({ ...prev, source: { lat, lng } }));
//     } catch (error) {
//       console.error('Error getting coordinates: ', error);
//     }
//   }, []);
//   // const handlePlaceSelect = (data, details) => {
//   //       if (details && details.geometry) {
//   //         const {lat, lng} = details.geometry.location;
//   //         const newRegion = {
//   //           latitude: lat,
//   //           longitude: lng,
//   //           latitudeDelta: 0.0922,
//   //           longitudeDelta: 0.0421,
//   //         };
//   //         setSelectedLocation({latitude: lat, longitude: lng});
    
//   //         // Ensure the ref is set before calling animateToRegion
//   //         if (mapRef.current) {
//   //           mapRef.current.animateToRegion(newRegion, 1000); // Add animation duration if necessary
//   //         }
//   //       }
//   //     };
//   const handleMapPress = event => {
//         const {coordinate} = event.nativeEvent;
//         setSelectedLocation(coordinate);
//       };
//   const onBookAmbulance = useCallback(() => {
//     setIsButtonDisabled(true);
//     console.log(coordinates.source.lat,"   ===  ",coordinates.source.lng)

//     socket.current.emit('bookTrip', {
//       latitude: coordinates.source.lat,
//       longitude: coordinates.source.lng,
//     });
//   }, [coordinates.source]);

//   useEffect(() => {
//     if (!socket.current) {
//       socket.current = io(`https://tmsdevapi.attplems.com`, { query: { userId } });
//     }

//     const handleTripAccepted = (response) => {
//       const tripId = response?.updatedTrip?.updatedTrip?.tripId;
//       navigation.navigate('AmbulanceTripDetails', { tripId }); // Adjust navigation to match your setup
//       if (response.success) {
//         Alert.alert('Success', `Trip Accepted By ${response?.updatedTrip?.updatedTrip?.driver?.driverDetails.fullName}`);
//       } else {
//         Alert.alert('Error', response.message);
//       }
//     };

//     socket.current.on('tripAccepted', handleTripAccepted);

//     return () => {
//       socket.current.off('tripAccepted', handleTripAccepted);
//       socket.current.disconnect();
//     };
//   }, [userId, navigation]);

//   return (
//     <View style={styles.container}>
//       <GooglePlacesAutocomplete
//         placeholder='Pickup Location'
//         onPress={handleChange}
//         query={{
//                       key: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8', // Replace with your actual API key
//                       language: 'en',
//                     }}
//         styles={styles.googlePlaces}
//       />


//       <View style={styles.mapContainer}>
//           <MapView
//             ref={mapRef}
//            provider={PROVIDER_GOOGLE}
//             style={styles.map}
//             initialRegion={{
//               latitude: 21.1702,
//               longitude: 72.8311,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             mapType={mapType}
//             onPress={handleMapPress}>
//             {selectedLocation && <Marker coordinate={selectedLocation} />}
//           </MapView>
//           <View style={styles.mapTypeContainer}>
//             <TouchableOpacity
//               style={[
//                 styles.mapTypeButton,
//                 mapType === 'standard' && styles.activeMapType,
//               ]}
//               onPress={() => setMapType('standard')}>
//              <Text style={styles.mapTypeText}>Map</Text>
//             </TouchableOpacity>
//              <TouchableOpacity
//                style={[
//                 styles.mapTypeButton,
//                 mapType === 'satellite' && styles.activeMapType,
//               ]}
//               onPress={() => setMapType('satellite')}>
//               <Text style={styles.mapTypeText}>Satellite</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       {/* {coordinates.source.lat && coordinates.source.lng && (
//         <MapView
//           style={styles.map}
//           initialRegion={{
//             latitude: coordinates.source.lat,
//             longitude: coordinates.source.lng,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         >
//           <Marker coordinate={coordinates.source} title="Pickup Location" />
//         </MapView>
//       )} */}
//       <Button
//         title={isButtonDisabled ? 'Booking...' : 'Book Ambulance'}
//         onPress={onBookAmbulance}
//         disabled={isButtonDisabled}
//       />
//       <LoadingSpinner
//         visible={isButtonDisabled}
//         textContent={'Booking...'}
//         textStyle={styles.spinnerTextStyle}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//       mapTypeButton: {
//       paddingHorizontal: 10,
//       paddingVertical: 5,
//     },
//   mapContainer: {
//           height: 350,
//           marginTop: 16,
//         },
//   googlePlaces: {
//     textInputContainer: {
//       borderRadius: 20,
//       backgroundColor: '#f0f0f0',
//     },
//     textInput: {
//       height: 50,
//     },
//   },
//   map: {
//     width: width,
//     height: height * 0.4,
//     marginVertical: 16,
//   },
//   spinnerTextStyle: {
//     color: '#FFF',
//   },
// activeMapType: {
// // backgroundColor: colors?.primary,
//     },
//   mapTypeContainer: {
//           flexDirection: 'row',
//           position: 'absolute',
//           top: 10,
//           left: 10,
//           // backgroundColor: colors?.surface,
//           borderRadius: 5,
//         },
// });

// export default AmbulanceBookingScreen;
