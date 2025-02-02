import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';
import {TabView, TabBar} from 'react-native-tab-view';
import {selectTheme} from '../../../redux/selectors';

import {
  View,
  Text,
  Alert,
  Image,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {
  RadioButton,
  Chip,
  Snackbar,
  Portal,
  Dialog,
  Paragraph,
  TextInput,
  Button,
} from 'react-native-paper';
import ImagePicker from 'react-native-image-crop-picker';
import DatePickerInput from '../../EditProfile/datePicker';
import {useCustomAlert} from '../../../utilities/Alert/useCustomAlert';
import MapView, {Marker} from 'react-native-maps';
import SingleDropdownComponent from '../../ReusableComp/SingleDropDown';
// ReusableComp/SingleDropDown
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createLabourJob,
  updateLabourJob,
  fetchLabourJobType,
  fetchJobTypeCategory,
} from '../../../redux/slices/CRM/LabourJobPortalSlice';
import {
  uploadUserFileInAWSS3,
  deleteUserFileFromAWSS3,
} from '../../../redux/slices/simpleFunctions/aws-s3-file-handler';
import {createFarmerAppointment} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerCareerRoadSlice';
// import { getJobTypeCategory, useGetJobTypes, createLabourJob, UpdateJob } from 'src/api/labour_job';

import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-elements/dist/helpers';
import TimePickerInput from '../../EditProfile/timePicker';

export default function FarmerAppointmentNewForm({
  currAppointDetails,
  sellerOwnerId,
  navigation,
}) {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);

  const {showAlert} = useCustomAlert();

  const [currentImageTab, setCurrentImageTab] = useState('image1');
  const [thumbnail, setThumbnail] = useState(
    currAppointDetails?.data?.imageUrl?.image1 || '',
  );
  const [full, setFull] = useState(
    currAppointDetails?.data?.imageUrl?.image2 || '',
  );

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'image1', title: 'Front Image'},
    {key: 'image2', title: 'Side Image'},
  ]);

  console.log('idddd', sellerOwnerId);

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: colors.surface}}
      labelStyle={{
        color: colors.text,
        ...fonts.bodyMedium,
        textAlign: 'center',
      }} // Adjust as per your font styles
    />
  );

  const PartySchema = Yup.object().shape({
    description: Yup.string().required('Description is required'),
    appointmentType: Yup.string().required('Appointment Type is required'),
    appointmentTime: Yup.mixed().required('Appointment Time is required'),
    appointmentDate: Yup.mixed().required('Appointment Date is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      farmerId: currAppointDetails?.data?.farmerId || user?.userId,
      sellerOwnerId: currAppointDetails?.data?.sellerOwnerId || sellerOwnerId,
      description: currAppointDetails?.data?.description || '',
      appointmentType: currAppointDetails?.data?.appointmentType || '',
      appointmentTime: currAppointDetails?.data?.appointmentTime || '',
      appointmentDate: currAppointDetails?.data?.appointmentDate || '',
      appointmentPassMeetingLink:
        currAppointDetails?.data?.appointmentPassMeetingLink || '',
      image: currAppointDetails?.data?.pdfImageUrl?.image || '',
      pdf: currAppointDetails?.data?.pdfImageUrl?.pdf || '',
      appointmentPassStatus:
        currAppointDetails?.data?.appointmentPassStatus || 'Pending',
    }),
    [currAppointDetails, user],
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(PartySchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    control,
    watch,
    formState: {isSubmitting},
  } = methods;

  const value = watch();

  useEffect(() => {
    if (currAppointDetails) {
      reset(defaultValues);
    }
  }, [currAppointDetails, defaultValues, reset]);

  const helperText = 'error';

  const handleImagePick = useCallback(() => {
    ImagePicker.openPicker({
      width: 800,
      height: 800,
      cropping: true,
      compressImageMaxWidth: 800,
      compressImageMaxHeight: 800,
      compressImageQuality: 0.7,
    })
      .then(async image => {
        const formData = new FormData();
        formData.append('image', {
          uri: image.path,
          name: image.filename || `temp_image_${Date.now()}.jpg`,
          type: image.mime,
        });

        try {
          // Dispatch the thunk action and wait for the result
          const resultAction = await dispatch(uploadUserFileInAWSS3(formData));

          if (uploadUserFileInAWSS3.fulfilled.match(resultAction)) {
            const imageUrl = resultAction.payload?.data?.data?.preview || '';

            if (imageUrl) {
              if (currentImageTab === 'image1') {
                setThumbnail(imageUrl);
                setValue('image1', imageUrl);
              } else if (currentImageTab === 'image2') {
                setFull(imageUrl);
                setValue('image2', imageUrl);
              }
              Alert.alert(
                'Success',
                `Image uploaded successfully! ${currentImageTab}`,
              );
            } else {
              Alert.alert('Error', 'Error uploading image.');
            }
          } else {
            Alert.alert(
              'Error',
              resultAction.payload || 'Error2 uploading image.',
            );
          }
        } catch (error) {
          console.error('Error uploading image:', error.message, error);
          Alert.alert('Error', `Error3 uploading image: ${error.message}`);
        }
      })
      .catch(error => {
        console.error('Error picking image:', error.message, error);
        Alert.alert('Error', `Error picking image: ${error.message}`);
      });
  }, [currentImageTab, setValue]);

  const handleRemoveFile = useCallback(async () => {
    const imageUrlToDelete = currentImageTab === 'image1' ? thumbnail : full;
    if (imageUrlToDelete) {
      const resultDelete = await dispatch(
        deleteUserFileFromAWSS3({url: imageUrlToDelete}),
      );
      if (deleteUserFileFromAWSS3.fulfilled.match(resultDelete)) {
        if (currentImageTab === 'image1') {
          setThumbnail('');
          setValue('image1', '');
        } else {
          setFull('');
          setValue('image2', '');
        }
        Alert.alert('Success', 'Image deleted successfully!');
      } else {
        Alert.alert('Error', 'Not able to delete image.');
      }
    } else {
      Alert.alert('Error', 'No image to delete.');
    }
  }, [currentImageTab, setValue, thumbnail, full]);

  const onSubmit = handleSubmit(async data => {
    // console.log('form data=======>', data);
    const updatedData = {
      ...data,
      pdfImageUrl: {
        pdf: value.pdf,
        image: value.image,
      },
    };
    const result = await dispatch(createFarmerAppointment(updatedData));
    // console.log('NEW result======================>>>>>>>>>>>>', result);
    console.log(data);
    if (createFarmerAppointment.fulfilled.match(result)) {
      showAlert('Appointment Booked Successfully', 'success');
      navigation.replace('FarmerAppointmentList');
    } else {
      showAlert('Failed To Book Appointment', 'error');
    }
  });

  const onSubmitUpdate = handleSubmit(async data => {
    const result = await dispatch(
      updateLabourJob({jobId: currAppointDetails.jobPostId, data}),
    );

    if (updateLabourJob.fulfilled.match(result)) {
      showAlert('Job Updated Successfully', 'success');
      // navigation.replace('LabourJobScreen', {
      //   screen: 'JobDetails',
      //   params: {jobId: currAppointDetails.jobPostId, selfCoordinates: selfCoordinates},
      // });
      navigation.navigate('Main', {screen: 'Home'});
    } else {
      showAlert('Failed To Update Job', 'error');
    }
  });

  const handleIndexChange = newIndex => {
    setIndex(newIndex);
    setCurrentImageTab(routes[newIndex].key);
  };

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'image1':
        return (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {thumbnail ? (
                <Image source={{uri: thumbnail}} style={styles.image} />
              ) : (
                <Text style={{color: colors.text}}>No Image Selected</Text>
              )}
            </View>

            <Button mode="contained" onPress={handleImagePick}>
              Pick Image
            </Button>
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!thumbnail}>
              Remove Image
            </Button>
          </View>
        );
      case 'image2':
        return (
          <View style={styles.container}>
            <View style={styles.imageContainer}>
              {full ? (
                <Image source={{uri: full}} style={styles.image} />
              ) : (
                <Text style={{color: colors.text}}>No Image Selected</Text>
              )}
            </View>

            <Button mode="contained" onPress={handleImagePick}>
              Pick Image
            </Button>
            <Button
              mode="contained"
              onPress={handleRemoveFile}
              disabled={!full}>
              Remove Image
            </Button>
          </View>
        );
      default:
        return null;
    }
  };

  const appointmentType = [
    {value: 'office', label: 'Office'},
    {value: 'remote', label: 'Remote'},
  ];

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.surface,
        borderRadius: 14,
      }}>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Appointment Type
        </Text>
        <Controller
          name="appointmentType"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <SingleDropdownComponent
              options={appointmentType}
              value={value}
              setValue={onChange}
              containerColor="transparent"
              inputBorderRadius={6}
              inputBorderWidth={1}
            />
          )}
        />
      </View>

      <View>
        <Text style={[styles.title, {color: colors.text}]}>Description</Text>
        <Controller
          name="description"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                placeholder="write a description"
                mode="outlined"
                textColor={colors.text}
                activeOutlineColor={colors.text}
                placeholderTextColor={colors.placeholder}
                value={value}
                onChangeText={onChange}
                error={!!error}
                helperText={error ? error?.message : helperText}
                style={[
                  styles.textInput,
                  {color: colors.text, borderColor: colors.text},
                ]}
              />
              <Text style={styles.helperText}>{error?.message}</Text>
            </>
          )}
        />
      </View>

      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Appointment Date
        </Text>
        <Controller
          name="appointmentDate"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <DatePickerInput
              value={value}
              onChangeText={onChange}
              colors={colors}
              fonts={fonts}
            />
          )}
        />
      </View>

      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Appointment Time
        </Text>
        <Controller
          name="appointmentTime"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <TimePickerInput
              value={value}
              onChangeText={onChange}
              colors={colors}
              fonts={fonts}
            />
          )}
        />
      </View>

      {/* image */}

      {/* <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderTabBar={renderTabBar}
      /> */}

      {/* image end */}

      <Button
        buttonColor={colors.backdrop}
        style={{marginTop: 20}}
        mode="contained"
        onPress={currAppointDetails ? onSubmitUpdate : onSubmit}
        disabled={isSubmitting}>
        {currAppointDetails ? 'Update Appointment' : 'Book Appointment'}
      </Button>

      <Snackbar visible={!!isSubmitting} onDismiss={() => setSubmitting(false)}>
        Submitting...
      </Snackbar>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    marginTop: 20,
    marginBottom: 8,
    fontWeight: 'bold',
  },
  textInput: {
    height: 50,
    marginBottom: 6,
    backgroundColor: 'transparent',
    position: 'relative',
    border: '1px solid white',
  },
  button: {
    marginBottom: 16,
  },
  helperText: {
    color: '#FF6B6B',
    fontSize: 12,
    marginTop: 0,
  },
  salaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  salaryOption: {
    alignItems: 'center',
    padding: 12,
    borderWidth: 1,
    borderColor: '#6b6b6baf',
    borderRadius: 6,
  },
  salaryText: {
    marginTop: 4,
    fontSize: 14,
  },
  container: {
    flex: 1,
    padding: 20,
  },
  tabLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  imageButton: {
    marginTop: 10,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});
