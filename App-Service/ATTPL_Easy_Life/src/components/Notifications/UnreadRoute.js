import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const UnreadRoute = () => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={[styles.scene, {backgroundColor: colors.background}]}>
      <Text style={{color: colors.text}}>All Notifications</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default UnreadRoute;
