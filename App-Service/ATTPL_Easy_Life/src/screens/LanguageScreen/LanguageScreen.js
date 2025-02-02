import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

/**
 * LanguageScreen component.
 *
 * This screen allows users to select their preferred language for the app.
 * It provides options to switch between different languages and displays the current language setting.
 *
 * @param {object} navigation - The navigation prop used to navigate between screens.
 *
 * @returns {React.Element} - The LanguageScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const LanguageScreen = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  // Function to handle language change (placeholder)
  const handleChangeLanguage = language => {
    // Implement logic to change app language
    console.log(`Switching to ${language} language`);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.surface} />
        </TouchableOpacity>
        <Text
          style={[
            styles.headerTitle,
            {color: colors.surface, ...fonts.titleMedium},
          ]}>
          Language Settings
        </Text>
      </View>

      <View style={styles.content}>
        <Text
          style={[
            styles.sectionTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Select App Language
        </Text>

        <TouchableOpacity
          style={styles.languageItem}
          onPress={() => handleChangeLanguage('English')}>
          <Text
            style={[
              styles.languageText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            English
          </Text>
          {/* Add checkmark icon or other indicator for selected language */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageItem}
          onPress={() => handleChangeLanguage('French')}>
          <Text
            style={[
              styles.languageText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            French
          </Text>
          {/* Add checkmark icon or other indicator for selected language */}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.languageItem}
          onPress={() => handleChangeLanguage('Spanish')}>
          <Text
            style={[
              styles.languageText,
              {color: colors.text, ...fonts.bodyMedium},
            ]}>
            Spanish
          </Text>
          {/* Add checkmark icon or other indicator for selected language */}
        </TouchableOpacity>

        {/* Add more languages as needed */}

        <Text
          style={[
            styles.infoText,
            {color: colors.placeholder, ...fonts.bodySmall},
          ]}>
          Select the language you prefer for using this app.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  content: {
    flex: 1,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  languageText: {
    fontSize: 16,
  },
  infoText: {
    marginTop: 8,
  },
});

export default LanguageScreen;
