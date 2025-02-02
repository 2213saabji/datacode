import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const Footer = () => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={styles.footer}>
      <Text style={[styles.footerText, {color: colors.text}, fonts.bodySmall]}>
        First Select Recipients
      </Text>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    // Add any additional styles needed for the footer container
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    // Add any additional text styles here, if necessary
  },
});
