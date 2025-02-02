import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';

const HamburgerIcon = () => {
  const {colors} = useSelector(selectTheme);

  return (
    <View style={[hamburgerIconStyles.hamburgerIcon]}>
      <View
        style={[hamburgerIconStyles.line1, {backgroundColor: colors.primary}]}
      />
      <View
        style={[hamburgerIconStyles.line2, {backgroundColor: colors.primary}]}
      />
      <View
        style={[hamburgerIconStyles.line3, {backgroundColor: colors.primary}]}
      />
    </View>
  );
};

export default HamburgerIcon;

const hamburgerIconStyles = StyleSheet.create({
  hamburgerIcon: {
    flexDirection: 'column',
    justifyContent: 'space-around',
    height: 24,
    width: 24,
    borderRadius: 20,
  },
  line1: {
    height: 3,
    width: 15,
    marginRight: 3,
    borderRadius: 20,
  },
  line2: {
    height: 2.5,
    width: 17,
    marginLeft: 3,
    borderRadius: 20,
  },
  line3: {
    height: 3,
    width: 15,
    marginRight: 3,
    borderRadius: 20,
  },
});
