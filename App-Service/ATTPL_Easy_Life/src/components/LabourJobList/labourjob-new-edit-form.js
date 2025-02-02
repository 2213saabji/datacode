import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import React, {useMemo, useState, useEffect} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import { selectUser } from '../../redux/selectors/UMS/authSelectors';
import {fDate} from '../../utilities/formatData';

import {
  View,
  Text,
  Alert,
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
import DatePickerInput from '../EditProfile/datePicker';
import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';
import MapView, {Marker} from 'react-native-maps';
import SingleDropdownComponent from '../ReusableComp/SingleDropDown';
// ReusableComp/SingleDropDown
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  createLabourJob,
  updateLabourJob,
  fetchLabourJobType,
  fetchJobTypeCategory,
} from '../../redux/slices/CRM/LabourJobPortalSlice';
// import { getJobTypeCategory, useGetJobTypes, createLabourJob, UpdateJob } from 'src/api/labour_job';

import {useNavigation} from '@react-navigation/native';
import { color } from 'react-native-elements/dist/helpers';

export default function JobNewEditForm({jobData, selfCoordinates, fetchJobs}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);
  
  const { showAlert } = useCustomAlert();
  // const { user } = useAuthContext();
  
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selfLocationLoading, setSelfLocationLoading] = useState(false);
  const [mapLocationLoading, setMapLocationLoading] = useState(false);
  const [locationSelected, setLocationSelected] = useState('');
  const [coordinates, setCoordinates] = useState({lat: null, lng: null});
  const [seletedJobCategory, setSelectedJobCategory] = useState([]);
  const [jobTypeOption, setJobTypeOption] = useState([]);


  // const { jobTypes } = useGetJobTypes();
  // const jobTypesArr = jobTypes?.data || [];

  // const onConfirm = () => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     setCoordinates({
  //       lat: position.coords.latitude,
  //       lng: position.coords.longitude,
  //     });
  //     setLoading(false);
  //   });
  //   setOpen(false);
  // };

  // useEffect(() => {
  //   onConfirm();
  // }, []);

  const NewJobSchema = Yup.object().shape({
    jobTitle: Yup.string().required('Job Title is required'),
    companyName: Yup.string().required('Company Name is required'),
    location: Yup.string().required('Address is required'),
    jobType: Yup.string().required('Job Type is required'),
    employmentType: Yup.string().required('Employment Type is required'),
    howToApply: Yup.string().required('Please enter the process to apply for this Job'),
    salary: Yup.object().shape({
      type: Yup.string(),
      price: Yup.number().required('Price is required'),
    }),
    jobDescription: Yup.string().required('Job Description is required'),
    requirements: Yup.array().min(1, 'Please Enter at least One Requirement'),
    responsibilities: Yup.array().min(1, 'Please Enter at least One Responsibility'),
    benefits: Yup.array().min(1, 'Please Enter at least One Benefit'),
    applicationDeadline: Yup.string().required('Please Select Application End Date'),
  });

  const defaultValues = useMemo(
    () => ({
      userId: user?.userId || '',
      companyName: jobData?.companyName || '',
      location: jobData?.location || '',
      employmentType: jobData?.employmentType || '',
      jobType: jobData?.jobType || '',
      jobTitle: jobData?.jobTitle || '',
      howToApply: jobData?.howToApply || '',
      salary: jobData?.salary || {type: 'Hourly', price: 0},
      jobStatus: jobData?.jobStatus || 'Open',
      requirements: jobData?.requirements || [],
      responsibilities: jobData?.responsibilities || [],
      benefits: jobData?.benefits || [],
      jobDescription: jobData?.jobDescription || '',
      latitude: jobData?.latitude || null,
      longitude: jobData?.longitude || null,
      applicationDeadline: jobData?.applicationDeadline || '',
    }),
    [jobData, user],
  );

  
  

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: {isSubmitting},
  } = methods;
  const value = watch();
 

  useEffect(() => {
    if (jobData) reset(defaultValues);
  }, [jobData, defaultValues, reset]);

  const getJobTypeData = async () => {
    try {
      const result = await dispatch(fetchLabourJobType());
      if (fetchLabourJobType.fulfilled.match(result)) {
        if (result.payload) {
          const updatedData = result.payload.map(job => ({
            value: job.jobType,
            label: job.jobType,
          }));
          console.log('jobtype===>', updatedData);
          setJobTypeOption(updatedData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getJobTypeData();
  }, []);

  const helperText = "error"
  

  const getJobCategoryData = async jobType => {
    try {
      const result = await dispatch(fetchJobTypeCategory(jobType));
      if (fetchJobTypeCategory.fulfilled.match(result)) {
        if (result.payload) {
          const updatedData = result.payload.map((category) => (
            {
              label: category.label, value: category.label
            }
          ))
          setSelectedJobCategory(updatedData);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if(!jobData)
    setValue('jobTitle', '');
    getJobCategoryData(value.jobType);
  }, [value.jobType, setValue]);

  // const onSubmit = handleSubmit(async (data) => {
  //   if (!value.latitude || !value.longitude) {
  //     Alert.alert('Error', 'Please Select Job Location');
  //     return;
  //   }
  //   try {
  //     const response = await createLabourJob(data);
  //     if (response) {
  //       Alert.alert('Success', jobData ? 'Update success!' : 'Create success!');
  //       reset();
  //       navigation.navigate('JobList');
  //     } else {
  //       Alert.alert('Error', 'Job Post Creation Failed');
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // });

  const onSubmit = handleSubmit (async data => {
    console.log('form data=======>', data);
    const result = await dispatch(createLabourJob(data));
    console.log('result======================>>>>>>>>>>>>', result);
    if (createLabourJob.fulfilled.match(result))
    {
      showAlert('Job Added Successfully', 'success');
      navigation.replace('LabourJobScreen', {screen: 'LabourJobList'});
    }else{
      showAlert('Failed To Add Job', 'error');
    }

  });

  const onSubmitUpdate = handleSubmit (async data => {
    
    const result = await dispatch(updateLabourJob({jobId: jobData.jobPostId, data}));
    

    if (updateLabourJob.fulfilled.match(result))
    {
      showAlert('Job Updated Successfully', 'success');
      // navigation.replace('LabourJobScreen', {
      //   screen: 'JobDetails',
      //   params: {jobId: jobData.jobPostId, selfCoordinates: selfCoordinates},
      // });
      navigation.replace('Main', {screen: 'LabourJobList'});
    }else{
      showAlert('Failed To Update Job', 'error');
    }

  });


  const employmentType = [
    {value: 'Full Time', label: 'Full Time'},
    {value: 'Part Time', label: 'Part Time'},
    {value: 'On Demand', label: 'On Demand'},
  ];

  const jobStatus = [
    {value: 'Open', label: 'Open'},
    {value: 'Close', label: 'Close'},
  ];

  const salaryTypes = [
    {
      label: 'Hourly',
      icon: 'alarm',
    },
    {
      label: 'Daily',
      icon: 'calendar',
    },
    {
      label: 'Weekly',
      icon: 'calendar',
    },
    {
      label: 'Monthly',
      icon: 'calendar',
    },
  ];

  const handleSelectCurrentLocation = coords => {
    // setLoading(true);
    setSelfLocationLoading(true);
    setCoordinates(coords);
    if (coords.lat && coords.lng) {
      setTimeout(() => {
        setSelfLocationLoading(false);
        setLocationSelected('Current Location');
        setValue('latitude', coords.lat);
        setValue('longitude', coords.lng);
      }, 1000);
    }
  };

  const handleMarkerDragEnd = e => {
    const newCoords = e.nativeEvent.coordinate;
    setCoordinates({lat: newCoords.latitude, lng: newCoords.longitude});
  };

  const onConfirm = () => {
    if (coordinates.lat && coordinates.lng) {
      setOpen(false);
      Alert.alert(
        'Location Selected',
        `Lat: ${coordinates.lat}, Lng: ${coordinates.lng}`,
      );
      setValue('latitude', coordinates.lat);
      setValue('longitude', coordinates.lng);
      setLocationSelected('Map Location');
    } else {
      Alert.alert('Error', 'Please select a location on the map.');
    }
  };

  const handleChooseMap = () => {
    setMapLocationLoading(true);
    setTimeout(() => {
      setMapLocationLoading(false);
      setOpen(true);
    },1000);
    
  };

  const [benefitInputValue, setBenefitInputValue] = useState('');
  const [requirementInputValue, setRequirementInputValue] = useState('');
  const [responsibilityInputValue, setResponsibilityInputValue] = useState('');

  const handleAddBenefit = () => {
    if (benefitInputValue && !value.benefits.includes(benefitInputValue)) {
      setValue('benefits', [...value.benefits, benefitInputValue]);
      setBenefitInputValue('');
    }
  };

  const handleAddRequirement = () => {
    if (
      requirementInputValue &&
      !value.requirements.includes(requirementInputValue)
    ) {
      setValue('requirements', [...value.requirements, requirementInputValue]);
      setRequirementInputValue('');
    }
  };

  const handleAddResponsibility = () => {
    if (
      responsibilityInputValue &&
      !value.responsibilities.includes(responsibilityInputValue)
    ) {
      setValue('responsibilities', [
        ...value.responsibilities,
        responsibilityInputValue,
      ]);
      setResponsibilityInputValue('');
    }
  };

  return (
    <View
      style={{
        flex: 1,
        padding: 20,
        backgroundColor: colors.surface,
        borderRadius: 14,
      }}>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>Job Type</Text>
        <Controller
          name="jobType"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <SingleDropdownComponent
              options={jobTypeOption}
              value={value}
              setValue={onChange}
              containerColor='transparent'
              inputBorderRadius={6}
              inputBorderWidth={1}
            />
          )}
        />
      </View>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>Job Title</Text>
        <Controller
          name="jobTitle"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <SingleDropdownComponent
              options={seletedJobCategory}
              value={value}
              setValue={onChange}
              containerColor='transparent'
              inputBorderRadius={6}
              inputBorderWidth={1}
            />
          )}
        />
      </View>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>Company Name</Text>
        <Controller
          name="companyName"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <>
            <TextInput
              placeholder="Company Name"
              mode='outlined'
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
        <Text style={[styles.title, {color: colors.text}]}>Location</Text>
        <Controller
          name="location"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <>
            <TextInput
              placeholder="Address"
               mode='outlined'
               error={!!error}
               textColor={colors.text}
               activeOutlineColor={colors.text}
              placeholderTextColor={colors.placeholder}
              value={value}
              onChangeText={onChange}
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
      <Button
        style={styles.button}
        mode="contained"
        onPress={() => handleSelectCurrentLocation(selfCoordinates)}
        loading={selfLocationLoading}
        disabled={locationSelected === 'Current Location'}>
        {locationSelected === 'Current Location'
          ? 'Current Location Selected'
          : 'Select Current Location'}
      </Button>
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleChooseMap}
        disabled={locationSelected === 'Map Location'}
        loading={mapLocationLoading}>
        {locationSelected === 'Map Location'
          ? 'Location Selected'
          : 'Select on Map'}
      </Button>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Employment Type
        </Text>
        <Controller
          name="employmentType"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {employmentType.map(type => (
                <View
                  key={type.value}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value={type.value} />
                  <Text style={{color: colors.text}}>{type.label}</Text>
                </View>
              ))}
            </RadioButton.Group>
          )}
        />
      </View>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>How to Apply</Text>
        <Controller
          name="howToApply"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <>
            <TextInput
              placeholder="How to Apply"
              placeholderTextColor={colors.placeholder}
              textColor={colors.text}
              activeOutlineColor={colors.text}
              mode='outlined'
               error={!!error}
              value={value}
              onChangeText={onChange}
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
        <Text style={[styles.title, {color: colors.text}]}>Salary</Text>
        <Controller
          name="salary.type"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <View style={styles.salaryContainer}>
              {salaryTypes.map(item => (
                <TouchableOpacity
                  key={item.label}
                  style={[
                    styles.salaryOption,
                    item.label === value && {
                      borderColor: colors.text,
                      borderWidth: 2,
                    },
                  ]}
                  onPress={() => onChange(item.label)}>
                  <Ionicons name={item.icon} size={24} color={colors.text} />
                  <Text style={[styles.salaryText, {color: colors.text}]}>
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        />
        <Controller
          name="salary.price"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <>
            <TextInput
              textColor={colors.text}
              activeOutlineColor={colors.text}
              mode='outlined'
               error={!!error}
              keyboardType="numeric"
              value={String(value)}
              onChangeText={onChange}
              left={
                <TextInput.Affix  text={<Text style={{color: colors.text}}>₹</Text>}/>
              }
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
          Job Description
        </Text>
        <Controller
          name="jobDescription"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <>
            <TextInput
              placeholder="Job Description"
              placeholderTextColor={colors.placeholder}
              textColor={colors.text}
              activeOutlineColor={colors.text}
              mode='outlined'
               error={!!error}
              value={value}
              onChangeText={onChange}
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
        <Text style={[styles.title, {color: colors.text}]}>Benefits:</Text>
        {value.benefits.map((benefit, index) => (
          <Chip
            key={index}
            style={{marginBottom: 4}}
            onClose={() =>
              setValue(
                'benefits',
                value.benefits.filter((_, i) => i !== index),
              )
            }>
            {benefit}
          </Chip>
        ))}
        <TextInput
          placeholder="Add Benefit"
          placeholderTextColor={colors.placeholder}
          textColor={colors.text}
              activeOutlineColor={colors.text}
          mode='outlined'
          // error={!!error}
          value={benefitInputValue}
          onChangeText={setBenefitInputValue}
          onSubmitEditing={handleAddBenefit}
          style={[
            styles.textInput,
            {color: colors.text, borderColor: colors.text},
          ]}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleAddBenefit}>
          Add Benefit
        </Button>
      </View>

      <View>
        <Text style={[styles.title, {color: colors.text}]}>Requirements:</Text>
        {value.requirements.map((req, index) => (
          <Chip
            key={index}
            style={{marginBottom: 4}}
            onClose={() =>
              setValue(
                'requirements',
                value.requirements.filter((_, i) => i !== index),
              )
            }>
            {req}
          </Chip>
        ))}
        <TextInput
          placeholder="Add Requirement"
          placeholderTextColor={colors.placeholder}
          textColor={colors.text}
              activeOutlineColor={colors.text}
          mode='outlined'
              //  error={!!error}
          value={requirementInputValue}
          onChangeText={setRequirementInputValue}
          onSubmitEditing={handleAddRequirement}
          style={[
            styles.textInput,
            {color: colors.text, borderColor: colors.text},
          ]}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleAddRequirement}>
          Add Requirement
        </Button>
      </View>

      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Responsibilities:
        </Text>
        {value.responsibilities.map((resp, index) => (
          <Chip
            key={index}
            style={{marginBottom: 4}}
            onClose={() =>
              setValue(
                'responsibilities',
                value.responsibilities.filter((_, i) => i !== index),
              )
            }>
            {resp}
          </Chip>
        ))}
        <TextInput
          placeholder="Add Responsibility"
          placeholderTextColor={colors.placeholder}
          textColor={colors.text}
              activeOutlineColor={colors.text}
          mode='outlined'
              //  error={!!error}
          value={responsibilityInputValue}
          onChangeText={setResponsibilityInputValue}
          onSubmitEditing={handleAddResponsibility}
          style={[
            styles.textInput,
            {color: colors.text, borderColor: colors.text},
          ]}
        />
        <Button
          style={styles.button}
          mode="contained"
          onPress={handleAddResponsibility}>
          Add Responsibility
        </Button>
      </View>
      <View>
        <Text style={[styles.title, {color: colors.text}]}>
          Application Deadline
        </Text>
        <Controller
          name="applicationDeadline"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
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
        <Text style={[styles.title, {color: colors.text}]}>Job Status</Text>
        <Controller
          name="jobStatus"
          control={control}
          render={({field: {onChange, value}, fieldState: { error }}) => (
            <RadioButton.Group onValueChange={onChange} value={value}>
              {jobStatus.map(status => (
                <View
                  key={status.value}
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <RadioButton value={status.value} />
                  <Text style={{color: colors.text}}>{status.label}</Text>
                </View>
              ))}
            </RadioButton.Group>
          )}
        />
      </View>

      <Button
        buttonColor={colors.backdrop}
        style={{marginTop: 20}}
        mode="contained"
        onPress={jobData ? onSubmitUpdate : onSubmit}
        disabled={isSubmitting}>
        {jobData ? 'Update Job' : 'Create Job'}
      </Button>

      <Portal>
        <Dialog visible={open} onDismiss={() => setOpen(false)}>
          <Dialog.Title>Select Location</Dialog.Title>
          <Dialog.Content>
            <MapView
              style={{height: 300}}
              initialRegion={{
                latitude: jobData?.latitude || selfCoordinates.lat,
                longitude: jobData?.longitude  || selfCoordinates.lng,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              onMapReady={() => console.log('Map is ready')}>
              <Marker
                coordinate={{
                  latitude: jobData?.latitude || selfCoordinates.lat,
                  longitude: jobData?.longitude  || selfCoordinates.lng,
                }}
                draggable
                onDragEnd={handleMarkerDragEnd}
              />
            </MapView>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setOpen(false)}>Cancel</Button>
            <Button onPress={onConfirm}>Confirm</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

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
    border: '1px solid white'
  },
  button: {
    marginBottom: 16,
  },
  helperText:{
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
});
