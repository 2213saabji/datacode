import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';
import {fDate} from '../../utilities/formatData';
import {Icon} from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Layout from '../layout/Layout';

const CandidateAppointment = ({item}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const navigation = useNavigation();
  console.log('ID+>', item.appointmentId);
  const handleNavigate = screen => {
    navigation.navigate('CandidateAppointmentScreen', {
      screen: screen,
      params: {AppointmentId: item.appointmentId},
    });
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* Menu Trigger */}
      <View style={styles.menuContainer}>
        <Menu>
          <MenuTrigger>
            <Icon
              name="dots-vertical"
              type="material-community"
              color="#ff6f00"
              size={24}
            />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption
              onSelect={() => handleNavigate('CandidateAppointmentDetails')}>
              <Text style={styles.menuOption}>View</Text>
            </MenuOption>
            <MenuOption
              onSelect={() => handleNavigate('CandidateAppointmentFormEdit')}>
              <Text style={styles.menuOption}>Edit</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      {/* Table Data */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableHeader,
              {color: colors.text, ...fonts.headlineSmall},
            ]}>
            Details
          </Text>
          <Text
            style={[
              styles.tableHeader,
              {color: colors.text, ...fonts.headlineSmall},
            ]}>
            Value
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Problem Title
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.problemDescription}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Appointment Type
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.appointmentType}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Pass Status
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.appointmentStatus}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Date Created
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {fDate(item.created_at)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Appointment Date
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {fDate(item.appointmentDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative', // Ensure relative positioning for absolute child components
  },
  menuContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  menuOptions: {
    marginTop: 5, // Ensure menu options are visible below the trigger
    padding: 7,
    borderRadius: 8,
    backgroundColor: '#fff', // Ensure background color contrasts with text
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuOption: {
    padding: 7,
    fontSize: 16,
    color: '#000', // Ensure text is visible
  },
  table: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 14,
  },
});

export default CandidateAppointment;
