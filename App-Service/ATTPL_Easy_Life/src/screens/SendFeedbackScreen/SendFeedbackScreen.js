import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {TextInput} from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
/**
 * SendFeedbackScreen Component
 *
 * This component allows users to send feedback about the app. It includes a text input for users
 * to provide their feedback and a button to submit it. The component displays a description to guide
 * users on what kind of feedback they can provide and applies theme colors and fonts from Redux to
 * ensure a consistent appearance based on the current theme.
 *
 * - **Feedback Input:** A multiline text input for users to enter their feedback.
 * - **Submit Button:** A button to submit the feedback, triggering the `handleSubmitFeedback` function.
 *
 * @component
 * @example
 * <SendFeedbackScreen />
 *
 * @returns {JSX.Element} The rendered component.
 *
 * @author PRATHAMESH GHORPADE
 */

const SendFeedbackScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const [feedback, setFeedback] = useState('');

  const handleSubmitFeedback = () => {
    // Logic to handle submitting feedback
    console.log('Submitting feedback:', feedback);
    // Optionally, you can send the feedback to an API or store it locally.
    // Provide feedback to the user about successful submission or handle errors.
  };

  return (
    <>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.headerLeadings}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {color: colors.surface, ...fonts.titleMedium},
            ]}>
            Send Feedback
          </Text>
        </View>
      </View>
      <View style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.content}>
          <Text style={[styles.description, {color: colors.text}]}>
            Your feedback helps us improve our app. Whether it's a feature
            request, a bug report, or just general thoughts, we'd love to hear
            from you!
          </Text>
          <TextInput
            label="Your Feedback"
            value={feedback}
            onChangeText={text => setFeedback(text)}
            multiline
            numberOfLines={5}
            style={[styles.input, {backgroundColor: colors.surface}]}
            theme={{colors: {primary: colors.primary}}}
          />
          <TouchableOpacity
            style={[styles.button, {backgroundColor: colors.primary}]}
            onPress={handleSubmitFeedback}>
            <Text style={[styles.buttonText, {color: colors.surface}]}>
              Submit Feedback
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    width: '100%',
    paddingHorizontal: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  input: {
    marginBottom: 16,
    fontSize: 16,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginTop: 16,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SendFeedbackScreen;
