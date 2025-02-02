import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {Card, Chip} from 'react-native-elements';
import {selectTheme} from '../../redux/selectors';
import {useNavigation} from '@react-navigation/native';
import {fDate} from '../../utilities/formatData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../components/layout/Layout';
import ImageView from 'react-native-image-viewing';
import {fetchCoaching} from '../../redux/slices/CRM/StudentCareerRoad/IsntitutionList/CoachingSlice';

export default function CoachingDetailsView({route, navigation}) {
  const dispatch = useDispatch();
  const [detailData, setDetailData] = useState({});
  const {colors, fonts} = useSelector(selectTheme);
  const [currImage, setCurrImage] = useState('');

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  const images = [
    {
      uri: currImage,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const coachingCenterDetailId = route?.params?.coachingCenterDetailId;

  const openImage = img => {
    setCurrImage(img);
    setIsVisible(true);
  };

  const getData = async () => {
    try {
      const result = await dispatch(fetchCoaching(coachingCenterDetailId));
      if (fetchCoaching.fulfilled.match(result)) {
        if (result.payload) {
          setDetailData(result.payload);
        } else {
          setDetailData({});
        }
      } else {
        console.log(
          result.payload || 'Failed to fetch Coaching Center details.',
        );
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  const renderContent = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.title, {color: colors.text}]}>DETAILS</Text>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Subjects Offered
        </Text>
        <View style={styles.chipContainer}>
          {detailData?.subjectsOffered?.map((val, index) => (
            <Chip
              key={index}
              title={val}
              buttonStyle={[styles.chip, {backgroundColor: colors.backdrop}]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Competitive Exams
        </Text>
        <View style={styles.chipContainer}>
          {detailData?.competitiveExams?.map((val, index) => (
            <Chip
              key={index}
              title={val}
              buttonStyle={[styles.chip, {backgroundColor: colors.backdrop}]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Batch Timings
        </Text>
        <View style={styles.chipContainer}>
          {detailData?.batchTimings?.map((val, index) => (
            <Chip
              key={index}
              title={val}
              buttonStyle={[styles.chip, {backgroundColor: colors.backdrop}]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Success Rate
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {detailData?.successRate}
        </Text>
      </View>
    </Card>
  );

  const renderOverview = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <View style={styles.section}>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          Image Gallery
        </Text>
        <TouchableOpacity onPress={() => openImage(detailData?.imageUrl?.logo)}>
          <Image
            source={{
              uri:
                detailData?.imageUrl?.logo ||
                'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </Card>
  );

  const renderBooking = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* <Text style={[styles.subtitle, { color: colors.text }]}>COMPANY DETAILS</Text> */}
      <Button
        title="Book Appointment"
        onPress={() =>
          navigation.navigate('StudentAppointmentCreate', {
            institutionOwnerId: detailData?.institutionOwnerId,
          })
        }
      />
    </Card>
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.background},
        ]}>
        <View style={styles.grid}>
          <View style={styles.column}>
            {renderContent}
            {renderOverview}
            {renderBooking}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  cardImage: {
    height: 220, // Adjust the height as per your design
    width: '100%',
    borderRadius: 14,
    marginTop: 14,
    objectFit: 'fill',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 16,
  },
  subtitle: {
    marginBottom: 8,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
  },
  listItem: {
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  overviewText: {
    marginLeft: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#888',
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyLocation: {
    fontSize: 16,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '48%',
    marginHorizontal: '1%',
  },
});
