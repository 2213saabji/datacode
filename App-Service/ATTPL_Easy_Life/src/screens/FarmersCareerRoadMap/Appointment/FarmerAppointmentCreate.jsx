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
import FarmerAppointmentNewForm from '../../../components/FarmersCareerRoadMap/AppointmentBooking/farmer-appointment-new-form';
// ----------------------------------------------------------------------

export default function FarmerAppointmentForm({route, navigation}) {
  const {colors} = useSelector(selectTheme);
  const sellerOwnerId = route?.params?.sellerOwnerId;

  const {height: screenHeight} = Dimensions.get('window');

  return (
    <>
      <SafeAreaView
        style={[styles.safeArea, {backgroundColor: colors.background}]}>
        <ScrollView
          contentContainerStyle={[
            styles.scrollViewContent,
            {minHeight: screenHeight},
          ]}>
          <View style={styles.container}>
            <FarmerAppointmentNewForm
              sellerOwnerId={sellerOwnerId}
              navigation={navigation}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    padding: 16,
  },
});
