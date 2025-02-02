import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../../redux/selectors';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';

import {IconButton} from 'react-native-paper';

const TractorItem = ({item, onDelete}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('TractorToolDetail', {tractorId: item.tractorId})
      }>
      <View
        style={[
          styles.TractorItem,
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
            {item.model}
          </Text>
          {userRole === 'Agriculture Equipment Seller' ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton
                icon="pencil"
                iconColor={colors.text}
                size={20}
                style={{flex: 0}}
                // onPress={() => navigation.navigate('LabourJobScreen', {screen: 'JobUpdate', params: {jobId: item.agricultureAppointmentId}})}
                onPress={() => {}}
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

        <Text style={[styles.brand, {color: colors.text, ...fonts.bodymedium}]}>
          {item.brand}
        </Text>

        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Power: {item.horsepower} hp | Engine: {item.engineType}
        </Text>

        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Price: ₹ {item.price} | MFG: {item.yearManufactured}
        </Text>

        <View style={{marginTop: 10, width: 220}}>
          <Button
            title={`Book Appointment`}
            onPress={() =>
              navigation.navigate('FarmerAppointmentCreate', {
                sellerOwnerId: item.sellerOwnerId,
              })
            }
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TractorItem;
const styles = StyleSheet.create({
  TractorItem: {
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
  brand: {
    fontSize: 18,
    marginVertical: 2,
  },
  appointmentDate: {
    fontSize: 14,
  },
});
