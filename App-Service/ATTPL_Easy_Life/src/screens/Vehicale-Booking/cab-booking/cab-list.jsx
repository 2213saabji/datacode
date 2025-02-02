import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Modal,
  Button,
  TextInput,
  ScrollView,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';
import {fetchCabDetails} from '../../../redux/slices/TMS/CAB-SERVICE/cab-Booking';
import {Text, Card, Divider} from 'react-native-paper';
import CabServiesingle from '../../../components/Cab-Service/cab-service-single';
import Layout from '../../../components/layout/Layout';
import {SafeAreaView} from 'react-native-safe-area-context';
import EmptyContent from '../../../components/ReusableComp/empty-content';
import SortBar from '../../../components/LabourJobList/SortBar';

const Cablist = ({navigation}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cabs, setCabs] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();

  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const handleMenuPress = () => {
    setModalVisible(true);
  };

  const handleView = () => {
    navigation.navigate('CabDetails');
    setModalVisible(false);
  };

  const handleEdit = () => {
    navigation.navigate('CabFormEdit');
    setModalVisible(false);
  };

  const FetchCabDetails = async () => {
    try {
      const result = await dispatch(fetchCabDetails());
      if (fetchCabDetails.fulfilled.match(result)) {
        if (result.payload) {
          setCabs(result.payload); // Adjust based on API response
          setTotalPages(result.payload.totalPages); // Adjust based on API response
        } else {
          setCabs([]);
        }
      } else {
        setErrorMsg('Failed to fetch appointments.');
      }
    } catch (err) {
      setErrorMsg(err.message || 'An unexpected error occurred.');
    }
  };

  useEffect(() => {
    FetchCabDetails();
    console.log(cabs);
  }, [dispatch]);

  // Handle search input change
  const handleSearch = text => {
    setSearchQuery(text);
    // Filter cab list based on search query if needed
  };

  // Handle pagination
  const handlePageChange = page => {
    setCurrentPage(page);
    // Fetch new page data
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ScrollView style={styles.mainContent}>
        {/* Search Bar */}
        <View style={styles.searchBarContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search..."
            value={searchQuery}
            onChangeText={handleSearch}
          />
          <TouchableOpacity style={styles.searchButton}>
            <MaterialIcons name="search" size={24} color="white" />
          </TouchableOpacity>
        </View>

        {/* Filter, Column, Export Options */}
        {/* <View style={styles.optionsContainer}>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="filter-list" size={24} color="white"/>
            <Text style={styles.optionText}>Filter</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="view-column" size={24} color="white" />
            <Text style={styles.optionText}>Column</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionButton}>
            <MaterialIcons name="export" size={24} color="white" />
            <Text style={styles.optionText}>Export</Text>
          </TouchableOpacity>
        </View> */}

        {/* List of Cabs */}
        <View style={styles.list}>
          <Text style={styles.listTitle}>CAB BOOKING LIST</Text>
          {cabs?.length === 0 ? (
            <EmptyContent
              filled
              title="NO DATA FOUND"
              style={{padding: '0 10'}}
            />
          ) : (
            <FlatList
              data={cabs}
              renderItem={({item, index}) => (
                <CabServiesingle
                  item={item}
                  index={index}
                  navigation={navigation}
                />
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
            <MaterialIcons name="arrow-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.paginationText}>
            {currentPage} / {totalPages}
          </Text>
          <TouchableOpacity
            style={styles.paginationButton}
            onPress={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}>
            <MaterialIcons name="arrow-forward" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
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
    fontSize: 16,
  },
});

export default Cablist;
