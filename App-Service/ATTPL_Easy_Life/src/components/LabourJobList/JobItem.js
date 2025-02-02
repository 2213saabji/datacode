import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

import {fDate} from '../../utilities/formatData';
import JobDetailsView from '../../screens/LabourJobView/JobDetailsView';
import {deleteLabourJob} from '../../redux/slices/CRM/LabourJobPortalSlice';
import {IconButton} from 'react-native-paper';
// import CustomPopover from '../ReusableComp/CustomPopover';

const JobItem = ({item, selfCoordinates, onDelete, fetchJobs, navigation}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const {showAlert} = useCustomAlert();

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  const [popOpen, setPopOpen] = useState(false);

  // const deleteJob = async (jobPostId) => {
  //   try {
  //     const result = await dispatch(deleteLabourJob(jobPostId));
  //     if (deleteLabourJob.fulfilled.match(result)) {
  //       if (result.payload) {
  //         showAlert('Job Deleted Successfully', 'success');
  //       } else {
  //         showAlert('Failed to delete Job', 'error');;
  //       }
  //     } else {
  //       console.log(result.payload || 'Failed to fetch labour job.');
  //     }
  //   } catch (error) {
  //     console.log(error.message || 'An unexpected error occurred');
  //   }
  // };

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('JobDetails', {
          jobId: item.jobPostId,
          selfCoordinates: selfCoordinates,
        })
      }>
      <View
        style={[
          styles.jobItem,
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
              styles.jobTitle,
              {color: colors.text, ...fonts.headlineSmall, flex: 6},
            ]}>
            {item.jobTitle}
          </Text>
          {userRole === 'Employer' ? (
            <View style={{display: 'flex', flexDirection: 'row'}}>
              <IconButton
                icon="pencil"
                iconColor={colors.text}
                size={20}
                style={{flex: 0}}
                onPress={() =>
                  navigation.navigate('JobUpdate', {
                    selfCoordinates: selfCoordinates,
                    jobId: item.jobPostId,
                    fetchJobs: fetchJobs,
                  })
                }
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

        <Text
          style={[styles.jobCompany, {color: colors.text, ...fonts.bodylarge}]}>
          {item.companyName}
        </Text>
        <Text
          style={[
            styles.jobLocation,
            {color: colors.text, ...fonts.bodySmall},
          ]}>
          {item.location}
        </Text>
        <Text
          style={[styles.jobDate, {color: colors.text, ...fonts.bodySmall}]}>
          Posted date: {fDate(item.created_at)} | Expiry date:{' '}
          {fDate(item.applicationDeadline)}
        </Text>
      </View>

      {/* <CustomPopover
       isOpen={popOpen}
       setIsOpen={setPopOpen}
      >

      </CustomPopover> */}
    </TouchableOpacity>
  );
};

export default JobItem;
const styles = StyleSheet.create({
  jobItem: {
    marginBottom: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  jobCompany: {
    fontSize: 16,
    marginVertical: 2,
  },
  jobLocation: {
    fontSize: 14,
    marginVertical: 2,
  },
  jobDate: {
    fontSize: 14,
  },
});
