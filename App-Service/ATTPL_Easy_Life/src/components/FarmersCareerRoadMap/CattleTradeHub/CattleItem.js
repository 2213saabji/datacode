import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../../redux/selectors';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';

import {IconButton} from 'react-native-paper';

const CattleItem = ({item, onDelete, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('CattleDetail', {
          cattleId: item.cattleTypeId,
          cattleTypeId: item.cattleTypeId,
        })
      }>
      <View
        style={[
          styles.CattleItem,
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
            {item.type}
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
          {item.breed}
        </Text>

        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Age: {item.age} yr | Weight: {item.weight} kg
        </Text>

        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Price: ₹ {item.price}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default CattleItem;
const styles = StyleSheet.create({
  CattleItem: {
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
