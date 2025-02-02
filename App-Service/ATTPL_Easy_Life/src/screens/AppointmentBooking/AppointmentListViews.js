// import React from 'react'
// import { Text } from 'react-native-paper'
// import Layout from '../../components/layout/Layout'

// function AppointmentListViews() {
//   return (
//       <Layout >
//     <Text>AppointmentListViews</Text>
//     </Layout>
//   )
// }

// export default AppointmentListViews

import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {getCandidateAppointments} from '../../redux/slices/CMS/candidateAppointment';
import EmptyContent from '../../components/ReusableComp/empty-content';
import CandidateAppointment from '../../components/CandidateBookAppointment/candidate-single-appointment'; // Updated component name
import {Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Layout from '../../components/layout/Layout';
const AppointmentListViews = () => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {colors} = useSelector(selectTheme);
  //  ;

  const [appointmentData, setAppointmentData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const {status} = route.params || {};
  // console.log(status)
  const fetchAppointments = async () => {
    try {
      const result = await dispatch(getCandidateAppointments());
      console.log(result);
      if (getCandidateAppointments.fulfilled.match(result)) {
        if (result.payload) {
          console.log(result.payload);
          // let data=result.payload.
          setAppointmentData(result.payload);

          // setAppointmentData(result.payload.filter((i)=>i.appointmentPassStatus===status))
          // result.payload.filter((i)=>i.appointmentPassStatus===status)))
          // setAppointmentData(result.payload.filter((i)=>i.appointment_pass_status===status))
        } else {
          console.log('error111');
          setAppointmentData([]);
        }
      } else {
        setErrorMsg('Failed to fetch appointments.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, [dispatch]);

  return (
    <>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.list}>
          <Text style={{color: '#fff', fontSize: 18, margin: 'auto'}}>
            CANDIDATE APPOINTMENT LIST
          </Text>
          {appointmentData.length === 0 ? (
            <EmptyContent
              filled
              title="No Appointments"
              style={{padding: '0 10'}}
            />
          ) : (
            <>
              <FlatList
                data={appointmentData}
                renderItem={({item}) => <CandidateAppointment item={item} />}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default AppointmentListViews;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // padding:50
  },
  list: {
    paddingTop: 60,
  },
});
