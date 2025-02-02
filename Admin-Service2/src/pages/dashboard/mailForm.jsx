/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { Box, Select, Button, MenuItem, TextField, InputLabel, FormControl } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetAppointmentsCandidate } from 'src/api/appointment';

// ----------------------------------------------------------------------

export default function MailForm({ currentappointment }) {
  const [complaintEmail, setcomplaintEmail] = useState('');

  useEffect(() => {
    // Get the email from session storage
    const storedEmail = sessionStorage.getItem('complaintEmail');
    if (storedEmail) {
      setcomplaintEmail(storedEmail);
    }
  }, []); // Empty dependency array to run only once on mount

  // console.log('EEEEEEE', complaintEmail);

  const [candidate, setCandidate] = useState('');

  const [selectedValue, setSelectedValue] = useState('');
  const [selectedId, setSelectedId] = useState('');
  const [show, setShow] = useState();

  const { user } = useAuthContext();
  // console.log('User', user);
  const { candidates } = useGetAppointmentsCandidate();

  const candidateProfiles = candidates?.data?.[0]?.CandidateProfiles;

  const handleChange = (event) => {
    const { value } = event.target;
    setSelectedValue(value);
    const selectedOption = candidateProfiles.find(
      (option) => option?.User?.UserProfile?.firstName === value
    );
    setSelectedId(selectedOption ? selectedOption.User.userId : '');
    setCandidate(selectedOption);
  };
  // console.log("can",candidate?.User?.email)

  const AppoinmentSchema = Yup.object().shape({
    voterId: Yup.number().required('Voter ID is required').typeError('Voter ID must be a number'),
    candidateId: Yup.number()
      .required('Candidate ID is required')
      .typeError('Candidate ID must be a number'),
    problemDescription: Yup.string().required('Problem Description is required'),
    appointmentType: Yup.string().required('Appointment Type is required'),
    appointmentDate: Yup.date()
      .required('Appointment Date is required')
      .typeError('Invalid date format'),
    appointmentStatus: Yup.string().required('Appointment Status is required'),
    appointmentPassMeetingLink: Yup.string()
      .url('Invalid URL format')
      .when('appointmentType', {
        is: 'Remote',
        then: Yup.string().required(
          'Appointment Pass Meeting Link is required for remote appointments'
        ),
      }),
    reportingContactNumber: Yup.string()
      .matches(/^\d{10}$/, 'Reporting contact number must be exactly 10 digits')
      .required('Reporting Contact Number is required'),
    reportingContactName: Yup.string().required('Reporting Contact Name is required'),
    reportingContactAddress: Yup.string().required('Reporting Contact Address is required'),
  });

  const defaultValues = useMemo(
    () => ({
      voterId: currentappointment?.data.voterId || user?.userId,
      candidateId: currentappointment?.data.candidateId || selectedId,
      problemDescription: currentappointment?.data.problemDescription || '',
      appointmentType: currentappointment?.data.appointmentType || show,
      appointmentTime: currentappointment?.data.appointmentTime || '',
      appointmentDate: currentappointment?.data.appointmentDate || '',
      appointmentStatus: currentappointment?.data.appointmentStatus || 'open',
      appointmentPassMeetingLink: currentappointment?.data.appointmentPassMeetingLink || '',
      reportingContactNumber: currentappointment?.data.reportingContactNumber || '',
      reportingContactName: currentappointment?.data.reportingContactName || '',
      reportingContactAddress: currentappointment?.data.reportingContactAddress || '',
    }),
    [currentappointment, user?.userId, selectedId, show]
  );

  // Form Method
  const methods = useForm({
    resolver: yupResolver(AppoinmentSchema),
    defaultValues,
  });
  const {
    reset,

    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    if (currentappointment) {
      reset(defaultValues);
    }
  }, [currentappointment, defaultValues, reset]);

  useEffect(() => {
    if (currentappointment) {
      setValue('candidateId', currentappointment?.data?.candidateId);
    } else {
      setValue('candidateId', selectedId);
    }
    setValue('appointmentType', show);
  }, [selectedId, setValue, show, currentappointment]);

  // const recipient = candidate?.User?.email || 'Select Leader';
  const recipient = complaintEmail;
  const cc1 = 'attpl_Traker@gmail.com';
  const cc = `${cc1}, ${candidate?.User?.email || 'Select Leader'}`;
  const subject = 'Request to resolve complaints from Local Community Concerns';
  const body = `Dear Sir/Ma'am,

I hope this message finds you well. My name is ${user?.UserProfile?.firstName}, and I am a resident of Your Constituency/Community. As an engaged and concerned voter, I would like to register a compaint with you to discuss several pressing issues affecting our community.

Specifically, I am interested in addressing the following matters:

[Issue 1: Brief description]
[Issue 2: Brief description]
[Issue 3: Brief description]

I believe that your insights and leadership are crucial in finding effective solutions to these concerns. I am available for a meeting at your earliest convenience and can adjust my schedule to accommodate yours. Please let me know a suitable date and time for our meeting.

Thank you for your attention to this request. I look forward to the opportunity to speak with you and contribute to the betterment of our community.

Best regards,

 ${user?.UserProfile?.firstName} ${user?.UserProfile?.lastName}
 ${user?.phone || 'No Mobile Number Found'} 
 ${user?.email || 'No Email Found'} 
`;

  const gmail = (event) => {
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(recipient)}&cc=${encodeURIComponent(cc)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, '_blank');
  };

  const renderMail = (
    <>
      <Stack>
        <Grid container spacing={3} sx={{ mt: -5 }}>
          <Grid xs={12} md={8}>
            <Button
              component={RouterLink}
              // to="/dashboard/Appointment/card"
              to="/dashboard/complaintForm/new"
              variant="outlined"
              color="primary"
              style={{
                textDecoration: 'none',
                width: '150px',
                padding: '3px 5px',
                marginBottom: '10px',
              }}
            >
              {/* Back to card */}
              Back
            </Button>
            {!currentappointment && (
              <Card sx={{ p: 3 }}>
                <FormControl fullWidth>
                  <InputLabel id="dropdown-label">Select Your Political Leader</InputLabel>
                  <Select
                    labelId="dropdown-label"
                    id="dropdown"
                    value={selectedValue}
                    onChange={handleChange}
                    label="Select Your Political Leader" // Ensure this prop is set
                    fullWidth
                  >
                    {candidateProfiles?.map((option) => (
                      <MenuItem key={option.userId} value={option?.User?.UserProfile?.firstName}>
                        {option?.User?.UserProfile?.firstName}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Card>
            )}
          </Grid>
        </Grid>
      </Stack>

      {/* chceck add */}
      <Grid container spacing={3} sx={{ mt: -9 }}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <form
              style={{
                maxWidth: '600px',
                margin: 'auto',
                padding: '16px',
              }}
              noValidate
              autoComplete="off"
            >
              <Typography variant="h4" component="h1" gutterBottom>
                Sample Compose Email
              </Typography>
              <TextField
                required
                id="to"
                label="To"
                variant="outlined"
                fullWidth
                margin="normal"
                // value={email}
                value={complaintEmail}
              />

              <TextField
                id="cc"
                label="CC"
                variant="outlined"
                value={`${cc1},${candidate ? candidate?.User?.email : ''}`}
                fullWidth
                margin="normal"
              // defaultValue={`${cc1}, ${candidate?.User?.email}`}
              />
              <TextField
                required
                id="subject"
                label="Subject"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={subject}
              />
              <TextField
                id="body"
                label="Message"
                multiline
                rows={10}
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={body}
              />

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  variant="contained"
                  size="large"
                  loading={isSubmitting}
                  onClick={gmail}
                >
                  {!currentappointment ? 'Compose Email' : 'create Appointment'}
                </LoadingButton>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  const renderTabs = (
    <Container
      sx={{
        pl: 2,
        pb: 10,
        position: 'relative',
      }}
    >
      <Box
        gap={10}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
        }}
      >
        <h3>COMPLAINT REGISTER VIA MAIL CHANNEL</h3>
        {renderMail}
      </Box>
    </Container>
  );

  return <>{renderTabs}</>;
}

MailForm.propTypes = {
  currentappointment: PropTypes.object,
};
