import React, {useState, useEffect, useCallback, useMemo} from 'react';
import {SafeAreaView, FlatList, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import InstitutionItem from './InstitutionItem';

const InstitutionTopList = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const InstitutionType = [
    {
      name: 'School',
      value: 'SchoolList',
    },
    {
      name: 'College',
      value: 'CollegeList',
    },
    {
      name: 'Coaching Center',
      value: 'CoachingList',
    },
  ];

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <FlatList
        data={InstitutionType}
        renderItem={({item}) => (
          <InstitutionItem item={item} navigation={navigation} />
        )}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>
  );
};

export default InstitutionTopList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
