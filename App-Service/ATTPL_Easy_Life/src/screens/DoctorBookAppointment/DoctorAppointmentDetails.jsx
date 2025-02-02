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
import Layout from '../../components/layout/Layout';
import {getDoctorAppointment} from '../../redux/slices/CMS/doctorappointmentbooking';

export default function DoctorAppointmentDetailsView({route, navigation}) {
  const dispatch = useDispatch();
  // const appointmentt = useSelector((state) => state.appointments.data);
  // const [jobData, setappointment] = useState({});
  const [appointment, setAppointment] = useState({});
  const {colors, fonts} = useSelector(selectTheme);

  const AppointmentId = route?.params?.AppointmentId;
  console.log('params---->', route);
  // const selfCoordinates = route?.params?.selfCoordinates;

  const getData = async () => {
    try {
      const result = await dispatch(getDoctorAppointment(AppointmentId));
      console.log(result);
      if (getDoctorAppointment.fulfilled.match(result)) {
        if (result.payload) {
          // console.log(" data is ---->",result)
          setAppointment(result.payload);
        } else {
          setAppointment({});
        }
      } else {
        console.log('Hi we got error2---->');
        console.log(result.payload || 'Failed to fetch Apointment.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);
  // console.log(appointment)

  //   function handleGetDirection() {
  //     Linking.openURL(`https://www.google.com/maps/dir/?api=1&origin=${selfCoordinates.lat},${selfCoordinates.lng}&destination=${appointment.latitude},${appointment.longitude}&travelmode=driving`);
  //   }

  const renderContent = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {appointment?.problemTitle?.toUpperCase()}
      </Text>
      {/* <View style={styles.section}>
        <Text style={[styles.subtitle, { color: colors.text }]}>Problem Description</Text>
        <Text style={{ color: colors.text }}>{appointment.problemDescription}</Text>
      </View> */}

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Appointment Type
        </Text>
        <Text style={{color: colors.text}}>{appointment.appointmentType}</Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Appointment Pass Status
        </Text>
        <Text style={{color: colors.text}}>
          {appointment.appointmentPassStatus}
        </Text>
      </View>

      {/* <View style={styles.section}>
        <Text style={[styles.subtitle, { color: colors.text }]}>How To Apply</Text>
        <Text style={{ color: colors.text }}>{appointment.appointmentType}</Text>
      </View> */}
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
          label: 'Problem Description',
          value: appointment.problemDescription,
          icon: <Ionicons name="briefcase" size={18} color={colors.text} />,
        },
        {
          label: 'Date',
          value: fDate(appointment.appointmentDate),
          icon: <Ionicons name="calendar" size={18} color={colors.text} />,
        },
        // {
        //   label: 'Expiration date',
        //   value: fDate(appointment.appointmentTime),
        //   icon: <Ionicons name='calendar' size={18} color={colors.text} />,
        // },
        {
          label: 'Employment type',
          value: appointment.appointmentPassStatus,
          icon: <Ionicons name="briefcase" size={18} color={colors.text} />,
        },
        // {
        //   label: 'Offered salary',
        //   value: `₹ ${appointment?.salary?.price} (${appointment?.salary?.type}) `,
        //   icon: <Ionicons name='cash' size={18} color={colors.text} />,
        // },
      ].map((item, index) => (
        <View key={index} style={styles.overviewItem}>
          {item.icon}
          <View style={styles.overviewText}>
            <Text style={styles.overviewLabel}>{item.appointmentDate}</Text>
            <Text style={[styles.overviewValue, {color: colors.text}]}>
              {item.value}
            </Text>
          </View>
        </View>
      ))}
    </Card>
  );

  const renderCard = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* <Text style={[styles.title, { color: colors.text }]}>{appointment?.problemTitle?.toUpperCase()}</Text>/ */}
      {/* {/* <View style={styles.section}>
        <Text style={[styles.subtitle, { color: colors.text }]}>Problem Description</Text>
        <Text style={{ color: colors.text }}>{appointment.problemDescription}</Text>
      </View> */}

      <View style={styles.INcard}>
        {/* <Text style={[styles.subtitle, { color: colors.text }]}>Appointment Pass Status</Text> */}
        {appointment.appointmentPassStatus == 'open' && (
          <Text style={{color: '#ff6f00'}}>
            Your appointment send to Doctor
          </Text>
        )}
        {appointment.appointmentPassStatus == 'in-progress' && (
          <Text style={{color: '#ff6f00'}}>
            Your Appointment Approved By Doctor{' '}
          </Text>
        )}
        {appointment.appointmentPassStatus == 'close' && (
          <Text style={{color: '#ff6f00'}}>Your appointment is close</Text>
        )}
      </View>

      <View style={styles.INcard}>
        {/* <Text style={[styles.subtitle, { color: colors.text }]}>Appointment Pass Status</Text> */}
        {/* {appointment.appointmentPassStatus=='open'&&(<Text style={{ color: '#ff6f00' }}>Your appointment send to Doctor</Text>)} */}
        {/* {appointment.appointmentType=='remote'&&(<Text style={{ color: '#ff6f00' }}>Your Meatting Link Is Here =={appointment?.appointmentPassMeetingLink}</Text>)} */}
        {/* {appointment.appointmentPassStatus=='close'&&(<Text style={{ color: '#ff6f00'}}>Your appointment is close</Text>)} */}
      </View>

      {/* <View style={styles.section}>
        <Text style={[styles.subtitle, { color: colors.text }]}>How To Apply</Text>
        <Text style={{ color: colors.text }}>{appointment.appointmentType}</Text>
      </View> */}
    </Card>
  );

  // const renderCompany = (
  //   <Card containerStyle={[styles.card, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
  //     <Text style={[styles.subtitle, { color: colors.text }]}>COMPANY DETAILS</Text>
  //     <Text style={[styles.companyName, { color: colors.text }]}>{appointment.companyName}</Text>
  //     <Text style={[styles.companyLocation, { color: colors.text }]}>{appointment.location}</Text>
  //     {/* <Button title="Get Direction" onPress={handleGetDirection} /> */}
  //   </Card>
  // );

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.background},
        ]}>
        <View style={styles.grid}>
          <View style={styles.column}>
            {renderCard}
            {renderContent}
            {renderOverview}
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
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  INcard: {
    fontSize: 28,
    fontWeight: 'bold',
    margin: 'auto',
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
