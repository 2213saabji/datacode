import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import AgriEquipmentItem from './AgriEquipmentItem';

const AgriEquipmentTopList = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const AgriEquipmentType = [
    {
      name: 'Modern Agricultural Tool',
      value: 'ModernTool',
    },
    {
      name: 'Cultivation Equipment',
      value: 'CultivationTool',
    },
    {
      name: 'Irrigration System',
      value: 'IrrigationTool',
    },
    {
      name: 'Combine Harvester',
      value: 'HarvesterTool',
    },
    {
      name: 'Tractor',
      value: 'TractorTool',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={AgriEquipmentType}
        renderItem={({item}) => (
          <AgriEquipmentItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default AgriEquipmentTopList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
