import React, {useState, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {useForm, Controller, FormProvider} from 'react-hook-form';
import * as Yup from 'yup';
import {useNavigation} from '@react-navigation/native';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {
  createCandidateAppointment,
  fetchallCandidate,
  updateCandidateAppointment,
} from '../../redux/slices/CMS/candidateAppointment';
import Layout from '../layout/Layout';

const AppointmentSchema = Yup.object().shape({
  // Define your validation schema here
});

// Options
const ProblemTypeOptions = [
  {label: 'General Practitioner (GP)', value: 'GP'},
  {label: 'Dentist', value: 'Dentist'},
  // Add other options as needed
];

const CandidateAppointmentFrom = ({currentappointment}) => {
  const {colors} = useSelector(selectTheme);
  const [candidate, setAlCandidate] = useState([]);
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {showAlert} = useCustomAlert();
  const user = useSelector(state => state?.auth?.user);
  const selectedId = useSelector(state => state.selectedId);

  const statusOptions = [
    {label: 'In-Progress', value: 'in-progress'},
    {label: 'Open', value: 'open'},
    {label: 'Close', value: 'close'},
  ];

  const appointmentOptions = [
    {label: 'Office', value: 'office'},
    {label: 'Remote', value: 'remote'},
  ];

  const defaultValues = useMemo(
    () => ({
      problemTitle: currentappointment?.problemTitle || '',
      voterId: currentappointment?.voterId || user?.userId,
      candidateId: currentappointment?.candidateId || 40,
      problemDescription: currentappointment?.problemDescription || '',
      appointmentType: currentappointment?.appointmentType || '',
      appointmentStatus: currentappointment?.appointmentStatus || 'open',
      appointmentPassMeetingLink:
        currentappointment?.appointmentPassMeetingLink || '',
      appointmentDate: currentappointment?.appointmentDate || new Date(),
    }),
    [currentappointment, user?.userId],
  );

  const methods = useForm({
    resolver: yupResolver(AppointmentSchema),
    defaultValues,
  });

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: {isSubmitting},
  } = methods;
  const values = watch();

  useEffect(() => {
    if (currentappointment) {
      reset(defaultValues); // Update form values when currentappointment changes
    }
  }, [currentappointment, defaultValues, reset]);

  // useEffect(() => {
  //   if (currentappointment) {
  //     reset(defaultValues); // Reset form values when currentappointment changes
  //   }
  // }, [currentappointment, reset]);

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      methods.setValue('appointmentDate', date);
    }
    setShowDatePicker(false);
  };

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log('cjsnjnj');
        const result = await dispatch(fetchallCandidate());
        console.log('result', result);
        if (fetchallCandidate.fulfilled.match(result)) {
          setAlCandidate(result.payload);
        } else {
          showAlert('Failed To Fetch Doctors');
        }
      } catch (error) {
        showAlert('Error', 'An unexpected error occurred');
      }
    };
    fetchDoctors();
  }, []);

  const onSubmitUpdate = handleSubmit(
    async formData => {
      try {
        const result = await dispatch(
          updateCandidateAppointment({
            formData,
            appointmentId: currentappointment?.appointmentId,
          }),
        );
        if (updateCandidateAppointment.fulfilled.match(result)) {
          console.log('dataa==========im>', result.payload);
          showAlert('Appointment Updated Successfully', 'success');
          navigation.navigate('CandidateAppointmentScreen', {
            screen: 'CandidateAppointmentList',
          });
        } else {
          showAlert('Failed To Update Candidate Appointment');
        }
      } catch (error) {
        showAlert('Error', 'An unexpected error occurred');
      }
    },
    [dispatch, navigation],
  );
  const onSubmit = handleSubmit(
    async data => {
      console.log('Form data:', data);
      try {
        const result = await dispatch(createCandidateAppointment(data));
        console.log(result);
        if (createCandidateAppointment.fulfilled.match(result)) {
          showAlert('Appointment Created Successfully', 'success');
          navigation.navigate('CandidateAppointmentScreen', {
            screen: 'CandidateAppointmentList',
          });
        } else {
          showAlert('Failed To Create Candidate Appointment');
        }
      } catch (error) {
        console.log('err');
        showAlert('Error', 'An unexpected error occurred');
      }
    },
    [dispatch, navigation],
  );

  // const onSubmit = useCallback(async (data) => {
  //   try {

  //     console.log("data==>",defaultValues)
  //     const result = await dispatch(createCandidateAppointment (data));
  //     if (createCandidateAppointment.fulfilled.match(result)) {
  //       console.log("dataa==========>",result.payload)
  //       showAlert('Appointment Created Successfully', 'success');
  //       navigation.navigate('DoctorAppointmentScreen', { screen: 'AppointmentList' });
  //     } else {
  //       showAlert('Failed To Create Doctor Appointment');
  //     }
  //   } catch (error) {
  //     showAlert('Error', 'An unexpected error occurred');
  //   }
  // }, [dispatch, navigation]);

  return (
    <>
      <ScrollView style={styles.container}>
        {/* <Layout /> */}
        <Image
          source={require('../../assets/BusinessCareerRoadmap/images/1.webp')}
          style={styles.horizontalImage}
        />
        {currentappointment && <Text> Edit Appointment</Text>}
        <View style={[styles.formContainer, {backgroundColor: colors.surface}]}>
          <FormProvider
            methods={methods}
            onSubmit={currentappointment ? onSubmitUpdate : onSubmit}>
            {/* <FormProvider methods={methods} onSubmit={currentappointment ? onSubmitUpdate : onSubmit}> */}
            {/* { !currentappointment&&( <View style={styles.fieldContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Problem Type</Text>
            <Controller
              name="problemType"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SingleDropdownComponent
                  options={ProblemTypeOptions}
                  value={value}
                  setValue={onChange}
                  containerColor={colors.background}
                  inputBorderRadius={8}
                  inputBorderWidth={1}
                />
              )}
            />
          </View>)} */}
            {/* { !currentappointment&&( <View style={styles.fieldContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Select Candidate</Text>
            <Controller
              name="candidateId"
              control={control}
              render={({ field: { onChange, value } }) => (
                <SingleDropdownComponent
                  options={candidate?.map(doctor => ({
                    label: `${doctor?.UserProfile?.firstName} ${doctor?.UserProfile?.lastName}`,
                    value: doctor.userId,
                  }))}
                  value={value}
                  setValue={onChange}
                  containerColor={colors.background}
                  inputBorderRadius={8}
                  inputBorderWidth={1}
                />
              )}
            />
          </View>)} */}
            <View style={styles.fieldContainer}>
              <Text style={[styles.title, {color: colors.text}]}>
                Problem Title
              </Text>
              <Controller
                name="problemTitle"
                control={control}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    placeholder="Title"
                    placeholderTextColor={colors.placeholder}
                    value={value}
                    onChangeText={onChange}
                    style={[
                      styles.textInput,
                      {color: colors.text, borderColor: colors.text},
                    ]}
                  />
                )}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={[styles.title, {color: colors.text}]}>
                Problem Description
              </Text>
              <Controller
                name="problemDescription"
                control={control}
                render={({field: {onChange, value}}) => (
                  <TextInput
                    placeholder="Describe your problem"
                    placeholderTextColor={colors.placeholder}
                    value={value}
                    onChangeText={onChange}
                    style={[
                      styles.textInput,
                      {color: colors.text, borderColor: colors.text},
                    ]}
                    multiline
                  />
                )}
              />
            </View>
            <View style={styles.fieldContainer}>
              <Text style={[styles.title, {color: colors.text}]}>
                Appointment Type
              </Text>
              <Controller
                name="appointmentType"
                control={control}
                render={({field: {onChange, value}}) => (
                  <SingleDropdownComponent
                    options={appointmentOptions}
                    value={value}
                    setValue={onChange}
                    containerColor={colors.background}
                    inputBorderRadius={8}
                    inputBorderWidth={1}
                  />
                )}
              />
            </View>
            {currentappointment && (
              <View style={styles.fieldContainer}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Appointment Status
                </Text>
                <Controller
                  name="appointmentStatus"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <SingleDropdownComponent
                      options={statusOptions}
                      value={value}
                      setValue={onChange}
                      containerColor={colors.background}
                      inputBorderRadius={8}
                      inputBorderWidth={1}
                    />
                  )}
                />
              </View>
            )}
            {currentappointment?.appointmentType === 'Remote' && (
              <View style={styles.fieldContainer}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Meeting Link
                </Text>
                <Controller
                  name="appointmentPassMeetingLink"
                  control={control}
                  render={({field: {onChange, value}}) => (
                    <TextInput
                      placeholder="Meeting link"
                      placeholderTextColor={colors.placeholder}
                      value={value}
                      onChangeText={onChange}
                      style={[
                        styles.textInput,
                        {color: colors.text, borderColor: colors.text},
                      ]}
                    />
                  )}
                />
              </View>
            )}
            {/* <View style={styles.fieldContainer}>
            <Text style={[styles.title, { color: colors.text }]}>Appointment Date</Text>
             <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
             {showDatePicker && (
               <DateTimePicker
                value={selectedDate}
                 mode="date"
                 display="default"
                 onChange={handleDateChange}
              />
             )}
             <Text style={[styles.textInput, { color: colors.text }]}>{selectedDate.toDateString()}</Text>
           </View> */}
            <Button
              title={
                currentappointment ? 'Save Appointment' : 'Create Appointment'
              }
              onPress={currentappointment ? onSubmitUpdate : onSubmit}
              disabled={isSubmitting}
            />
          </FormProvider>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#dcdcdc',
    // padding: 3,
  },
  horizontalImage: {
    width: '100%',
    height: 200,
    marginTop: 5,
    marginBottom: 20,
  },
  formContainer: {
    margin: 10,
    padding: 20,
    borderRadius: 8,
  },
  fieldContainer: {
    marginBottom: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  textInput: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
});

export default CandidateAppointmentFrom;
