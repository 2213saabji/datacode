import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Animated,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import LinearGradient from 'react-native-linear-gradient';
import ApiCaller from '../../services/ApiCaller';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

const ShareYourSuggestion = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));
  const user = useSelector(selectUser);
  const {showAlert} = useCustomAlert();

  const handleSubmit = async () => {
    if (suggestion.trim() === '') {
      // Show an error message or alert
      return;
    }

    setIsSubmitting(true);

    try {
      console.log('---', user.userId);

      // Replace with your actual API endpoint
      const response = await ApiCaller.post(
        '/feedback/create',
        {userId: user.userId, feedbackMessage: suggestion},
        'cms',
      );
      console.log(response.data.message);

      if (response.data.success) {
        setIsSubmitted(true);
        setSuggestion('');
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }).start();
        showAlert(response.data.message, 'success');
      } else {
        // Handle error
        console.error('Failed to submit suggestion');
        showAlert('Failed to submit suggestion', 'error');
      }
    } catch (error) {
      console.error('Error submitting suggestion:', error);
      showAlert('Error submitting suggestion:', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, {backgroundColor: colors.background}]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <LinearGradient
          colors={[colors.primary, colors.accent]}
          style={styles.header}>
          <Text
            style={[
              styles.title,
              {
                color: colors.onPrimary,
                fontFamily: fonts.titleLarge.fontFamily,
              },
            ]}>
            SHARE YOUR VISION
          </Text>
        </LinearGradient>

        <View style={styles.cards}>
          <Text
            style={[
              styles.subtitle,
              {color: colors.text, fontFamily: fonts.titleMedium.fontFamily},
            ]}>
            DASHBOARD • IDEA BOX
          </Text>
        </View>

        <View style={styles.cardWrapper}>
          <View style={[styles.card, {backgroundColor: colors.surface}]}>
            <Text
              style={[
                styles.cardTitle,
                {color: colors.text, fontFamily: fonts.bodyLarge.fontFamily},
              ]}>
              HELP US SHAPE THE FUTURE!
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  borderColor: colors.border,
                  fontFamily: fonts.bodyMedium.fontFamily,
                  color: colors.text,
                },
              ]}
              placeholder="Your game-changing idea awaits..."
              placeholderTextColor={colors.placeholder}
              multiline
              value={suggestion}
              onChangeText={setSuggestion}
            />
            <TouchableOpacity
              style={[styles.button, {backgroundColor: colors.primary}]}
              onPress={handleSubmit}
              disabled={isSubmitting || isSubmitted}>
              {isSubmitting ? (
                <ActivityIndicator color={colors.onPrimary} />
              ) : (
                <Text
                  style={[
                    styles.buttonText,
                    {
                      color: colors.onPrimary,
                      fontFamily: fonts.titleMedium.fontFamily,
                    },
                  ]}>
                  {isSubmitted ? 'Thank You!' : 'Illuminate Us'}
                </Text>
              )}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.imageWrapper}>
          {isSubmitted ? (
            <Animated.View style={{opacity: fadeAnim}}>
              <Text style={[styles.thankYouText, {color: colors.primary}]}>
                Your brilliance shines through!
              </Text>
              <Text style={[styles.subThankYouText, {color: colors.text}]}>
                We're excited to explore your idea.
              </Text>
            </Animated.View>
          ) : (
            <Image
              source={require('../../assets/Suggestion/suggestion.png')}
              style={styles.image}
              resizeMode="contain"
            />
          )}
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    paddingVertical: 20,
    borderRadius: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    letterSpacing: 1,
  },
  cards: {
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  cardWrapper: {
    flex: 1,
    alignItems: 'center',
  },
  card: {
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    width: '100%',
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 15,
    lineHeight: 28,
    textAlign: 'center',
  },
  input: {
    height: 120,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    textAlignVertical: 'top',
  },
  button: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  imageWrapper: {
    alignItems: 'center',
    marginTop: 30,
  },
  image: {
    width: 265,
    height: 280,
  },
  thankYouText: {
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 10,
  },
  subThankYouText: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default ShareYourSuggestion;
