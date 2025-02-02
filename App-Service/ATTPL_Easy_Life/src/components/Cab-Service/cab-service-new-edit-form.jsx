import React, {useState, useRef, useEffect, useMemo, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {SwipeablePanel} from 'rn-swipeable-panel';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

import {fetchVehicleOptions} from '../../redux/slices/TMS/CAB-SERVICE/cab-Booking';
import {Card} from 'react-native-elements';
import {Button} from 'react-native-paper';
import {createCabBooking} from '../../redux/slices/TMS/CAB-SERVICE/cab-Booking';

import {initializeSocket} from '../../redux/slices/TMS/TMS-socket';
import VehicleItem from './vehicle-option-item';

const CabBookingForm = ({navigation}) => {
  const [mapType, setMapType] = useState('standard');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDropLocation, setSelectedDropLocation] = useState(null);
  const [vehicleOptions, setVehicleOptions] = useState([]);
  const [socket, setSocket] = useState();
  const [selectedVehicle, setSelectedVehicle] = useState({
    VehicleOptionId: 1,
    vehicleOptionFor: 'Cab Service',
    vehicleType: 'Bike',
    rentPerKm: '15',
    baseCharge: '20',
    seatingCapacity: 1,
    weightCapacity: null,
    status: 'active',
    created_at: '2024-09-04T10:31:16.000Z',
    updated_at: '2024-09-04T10:31:16.000Z',
  }); // Default to 'bike'
  const [tripDistance, setTripDistance] = useState(null);
  const mapRef = useRef(null);
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const {showAlert} = useCustomAlert();

  const user = useSelector(selectUser);
  const [bookLoading, setBookLoading] = useState(false);
  const [isPanelActive, setIsPanelActive] = useState(false);
  const [panelProps, setPanelProps] = useState({
    fullWidth: true,
    openLarge: true,
    showCloseButton: false,
    onClose: () => setIsPanelActive(false),
    // ...or any prop you want
  });

  // Refs for the GooglePlacesAutocomplete components
  const pickupRef = useRef(null);
  const dropRef = useRef(null);

  const resetForm = () => {
    // Clear both GooglePlacesAutocomplete inputs
    if (pickupRef.current) {
      pickupRef.current.clear(); // Reset pickup input
    }
    if (dropRef.current) {
      dropRef.current.clear(); // Reset drop location input
    }

    // Reset the state values
    setSelectedLocation(null);
    setSelectedDropLocation(null);

    setBookLoading(false);
    setIsPanelActive(false);
  };

  const getVehicleOptions = async () => {
    try {
      const result = await dispatch(fetchVehicleOptions());
      if (fetchVehicleOptions.fulfilled.match(result)) {
        if (result.payload) {
          setVehicleOptions(result.payload);
        }
      } else {
        console.log(result.payload || 'Failed to fetch list.');
      }
    } catch (err) {
      console.log(err.message || 'An unexpected error occurred');
    }
  };
  

  const deg2rad = deg => deg * (Math.PI / 180);

  const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in km
    setTripDistance(parseFloat(distance.toFixed(0)));
  };

  useEffect(() => {
    const socket = initializeSocket({
      query: {userId: user?.userId},
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socket);

    getVehicleOptions();
  }, []);

  useEffect(() => {
    if (selectedLocation && selectedDropLocation) {
      getDistanceFromLatLonInKm(
        selectedLocation.latitude,
        selectedLocation.longitude,
        selectedDropLocation.latitude,
        selectedDropLocation.longitude,
      );
      setIsPanelActive(true);
    } else {
      setIsPanelActive(false);
    }
  }, [selectedLocation, selectedDropLocation]);

  const styles = getStyles(colors);

  const handleMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
  };

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

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };

  const handleDropPlaceSelect = (data, details) => {
    if (details && details.geometry) {
      const {lat, lng} = details.geometry.location;
      const newRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
      setSelectedDropLocation({latitude: lat, longitude: lng});

      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };

  useEffect(() => {
    if (socket) {
      console.log('component rerender');
      socket.on('cabRequestAccepted', data => {
        const dataToSend = {
          ...data?.cabTripDetails,
          dropoff_location_lat: Number(
            data?.cabTripDetails?.dropoff_location_lat,
          ),
          dropoff_location_long: Number(
            data?.cabTripDetails?.dropoff_location_long,
          ),
          pickup_location_lat: Number(
            data?.cabTripDetails?.pickup_location_lat,
          ),
          pickup_location_long: Number(
            data?.cabTripDetails?.pickup_location_long,
          ),
        };

        showAlert('Cab Request Accepted Driver', 'success');
        const cab_request_id = data?.cabTripDetails?.cab_request_id;
        if (cab_request_id) {
          setTimeout(() => {
            resetForm();
            showAlert('Cab Book Successfully', 'success');
            navigation.navigate('CabDetails', {item: dataToSend});
          }, 3000);
        } else {
          // router.push(paths.dashboard.cabService.list);
          setBookLoading(false);
          showAlert(`Driver Not Available For Vehicle`, 'error');
        }
      });

      socket.on('noDriver', data => {
        setBookLoading(false);
        showAlert(
          `Driver Not Available For Vehicle Type ${data?.vehicleType}.`,
          'error',
        );
      });
    }
  }, [socket]);

  const handleBookCab = async () => {
    setBookLoading(true);
    const data = {
      pickupLocationLat: selectedLocation.latitude,
      pickupLocationLong: selectedLocation.longitude,
      dropoffLocationLat: selectedDropLocation.latitude,
      dropoffLocationLong: selectedDropLocation.longitude,
      vehicleType: selectedVehicle,
    };

    const result = await dispatch(createCabBooking(data));

    if (createCabBooking.fulfilled.match(result)) {
      const dataTosend = {
        cabRequestId: result?.payload?.data?.cabRequestId,
        vehicleType: data?.vehicleType,
      };
      socket.emit('cabBookRequest', dataTosend);
      showAlert('Waiting for driver to Confirm the ride', 'success');
    } else {
      showAlert('Failed To Book Cab', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colors.background} />
      <Text style={styles.title}>CAB SERVICE</Text>
      <Text style={styles.subtitle}>New Booking</Text>
      <View
        style={[
          styles.card,
          {backgroundColor: '#333333', borderColor: colors.border},
        ]}>
        <GooglePlacesAutocomplete
          ref={pickupRef}
          placeholder="Search Pickup Location"
          fetchDetails={true}
          enablePoweredByContainer={false}
          onPress={handlePlaceSelect}
          query={{
            key: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8', // Replace with your actual API key
            language: 'en',
          }}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
          }}
          textInputProps={{
            placeholderTextColor: colors.text,
          }}
        />
        <GooglePlacesAutocomplete
          ref={dropRef}
          placeholder="Search Drop Location"
          fetchDetails={true}
          enablePoweredByContainer={false}
          onPress={handleDropPlaceSelect}
          query={{
            key: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8', // Replace with your actual API key
            language: 'en',
          }}
          styles={{
            container: styles.autocompleteContainer,
            textInput: styles.autocompleteInput,
          }}
          textInputProps={{
            placeholderTextColor: colors.text,
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
        {selectedLocation && selectedDropLocation && (
          <View style={styles.selectedLocationContainer}>
            <Button
              mode="contained"
              style={{
                width: '60%',
                borderRadius: 6,
                marginBottom: 12,
                marginLeft: 'auto',
                marginRight: 'auto',
              }}
              onPress={() => setIsPanelActive(true)}>
              Select Fair
            </Button>
          </View>
        )}
      </View>

      <SwipeablePanel {...panelProps} isActive={isPanelActive}>
        <Text
          style={{textAlign: 'center', ...fonts.headlineSmall, color: 'black'}}>
          Choose a Trip
        </Text>

        <View style={{maxHeight: 500}}>
          <FlatList
            data={vehicleOptions}
            renderItem={({item}) => (
              <VehicleItem
                item={item}
                setSelectedVehicle={setSelectedVehicle}
                selectedVehicle={selectedVehicle}
                tripDistance={tripDistance}
                bookLoading={bookLoading}
              />
            )}
            keyExtractor={item => item.id}
          />
        </View>

        <Button
          style={{
            width: '60%',
            borderRadius: 6,
            marginTop: 40,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
          loading={bookLoading}
          mode="contained"
          onPress={handleBookCab}
          disabled={bookLoading}>
          Book Now
        </Button>
      </SwipeablePanel>
    </SafeAreaView>
  );
};

const getStyles = colors =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    contentContainer: {},
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
      backgroundColor: colors.surface,
      borderRadius: 8,
    },
    vehicleCard: {
      padding: 25,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: {width: 0, height: 1},
      shadowOpacity: 0.8,
      shadowRadius: 2,
      elevation: 5,
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
    vehicleOptionItem: {
      padding: 4,
      borderRadius: 8,
    },
    vehicleInfo: {
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

export default CabBookingForm;
