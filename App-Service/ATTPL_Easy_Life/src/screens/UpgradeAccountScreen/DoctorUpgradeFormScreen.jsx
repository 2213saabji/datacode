import React, {useState, useEffect, useCallback} from 'react';
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
import {
  deleteUserFileFromAWSS3,
  uploadUserFileInAWSS3,
} from '../../redux/slices/simpleFunctions/aws-s3-file-handler';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import SaveButton from '../../components/EditProfile/SaveButton';

const ExperienceLevelTabs = [
  {
    value: '<1year',
    label: 'Less than 1 year',
  },
  {
    value: '1year',
    label: '1 year',
  },
  {
    value: '2years',
    label: '2 years',
  },
  {
    value: '3years',
    label: '3 years',
  },
  {
    value: '4years',
    label: '4 years',
  },
  {
    value: '5years',
    label: '5 years',
  },
  {
    value: '6years',
    label: '6 years',
  },
  {
    value: '7years',
    label: '7 years',
  },
  {
    value: '8years',
    label: '8 years',
  },
  {
    value: '9years',
    label: '9 years',
  },
  {
    value: '10years',
    label: '10 years',
  },
  {
    value: '10-15years',
    label: '10 to 15 years',
  },
  {
    value: '15-20years',
    label: '15 to 20 years',
  },
  {
    value: '>20years',
    label: 'More than 20 years',
  },
];

const DoctorUpgradeAccountFormScreen = () => {
  const {showAlert} = useCustomAlert();

  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [currentImageTab, setCurrentImageTab] = useState('frontImg');

  const [doctorName, setDoctorName] = useState('');
  const [workEmailId, setWorkEmailId] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [degree, setDegree] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [experienceLevel, setExperienceLevel] = useState('');
  const [hospitalName, setHospitalName] = useState('');
  const [hospitalAddress, setHospitalAddress] = useState('');
  const [hospitalPhoneNumber, setHospitalPhoneNumber] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [licenseNumber, setLicenseNumber] = useState('');
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
              }
              console.log('imageUrl', imageUrl);
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
    const imageUrlToDelete =
      currentImageTab === 'frontImg' ? frontImg : backImg;
    if (imageUrlToDelete) {
      await deleteUserFileFromAWSS3({url: imageUrlToDelete});
      if (currentImageTab === 'frontImg') {
        setFrontImg('');
      } else {
        setBackImg('');
      }
      Alert.alert('Success', 'Image deleted successfully!');
    } else {
      Alert.alert('Error', 'No image to delete.');
    }
  }, [currentImageTab, frontImg, backImg]);

  function formatTime(date) {
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  const formatStringToTime = val => {
    const timeOnly = val.slice(0, 5);
    const ampm = val.slice(-2);
    let [hours, minutes] = timeOnly.split(':').map(Number);
    if (ampm === 'PM' && hours !== 12) {
      hours += 12;
    } else if (ampm === 'AM' && hours === 12) {
      hours = 0;
    }
    const timeString = `${String(hours).padStart(2, '0')}:${String(
      minutes,
    ).padStart(2, '0')}`;
    const time = new Date(`1970-01-01T${timeString}:00`);
    return time;
  };

  const SubmitDoctorForm = async () => {
    if (
      !doctorName ||
      !workEmailId ||
      !phoneNumber ||
      !degree ||
      !specialization ||
      !experienceLevel ||
      !hospitalName ||
      !hospitalAddress ||
      !hospitalPhoneNumber ||
      !startTime ||
      !endTime ||
      !licenseNumber ||
      !frontImg ||
      !backImg
    ) {
      showAlert('Please Fill all details First', 'error');
    } else if (phoneNumber.length != 10 || hospitalPhoneNumber.length != 10) {
      if (phoneNumber.length != 10 && hospitalPhoneNumber.length != 10) {
        showAlert(
          'Phone Number and Hospital Phone Number should be of 10 characters',
          'error',
        );
      } else if (phoneNumber.length != 10) {
        showAlert('Phone Number should be of 10 characters', 'error');
      } else if (hospitalPhoneNumber.length != 10) {
        showAlert('Hospital Phone Number should be of 10 characters', 'error');
      }
    } else {
      try {
        const data = {
          doctorId: user.userId,
          doctorName,
          phoneNumber,
          workEmailId,
          degree,
          specialization,
          experienceLevel,
          hospitalName,
          hospitalAddress,
          hospitalPhoneNumber,
          startTime: formatTime(formatStringToTime(startTime)),
          endTime: formatTime(formatStringToTime(endTime)),
          licenseNumber,
          degreeCertificate: {
            front: backImg,
          },
          licenseImageUrl: {
            front: frontImg,
          },
        };
        const res = await dispatch(RequestDoctorForm({data}));
        if (RequestDoctorForm.fulfilled.match(res)) {
          showAlert('Upgrade Account Request Successfully', 'success');
          setDoctorName('');
          setWorkEmailId('');
          setPhoneNumber('');
          setDegree('');
          setSpecialization('');
          setExperienceLevel('');
          setHospitalName('');
          setHospitalAddress('');
          setHospitalPhoneNumber('');
          setStartTime('');
          setEndTime('');
          setLicenseNumber('');
          setFrontImg('');
          setBackImg('');
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
          Doctor Form
        </Text>

        <View style={styles.container}>
          <View style={styles.stack}>
            <TouchableOpacity onPress={() => setCurrentImageTab('frontImg')}>
              <Text
                style={[
                  styles.tabLabel,
                  {
                    backgroundColor: colors.primary,
                    opacity: currentImageTab === 'frontImg' ? 1 : 0.5,
                  },
                ]}>
                license Image
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
                degree Image
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.imageContainer, styles.centeredContainer]}>
            {currentImageTab === 'frontImg' && frontImg?.preview ? (
              <Image source={{uri: frontImg?.preview}} style={styles.image} />
            ) : currentImageTab === 'backImg' && backImg?.preview ? (
              <Image source={{uri: backImg?.preview}} style={styles.image} />
            ) : (
              <Text style={styles.noImageSelectedText}>No Image Selected</Text>
            )}
          </View>
          <Button
            style={{marginBottom: 10}}
            mode="contained"
            onPress={handleImagePick}>
            {currentImageTab == 'frontImg'
              ? `Upload license Image`
              : `Upload degree Image`}
          </Button>
          {currentImageTab == 'frontImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!frontImg}>
              Remove license Image
            </Button>
          )}
          {currentImageTab == 'backImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!backImg}>
              Remove degree Image
            </Button>
          )}
        </View>

        <InputField
          label="Name"
          value={doctorName}
          onChangeText={setDoctorName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Work Email"
          value={workEmailId}
          onChangeText={setWorkEmailId}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="Degree"
          value={degree}
          onChangeText={setDegree}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Specialization"
          value={specialization}
          onChangeText={setSpecialization}
          colors={colors}
          fonts={fonts}
        />
        <SingleDropdownComponent
          label="Choose your Experinece Level"
          options={ExperienceLevelTabs}
          value={experienceLevel}
          setValue={setExperienceLevel}
          containerColor={colors.borderColor}
          inputBorderWidth={1}
          inputBorderRadius={5}
        />
        <InputField
          label="Hospital Name"
          value={hospitalName}
          onChangeText={setHospitalName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Hospital Address"
          value={hospitalAddress}
          onChangeText={setHospitalAddress}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Hospital Phone Number"
          value={hospitalPhoneNumber}
          onChangeText={setHospitalPhoneNumber}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="License Number"
          value={licenseNumber}
          onChangeText={setLicenseNumber}
          colors={colors}
          fonts={fonts}
        />

        <TimePickerInput
          label="Start Time"
          value={startTime}
          onChangeText={setStartTime}
          colors={colors}
          fonts={fonts}
        />
        <TimePickerInput
          label="End Time"
          value={endTime}
          onChangeText={setEndTime}
          colors={colors}
          fonts={fonts}
        />

        <SaveButton
          onPress={SubmitDoctorForm}
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

export default DoctorUpgradeAccountFormScreen;
