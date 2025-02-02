import React from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import Layout from '../../components/layout/Layout';

import CombineHarvesterNewEditForm from '../../components/FarmersCareerRoadMap/CombineHarvester/combineHarvester-new-edit-form';
// ----------------------------------------------------------------------

export default function CombineHarvesterToolForm() {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View
            style={[styles.container, {backgroundColor: colors.background}]}>
            <CombineHarvesterNewEditForm />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', // Change the background color as needed
  },
  container: {
    flex: 1,
    padding: 16, // Adjust the padding as needed
  },
});
