import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import CountryFlag from 'react-native-country-flag';

const CountryFlagIcon = ({isoCode}) => (
  <TouchableOpacity onPress={() => {}}>
    <CountryFlag
      isoCode={isoCode}
      size={20}
      style={countryFlagIconStyles.countryFlag}
    />
  </TouchableOpacity>
);

export default CountryFlagIcon;
const countryFlagIconStyles = StyleSheet.create({
  countryFlag: {
    marginRight: 10,
    borderRadius: 5,
  },
});
