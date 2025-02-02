import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  SafeAreaView,
  FlatList,
  StyleSheet,
  Dimensions,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';
import {useNavigationEffect} from '../../../hooks/useNavigationEffect';
import SortBar from './SortBar';
import AppointmentItem from './AppointmentItem';
import EmptyContent from '../../ReusableComp/empty-content';
import DialogWithRadioBtns from './dialog';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import {useCustomAlert} from '../../../utilities/Alert/useCustomAlert';

import {
  fetchAppointmentStudentView,
  deleteInstitutionAppointment,
} from '../../../redux/slices/CRM/StudentCareerRoad/IntitutionAppointmentSlice';

const InstitutionMyAppointmentList = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const {showAlert} = useCustomAlert();
  const [visibleSort, setVisibleSort] = useState(false);
  const [visibleFilter, setVisibleFilter] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('latest');
  const [filterType, setFilterType] = useState('all');
  const [appointmentData, setAppointmentData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const sortOrderOptions = [
    {value: 'latest', label: 'Latest'},
    {value: 'oldest', label: 'Oldest'},
  ];

  const filterTypeOptions = [
    {value: 'all', label: 'All'},
    {value: 'office', label: 'Office'},
    {value: 'remote', label: 'Remote'},
  ];

  const fetchAppointment = async () => {
    try {
      const result = await dispatch(fetchAppointmentStudentView());
      if (fetchAppointmentStudentView.fulfilled.match(result)) {
        if (result.payload) {
          setAppointmentData(result.payload);
          setFilteredData(result.payload); // Set the filtered  data initially
        }
      } else {
        console.log(result.payload || 'Failed to fetch list.');
      }
    } catch (err) {
      console.log(err.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    fetchAppointment();
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        if (query) {
          const results = appointmentData.filter(appointment =>
            appointment?.appointmentType
              ?.toLowerCase()
              .includes(query.toLowerCase()),
          );
          setFilteredData(results);
        } else {
          setFilteredData(appointmentData);
        }
      }, 300),
    [appointmentData],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const dataFiltered = applyFilter({
    inputData: filteredData,
    sortOrder,
    filterType,
  });

  const notFound = !dataFiltered.length;

  const deleteJob = useCallback(
    async appointmentId => {
      try {
        const result = await dispatch(
          deleteInstitutionAppointment(appointmentId),
        );
        if (deleteInstitutionAppointment.fulfilled.match(result)) {
          if (result.payload) {
            showAlert('Appointment Deleted Successfully', 'success');
            const updatedTableData = appointmentData.filter(
              row => row.agricultureAppointmentId !== appointmentId,
            );
            setAppointmentData(updatedTableData);
            setFilteredData(updatedTableData);
          } else {
            showAlert('Failed to delete Appointment', 'error');
          }
        } else {
          console.log(result.payload || 'Delete Farmer not fulfilled.');
        }
      } catch (error) {
        console.log(error.message || 'An unexpected error occurred');
      }
    },
    [dispatch, showAlert, deleteInstitutionAppointment],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <SortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={debouncedSearch}
        sortOrder={sortOrder}
        filterType={filterType}
        setVisibleFilter={setVisibleFilter}
        setVisibleSort={setVisibleSort}
      />
      {dataFiltered.length === 0 || notFound ? (
        <EmptyContent filled title="No Data" style={{padding: '0 10'}} />
      ) : (
        <FlatList
          data={dataFiltered}
          renderItem={({item}) => (
            <AppointmentItem
              item={item}
              onDelete={() => deleteJob(item.agricultureAppointmentId)}
              navigation={navigation}
            />
          )}
          keyExtractor={item => item.id}
        />
      )}
      <DialogWithRadioBtns
        visible={visibleSort}
        close={setVisibleSort}
        options={sortOrderOptions}
        selectedOption={sortOrder}
        onSelect={setSortOrder}
        title="Sort by"
      />

      <DialogWithRadioBtns
        visible={visibleFilter}
        close={setVisibleFilter}
        options={filterTypeOptions}
        selectedOption={filterType}
        onSelect={setFilterType}
        title="Filter by type"
      />
    </SafeAreaView>
  );
};

export default InstitutionMyAppointmentList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const applyFilter = ({inputData, sortOrder, filterType}) => {
  if (sortOrder === 'latest') {
    inputData = orderBy(inputData, ['appointmentDate'], ['desc']);
  }

  if (sortOrder === 'oldest') {
    inputData = orderBy(inputData, ['appointmentDate'], ['asc']);
  }

  if (filterType === 'office') {
    inputData = inputData.filter(data => data.appointmentType === 'office');
  }

  if (filterType === 'remote') {
    inputData = inputData.filter(data => data.appointmentType === 'remote');
  }
  if (filterType === 'all') {
    return inputData;
  }

  return inputData;
};
