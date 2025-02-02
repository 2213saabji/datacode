import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Header = ({navigation, title, colors, fonts}) => (
  <View style={[styles.header, {backgroundColor: colors.primary}]}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Ionicons name="arrow-back" size={24} color={colors.surface} />
    </TouchableOpacity>
    <Text
      style={[
        styles.headerTitle,
        {color: colors.surface, ...fonts.titleMedium},
      ]}>
      {title}
    </Text>
  </View>
);

const styles = {
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
};

export default Header;
