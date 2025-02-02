import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Chip} from 'react-native-elements';
import {selectTheme} from '../../redux/selectors';
import {fDate} from '../../utilities/formatData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {fetchLabourJob} from '../../redux/slices/CRM/LabourJobPortalSlice';

export default function JobDetailsView({route, navigation}) {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const {colors, fonts} = useSelector(selectTheme);

  const jobPostId = route?.params?.jobId;
  const selfCoordinates = route?.params?.selfCoordinates;

  const getData = async () => {
    try {
      const result = await dispatch(fetchLabourJob(jobPostId));
      if (fetchLabourJob.fulfilled.match(result)) {
        if (result.payload) {
          setJobData(result.payload);
        } else {
          setJobData({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch labour job.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  function handleGetDirection() {
    Linking.openURL(
      `https://www.google.com/maps/dir/?api=1&origin=${selfCoordinates.lat},${selfCoordinates.lng}&destination=${jobData.latitude},${jobData.longitude}&travelmode=driving`,
    );
  }

  const renderContent = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {jobData?.jobTitle?.toUpperCase()}
      </Text>
      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Work Description
        </Text>
        <Text style={{color: colors.text}}>{jobData.jobDescription}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Key Responsibilities
        </Text>
        <View>
          {jobData?.responsibilities?.map((req, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Text style={[styles.bullet, {color: colors.text}]}>•</Text>
              <Text style={[styles.listItem, {color: colors.text}]}>{req}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Requirements
        </Text>
        <View>
          {jobData?.requirements?.map((req, index) => (
            <View key={index} style={styles.listItemContainer}>
              <Text style={[styles.bullet, {color: colors.text}]}>•</Text>
              <Text style={[styles.listItem, {color: colors.text}]}>{req}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Benefits</Text>
        <View style={styles.chipContainer}>
          {jobData?.benefits?.map((benefit, index) => (
            <Chip
              key={index}
              title={benefit}
              buttonStyle={[styles.chip, {backgroundColor: colors.backdrop}]}
            />
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          How To Apply
        </Text>
        <Text style={{color: colors.text}}>{jobData.howToApply}</Text>
      </View>
    </Card>
  );

  const renderOverview = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {[
        {
          label: 'Date Posted',
          value: fDate(jobData.created_at),
          icon: <Ionicons name="calendar" size={18} color={colors.text} />,
        },
        {
          label: 'Expiration date',
          value: fDate(jobData.applicationDeadline),
          icon: <Ionicons name="calendar" size={18} color={colors.text} />,
        },
        {
          label: 'Employment type',
          value: jobData.employmentType,
          icon: <Ionicons name="briefcase" size={18} color={colors.text} />,
        },
        {
          label: 'Offered salary',
          value: `₹ ${jobData?.salary?.price} (${jobData?.salary?.type}) `,
          icon: <Ionicons name="cash" size={18} color={colors.text} />,
        },
      ].map((item, index) => (
        <View key={index} style={styles.overviewItem}>
          {item.icon}
          <View style={styles.overviewText}>
            <Text style={styles.overviewLabel}>{item.label}</Text>
            <Text style={[styles.overviewValue, {color: colors.text}]}>
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );

  const renderCompany = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        COMPANY DETAILS
      </Text>
      <Text style={[styles.companyName, {color: colors.text}]}>
        {jobData.companyName}
      </Text>
      <Text style={[styles.companyLocation, {color: colors.text}]}>
        {jobData.location}
      </Text>
      <Button title="Get Direction" onPress={handleGetDirection} />
    </Card>
  );

  return (
    <ScrollView
      contentContainerStyle={[
        styles.container,
        {backgroundColor: colors.background},
      ]}>
      <View style={styles.grid}>
        <View style={styles.column}>
          {renderContent}
          {renderOverview}
          {renderCompany}
        </View>
      </View>
    </ScrollView>
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 16,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
