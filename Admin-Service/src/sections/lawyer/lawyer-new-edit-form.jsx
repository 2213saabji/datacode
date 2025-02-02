/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable import/no-unresolved */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import { Button, TextField, Typography } from '@mui/material';

import { uploadLMSFileInAWSS3, deleteLMSFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { useGetServices } from 'src/api/service';
import { useGetSubServices } from 'src/api/sub-service';
import { createDriverProfile, updateDriverProfile } from 'src/api/lawyer';
import { COURT_TYPES,SERVICE_AREA, TEHSIL_OPTIONS ,VILLAGE_OPTIONS,DISTRICT_OPTIONS,SERVICE_PROVIDER_TYPE} from 'src/_mock/_service';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
  // RHFAutocomplete,
} from 'src/components/hook-form';

export default function LawyerNewEditForm({ currentDriver }) {
  const navigate = useNavigate();
  const theme = useTheme();
  const [show, setShow] = useState({
    Profile: true,
  });
  console.log(setShow);

  const lawyerId = currentDriver?.data.providerId;
  const [fileData, setFileData] = useState({
    name: '',
    url: '',
  });
  const { services: serviceList } = useGetServices();

  const ServiceListArr = serviceList?.data || [];
  console.log(ServiceListArr);

  const ServiceData = ServiceListArr.filter((list) => list.userRoleId === 31) // Filter out services with userRoleId of 31
  .map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));

  const ServiceDataForOptions = ServiceData.map((option) => option.value);

  const { subservices: subserviceList } = useGetSubServices();

  const SubServiceListArr = subserviceList?.data || [];
  const SubServiceData = SubServiceListArr.map((list) => ({
    value: list.issueId,
    label: list.issueType,
  }));

  const SubServiceDataForOptions = SubServiceData.map((option) => option.value);
  console.log(SubServiceData);

  const { enqueueSnackbar } = useSnackbar();
  const { user: userAuthToken } = useAuthContext();

  const { users: userList } = useGetUsers(userAuthToken?.accessToken);

  const usersListArr = useMemo(
    () =>
      userList?.users
        ? userList.users.filter((user) => user.userRoleId === 31 && user.UserProfile)
        : [],
    [userList]
  );

  const UserNameData = usersListArr.map((list) => ({
    value: list.userId,
    label: `${list.UserProfile?.firstName || ''} ${list.UserProfile?.lastName || ''}`,
    providerName: `${list.UserProfile?.firstName || ''} ${list.UserProfile?.lastName || ''}`,
  }));

  const UserNameDataForOptions = UserNameData.map((option) => option.value);

  const [uploadBtn, setUploadBtn] = useState(false);

  const ProfileSchema = Yup.object().shape({
    // userId: Yup.number().required('UserName is Required'),
    // serviceId: Yup.string().required('Service is Required'),
    // issueId: Yup.number().required('Issue Details ID required'),
    // fullName: Yup.string().required('Full Name is required'),
    // experienceLevel: Yup.string().required('Experience Level is required'),
    // registrationNumber: Yup.string().required('registrationNumber is required'),
    // serviceArea: Yup.string().required('Service Area is required'),
    // licenseCertification: Yup.string().required('licenseCertification is required'),
    // serviceDescription: Yup.string().required('Service Description is required'),
    // documentPdf:Yup.string().required('Document PDF is Required'),
    // rating: Yup.string().required('Rating is required'),
    // approvalStatus: Yup.boolean().required('Approval Status is Required'),
    // registrationImageUrl:Yup.mixed().required('Registration Image is required')
  });

  const defaultValues = useMemo(
    () => ({
      providerId: currentDriver?.data.providerId || null,
      userId: currentDriver?.data.userId || null,
      serviceId: currentDriver?.data.serviceId || null,
      issueId: currentDriver?.data.issueId || null,
      providerName: currentDriver?.data.providerName || '',
      providerType: currentDriver?.data.providerType || '',
      experienceLevel: currentDriver?.data.experienceLevel || '',
      registrationNumber: currentDriver?.data.registrationNumber || '',
      registrationImageUrl: `${currentDriver?.data.registrationImageUrl || ''}`,
      serviceArea: currentDriver?.data.serviceArea || '',
      licenseCertification: currentDriver?.data.licenseCertification || '',
      serviceDescription: currentDriver?.data.serviceDescription || '',
      serviceAreaState: currentDriver?.data.serviceAreaState || '',
      serviceAreaDistrict: currentDriver?.data.serviceAreaDistrict || '',
      serviceAreaTehsil: currentDriver?.data.serviceAreaTehsil || '',
      serviceAreaCity: currentDriver?.data.serviceAreaCity || '',
      documentPdf: `${currentDriver?.data.documentPdf || ''}`,
      rating: currentDriver?.data.rating || '',
      approvalStatus: currentDriver?.data.approvalStatus || true,
    }),
    [currentDriver]
  );

  const methods = useForm({
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

  const { handleSubmit, reset, setValue, watch } = methods;
  const value1 = watch();
  const value = watch();
  useEffect(() => {
    if (currentDriver) {
      reset(defaultValues);
    }
  }, [currentDriver, defaultValues, reset]);

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createDriverProfile(data);
      console.log(response);

      if (response) {
        enqueueSnackbar('Lawyer Profile created successfully', { variant: 'success' });
        navigate('/dashboard/lawyer');
      } else {
        enqueueSnackbar('Failed to create Lawyer profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting Lawyer profile:', error);
      enqueueSnackbar('An error occurred while creating Lawyer profile', { variant: 'error' });
    }
  });

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await updateDriverProfile(lawyerId, data);
      if (response) {
        enqueueSnackbar('Lawyer Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/lawyer/${lawyerId}`);
      } else {
        enqueueSnackbar('Failed to update Lawyer profile', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error updating Lawyer profile:', error);
      enqueueSnackbar('An error occurred while updating Lawyer profile', { variant: 'error' });
    }
  });
  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadLMSFileInAWSS3(formData);
        console.log(response);
        const imageUrl = response.data.data;

        if (imageUrl) {
          console.log(imageUrl);
          setValue('registrationImageUrl', imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [setValue, enqueueSnackbar]
  );
  const handleDropSingleFile = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        uploadImage(file);
      }
    },
    [uploadImage]
  );
  const deleteImage = useCallback(
    async (name) => {
      const dataToSend = { url: value[name].preview };
      await deleteLMSFileFromAWSS3(dataToSend)
        .then((data) => {
          setValue(name, null);
          console.log(data);
          enqueueSnackbar('Deleted successfully', { variant: 'success' });
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
          enqueueSnackbar('Error while deleting', { variant: 'error' });
        });

      // console.log("values.preview =>", values.preview);
    },
    [setValue, enqueueSnackbar, value]
  );
  const handleFileChanges = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setFileData({
        name: file.name,
        url,
      });

      // Set value in the form for RHFTextField
      setValue('documentPdf', file.name);
    }
  };
  return (
    <div>
      {show.Profile && (
        <FormProvider
          methods={methods}
          onSubmit={currentDriver ? onSubmitProfileUpdate : onSubmitProfile}
        >
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <Box
                  rowGap={3}
                  columnGap={2}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
                    sm: 'repeat(2, 1fr)',
                  }}
                >
                  <RHFAutocomplete
                    name="serviceId"
                    label="Service Name"
                    options={ServiceDataForOptions}
                    getOptionLabel={(value3) => {
                      const service = ServiceData.find((option) => option.value === value3);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFAutocomplete
                    name="issueId"
                    label="Issue Name"
                    options={SubServiceDataForOptions}
                    getOptionLabel={(value3) => {
                      const service = SubServiceData.find((option) => option.value === value3);
                      return service ? service.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Issue Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFAutocomplete
                    name="providerName"
                    label="full Name"
                    value={value1.userId}
                    onChange={(event, value3) => {
                      setValue('userId', value3);
                      console.log(value3);
                      const user = UserNameData.find((option) => option.value === value3);
                      if (user) {
                        setValue('providerName', user.providerName);
                      }
                    }}
                    options={UserNameDataForOptions}
                    getOptionLabel={(value3) => {
                      const user = UserNameData.find((option) => option.value === value3);
                      return user ? user.label : '';
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Full Name"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  {/* <RHFTextField
                    name="providerName"
                    label="Provider Name"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  {/* <RHFTextField
                    name="providerType"
                    label="Provider Type"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                   <RHFAutocomplete
                    name="providerType"
                    label="Provider Type"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={SERVICE_PROVIDER_TYPE.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Provider Type"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFTextField
                    name="experienceLevel"
                    label="Experience Level"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  <RHFTextField
                    name="registrationNumber"
                    label="Registration Number"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />
                  <RHFAutocomplete
                    name="serviceArea"
                    label="servic eArea"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={COURT_TYPES.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Area"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFTextField
                    name="licenseCertification"
                    label="License Certification"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="serviceDescription"
                    label="Service Description"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFAutocomplete
                    name="serviceAreaState"
                    label="serviceAreaState"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={SERVICE_AREA.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service State"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFAutocomplete
                    name="serviceAreaDistrict"
                    label="serviceAreaDistrict"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={DISTRICT_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service District"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFAutocomplete
                    name="serviceAreaTehsil"
                    label="serviceAreaTehsil"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={TEHSIL_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service Tehsil"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                  <RHFAutocomplete
                    name="serviceAreaCity"
                    label="serviceAreaCity"
                    placeholder=" Choose Payment Method"
                    fullWidth
                    options={VILLAGE_OPTIONS.map((option) => option.label)}
                    getOptionLabel={(option) => option}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Service City"
                        InputProps={{
                          ...params.InputProps,
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                            fontSize: '35px',
                          },
                        }}
                        InputLabelProps={{
                          style: {
                            color: theme.palette.mode === 'light' ? 'black' : 'white',
                          },
                        }}
                      />
                    )}
                  />
                 
                  <RHFTextField
                    name="documentPdf"
                    label="Document Pdf"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  <RHFTextField
                    name="rating"
                    label="Rating"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  />

                  {/* <RHFTextField
                    name="approvalStatus"
                    label="Approval Status"
                    InputProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                        fontSize: '35px',
                      },
                    }}
                    InputLabelProps={{
                      style: {
                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                      },
                    }}
                  /> */}
                  <Grid container spacing={2} sx={{ mb: 3 }}>
                    <Grid item xs={12}>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={handleFileChanges}
                        style={{ display: 'none' }}
                        id="pdf-upload"
                      />
                      <label htmlFor="pdf-upload">
                        <Button variant="contained" component="span">
                          Upload PDF
                        </Button>
                      </label>
                      {fileData.url && (
                        <div>
                          <Typography variant="body1">Selected PDF: {fileData.name}</Typography>
                          <a href={fileData.url} target="_blank" rel="noopener noreferrer">
                            Preview PDF
                          </a>
                        </div>
                      )}
                    </Grid>
                  </Grid>
                </Box>
                <Grid
                  container
                  spacing={2}
                  style={{ paddingLeft: 16, paddingRight: 16, paddingTop: 16, paddingBottom: 16 }}
                >
                  {/* <Grid
                    item
                    xs={8}
                    md={6}
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'flex-start',
                      paddingLeft: 8,
                    }}
                  > */}
                  <Box>
                    <Typography variant="subtitle2">Registration Image</Typography>
                    <RHFUpload
                      thumbnail
                      disabled={uploadBtn}
                      name="registrationImageUrl"
                      maxSize={8388608}
                      onDrop={(file) => handleDropSingleFile(file, 'registrationImageUrl')}
                      onDelete={() => deleteImage('registrationImageUrl')}
                      onRemove={(inputFile) => {
                        setValue(
                          'registrationImageUrl',
                          value.licenseNumberBackImage?.filter((file) => file !== inputFile),
                          { shouldValidate: true }
                        );
                        if (value.licenseNumberBackImage?.length === 1) {
                          setUploadBtn(false);
                        }
                      }}
                      onRemoveAll={() => {
                        setValue('registrationImageUrl', [], { shouldValidate: true });
                        setUploadBtn(false);
                        setValue('registrationImageUrl', '');
                      }}
                    />
                  </Box>
                  {/* </Grid> */}
                </Grid>
                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                  <Button
                    variant="contained"
                    onClick={() => navigate('/dashboard/LMSUserProfile/new')}
                  >
                    Back
                  </Button>
                  <LoadingButton
                    type="submit"
                    variant="contained"
                    onClick={!currentDriver}
                    loading={false}
                  >
                    {!currentDriver ? 'Create Lawyer' : 'Save Changes'}
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      )}
    </div>
  );
}

LawyerNewEditForm.propTypes = {
  currentDriver: PropTypes.object,
};
