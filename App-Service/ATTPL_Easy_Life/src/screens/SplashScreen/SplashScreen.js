import React, {useEffect} from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import Lottie from 'lottie-react-native'; // Updated import
import SplashScreen from 'react-native-splash-screen'; // Importing but not using it here

const LotteiSplashScreen = () => {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Lottie
        source={require('../../assets/attpl_logo.json')}
        autoPlay
        loop={false}
        style={styles.animation} // Added style to ensure visibility
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Ensure background color is set
  },
  animation: {
    width: 300, // Adjust the width
    height: 300, // Adjust the height
  },
});

export default LotteiSplashScreen;
