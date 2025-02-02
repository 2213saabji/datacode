import React from 'react';
import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';

const VoterReferralScreen = () => {
  return (
    <View style={voterReferralStyles.container}>
      <Text style={voterReferralStyles.header}>Voter Referral</Text>
      <Text style={voterReferralStyles.subHeader}>
        “Spread the word, reap the reward: Refer a friend, both wins restored!”
      </Text>
      <View style={voterReferralStyles.card}>
        <Image
          source={require('../../assets/HomeImages/votRef.png')}
          style={voterReferralStyles.image}
        />
        <TouchableOpacity style={voterReferralStyles.button}>
          <Text style={voterReferralStyles.buttonText}>GET INVITE LINK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VoterReferralScreen;

const voterReferralStyles = StyleSheet.create({
  container: {
    flex: 1,

    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#000000',
    lineHeight: 28.2,
  },
  subHeader: {
    fontSize: 20,
    color: '#00AAEC',
    textAlign: 'center',
    marginBottom: 35,
    lineHeight: 23.5,
    fontWeight: '600',
    marginTop: 20,
  },
  card: {
    width: '100%',
    borderRadius: 10,
    backgroundColor: '#f8f8f8',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
    marginTop: 30,
  },
  image: {
    width: 220,
    height: 180,
  },
  button: {
    backgroundColor: '#00A76F',
    borderRadius: 11,
    height: 27.51,
    width: 276.73,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 11,
  },
});
