import React from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import JobNewEditForm from '../../components/LabourJobList/labourjob-new-edit-form';


export default function JobCreateView({route}) {
  const selfCoordinates = route?.params?.selfCoordinates;
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          <JobNewEditForm selfCoordinates={selfCoordinates} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff', 
  },
  container: {
    flex: 1,
    padding: 16, 
  },
});
