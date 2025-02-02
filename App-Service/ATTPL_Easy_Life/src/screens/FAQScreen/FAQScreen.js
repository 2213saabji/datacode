import React from 'react';
import {View, Text, StyleSheet, ScrollView} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
/**
 * FAQScreen Component
 *
 * This component displays a list of frequently asked questions (FAQ) with their corresponding answers.
 * The screen features a header with a back navigation button and title, and a scrollable content area
 * where each FAQ item is presented. The appearance of the screen is customized based on the current
 * theme from Redux, including colors and fonts.
 *
 *
 * @component
 * @example
 * <FAQScreen />
 *
 * @returns {JSX.Element} The rendered component with FAQ items.
 *
 * @author PRATHAMESH GHORPADE
 */

const FAQScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const faqData = [
    {
      question: 'How do I reset my password?',
      answer:
        'To reset your password, go to the login screen and click on the Forgot Password link. Follow the instructions to reset your password.',
    },
    {
      question: 'How can I contact customer support?',
      answer:
        'You can contact our customer support team through email at support@example.com or by calling +1234567890.',
    },
    {
      question: 'Can I change my username?',
      answer:
        'Currently, you cannot change your username once it has been set during account registration. Please contact customer support for assistance.',
    },
    {
      question: 'Is there a mobile app available?',
      answer:
        'Yes, we have a mobile app available for both iOS and Android. You can download it from the respective app stores.',
    },
    {
      question: 'How do I update my app?',
      answer:
        'To update the app, go to the app store (Google Play Store for Android or App Store for iOS) and check for updates for our app.',
    },
  ];

  return (
    <View style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <Ionicons
          name="arrow-back"
          size={24}
          color={colors.surface}
          onPress={() => navigation.goBack()}
        />
        <Text
          style={[
            styles.headerTitle,
            {color: colors.surface, ...fonts.titleMedium},
          ]}>
          FAQ
        </Text>
        <View style={{width: 24}} />
      </View>
      <ScrollView contentContainerStyle={styles.content}>
        {faqData.map((item, index) => (
          <View
            key={index}
            style={[styles.faqItem, {backgroundColor: colors.surface}]}>
            <Text
              style={[
                styles.question,
                {color: colors.text, ...fonts.titleMedium},
              ]}>
              {item.question}
            </Text>
            <Text
              style={[
                styles.answer,
                {color: colors.placeholder, ...fonts.bodyRegular},
              ]}>
              {item.answer}
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
    padding: 16,
  },
  faqItem: {
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 16,
  },
  question: {
    fontSize: 18,
    marginBottom: 8,
  },
  answer: {
    fontSize: 16,
  },
});

export default FAQScreen;
