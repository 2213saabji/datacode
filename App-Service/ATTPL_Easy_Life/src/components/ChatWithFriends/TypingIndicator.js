import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-paper';
import Reanimated, {SlideInRight} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

const TypingIndicator = ({colors, fonts}) => (
  <Reanimated.View entering={SlideInRight} style={styles.typingIndicator}>
    <LottieView
      source={require('../../assets/typinganimation.json')}
      autoPlay
      loop
      style={{width: 50, height: 50}}
    />
    <Text style={{...fonts.bodySmall, color: colors.onSurface}}>Typing...</Text>
  </Reanimated.View>
);

const styles = StyleSheet.create({
  typingIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    margin: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  },
});

export default TypingIndicator;
