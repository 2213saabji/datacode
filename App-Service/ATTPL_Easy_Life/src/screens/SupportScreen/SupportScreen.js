import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
/**
 * SupportScreen Component
 *
 * This component provides a support interface for users, including options to navigate to the
 * FAQ screen and contact support. It features a header with a back navigation button and title,
 * and a content area with touchable items for each support option. The component's appearance
 * is customized based on the current theme from Redux, including colors and fonts.
 *
 * - **Navigate to FAQ:** Redirects users to the FAQ screen for common questions.
 * - **Navigate to Contact Support:** Redirects users to the Contact Support screen for assistance.
 *
 * @component
 * @example
 * <SupportScreen />
 *
 * @returns {JSX.Element} The rendered component with support options.
 *
 * @author PRATHAMESH GHORPADE
 */

const SupportScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  // Example functions for navigation
  const navigateToFAQ = () => {
    // Navigate to FAQ screen
    navigation.navigate('FAQ');
  };

  const navigateToContactSupport = () => {
    // Navigate to Contact Support screen
    navigation.navigate('Support');
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {color: colors.surface, ...fonts.titleMedium},
          ]}>
          Support
        </Text>
        <View style={{width: 24}} />
      </View>
      <View style={styles.content}>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={navigateToFAQ}>
          <Ionicons
            name="help-circle-outline"
            size={24}
            color={colors.primary}
          />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.item, {backgroundColor: colors.surface}]}
          onPress={navigateToContactSupport}>
          <Ionicons name="call-outline" size={24} color={colors.primary} />
          <Text
            style={[
              styles.itemText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Contact Support
          </Text>
        </TouchableOpacity>
        {/* Add more support options as needed */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  itemText: {
    marginLeft: 16,
    fontSize: 16,
  },
});

export default SupportScreen;
