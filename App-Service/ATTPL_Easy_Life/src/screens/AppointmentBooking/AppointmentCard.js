import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  ScrollView,
  Button,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const AppointmentBooking = () => {
  const navigation = useNavigation();
  const handlenavigate = () => {
    navigation.navigate('CandidateAppointmentScreen', {
      screen: 'CandidateAppointmentForm',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../assets/AppointmentBooking/BANNER.png')}
        style={styles.charactersImage}
      />
      {/* <Button title="BOOK APPOINTMENTS" onPress={handlenavigate}>BOOK APPOINTMENTS</Button> */}
      <Text style={styles.subtitle}>BOOK APPOINTMENTS</Text>
      <TouchableOpacity style={styles.bookButton} onPress={handlenavigate}>
        <Text style={styles.bookButtonText}>+ Book Appointment</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.appointmentTypes}>
        <AppointmentTypeButton
          icon="access-time"
          title="Pending Appointments"
          navigateTo={{
            screen: 'CandidateAppointmentScreen',
            params: {screen: 'CandidateAppointmentList'},
          }}
        />
        <AppointmentTypeButton
          icon="event-available"
          title="Active Appointments"
          navigateTo={{
            screen: 'CandidateAppointmentScreen',
            params: {screen: 'CandidateAppointmentList'},
          }}
        />
        <AppointmentTypeButton
          icon="check-circle"
          title="Closed Appointments"
          navigateTo={{
            screen: 'CandidateAppointmentScreen',
            params: {screen: 'CandidateAppointmentList'},
          }}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const AppointmentTypeButton = ({icon, title, navigateTo}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate(navigateTo.screen, navigateTo.params);
  };

  return (
    <TouchableOpacity
      style={styles.appointmentTypeButton}
      onPress={handlePress}>
      <Icon name={icon} size={100} style={styles.appointmentTypeIcon} />
      <Text style={styles.appointmentTypeTitle}>{title}</Text>
    </TouchableOpacity>
  );
};
// const AppointmentTypeButton = ({ icon, title }) => (
//   <TouchableOpacity style={styles.appointmentTypeButton}>
//     <Icon name={icon} size={100} style={styles.appointmentTypeIcon} />
//     <Text style={styles.appointmentTypeTitle}>{title}</Text>
//   </TouchableOpacity>
// );

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  charactersImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '400',
    lineHeight: 22,
    marginTop: 20,
    color: '#000000',
    textAlign: 'center',
  },
  bookButton: {
    backgroundColor: '#000000',
    borderRadius: 5,
    margin: 10,
    width: 204,
    height: 32,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bookButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 20,
    lineHeight: 22,
  },
  appointmentTypes: {
    marginTop: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  appointmentTypeButton: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    height: 200,
    width: 220,
    marginVertical: 5,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    marginLeft: 5,
  },
  appointmentTypeIcon: {
    marginRight: 10,
    color: '#000',
  },
  appointmentTypeTitle: {
    fontSize: 14,
    backgroundColor: '#EDEFF1',
    width: 160,
    height: 26,
    borderRadius: 5,
    fontWeight: '500',
    lineHeight: 22,
    textAlign: 'center',
    color: '#000000',
  },
});

export default AppointmentBooking;

// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   Image,
//   SafeAreaView,
//   ScrollView,
//   Button
// } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/MaterialIcons';

// const AppointmentBooking = () => {
//   const navigation = useNavigation();
//   const handlenavigate = () => {
//     navigation.navigate('CandidateAppointmentScreen', { screen: 'CandidateAppointmentForm' });
//   };
//   return (
//     <SafeAreaView style={styles.container}>
//       <Image
//         source={require('../../assets/AppointmentBooking/BANNER.png')}
//         style={styles.charactersImage}
//       />
//        {/* <Button mode="contained" title=" + BOOK APPOINTMENT" style={styles.subtitle} onPress={handlenavigate}>
//         + BOOK APPOINTMENT
//       </Button> */}
//       <Text style={styles.subtitle}>BOOK APPOINTMENTS</Text>
//       <TouchableOpacity style={styles.bookButton} onPress={handlenavigate}>
//         <Text style={styles.bookButtonText}>+ Book Appointment</Text>
//       </TouchableOpacity>
//       <ScrollView contentContainerStyle={styles.appointmentTypes}>
//         <AppointmentTypeButton
//           icon="access-time"
//           title="Pending Appointments"
//         />
//         <AppointmentTypeButton
//           icon="event-available"
//           title="Active Appointments"
//         />
//         <AppointmentTypeButton
//           icon="check-circle"
//           title="Closed Appointments"
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const AppointmentTypeButton = ({icon, title}) => (
//   <TouchableOpacity style={styles.appointmentTypeButton}>
//     <Icon name={icon} size={100} style={styles.appointmentTypeIcon} />
//     <Text style={styles.appointmentTypeTitle}>{title}</Text>
//   </TouchableOpacity>
// );

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//   },
//   charactersImage: {
//     width: '100%',
//     height: 140,
//     marginBottom: 16,
//     borderRadius: 8,
//   },
//   subtitle: {
//     fontSize: 22,
//     fontWeight: '400',
//     lineHeight: 22,
//     marginTop: 20,
//     color: '#000000',
//     textAlign: 'center',
//   },
//   bookButton: {
//     backgroundColor: '#000000',
//     borderRadius: 5,
//     margin: 10,
//     width: 204,
//     height: 32,
//     alignSelf: 'center',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   bookButtonText: {
//     color: '#fff',
//     textAlign: 'center',
//     fontWeight: '500',
//     fontSize: 20,
//     lineHeight: 22,
//   },
//   appointmentTypes: {
//     marginTop: 20,

//     borderRadius: 10,
//     alignItems: 'center',
//     alignContent: 'center',
//   },
//   appointmentTypeButton: {
//     flexDirection: 'column',
//     alignItems: 'center',
//     backgroundColor: '#fff',
//     padding: 15,
//     height: 200,
//     width: 220,
//     marginVertical: 5,

//     borderRadius: 5,

//     shadowColor: '#000',
//     shadowOffset: {width: 0, height: 4},
//     shadowOpacity: 0.5,
//     shadowRadius: 10,
//     elevation: 5,
//     marginLeft: 5,
//     alignItems: 'center',
//   },
//   appointmentTypeIcon: {
//     marginRight: 10,
//     color: '#000',
//   },
//   appointmentTypeTitle: {
//     fontSize: 14,
//     backgroundColor: '#EDEFF1',
//     width: 160,
//     height: 26,
//     borderRadius: 5,
//     fontWeight: '500',
//     lineHeight: 22,
//     textAlign: 'center',
//     color: '#000000',
//   },
// });

// export default AppointmentBooking;
