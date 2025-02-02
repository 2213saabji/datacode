import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';

import './studentGuide.css'; // Import your CSS file for styling
// import { useGetPosts } from 'src/api/blog';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useTheme } from '@emotion/react';

import { Container } from '@mui/system';
import { Box, Grid, Paper, Button, MenuItem, TextField, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { ATTPL_BMS_HOST_API } from 'src/config-global';
import { useGetJobs, useGetAllJobTypes, useGetAllJobDesiredData } from 'src/api/student';

import FormProvider from 'src/components/hook-form/form-provider';

const indianStates = [
  { id: 'AN', name: 'Andaman and Nicobar Islands' },
  { id: 'AP', name: 'Andhra Pradesh' },
  { id: 'AR', name: 'Arunachal Pradesh' },
  { id: 'AS', name: 'Assam' },
  { id: 'BR', name: 'Bihar' },
  { id: 'CH', name: 'Chandigarh' },
  { id: 'CT', name: 'Chhattisgarh' },
  { id: 'DN', name: 'Dadra and Nagar Haveli' },
  { id: 'DD', name: 'Daman and Diu' },
  { id: 'DL', name: 'Delhi' },
  { id: 'GA', name: 'Goa' },
  { id: 'GJ', name: 'Gujarat' },
  { id: 'HR', name: 'Haryana' },
  { id: 'HP', name: 'Himachal Pradesh' },
  { id: 'JK', name: 'Jammu and Kashmir' },
  { id: 'JH', name: 'Jharkhand' },
  { id: 'KA', name: 'Karnataka' },
  { id: 'KL', name: 'Kerala' },
  { id: 'LD', name: 'Lakshadweep' },
  { id: 'MP', name: 'Madhya Pradesh' },
  { id: 'MH', name: 'Maharashtra' },
  { id: 'MN', name: 'Manipur' },
  { id: 'ML', name: 'Meghalaya' },
  { id: 'MZ', name: 'Mizoram' },
  { id: 'NL', name: 'Nagaland' },
  { id: 'OR', name: 'Odisha' },
  { id: 'PY', name: 'Puducherry' },
  { id: 'PB', name: 'Punjab' },
  { id: 'RJ', name: 'Rajasthan' },
  { id: 'SK', name: 'Sikkim' },
  { id: 'TN', name: 'Tamil Nadu' },
  { id: 'TG', name: 'Telangana' },
  { id: 'TR', name: 'Tripura' },
  { id: 'UP', name: 'Uttar Pradesh' },
  { id: 'UT', name: 'Uttarakhand' },
  { id: 'WB', name: 'West Bengal' },
];

export default function StudentGuide() {
  const [colleges, setColleges] = useState([]);
  const { setValue, watch } = useForm({
    defaultValues: {
      category: '',
      job: '',
      state: '',
      college: '',
    },
  });
  const theme = useTheme();
  const selectedCategory = watch('category');
  const selectedJob = watch('job');
  // const selectedState = watch('state');
  const jobTypes = useGetAllJobTypes();

  const jobs = useGetJobs(selectedCategory);
  const jobDetails = useGetAllJobDesiredData(encodeURIComponent(selectedJob));

  const fetchCollegeData = async (selectedState) => {
    try {
      const courseId = jobDetails?.posts?.Courses?.[0]?.courseId;
      const accessToken = localStorage.getItem('accessToken');

      const response = await axios.get(
        `${ATTPL_BMS_HOST_API}/jobs/fetch/${selectedState}/course/${courseId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );

      setColleges(response.data.colleges);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <>
      <Helmet>
        <title>Dashboard: Create student roadmap</title>
      </Helmet>
      <Container>
        <Button
          component={RouterLink}
          to="/dashboard/StudentCareer/new"
          variant="outlined"
          color="primary"
          style={{
            textDecoration: 'none',
            width: '150px',
            padding: '3px 5px',
            marginBottom: '30px',
          }}
        >
          Back
        </Button>
        <FormProvider>
          <Typography variant="h4" gutterBottom sx={{ color: '#078DEE' }}>
            CREATE STUDENT ROADMAP
          </Typography>

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography
                component="label"
                htmlFor="category"
                sx={{
                  color: '#078DEE',
                  marginBottom: '8px',
                  display: 'block',
                  fontSize: '16px',
                }}
              >
                Select Category
              </Typography>
              <TextField
                select
                id="category"
                name="category"
                value={selectedCategory}
                onChange={(e) => setValue('category', e.target.value)}
                fullWidth
                placeholder="Select Category"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => value || 'Select Category',
                }}
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                    fontSize: '16px',
                  },
                }}
              >
                <MenuItem value="" disabled>
                  <em>Select Category</em>
                </MenuItem>
                {jobTypes.posts.map((jobType) => (
                  <MenuItem key={jobType?.jobTypeId} value={jobType?.jobTypeName}>
                    {jobType?.jobTypeName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {selectedCategory && (
              <Grid item xs={12} md={6}>
                <Typography
                  component="label"
                  htmlFor="job"
                  sx={{
                    color: '#078DEE',
                    marginBottom: '8px',
                    display: 'block',
                    fontSize: '16px',
                  }}
                >
                  Select Job
                </Typography>
                <TextField
                  select
                  id="job"
                  name="job"
                  value={selectedJob}
                  onChange={(e) => setValue('job', e.target.value)}
                  fullWidth
                  placeholder="Select Job"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) => value || 'Select Job',
                  }}
                  InputProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                      fontSize: '16px',
                    },
                  }}
                >
                  <MenuItem value="" disabled>
                    <em>Select Job</em>
                  </MenuItem>
                  {jobs.posts.map((job) => (
                    <MenuItem key={job.jobId} value={job?.jobName}>
                      {job?.jobName}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            )}
          </Grid>

          {selectedJob && (
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ color: '#078DEE' }}>
                Job Details: {jobDetails?.posts?.jobName}
              </Typography>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                  Courses
                </Typography>
                {jobDetails?.posts?.Courses?.map((course) => (
                  <Typography key={course?.courseId}>{course?.courseName}</Typography>
                ))}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                  Job Subjects
                </Typography>
                {jobDetails?.posts?.JobSubjects?.map((subject) => (
                  <Typography key={subject?.id}>{subject?.Subject?.subjectName}</Typography>
                ))}
              </Box>

              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                  Job Exams
                </Typography>
                {jobDetails?.posts?.JobExams?.map((exam) => (
                  <Typography key={exam?.id}>{exam?.EntranceExam?.examName}</Typography>
                ))}
              </Box>
            </Paper>
          )}
          {selectedJob && (
            <Grid container spacing={3} style={{ marginTop: '20px' }}>
              <Grid item xs={12} md={6}>
                <Typography
                  component="label"
                  htmlFor="state"
                  sx={{
                    color: '#078DEE',
                    marginBottom: '8px',
                    display: 'block',
                    fontSize: '16px',
                  }}
                >
                  Select State
                </Typography>
                <TextField
                  select
                  id="state"
                  name="state"
                  value={watch('state')}
                  onChange={(e) => {
                    setValue('state', e.target.value);
                    fetchCollegeData(e.target.value);
                  }}
                  fullWidth
                  placeholder="Select State"
                  SelectProps={{
                    displayEmpty: true,
                    renderValue: (value) =>
                      value
                        ? indianStates.find((state) => state.name === value)?.name
                        : 'Select State',
                  }}
                  InputProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                      fontSize: '16px',
                    },
                  }}
                >
                  {/* <MenuItem value="" disabled>
                  <em>Select State</em>
                </MenuItem> */}
                  {indianStates.map((state) => (
                    <MenuItem key={state.id} value={state.name}>
                      {state.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {watch('state') && (
                <Grid item xs={12} md={6}>
                  <Typography variant="h5" gutterBottom sx={{ color: '#078DEE' }}>
                    Colleges
                  </Typography>
                  {colleges?.map((college) => (
                    <MenuItem key={college.collegeId} value={college.collegeName}>
                      {college.collegeName}
                    </MenuItem>
                  ))}
                </Grid>
              )}
            </Grid>
          )}
        </FormProvider>
      </Container>
    </>
  );
}
