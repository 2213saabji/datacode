import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';

import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectIsDarkTheme, selectTheme} from '../../redux/selectors';
import {GooglePlacesAutocomplete} from 'react-native-google-places-autocomplete';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

import {useNavigation} from '@react-navigation/native';
import UserProfilePercentage from '../../components/userProfileCompletion';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
// import { useDispatch, useSelector } from 'react-redux';
import {Button, DataTable} from 'react-native-paper';
import {
  FetchServiceHistory,
  RequestDoctorForm,
} from '../../redux/slices/UMS/authSlice';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import {JOB_TITLES} from '../../data/appScreens';
import InputField from '../../components/EditProfile/InputField';
import TimePickerInput from '../../components/EditProfile/timePicker';
import ImagePicker from 'react-native-image-crop-picker';
import Modal from 'react-native-modal';

import {
  deleteUserFileFromAWSS3,
  uploadUserFileInAWSS3,
} from '../../redux/slices/simpleFunctions/aws-s3-file-handler';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import SaveButton from '../../components/EditProfile/SaveButton';
import {lightTheme, darkTheme} from '../../Theme/themes';

const DeliveryRequestFormScreen = () => {
  const {showAlert} = useCustomAlert();
  const navigation = useNavigation();
  const IsDarkTheme = useSelector(selectIsDarkTheme);
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [mapType, setMapType] = useState('standard');
  const mapRef = useRef(null);
  const [isPickupLocationMapVisible, setIsPickupLocationMapVisible] =
    useState(false);
  const [isDropLocationMapVisible, setIsDropLocationMapVisible] =
    useState(false);
  const pickupRef = useRef(null);
  const dropRef = useRef(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedDropLocation, setSelectedDropLocation] = useState(null);

  const [currentImageTab, setCurrentImageTab] = useState('frontImg');

  const [itemName, setItemName] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [size, setSize] = useState('');
  const [weight, setWeight] = useState('');
  const [dropLocationContactNumber, setDropLocationContactNumber] =
    useState('');
  const [pickupLocationLat, setPickupLocationLat] = useState('');
  const [pickupLocationLong, setPickupLocationLong] = useState('');
  const [dropoffLocationLat, setDropoffLocationLat] = useState('');
  const [dropoffLocationLong, setDropoffLocationLong] = useState('');
  const [frontImg, setFrontImg] = useState('');

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
      setPickupLocationLat(lat.toString());
      setPickupLocationLong(lng.toString());

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
      setDropoffLocationLat(lat.toString());
      setDropoffLocationLong(lng.toString());
      if (mapRef.current) {
        mapRef.current.animateToRegion(newRegion, 1000);
      }
    }
  };

  const handlePickMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedLocation(coordinate);
    setPickupLocationLat(coordinate.latitude.toString());
    setPickupLocationLong(coordinate.longitude.toString());
  };
  const handleDropMapPress = event => {
    const {coordinate} = event.nativeEvent;
    setSelectedDropLocation(coordinate);
    setDropoffLocationLat(coordinate.latitude.toString());
    setDropoffLocationLong(coordinate.longitude.toString());
  };

  const resetForm = () => {
    if (pickupRef.current) {
      pickupRef.current.clear();
    }
    if (dropRef.current) {
      dropRef.current.clear();
    }

    setSelectedLocation(null);
    setSelectedDropLocation(null);
  };

  const handleImagePick = useCallback(() => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.7,
    })
      .then(async image => {
        const formData = new FormData();
        formData.append('image', {
          uri: image.path,
          name: image.filename || `temp_image_${Date.now()}.jpg`,
          type: image.mime,
        });

        try {
          // Dispatch the thunk action and wait for the result
          const resultAction = await dispatch(uploadUserFileInAWSS3(formData));

          if (uploadUserFileInAWSS3.fulfilled.match(resultAction)) {
            const imageUrl = resultAction.payload?.data?.data || '';

            if (imageUrl) {
              if (currentImageTab === 'frontImg') {
                setFrontImg(imageUrl);
              }
              showAlert('Image uploaded successfully!', 'Success');
            } else {
              Alert.alert('Error', 'Error uploading image.');
            }
          } else {
            Alert.alert(
              'Error',
              resultAction.payload || 'Error2 uploading image.',
            );
          }
        } catch (error) {
          console.error('Error uploading image:', error.message, error);
          Alert.alert('Error', `Error3 uploading image: ${error.message}`);
        }
      })
      .catch(error => {
        console.error('Error picking image:', error.message, error);
        Alert.alert('Error', `Error picking image: ${error.message}`);
      });
  }, [currentImageTab]);

  const handleRemoveFile = useCallback(async () => {
    const imageUrlToDelete = frontImg;
    if (imageUrlToDelete) {
      await deleteUserFileFromAWSS3({url: imageUrlToDelete});
      if (currentImageTab === 'frontImg') {
        setFrontImg('');
      }
      Alert.alert('Success', 'Image deleted successfully!');
    } else {
      Alert.alert('Error', 'No image to delete.');
    }
  }, [currentImageTab]);

  const SubmitForm = async () => {
    if (
      !itemName ||
      !contactNumber ||
      !width ||
      !height ||
      !size ||
      !weight ||
      !dropLocationContactNumber
    ) {
      showAlert('Please Fill all details First', 'error');
    } else if (
      !pickupLocationLat ||
      !pickupLocationLong ||
      !dropoffLocationLat ||
      !dropoffLocationLong
    ) {
      showAlert('Please Enter the Valid Location', 'error');
    } else {
      try {
        const data = {};
        const res = await dispatch(RequestDoctorForm({data}));
        if (RequestDoctorForm.fulfilled.match(res)) {
          showAlert('Upgrade Account Request Successfully', 'success');
        } else if (RequestDoctorForm.rejected.match(res)) {
          if (res?.payload?.message == 'Validation error') {
            showAlert(
              'You have already made request with this License Number',
              'error',
            );
          } else {
            showAlert("Error Occur's while Uploading your Request", 'error');
          }
        }
      } catch (error) {
        showAlert(error || 'An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              ...fonts.titleMedium,
              paddingTop: 5,
              marginBottom: 15,
              fontSize: 20,
            },
          ]}>
          DELIVERY REQUEST
        </Text>
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, marginBottom: 30},
          ]}>
          New Request
        </Text>
        {/* <Image
        source={require('../../assets/FarmersCareerRoadMap/images/Farmer_Career_Roadmap.png')}
        style={styles.horizontalImage}
      /> */}

        <View style={styles.container}>
          <View style={[styles.imageContainer, styles.centeredContainer]}>
            {currentImageTab === 'frontImg' && frontImg?.preview ? (
              <Image source={{uri: frontImg?.preview}} style={styles.image} />
            ) : (
              <Text
                style={[
                  styles.noImageSelectedText,
                  {color: colors.text, borderColor: colors.text},
                ]}>
                No Item Selected
              </Text>
            )}
          </View>
          <Button
            style={{marginBottom: 10}}
            mode="contained"
            onPress={handleImagePick}>
            {`Upload Item Image`}
          </Button>
          {currentImageTab == 'frontImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!frontImg}>
              Remove Item Image
            </Button>
          )}
        </View>

        <InputField
          label="Item Name"
          value={itemName}
          onChangeText={setItemName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Contact Number"
          value={contactNumber}
          onChangeText={setContactNumber}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Item Width"
          value={width}
          onChangeText={setWidth}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Item Height"
          value={height}
          onChangeText={setHeight}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Item Size"
          value={size}
          onChangeText={setSize}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Item Weight"
          value={weight}
          onChangeText={setWeight}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Drop Location Contact Number"
          value={dropLocationContactNumber}
          onChangeText={setDropLocationContactNumber}
          colors={colors}
          fonts={fonts}
        />
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Pickup Location
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              opacity: selectedLocation ? 1 : 0.5,
            },
          ]}
          onPress={() => setIsPickupLocationMapVisible(true)}>
          <Text
            style={[
              styles.buttonText,
              {color: colors.surface, ...fonts.button},
            ]}>
            Choose on Map
          </Text>
        </TouchableOpacity>

        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Drop Location
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            {
              backgroundColor: colors.primary,
              marginBottom: 20,
              opacity: selectedDropLocation ? 1 : 0.5,
            },
          ]}
          onPress={() => setIsDropLocationMapVisible(true)}>
          <Text
            style={[
              styles.buttonText,
              {color: colors.surface, ...fonts.button},
            ]}>
            Choose on Map
          </Text>
        </TouchableOpacity>

        <SaveButton
          onPress={SubmitForm}
          colors={colors}
          fonts={fonts}
          marginBottom={20}
          text="Submit Request"
        />
      </ScrollView>

      {/* ------------ pickup location map ------------ */}

      <Modal
        isVisible={isPickupLocationMapVisible}
        onBackdropPress={() => setIsPickupLocationMapVisible(false)}>
        <View style={[styles.modalContainer, {}]}>
          <View style={[styles.modalContent, {}]}>
            <View style={[styles.card, {borderColor: colors.border}]}>
              <GooglePlacesAutocomplete
                ref={pickupRef}
                placeholder="Search Pickup Location"
                fetchDetails={true}
                enablePoweredByContainer={false}
                onPress={handlePlaceSelect}
                query={{
                  key: 'AIzaSyDMvHTvx8oVrT5NDIXLck6aqLacu3tIHU8',
                  language: 'en',
                }}
                styles={{
                  container: styles.autocompleteContainer,
                  textInput: [
                    styles.autocompleteInput,
                    {
                      backgroundColor: IsDarkTheme
                        ? lightTheme.colors.background
                        : darkTheme.colors.background,
                      color: IsDarkTheme
                        ? lightTheme.colors.text
                        : darkTheme.colors.text,
                      placeholderTextColor: 'white',
                    },
                  ],
                  listView: {
                    marginTop: 5,
                    borderRadius: 5,
                  },
                  row: {
                    backgroundColor: IsDarkTheme
                      ? lightTheme.colors.background
                      : darkTheme.colors.background,
                    borderRadius: 5,
                    marginBottom: 10,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: IsDarkTheme
                      ? lightTheme.colors.text
                      : darkTheme.colors.text,
                  },
                  description: {
                    color: IsDarkTheme
                      ? lightTheme.colors.text
                      : darkTheme.colors.text,
                    borderRadius: 5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
                textInputProps={{
                  placeholderTextColor: IsDarkTheme
                    ? lightTheme.colors.text
                    : darkTheme.colors.text,
                  borderRadius: 5,
                }}
              />
              <View style={styles.mapContainer}>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: selectedLocation
                      ? selectedLocation.latitude
                      : 21.1702,
                    longitude: selectedLocation
                      ? selectedLocation.longitude
                      : 72.8311,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  mapType={mapType}
                  onPress={handlePickMapPress}>
                  {selectedLocation && <Marker coordinate={selectedLocation} />}
                </MapView>
                <View
                  style={[
                    styles.mapTypeContainer,
                    {backgroundColor: colors.surface},
                  ]}>
                  <TouchableOpacity
                    style={[
                      styles.mapTypeButton,
                      mapType === 'standard' && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setMapType('standard')}>
                    <Text style={[styles.mapTypeText, {color: colors.text}]}>
                      Map
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mapTypeButton,
                      mapType === 'satellite' && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setMapType('satellite')}>
                    <Text style={[styles.mapTypeText, {color: colors.text}]}>
                      Satellite
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {selectedLocation && (
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
                    onPress={() => setIsPickupLocationMapVisible(false)}>
                    Done
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>

      {/* ------------ drop location map ------------ */}

      <Modal
        isVisible={isDropLocationMapVisible}
        onBackdropPress={() => setIsDropLocationMapVisible(false)}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={[styles.card, {borderColor: colors.border}]}>
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
                  textInput: [
                    styles.autocompleteInput,
                    {
                      backgroundColor: IsDarkTheme
                        ? lightTheme.colors.background
                        : darkTheme.colors.background,
                      color: IsDarkTheme
                        ? lightTheme.colors.text
                        : darkTheme.colors.text,
                      placeholderTextColor: 'white',
                    },
                  ],
                  listView: {
                    marginTop: 5,
                    borderRadius: 5,
                  },
                  row: {
                    backgroundColor: IsDarkTheme
                      ? lightTheme.colors.background
                      : darkTheme.colors.background,
                    borderRadius: 5,
                    marginBottom: 10,
                    overflow: 'hidden',
                    borderWidth: 1,
                    borderColor: IsDarkTheme
                      ? lightTheme.colors.text
                      : darkTheme.colors.text,
                  },
                  description: {
                    color: IsDarkTheme
                      ? lightTheme.colors.text
                      : darkTheme.colors.text,
                    borderRadius: 5,
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  },
                }}
                textInputProps={{
                  placeholderTextColor: IsDarkTheme
                    ? lightTheme.colors.text
                    : darkTheme.colors.text,
                  borderRadius: 5,
                }}
              />
              <View style={styles.mapContainer}>
                <MapView
                  ref={mapRef}
                  provider={PROVIDER_GOOGLE}
                  style={styles.map}
                  initialRegion={{
                    latitude: selectedDropLocation
                      ? selectedDropLocation.latitude
                      : 21.1702,
                    longitude: selectedDropLocation
                      ? selectedDropLocation.longitude
                      : 72.8311,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                  mapType={mapType}
                  onPress={handleDropMapPress}>
                  {selectedDropLocation && (
                    <Marker coordinate={selectedDropLocation} />
                  )}
                </MapView>
                <View
                  style={[
                    styles.mapTypeContainer,
                    {backgroundColor: colors.surface},
                  ]}>
                  <TouchableOpacity
                    style={[
                      styles.mapTypeButton,
                      mapType === 'standard' && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setMapType('standard')}>
                    <Text style={[styles.mapTypeText, {color: colors.text}]}>
                      Map
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={[
                      styles.mapTypeButton,
                      mapType === 'satellite' && {
                        backgroundColor: colors.primary,
                      },
                    ]}
                    onPress={() => setMapType('satellite')}>
                    <Text style={[styles.mapTypeText, {color: colors.text}]}>
                      Satellite
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
              {selectedDropLocation && (
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
                    onPress={() => setIsDropLocationMapVisible(false)}>
                    Done
                  </Button>
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  stack: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
  },
  autocompleteContainer: {
    position: 'absolute',
    top: -40,
    left: 16,
    right: 16,
    zIndex: 1,
  },
  autocompleteInput: {
    height: 50,
    fontSize: 16,
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
  selectedLocationContainer: {
    marginHorizontal: 16,
    marginTop: 16,
  },
  modalContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    width: '100%',
    height: '80%',
  },
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  horizontalImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  noImageSelectedText: {
    borderWidth: 2,
    borderStyle: 'solid',
    padding: 10,
    width: 170,
    height: 170,
    textAlign: 'center',
    textAlignVertical: 'center',
    // borderRadius: 500
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    // borderRadius: 500
  },
});

export default DeliveryRequestFormScreen;
