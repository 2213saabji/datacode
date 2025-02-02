/* eslint-disable no-nested-ternary */
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { useState, useEffect } from 'react';
// import { yupResolver } from '@hookform/resolvers/yup';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import PropertyForm from '../property-form-edit-view';

// import { useTheme } from '@mui/material/styles';
// import { Box, Card, Grid, Chip, Button, Typography } from '@mui/material';

// import { paths } from 'src/routes/paths';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { useAuthContext } from 'src/auth/hooks';
// import { createOrder } from 'src/api/exp_order';
// import { createJobApplication, updateJobApplication } from 'src/api/applyJob';
// import { Year, education, jobCategory, employmentType, experienceYears, majorFieldsForDoctoral, majorFieldsForPostGraduate, majorFieldsForUnderGraduate } from 'src/_mock/_jobApply';

// import { useSnackbar } from 'src/components/snackbar';
// import { LoadingScreen } from 'src/components/loading-screen';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// import FileInput from '../apply-for-job-fileInput';
// import ResumeUploadDialog from '../dialogue-box-resume-upload';

export default function CreateApplyForJob() {
  // const { enqueueSnackbar } = useSnackbar();
  // const { user } = useAuthContext();
  // const [resumeUploadStatus, setresumeUploadStatus] = useState(false);
  // const [files, setFiles] = useState([]);

  // const theme = useTheme();
  // const upload = useBoolean();
  // const [newVoterDetailsPhase, setNewVoterDetailsPhase] = useState({ Phase0: true, Phase1: false , paymentSlip:false , loadingPhase:false })
  // const UserDetailsSchemaPhase0 = Yup.object().shape({
  //   firstName: Yup.string().required('First Name is required'),
  //   lastName: Yup.string().required('Last Name is required'),
  //   email: Yup.string().required('Email is required'),
  //   phoneNumber: Yup.string()
  //     .matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits')
  //     .required('Phone Number is required'),
  //   employmentType: Yup.string().required('Employment Type is required'),
  //   educationLevel: Yup.string().required('Education Level is required'),
  //   majorFieldOfStudy: Yup.string(),
  //   percentageOrGrade: Yup.string().required('Percentage is required'),
  //   yearOfPostGraduation: Yup.number().required('Year of Graduation is required'),
  //   yearsOfWorkExperience: Yup.number().required('Year of Work Experience is required'),
  //   jobCategory: Yup.string().required('Job Category is required'),
  //   skills: Yup.array().of(Yup.string().required('Skill is required'))
  //     .required('Skills are required')
  //     .min(1, 'At least one skill is required'),
  // });
  // const defaultValuesUserDetailsPhase0 = {
  //   firstName: '',
  //   lastName: '',
  //   email: '',
  //   phoneNumber: '',
  //   employmentType: '',
  //   educationLevel: '',
  //   majorFieldOfStudy: '',
  //   percentageOrGrade: '',
  //   yearOfPostGraduation: '',
  //   yearsOfWorkExperience: '',
  //   jobCategory: '',
  //   skills: [],
  //   status:"Submitted"
  // };
  // const userDetailsMethodsPhase0 = useForm({
  //   resolver: yupResolver(UserDetailsSchemaPhase0),
  //   defaultValuesUserDetailsPhase0,
  // });
  // // const checkResumeUpload = useCallback(() => {
  // //   if (files.length === 0 || Object.keys(files[0]).length === 0)
  // //     setresumeUploadStatus(true);
  // // }, [files])

  // const { handleSubmit: handleSubmitUserDetailsPhase0, reset: resetUserDetailsPhase0, watch: UserDetailsPhase0Watch, setValue: setresetUserDetailsPhase0Value, control } = userDetailsMethodsPhase0;
  // const value = UserDetailsPhase0Watch();

  // let bool = true;
  // const onSubmitUserDetailsPhase0 = handleSubmitUserDetailsPhase0(async (data) => {
  //   try {
  //     if (bool) {
  //       bool = false;
  //       setTimeout(() => {
  //         bool = true
  //       }, 1000);
  //       if (files.length === 0 || Object.keys(files[0]).length === 0) {
  //         setresumeUploadStatus(true);
  //       }
  //       else {
  //         const newDataFormat = {
  //           ...data,
  //           resumeCV: files[0],
  //           paymentStatus: false,
  //           paymentDetails: null,
  //           status: "Submitted"
  //         }
  //         const response = createJobApplication(newDataFormat, user.accessToken)
  //         if (response) {
  //           resetUserDetailsPhase0();
  //           setFiles([]);
  //           setNewVoterDetailsPhase({ Phase0: false , Phase1: true , paymentSlip:false , loadingPhase:false })
  //         }
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     setNewVoterDetailsPhase({ Phase0: true , Phase1: false ,  paymentSlip:false , loadingPhase:false })
  //     enqueueSnackbar('Something went wrong.', { variant: 'error' });
  //   }
  // });

  // useEffect(() => {
  //   if (files.length > 0)
  //     setresumeUploadStatus(false)
  // }, [files.length])

  // const total_bill = '1000';

  // async function handleRedirectAndUpdate(res, orderId) {

  //   const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
  //   if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
  //     const newDataFormat = {
  //       paymentStatus: true,
  //       paymentDetails: {
  //         oderId:orderId,
  //         razorpayOrderId:razorpay_order_id,
  //         razorpayPaymentId:razorpay_payment_id,
  //         razorpaySignature:razorpay_signature
  //       },
  //     }
  //     // update order details
  //     const response = await updateJobApplication(user.userId,newDataFormat,user.accessToken);
  //     if (response) {

  //       // setShow({ emForm: false, otpForm: false, upiForm: false, pasForm: true });
  //       enqueueSnackbar('payment successfull', { variant: 'success' });
  //     } else {
  //       enqueueSnackbar('Failed payment', { variant: 'error' });
  //     }
  //   } else {
  //     enqueueSnackbar('Failed payment', { variant: 'error' });
  //   }

  // }

  // const pay = async () => {
  //   // create order
  //   const phone = localStorage.getItem('phone');
  //   const response = await createOrder({ amount: total_bill, phoneNumber: JSON.parse(phone) });
  //   const { key, amount, currency, orderId, order_id } = response.data;

  //   const options = {
  //     key,
  //     order_id,
  //     // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
  //     amount,
  //     currency, // your 3 letter currency code
  //     name: 'Attpl Group', // project or transaction name
  //     description: 'Test Transaction',
  //     handler(res) {
  //       handleRedirectAndUpdate(res, orderId); // after payment completes on stripe this function will be called and you can do your stuff
  //     },
  //     prefill: {
  //       name: 'Attpl Group',
  //       email: 'Attpl@gmail.com',
  //       contact: '98123456778',
  //     },
  //     notes: {
  //       address: 'India',
  //     },
  //     theme: {
  //       // color: "#158993",
  //       color: '#0096FF',
  //     },
  //     method: {
  //       netbanking: true,
  //       card: true,
  //       upi: true,
  //       wallet: true,
  //       emi: true,
  //       bank_transfer: true,
  //       upi_intent: true,
  //       qr: false, // Disabling QR code payments
  //     },
  //   };
  // }

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', ml: 4 }}
      >
        Back
      </Button>
      <PropertyForm />

      {/* <Grid xs={12} md={8}>
          <Card sx={{
            p: { xs: 3, md: 5, },
            minWidth: { md: '600px' },
            maxWidth: { md: "600px" },
            mt: { xs: 5, md: 10 },
            mr: { md: 5 },
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            '@media (max-width:900px)': {
            }
          }}>
            {newVoterDetailsPhase.Phase0 &&
              <FormProvider methods={userDetailsMethodsPhase0} onSubmit={onSubmitUserDetailsPhase0}>
                <RHFTextField
                  name="firstName"
                  label={
                    <span>
                      FIRST NAME<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="lastName"
                  label={
                    <span>
                      LAST NAME<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="email"
                  label={
                    <span>
                      EMAIL<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFTextField
                  name="phoneNumber"
                  label={
                    <span>
                      PHONE NO.<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="employmentType"
                  label={
                    <span>
                      EMPLOYMENT TYPE<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose a Employment Type"
                  fullWidth
                  options={employmentType.map((option) => option)}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="educationLevel"
                  label={
                    <span>
                      EDUCATION<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose a Education"
                  fullWidth
                  options={education.map((option) => option)}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                {(value.educationLevel === "Doctorate" || value.educationLevel === "Post Graduate" || value.educationLevel === "Under Graduate") &&
                  <RHFAutocomplete
                    name="majorFieldOfStudy"
                    label={
                      <span>
                        MAJOR FIELDS OF STUDY<span style={{ color: 'red' }}> *</span>
                      </span>
                    }
                    placeholder="Choose a Field of Study"
                    fullWidth
                    options={
                      value.educationLevel === "Doctorate" ? majorFieldsForDoctoral.map((option) => option) :
                        value.educationLevel === "Post Graduate" ? majorFieldsForPostGraduate.map((option) => option) :
                          value.educationLevel === "Under Graduate" ? majorFieldsForUnderGraduate.map((option) => option) : ""}
                    getOptionLabel={(option) => option}
                    sx={{
                      mt: 2,
                    }}
                    InputProps={{
                      style: { color: 'black' },
                    }}
                    InputLabelProps={{
                      style: { color: 'black' },
                    }}
                  />}
                <RHFTextField
                  name="percentageOrGrade"
                  label={
                    <span>
                      PERCENTAGE Or Grade<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="yearOfPostGraduation"
                  label={
                    <span>
                      YEAR OF Graduation<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose a Year"
                  fullWidth
                  options={Year.map((option) => option)}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="yearsOfWorkExperience"
                  label={
                    <span>
                      Work Experience<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  fullWidth
                  options={experienceYears.map((option) => option.value)}
                  getOptionLabel={(val) => {
                    const expYear = experienceYears.find((option) => option.value === val);
                    return expYear ? expYear.label : '';
                  }}
                  sx={{
                    mt: 2,
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />

                <RHFAutocomplete
                  name="jobCategory"
                  label={
                    <span>
                      JOB CATEGORY<span style={{ color: 'red' }}> *</span>
                    </span>
                  }
                  placeholder="Choose a Category"
                  fullWidth
                  options={jobCategory.map((option) => option)}
                  getOptionLabel={(option) => option}
                  sx={{
                    mt: 2,
                    mb: 2
                  }}
                  InputProps={{
                    style: { color: 'black' },
                  }}
                  InputLabelProps={{
                    style: { color: 'black' },
                  }}
                />
                <RHFAutocomplete
                  name="skills"
                  label="Skills"
                  placeholder="+ Skills"
                  multiple
                  freeSolo
                  sx={{ mb: 2 }}
                  options={[]}
                  getOptionLabel={(option) => option}
                  renderTags={(selected, getTagProps) =>
                    selected.map((option, index) => (
                      <Chip
                        {...getTagProps({ index })}
                        key={option}
                        label={option}
                        size="small"
                        color="info"
                        variant="soft"
                      />
                    ))
                  }
                />
                <FileInput

                  data={[
                    {
                      // name: 'UPLOAD RESUME',
                      filesCount: files.length,
                      icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
                    },
                  ]}
                  link={paths.dashboard.fileManager}
                  onOpen={upload.onTrue}
                  sx={{ mt: 2 }}
                />

                <ResumeUploadDialog open={upload.value} onClose={upload.onFalse} setFiles={setFiles} files={files} />
                {resumeUploadStatus && <Typography sx={{ color: "red", ml: 2, mt: 1 }}>Pls Upload Resume before Submit Form</Typography>}

                <Button
                  variant="contained"
                  size="large"
                  type="submit"
                  sx={{
                    mt: 2,
                    fontWeight: 1,
                    // ...bgGradient({
                    //   direction: '135deg',
                    //   startColor: theme.palette.primary.main,
                    //   endColor: theme.palette.primary.dark,
                    // }),
                    width: '100%',
                    fontSize: 20,
                  }}
                // disabled={userRoleId.length === 0}
                >
                  Next
                </Button>
              </FormProvider>
            }
          </Card>
        </Grid>
        { newVoterDetailsPhase.paymentSlip &&
          <Grid xs={12} md={8}>
          <Card sx={{
            p: { xs: 3, md: 5, },
            minWidth: { md: '600px' },
            maxWidth: { md: "600px" },
            mt: { xs: 5, md: 10 },
            mr: { md: 5 },
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            '@media (max-width:900px)': {
            }
          }}>
            <Typography>helo</Typography>
          </Card>
          </Grid>
        }
        {newVoterDetailsPhase.loadingPhase && <LoadingScreen/>} */}
    </>
  );
}
