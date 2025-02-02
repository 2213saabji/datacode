import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../redux/selectors';

import SortBar from '../../components/LabourJobList/SortBar';
import JobItem from '../../components/LabourJobList/JobItem';
import EmptyContent from '../../components/ReusableComp/empty-content';
import FilterModal from '../../components/LabourJobList/FilterModal';
import DialogWithRadioBtns from '../../components/LabourJobList/dialog';
import {
  fetchLabourJobs,
  deleteLabourJob,
} from '../../redux/slices/CRM/LabourJobPortalSlice';
import GetLocation from 'react-native-get-location';
import { PERMISSIONS, request } from 'react-native-permissions';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';
import LoadingListView from '../../components/ReusableComp/LoadingListView';

const defaultFilter = {
  employmentTypes: '',
  jobTypes: [],
  locations: [],
};

const deg2rad = deg => deg * (Math.PI / 180);

// Calculate distance
const getDistanceFromLatLonInKm = (lat1, lon1, lat2, lon2) => {
  const earthRadius = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
    Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) *
    Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = earthRadius * c; // Distance in km
  return parseFloat(distance.toFixed(0));
};

const LabourJobList = ({ navigation }) => {
  const dispatch = useDispatch();
  const [selfCoordinates, setSelfCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const { colors, fonts } = useSelector(selectTheme);
  const { showAlert } = useCustomAlert();
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);
  const [jobData1, setJobData1] = useState([]);
  const [filteredJobData, setFilteredJobData] = useState([]);
  const [filters, setFilters] = useState(defaultFilter);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchJobs = async newPosition => {
    try {
      const result = await dispatch(fetchLabourJobs());
      if (fetchLabourJobs.fulfilled.match(result)) {
        if (result.payload) {
          if (Array.isArray(result.payload)) {
            const updatedData = result.payload.map(job => {
              const jobCoords = { lat: job?.latitude, lng: job?.longitude };
              const distance = getDistanceFromLatLonInKm(
                jobCoords.lat,
                jobCoords.lng,
                newPosition.lat,
                newPosition.lng,
              );
              return { ...job, distance };
            });
            setLoading(false);
            setJobData1(updatedData);
            setFilteredJobData(updatedData); 
          }
        } else {
          setLoading(false);
          setJobData1([]);
          setFilteredJobData([]);
        }
      } else {
        console.log(result.payload || 'Failed to fetch labour jobs list.');
      }
    } catch (err) {
      console.log(err.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    setLoading(true);
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message:
                'We need access to your location to show your position on the map.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
          if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
            setErrorMsg('Location permission denied');
            return;
          }
        } catch (err) {
          setErrorMsg(err.message);
          return;
        }
      } else {
        const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE);
        if (response !== 'granted') {
          setErrorMsg('Location permission denied');
          return;
        }
      }

      // Get current location
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(location => {
          const newPosition = {
            lat: location.latitude,
            lng: location.longitude,
          };
          setSelfCoordinates(newPosition);
          fetchJobs(newPosition);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        });
    };

    requestLocationPermission();
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        if (query) {
          const results = jobData1.filter(job =>
            job?.jobTitle?.toLowerCase().includes(query.toLowerCase()),
          );
          setFilteredJobData(results);
        } else {
          setFilteredJobData(jobData1);
        }
      }, 300),
    [jobData1],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const dataFiltered = applyFilter({
    inputData: filteredJobData,
    filters,
    sortOrder,
  });

  const canReset = !isEqual(defaultFilter, filters);
  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters(prevState => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilter);
  }, []);

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'latest' ? 'oldest' : 'latest'));
  };

  const deleteJob = useCallback(
    async jobPostId => {
      try {
        const result = await dispatch(deleteLabourJob(jobPostId));
        if (deleteLabourJob.fulfilled.match(result)) {
          if (result.payload) {
            showAlert('Job Deleted Successfully', 'success');
            const updatedTableData = jobData1.filter(
              row => row.jobPostId !== jobPostId,
            );
            setJobData1(updatedTableData);
          } else {
            showAlert('Failed to delete Job', 'error');
          }
        } else {
          console.log(result.payload || 'Failed to fetch labour job.');
        }
      } catch (error) {
        console.log(error.message || 'An unexpected error occurred');
      }
    },
    [dispatch, showAlert, deleteLabourJob],
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: colors.background }]}>
      <SortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={debouncedSearch}
        sortOrder={sortOrder}
        selfCoordinates={selfCoordinates}
        handleSortChange={handleSortChange}
        setModalVisible={setModalVisible}
        setVisible={setVisible}
        navigation={navigation}
      />
      {dataFiltered.length === 0 || notFound ? (
        loading ? (
          <FlatList
            data={Array.from({ length: 5 })} // Create an array with n undefined items
            renderItem={() => <LoadingListView />}
            keyExtractor={(_, index) => index.toString()} // Use index as key
          />
        ) : (
          <EmptyContent filled title="No Data" style={{ padding: '0 10' }} />
        )

      ) : (
        <FlatList
          data={dataFiltered}
          renderItem={({ item }) => (
            <JobItem
              item={item}
              selfCoordinates={selfCoordinates}
              onDelete={() => deleteJob(item.jobPostId)}
              fetchJobs={fetchJobs}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
      <FilterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        canReset={canReset}
        selfCoordinates={selfCoordinates}
        onResetFilters={handleResetFilters}
        filters={filters}
        onFilters={handleFilters}
      />
      <DialogWithRadioBtns
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        visible={visible}
        close={setVisible}
      />
    </SafeAreaView>
  );
};

export default LabourJobList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const applyFilter = ({ inputData, filters, sortOrder }) => {
  const { employmentTypes, locations, jobTypes } = filters;

  if (sortOrder === 'latest') {
    inputData = orderBy(inputData, ['created_at'], ['desc']);
  }

  if (sortOrder === 'oldest') {
    inputData = orderBy(inputData, ['created_at'], ['asc']);
  }

  if (employmentTypes) {
    inputData = inputData.filter(job => employmentTypes === job.employmentType);
  }

  if (locations.length) {
    inputData = inputData.filter(job =>
      locations.some(value => job.distance <= value),
    );
  }

  if (jobTypes.length) {
    inputData = inputData.filter(job => jobTypes.includes(job.jobType));
  }

  return inputData;
};
