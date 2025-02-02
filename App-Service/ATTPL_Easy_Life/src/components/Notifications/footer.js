import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const Footer = () => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={[styles.viewAllContainer, {backgroundColor: colors.surface}]}>
      <Text
        style={[
          styles.viewAllText,
          {
            color: colors.text,
            fontFamily: fonts.titleLarge.fontFamily,
          },
        ]}>
        View All
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  viewAllContainer: {
    padding: 16,
    alignItems: 'center',
  },
  viewAllText: {
    fontSize: 16,
  },
});

export default Footer;
