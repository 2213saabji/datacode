import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
  Linking
} from 'react-native';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from "react";
import { selectUser } from '../../../redux/selectors/UMS/authSelectors';
import { selectTheme } from '../../../redux/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { useCustomAlert } from '../../../utilities/Alert/useCustomAlert';
import { Icon } from 'react-native-elements';
import { fetchsingleCabDetail } from '../../../redux/slices/TMS/CAB-SERVICE/cab-Booking';
import SaveButton from '../../../components/EditProfile/SaveButton';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions'; // Import this
import Header from '../../../components/Settings/Header';

const CabDetails = ({ navigation,route }) => {
  const { item } = route.params || {};
  const { colors, fonts } = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const { showAlert } = useCustomAlert();
  const mapRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapType, setMapType] = useState('standard');
  const [address, setAddress] = useState();
  const [pickupLocation, setPickupLocation] = useState(null);
  const [dropoffLocation, setDropoffLocation] = useState(null);

  const handleMapPress = event => {
    const { coordinate } = event.nativeEvent;
    setSelectedLocation(coordinate);
  };
  
  const getDetails = async () => {
    try {
      const res = await dispatch(fetchsingleCabDetail({ cabId: item.cabRequestId || item.cab_request_id }));
      if (fetchsingleCabDetail.fulfilled.match(res)) {
        setData(res.payload);
  
            
        const pickupLat = parseFloat(res.payload.pickupLocationLat);
        const pickupLng = parseFloat(res.payload.pickupLocationLong);
        const dropoffLat = parseFloat(res.payload.dropoffLocationLat);
        const dropoffLng = parseFloat(res.payload.dropoffLocationLong);

        const newRegion = {
          latitude: (pickupLat + dropoffLat) / 2,
          longitude: (pickupLng + dropoffLng) / 2,
          latitudeDelta: Math.abs(pickupLat - dropoffLat) + 0.1,
          longitudeDelta: Math.abs(pickupLng - dropoffLng) + 0.1,
        };
        setPickupLocation({ latitude: pickupLat, longitude: pickupLng });
        setDropoffLocation({ latitude: dropoffLat, longitude: dropoffLng });

        if (mapRef.current) {
          mapRef.current.animateToRegion(newRegion, 1000);
        }
      } else if (fetchsingleCabDetail.rejected.match(res)) {
        // Handle rejection
      }
    } catch (error) {
      showAlert(error || "An unexpected error occurred", 'error');
    }
  };

  useEffect(() => {
    getDetails();
  }, []);

  const getAddressFromCoordinates = useCallback(
    async (lat, lng, isSource) => {
      if (!lat || !lng) return;
      try {
        const response = await axios.get(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8`
        );
        if (response.data.results.length > 0) {
          const newAddress = response.data.results[0].formatted_address;
          setAddress((prev) => ({ ...prev, [isSource ? 'source' : 'drop']: newAddress }));
        }
      } catch (error) {
        console.error('Geocoding error:', error);
      }
    },
    []
  );

  useEffect(() => {

    if (pickupLocation?.latitude, pickupLocation?.longitude) {
      getAddressFromCoordinates(pickupLocation?.latitude, pickupLocation?.longitude, true);
    }
    if (dropoffLocation?.latitude, dropoffLocation?.longitude) {
      getAddressFromCoordinates(dropoffLocation?.latitude, dropoffLocation?.longitude, false);
    }
  }, [pickupLocation, dropoffLocation]);

  const handleContactTrader = (phoneNumber) => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      console.log('Phone number is not available');
    }
  };

  return (<>
    <Header navigation={navigation} colors={colors} fonts={fonts}setting={null}text={"TRIP LIST"} />
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      {/* <Text
        style={[
          styles.sectionTitle,
          { color: colors.text, ...fonts.titleMedium, paddingTop: 5, fontSize: 25, fontWeight: '900', marginBottom: 20 },
        ]}
      >
        TRIP
      </Text> */}
      <View style={styles.mapContainer}>
        <MapView
          ref={mapRef}
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          mapType={mapType}
          onPress={handleMapPress}
        >
          {pickupLocation && <Marker coordinate={pickupLocation} title="Pickup Location" />}
          {dropoffLocation && <Marker coordinate={dropoffLocation} title="Dropoff Location" />}

          {pickupLocation && dropoffLocation && (
            <MapViewDirections
              origin={pickupLocation}
              destination={dropoffLocation}
              apikey="AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8"
              strokeColor={colors.secondary}
              strokeWidth={3}
              optimizeWaypoints={true}
              onReady={result => {
                mapRef.current.fitToCoordinates(result.coordinates, {
                  edgePadding: {
                    right: 20,
                    bottom: 50,
                    left: 20,
                    top: 50,
                  },
                });
              }}
            />
          )}
        </MapView>
      </View>
      {data?.status == "accepted" && <View style={[styles.boxx, { borderColor: colors.primary, padding: 15, marginTop: 10, marginBottom: 25 }]}>
        <View style={{ paddingBottom: 10, display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <View style={{ gap: 10, paddingLeft: 15 }}>
            <Text style={{ opacity: 0.7, color: colors.text }}>Vehicle Number</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15, color: colors.text }}>{data?.DriverDetail?.Vehicles?.registrationNumber}</Text>
            <Text style={{ color: colors.text }}>{`(${data?.DriverDetail?.driverType})`}</Text>
          </View>
          <View>
            <Image source={{ uri: data?.DriverDetail?.Vehicles?.vehicleImageUrl?.preview }} style={{ width: 130, height: 100, borderRadius: 10 }} />
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", height: 200, borderTopWidth: 1, borderBottomWidth: 1, borderColor: colors.text, borderStyle: "solid" }}>
          <View style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", width: 80 }}>
            <Icon
              raised
              name='circle'
              type='font-awesome'
              color={colors.primary}
              backgroundColor="red"
            />
            <Text style={{ height: 50, width: 3, borderLeftWidth: 2, borderStyle: "dotted", borderLeftColor: colors.text }}>helo</Text>
            <Icon
              raised
              name='map-marker'
              type='font-awesome'
              color={colors.primary}
            />
          </View>
          <View style={{ display: "flex", flexDirection: 'column', justifyContent: 'space-between', paddingVertical: 25, height: "100%" }}>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '900', color: colors.text }}>From :</Text>
              <Text style={{ color: colors.text, maxWidth: 220 }}>{address?.source}</Text>
            </View>
            <View>
              <Text style={{ fontSize: 17, fontWeight: '900', color: colors.text }}>To :</Text>
              <Text style={{ color: colors.text, maxWidth: 220 }}>{address?.drop}</Text>
            </View>
          </View>
        </View>
        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", gap: 5, paddingTop: 20, marginBottom: 20 }}>
          <Image source={{ uri: data?.DriverDetail?.User?.UserProfile?.userProfileImageDetails?.preview }} style={{ width: 60, height: 60, borderRadius: 100 }} />
          <View style={{ width: "50%" }}>
            <Text style={{ opacity: 0.7, color: colors.text }}>Driver Name</Text>
            <Text style={{ fontWeight: "bold", fontSize: 15, color: colors.text }}>{data?.DriverDetail?.driverName}</Text>
            <Text style={{ color: colors.text, marginTop: 5 }}>{`( ${data?.DriverDetail?.User?.phone} )`}</Text>
          </View>
          <Icon
            raised
            name='phone'
            type='font-awesome'
            color={colors.primary}
            size={20}
            onPress={() => { handleContactTrader(data?.DriverDetail?.User?.phone) }}
          />
        </View>
      </View>}
      {data?.status == "pending" && <View style={[styles.boxx, { borderColor: colors.primary, padding: 15, marginTop: 30, display: "flex", justifyContent: "center", alignItems: "center" }]}><Text style={{ color: colors.text }}>Driver will Accept Your Request very soon. Just wait for some more minutes...</Text></View>}
    </ScrollView>
  </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  mapContainer: {
    height: 350,
    marginTop: 16,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  boxx: {
    borderWidth: 2,
    borderStyle: "solid",
    width: "100%",
    borderRadius: 10,
  },
  mapTypeContainer: {
    flexDirection: 'row',
    position: 'absolute',
    top: 10,
    left: 10,
    borderRadius: 5,
  },
  mapTypeButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  activeMapType: {},
  mapTypeText: {
    fontSize: 14,
  },
});

export default CabDetails;
