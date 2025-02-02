import React, {useState} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Linking,
  ScrollView,
} from 'react-native';
import {List, Text, TextInput, } from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const EnterDetailsScreen = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherSpouseName, setFatherSpouseName] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState('');
  const data = [
    'Andhra Pradesh',
    'Arunachal Pradesh',
    'Assam',
    'Bihar',
    'Chhattisgarh',
    'Goa',
    'Gujarat',
    'Haryana',
    'Himachal Pradesh',
    'Jharkhand',
    'Karnataka',
    'Kerala',
    'Madhya Pradesh',
    'Maharashtra',
    'Manipur',
    'Meghalaya',
    'Mizoram',
    'Nagaland',
    'Odisha',
    'Punjab',
    'Rajasthan',
    'Sikkim',
    'Tamil Nadu',
    'Telangana',
    'Tripura',
    'Uttar Pradesh',
    'Uttarakhand',
    'West Bengal',
  ];

  const handleInputChange = text => {
    setSearchKeyword(text);
  };

  const handleSubmit = () => {
    console.log(
      `First Name: ${firstName}, Last Name: ${lastName}, State: ${selectedItem}`,
    );
    navigation.navigate('Password');
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView>
        <View style={styles.header}>
          <Image
            source={require('../../assets/AppBarAssets/ATTPL_Logo.gif')}
            style={styles.logo}
          />
        </View>
        <View style={[styles.body, {backgroundColor: colors.background}]}>
          <Text
            style={[styles.title, {color: colors.primary}, fonts.titleLarge]}>
            Enter Your Details
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="First Name"
              placeholder="Enter First Name"
              value={firstName}
              onChangeText={setFirstName}
              textColor={colors.onSurface}
              right={
                <TextInput.Affix
                  text="/100"
                  style={[styles.affix, {color: colors.primary}]}
                />
              }
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.placeholder,
                },
              ]}
              outlineStyle={{borderRadius: 5}}
              outlineColor={colors.backdrop}
              activeOutlineColor={colors.backdrop}
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Last Name"
              placeholder="Enter Last Name"
              value={lastName}
              onChangeText={setLastName}
              textColor={colors.onSurface}
              right={
                <TextInput.Affix
                  text="/100"
                  style={[styles.affix, {color: colors.primary}]}
                />
              }
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.placeholder,
                },
              ]}
              outlineStyle={{borderRadius: 5}}
              outlineColor={colors.backdrop}
              activeOutlineColor={colors.backdrop}
              placeholderTextColor={colors.placeholder}
            />
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              mode="outlined"
              label="Father/Spouse Name"
              placeholder="Enter Father/Spouse Name"
              value={fatherSpouseName}
              onChangeText={setFatherSpouseName}
              textColor={colors.onSurface}
              right={
                <TextInput.Affix
                  text="/100"
                  style={[styles.affix, {color: colors.primary}]}
                />
              }
              style={[
                styles.input,
                {
                  backgroundColor: colors.surface,
                  color: colors.text,
                  borderColor: colors.placeholder,
                },
              ]}
              outlineStyle={{borderRadius: 5}}
              outlineColor={colors.backdrop}
              activeOutlineColor={colors.backdrop}
              placeholderTextColor={colors.placeholder}
            />
          </View>

          <View
            style={[
              styles.inputContainer,
              {
                backgroundColor: colors.surface,
                borderColor: colors.placeholder,
              },
            ]}>
            <List.Accordion
              style={[
                {backgroundColor: colors.surface, color: colors.onSurface},
              ]}
              titleStyle={{color: colors.onSurface}}
              title={selectedItem ? selectedItem : 'Select State'}
              left={props => (
                <List.Icon {...props} icon="map" color={colors.onSurface} />
              )}
              expanded={expanded}
              onPress={() => setExpanded(!expanded)}>
              <TextInput
                mode="outlined"
                label="Search State"
                placeholder="Type to search"
                value={searchKeyword}
                onChangeText={handleInputChange}
                textColor={colors.onSurface}
                style={[
                  styles.input,
                  {
                    backgroundColor: colors.surface,
                    color: colors.text,
                    borderColor: colors.placeholder,
                  },
                ]}
                outlineStyle={{borderRadius: 5}}
                outlineColor={colors.backdrop}
                activeOutlineColor={colors.backdrop}
                placeholderTextColor={colors.placeholder}
              />
              {data
                .filter(item =>
                  item.toLowerCase().includes(searchKeyword.toLowerCase()),
                )
                .map(item => (
                  <List.Item
                    key={item}
                    title={item}
                    onPress={() => {
                      setSelectedItem(item);
                      setExpanded(false);
                    }}
                    titleStyle={{color: colors.text}}
                  />
                ))}
            </List.Accordion>
          </View>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={handleSubmit}>
            <Text
              style={[
                styles.buttonText,
                {color: colors.onPrimary},
                fonts.button,
              ]}>
              Next
            </Text>
          </TouchableOpacity>

          <Text
            style={[styles.footerText, {color: colors.text}, fonts.bodySmall]}>
            By signing up, I agree to{' '}
            <Text
              style={[styles.link, {color: colors.primary}]}
              onPress={() => Linking.openURL('https://example.com/terms')}>
              Terms of Service
            </Text>{' '}
            and{' '}
            <Text
              style={[styles.link, {color: colors.primary}]}
              onPress={() => Linking.openURL('https://example.com/privacy')}>
              Privacy Policy
            </Text>
            .
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    fontSize: 14,
    borderRadius: 8,
    fontFamily: 'PublicSans-Regular',
  },
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
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 8,
  },
  body: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 20,
    marginLeft: 55,
    lineHeight: 28,
  },
  picker: {
    height: 40,
    width: '100%',
    borderRadius: 5,
    marginBottom: 5,
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 22,
    fontWeight: '600',
    alignSelf: 'center',
  },
  footerText: {
    marginTop: 20,
    textAlign: 'center',
  },
  link: {
    textDecorationLine: 'underline',
  },
  affix: {
    fontFamily: 'PublicSans-Regular',
  },
});

export default EnterDetailsScreen;
