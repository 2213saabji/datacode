import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import DoctorAppointmentForm from '../../components/DoctorBookAppointment/doctor-new-edit-form';
import {getDoctorAppointment} from '../../redux/slices/CMS/doctorappointmentbooking';

const AppointmentEdit = ({route, navigation}) => {
  const dispatch = useDispatch();
  const AppointmentId = route?.params?.AppointmentId;
  const [appointment, setAppointment] = useState({});
  // const AppointmentId = route?.params?.AppointmentId;
  const getData = async () => {
    try {
      const result = await dispatch(getDoctorAppointment(AppointmentId));
      console.log(result);
      if (getDoctorAppointment.fulfilled.match(result)) {
        if (result.payload) {
          console.log('result--->', result.payload);
          setAppointment(result.payload);
        } else {
          setAppointment({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch Apointment.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };
  useEffect(() => {
    getData();
  }, [dispatch]);

  return (
    <>
      {/* <Text style={styles.title}> EDIT A APPOINTMENT  </Text> */}
      <DoctorAppointmentForm
        currentappointment={appointment}
        navigation={navigation}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    borderRadius: 14,
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
  input: {
    marginTop: 20,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  textInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 6,
    paddingHorizontal: 8,
  },
  submitButton: {
    marginTop: 20,
  },
});

export default AppointmentEdit;
