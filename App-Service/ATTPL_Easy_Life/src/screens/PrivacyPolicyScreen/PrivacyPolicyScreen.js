import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import termsAndConditions from '../../data/termsAndConditions';
/**
 * PrivacyPolicyScreen Component
 *
 * This component displays the Privacy Policy of the application. It presents a list of
 * terms and conditions that are fetched from the `termsAndConditions` data source.
 * The screen includes a back button to navigate to the previous screen and uses Redux
 * for theme integration to ensure consistent styling throughout the app.
 *
 * - **Navigation:** Provides a back button to return to the previous screen.
 * - **Content Display:** Renders the Privacy Policy content dynamically from the
 *   `termsAndConditions` array. Each item is displayed with a title and content.
 * - **Theme Integration:** Applies theme colors and fonts from Redux to style the
 *   component according to the current theme.
 * - **ScrollView:** Allows users to scroll through the entire privacy policy content.
 *
 * @component
 * @example
 * <PrivacyPolicyScreen navigation={navigation} />
 *
 * @param {object} navigation - The navigation prop used to navigate back to the previous screen.
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 * @co-author SHIVAM GAUTAM
 */

const PrivacyPolicyScreen = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {color: colors.surface, ...fonts.titleMedium},
          ]}>
          Privacy Policy
        </Text>
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {termsAndConditions.map((item, index) => (
          <View key={index} style={styles.section}>
            <Text
              style={[
                styles.title,
                {color: colors.text, ...fonts.titleMedium},
              ]}>
              {item.title}
            </Text>
            <Text
              style={[
                styles.contentText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {item.content}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    padding: 16,
    flexGrow: 1,
  },
  section: {
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  contentText: {
    fontSize: 16,
    lineHeight: 22,
  },
});

export default PrivacyPolicyScreen;
