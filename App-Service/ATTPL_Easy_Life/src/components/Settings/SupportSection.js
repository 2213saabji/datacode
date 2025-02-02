import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Section from './Section';

const SupportSection = ({navigation, colors, fonts}) => (
  <>
    <Section title="Support" colors={colors} fonts={fonts} />
    {/* <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate('Support')}>
      <Ionicons name="help-outline" size={24} color={colors.primary} />
      <Text
        style={[styles.settingText, {color: colors.text, ...fonts.bodyMedium}]}>
        Support
      </Text>
    </TouchableOpacity> */}
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate('Help')}>
      <Ionicons name="help-circle-outline" size={24} color={colors.primary} />
      <Text
        style={[styles.settingText, {color: colors.text, ...fonts.bodyMedium}]}>
        Help
      </Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.settingItem}
      onPress={() => navigation.navigate('FAQ')}>
      <Ionicons name="document-text-outline" size={24} color={colors.primary} />
      <Text
        style={[styles.settingText, {color: colors.text, ...fonts.bodyMedium}]}>
        FAQ
      </Text>
    </TouchableOpacity>
  </>
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

export default SupportSection;
