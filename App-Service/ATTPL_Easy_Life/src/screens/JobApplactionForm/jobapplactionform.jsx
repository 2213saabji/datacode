import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
const JobApplicationForm = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/logo/real.png')}
          style={styles.image}
        />
      </View>

      <View style={styles.menuIcon}>
        <Icon name="menu" size={24} color="black" />
      </View>
      <View style={styles.formContainer}>
        <Text style={styles.label}>FULL NAME: *</Text>
        <TextInput style={styles.input} placeholder="First Name" />
        <TextInput style={styles.input} />
        <TouchableOpacity style={styles.nextButton}>
          <Icon name="arrow-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  rightIcons: {
    flexDirection: 'row',
    position: 'absolute',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  image: {
    width: '100%',
    height: 225,
  },
  formContainer: {
    padding: 20,
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 15,
  },

  menuIcon: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },

  label: {
    fontWeight: '500',
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 22,
    color: '#000000',
  },

  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },

  nextButton: {
    backgroundColor: '#2196F3',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-end',
    marginTop: 10,
  },
});

export default JobApplicationForm;
