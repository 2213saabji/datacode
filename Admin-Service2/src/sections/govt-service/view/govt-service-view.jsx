import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Tab, Tabs, Button, tabsClasses } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import GovtHero from '../govt-hero';
import Complaint from '../Complaint';
// import JobTransfer from '../Job-Transfer';
import ProblemNetaJi from '../Problem-Netaji';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'complaint',
    label: 'Request via ATTPL Channel ',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  // {
  //   value: 'jobtransfer',
  //   label: 'Select your Request Via Attpl Channel',
  //   // icon: <Box component="img" src='/assets/icons/menuicons/Ward.svg' />,
  // },
  {
    value: 'problemnetaji',
    label: 'Request via Email Channel',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];

export default function GovtServiceView() {
  const [currentTab, setCurrentTab] = useState('complaint');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <>
      <GovtHero currentTab={currentTab} />
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
          pt: { xs: 10, md: 10 },
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
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              pl: { xs: 0, md: 3 },
              pb: 1,
              borderRadius: 1,
              // position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                // pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
            }}
          >
            {TABS.map((tab) =>
              (tab.value !== 'candidate' && tab.value !== 'editcandidate') ||
              tab.value === 'candidate' ||
              tab.value === 'editcandidate' ? (
                <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
              ) : null
            )}
          </Tabs>

          {currentTab === 'complaint' && <Complaint />}

          {/* {currentTab === 'jobtransfer' && <Complaint />} */}

          {currentTab === 'problemnetaji' && <ProblemNetaJi />}
        </Box>
      </Container>
    </>
  );
}
