import React, {useState, useCallback} from 'react';
import {
  Dimensions,
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {
  Appbar,
  Badge,
  RadioButton,
  TextInput,
  Menu,
  Button,
  IconButton,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import Modal from 'react-native-modal';
import RHFAutocomplete from '../ReusableComp/RHFAutocomplete';
import MultiSelectComponent from '../ReusableComp/MultiDropDown';

const FilterModal = ({
  modalVisible,
  setModalVisible,
  filters,
  selfCoordinates,
  canReset,
  onResetFilters,
  onFilters,
}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [employmentType, setEmploymentType] = useState('');
  const [jobType, setJobType] = useState('all');
  const [distance, setDistance] = useState([]);
  const [jobTypeVisible, setJobTypeVisible] = useState(false);
  const [distanceVisible, setDistanceVisible] = useState(false);
  const [jobTypeSearch, setJobTypeSearch] = useState([]);
  const [distanceSearch, setDistanceSearch] = useState('');

  const employmentTypes = [
    {value: 'Full Time', label: 'Full Time'},
    {value: 'Part Time', label: 'Part Time'},
    {value: 'On Demand', label: 'On Demand'},
  ];

  const distances = [
    {value: 10, label: '10 Km'},
    {value: 20, label: '20 Km'},
    {value: 40, label: '40 Km'},
    {value: 60, label: '60 Km'},
    {value: 80, label: '80 Km'},
    {value: 13000, label: '13000 Km'},
  ];

  const jobTypes = [
    {value: 'Plumber', label: 'Plumber'},
    {value: 'Carpenter', label: 'Carpenter'},
    {value: 'Mechanic', label: 'Mechanic'},
    {value: 'Welder', label: 'Welder'},
    {value: 'Painter', label: 'Painter'},
    {value: 'Electrician', label: 'Electrician'},
    {value: 'Construction worker', label: 'Construction worker'},
  ];

  const screenWidth = Dimensions.get('window').width;

  const closeModal = () => {
    setModalVisible(false);
  };

  const applyFilters = () => {
    // Implement your logic here to apply filters
    console.log('Filters Applied:', {employmentType, jobType, distance});
    handleFilterEmploymentTypes(employmentType);
    handleFilterJobTypes(jobTypeSearch);
    handleFilterLocations(distance);
    setModalVisible(false); // Close the modal after applying filters
  };

  const handleFilterEmploymentTypes = useCallback(
    newValue => {
      onFilters('employmentTypes', newValue);
    },
    [onFilters],
  );

  const handleFilterJobTypes = useCallback(
    newValue => {
      onFilters('jobTypes', newValue);
    },
    [onFilters],
  );

  const handleFilterLocations = useCallback(
    newValue => {
      onFilters('locations', newValue);
    },
    [onFilters],
  );

  const handleResetFilters = () => {
    onResetFilters();
    setEmploymentType('');
    setJobTypeSearch([]);
    setDistance([]);
  };

  return (
    <Modal
      isVisible={modalVisible}
      animationIn="slideInRight"
      animationOut="slideOutRight"
      animationInTiming={300}
      animationOutTiming={300}
      onBackdropPress={closeModal}
      style={[styles.modal, {left: screenWidth * 0.2}]}>
      <ScrollView
        style={[
          styles.drawer,
          {width: screenWidth * 0.8, backgroundColor: colors.surface},
        ]}>
        <Appbar.Header style={{backgroundColor: colors.surface}}>
          <Appbar.Content
            title="Filter Jobs"
            titleStyle={{
              color: colors.text,
              fontFamily: fonts.titleLarge.fontFamily,
            }}
          />
          <View>
            <IconButton
              icon="refresh"
              iconColor={colors.text}
              onPress={handleResetFilters}
            />
            <Badge visible={canReset} style={styles.badge} size={8} />
          </View>
        </Appbar.Header>
        {/* <View>
        <Text
          style={[
            styles.modalTitle,
            {color: colors.text, ...fonts.titleMedium},
          ]}>
          Filter Jobs
        </Text>
        <IconButton
        icon="refresh"
        iconColor={colors.text}
        onPress={() => setModalVisible(true)}
      />
        </View> */}

        <Text
          style={[
            styles.filterLabel,
            {color: colors.text, ...fonts.bodyMedium},
          ]}>
          Employment Types
        </Text>
        <RadioButton.Group
          onValueChange={value => setEmploymentType(value)}
          value={employmentType}>
          <RadioButton.Item
            label="All"
            value=""
            labelStyle={{
              color: colors.text,
              ...fonts.bodySmall,
            }}
            color={colors.primary}
          />
          <RadioButton.Item
            label="Full Time"
            value="Full Time"
            labelStyle={{
              color: colors.text,
              ...fonts.bodySmall,
            }}
            color={colors.primary}
          />
          <RadioButton.Item
            label="Part Time"
            value="Part Time"
            labelStyle={{
              color: colors.text,
              ...fonts.bodySmall,
            }}
            color={colors.primary}
          />
          <RadioButton.Item
            label="On Demand"
            value="On Demand"
            labelStyle={{
              color: colors.text,
              ...fonts.bodySmall,
            }}
            color={colors.primary}
          />
        </RadioButton.Group>

        <Text
          style={[
            styles.filterLabel,
            {color: colors.text, ...fonts.bodyMedium},
          ]}>
          Job Types
        </Text>
        <MultiSelectComponent
          options={jobTypes}
          setValue={setJobTypeSearch}
          value={jobTypeSearch}
        />

        <Text
          style={[
            styles.filterLabel,
            {color: colors.text, ...fonts.bodyMedium},
          ]}>
          Distance
        </Text>

        {selfCoordinates.lat === null && selfCoordinates.lng === null ? (
          <View style={styles.container}>
            <Text style={styles.text}>Fetching your location</Text>
            <Image
              style={styles.image}
              source={require('../../assets/icons/search.gif')}
            />
          </View>
        ) : (
          <MultiSelectComponent
            options={distances}
            setValue={setDistance}
            value={distance}
          />
        )}

        <Button
          mode="contained"
          onPress={applyFilters}
          style={[styles.applyButton, {backgroundColor: colors.backdrop}]}>
          Apply Filters
        </Button>
      </ScrollView>
    </Modal>
  );
};

export default FilterModal;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  text: {
    fontSize: 14,
  },
  image: {
    width: 80,
    height: 80,
  },
  drawer: {
    elevation: 10,
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  dropdown: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  dropdownSearch: {
    backgroundColor: 'transparent',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    marginBottom: 10,
  },
  applyButton: {
    marginTop: 20,
    alignSelf: 'flex-start',
  },
  badge: {
    position: 'absolute',
    top: 4,
    right: 0,
  },
});
