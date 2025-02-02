import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, View, Image} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text, TextInput, Dialog, Button} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import RHFAutocomplete from '../../components/ReusableComp/RHFAutocomplete';


const statesOfIndia = [
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Andaman and Nicobar Islands',
  'Assam',
  'Bihar',
  'Chhattisgarh',
  'Chandigarh',
  'Delhi',
  'Dadra and Nagar Haveli',
  'Daman and Diu',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jharkhand',
  'Jammu and Kashmir',
  'Karnataka',
  'Kerala',
  'Lakshadweep',
  'Ladakh',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Punjab',
  'Puducherry',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal',
];

const RegisterDetailsScreen = ({navigation, route}) => {
  const dispatch = useDispatch();
  const {mobileNumber} = route.params || {};
  const theme = useSelector(selectTheme);
  const {colors, fonts} = theme;
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherName, setFatherName] = useState('');
  const [state, setState] = useState('');
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const handleInputChange = text => {
    setSearchKeyword(text);
  };
  const onsubmitNextPage = () => {
    navigation.navigate('Auth', {
      screen: 'RegisterPassword',
      params: {
        mobileNumber,
        firstName,
        lastName,
        fatherName,
        state,
      },
    });
  };

  const handleDialogClose = () => {
    setDialogVisible(false);
    navigation.navigate('Auth', {
      screen: 'SignUp',
      params: {mobileNumber: mobileNumber.trim()},
    });
  };

  return (
    <SafeAreaView
      style={[loginStyles.container, {backgroundColor: colors.background}]}>
      <View style={loginStyles.header}>
        <Image
          source={require('../../assets/AppBarAssets/ATTPL_Logo.gif')}
          style={loginStyles.logo}
        />
      </View>
      <View style={loginStyles.loginForm}>
        <Text
          style={[
            loginStyles.welcomeText,
            fonts.titleLarge,
            {color: colors.primary},
          ]}>
          Welcome to ATTPL Group
        </Text>
        <Text
          style={[
            loginStyles.instructionText,
            fonts.bodyLarge,
            {color: colors.text},
          ]}>
          Please provide your mobile number, excluding the country code (+91).
        </Text>
        <View style={loginStyles.inputContainer}>
          <TextInput
            mode="outlined"
            label="First Number"
            placeholder="Type something"
            keyboardType="default"
            value={firstName}
            textColor={colors.text}
            onChangeText={text => setFirstName(text)}
            right={
              <TextInput.Affix
                text="/100"
                style={[loginStyles.affix, {color: colors.primary}]}
              />
            }
            style={[
              loginStyles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                marginVertical: 5,
              },
            ]}
            outlineStyle={{borderRadius: 5}}
            outlineColor={colors.backdrop}
            activeOutlineColor={colors.primary}
            placeholderTextColor={colors.placeholder}
          />
          <TextInput
            mode="outlined"
            label="Last Number"
            placeholder="Type something"
            keyboardType="default"
            value={lastName}
            textColor={colors.text}
            onChangeText={text => setLastName(text)}
            right={
              <TextInput.Affix
                text="/100"
                style={[loginStyles.affix, {color: colors.primary}]}
              />
            }
            style={[
              loginStyles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                marginVertical: 5,
              },
            ]}
            outlineStyle={{borderRadius: 5}}
            outlineColor={colors.backdrop}
            activeOutlineColor={colors.primary}
            placeholderTextColor={colors.placeholder}
          />
          <TextInput
            mode="outlined"
            label="Father/Spouse Number"
            placeholder="Type something"
            keyboardType="default"
            value={fatherName}
            textColor={colors.text}
            onChangeText={text => setFatherName(text)}
            right={
              <TextInput.Affix
                text="/100"
                style={[loginStyles.affix, {color: colors.primary}]}
              />
            }
            style={[
              loginStyles.input,
              {
                backgroundColor: colors.surface,
                color: colors.text,
                marginVertical: 5,
              },
            ]}
            outlineStyle={{borderRadius: 5}}
            outlineColor={colors.backdrop}
            activeOutlineColor={colors.primary}
            placeholderTextColor={colors.placeholder}
          />
          <RHFAutocomplete
            name="state"
            label="Your State"
            placeholder="Choose your State"
            setValue={setState}
            options={statesOfIndia}
          />
        </View>
        <TouchableOpacity onPress={onsubmitNextPage}>
          <View
            style={[loginStyles.nextButton, {backgroundColor: colors.primary}]}>
            <Text style={[loginStyles.buttonText, {color: colors.onPrimary}]}>
              Next
            </Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Dialog Component */}
      <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
        <Dialog.Title>Error</Dialog.Title>
        <Dialog.Content>
          <Text>{dialogMessage}</Text>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={handleDialogClose}>OK</Button>
        </Dialog.Actions>
      </Dialog>
    </SafeAreaView>
  );
};

const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    margin: 10,
    position: 'absolute',
  },
  loginForm: {
    paddingVertical: 120,
    paddingHorizontal: 24,
  },
  welcomeText: {
    textAlign: 'left',
    marginVertical: 10,
  },
  instructionText: {
    textAlign: 'left',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 35,
    borderRadius: 8,
  },
  input: {
    fontSize: 14,
    borderRadius: 8,
    fontFamily: 'PublicSans-Regular',
  },
  nextButton: {
    width: '100%',
    height: 48,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: 'PublicSans-Regular',
    lineHeight: 26,
  },
  affix: {
    fontFamily: 'PublicSans-Regular',
  },
});

export default RegisterDetailsScreen;
