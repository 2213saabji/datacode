import React, {useState, useMemo, useEffect, useCallback} from 'react';
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
import {useDispatch} from 'react-redux';
import {yupResolver} from '@hookform/resolvers/yup';
import DateTimePicker from '@react-native-community/datetimepicker';
import SingleDropdownComponent from '../../components/ReusableComp/SingleDropDown';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {
  createDoctorAppointment,
  updateDoctorAppointment,
} from '../../redux/slices/CMS/doctorappointmentbooking';
import Layout from '../layout/Layout';
import useFetchDoctors from './modul-fetch-doctor'; // Import the custom hook

const AppointmentSchema = Yup.object().shape({
  // Define your validation schema here
});

// Options
const ProblemTypeOptions = [
  {label: 'General Practitioner (GP)', value: 'GP'},
  {label: 'Dentist', value: 'Dentist'},
  // Add other options as needed
];

const statusOptions = [
  {label: 'Pending', value: 'Pending'},
  {label: 'Start', value: 'Start'},
  {label: 'Stop', value: 'Stop'},
];

const appointmentOptions = [
  {label: 'Clinic', value: 'Clinic'},
  {label: 'Remote', value: 'Remote'},
];

const DoctorAppointmentForm = ({currentappointment, navigation}) => {
  const {colors} = useSelector(selectTheme);
  const doctors = useFetchDoctors(); // Use the custom hook
  const dispatch = useDispatch();
  const {showAlert} = useCustomAlert();
  const user = useSelector(state => state?.auth?.user);

  const defaultValues = useMemo(
    () => ({
      problemTitle: currentappointment?.problemTitle || '',
      patientId: currentappointment?.patientId || user?.userId,
      doctorId: currentappointment?.doctorId || 82,
      problemDescription: currentappointment?.problemDescription || '',
      appointmentType: currentappointment?.appointmentType || '',
      appointmentPassStatus: currentappointment?.appointmentPassStatus || '',
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

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      methods.setValue('appointmentDate', date);
    }
    setShowDatePicker(false);
  };
  const fetchDoctors = useCallback(async () => {
    try {
      const result = await dispatch(fetchalldoctor());
      if (fetchalldoctor.fulfilled.match(result)) {
        setAldoctor(result.payload);
      } else {
        showAlert('Failed To Fetch Doctors');
      }
    } catch (error) {
      showAlert('Error', 'An unexpected error occurred');
    }
  }, []);

  useEffect(() => {
    fetchDoctors();
  }, []);

  const onSubmitUpdate = handleSubmit(
    async data => {
      try {
        const result = await dispatch(
          updateDoctorAppointment(
            {appointmentId: currentappointment?.doctorAppointmentId},
            {formData: data},
          ),
        );
        if (updateDoctorAppointment.fulfilled.match(result)) {
          console.log(result.payload);
          showAlert('Appointment Updated Successfully', 'success');
          navigation.navigate('AppointmentList');
        } else {
          showAlert('Failed To Update Doctor Appointment');
        }
      } catch (error) {
        showAlert('Error', 'An unexpected error occurred');
      }
    },
    [currentappointment, dispatch, navigation, showAlert],
  );

  const onSubmit = handleSubmit(
    async data => {
      try {
        const result = await dispatch(createDoctorAppointment(data));
        if (createDoctorAppointment.fulfilled.match(result)) {
          showAlert('Appointment Created Successfully', 'success');
          navigation.navigate('AppointmentList');
        } else {
          showAlert('Failed To Create Doctor Appointment');
        }
      } catch (error) {
        showAlert('Error', 'An unexpected error occurred');
      }
    },
    [dispatch, navigation, showAlert],
  );

  return (
    <>
      <ScrollView style={styles.container}>
        <Image
          source={require('../../assets/BusinessCareerRoadmap/images/1.webp')}
          style={styles.horizontalImage}
        />
        {currentappointment && <Text>Edit Appointment</Text>}
        <View style={[styles.formContainer, {backgroundColor: colors.surface}]}>
          <FormProvider
            methods={methods}
            onSubmit={currentappointment ? onSubmitUpdate : onSubmit}>
            {!currentappointment && (
              <View style={styles.fieldContainer}>
                <Text style={[styles.title, {color: colors.text}]}>
                  Problem Type
                </Text>
                <Controller
                  name="problemType"
                  control={control}
                  render={({field: {onChange, value}}) => (
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
              </View>
            )}
            {/* {!currentappointment && (
              <View style={styles.fieldContainer}>
                <Text style={[styles.title, { color: colors.text }]}>Select Doctor</Text>
                <Controller
                  name="doctorId"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <SingleDropdownComponent
                      options={doctors?.map(doctor => ({
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
              </View>
            )} */}
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
                  name="appointmentPassStatus"
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
            {currentappointment?.appointmentType === 'remote' && (
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
            <View style={styles.fieldContainer}>
              <Text style={[styles.title, {color: colors.text}]}>
                Appointment Date
              </Text>
              <Button
                title="Select Date"
                onPress={() => setShowDatePicker(true)}
              />
              {showDatePicker && (
                <DateTimePicker
                  value={selectedDate}
                  mode="date"
                  display="default"
                  onChange={handleDateChange}
                />
              )}
              <Text style={[styles.textInput, {color: colors.text}]}>
                {selectedDate.toDateString()}
              </Text>
            </View>
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

export default DoctorAppointmentForm;
