import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSelector } from 'react-redux';

import { selectTheme } from '../../redux/selectors';
import { Card } from 'react-native-elements';
import { vehicleImages } from '../../Constants/vehicleService';
import Icon from 'react-native-vector-icons/AntDesign';

const VehicleItem = ({ item, setSelectedVehicle, selectedVehicle, tripDistance, bookLoading }) => {
  const { colors, fonts } = useSelector(selectTheme);

  return (
    <TouchableOpacity onPress={() => setSelectedVehicle(item)} disabled={bookLoading}>
      <Card
        containerStyle={[
          styles.vehicleCard,
          {
            backgroundColor: selectedVehicle.VehicleOptionId === item.VehicleOptionId ? colors.primary : 'white',
            shadowColor: colors.shadow,
          },
        ]}
      >
        <View style={styles.row}>
          <Image
            source={vehicleImages[item?.vehicleType?.toLowerCase()].url}
            style={vehicleImages[item?.vehicleType?.toLowerCase()].size}
          />
          <View style={styles.textContainer}>
            <Text
              style={[
                styles.vehicleType,
                { color: 'black', ...fonts.headlineSmall },
              ]}
              numberOfLines={1} // ensures text doesn't overflow
              ellipsizeMode="tail" // applies ellipsis if text is too long
            >
              {item.vehicleType}
            </Text>
            <Text
              style={[
                styles.vehicleInfo,
                { color: 'black', ...fonts.bodySmall },
              ]}
            >
              <Icon name="user" size={14} color='black' /> {item.seatingCapacity}
            </Text>
          </View>
          <Text
            style={[
              styles.price,
              { color: 'black'},
            ]}
          >
            ₹ {Math.max(item.rentPerKm * tripDistance, item.baseCharge)}
          </Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};

export default VehicleItem;

const styles = StyleSheet.create({
  vehicleCard: {
    padding: 25,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1, // ensures that text takes up available space
    marginHorizontal: 10,
  },
  vehicleType: {
    fontSize: 18,
    fontWeight: 'bold',
    flexShrink: 1, // allows text to shrink to fit
  },
  vehicleInfo: {
    fontSize: 14,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
    flexShrink: 0, // keeps the price from shrinking
  },
});
