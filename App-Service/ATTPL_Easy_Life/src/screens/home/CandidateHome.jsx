import React, {useCallback, useMemo} from 'react';
import {
  View,
  ScrollView,
  Text,
  Image,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';


const CandidateHomeScreen = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleCardPress = useCallback(
    title => {
      // Navigation logic based on the card title
      switch (title) {
        case 'ATFFL STUDENT GUIDE':
          navigation.navigate('StudentGuide');
          break;
        case 'ELECTION MANAGEMENT OVERVIEW':
          navigation.navigate('ElectionManagement');
          break;
        // ... add cases for other cards
        default:
          Alert.alert('Coming Soon', 'This feature is not yet available.');
      }
    },
    [navigation],
  );

  const cardData = useMemo(
    () => [
      {
        title: 'ATFFL STUDENT GUIDE',
        image: require('../../assets/Home/images/Candidate/student.png'),
      },
      {
        title: 'ELECTION MANAGEMENT OVERVIEW',
        image: require('../../assets/Home/images/Candidate/EMS.png'),
      },
      {
        title: 'VOTER BEHAVIOUR OVERVIEW',
        image: require('../../assets/Home/images/Candidate/Voter.png'),
      },
      {
        title: 'FEATURE OVERVIEW',
        image: require('../../assets/Home/images/Candidate/Feature.png'),
      },
      {
        title: 'VOTER DESIRE OVERVIEW',
        image: require('../../assets/Home/images/Candidate/voter_desire.png'),
      },
      {
        title: 'SURVEY MANAGEMENT OVERVIEW',
        image: require('../../assets/Home/images/Candidate/survay.png'),
      },
      // {
      //   title: 'COMPLAINT MANAGEMENT OVERVIEW',
      //   image: require('../../assets/Home/images/Candidate/Complaint.png'),
      // },
      {
        title: 'EXPENSE MANAGEMENT OVERVIEW',
        image: require('../../assets/Home/images/Candidate/expense.png'),
      },
      {
        title: 'TRANSPORT MANAGEMENT OVERVIEW',
        image: require('../../assets/Home/images/Candidate/TMS.png'),
      },
    ],
    [],
  );

  const OverviewCard = useCallback(
    ({title, image}) => (
      <TouchableOpacity
        onPress={() => handleCardPress(title)}
        style={{
          backgroundColor: colors.surface,
          margin: 20,
          borderRadius: 10,
          overflow: 'hidden',
          elevation: 3,
        }}>
        <Image
          source={image}
          style={{
            width: '100%',
            height: 350,
            resizeMode: 'center',
          }}
        />
        <View
          style={{
            backgroundColor: colors.surface,
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            padding: 10,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: 'bold',
              color: colors.text,
              ...fonts.bold,
            }}>
            {title}
          </Text>
        </View>
      </TouchableOpacity>
    ),
    [colors, fonts, handleCardPress],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.background}}>
      <StatusBar barStyle="dark-content" />
      <ScrollView style={{flex: 1}}>
        <View
          style={{
            padding: 20,
            margin: 20,
            backgroundColor:
              colors.headerBackground || 'rgba(216, 239, 253, 1)',
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
              marginBottom: 10,
              ...fonts.bold,
              alignSelf: 'center',
            }}>
            Welcome Prince
          </Text>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              marginBottom: 20,
              ...fonts.regular,
              textAlign: 'center',
            }}>
            ATTPLGroup is a renowned provider of Seven essential services,
            namely construction services, finance services, consultancy, solar
            energy solutions, and IT solutions. Our team of professionals has
            extensive expertise and experience in delivering innovative
            solutions that cater to your diverse business needs. Our company
            operates on a client-centric approach to ensure our clients'
            satisfaction, and we are committed to providing high-quality
            services that meet your expectations.
          </Text>
          <Image
            source={require('../../assets/Home/images/featurecard.png')}
            style={{
              width: '100%',
              height: 200,
              resizeMode: 'contain',
            }}
          />
        </View>

        {cardData.map((card, index) => (
          <OverviewCard key={index} title={card.title} image={card.image} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default CandidateHomeScreen;
