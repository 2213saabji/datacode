import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Tab, Tabs, Button, tabsClasses } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetVoterView } from 'src/api/election_details';

import VoterUserHero from '../voter_user-hero';
import CandidateCard from '../candidate-card-list';
import VoterWardDetails from '../voter-ward-details';
import VoterBoothDetails from '../voter-booth-details';
import VoterElectionDetails from '../voter-election-details';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'candidatelist',
    label: 'Nominated Candidate',
    icon: <Box component="img" src="/assets/icons/menuicons/Candidate 1.svg" />,
  },
  {
    value: 'electiondetails',
    label: 'Your Election',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'wardetails',
    label: 'Your Ward',
    icon: <Box component="img" src="/assets/icons/menuicons/Ward.svg" />,
  },
  {
    value: 'boothdetails',
    label: 'Your Booth',
    icon: <Box component="img" src="/assets/icons/menuicons/Booth.svg" />,
  },
];

export default function VoterUserView() {
  const [currentTab, setCurrentTab] = useState('candidatelist');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const { user } = useAuthContext();

  const { claims } = useGetVoterView(user.accessToken);
  console.log('claims--->', claims);

  const voterElectionDetail = claims && claims.data && claims.data[0] ? claims.data[0] : {};

  return (
    <>
      <VoterUserHero currentTab={currentTab} />

      <Button
        sx={{ mt: 2 }}
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        <Box
          // gap={10}
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
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
              '& .MuiTabs-scrollButtons': {
                // Styles for scroll buttons
                // color: theme.palette.primary.main, // Change color of scroll buttons
                '& svg': {
                  width: '30px', // Adjust the width as needed
                  height: '30px', // Adjust the height as needed
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

          {currentTab === 'electiondetails' && (
            <VoterElectionDetails voterElectionData={voterElectionDetail} />
          )}

          {currentTab === 'wardetails' && <VoterWardDetails voterWardData={voterElectionDetail} />}

          {currentTab === 'boothdetails' && (
            <VoterBoothDetails voterBoothData={voterElectionDetail} />
          )}

          {currentTab === 'candidatelist' && <CandidateCard candidateData={voterElectionDetail} />}
        </Box>
      </Container>
    </>
  );
}
