import React, {useState, useCallback, useMemo} from 'react';
import {View, StyleSheet, Text} from 'react-native';

import DoctorAppointmentForm from '../../components/DoctorBookAppointment/doctor-new-edit-form';

const AppointmentForm = ({route, navigation}) => {
  return (
    <>
      {/* <Text style={styles.title}> CREATE A APPOINTMENT  </Text> */}
      <DoctorAppointmentForm navigation={navigation} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 400,
  },

  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
});

export default AppointmentForm;
