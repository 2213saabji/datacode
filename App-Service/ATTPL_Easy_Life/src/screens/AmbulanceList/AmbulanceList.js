import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {SafeAreaView} from 'react-native-safe-area-context';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import EmptyContent from '../../components/ReusableComp/empty-content';
import {fetchAmbulanceDetails} from '../../redux/slices/TMS/Ambulance-Service/ambulanceapi';
import AmbulanceSingleTrip from '../../components/BookAmbulance/Single-ambulance-trip';
const AmbulanceList = ({navigation}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [ambulanceTripData, setAmbulanceTripData] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);

  const handleSearch = text => {
    setSearchQuery(text);
    // Filter cab list based on search query if needed
  };

  const fetchAppointments = async () => {
    try {
      const result = await dispatch(fetchAmbulanceDetails());

      if (fetchAmbulanceDetails.fulfilled.match(result)) {
        console.log('result', result.payload);
        if (result.payload) {
          // let data=result.payload.
          setAmbulanceTripData(result.payload);

          // setAppointmentData(result.payload.filter((i)=>i.appointmentPassStatus===status))
          // result.payload.filter((i)=>i.appointmentPassStatus===status)))
          // setAppointmentData(result.payload.filter((i)=>i.appointment_pass_status===status))
        } else {
          setAmbulanceTripData([]);
          console.log('error1');
        }
      } else {
        console.log('error2');
        setErrorMsg('Failed to fetch appointments.');
      }
    } catch (err) {
      console.log('error3');
      setErrorMsg(err.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.list}>
          <Text style={styles.listTitle}>AMBULANCE BOOKING LIST</Text>
          {ambulanceTripData?.length === 0 ? (
            <EmptyContent
              filled
              title="NO DATA FOUND"
              style={{padding: '0 10'}}
            />
          ) : (
            <FlatList
              data={ambulanceTripData}
              renderItem={({item, index}) => (
                <AmbulanceSingleTrip item={item} index={index} />
              )}
              keyExtractor={item => item.id}
            />
          )}
        </View>

        {/* Pagination */}
        <View style={styles.paginationContainer}>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}>
            <MaterialIcons name="arrow-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            {currentPage} / {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <MaterialIcons name="arrow-forward" size={24} color="white" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: '#f5f5f5',
  },
  searchBarContainer: {
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    paddingHorizontal: 10,
  },
  searchInput: {
    color: '#fff',
    flex: 1,
    height: 40,
    fontSize: 16,
  },
  searchButton: {
    padding: 10,
  },
  optionsContainer: {
    // color:'#fff',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  optionButton: {
    // backgroundColor:'#fff',
    color: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
  },
  list: {
    flex: 1,
    padding: 20,
  },
  listTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 16,
  },
  paginationButton: {
    padding: 10,
  },
  paginationText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AmbulanceList;
