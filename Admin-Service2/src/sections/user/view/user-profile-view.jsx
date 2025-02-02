import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import { Stack } from '@mui/system';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { Box, Switch, FormControlLabel } from '@mui/material';

import { paths } from 'src/routes/paths';

import { puter, endpoints } from 'src/utils/axios-ums';

import { _userAbout } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import { useGetCandidateDetails } from 'src/api/candidate';
import { useGetVotersDetails, useGetNewVotersDetails } from 'src/api/voter';

import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';
import ProfileEdit from '../profile-followers';
import ProfileRefferals from '../profile-refferals';
import UpgradeAccountProfile from '../upgrade-account';
import UserProfilePercentage from '../user-profile-percentage';

export default function UserProfileView() {
  const { user } = useAuthContext();
  const { voters: voterDetail } = useGetNewVotersDetails(user?.accessToken);
  const [newVoter, setNewVoter] = useState(voterDetail);
  const [addressFormSubmitted, setAddressFormSubmitted] = useState(false);

  // ----------------------------------------------------------------------

  const TABS = [
    {
      value: 'profile',
      label: 'Profile',
      icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
    },
    ...(user?.userRoleId !== 1
      ? [
          {
            value: 'updateaccount',
            label: 'Upgrade Account',
            icon: <Box component="img" src="/assets/icons/menuicons/Edit Profile.svg" />,
          },
        ]
      : []),
    {
      value: 'editprofile',
      label: 'Edit Profile',
      icon: <Box component="img" src="/assets/icons/menuicons/Edit Profile.svg" />,
    },
    {
      value: 'referrals',
      label: 'Referrals',
      icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
    },
    // {
    //   value: 'editvoter',
    //   label: 'Edit Voter',
    //   icon: <Box component="img" src="/assets/icons/menuicons/Edit Voter.svg" />,
    // },
    // {
    //   value: 'editcandidate',
    //   label: 'Edit Candidate',
    //   icon: <Iconify icon="solar:heart-bold" width={24} />,
    // },
  ];

  // ----------------------------------------------------------------------

  useEffect(() => {
    setNewVoter(voterDetail);
  }, [voterDetail]);
  const { enqueueSnackbar } = useSnackbar();
  const [check, setcheck] = useState(() => {
    const res = localStorage.getItem('togglePayment');
    if (res === 'true') {
      return JSON.parse(res);
    }
    return false;
  });
  const settings = useSettingsContext();
  const roleMappings = {
    1: 'admin',
    2: 'candidate',
    3: 'Candidate Manager',
    4: 'Ward Leader',
    5: 'Booth Leader',
    6: 'Polling Station Leader',
    7: 'Polling Station Volunteer',
    8: 'Driver',
    9: 'Voter',
    11: 'Developer',
  };

  const { voters } = useGetVotersDetails();
  const {
    candidates,
    // candidatesLoading,
    // candidatesError,
    // candidatesValidating,
    // candidatesEmpty
  } = useGetCandidateDetails();

  const [currentTab, setCurrentTab] = useState(() => {
    const localData = localStorage.getItem('profileViewTab');
    if (localData) return localData;

    return 'profile';
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem('profileViewTab', newValue);
  }, []);

  async function handlePublishToggleChange(e) {
    try {
      const url = endpoints.user.updateTooglePayment;
      const data = {
        showPaymentPage: e.target.checked,
      };
      const headers = {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`,
      };
      const response = await puter(url, data, headers);
      setcheck(response?.data?.showPaymentPage);
      localStorage.setItem('togglePayment', response?.data?.showPaymentPage);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  }
  // function formSubmitChecker(){
  //   if(
  //     user?.UserProfile?.currentJobTitle &&
  //     user?.UserProfile?.dateOfBirth &&
  //     user?.UserProfile?.fatherName &&
  //     user?.UserProfile?.firstName &&
  //     user?.UserProfile?.gender &&
  //     user?.UserProfile?.highestQualification &&
  //     user?.UserProfile?.lastName &&
  //     user?.UserProfile?.motherName &&
  //     user?.UserProfile?.politicalPartyAffiliation &&
  //     user?.UserProfile?.whatsappNumber &&
  //     user?.UserAddressesses[0]?.addressType &&
  //     user?.UserAddressesses[0]?.country &&
  //     user?.UserAddressesses[0]?.streetAddress &&
  //     user?.UserAddressesses[0]?.userCity &&
  //     user?.UserAddressesses[0]?.userState
  //   ){
  //     setAddressFormSubmitted(true);
  //   }
  // }
  //   useEffect(()=>{
  //     formSubmitChecker();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },[])
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Profile"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: user?.userName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* Profile Percentage Circle */}
      <Stack
        direction={{ xs: 'column', sm: 'row', md: 'row' }}
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <UserProfilePercentage
          scale="1"
          setAddressFormSubmitted={setAddressFormSubmitted}
          addressFormSubmitted={addressFormSubmitted}
          setCurrentTab={setCurrentTab}
          currentTab={currentTab}
          mandatoryFormErrorShow
        />
        {user?.userRoleId === 1 && (
          <FormControlLabel
            onChange={(e) => handlePublishToggleChange(e)}
            control={<Switch checked={check} />}
            label="Register Payment Activation"
            sx={{ pl: 3 }}
          />
        )}
      </Stack>
      <Card
        sx={{
          mb: 3,
          height: 290,
        }}
      >
        <ProfileCover
          role={roleMappings[user?.userRoleId] || ''}
          name={user?.UserProfile?.firstName}
          avatarUrl={user?.UserProfile?.userProfileImageDetails?.preview}
          imageAvailable={user?.UserProfile?.userProfileImageDetails}
          coverUrl={_userAbout.coverUrl}
          profileName={
            user?.UserProfile === null || user?.UserProfile?.firstName === null
              ? user?.phone
              : user?.UserProfile?.firstName
          }
        />
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        >
          {TABS.map((tab) =>
            (tab.value !== 'candidate' && tab.value !== 'editcandidate') ||
            (tab.value === 'candidate' && user?.userRoleId === 2) ||
            (tab.value === 'editcandidate' && user?.userRoleId === 2) ? (
              <Tab
                sx={{ color: '#3a8ff3' }}
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
              />
            ) : null
          )}
        </Tabs>
      </Card>

      {currentTab === 'profile' && (
        <ProfileHome
          candidates={candidates}
          voter={voters}
          newVoter={newVoter}
          setCurrentTab={setCurrentTab}
          setAddressFormSubmitted={setAddressFormSubmitted}
          addressFormSubmitted={addressFormSubmitted}
          currentTab={currentTab}
        />
      )}

      {currentTab === 'referrals' && <ProfileRefferals />}

      {currentTab === 'editprofile' && (
        <ProfileEdit
          candidates={candidates}
          voter={voters}
          newVoter={newVoter}
          setNewVoter={setNewVoter}
        />
      )}

      {/* {currentTab === 'editvoter' && <VoterEdit newVoter={newVoter} setNewVoter={setNewVoter} />} */}

      {currentTab === 'updateaccount' && user?.userRoleId !== 1 && (
        <UpgradeAccountProfile handleChangeTab={handleChangeTab} />
      )}

      {/* {currentTab === 'editcandidate' && <CandidateEdit candidates={candidates} />} */}
    </Container>
  );
}
