import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {Card, IconButton, Button} from 'react-native-paper';
import {Image} from 'react-native-elements';

const DoctorBookAppointment = ({navigation}) => {
  const handlePressOpen = () => {
    navigation.navigate('AppointmentList', {status: 'open'});
  };

  const handlePressPending = () => {
    navigation.navigate('AppointmentList', {status: 'In-Progress'});
  };

  const handlePressClosed = () => {
    navigation.navigate('AppointmentList', {status: 'closed'});
  };

  const handlenavigate = () => {
    navigation.navigate('AppointmentForm');
  };

  return (
    //   <Layout >
    <ScrollView style={styles.container}>
      <Image
        source={require('../../assets/BusinessCareerRoadmap/images/1.webp')}
        style={styles.horizontalImage}
      />
      {/* <Text style={styles.title}>Doctor Book Appointment</Text> */}
      <Button
        mode="contained"
        style={styles.bookButton}
        onPress={handlenavigate}>
        + BOOK APPOINTMENT
      </Button>
      <TouchableOpacity style={styles.link} onPress={handlePressOpen}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              icon="clock"
              size={80}
              color="#fff"
              style={styles.icon}
            />
            <Text style={styles.cardLabel}>Pending Appointments</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handlePressPending}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              icon="calendar-check"
              color="#fff"
              size={80}
              style={styles.icon}
            />
            <Text style={styles.cardLabel}>Active Appointments</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
      <TouchableOpacity style={styles.link} onPress={handlePressClosed}>
        <Card style={styles.card}>
          <Card.Content style={styles.cardContent}>
            <IconButton
              icon="calendar-remove"
              color="#fff"
              size={80}
              style={styles.icon}
            />
            <Text style={styles.cardLabel}>Closed Appointments</Text>
          </Card.Content>
        </Card>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default DoctorBookAppointment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    backgroundColor: 'black',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginVertical: 16,
  },
  horizontalImage: {
    width: '100%',
    height: 180,
    borderRadius: 8,
    marginBottom: 16,
    resizeMode: 'cover',
  },
  bookButton: {
    backgroundColor: '#ff6f00', // Vibrant color for the button
    marginVertical: 7,
    paddingVertical: 7,
    borderRadius: 8,
  },
  link: {
    marginBottom: 16,
  },
  card: {
    backgroundColor: '#333', // Darker background for cards
    borderRadius: 12,
    elevation: 4,
    marginHorizontal: 22,
    overflow: 'hidden',
  },
  cardContent: {
    alignItems: 'center',
    padding: 15,
  },
  icon: {
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
});
