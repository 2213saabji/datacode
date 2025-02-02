// components/ElectionManagement/ActionButton.js
import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const ActionButton = ({icon, title, onPress}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <TouchableOpacity style={styles.actionButton} onPress={onPress}>
      <Icon name={icon} color={colors.text} size={20} />
      <Text style={[styles.actionButtonText, {color: colors.text}]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 8,
    fontSize: 14,
  },
});

export default ActionButton;
