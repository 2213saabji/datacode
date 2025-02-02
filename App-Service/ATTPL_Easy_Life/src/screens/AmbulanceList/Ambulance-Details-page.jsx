import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  Alert,
  SafeAreaView,
  StyleSheet,
  Linking,
} from 'react-native';
import io from 'socket.io-client';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch, useSelector} from 'react-redux';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {ATTPL_TMS_SOCKET_HOST_API} from '../../config/config';
import OtpModal from './otp-modal';
import MapRoute from './ambulance-route-map';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  fetchsAmbulanceDetail,
  updateAmbulanceBooking,
  otpverifyTMS,
} from '../../redux/slices/TMS/Ambulance-Service/ambulanceapi';

const AmbulanceDetails = ({navigation, route}) => {
  const {item} = route.params.params || {};

  const dispatch = useDispatch();
  const [tripData, setTripData] = useState({});
  const [coordinates, setCoordinates] = useState({
    latitude: null,
    longitude: null,
  });
  const [openOtpModal, setOpenOtpModal] = useState(false);
  const [driverLocation, setDriverLocation] = useState({
    latitude: null,
    longitude: null,
  });
  const {showAlert} = useCustomAlert();
  // const navigation = useNavigation();

  const user = useSelector(selectUser);
  const socketRef = useRef(null);
  const [socketConnected, setSocketconnect] = useState(false);

  //   useEffect(() => {

  // Geolocation.watchPosition(
  //       (position) => {
  //         const newPosition = {
  //           latitude: position.coords.latitude,
  //           longitude: position.coords.longitude,
  //         };
  //         setCoordinates(newPosition);
  //         console.log("newpostion",newPosition)
  //       },
  //       (error) => {
  //         console.error(error);
  //         Alert.alert('Error', 'Failed to fetch location');
  //       }
  //     );
  //   }, []);
  useEffect(() => {
    Geolocation.requestAuthorization();

    const watchId = Geolocation.watchPosition(
      position => {
        const newPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        };
        setCoordinates(newPosition);
        console.log('default', coordinates);
      },
      error => {
        console.error(error);
        Alert.alert('Location Error', 'Unable to fetch location.');
      },
      {
        enableHighAccuracy: true,
        distanceFilter: 10,
        interval: 10000,
        fastestInterval: 5000,
      },
    );

    return () => Geolocation.clearWatch(watchId);
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      try {

            const res = await dispatch(fetchsAmbulanceDetail({ tripId:route?.params?.params?.tripId}));
        if (fetchsAmbulanceDetail.fulfilled.match(res)) {
          setTripData(res.payload);
        } else if (fetchsingleCabDetail.rejected.match(res)) {
          // showAlert('Failed to fetch details', 'error');
        }
      } catch (error) {
        console.log('error');
        // showAlert(error.message || 'An unexpected error occurred', 'error');
      }
    };

    getDetails();
  }, [route?.params?.params?.tripId]);

  const handleTripUpdate = async status => {
    try {
      const data = {tripStatus: status};
      const res = await dispatch(
        updateAmbulanceBooking({tripId: route?.params?.params?.tripId, data}),
      );

      if (updateAmbulanceBooking.fulfilled.match(res)) {
        showAlert(`Trip ${status}`, {variant: 'success'});
        navigation.navigate('Dashboard'); // Adjust based on your navigation setup
      } else if (updateAmbulanceBooking.rejected.match(res)) {
        showAlert('Failed to update trip.', {variant: 'error'});
      }
    } catch (error) {
      console.error(error);
      showAlert('Failed to update trip.', {variant: 'error'});
    }
  };

  const handleTripStart = async otpCode => {
    const otpcodeId = await AsyncStorage.getItem('tmsOtpCodeId');
    console.log('called', otpcodeId);
    try {
      if (otpcodeId) {
        const resultAction = await dispatch(otpverifyTMS({mobileOtp: otpCode, otpCodeId}))


        if (otpverifyTMS.fulfilled.match(resultAction)) {
          // Handle success
          const {response} = resultAction.payload;
          console.log('handaletrip==>', response);

          if (response === 'ok') {
            showAlert('Verified successfully!', {variant: 'success'});

            // Call handleTripUpdate with the status 'started'
            await handleTripUpdate('started');

            // Open the map URL
            Linking.openURL(
              `https://www.google.com/maps/dir/?api=1&origin=${coordinates.latitude},${coordinates.longitude}&destination=${tripData?.tripSource?.latitude},${tripData?.tripSource?.longitude}&travelmode=driving`,
            );
          } else {
            showAlert('Invalid OTP.', {variant: 'error'});
          }
        } else if (otpverifyTMS.rejected.match(resultAction)) {
          // Handle failure
          showAlert('Failed to verify OTP.', {variant: 'error'});
        }
      } else {
        showAlert('OTP Code ID not found.', {variant: 'error'});
      }
    } catch (error) {
      console.error(error);
      showAlert('An unexpected error occurred.', {variant: 'error'});
    }
  };

  useEffect(() => {
    if (!socketRef.current && user.userRoleId !== 8) {
      socketRef.current = io(ATTPL_TMS_SOCKET_HOST_API, {
        query: {userId: user.userId},
      });
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [user]);

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;

      socket.on('connect', () => {
        setSocketconnect(true);
        console.log('User connected');
        socket.emit(
          'getDriverLocation',
          {tripId: route?.params?.params?.tripId},
          err => {
            if (err) {
              console.log('Error fetching driver location', err);
            }
          },
        );
      });

      socket.on('disconnect', () => {
        setSocketconnect(false);
        console.log('User disconnected');
      });

      socket.on('updatedDriverLocation', data => {
        console.log('Received updatedDriverLocation event', data);
        if (data) {
          setDriverLocation(data);
        }
      });

      return () => {
        socket.off('updatedDriverLocation');
      };
    }
  }, [socketRef, route?.params?.params?.tripId]);

  useEffect(() => {
    if (tripData?.tripSource) {
      setDriverLocation(tripData?.tripSource);
    }
  }, [tripData]);

  return (
    <SafeAreaView style={styles.container}>
      {user?.userRoleId === 8 ? (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>PATIENT DETAILS</Text>
          <Text>
            <Text style={styles.bold}>Patient Name: </Text>
            {tripData?.ambulanceUser?.UserProfile?.firstName}
          </Text>
          <Text>
            <Text style={styles.bold}>Patient Phone: </Text>
            {tripData?.ambulanceUser?.phone}
          </Text>
          {tripData?.ambulanceUser?.email && (
            <Text>
              <Text style={styles.bold}>Patient Email: </Text>
              {tripData?.ambulanceUser?.email}
            </Text>
          )}
          <Text>
            <Text style={styles.bold}>Trip Status: </Text>
            {tripData?.tripStatus}
          </Text>
          {tripData?.tripStatus === 'started' && (
            <View style={styles.buttonContainer}>
              <Button
                title="Get Direction"
                onPress={() => {
                  const origin = `${coordinates.latitude},${coordinates.longitude}`;
                  const destination = `${tripData?.tripSource?.latitude},${tripData?.tripSource?.longitude}`;
                  const url = `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(
                    origin,
                  )}&destination=${encodeURIComponent(
                    destination,
                  )}&travelmode=driving`;
                  Linking.openURL(url);
                }}
              />
              <Button
                title="Trip Finish"
                onPress={() => handleTripUpdate('finished')}
              />
            </View>
          )}
          {tripData?.tripStatus === 'accepted' && (
            <Button title="Start Trip" onPress={() => setOpenOtpModal(true)} />
          )}
        </View>
      ) : (
        <View style={styles.detailsContainer}>
          <Text style={styles.title}>DRIVER DETAILS</Text>
          <Text>
            <Text style={styles.bold}>Driver Name: </Text>
            {tripData?.driver?.driverDetails?.driverName}
          </Text>
          <Text>
            <Text style={styles.bold}>Driver Phone: </Text>
            {tripData?.driver?.phone}
          </Text>
          <Text>
            <Text style={styles.bold}>Driver Email: </Text>
            {tripData?.driver?.email}
          </Text>
          <Text>
            <Text style={styles.bold}>Trip Status: </Text>
            {tripData?.tripStatus}
          </Text>
          <View style={styles.mapContainer}>
            <MapRoute
              driverLocation={driverLocation}
              userLocation={coordinates}
            />
          </View>
        </View>
      )}

      <OtpModal
        open={openOtpModal}
        onClose={() => setOpenOtpModal(false)}
        onSubmit={handleTripStart}
        otpRef={AsyncStorage.getItem('tmsOtpRef')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f9f9f9', // Light background for better contrast
  },
  detailsContainer: {
    marginBottom: 16,
    backgroundColor: '#ffffff', // White background for the details card
    borderRadius: 8, // Rounded corners for a modern look
    padding: 16,
    elevation: 3, // Shadow for card elevation
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: {width: 0, height: 2}, // Shadow offset for iOS
    shadowOpacity: 0.1, // Shadow opacity for iOS
    shadowRadius: 4, // Shadow radius for iOS
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333', // Dark color for better readability
    marginBottom: 12,
  },
  bold: {
    fontWeight: 'bold',
    color: '#555', // Slightly lighter color for the labels
  },
  textContainer: {
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
  mapContainer: {
    height: 300,
    marginTop: 16,
    borderRadius: 8, // Rounded corners for the map view
    overflow: 'hidden', // Ensure the map fits within rounded corners
    borderWidth: 1,
    borderColor: '#ddd', // Border color for map view
  },
  otpModal: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});

export default AmbulanceDetails;

//  import React, { useCallback, useEffect, useRef, useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   Linking,
//   TouchableOpacity,
// } from 'react-native';
// import axios from 'axios';
// import { useDispatch, useSelector } from 'react-redux';
// import { Icon } from 'react-native-elements';
// import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
// import MapViewDirections from 'react-native-maps-directions';
// import Header from '../../components/Settings/Header';
// import { selectTheme } from '../../redux/selectors';
// import { fetchsingleCabDetail } from '../../redux/slices/TMS/CAB-SERVICE/cab-Booking';
// import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';
// import { fetchsAmbulanceDetail } from '../../redux/slices/TMS/Ambulance-Service/ambulanceapi';

// const AmbulanceDetails = ({ navigation, route }) => {

//   const { item } = route.params.params || {};
//     // console.log("triID",item.tripId)
//   const { colors, fonts } = useSelector(selectTheme);
//   const dispatch = useDispatch();
//   const { showAlert } = useCustomAlert();
//   const mapRef = useRef(null);
//   const [data, setData] = useState(null);
//   const [address, setAddress] = useState({});
//   const [pickupLocation, setPickupLocation] = useState(null);
//   const [dropoffLocation, setDropoffLocation] = useState(null);

//   const getDetails = async () => {
//     try {

//       const res = await dispatch(fetchsAmbulanceDetail({ tripId:route?.params?.params?.tripId}));
//       if (fetchsAmbulanceDetail.fulfilled.match(res)) {
//         console.log("res===",res.payload)
//         setData(res.payload);

//         const pickupLat = parseFloat(res.payload.pickupLocationLat);
//         const pickupLng = parseFloat(res.payload.pickupLocationLong);
//         const dropoffLat = parseFloat(res.payload.dropoffLocationLat);
//         const dropoffLng = parseFloat(res.payload.dropoffLocationLong);

//         const newRegion = {
//           latitude: (pickupLat + dropoffLat) / 2,
//           longitude: (pickupLng + dropoffLng) / 2,
//           latitudeDelta: Math.abs(pickupLat - dropoffLat) + 0.1,
//           longitudeDelta: Math.abs(pickupLng - dropoffLng) + 0.1,
//         };
//         setPickupLocation({ latitude: pickupLat, longitude: pickupLng });
//         setDropoffLocation({ latitude: dropoffLat, longitude: dropoffLng });

//         if (mapRef.current) {
//           mapRef.current.animateToRegion(newRegion, 1000);
//         }
//       } else if (fetchsingleCabDetail.rejected.match(res)) {
//         showAlert('Failed to fetch details', 'error');
//       }
//     } catch (error) {
//       console.log("error")
//       showAlert(error.message || 'An unexpected error occurred', 'error');
//     }
//   };

//   useEffect(() => {
//     getDetails();
//   }, []);

//   const getAddressFromCoordinates = useCallback(async (lat, lng, isSource) => {
//     if (!lat || !lng) return;
//     try {
//       const response = await axios.get(
//         `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=YOUR_API_KEY`
//       );
//       if (response.data.results.length > 0) {
//         const newAddress = response.data.results[0].formatted_address;
//         setAddress(prev => ({ ...prev, [isSource ? 'source' : 'drop']: newAddress }));
//       }
//     } catch (error) {
//       console.error('Geocoding error:', error);
//     }
//   }, []);

//   useEffect(() => {
//     if (pickupLocation?.latitude && pickupLocation?.longitude) {
//       getAddressFromCoordinates(pickupLocation.latitude, pickupLocation.longitude, true);
//     }
//     if (dropoffLocation?.latitude && dropoffLocation?.longitude) {
//       getAddressFromCoordinates(dropoffLocation.latitude, dropoffLocation.longitude, false);
//     }
//   }, [pickupLocation, dropoffLocation]);

//   const handleContactTrader = (phoneNumber) => {
//     if (phoneNumber) {
//       Linking.openURL(`tel:${phoneNumber}`);
//     } else {
//       showAlert('Phone number is not available', 'warning');
//     }
//   };
//  console.log("data",data)
//   return (
//     <>
//       <Header navigation={navigation} colors={colors} fonts={fonts} setting={null} text={" Ambulance TRIP LIST"} />
//       <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
//         <View style={styles.mapContainer}>
//           <MapView
//             ref={mapRef}
//             provider={PROVIDER_GOOGLE}
//             style={styles.map}
//             initialRegion={{
//               latitude: 37.78825,
//               longitude: -122.4324,
//               latitudeDelta: 0.0922,
//               longitudeDelta: 0.0421,
//             }}
//             mapType="standard"
//           >
//             {pickupLocation && <Marker coordinate={pickupLocation} title="Pickup Location" />}
//             {dropoffLocation && <Marker coordinate={dropoffLocation} title="Dropoff Location" />}
//             {pickupLocation && dropoffLocation && (
//               <MapViewDirections
//                 origin={pickupLocation}
//                 destination={dropoffLocation}
//                 apikey="YOUR_API_KEY"
//                 strokeColor={colors.secondary}
//                 strokeWidth={3}
//                 optimizeWaypoints={true}
//                 onReady={result => {
//                   mapRef.current.fitToCoordinates(result.coordinates, {
//                     edgePadding: {
//                       right: 20,
//                       bottom: 50,
//                       left: 20,
//                       top: 50,
//                     },
//                   });
//                 }}
//               />
//             )}
//           </MapView>
//         </View>
//         {data?.tripStatus === "Open" && (
//           <View style={[styles.boxx, { borderColor: colors.primary, padding: 15, marginTop: 10, marginBottom: 25 }]}>
//             <View style={styles.driverInfo}>
//               <View style={styles.vehicleDetails}>
//                 <Text style={styles.label}>Status</Text>
//                 <Text style={styles.vehicleNumber}>{data?.tripStatus}</Text>
//                 <Text style={styles.driverType}>{`(${data?.DriverDetail?.driverType})`}</Text>
//               </View>
//               <View>
//                 <Image source={{ uri: data?.DriverDetail?.Vehicles?.vehicleImageUrl?.preview }} style={styles.vehicleImage} />
//               </View>
//             </View>
//             <View style={styles.routeInfo}>
//               <View style={styles.iconsContainer}>
//                 <Icon raised name='circle' type='font-awesome' color={colors.primary} backgroundColor="red" />
//                 <Text style={[styles.routeLine, { borderLeftColor: colors.text }]}></Text>
//                 <Icon raised name='map-marker' type='font-awesome' color={colors.primary} />
//               </View>
//               <View style={styles.addressContainer}>
//                 <Text style={styles.addressLabel}>From :</Text>
//                 <Text style={styles.addressText}>{address?.source}</Text>
//                 <Text style={styles.addressLabel}>To :</Text>
//                 <Text style={styles.addressText}>{address?.drop}</Text>
//               </View>
//             </View>
//             <View style={styles.driverContact}>
//               <Image source={{ uri: data?.DriverDetail?.User?.UserProfile?.userProfileImageDetails?.preview }} style={styles.driverImage} />
//               <View style={styles.driverDetails}>
//                 <Text style={styles.driverName}>Driver Name</Text>
//                 <Text style={styles.driverNameText}>{data?.DriverDetail?.driverName}</Text>
//                 <Text style={styles.driverPhone}>{`( ${data?.DriverDetail?.User?.phone} )`}</Text>
//               </View>
//               <Icon raised name='phone' type='font-awesome' color={colors.primary} size={20} onPress={() => handleContactTrader(data?.DriverDetail?.User?.phone)} />
//             </View>
//           </View>
//         )}
//         {data?.status === "pending" && (
//           <View style={[styles.boxx, { borderColor: colors.primary, padding: 15, marginTop: 30, justifyContent: "center", alignItems: "center" }]}>
//             <Text style={styles.pendingMessage}>Driver will accept your request very soon. Just wait for some more minutes...</Text>
//           </View>
//         )}
//       </ScrollView>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   mapContainer: {
//     height: 350,
//     marginTop: 16,
//   },
//   map: {
//     ...StyleSheet.absoluteFillObject,
//   },
//   boxx: {
//     borderWidth: 2,
//     borderStyle: "solid",
//     width: "100%",
//     borderRadius: 10,
//   },
//   driverInfo: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingBottom: 10,
//   },
//   vehicleDetails: {
//     paddingLeft: 15,
//   },
//   label: {
//     opacity: 0.7,
//     color: '#000', // Replace with dynamic color
//   },
//   vehicleNumber: {
//     fontWeight: 'bold',
//     fontSize: 15,
//     color: '#000', // Replace with dynamic color
//   },
//   driverType: {
//     color: '#000', // Replace with dynamic color
//   },
//   vehicleImage: {
//     width: 130,
//     height: 100,
//     borderRadius: 10,
//   },
//   routeInfo: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     height: 200,
//     borderTopWidth: 1,
//     borderBottomWidth: 1,
//     borderColor: '#000', // Replace with dynamic color
//   },
//   iconsContainer: {
//     alignItems: 'center',
//     width: 80,
//   },
//   routeLine: {
//     height: 50,
//     width: 3,
//     borderLeftWidth: 2,
//     borderStyle: "dotted",
//   },
//   addressContainer: {
//     flexDirection: 'column',
//     justifyContent: 'space-between',
//     paddingVertical: 25,
//     height: "100%",
//   },
//   addressLabel: {
//     fontSize: 17,
//     fontWeight: '900',
//     color: '#000', // Replace with dynamic color
//   },
//   addressText: {
//     color: '#000', // Replace with dynamic color
//     maxWidth: 220,
//   },
//   driverContact: {
//     flexDirection: "row",
//     alignItems: "center",
//     gap: 5,
//     paddingTop: 20,
//     marginBottom: 20,
//   },
//   driverImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 100,
//   },
//   driverDetails: {
//     width: "50%",
//   },
//   driverName: {
//     opacity: 0.7,
//     color: '#000', // Replace with dynamic color
//   },
//   driverNameText: {
//     fontWeight: "bold",
//     fontSize: 15,
//     color: '#000', // Replace with dynamic color
//   },
//   driverPhone: {
//     color: '#000', // Replace with dynamic color
//     marginTop: 5,
//   },
//   pendingMessage: {
//     color: '#000', // Replace with dynamic color
//   },
// });

// export default AmbulanceDetails;
