import React, {useState, useEffect, useCallback} from 'react';
import {SafeAreaView, FlatList, View, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {getDoctorAppointments} from '../../redux/slices/CMS/doctorappointmentbooking';
import EmptyContent from '../../components/ReusableComp/empty-content';
import DoctorAppointment from '../../components/DoctorBookAppointment/singleappointment'; // Updated component name
import {Text} from 'react-native-paper';
import {useRoute} from '@react-navigation/native';
import Layout from '../../components/layout/Layout';
const DoctorAppointmentList = ({navigation}) => {
  const dispatch = useDispatch();
  const route = useRoute();

  const {colors} = useSelector(selectTheme);
  //  ;

  const [appointmentData, setAppointmentData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const {status} = route.params || {};

  const fetchAppointments = async () => {
    try {
      const result = await dispatch(getDoctorAppointments());

      if (getDoctorAppointments.fulfilled.match(result)) {
        if (result.payload) {
          // let data=result.payload.
          setAppointmentData(result.payload);

          // setAppointmentData(result.payload.filter((i)=>i.appointmentPassStatus===status))
          // result.payload.filter((i)=>i.appointmentPassStatus===status)))
          // setAppointmentData(result.payload.filter((i)=>i.appointment_pass_status===status))
        } else {
          console.log('error1');
          setAppointmentData([]);
        }
      } else {
        console.log('error2');
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
            DOCTOR APPOINTMENT LIST
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
                renderItem={({item}) => (
                  <DoctorAppointment item={item} navigation={navigation} />
                )}
                keyExtractor={item => item.id}
              />
            </>
          )}
        </View>
      </SafeAreaView>
    </>
  );
};

export default DoctorAppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    // padding:50
  },
  list: {
    paddingTop: 60,
  },
});

// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import {
//   SafeAreaView,
//   FlatList,
//   StyleSheet,
//   Dimensions,
//   Platform,
//   PermissionsAndroid,
// } from 'react-native';
// import { useSelector, useDispatch } from 'react-redux';
// import { selectTheme } from '../../redux/selectors';
// import { useNavigationEffect } from '../../hooks/useNavigationEffect';
// import {useNavigation} from '@react-navigation/native';
// import SortBar from '../../components/LabourJobList/SortBar';
// import JobItem from '../../components/LabourJobList/JobItem';
// import EmptyContent from '../../components/ReusableComp/empty-content';
// import FilterModal from '../../components/LabourJobList/FilterModal';
// import DialogWithRadioBtns from '../../components/LabourJobList/dialog';
// import { getDoctorAppointments } from '../../redux/slices/CMS/doctorappointmentbooking';
// import GetLocation from 'react-native-get-location';
// import { PERMISSIONS, request } from 'react-native-permissions';
// import orderBy from 'lodash/orderBy';
// import isEqual from 'lodash/isEqual';
// import debounce from 'lodash/debounce';

// const defaultFilter = {
//   employmentTypes: '',
//   jobTypes: [],
//   locations: [],
// };

// const deg2rad = (deg) => deg * (Math.PI / 180);

// // Calculate distance
// const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
//   const earthRadius = 6371; // Radius of the earth in km
//   const dLat = deg2rad(lat2 - lat1);
//   const dLon = deg2rad(lon2 - lon1);
//   const a =
//     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
//     Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
//     Math.sin(dLon / 2) * Math.sin(dLon / 2);
//   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
//   const distance = earthRadius * c; // Distance in km
//   return parseFloat(distance.toFixed(0));
// };

// const DoctorAppointmentList = () => {
//   const dispatch = useDispatch();
//   // const navigation = useNavigation();
//   const [selfCoordinates, setSelfCoordinates] = useState({
//     lat: null,
//     lng: null,
//   });
//   const { colors, fonts } = useSelector(selectTheme);
//    ;
//   const [appointmentData,setAppointmentData]=useState()
//   const [searchQuery, setSearchQuery] = useState('');
//   const [sortOrder, setSortOrder] = useState('latest');
//   const [modalVisible, setModalVisible] = useState(false);
//   const [visible, setVisible] = useState(false);
//   const [jobData1, setJobData1] = useState([]);
//   const [filteredJobData, setFilteredJobData] = useState([]);
//   const [filters, setFilters] = useState(defaultFilter);
//   const [errorMsg, setErrorMsg] = useState('');
//   const fetchAppointments = async (newPosition) => {
//     try {
//       const result = await dispatch(getDoctorAppointments());

//       if (getDoctorAppointments.fulfilled.match(result)) {
//         if (result.payload) {
//           // If there's appointment data, set it in state
//           setAppointmentData(result.payload);
//         } else {
//           // If no appointment data, clear the state
//           setAppointmentData([]);
//         }
//       } else {
//         // Handle unexpected cases or errors
//         console.log(result.payload || 'Failed to fetch appointments.');
//       }
//     } catch (err) {
//       console.log(err.message || 'An unexpected error occurred.');
//     }
//   };

//   // const fetchJobs = async (newPosition) => {
//   //   try {
//   //     const result = await dispatch(getDoctorAppointments());
//   //     if (getDoctorAppointments.fulfilled.match(result)) {
//   //       if (result.payload) {
//   //         if (Array.isArray(result.payload)) {
//   //           const updatedData = result.payload.map(job => {
//   //             const jobCoords = { lat: job?.latitude, lng: job?.longitude };
//   //             const distance = getDistanceFromLatLonInKm(jobCoords.lat, jobCoords.lng, newPosition.lat, newPosition.lng);
//   //             return { ...job, distance };
//   //           });
//   //           setJobData1(updatedData);
//   //           setFilteredJobData(updatedData); // Set the filtered job data initially
//   //         }
//   //       } else {
//   //         setJobData1([]);
//   //         setFilteredJobData([]);
//   //       }
//   //     } else {
//   //       console.log(result.payload || 'Failed to fetch labour jobs list.');
//   //     }
//   //   } catch (err) {
//   //     console.log(err.message || 'An unexpected error occurred');
//   //   }
//   // };

//   useEffect(() => {
//     const requestLocationPermission = async () => {
//       if (Platform.OS === 'android') {
//         try {
//           const granted = await PermissionsAndroid.request(
//             PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//             {
//               title: 'Location Permission',
//               message: 'We need access to your location to show your position on the map.',
//               buttonNeutral: 'Ask Me Later',
//               buttonNegative: 'Cancel',
//               buttonPositive: 'OK',
//             },
//           );
//           if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
//             setErrorMsg('Location permission denied');
//             return;
//           }
//         } catch (err) {
//           setErrorMsg(err.message);
//           return;
//         }
//       } else {
//         const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
//         if (response !== 'granted') {
//           setErrorMsg('Location permission denied');
//           return;
//         }
//       }

//       // Get current location
//       GetLocation.getCurrentPosition({
//         enableHighAccuracy: true,
//         timeout: 60000,
//       })
//         .then(location => {
//           const newPosition = {
//             lat: location.latitude,
//             lng: location.longitude,
//           };
//           setSelfCoordinates(newPosition);
//           fetchJobs(newPosition);
//         })
//         .catch(error => {
//           const { code, message } = error;
//           console.warn(code, message);
//         });
//     };

//     requestLocationPermission();
//   }, []);

//   const debouncedSearch = useMemo(() => debounce((query) => {
//     if (query) {
//       const results = jobData1.filter(
//         (job) => job?.jobTitle?.toLowerCase().includes(query.toLowerCase())
//       );
//       setFilteredJobData(results);
//     } else {
//       setFilteredJobData(jobData1);
//     }
//   }, 300), [jobData1]);

//   useEffect(() => {
//     debouncedSearch(searchQuery);
//   }, [searchQuery, debouncedSearch]);

//   const dataFiltered = applyFilter({
//     inputData: filteredJobData,
//     filters,
//     sortOrder,
//   });

//   const canReset = !isEqual(defaultFilter, filters);
//   const notFound = !dataFiltered.length && canReset;

//   const handleFilters = useCallback((name, value) => {
//     setFilters(prevState => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }, []);

//   const handleResetFilters = useCallback(() => {
//     setFilters(defaultFilter);
//   }, []);

//   const handleSortChange = () => {
//     setSortOrder(prevOrder => (prevOrder === 'latest' ? 'oldest' : 'latest'));
//   };

//   return (
//     <SafeAreaView
//       style={[styles.container, { backgroundColor: colors.background }]}>
//       <SortBar
//         searchQuery={searchQuery}
//         setSearchQuery={setSearchQuery}
//         onSearch={debouncedSearch}
//         sortOrder={sortOrder}
//         selfCoordinates={selfCoordinates}
//         handleSortChange={handleSortChange}
//         setModalVisible={setModalVisible}
//         setVisible={setVisible}
//       />
//       {(dataFiltered.length === 0 || notFound) ? (
//         <EmptyContent filled title="No Data" style={{ padding: '0 10' }} />
//       ) : (
//         <FlatList
//           data={dataFiltered}
//           renderItem={({ item }) => <JobItem item={item} selfCoordinates={selfCoordinates} />}
//           keyExtractor={item => item.id}
//         />
//       )}
//       <FilterModal
//         modalVisible={modalVisible}
//         setModalVisible={setModalVisible}
//         canReset={canReset}
//         selfCoordinates={selfCoordinates}
//         onResetFilters={handleResetFilters}
//         filters={filters}
//         onFilters={handleFilters}
//       />
//       <DialogWithRadioBtns
//         sortOrder={sortOrder}
//         setSortOrder={setSortOrder}
//         visible={visible}
//         close={setVisible}
//       />
//     </SafeAreaView>
//   );
// };

// export default DoctorAppointmentList ;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//   },
// });

// const applyFilter = ({ inputData, filters, sortOrder }) => {
//   const { employmentTypes, locations, jobTypes } = filters;

//   if (sortOrder === 'latest') {
//     inputData = orderBy(inputData, ['created_at'], ['desc']);
//   }

//   if (sortOrder === 'oldest') {
//     inputData = orderBy(inputData, ['created_at'], ['asc']);
//   }

//   if (employmentTypes) {
//     inputData = inputData.filter(job => employmentTypes === job.employmentType);
//   }

//   if (locations.length) {
//     inputData = inputData.filter(job => locations.some(value => job.distance <= value));
//   }

//   if (jobTypes.length) {
//     inputData = inputData.filter(job => jobTypes.includes(job.jobType));
//   }

//   return inputData;
// };
