// import { Link } from 'react-router-dom';
import { useState, useCallback } from 'react';

import { Tab, Tabs, Button, useTheme, Container, tabsClasses } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import SvgColor from 'src/components/svg-color';

import HealthCareer from './HealthCareer';
import StudentGuide from './studentGuide';
import DigitalLibrary from './digitalLibrary';
import TechnicalCareer from './TechnicalCareer';
import JobPortals from '../Student-job-portals';
import ScholarshipForm from './Scholarship-form';
import StudentCareerBanner from './StudentBanner';
import PublicServiceCareer from './PublicServiceCareer';
import RegisterYourCompany from './register-your-company';
// import AppoinmentWIthInstitute from '../AppoinmentWIthInstitute';
// import Coaching from '../Institute-appointment-booking';

export default function StudentCareer() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('studentGuide');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const icon = (name) => <SvgColor src={`/assets/icons/menuicons/${name}.svg`} />;

  const TABS = [
    {
      value: 'studentGuide',
      label: 'STUDENT GUIDE',
      icon: icon('Profile'),
    },

    {
      value: 'ATTPLScholarship',
      label: 'ATTPL SCHOLARSHIP',
      icon: icon('Profile'),
    },
    // {
    //   value: 'AppoinmentWithInstitute',
    //   label: 'BOOK APPOINMENT WITH INSTITUTE',
    //   icon:icon('Profile')
    // },
    // {
    //   value: 'Coaching',
    //   label: 'Coaching Form',
    //   icon:icon('Profile')
    // },
    {
      value: 'digitalLibrary',
      label: 'DIGITAL LIBRARY',
      icon: icon('Profile'),
    },
    {
      value: 'technicalCareers',
      label: 'TECHNICAL CAREERS',
      icon: icon('Profile'),
    },
    {
      value: 'publicservicecareers',
      label: 'PUBLIC SERVICE CAREERS',
      icon: icon('Ward'),
    },
    {
      value: 'healthcarecareers',
      label: 'MEDICAL CAREERS',
      icon: icon('Booth'),
    },

    {
      value: 'studentJob',
      label: 'JOB PORTALS',
      icon: icon('Profile'),
    },
    {
      value: 'RegisterYourInstitute',
      label: 'INSTITUTION LIST',
      icon: icon('Profile'),
    },
    // {
    //   value: 'creativecareers',
    //   label: 'Creative Careers',
    //   icon:  icon:icon('Booth'),
    // },
  ];

  return (
    <>
      <StudentCareerBanner />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 4, md: 5 },
          position: 'relative',
        }}
      >
        {/* <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        > */}
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            pl: 3,
            pb: 1,
            borderRadius: 1,
            // position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-start',
              },
            },
            '& .MuiTabs-scrollButtons': {
              // Styles for scroll buttons
              color: theme.palette.primary.dark, // Change color of scroll buttons
              '& svg': {
                width: '30px', // Adjust the width as needed
                height: '30px', // Adjust the height as needed
              },
            },
          }}
        >
          {TABS.map((tab) => (
            <Tab
              key={tab.value}
              value={tab.value}
              icon={tab.icon}
              sx={{
                color: theme.palette.primary.main, // Change the text color to red (you can use any valid CSS color here)
              }}
              label={tab.label}
            />
          ))}
        </Tabs>

        {currentTab === 'studentGuide' && <StudentGuide />}

        {currentTab === 'ATTPLScholarship' && <ScholarshipForm />}

        {currentTab === 'RegisterYourInstitute' && <RegisterYourCompany />}

        {currentTab === 'digitalLibrary' && <DigitalLibrary />}

        {currentTab === 'technicalCareers' && <TechnicalCareer />}

        {currentTab === 'publicservicecareers' && <PublicServiceCareer />}

        {currentTab === 'healthcarecareers' && <HealthCareer />}

        {currentTab === 'studentJob' && <JobPortals />}

        {/* {currentTab === "AppoinmentWithInstitute" && <AppoinmentWIthInstitute/>} */}

        {/* {currentTab === "Coaching" && <Coaching/>} */}

        {/* </Box> */}
      </Container>

    </>
  );
}
