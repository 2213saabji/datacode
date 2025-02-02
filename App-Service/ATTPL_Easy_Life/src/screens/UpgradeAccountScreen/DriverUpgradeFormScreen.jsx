import React, {useState, useCallback} from 'react';
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
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {Button} from 'react-native-paper';
import {RequestDriverForm} from '../../redux/slices/UMS/authSlice';
import InputField from '../../components/EditProfile/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import {
  deleteUserFileFromAWSS3,
  uploadUserFileInAWSS3,
} from '../../redux/slices/simpleFunctions/aws-s3-file-handler';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import SaveButton from '../../components/EditProfile/SaveButton';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import DatePickerInput from '../../components/EditProfile/datePicker';

const driverTypes = [
  {value: 'ambulance driver', label: 'Ambulance Driver'},
  {value: 'cab driver', label: 'Cab Driver'},
  {value: 'delivery driver', label: 'Delivery Driver'},
];

const accountTypes = [
  {value: 'saving', label: 'Saving'},
  {value: 'current', label: 'Current'},
];

const paymentMethods = [
  {value: 'cash', label: 'Cash'},
  {value: 'upi', label: 'UPI'},
  {value: 'card payment', label: 'Card Payment'},
  {value: 'net banking', label: 'Net Banking'},
  {value: 'mobile wallet', label: 'Mobile Wallet'},
  {value: 'cryptocurrency', label: 'Cryptocurrency'},
  {value: 'bank transfer', label: 'Bank Transfer'},
  {value: 'cheque', label: 'Cheque'},
];

const TrueFalse = [
  {label: 'Yes', value: 'true'},
  {label: 'No', value: 'false'},
];

const statesOfIndia = [
  {label: 'Andhra Pradesh', value: 'andhra pradesh'},
  {label: 'Arunachal Pradesh', value: 'arunachal pradesh'},
  {label: 'Andaman and Nicobar Islands', value: 'andaman and nicobar islands'},
  {label: 'Assam', value: 'assam'},
  {label: 'Bihar', value: 'bihar'},
  {label: 'Chhattisgarh', value: 'chhattisgarh'},
  {label: 'Chandigarh', value: 'chandigarh'},
  {label: 'Delhi', value: 'delhi'},
  {label: 'Dadra and Nagar Haveli', value: 'dadra and nagar haveli'},
  {label: 'Daman and Diu', value: 'daman and diu'},
  {label: 'Goa', value: 'goa'},
  {label: 'Gujarat', value: 'gujarat'},
  {label: 'Haryana', value: 'haryana'},
  {label: 'Himachal Pradesh', value: 'himachal pradesh'},
  {label: 'Jharkhand', value: 'jharkhand'},
  {label: 'Jammu and Kashmir', value: 'jammu and kashmir'},
  {label: 'Karnataka', value: 'karnataka'},
  {label: 'Kerala', value: 'kerala'},
  {label: 'Lakshadweep', value: 'lakshadweep'},
  {label: 'Ladakh', value: 'ladakh'},
  {label: 'Madhya Pradesh', value: 'madhya pradesh'},
  {label: 'Maharashtra', value: 'maharashtra'},
  {label: 'Manipur', value: 'manipur'},
  {label: 'Meghalaya', value: 'meghalaya'},
  {label: 'Mizoram', value: 'mizoram'},
  {label: 'Nagaland', value: 'nagaland'},
  {label: 'Odisha', value: 'odisha'},
  {label: 'Punjab', value: 'punjab'},
  {label: 'Puducherry', value: 'puducherry'},
  {label: 'Rajasthan', value: 'rajasthan'},
  {label: 'Sikkim', value: 'sikkim'},
  {label: 'Tamil Nadu', value: 'tamil nadu'},
  {label: 'Telangana', value: 'telangana'},
  {label: 'Tripura', value: 'tripura'},
  {label: 'Uttar Pradesh', value: 'uttar pradesh'},
  {label: 'Uttarakhand', value: 'uttarakhand'},
  {label: 'West Bengal', value: 'west bengal'},
];

const DRIVER_VEHICLE_OPTIONS = [
  {label: 'AUTO', value: 'Auto'},
  {label: 'BIKE', value: 'Bike'},
  {label: 'MINI', value: 'Mini Prime'},
  {label: 'PICKUP', value: 'Pickup'},
  {label: 'SEDAN', value: 'Sedan Prime'},
  {label: 'SUV', value: 'SUV'},
  {label: 'TEMPOO', value: 'Tempo'},
  {label: 'TRUCK', value: 'Truck'},
];

const DriverUpgradeAccountFormScreen = () => {
  const {showAlert} = useCustomAlert();

  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [currentImageTab, setCurrentImageTab] = useState('frontImg');

  const [driverName, setDriverName] = useState('');
  const [driverType, setDriverType] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
  const [licenseExpirationDate, setLicenseExpirationDate] = useState('');
  const [licenseIssuingState, setLicenseIssuingState] = useState('');
  const [accountType, setAccountType] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [vehicleName, setVehicleName] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [chassisNumber, setChassisNumber] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [color, setColor] = useState('');
  const [manufacturingYear, setManufacturingYear] = useState('');
  const [engineNumber, setEngineNumber] = useState('');
  const [fuelType, setFuelType] = useState('');
  const [grossVehicleWeight, setGrossVehicleWeight] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [maintenanceHistory, setMaintenanceHistory] = useState('');
  const [vehicleCondition, setVehicleCondition] = useState('');
  const [availability, setAvailability] = useState('');
  const [gpsTracking, setGpsTracking] = useState('');
  const [insuranceExpiryDate, setInsuranceExpiryDate] = useState('');
  const [additionalEquipment, setAdditionalEquipment] = useState('');
  const [vehicleImageUrl, setVehicleImageUrl] = useState('');
  const [insurancePdf, setInsurancePdf] = useState('');
  const [rcPdf, setRcPdf] = useState('');
  const [frontImg, setFrontImg] = useState('');
  const [backImg, setBackImg] = useState('');

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
              } else if (currentImageTab === 'backImg') {
                setBackImg(imageUrl);
              } else if (currentImageTab === 'vehicleImageUrl') {
                setVehicleImageUrl(imageUrl);
              } else if (currentImageTab === 'insurancePdf') {
                setInsurancePdf(imageUrl);
              } else if (currentImageTab === 'rcPdf') {
                setRcPdf(imageUrl);
              }
              showAlert('Image uploaded successfully!', 'success');
            } else {
              showAlert('Error uploading image.', 'error');
            }
          } else {
            showAlert(
              resultAction.payload.message || 'Error uploading image.',
              'error',
            );
          }
        } catch (error) {
          console.error('Error uploading image:', error.message, error);
          showAlert(`Error uploading image: ${error.message}`, 'error');
        }
      })
      .catch(error => {
        console.error('Error picking image:', error.message, error);
        showAlert(`Error picking image: ${error.message}`, 'error');
      });
  }, [currentImageTab]);

  const handleRemoveFile = useCallback(async () => {
    const imageUrlToDelete =
      currentImageTab === 'frontImg' ? frontImg : backImg;
    if (imageUrlToDelete) {
      await deleteUserFileFromAWSS3({url: imageUrlToDelete});
      if (currentImageTab === 'frontImg') {
        setFrontImg('');
      } else {
        setBackImg('');
      }
      showAlert('Image deleted successfully!', 'success');
    } else {
      showAlert('No image to delete.', 'error');
    }
  }, [currentImageTab, frontImg, backImg]);

  const SubmitDriverForm = async () => {
    if (
      !driverName ||
      !driverType ||
      !licenseNumber ||
      !licenseExpirationDate ||
      !licenseIssuingState ||
      !accountType ||
      !paymentMethod ||
      !vehicleName ||
      !model ||
      !year ||
      !chassisNumber ||
      !vehicleType ||
      !color ||
      !manufacturingYear ||
      !engineNumber ||
      !fuelType ||
      !grossVehicleWeight ||
      !registrationNumber ||
      !maintenanceHistory ||
      !vehicleCondition ||
      !availability ||
      !gpsTracking ||
      !insuranceExpiryDate ||
      !additionalEquipment ||
      !vehicleImageUrl ||
      !insurancePdf ||
      !rcPdf ||
      !frontImg ||
      !backImg
    ) {
      showAlert('Please Fill all details First', 'error');
    } else {
      try {
        const driverData = {
          userId: user.userId,
          driverName,
          driverType,
          licenseNumber,
          licenseExpirationDate,
          licenseIssuingState,
          licenseNumberFrontImage: frontImg,
          licenseNumberBackImage: backImg,
          accountType,
          paymentMethod,
          approvalStatus: 0,
        };

        const vehicleData = {
          vehicleName,
          model,
          year,
          chassisNumber,
          vehicleType,
          color,
          manufacturingYear,
          engineNumber,
          fuelType,
          registrationNumber,
          grossVehicleWeight,
          maintenanceHistory,
          vehicleCondition,
          availability,
          gpsTracking,
          insuranceExpiryDate,
          additionalEquipment,
          vehicleImageUrl,
          insurancePdf,
          rcPdf,
        };

        const data = {
          driver: driverData,
          vehicle: vehicleData,
        };
        const res = await dispatch(RequestDriverForm({data}));
        if (RequestDriverForm.fulfilled.match(res)) {
          showAlert('Upgrade Account Request Successfully', 'success');
          // setEmailId("");
        } else if (RequestDriverForm.rejected.match(res)) {
          showAlert("Error Occur's while Uploading your Request", 'error');
        }
      } catch (error) {
        showAlert(error || 'An unexpected error occurred', 'error');
      }
    }
  };

  return (
    <>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.headerLeadings}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {color: colors.surface, ...fonts.titleMedium},
            ]}>
            Upgrade Account Form
          </Text>
        </View>
      </View>

      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium, marginBottom: 30},
          ]}>
          DRIVER FORM
        </Text>

        <View style={styles.container}>
          <View
            style={[styles.stack, {display: 'flex', flexDirection: 'column'}]}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity onPress={() => setCurrentImageTab('frontImg')}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      backgroundColor: colors.primary,
                      opacity: currentImageTab === 'frontImg' ? 1 : 0.5,
                    },
                  ]}>
                  License Front
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentImageTab('backImg')}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      backgroundColor: colors.primary,
                      opacity: currentImageTab === 'backImg' ? 1 : 0.5,
                    },
                  ]}>
                  License Back
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setCurrentImageTab('vehicleImageUrl')}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      backgroundColor: colors.primary,
                      opacity: currentImageTab === 'vehicleImageUrl' ? 1 : 0.5,
                    },
                  ]}>
                  Vehicle Image
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setCurrentImageTab('rcPdf')}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      backgroundColor: colors.primary,
                      opacity: currentImageTab === 'rcPdf' ? 1 : 0.5,
                    },
                  ]}>
                  RC Image
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: 10,
                justifyContent: 'center',
              }}>
              <TouchableOpacity
                onPress={() => setCurrentImageTab('insurancePdf')}>
                <Text
                  style={[
                    styles.tabLabel,
                    {
                      backgroundColor: colors.primary,
                      opacity: currentImageTab === 'insurancePdf' ? 1 : 0.5,
                    },
                  ]}>
                  Insurance Image
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.imageContainer, styles.centeredContainer]}>
            {currentImageTab === 'frontImg' && frontImg?.preview ? (
              <Image source={{uri: frontImg?.preview}} style={styles.image} />
            ) : currentImageTab === 'backImg' && backImg?.preview ? (
              <Image source={{uri: backImg?.preview}} style={styles.image} />
            ) : currentImageTab === 'vehicleImageUrl' &&
              vehicleImageUrl?.preview ? (
              <Image
                source={{uri: vehicleImageUrl?.preview}}
                style={styles.image}
              />
            ) : currentImageTab === 'insurancePdf' && insurancePdf?.preview ? (
              <Image
                source={{uri: insurancePdf?.preview}}
                style={styles.image}
              />
            ) : currentImageTab === 'rcPdf' && rcPdf?.preview ? (
              <Image source={{uri: rcPdf?.preview}} style={styles.image} />
            ) : (
              <Text style={styles.noImageSelectedText}>No Image Selected</Text>
            )}
          </View>
          <Button
            style={{marginBottom: 10}}
            mode="contained"
            onPress={handleImagePick}>
            {currentImageTab == 'frontImg'
              ? `Upload License Front Image`
              : currentImageTab == 'backImg'
              ? `Upload License Back Image`
              : currentImageTab == 'vehicleImageUrl'
              ? `Upload Vehicle Image`
              : currentImageTab == 'rcPdf'
              ? `Upload RC Image`
              : currentImageTab == 'insurancePdf'
              ? `Upload Insurance Image`
              : ''}
          </Button>
          {currentImageTab == 'frontImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!frontImg}>
              Remove License Front Image
            </Button>
          )}
          {currentImageTab == 'backImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!backImg}>
              Remove License Back Image
            </Button>
          )}
          {currentImageTab == 'vehicleImageUrl' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!vehicleImageUrl}>
              Remove Vehicle Image
            </Button>
          )}
          {currentImageTab == 'insurancePdf' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!insurancePdf}>
              Remove RC Image
            </Button>
          )}
          {currentImageTab == 'rcPdf' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!rcPdf}>
              Remove Insurance Image
            </Button>
          )}
        </View>

        <InputField
          label="Name"
          value={driverName}
          onChangeText={setDriverName}
          colors={colors}
          fonts={fonts}
        />
        <SingleDropdownComponent
          label="Driver Type"
          options={driverTypes}
          value={driverType}
          setValue={setDriverType}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <InputField
          label="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          colors={colors}
          fonts={fonts}
        />
        <DatePickerInput
          label="License Expiration Date"
          value={licenseExpirationDate}
          onChangeText={setLicenseExpirationDate}
          colors={colors}
          fonts={fonts}
        />
        <SingleDropdownComponent
          label="Choose License Issuing State"
          options={statesOfIndia}
          value={licenseIssuingState}
          setValue={setLicenseIssuingState}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <SingleDropdownComponent
          label="Account Type"
          options={accountTypes}
          value={accountType}
          setValue={setAccountType}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <SingleDropdownComponent
          label="Payment Method"
          options={paymentMethods}
          value={paymentMethod}
          setValue={setPaymentMethod}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <InputField
          label="Vehicle Name"
          value={vehicleName}
          onChangeText={setVehicleName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Model"
          value={model}
          onChangeText={setModel}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="Year"
          value={year}
          onChangeText={setYear}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="Chassis Number"
          value={chassisNumber}
          onChangeText={setChassisNumber}
          colors={colors}
          fonts={fonts}
        />
        <SingleDropdownComponent
          label="Vehicle Type"
          options={DRIVER_VEHICLE_OPTIONS}
          value={vehicleType}
          setValue={setVehicleType}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <InputField
          label="Color"
          value={color}
          onChangeText={setColor}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Manufacturing Year"
          value={manufacturingYear}
          onChangeText={setManufacturingYear}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="Engine Number"
          value={engineNumber}
          onChangeText={setEngineNumber}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Fuel Type"
          value={fuelType}
          onChangeText={setFuelType}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Gross Vehicle Weight"
          value={grossVehicleWeight}
          onChangeText={setGrossVehicleWeight}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Registration Number"
          value={registrationNumber}
          onChangeText={setRegistrationNumber}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Maintenance History"
          value={maintenanceHistory}
          onChangeText={setMaintenanceHistory}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Vehicle Condition"
          value={vehicleCondition}
          onChangeText={setVehicleCondition}
          colors={colors}
          fonts={fonts}
        />
        <SingleDropdownComponent
          label="Availability"
          options={TrueFalse}
          value={availability}
          setValue={setAvailability}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <SingleDropdownComponent
          label="GPS Tracking"
          options={TrueFalse}
          value={gpsTracking}
          setValue={setGpsTracking}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <DatePickerInput
          label="Insurance Expiration Date"
          value={insuranceExpiryDate}
          onChangeText={setInsuranceExpiryDate}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Additional Equipment"
          value={additionalEquipment}
          onChangeText={setAdditionalEquipment}
          colors={colors}
          fonts={fonts}
        />

        <SaveButton
          onPress={SubmitDriverForm}
          colors={colors}
          fonts={fonts}
          marginBottom={20}
        />
      </ScrollView>
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
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: 'white',
    borderStyle: 'solid',
    padding: 10,
    width: 170,
    height: 170,
    textAlign: 'center',
    textAlignVertical: 'center',
    borderRadius: 500,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
    borderRadius: 500,
  },
});

export default DriverUpgradeAccountFormScreen;
