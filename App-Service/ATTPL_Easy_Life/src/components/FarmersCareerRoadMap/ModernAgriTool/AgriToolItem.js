import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Button} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';
import {selectTheme} from '../../../redux/selectors';
import {fDate} from '../../../utilities/formatData';
import {IconButton} from 'react-native-paper';

const AgriToolItem = ({item, onDelete, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('ModernToolDetail', {
          modernAgriToolId: item.modernAgriToolId,
        })
      }>
      <View
        style={[
          styles.AgriToolItem,
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
            {item.name}
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
            styles.appointmentStatus,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Type: {item.applicationType}
        </Text>

        <Text
          style={[
            styles.appointmentDate,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          Price: ₹ {item.price} | MFG: {item.yearManufactured}
        </Text>
        {userRole !== 'Agriculture Equipment Seller' ? (
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
        ) : null}
      </View>
    </TouchableOpacity>
  );
};

export default AgriToolItem;
const styles = StyleSheet.create({
  AgriToolItem: {
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
