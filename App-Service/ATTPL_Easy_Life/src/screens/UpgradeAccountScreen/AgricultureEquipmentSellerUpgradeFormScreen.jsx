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
import {Button, DataTable} from 'react-native-paper';
import {
  RequestAgricultureEquipmentSellerForm,
  RequestEmployerForm,
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

const AgricultureEquipmentSellerUpgradeAccountFormScreen = ({route}) => {
  const {showAlert} = useCustomAlert();

  const {roleId} = route.params || {};
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [sellerOwnerfirstName, setSellerOwnerfirstName] = useState('');
  const [sellerOwnerlastName, setSellerOwnerlastName] = useState('');
  const [sellerOwnercontactNumber, setSellerOwnercontactNumber] = useState('');
  const [sellerOwneremail, setSellerOwneremail] = useState('');
  const [sellerOwneraddress, setSellerOwneraddress] = useState('');

  const SubmitAgricultureEquipmentSellerForm = async () => {
    if (
      !sellerOwnerfirstName ||
      !sellerOwnerlastName ||
      !sellerOwnercontactNumber ||
      !sellerOwneremail ||
      !sellerOwneraddress
    ) {
      showAlert('Please Fill all details First', 'error');
    } else if (sellerOwnercontactNumber.length != 10) {
      showAlert('Contact Number should be of 10 characters', 'error');
    } else {
      try {
        const data = {
          userId: user.userId,
          sellerOwnerfirstName,
          sellerOwnerlastName,
          sellerOwneremail,
          sellerOwnercontactNumber,
          sellerOwneraddress,
        };
        const res = await dispatch(
          RequestAgricultureEquipmentSellerForm({data}),
        );
        console.log(res);
        if (RequestAgricultureEquipmentSellerForm.fulfilled.match(res)) {
          showAlert('Upgrade Account Request Successfully', 'success');
          setSellerOwnerfirstName('');
          setSellerOwnerlastName('');
          setSellerOwnercontactNumber('');
          setSellerOwneremail('');
          setSellerOwneraddress('');
        } else if (RequestAgricultureEquipmentSellerForm.rejected.match(res)) {
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
          AGRICULTURE EQUIPMENT SELLER FORM
        </Text>

        <InputField
          label="First Name"
          value={sellerOwnerfirstName}
          onChangeText={setSellerOwnerfirstName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Last Name"
          value={sellerOwnerlastName}
          onChangeText={setSellerOwnerlastName}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Contact Number"
          value={sellerOwnercontactNumber}
          onChangeText={setSellerOwnercontactNumber}
          colors={colors}
          fonts={fonts}
          keyboardType="phone-pad"
        />
        <InputField
          label="Email"
          value={sellerOwneremail}
          onChangeText={setSellerOwneremail}
          colors={colors}
          fonts={fonts}
        />
        <InputField
          label="Address"
          value={sellerOwneraddress}
          onChangeText={setSellerOwneraddress}
          colors={colors}
          fonts={fonts}
        />
        <SaveButton
          onPress={SubmitAgricultureEquipmentSellerForm}
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

export default AgricultureEquipmentSellerUpgradeAccountFormScreen;
