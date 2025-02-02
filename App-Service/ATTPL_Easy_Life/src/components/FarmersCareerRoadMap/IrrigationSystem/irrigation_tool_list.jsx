import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { selectTheme } from '../../../redux/selectors';
import { useNavigationEffect } from '../../../hooks/useNavigationEffect';
import ModernSortBar from '../ToolSortBar';
import IrrigationToolItem from './IrrigationToolItem';
import EmptyContent from '../../ReusableComp/empty-content';
import DialogWithRadioBtns from '../dialog';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import Layout from '../../layout/Layout';
import { useCustomAlert } from '../../../utilities/Alert/useCustomAlert';

import {
  fetchIrrigationTools,
  deleteIrrigationTool,
} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/IrrigationToolSlice';
import LoadingListView from '../../ReusableComp/LoadingListView';

const IrrigationToolList = ({ navigation }) => {
  const dispatch = useDispatch();
  const { colors, fonts } = useSelector(selectTheme);
  const { showAlert } = useCustomAlert();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('high');
  const [toolData, setToolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTools = async () => {
    try {
      const result = await dispatch(fetchIrrigationTools());
      if (fetchIrrigationTools.fulfilled.match(result)) {
        if (result.payload) {
          setLoading(false);
          setToolData(result.payload);
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
          const results = toolData.filter(tool =>
            tool?.type?.toLowerCase().includes(query.toLowerCase()),
          );
          setFilteredData(results);
        } else {
          setFilteredData(toolData);
        }
      }, 300),
    [toolData],
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const dataFiltered = applyFilter({
    inputData: filteredData,
    sortOrder,
  });

  const notFound = !dataFiltered.length;

  const deleteJob = useCallback(
    async appointmentId => {
      try {
        const result = await dispatch(deleteIrrigationTool(appointmentId));
        if (deleteIrrigationTool.fulfilled.match(result)) {
          if (result.payload) {
            showAlert('Appointment Deleted Successfully', 'success');
            const updatedTableData = toolData.filter(
              row => row.agricultureAppointmentId !== appointmentId,
            );
            setToolData(updatedTableData);
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
    [dispatch, showAlert, deleteIrrigationTool],
  );

  return (
    <>
      <SafeAreaView
        style={[styles.container, { backgroundColor: colors.background }]}>
        <ModernSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={debouncedSearch}
          sortOrder={sortOrder}
          setVisible={setVisible}
          buttonName="Irrigation Tool"
          screenName="IrrigationToolCreate"
          navigation={navigation}
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
              <IrrigationToolItem
                item={item}
                onDelete={() => deleteJob(item.modernAgriToolId)}
              />
            )}
            keyExtractor={item => item.id}
          />
        )}
        <DialogWithRadioBtns
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          visible={visible}
          close={setVisible}
        />
      </SafeAreaView>
    </>
  );
};

export default IrrigationToolList;

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
