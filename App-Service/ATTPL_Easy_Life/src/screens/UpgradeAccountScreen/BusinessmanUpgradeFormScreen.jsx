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
import {RequestBusinessmanForm} from '../../redux/slices/UMS/authSlice';
import InputField from '../../components/EditProfile/InputField';
import ImagePicker from 'react-native-image-crop-picker';
import {
  deleteUserFileFromAWSS3,
  uploadUserFileInAWSS3,
} from '../../redux/slices/simpleFunctions/aws-s3-file-handler';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import SaveButton from '../../components/EditProfile/SaveButton';

const BusinessmanUpgradeAccountFormScreen = () => {
  const {showAlert} = useCustomAlert();

  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [currentImageTab, setCurrentImageTab] = useState('frontImg');

  const [businessmanName, setBusinessmanName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [emailId, setEmailId] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [businessAddress, setBusinessAddress] = useState('');
  const [businessPhoneNumber, setBusinessPhoneNumber] = useState('');
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

  const SubmitBusinessmanForm = async () => {
    if (
      !businessmanName ||
      !phoneNumber ||
      !emailId ||
      !businessName ||
      !businessType ||
      !businessAddress ||
      !businessPhoneNumber ||
      !licenseNumber ||
      !frontImg ||
      !backImg
    ) {
      showAlert('Please Fill all details First', 'error');
    } else if (phoneNumber.length != 10 || businessPhoneNumber.length != 10) {
      if (phoneNumber.length != 10 && businessPhoneNumber.length != 10) {
        showAlert(
          'Phone Number and Business Phone Number should be of 10 characters',
          'error',
        );
      } else if (phoneNumber.length != 10) {
        showAlert('Phone Number should be of 10 characters', 'error');
      } else if (businessPhoneNumber.length != 10) {
        showAlert('Business Phone Number should be of 10 characters', 'error');
      }
    } else {
      try {
        const data = {
          userId: user.userId,
          businessmanName,
          phoneNumber,
          emailId,
          businessName,
          businessType,
          businessAddress,
          businessPhoneNumber,
          licenseNumber,
          licenseImageUrl: {
            front: frontImg,
            back: backImg,
          },
        };
        const res = await dispatch(RequestBusinessmanForm({data}));
        if (RequestBusinessmanForm.fulfilled.match(res)) {
          showAlert('Upgrade Account Request Successfully', 'success');
          setBusinessmanName('');
          setEmailId('');
          setPhoneNumber('');
          setBusinessName('');
          setBusinessType('');
          setBusinessAddress('');
          setBusinessPhoneNumber('');
          setLicenseNumber('');
          setFrontImg('');
          setBackImg('');
        } else if (RequestBusinessmanForm.rejected.match(res)) {
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
          BUSINESSMAN FORM
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
              ? `Upload Front Image`
              : `Upload Back Image`}
          </Button>
          {currentImageTab == 'frontImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!frontImg}>
              Remove Front Image
            </Button>
          )}
          {currentImageTab == 'backImg' && (
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!backImg}>
              Remove Back Image
            </Button>
          )}
        </View>

        <InputField
          label="Name"
          value={businessmanName}
          onChangeText={setBusinessmanName}
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
          label="Email"
          value={emailId}
          onChangeText={setEmailId}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Business Name"
          value={businessName}
          onChangeText={setBusinessName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Business Type"
          value={businessType}
          onChangeText={setBusinessType}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Business Address"
          value={businessAddress}
          onChangeText={setBusinessAddress}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Business Phone Number"
          value={businessPhoneNumber}
          onChangeText={setBusinessPhoneNumber}
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

        <SaveButton
          onPress={SubmitBusinessmanForm}
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

export default BusinessmanUpgradeAccountFormScreen;
