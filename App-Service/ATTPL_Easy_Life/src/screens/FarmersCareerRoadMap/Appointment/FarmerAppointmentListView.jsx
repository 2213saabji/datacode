import React from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  ScrollView,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';
import Layout from '../../../components/layout/Layout';

import FarmerMyAppointmentList from '../../../components/FarmersCareerRoadMap/AppointmentBooking/farmer-myAppointment';
// ----------------------------------------------------------------------

export default function FarmerAppointmentListView({navigation}) {
  const {colors, fonts} = useSelector(selectTheme);
  const {height: screenHeight} = Dimensions.get('window');

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            {minHeight: screenHeight},
          ]}>
          <View
            style={[styles.container, {backgroundColor: colors.background}]}>
            <FarmerMyAppointmentList navigation={navigation} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Change the background color as needed
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16, // Adjust the padding as needed
  },
});
