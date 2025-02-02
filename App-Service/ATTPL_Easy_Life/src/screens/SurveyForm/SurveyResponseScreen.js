import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import ApiCaller from '../../services/ApiCaller';

const {width} = Dimensions.get('window');

const SurveyResponseScreen = () => {
  const {colors} = useSelector(selectTheme);
  const route = useRoute();
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState({});

  useEffect(() => {
    fetchSurvey();
  }, []);

  const fetchSurvey = async () => {
    try {
      const surveyId = route.params?.surveyId;
      if (!surveyId) {
        throw new Error('Survey ID not provided');
      }
      const response = await ApiCaller.get(`/surveys/fetch/${surveyId}`, 'ems');
      const data = await response.data;
      console.log(data);

      if (data) {
        setSurvey(data);
      } else {
        throw new Error(data.message || 'Failed to fetch survey');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      const surveyId = route.params?.surveyId;
      if (!surveyId) {
        throw new Error('Survey ID not provided');
      }

      // Prepare response data
      const userId = 6; // Example userId, replace with actual user ID
      const responses = Object.keys(selectedOptions).map(questionId => ({
        surveyQuestionId: parseInt(questionId, 10),
        response: selectedOptions[questionId],
      }));

      const responsePayload = {
        userId,
        responses,
      };

      // Make API call to submit responses
      const response = await ApiCaller.post(
        `/survey/${surveyId}/responses`,
        responsePayload,
        'ems',
      );
      const responseData = await response.data;

      if (response.status === 200) {
        console.log('Survey responses submitted successfully:', responseData);
      } else {
        throw new Error(
          responseData.message || 'Failed to submit survey responses',
        );
      }
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          {backgroundColor: colors.background},
        ]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          {backgroundColor: colors.background},
        ]}>
        <Icon name="alert-circle-outline" size={48} color={colors.accent} />
        <Text style={[styles.errorText, {color: colors.accent}]}>{error}</Text>
      </View>
    );
  }

  if (!survey) {
    return (
      <View
        style={[
          styles.container,
          styles.centerContent,
          {backgroundColor: colors.background},
        ]}>
        <Icon
          name="clipboard-text-off-outline"
          size={48}
          color={colors.placeholder}
        />
        <Text style={[styles.noDataText, {color: colors.placeholder}]}>
          No survey data available
        </Text>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.headerContainer}>
        <Text style={[styles.header, {color: colors.text}]}>
          Fill the Survey
        </Text>
        <View style={styles.breadcrumb}>
          <Text style={[styles.breadcrumbText, {color: colors.placeholder}]}>
            All Survey • {survey.surveyName}
          </Text>
        </View>
      </View>

      <View
        style={[
          styles.detailsContainer,
          {backgroundColor: colors.surface, borderColor: colors.border},
        ]}>
        <Text style={[styles.sectionTitle, {color: colors.primary}]}>
          Survey Details
        </Text>
        <View style={styles.detailRow}>
          <Icon
            name="clipboard-text-outline"
            size={24}
            color={colors.primary}
          />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, {color: colors.text}]}>
              Survey Name:
            </Text>
            <Text style={[styles.detailValue, {color: colors.text}]}>
              {survey.surveyName}
            </Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Icon name="format-title" size={24} color={colors.primary} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, {color: colors.text}]}>
              Survey Title:
            </Text>
            <Text style={[styles.detailValue, {color: colors.text}]}>
              {survey.surveyTitle}
            </Text>
          </View>
        </View>
        <View style={styles.detailRow}>
          <Icon name="text-box-outline" size={24} color={colors.primary} />
          <View style={styles.detailTextContainer}>
            <Text style={[styles.detailLabel, {color: colors.text}]}>
              Survey Description:
            </Text>
            <Text style={[styles.detailValue, {color: colors.text}]}>
              {survey.surveyDescription}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.questionsContainer}>
        <Text style={[styles.sectionTitle, {color: colors.primary}]}>
          Survey Questions
        </Text>
        {survey.surveyQuestionBanks.map((question, index) => (
          <View
            key={question.questionId}
            style={[
              styles.questionContainer,
              {backgroundColor: colors.surface, borderColor: colors.border},
            ]}>
            <Text style={[styles.questionText, {color: colors.text}]}>
              {index + 1}. {question.questionDescription}
            </Text>
            <RadioButton.Group
              onValueChange={value =>
                setSelectedOptions(prev => ({
                  ...prev,
                  [question.questionId]: value,
                }))
              }
              value={selectedOptions[question.questionId] || ''}>
              {question.options.map((option, optionIndex) => (
                <View key={optionIndex} style={styles.optionContainer}>
                  <RadioButton value={option} color={colors.primary} />
                  <Text style={[styles.optionText, {color: colors.text}]}>
                    {option}
                  </Text>
                </View>
              ))}
            </RadioButton.Group>
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[styles.submitButton, {backgroundColor: colors.primary}]}
        onPress={handleSubmit}>
        <Text style={[styles.submitButtonText, {color: colors.background}]}>
          Submit Survey
        </Text>
        <Icon
          name="send"
          size={24}
          color={colors.background}
          style={styles.submitIcon}
        />
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    marginBottom: 24,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbText: {
    fontSize: 14,
  },
  detailsContainer: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  detailTextContainer: {
    marginLeft: 12,
    flex: 1,
  },
  detailLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
  },
  questionsContainer: {
    marginBottom: 24,
  },
  questionContainer: {
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 16,
  },
  submitButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    elevation: 2,
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  submitIcon: {
    marginLeft: 8,
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
  noDataText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
  },
});

export default SurveyResponseScreen;
