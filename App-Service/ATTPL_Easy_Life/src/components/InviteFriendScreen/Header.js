import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, colors, fonts}) => (
  <View style={[styles.header, {backgroundColor: colors.primary}]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={colors.surface} />
    </TouchableOpacity>
    <Text
      style={[
        styles.headerTitle,
        {color: colors.surface, ...fonts.titleMedium},
      ]}>
      Invite Friends
    </Text>
    <View style={{width: 24}} />
  </View>
);

const styles = {
  header: {
    padding: 16,
    flexDirection: 'row',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
};

export default Header;
