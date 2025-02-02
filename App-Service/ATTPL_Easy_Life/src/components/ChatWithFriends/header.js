import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const Header = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={[styles.header]}>
      <Text
        style={[styles.headerText, {color: colors.text}, fonts.headlineMedium]}>
        CHAT
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '500',
  },
});

export default Header;
