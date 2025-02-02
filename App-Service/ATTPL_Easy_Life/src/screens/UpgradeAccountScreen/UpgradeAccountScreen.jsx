import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import UserProfilePercentage from '../../components/userProfileCompletion';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
// import { useDispatch, useSelector } from 'react-redux';
import {DataTable} from 'react-native-paper';
import {
  FetchProductRolesList,
  FetchServiceHistory,
  UserRoleGetter,
} from '../../redux/slices/UMS/authSlice';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import {JOB_TITLES} from '../../data/appScreens';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

const UpgradeAccountScreen = () => {
  const navigation = useNavigation();
  const {showAlert} = useCustomAlert();
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [phase, setPhase] = useState(1);
  const [currentJobTitle, setCurrentJobTitle] = useState('');
  const [uniqueProducts, setUniqueProducts] = useState([]);
  const [userRoleId, setUserRoleId] = useState([]);
  const [productId, setProductId] = useState();
  const [roleId, setRoleId] = useState();

  const navigateToScreen = screenName => {
    navigation.navigate(screenName);
  };

  const [page, setPage] = useState(0);
  const [numberOfItemsPerPageList] = useState([2, 3, 4]);
  const [itemsPerPage, onItemsPerPageChange] = useState(
    numberOfItemsPerPageList[0],
  );

  const [items, setItems] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, items.length);

  useEffect(() => {
    setPage(0);
  }, [itemsPerPage]);

  const [ServiceHistoryListData, setServiceHistoryListData] = useState();
  async function fetchUpgradeHistory() {
    try {
      const response = await dispatch(
        FetchServiceHistory({userId: user.userId}),
      );
      if (FetchServiceHistory.fulfilled.match(response)) {
      }
    } catch (error) {
      Alert.alert('Error', 'An Unexpected error occurred');
    }
  }

  async function useGetProductRolesList() {
    try {
      const response = await dispatch(FetchProductRolesList({}));
      if (FetchProductRolesList.fulfilled.match(response)) {
        const uniqueProduct = response?.payload?.data?.map(item => ({
          label: `${item?.productName} (${item?.productDescription})`,
          value: item?.productId,
        }));
        setUniqueProducts(uniqueProduct);
      }
    } catch (error) {
      Alert.alert('Error', 'An Unexpected error occurred');
    }
  }
  useEffect(() => {
    useGetProductRolesList();
  }, []);

  const roleGetter = async ProdId => {
    try {
      if (productId != 0) {
        const response = await dispatch(UserRoleGetter({ProdId}));
        if (UserRoleGetter.fulfilled.match(response)) {
          const filteroptions = response?.payload?.data?.filter(
            options =>
              options?.UserRoleType?.userRoleType === 'Doctor' ||
              options?.UserRoleType?.userRoleType === 'Employer' ||
              options?.UserRoleType?.userRoleType === 'Institution Owner' ||
              options?.UserRoleType?.userRoleType ===
                'Agriculture Equipment Seller' ||
              options?.UserRoleType?.userRoleType === 'Businessman' ||
              options?.UserRoleType?.userRoleType === 'Driver' ||
              options?.UserRoleType?.userRoleType === 'Chartered Accountant' ||
              options?.UserRoleType?.userRoleType === 'LMS Vendor' ||
              options?.UserRoleType?.userRoleType === 'Lawyer',
          );

          const uniqueProduct = filteroptions?.map(item => ({
            label: `${item?.UserRoleType?.userRoleType}`,
            value: item?.UserRoleType?.userRoleId,
          }));

          setUserRoleId(uniqueProduct);
        }
      }
    } catch (error) {
      console.error('', error);
    }
  };

  function roleShowFunction() {
    const selectedProduct = uniqueProducts.find(
      product => product.value === productId,
    );
    const prodId = selectedProduct ? selectedProduct.value : 0;
    setRoleId('');
    setUserRoleId([]);
    roleGetter(prodId);
  }

  useEffect(() => {
    if (productId) {
      roleShowFunction();
    }
  }, [productId]);

  useEffect(() => {
    if (ServiceHistoryListData && ServiceHistoryListData?.data) {
      const data = ServiceHistoryListData?.data;
      const updatedTableData = [];
      let count = 1;
      Object.entries(data).forEach(([key, value]) => {
        if (
          typeof value === 'object' &&
          !Array.isArray(value) &&
          key !== 'UserProfile'
        ) {
          // It's an object
          updatedTableData.push({id: count, ...value});
          count += 1;
        } else if (Array.isArray(value) && key !== 'UserProfile') {
          // It's an array, check if it contains objects
          value.forEach(item => {
            if (typeof item === 'object') {
              updatedTableData.push({id: count, ...item});
              count += 1;
            }
          });
        }
      });
      setDataFiltered(updatedTableData);
    } else {
      fetchUpgradeHistory();
    }
  }, [ServiceHistoryListData]);

  const navigator = async roleId => {
    if (roleId == 34) navigation.navigate('DoctorUpgradeAccountForm', {roleId});
    if (roleId == 30)
      navigation.navigate('EmployerUpgradeAccountForm', {roleId});
    if (roleId == 44)
      navigation.navigate('InstitutionOwnerUpgradeAccountForm', {roleId});
    if (roleId == 46)
      navigation.navigate('AgricultureEquipmentSellerUpgradeAccountForm', {
        roleId,
      });
    if (roleId == 42)
      navigation.navigate('BusinessmanUpgradeAccountForm', {roleId});
    if (roleId == 8) navigation.navigate('DriverUpgradeAccountForm', {roleId});
    if (roleId == 31 || roleId == 32 || roleId == 49)
      navigation.navigate('ServiceProviderUpgradeAccountForm', {roleId});
  };

  return (
    <>
      <View style={[styles.header, {backgroundColor: colors.primary}]}>
        <View style={styles.headerLeadings}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={24} color={colors.surface} />
          </TouchableOpacity>
          <Text
            style={[
              styles.headerTitle,
              {color: colors.surface, ...fonts.titleMedium},
            ]}>
            Upgrade Account
          </Text>
        </View>
      </View>

      {phase == 1 && (
        <ScrollView
          style={[styles.container, {backgroundColor: colors.background}]}>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium},
            ]}>
            Upgrade Account History
          </Text>

          <DataTable>
            <DataTable.Header>
              <DataTable.Title>Id</DataTable.Title>
              <DataTable.Title>Name</DataTable.Title>
              <DataTable.Title numeric>Approval Status</DataTable.Title>
              <DataTable.Title numeric>Created At</DataTable.Title>
            </DataTable.Header>

            {items.slice(from, to).map(item => (
              <DataTable.Row key={item.key}>
                <DataTable.Cell>{item.key}</DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell numeric>{item.calories}</DataTable.Cell>
                <DataTable.Cell numeric>{item.fat}</DataTable.Cell>
              </DataTable.Row>
            ))}

            <DataTable.Pagination
              page={page}
              numberOfPages={Math.ceil(items.length / itemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${items.length}`}
              numberOfItemsPerPageList={numberOfItemsPerPageList}
              numberOfItemsPerPage={itemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              showFastPaginationControls
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>

          <TouchableOpacity
            // onPress={() => navigateToScreen('UpgradeAccountFormScreen')}>
            onPress={() => setPhase(2)}>
            <Text
              style={[
                styles.button,
                {marginLeft: 'auto', backgroundColor: colors.primary},
              ]}>
              New Request
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
      {phase == 2 && (
        <ScrollView
          style={[styles.container, {backgroundColor: colors.background}]}>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium, marginBottom: 30},
            ]}>
            Account Selector Form
          </Text>

          <SingleDropdownComponent
            label="Choose Your Product"
            options={uniqueProducts}
            value={productId}
            setValue={setProductId}
            containerColor={colors.borderColor}
            inputBorderWidth={1}
            inputBorderRadius={5}
          />
          <SingleDropdownComponent
            label="Choose Your Role"
            options={userRoleId}
            value={roleId}
            setValue={setRoleId}
            containerColor={colors.borderColor}
            inputBorderWidth={1}
            inputBorderRadius={5}
          />

          <TouchableOpacity
            onPress={() => {
              roleId
                ? navigator(roleId)
                : showAlert('Please Fill Information First', 'warning');
            }}>
            <Text
              style={[
                styles.button,
                {marginLeft: 'auto', backgroundColor: colors.primary},
              ]}>
              Next
            </Text>
          </TouchableOpacity>
        </ScrollView>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerLeadings: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 10,
  },
  submitButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 25,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default UpgradeAccountScreen;
