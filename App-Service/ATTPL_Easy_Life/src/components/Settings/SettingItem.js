import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const SettingItem = ({iconName, text, onPress, colors, fonts}) => (
  <TouchableOpacity style={styles.settingItem} onPress={onPress}>
    <Ionicons name={iconName} size={24} color={colors.primary} />
    <Text
      style={[styles.settingText, {color: colors.text, ...fonts.bodyMedium}]}>
      {text}
    </Text>
  </TouchableOpacity>
);

const styles = {
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
};

export default SettingItem;
