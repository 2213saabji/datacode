import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import UserProfilePercentage from '../../components/userProfileCompletion';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
// import { useDispatch, useSelector } from 'react-redux';
import {Button, DataTable} from 'react-native-paper';
import {FetchServiceHistory} from '../../redux/slices/UMS/authSlice';
import InputField from '../../components/EditProfile/InputField';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import SaveButton from '../../components/EditProfile/SaveButton';
import DeliveryListCard from '../../components/DeliveryListCards/deliveryListCards';
import ModernSortBar from '../../components/FarmersCareerRoadMap/ToolSortBar';
import debounce from 'lodash/debounce';

const dataa = [
  {
    bookingid: '8',
    itemname: '444',
    drivername: 'Cab Driver',
    itemweight: '454.00',
    vehicletype: 'SUV',
    bookingstatus: 'Accepted',
  },
  {
    bookingid: '9',
    itemname: '545',
    drivername: 'Bike Driver',
    itemweight: '210.00',
    vehicletype: 'motorbike',
    bookingstatus: 'Accepted',
  },
];

const DeliveryListRenderFormScreen = () => {
  const {showAlert} = useCustomAlert();
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [data, setData] = useState();
  const [searchQuery, setSearchQuery] = useState('');
  const [visible, setVisible] = useState(false);
  const [toolData, setToolData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sortOrder, setSortOrder] = useState('high');

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        if (query) {
          const results = toolData.filter(tool =>
            tool?.model?.toLowerCase().includes(query.toLowerCase()),
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

  const handleSortChange = () => {
    setSortOrder(prevOrder => (prevOrder === 'latest' ? 'oldest' : 'latest'));
  };

  const SubmitForm = async () => {
    try {
      const res = await dispatch();
      if (RequestDoctorForm.fulfilled.match(res)) {
      } else if (RequestDoctorForm.rejected.match(res)) {
        showAlert("Error Occur's while Getting your Data", 'error');
      }
    } catch (error) {
      showAlert(error || 'An unexpected error occurred', 'error');
    }
  };

  return (
    <>
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Text
          style={[
            styles.sectionTitle,
            {
              color: colors.text,
              ...fonts.titleMedium,
              paddingTop: 5,
              marginBottom: 15,
              fontSize: 20,
            },
          ]}>
          DELIVERY Booking List
        </Text>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            border: '2px solid white',
            marginBottom: 30,
          }}>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium},
            ]}>
            {`DELIVERY Booking .  `}
          </Text>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium, opacity: 0.7},
            ]}>
            List
          </Text>
        </View>

        {/* <ModernSortBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSearch={debouncedSearch}
          sortOrder={sortOrder}
          handleSortChange={handleSortChange}
          setVisible={setVisible}
          buttonName="Delivery"
          screenName="DeliveryListRenderForm"
          navigation={navigation}
        /> */}
        {dataa.map(item => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('DeliveryScreens', {
                screen: 'DeliveryRenderDetailsForm',
                params: {item: item},
              });
            }}>
            <DeliveryListCard
              bookingid={item.bookingid}
              itemname={item.itemname}
              drivername={item.drivername}
              itemweight={item.itemweight}
              vehicletype={item.vehicletype}
              bookingstatus={item.bookingstatus}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    // marginBottom: 10,
    // borderBottomWidth: 1,
    // borderBottomColor: '#ccc',
    // paddingVertical: 12,
  },
  settingText: {
    fontSize: 16,
    marginLeft: 16,
  },
});

export default DeliveryListRenderFormScreen;
