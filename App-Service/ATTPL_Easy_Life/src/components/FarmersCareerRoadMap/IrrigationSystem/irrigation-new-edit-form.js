import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';

import React, {useMemo, useState, useEffect, useCallback} from 'react';
import {useForm, Controller} from 'react-hook-form';
import {useSelector, useDispatch} from 'react-redux';
import {TabView, TabBar} from 'react-native-tab-view';
import {selectTheme} from '../../../redux/selectors';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';

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
import {createModernAgriTool} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/CombineHarvesterSlice';
import {createCultivationTool} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/CultivationToolSlice';
import {createIrrigationTool} from '../../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/IrrigationToolSlice';
// import { getJobTypeCategory, useGetJobTypes, createLabourJob, UpdateJob } from 'src/api/labour_job';

import {useNavigation} from '@react-navigation/native';
import {color} from 'react-native-elements/dist/helpers';

export default function IrrigationNewEditForm({
  jobData,
  currentTool,
  navigation,
}) {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);

  const {showAlert} = useCustomAlert();

  const [currentImageTab, setCurrentImageTab] = useState('image1');
  const [thumbnail, setThumbnail] = useState(
    currentTool?.data?.imageUrl?.image1 || '',
  );
  const [full, setFull] = useState(currentTool?.data?.imageUrl?.image2 || '');

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'image1', title: 'Front Image'},
    {key: 'image2', title: 'Side Image'},
  ]);

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
    type: Yup.string().required('Type is required'),
    capacityLitresPerHour: Yup.number().required('Capacity is required'),
    coverageAreaHectares: Yup.number().required('Condition is required'),
    yearInstalled: Yup.mixed().required('Installed Year is required'),
    condition: Yup.string().required('Condition is required'),
    price: Yup.number().required('Price is required'),
    brand: Yup.string().required('Brand is required'),
    controlSystem: Yup.string().required('Control System is required'),
    image1: Yup.string().required('Image is required'),
    image2: Yup.string().required('Image is required'),
    nozzleType: Yup.string().required('Nozzle Type is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      sellerOwnerId: currentTool?.data.sellerOwnerId || null,
      brand: currentTool?.data.brand || '',
      type: currentTool?.data.type || '',
      capacityLitresPerHour: currentTool?.data.capacityLitresPerHour || null,
      coverageAreaHectares: currentTool?.data.coverageAreaHectares || null,
      yearInstalled: currentTool?.data.yearInstalled || null,
      condition: currentTool?.data.condition || '',
      price: currentTool?.data.price || 0,
      controlSystem: currentTool?.data.controlSystem || '',
      image1: currentTool?.data?.imageUrl?.image1 || '',
      image2: currentTool?.data?.imageUrl?.image2 || '',
      nozzleType: currentTool?.data.nozzleType || '',
    }),
    [currentTool],
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
    if (currentTool) {
      reset(defaultValues);
    }
  }, [currentTool, defaultValues, reset]);

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
      sellerOwnerId: 1,
      imageUrl: {
        image1: value.image1,
        image2: value.image2,
      },
    };
    const result = await dispatch(createIrrigationTool(updatedData));
    // console.log('NEW result======================>>>>>>>>>>>>', result);
    if (createIrrigationTool.fulfilled.match(result)) {
      showAlert('Tool Added Successfully', 'success');
      navigation.replace('IrrigationTool');
    } else {
      showAlert('Failed To Add Tool', 'error');
    }
  });

  const onSubmitUpdate = handleSubmit(async data => {
    const result = await dispatch(
      updateLabourJob({jobId: jobData.jobPostId, data}),
    );

    if (updateLabourJob.fulfilled.match(result)) {
      showAlert('Job Updated Successfully', 'success');
      // navigation.replace('LabourJobScreen', {
      //   screen: 'JobDetails',
      //   params: {jobId: jobData.jobPostId, selfCoordinates: selfCoordinates},
      // });
      navigation.replace('Main', {screen: 'LabourJobList'});
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

  const irrigationSystems = [
    {value: 'Surface Irrigation', label: 'Surface Irrigation'},
    {value: 'Sprinkler Irrigation', label: 'Sprinkler Irrigation'},
    {value: 'Drip Irrigation', label: 'Drip Irrigation'},
    {value: 'Subirrigation', label: 'Subirrigation'},
    {value: 'Manual Irrigation', label: 'Manual Irrigation'},
    {value: 'Automated Irrigation', label: 'Automated Irrigation'},
  ];

  const framerProductConditions = [
    {value: 'New', label: 'New'},
    {value: 'Used', label: 'Used'},
    {value: 'Refurbished', label: 'Refurbished'},
  ];

  const cultivationEquipSize = [
    {value: 'Small', label: 'Small'},
    {value: 'Medium', label: 'Medium'},
    {value: 'Large', label: 'Large'},
  ];

  const nozzleType = [
    {value: 'Adjustable', label: 'Adjustable'},
    {value: 'Fixed', label: 'Fixed'},
  ];

  const controlSystem = [
    {value: 'Manual', label: 'Manual'},
    {value: 'Automatic', label: 'Automatic'},
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
        <Text style={[styles.title, {color: colors.text}]}>Tool Type</Text>
        <Controller
          name="type"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <SingleDropdownComponent
              options={irrigationSystems}
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
        <Text style={[styles.title, {color: colors.text}]}>Brand</Text>
        <Controller
          name="brand"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                placeholder="Brand"
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
        <Text style={[styles.title, {color: colors.text}]}>Capacity</Text>

        <Controller
          name="capacityLitresPerHour"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                textColor={colors.text}
                activeOutlineColor={colors.text}
                mode="outlined"
                error={!!error}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={onChange}
                right={
                  <TextInput.Affix
                    text={<Text style={{color: colors.text}}>lt/hr</Text>}
                  />
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
        <Text style={[styles.title, {color: colors.text}]}>Coverage Area</Text>

        <Controller
          name="coverageAreaHectares"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                textColor={colors.text}
                activeOutlineColor={colors.text}
                mode="outlined"
                error={!!error}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={onChange}
                right={
                  <TextInput.Affix
                    text={<Text style={{color: colors.text}}>hectare</Text>}
                  />
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
        <Text style={[styles.title, {color: colors.text}]}>Condition</Text>
        <Controller
          name="condition"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <SingleDropdownComponent
              options={framerProductConditions}
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
        <Text style={[styles.title, {color: colors.text}]}>Control System</Text>
        <Controller
          name="controlSystem"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <SingleDropdownComponent
              options={controlSystem}
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
        <Text style={[styles.title, {color: colors.text}]}>Nozzle Type</Text>
        <Controller
          name="nozzleType"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <SingleDropdownComponent
              options={nozzleType}
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
        <Text style={[styles.title, {color: colors.text}]}>
          Year of Manufacturing
        </Text>
        <Controller
          name="yearInstalled"
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

      {/* image */}

      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={handleIndexChange}
        renderTabBar={renderTabBar}
      />

      {/* image end */}

      <View>
        <Text style={[styles.title, {color: colors.text}]}>Price</Text>

        <Controller
          name="price"
          control={control}
          render={({field: {onChange, value}, fieldState: {error}}) => (
            <>
              <TextInput
                textColor={colors.text}
                activeOutlineColor={colors.text}
                mode="outlined"
                error={!!error}
                keyboardType="numeric"
                value={String(value)}
                onChangeText={onChange}
                left={
                  <TextInput.Affix
                    text={<Text style={{color: colors.text}}>₹</Text>}
                  />
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

      <Button
        buttonColor={colors.backdrop}
        style={{marginTop: 20}}
        mode="contained"
        onPress={currentTool ? onSubmitUpdate : onSubmit}
        disabled={isSubmitting}>
        {currentTool ? 'Save Tool Details' : 'Add Tool Detials'}
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
