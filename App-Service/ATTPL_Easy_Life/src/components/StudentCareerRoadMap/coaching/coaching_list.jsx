import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/selectors';
import { useNavigationEffect } from '../../../hooks/useNavigationEffect';
import InstitutionSortBar from '../InstitutionSortBar';
import CoachingItem from './CoachingItem';
import EmptyContent from '../../ReusableComp/empty-content';

import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import Layout from '../../layout/Layout';
import { useCustomAlert } from '../../../utilities/Alert/useCustomAlert';

import {
  fetchCoachingList,
  deleteCoaching,
} from '../../../redux/slices/CRM/StudentCareerRoad/IsntitutionList/CoachingSlice';
import LoadingListView from '../../ReusableComp/LoadingListView';

const CoachingList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, fonts } = useSelector(selectTheme);
  const { showAlert } = useCustomAlert();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('high');
  const [listData, setListData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTools = async () => {
    try {
      const result = await dispatch(fetchCoachingList());
      if (fetchCoachingList.fulfilled.match(result)) {
        if (result.payload) {
          setLoading(false);
          setListData(result.payload);
          setFilteredData(result.payload); // Set the filtered  data initially
        }
      } else {
        setLoading(false);
        console.log(result.payload || 'Failed to fetch list.');
      }
    } catch (err) {
      console.log(err.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    setLoading(true);
    fetchTools();
  }, []);

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        if (query) {
          const results = listData.filter(tool =>
            tool?.competitiveExams?.[0]
              .toLowerCase()
              .includes(query.toLowerCase()),
          );
          setFilteredData(results);
        } else {
          setFilteredData(listData);
        }
      }, 300),
    [listData],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const dataFiltered = applyFilter({
    inputData: filteredData,
    sortOrder,
  });

  const notFound = !dataFiltered.length;

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'high' ? 'low' : 'high'));
  };

  const deleteJob = useCallback(
    async appointmentId => {
      try {
        const result = await dispatch(deleteCoaching(appointmentId));
        if (deleteCoaching.fulfilled.match(result)) {
          if (result.payload) {
            showAlert('Coaching Center Deleted Successfully', 'success');
            const updatedTableData = listData.filter(
              row => row.agricultureAppointmentId !== appointmentId,
            );
            setListData(updatedTableData);
            setFilteredData(updatedTableData);
          } else {
            showAlert('Failed to delete Coaching Center', 'error');
          }
        } else {
          console.log(
            result.payload || 'Delete Coaching Center not fulfilled.',
          );
        }
      } catch (error) {
        console.log(error.message || 'An unexpected error occurred');
      }
    },
    [dispatch, showAlert, deleteCoaching],
  );

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}>
        <InstitutionSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={debouncedSearch}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          setVisible={setVisible}
          buttonName="Coaching Center"
          screenName="CombineHarvesterToolCreate"
        />
        {dataFiltered.length === 0 || notFound ? (
          loading ? (
            <FlatList
              data={Array.from({ length: 5 })} // Create an array with n undefined items
              renderItem={() => <LoadingListView hasButton={true} />}
              keyExtractor={(_, index) => index.toString()} // Use index as key
            />
          ) : (
            <EmptyContent filled title="No Data" style={{ padding: '0 10' }} />
          )

        ) : (
          <FlatList
            data={dataFiltered}
            renderItem={({ item }) => (
              <CoachingItem
                item={item}
                onDelete={() => deleteJob(item.combineHarvesterId)}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
      </SafeAreaView>
    </>
  );
};

export default CoachingList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const applyFilter = ({ inputData, sortOrder }) => {
  if (sortOrder === 'high') {
    inputData = orderBy(inputData, [item => Number(item.price)], ['desc']);
  }

  if (sortOrder === 'low') {
    inputData = orderBy(inputData, [item => Number(item.price)], ['asc']);
  }

  return inputData;
};
