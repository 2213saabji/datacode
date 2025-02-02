// components/ElectionManagement/StatItem.js
import React from 'react';
import {View, Text, Animated, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

const StatItem = ({
  icon,
  title,
  value,
  backgroundColor,
  iconColor,
  valueColor,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Animated.View style={[styles.statItem, {backgroundColor}]}>
        <View style={[styles.statIcon, {backgroundColor: iconColor}]}>
          <Icon name={icon} size={20} color="#fff" />
        </View>
        <View>
          <Text style={(styles.statTitle, {color: valueColor})}>{title}</Text>
          <Text style={[styles.statValue, {color: valueColor}]}>{value}</Text>
        </View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  statItem: {
    flexDirection: 'row',
    height: 50,
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    marginRight: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default StatItem;
