import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import ApiCaller from '../../services/ApiCaller';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const SurveyItem = ({
  surveyId,
  surveyName,
  endTime,
  surveyStatus,
  surveyDescription,
  onOpenSurvey,
}) => {
  const {colors} = useSelector(selectTheme);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(endTime));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(endTime));
    }, 1000);
    return () => clearInterval(timer);
  }, [endTime]);

  function calculateTimeLeft(endTime) {
    const difference = +new Date(endTime) - +new Date();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  }

  return (
    <View
      style={[
        styles.surveyItem,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <Text style={[styles.surveyTitle, {color: colors.text}]}>
        {surveyName}
      </Text>
      <View style={styles.surveyInfo}>
        <Icon name="time-outline" size={16} color={colors.accent} />
        <Text style={[styles.surveyTime, {color: colors.accent}]}>
          {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m{' '}
          {timeLeft.seconds}s
        </Text>
      </View>
      <Text style={[styles.surveyType, {color: colors.placeholder}]}>
        {surveyDescription}
      </Text>
      <Text
        style={[
          styles.surveyStatus,
          {color: surveyStatus === 'Closed' ? colors.accent : colors.primary},
        ]}>
        {surveyStatus}
      </Text>
      <TouchableOpacity
        style={[styles.openButton, {backgroundColor: colors.primary}]}
        onPress={() => onOpenSurvey(surveyId)}>
        <Text style={[styles.openButtonText, {color: colors.text}]}>Open</Text>
      </TouchableOpacity>
    </View>
  );
};

const AvailableSurvey = () => {
  const {colors} = useSelector(selectTheme);
  const navigation = useNavigation();
  const [surveys, setSurveys] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchSurveys();
  }, []);

  const fetchSurveys = async () => {
    try {
      setLoading(true);
      const response = await ApiCaller.get('/surveys/fetchAll', 'ems');
      const data = await response.data;
      if (data.success) {
        setSurveys(data.data);
      } else {
        setError('Failed to fetch surveys');
      }
    } catch (err) {
      console.error(err);
      setError('An error occurred while fetching surveys');
    } finally {
      setLoading(false);
    }
  };

  const handleOpenSurvey = surveyId => {
    navigation.navigate(
    'SurveyResponseScreen',
   {surveyId},
    );
  };

  if (loading) {
    return (
      <View
        style={[styles.loadingContainer, {backgroundColor: colors.background}]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View
        style={[styles.errorContainer, {backgroundColor: colors.background}]}>
        <Text style={[styles.errorText, {color: colors.accent}]}>{error}</Text>
        <TouchableOpacity
          style={[styles.retryButton, {backgroundColor: colors.primary}]}
          onPress={fetchSurveys}>
          <Text style={[styles.retryButtonText, {color: colors.text}]}>
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const activeSurveys = surveys.filter(
    survey => new Date(survey.endTime) > new Date(),
  );
  const closedSurveys = surveys.filter(
    survey => new Date(survey.endTime) <= new Date(),
  );

  return (
    <ScrollView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <Text style={[styles.title, {color: colors.text}]}>AVAILABLE SURVEY</Text>
      <Text style={[styles.subtitle, {color: colors.placeholder}]}>
        Dashboard • All Survey
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, {color: colors.text}]}>
          Active Surveys
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {activeSurveys.map(survey => (
            <SurveyItem
              key={survey.surveyId}
              {...survey}
              onOpenSurvey={handleOpenSurvey}
            />
          ))}
        </ScrollView>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            Closed Surveys
          </Text>
          <View style={styles.navigation}>
            <TouchableOpacity>
              <Icon name="chevron-back-outline" size={24} color={colors.text} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon
                name="chevron-forward-outline"
                size={24}
                color={colors.text}
              />
            </TouchableOpacity>
          </View>
        </View>
        {closedSurveys.map(survey => (
          <View
            key={survey.surveyId}
            style={[
              styles.expiredSurveyItem,
              {borderBottomColor: colors.border},
            ]}>
            <Text style={[styles.expiredSurveyTitle, {color: colors.text}]}>
              {survey.surveyName}
            </Text>
            <Text
              style={[styles.expiredSurveyTime, {color: colors.placeholder}]}>
              {new Date(survey.endTime).toLocaleString()}
            </Text>
            <Text
              style={[styles.expiredSurveyType, {color: colors.placeholder}]}>
              {survey.surveyDescription}
            </Text>
            <Text style={[styles.expiredStatus, {color: colors.accent}]}>
              {survey.surveyStatus}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  errorText: {
    fontSize: 18,
    marginBottom: 16,
  },
  retryButton: {
    padding: 12,
    borderRadius: 8,
  },
  retryButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  navigation: {
    flexDirection: 'row',
    gap: 16,
  },
  surveyItem: {
    width: 240,
    padding: 16,
    marginRight: 16,
    borderRadius: 12,
    borderWidth: 1,
    elevation: 2,
  },
  surveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  surveyInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  surveyTime: {
    marginLeft: 4,
    fontWeight: '600',
  },
  surveyType: {
    marginBottom: 8,
  },
  surveyStatus: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  openButton: {
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  openButtonText: {
    fontWeight: 'bold',
  },
  expiredSurveyItem: {
    padding: 16,
    borderBottomWidth: 1,
    marginBottom: 12,
  },
  expiredSurveyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  expiredSurveyTime: {
    marginTop: 4,
  },
  expiredSurveyType: {
    marginTop: 4,
  },
  expiredStatus: {
    fontWeight: '600',
    marginTop: 4,
  },
});

export default AvailableSurvey;
