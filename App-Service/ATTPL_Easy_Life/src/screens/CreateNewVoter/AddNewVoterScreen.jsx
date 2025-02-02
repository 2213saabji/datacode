import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
} from 'react-native';

import girl from '../../assets/images/girl.png';
import newvoter from '../../assets/images/newvoter.png';
const CustomTextInput = ({label, isRequired, ...props}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputWrapper}>
      <TextInput
        style={styles.input}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {!isFocused && !props.value && (
        <Text style={styles.placeholder}>
          {label}
          {isRequired && <Text style={styles.required}>*</Text>}
        </Text>
      )}
    </View>
  );
};

const AddVoterScreen = () => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [fatherSpouseName, setFatherSpouseName] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Image source={newvoter} style={styles.charactersImage} />

        <View style={styles.formContainer}>
          <CustomTextInput
            label="Mobile Number"
            isRequired={true}
            value={mobileNumber}
            onChangeText={setMobileNumber}
          />
          <CustomTextInput
            label="FirstName"
            isRequired={true}
            value={firstName}
            onChangeText={setFirstName}
          />
          <CustomTextInput
            label="LastName"
            isRequired={true}
            value={lastName}
            onChangeText={setLastName}
          />
          <CustomTextInput
            label="Father/Spouse Name"
            isRequired={true}
            value={fatherSpouseName}
            onChangeText={setFatherSpouseName}
          />
          <TouchableOpacity style={styles.nextButton}>
            <Text style={styles.nextButtonText}>Next</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.inviteContainer}>
          <Image source={girl} style={styles.images} />
          <View style={styles.inviteTextContainer}>
            <Text style={styles.inviteTitle}>Invite </Text>
            <Text style={styles.inviteTitle}>friends and</Text>
            <Text style={styles.inviteTitle}> earn</Text>
            <View style={styles.inviteLinkContainer}>
              <Text style={styles.inviteLink}>Invite Link</Text>
              <TouchableOpacity style={styles.inviteButton}>
                <Text style={styles.inviteButtonText}>Invite</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  imageScroll: {
    marginBottom: 20,
  },
  scrollImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 10,
  },
  formContainer: {
    backgroundColor: '#FFFFFF',
    width: 400,
    height: 339,
    borderRadius: 15,
    padding: 20,
    marginTop: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginLeft: 5,
    alignItems: 'center', // Center content horizontally
  },
  inputWrapper: {
    position: 'relative',
    marginBottom: 10,
    width: '100%',
    alignItems: 'flex-start',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 10,
    width: 308,
    height: 45,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    fontSize: 16,
  },
  placeholder: {
    position: 'absolute',
    top: 12,
    left: 14,
    color: '#999',
    fontSize: 16,
  },
  required: {
    color: 'red',
  },
  nextButton: {
    backgroundColor: '#000',
    width: 308,
    height: 45,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    marginTop: 20,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 22,
  },
  inviteContainer: {
    height: 325,
    width: 400,
    flexDirection: 'column',
    backgroundColor: '#F8F8F8',
    borderRadius: 15,
    padding: 20,
    marginLeft: 10,
    marginTop: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginTop: 150,
    justifyContent: 'space-between',
  },
  characterImage: {
    width: 80,
    height: 80,
    marginRight: 20,
  },
  charactersImage: {
    width: 400,
    height: 138.6,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  inviteTextContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    marginTop: 25,
  },
  images: {
    width: 141.98,
    height: 204,
    marginTop: -150,
    marginLeft: 20,
  },
  inviteTitle: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 30,
    color: '#000',
    marginTop: 15,
  },
  inviteLinkContainer: {
    height: 45,
    width: 254,
    flexDirection: 'row',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },
  inviteLink: {
    flex: 1,
    color: '#B0B9C2',
    fontWeight: '600',
    fontSize: 20,
    lineHeight: 32,
    marginLeft: 5,
  },
  inviteButton: {
    backgroundColor: '#FFAB00',
    borderRadius: 5,
    width: 65,
    height: 33,
    paddingVertical: 5,
    marginRight: 5,
  },
  inviteButtonText: {
    fontWeight: '600',
    fontSize: 16,
    textAlign: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    color: '#000',
    lineHeight: 20,
  },
});

export default AddVoterScreen;
