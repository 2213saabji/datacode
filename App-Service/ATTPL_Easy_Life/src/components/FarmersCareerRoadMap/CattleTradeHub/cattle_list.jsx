import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';
import {useNavigationEffect} from '../../../hooks/useNavigationEffect';
import ModernSortBar from '../ToolSortBar';
import CattleItem from './CattleItem';
import EmptyContent from '../../ReusableComp/empty-content';
import DialogWithRadioBtns from '../dialog';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import {useCustomAlert} from '../../../utilities/Alert/useCustomAlert';

import {
  fetchCattlesTypeList,
  deleteCattleTrade,
} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/CattleTrade';

const CattleList = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const {showAlert} = useCustomAlert();
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOrder, setSortOrder] = useState('high');
  const [toolData, setToolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const fetchCattles = async () => {
    try {
      const result = await dispatch(fetchCattlesTypeList());
      if (fetchCattlesTypeList.fulfilled.match(result)) {
        if (result.payload) {
          setToolData(result.payload);
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
    fetchCattles();
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

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'latest' ? 'oldest' : 'latest'));
  };

  const deleteJob = useCallback(
    async cattleId => {
      try {
        const result = await dispatch(deleteCattleTrade(cattleId));
        if (deleteCattleTrade.fulfilled.match(result)) {
          if (result.payload) {
            showAlert('Appointment Deleted Successfully', 'success');
            const updatedTableData = toolData.filter(
              row => row.cattleId !== cattleId,
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
    [dispatch, showAlert, deleteCattleTrade],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <ModernSortBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSearch={debouncedSearch}
        sortOrder={sortOrder}
        handleSortChange={handleSortChange}
        setVisible={setVisible}
        buttonName="Cattle"
        screenName="TractorToolCreate"
        navigation={navigation}
      />
      {dataFiltered.length === 0 || notFound ? (
        <EmptyContent filled title="No Data" style={{padding: '0 10'}} />
      ) : (
        <FlatList
          data={dataFiltered}
          renderItem={({item}) => (
            <CattleItem
              item={item}
              onDelete={() => deleteJob(item.tractorId)}
              navigation={navigation}
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
  );
};

export default CattleList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});

const applyFilter = ({inputData, sortOrder}) => {
  if (sortOrder === 'high') {
    inputData = orderBy(inputData, [item => Number(item.price)], ['desc']);
  }

  if (sortOrder === 'low') {
    inputData = orderBy(inputData, [item => Number(item.price)], ['asc']);
  }

  return inputData;
};
