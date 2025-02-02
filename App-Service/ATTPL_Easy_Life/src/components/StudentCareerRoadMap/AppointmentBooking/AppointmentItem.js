import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../../redux/selectors';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';
import {fDate} from '../../../utilities/formatData';
import {IconButton} from 'react-native-paper';

const AppointmentItem = ({item, onDelete, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('InstitutionAppointmentDetail', {
          institutionAppointmentId: item.institutionAppointmentId,
        })
      }>
      <View
        style={[
          styles.AppointmentItem,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={[
              styles.appointmentTitle,
              {color: colors.text, ...fonts.headlineSmall, flex: 6},
            ]}>
            {item.appointmentType}
          </Text>
          {userRole === 'Institution Owner' ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton
                icon="pencil"
                iconColor={colors.text}
                size={20}
                style={{flex: 0}}
                onPress={() =>
                  navigation.navigate('LabourJobScreen', {
                    screen: 'JobUpdate',
                    params: {jobId: item.agricultureAppointmentId},
                  })
                }
              />

              <IconButton
                icon="delete"
                iconColor="#FF6B6B"
                size={20}
                style={{flex: 0}}
                onPress={() => onDelete()}
              />
            </View>
          ) : null}
        </View>

        <Text
          style={[
            styles.appointmentStatus,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Status: {item.appointmentPassStatus}
        </Text>
        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Appointment date: {fDate(item.appointmentDate)} | Time:{' '}
          {item.appointmentTime}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AppointmentItem;
const styles = StyleSheet.create({
  AppointmentItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  appointmentTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  appointmentStatus: {
    fontSize: 14,
    marginVertical: 2,
  },
  appointmentDate: {
    fontSize: 14,
  },
});
