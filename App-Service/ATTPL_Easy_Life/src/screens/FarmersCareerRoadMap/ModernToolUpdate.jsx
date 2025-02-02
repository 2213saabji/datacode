import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, StyleSheet, ScrollView} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import Layout from '../../components/layout/Layout';
import JobNewEditForm from '../../components/LabourJobList/labourjob-new-edit-form';
import {fetchLabourJob} from '../../redux/slices/CRM/LabourJobPortalSlice';

// ----------------------------------------------------------------------

export default function ModernToolUpdateView({route}) {
  const dispatch = useDispatch();

  const jobPostId = route?.params?.jobId;
  const fetchJobs = route?.params?.fetchJobs;
  const {colors, fonts} = useSelector(selectTheme);
  const [jobData, setJobData] = useState({});

  const getData = async () => {
    try {
      const result = await dispatch(fetchLabourJob(jobPostId));
      if (fetchLabourJob.fulfilled.match(result)) {
        if (result.payload) {
          setJobData(result.payload);
        } else {
          setJobData({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch labour job.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView>
          <View
            style={[styles.container, {backgroundColor: colors.background}]}>
            <JobNewEditForm
              selfCoordinates={selfCoordinates}
              jobData={jobData}
              fetchJobs={fetchJobs}
            />
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
