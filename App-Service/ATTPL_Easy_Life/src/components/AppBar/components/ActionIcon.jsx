import React from 'react';
import {TouchableOpacity, Image, StyleSheet} from 'react-native';

const ActionIcon = ({source}) => (
  <TouchableOpacity onPress={() => {}}>
    <Image source={source} style={actionIconStyles.icon} />
  </TouchableOpacity>
);

export default ActionIcon;

const actionIconStyles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    marginHorizontal: 5,
  },
});
