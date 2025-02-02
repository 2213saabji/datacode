import React, {useCallback, useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Button,
  TextInput,
  Modal,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';

import InputField from '../../components/EditProfile/InputField';
import SaveButton from '../../components/EditProfile/SaveButton';
import Header from '../../components/Header';
import DatePickerInput from '../../components/EditProfile/datePicker';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import {
  JOB_TITLES,
  religionsInIndia,
  USER_GENDER_OPTIONS,
  USER_HIGHEST_QUALIFICATION_OPTIONS,
} from '../../data/appScreens';
import {
  fetchPartyList,
  UpdateUserAddress,
  UpdateUserProfile,
  UserPincodeData,
} from '../../redux/slices/UMS/authSlice';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';

/**
 * EditProfileScreen Component
 *
 * This component allows users to edit their profile information, including name, email,
 * phone number, and address. It uses a combination of custom components for input fields
 * and a save button. The component integrates with Redux to apply theme colors and fonts
 * to ensure a consistent look and feel based on the current theme.
 *
 * - **Header:** A custom header component is used for navigation and title display.
 * - **InputFields:** Custom input components are used for entering and updating user details.
 * - **SaveButton:** A button component to save the updated profile information.
 *
 * @component
 * @example
 * <EditProfileScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 */
export const USER_ADDRESS_TYPE_OPTIONS = [
  {label: 'RESIDENTIAL', value: 'Residential'},
  {label: 'HOME', value: 'Home'},
];

const EditProfileScreen = ({route}) => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const {profileForm} = route.params || {};
  const {showAlert} = useCustomAlert();
  const user = useSelector(selectUser);
  const [districtOptions, setDistrictOptions] = useState([]);
  // Profile form start---------------------
  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [motherName, setMotherName] = useState('');
  const [gender, setGender] = useState('');
  const [religion, setReligion] = useState('');
  const [tehsilName, setTehsilName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [politicalPartyAffiliation, setPoliticalPartyAffiliation] =
    useState('');
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [highestQualification, setHighestQualification] = useState('');
  // Profile form end---------------------
  // Address form start---------------------
  const [streetAddress, setStreetAddress] = useState(
    user.UserAddressesses[0].streetAddress,
  );
  const [userCity, setUserCity] = useState(user.UserAddressesses[0].userCity);
  const [userState, setUserState] = useState(
    user.UserAddressesses[0].userState,
  );
  const [postalCode, setPostalCode] = useState(
    user.UserAddressesses[0].postalCode,
  );
  const [country, setCountry] = useState(user.UserAddressesses[0].country);
  const [wardNo, setWardNo] = useState(user.UserAddressesses[0].wardNo);
  const [panchayatName, setPanchayatName] = useState(
    user.UserAddressesses[0].panchayatName,
  );
  const [addressType, setAddressType] = useState(
    user.UserAddressesses[0].addressType,
  );
  // Address form end---------------------
  const [email, setEmail] = useState('');
  const [partyList, setPartyList] = useState([]);

  const districtData = districtOptions.map(list => ({
    value: list.PostOffice[0].District,
    label: list.PostOffice[0].District,
  }));

  const stateData = districtOptions.map(list => ({
    value: list.PostOffice[0].State,
    label: list.PostOffice[0].State,
  }));

  const countryData = districtOptions.map(list => ({
    value: list.PostOffice[0].Country,
    label: list.PostOffice[0].Country,
  }));

  const postalAreaData = districtOptions.flatMap(district =>
    district.PostOffice.map(postOffice => ({
      value: postOffice.Name,
      label: postOffice.Name,
    })),
  );

  const handleSaveAddress = async () => {
    if (
      !streetAddress ||
      !userCity ||
      !userState ||
      !postalCode ||
      !country ||
      !wardNo ||
      !panchayatName ||
      !addressType
    ) {
      showAlert('Please Fill all details First', 'error');
    } else {
      try {
        const data = {
          streetAddress: streetAddress,
          userCity: userCity,
          userState: userState,
          postalCode: postalCode,
          country: country,
          wardNo: Number(wardNo),
          panchayatName: panchayatName,
          addressType: addressType,
        };
        const res = await dispatch(
          UpdateUserAddress({
            userId: user.userId,
            userAddressId: user.UserAddressesses[0].userAddressId,
            data,
          }),
        );
        if (UpdateUserAddress.fulfilled.match(res)) {
          showAlert('Address Details Update Successfully', 'success');
        } else if (UpdateUserAddress.rejected.match(res)) {
          showAlert(
            "Error Occur's while Updating the Address Details",
            'error',
          );
        }
      } catch (error) {
        showAlert(error || 'An unexpected error occurred', 'error');
      }
    }
  };
  const handleSave = async ({profileForm}) => {
    if (
      !firstName ||
      !lastName ||
      !dateOfBirth ||
      !fatherName ||
      !motherName ||
      !gender ||
      !religion ||
      !tehsilName ||
      !whatsappNumber ||
      !politicalPartyAffiliation ||
      !currentJobTitle ||
      !highestQualification
    ) {
      showAlert('Please Fill all details First', 'error');
    } else if (whatsappNumber.length < 10 || whatsappNumber.length > 10) {
      showAlert('Phone Number must be of 10 characters', 'error');
    } else if (new Date(dateOfBirth) >= new Date()) {
      showAlert("Date of Birth can't be greater then Today", 'error');
    } else {
      try {
        const data = {
          firstName: firstName,
          middleName: middleName,
          lastName: lastName,
          dateOfBirth: dateOfBirth,
          fatherName: fatherName,
          motherName: motherName,
          gender: gender,
          religion: religion,
          tehsilName: tehsilName,
          whatsappNumber: whatsappNumber,
          politicalPartyAffiliation: politicalPartyAffiliation,
          currentJobTitle: currentJobTitle,
          highestQualification: highestQualification,
        };
        const res = await dispatch(
          UpdateUserProfile({
            userId: user.userId,
            userProfileId: user.UserProfile.userProfileId,
            data,
          }),
        );
        if (UpdateUserProfile.fulfilled.match(res)) {
          showAlert('Profile Details Update Successfully', 'success');
        } else if (UpdateUserProfile.rejected.match(res)) {
          showAlert(
            "Error Occur's while Updating the Profile Details",
            'error',
          );
        }
      } catch (error) {
        showAlert(error || 'An unexpected error occurred', 'error');
        console.log(error);
      }
    }
  };

  async function useGetParties() {
    try {
      const response = await dispatch(fetchPartyList());
      if (fetchPartyList.fulfilled.match(response)) {
        const PartyData = response?.payload?.data.map(list => ({
          value: list.partyId,
          label: list.partyName,
        }));
        setPartyList(PartyData);
      }
    } catch (error) {
      Alert.alert('Error', 'An Unexpected error occurred');
    }
  }
  async function handleSubmitPincode() {
    try {
      const response = await dispatch(UserPincodeData({postalCode}));
      if (UserPincodeData.fulfilled.match(response)) {
        setDistrictOptions(response.payload.data);
        return response.payload.data[0].PostOffice;
      } else if (UserPincodeData.rejected.match(response)) {
        return 'nodata';
      }
    } catch (error) {
      console.error('Error submitting profile Address:', error);
      enqueueSnackbar('An error occurred while Update profile Address', {
        variant: 'error',
      });
      return 'error';
    }
  }
  const roleShowFunction = useCallback(async () => {
    if (postalCode.length === 6) {
      try {
        const res = await handleSubmitPincode();
      } catch (error) {
        console.error('Error:', error);
      }
    }
  }, [postalCode]);

  useEffect(() => {
    roleShowFunction();
  }, [postalCode]);

  useEffect(() => {
    useGetParties();
  }, []);

  return (
    <>
      <Header
        navigation={navigation}
        title="Edit Profile"
        colors={colors}
        fonts={fonts}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        {((profileForm && profileForm == 'profile') ||
          (!profileForm && true)) && (
          <>
            <Text
              style={[
                styles.sectionTitle,
                {color: colors.text, ...fonts.titleMedium},
              ]}>
              PROFILE DETAILS FORM
            </Text>
            <InputField
              label="First Name"
              value={firstName}
              onChangeText={setFirstName}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="Middle Name (Optional)"
              value={middleName}
              onChangeText={setMiddleName}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="Last Name"
              value={lastName}
              onChangeText={setLastName}
              colors={colors}
              fonts={fonts}
            />
            {/* <InputField
          label="Email"
          value={email}
          onChangeText={setEmail}
          colors={colors}
          fonts={fonts}
        /> */}
            {/* <InputField
          label="Address"
          value={address}
          onChangeText={setAddress}
          colors={colors}
          fonts={fonts}
        /> */}
            <DatePickerInput
              label="Date Of Birth"
              value={dateOfBirth}
              onChangeText={setDateOfBirth}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="Father/Spouse Name"
              value={fatherName}
              onChangeText={setFatherName}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="Monther Name"
              value={motherName}
              onChangeText={setMotherName}
              colors={colors}
              fonts={fonts}
            />

            <SingleDropdownComponent
              label="Select Gender"
              options={USER_GENDER_OPTIONS}
              value={gender}
              setValue={setGender}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SingleDropdownComponent
              label="Select Religion"
              options={religionsInIndia}
              value={religion}
              setValue={setReligion}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <InputField
              label="Tehsil Name"
              value={tehsilName}
              onChangeText={setTehsilName}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="Phone Number"
              value={whatsappNumber}
              onChangeText={setWhatsappNumber}
              colors={colors}
              fonts={fonts}
              keyboardType="phone-pad"
            />
            <SingleDropdownComponent
              label="Your Political Party"
              options={partyList}
              value={politicalPartyAffiliation}
              setValue={setPoliticalPartyAffiliation}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SingleDropdownComponent
              label="Current Job Title"
              options={JOB_TITLES}
              value={currentJobTitle}
              setValue={setCurrentJobTitle}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SingleDropdownComponent
              label="Qualification"
              options={USER_HIGHEST_QUALIFICATION_OPTIONS}
              value={highestQualification}
              setValue={setHighestQualification}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />

            <SaveButton
              onPress={handleSave}
              colors={colors}
              fonts={fonts}
              marginBottom={20}
            />
          </>
        )}
        {((profileForm && profileForm == 'address') ||
          (!profileForm && true)) && (
          <>
            <Text
              style={[
                styles.sectionTitle,
                {color: colors.text, ...fonts.titleMedium},
              ]}>
              ADDRESS DETAILS FORM
            </Text>

            <InputField
              label="Street Address"
              value={streetAddress}
              onChangeText={setStreetAddress}
              colors={colors}
              fonts={fonts}
            />
            <InputField
              label="PinCode"
              value={postalCode}
              onChangeText={setPostalCode}
              colors={colors}
              fonts={fonts}
            />
            <SingleDropdownComponent
              label="District"
              options={districtData}
              value={userCity}
              setValue={setUserCity}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SingleDropdownComponent
              label="State"
              options={stateData}
              value={userState}
              setValue={setUserState}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SingleDropdownComponent
              label="Country"
              options={countryData}
              value={country}
              setValue={setCountry}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <InputField
              label="Ward No"
              value={wardNo}
              onChangeText={setWardNo}
              colors={colors}
              fonts={fonts}
              keyboardType="numeric"
            />
            <InputField
              label="Panchayat Name"
              value={panchayatName}
              onChangeText={setPanchayatName}
              colors={colors}
              fonts={fonts}
            />
            <SingleDropdownComponent
              label="Address Type"
              options={USER_ADDRESS_TYPE_OPTIONS}
              value={addressType}
              setValue={setAddressType}
              containerColor={colors.borderColor}
              inputBorderWidth={1}
              inputBorderRadius={5}
            />
            <SaveButton
              onPress={handleSaveAddress}
              colors={colors}
              fonts={fonts}
              marginBottom={20}
            />
          </>
        )}
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
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  input: {
    fontSize: 14,
    borderRadius: 8,
    fontFamily: 'PublicSans-Regular',
  },
});

export default EditProfileScreen;
