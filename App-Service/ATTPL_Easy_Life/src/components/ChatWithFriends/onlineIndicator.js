import React, {useEffect, useRef} from 'react';
import {Animated, View} from 'react-native';

const OnlineIndicator = React.memo(({isOnline, style}) => {
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (isOnline) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.1,
            duration: 500,
            useNativeDriver: true,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
          }),
        ]),
      ).start();
    } else {
      pulseAnim.setValue(1); // Reset animation if user goes offline
    }
  }, [isOnline, pulseAnim]);

  if (!isOnline) return null; // Render nothing if the user is not online

  return (
    <Animated.View
      style={[
        style,
        {
          backgroundColor: 'green',
          transform: [{scale: pulseAnim}],
        },
      ]}
    />
  );
});

export default OnlineIndicator;
