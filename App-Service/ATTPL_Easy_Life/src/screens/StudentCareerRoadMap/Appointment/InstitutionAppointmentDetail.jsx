import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Linking,
  Dimensions,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';
import {Card, Chip} from 'react-native-elements';
import {selectTheme} from '../../../redux/selectors';
import {fDate} from '../../utilities/formatData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../../components/layout/Layout';
import ImageView from 'react-native-image-viewing';
import {fetchAppointment} from '../../../redux/slices/CRM/StudentCareerRoad/IntitutionAppointmentSlice';

export default function InstitutionAppointmentDetailsView({route}) {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const {colors, fonts} = useSelector(selectTheme);
  const [currImage, setCurrImage] = useState('');
  const [otherImage, setOtherImage] = useState('');

  const {height: screenHeight} = Dimensions.get('window');

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  const images = [
    {
      uri: currImage,
    },
    {
      uri: otherImage,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const institutionAppointmentId = route?.params?.institutionAppointmentId;

  const openImage = (img, other) => {
    setCurrImage(img);
    setOtherImage(other);
    setIsVisible(true);
  };

  const getData = async () => {
    try {
      const result = await dispatch(fetchAppointment(institutionAppointmentId));
      if (fetchAppointment.fulfilled.match(result)) {
        if (result.payload) {
          setJobData(result.payload);
        } else {
          setJobData({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch Appointment.');
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
      <Text style={[styles.title, {color: colors.text}]}>
        Appointment Details
      </Text>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Appointment Type
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.appointmentType}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Appointment Date
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.appointmentDate}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Appointment Time
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.appointmentTime}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          AppointmentPass Status
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.appointmentPassStatus}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Description</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.description}
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
        <TouchableOpacity
          onPress={() =>
            openImage(jobData?.pdfImageUrl?.pdf, jobData?.pdfImageUrl?.image)
          }>
          <Image
            source={{
              uri:
                jobData?.pdfImageUrl?.pdf ||
                'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openImage(jobData?.pdfImageUrl?.image, jobData?.pdfImageUrl?.pdf)
          }>
          <Image
            source={{
              uri:
                jobData?.pdfImageUrl?.image ||
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

  const renderButton = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* <Text style={[styles.subtitle, { color: colors.text }]}>COMPANY DETAILS</Text> */}
      <Button
        title="Join Meeting"
        onPress={() => {
          Linking.openURL(jobData?.appointmentPassMeetingLink).catch(err =>
            console.error(
              'An error occurred while trying to open the URL:',
              err,
            ),
          );
        }}
      />
    </Card>
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.background, minHeight: screenHeight},
        ]}>
        <View style={styles.grid}>
          <View style={styles.column}>
            {renderContent}
            {jobData?.pdfImageUrl?.pdf &&
              jobData?.pdfImageUrl?.image &&
              renderOverview}
            {jobData?.appointmentPassMeetingLink && renderButton}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
    flexGrow: 1,
    justifyContent: 'space-between',
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
