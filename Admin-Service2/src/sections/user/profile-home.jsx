/* eslint-disable no-unused-vars */
import * as React from 'react';
import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Box, Modal, Button, Typography } from '@mui/material';
import DialogContentText from '@mui/material/DialogContentText';

import { setLocalStorage } from 'src/hooks/utils';

import { useGetParties } from 'src/api/party';
import { useAuthContext } from 'src/auth/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { useGetSocialMedia } from 'src/api/user';
import JwtRegisterView from './jwt-register-view';

const defaultFilters = {
  publish: [],
  stock: [],
};

// ----------------------------------------------------------------------

export default function ProfileHome({
  voter,
  candidates,
  newVoter,
  setCurrentTab,
  setAddressFormSubmitted,
  addressFormSubmitted,
  currentTab,
}) {
  const { user, deleteAccount, dispatch } = useAuthContext();
  const router = useRouter();
  const { parties: partyList } = useGetParties();
  const { users } = useGetSocialMedia(user.accessToken);

  const [filters, setFilters] = useState(defaultFilters);

  const [open, setOpen] = useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [identityDetails, setIdentityDetails] = useState({
    VOTERNumber: '',
    VOTERUPIID: '',
    AADHAARNumber: '',
    AADHAARUPIID: '',
    PASSPORTNumber: '',
    PASSPORTUPIID: '',
  });

  const IdentityFetcher = (IdType) => {
    if (user?.UserIdentityDetails.length === 0) {
      return false;
    }
    const IdObj = user.UserIdentityDetails.filter((item) => item.identityType === IdType);
    return IdObj;
  };

  useEffect(() => {
    const voterDetails = IdentityFetcher('VOTER');
    if (voterDetails) {
      setIdentityDetails((prev) => ({
        ...prev,
        VOTERNumber: voterDetails[0]?.identityNumber,
        VOTERUPIID: voterDetails[0]?.upiId,
      }));
    }
    const AADHAARDetails = IdentityFetcher('AADHAAR');
    if (AADHAARDetails) {
      setIdentityDetails((prev) => ({
        ...prev,
        AADHAARNumber: AADHAARDetails[0]?.identityNumber,
        AADHAARUPIID: AADHAARDetails[0]?.upiId,
      }));
    }
    const PASSPORTDetails = IdentityFetcher('PASSPORT');
    if (PASSPORTDetails) {
      setIdentityDetails((prev) => ({
        ...prev,
        PASSPORTNumber: PASSPORTDetails[0]?.identityNumber,
        PASSPORTUPIID: PASSPORTDetails[0]?.upiId,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const PartyListArr = partyList?.data || [];

  const PartyData = PartyListArr.map((list) => ({
    value: list.partyId,
    label: list.partyName,
  }));

  const handleDeleteOpen = () => {
    setOpenDelete(true);
  };

  const handleDeleteClose = () => {
    setOpenDelete(false);
  };

  // user?.UserProfile.currentJobTitle &&
  // user?.UserProfile.dateOfBirth &&
  // user?.UserProfile.fatherName &&
  // user?.UserProfile.firstName &&
  // user?.UserProfile.gender &&
  // user?.UserProfile.highestQualification &&
  // user?.UserProfile.lastName &&
  // user?.UserProfile.motherName &&
  // user?.UserProfile.politicalPartyAffiliation &&
  // user?.UserProfile.userProfileImageDetails &&
  // user?.UserProfile.whatsappNumber &&
  // user?.UserAddressesses[0].addressType &&
  // user?.UserAddressesses[0].country &&
  // user?.UserAddressesses[0].streetAddress &&
  // user?.UserAddressesses[0].userCity &&
  // user?.UserAddressesses[0].userState
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

  const handleDeleteuser = async () => {
    const response = await deleteAccount(user.userId);
    if (response) {
      setLocalStorage(null);
      dispatch({
        type: 'LOGOUT',
      });
      localStorage.setItem('upiId', '');
      localStorage.setItem('votePredictWardId', 0);
      localStorage.setItem('votePredictBoothId', 0);
      localStorage.setItem('votePredictPollId', 0);
      localStorage.setItem('votePredictList', JSON.stringify([]));

      localStorage.removeItem('accessToken');
      window.location.reload();
    }
  };

  const handleSocialLink = (url) => {
    router.push(url);
  };

  const socialMediaLinks = [
    { icon: 'mdi:facebook', link: users?.data?.facebokLink },
    { icon: 'mdi:instagram', link: users?.data?.instagramLink },
    { icon: 'mdi:twitter', link: users?.data?.xLink },
    { icon: 'mdi:linkedin', link: users?.data?.linkedinLink },
    { icon: 'mdi:youtube', link: users?.data?.youtubeLink },
  ];

  const renderAbout = (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="About" />
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* <Stack direction="column" alignItems="start"> */}
        {/* <Typography >{candidates?.candidates?.data?.legalCase}</Typography> */}
        <Stack direction="row" sx={{ typography: 'body2', xs: { display: 'none' } }}>
          <Iconify icon="ic:baseline-account-circle" width={24} sx={{ mr: 3 }} />
          <Typography sx={{ wordBreak: 'break-word' }}>
            {' '}
            {user?.UserProfile?.firstName} {user?.UserProfile?.middleName}{' '}
            {user?.UserProfile?.lastName}{' '}
          </Typography>
        </Stack>

        {user?.email && (
          <Stack direction="row" sx={{ typography: 'body2' }}>
            <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 3 }} />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ wordBreak: 'break-word' }}> {user?.email}</Typography>
              <Typography>
                {' '}
                {user?.isEmailVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}{' '}
              </Typography>
            </Stack>
          </Stack>
        )}

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="ic:sharp-smartphone" width={24} sx={{ mr: 3 }} />
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography> {user?.phone}</Typography>
            <Label color="primary">Primary</Label>
            <Typography>
              {user?.isMobileVerified ? (
                <Label color="success">Verified</Label>
              ) : (
                <Label color="error">Not Verified</Label>
              )}
            </Typography>
          </Stack>
        </Stack>

        {user?.UserProfile?.whatsappNumber && (
          <Stack direction="row" sx={{ typography: 'body2' }}>
            <Iconify icon="ic:sharp-smartphone" width={24} sx={{ mr: 3 }} />
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography> {user?.UserProfile?.whatsappNumber}</Typography>
              <Label color="secondary"> Secondary</Label>
            </Stack>
          </Stack>
        )}

        <Stack spacing={2}>
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography fontWeight={600} variant="h6">
              Social Accounts
            </Typography>
            <Button
              onClick={() => {
                localStorage.setItem('accountSettingView', 'socialMedia');
                handleSocialLink(
                  users
                    ? paths.dashboard.user.editSocialProfile(users?.data?.socialMediaLinksId)
                    : paths.dashboard.user.account
                );
              }}
              variant="contained"
            >
              {users ? 'Update Social Profile' : 'Add Social Profile'}
            </Button>
          </Stack>

          <Stack direction="row" alignItems="center" spacing={2}>
            {socialMediaLinks.map(
              (social, index) =>
                social.link && (
                  <a style={{ textDecoration: 'none', color: 'inherit' }} href={social.link} target="_blank" rel="noopener noreferrer" key={index}>
                    <Iconify icon={social.icon} width={24} height={24} />
                  </a>
                )
            )}
          </Stack>
        </Stack>

        <Stack
          direction="row"
          sx={{ typography: 'body2', width: '100%', justifyContent: 'center' }}
        >
          {user?.isMobileVerified && user?.isEmailVerified ? (
            ''
          ) : (
            <>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                BackdropProps={{
                  style: {
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                  },
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    // border: '2px solid #000',
                    borderRadius: '18px',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <JwtRegisterView user={user} />
                </Box>
              </Modal>
              {/* <Button
                color="success"
                sx={{ fontSize: '14px', mt: '5px' }}
                onClick={handleOpen}
                disableTouchRipple
              >
                Verify Now
              </Button> */}
            </>
          )}
        </Stack>
        {/* </Stack> */}
        <Button variant="soft" color="error" onClick={handleDeleteOpen}>
          Delete Account
        </Button>

        <Dialog
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Account Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure to Delete Your Account
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDeleteClose}>Disagree</Button>
            <Button onClick={handleDeleteuser} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </Stack>
    </Card>
  );

  const renderCandidate = (
    <Card sx={{ width: '100%' }}>
      <CardHeader title="Candidate" sx={{ pl: 0 }} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="start">
          <Typography sx={{ mr: 1, minWidth: { xs: 100, sm: 180, md: 180 } }}>
            ELECTION:{' '}
          </Typography>
          <Typography>{candidates?.data?.ElectionDetail?.electionType}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start">
          {candidates?.data?.PartyDetail?.partyName && (
            <Typography sx={{ mr: 1, minWidth: { xs: 100, sm: 180, md: 180 } }}>PARTY: </Typography>
          )}
          <Typography>{candidates?.data?.PartyDetail?.partyName}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start">
          <Typography sx={{ mr: 1, minWidth: { xs: 100, sm: 180, md: 180 } }}>
            LEGAL CASE:{' '}
          </Typography>
          <Typography>{candidates?.data?.legalCase}</Typography>
        </Stack>
      </Stack>
    </Card>
  );

  // const renderVoter = (
  //   <Card sx={{ width: '100%' }}>
  //     <CardHeader title="Voter" />
  //     <Stack spacing={2} sx={{ p: 3 }}>

  //       {newVoter?.data?.epicNo && <Stack direction="row" alignItems="start">
  //         <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>Epic No. </Typography>
  //         <Typography>{newVoter?.data?.epicNo}</Typography>
  //       </Stack>}
  //       {newVoter?.data?.panchayatName && <Stack direction="row" alignItems="start">
  //         <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>Panchayat Name </Typography>
  //         <Typography>{newVoter?.data?.panchayatName}</Typography>
  //       </Stack>}
  //       {newVoter?.data?.tehsilName && <Stack direction="row" alignItems="start">
  //         <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>Tehsil Name </Typography>
  //         <Typography>{newVoter?.data?.tehsilName}</Typography>
  //       </Stack>}
  //       {newVoter?.data?.upiId && <Stack direction="row" alignItems="start">
  //         <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>UPI Id: </Typography>
  //         <Typography>{newVoter?.data?.upiId}</Typography>
  //       </Stack>}
  //       {newVoter?.data?.wardNo && <Stack direction="row" alignItems="start">
  //         <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>Ward No. </Typography>
  //         <Typography>{newVoter?.data?.wardNo}</Typography>
  //       </Stack>}
  //     </Stack>
  //   </Card>
  // );

  const renderIdentity = (
    <Card sx={{ width: '100%', py: 3 }}>
      {identityDetails?.VOTERNumber && (
        <Stack spacing={2} sx={{ px: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px', pl: 0 }}>
            <CardHeader title="VOTER ID Details:" sx={{ pl: 0 }} />
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Identity Number:
            </Typography>
            <Typography>{identityDetails?.VOTERNumber}</Typography>
          </Stack>
        </Stack>
      )}
      {identityDetails?.AADHAARNumber && (
        <Stack spacing={2} sx={{ px: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <CardHeader title="AADHAAR Details:" sx={{ pl: 0 }} />
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Identity Number:
            </Typography>
            <Typography>{identityDetails?.AADHAARNumber}</Typography>
          </Stack>
        </Stack>
      )}
      {identityDetails?.PASSPORTNumber && (
        <Stack spacing={2} sx={{ px: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <CardHeader title="PASSPORT Details:" sx={{ pl: 0 }} />
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Identity Number:
            </Typography>
            <Typography>{identityDetails?.PASSPORTNumber}</Typography>
          </Stack>
        </Stack>
      )}

      {(identityDetails?.VOTERUPIID ||
        identityDetails?.AADHAARUPIID ||
        identityDetails?.PASSPORTUPIID) && (
        <Stack spacing={2} sx={{ px: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <CardHeader title="UPI Details:" sx={{ pl: 0 }} />
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              UPI ID:
            </Typography>
            <Typography>
              {identityDetails?.VOTERUPIID ||
                identityDetails?.AADHAARUPIID ||
                identityDetails?.PASSPORTUPIID}
            </Typography>
          </Stack>
        </Stack>
      )}
    </Card>
  );

  const renderProfile = (
    <Card sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <CardHeader title="Profile" />
        {/* {!addressFormSubmitted && <Stack alignItems="flex-end" sx={{ mt: 3 }} onClick={()=>setCurrentTab("editprofile")}>
          <LoadingButton sx={{ background: "red" }} type="submit" variant="contained">
            Click Here to fill the Mandatory form to get Access
          </LoadingButton>
        </Stack>
        } */}
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        {user?.UserProfile?.firstName && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              FullName:{' '}
            </Typography>
            <Typography>
              {user?.UserProfile?.firstName} {user?.UserProfile?.middleName}{' '}
              {user?.UserProfile?.lastName}{' '}
            </Typography>
          </Stack>
        )}

        {user?.UserProfile?.dateOfBirth && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>DOB:</Typography>
            <Typography> {user?.UserProfile?.dateOfBirth} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.gender && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Gender:
            </Typography>
            <Typography> {user?.UserProfile?.gender} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.fatherName && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 105, sm: 180, md: 180 } }}>
              Father Name:
            </Typography>
            <Typography> {user?.UserProfile?.fatherName} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.motherName && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Mother Name:
            </Typography>
            <Typography> {user?.UserProfile?.motherName} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.highestQualification && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Qualification:
            </Typography>
            <Typography> {user?.UserProfile?.highestQualification} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.politicalPartyAffiliation && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Your Political Party:
            </Typography>
            {/* <Typography> {user?.UserProfile && partyList &&partyList?.data[politicalparty-1]?.partyName} </Typography> */}
            <Typography>
              {' '}
              {PartyData[Number(user?.UserProfile?.politicalPartyAffiliation) - 1]?.label}{' '}
            </Typography>
          </Stack>
        )}

        {user?.UserProfile?.currentJobTitle && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Current Job:
            </Typography>
            <Typography> {user?.UserProfile?.currentJobTitle} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.whatsappNumber && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Whatsapp No.:
            </Typography>
            <Typography> {user?.UserProfile?.whatsappNumber} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.whatsappNumber && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Religion:
            </Typography>
            <Typography> {user?.UserProfile?.religion} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.whatsappNumber && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Tehsil:
            </Typography>
            <Typography> {user?.UserProfile?.tehsilName} </Typography>
          </Stack>
        )}

        {user?.UserProfile?.nationality && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Nationality:
            </Typography>
            <Typography> {user?.UserProfile?.nationality}</Typography>
          </Stack>
        )}

        {/* <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: {xs:100,sm:180, md:180} }}>Identity Type :</Typography>
            <Typography>{}</Typography>
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: {xs:100,sm:180, md:180} }}>Identity Number:</Typography>
            <Typography>{ user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityNumber}</Typography>
          </Stack> */}
      </Stack>
    </Card>
  );

  const renderAddress = (
    <Card sx={{ width: '100%' }}>
      <Stack direction="row" sx={{ alignItems: 'center' }}>
        <CardHeader title="Address" />
        {/* {!addressFormSubmitted && <Stack alignItems="flex-end" sx={{ mt: 3 }} onClick={()=>setCurrentTab("editprofile")}>
          <LoadingButton sx={{ background: "red" }} type="submit" variant="contained">
            Click Here to fill the Mandatory form to get Access
          </LoadingButton>
        </Stack>
        } */}
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        {user?.UserAddressesses[0]?.streetAddress && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Home Address :
            </Typography>
            <Typography>
              {' '}
              {user?.UserAddressesses && user?.UserAddressesses[0]?.streetAddress}
            </Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.userCity && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              District:
            </Typography>
            <Typography>
              {' '}
              {user?.UserAddressesses && user?.UserAddressesses[0]?.userCity}
            </Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.userState && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>State:</Typography>
            <Typography>
              {' '}
              {user?.UserAddressesses && user?.UserAddressesses[0]?.userState}
            </Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.panchayatName && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Panchayat:
            </Typography>
            <Typography>
              {' '}
              {user?.UserAddressesses && user?.UserAddressesses[0]?.panchayatName}
            </Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.wardNo && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              WardNo:
            </Typography>
            <Typography> {user?.UserAddressesses && user?.UserAddressesses[0]?.wardNo}</Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.postalCode && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Pincode:
            </Typography>
            <Typography>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.postalCode}
            </Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.country && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              country:
            </Typography>
            <Typography>{user?.UserAddressesses && user?.UserAddressesses[0]?.country}</Typography>
          </Stack>
        )}
        {user?.UserAddressesses[0]?.addressType && (
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 10, minWidth: { xs: 100, sm: 180, md: 180 } }}>
              Address Type:
            </Typography>
            <Typography>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.addressType}
            </Typography>
          </Stack>
        )}
      </Stack>
    </Card>
  );

  return (
    <Grid
      container
      spacing={3}
      p={2}
      gap={6}
      sx={{
        display: 'grid',
        gridTemplateColumns: {
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        },
        '@media (max-width: 499px)': {
          display: 'block',
        },
      }}
    >
      {user && (
        <Stack spacing={3} gridColumn="span 1" sx={{ gap: '50px' }}>
          {renderAbout}
          {user?.userRoleId === 2 ? renderCandidate : ''}
          {/* {newVoter?.data && renderVoter} */}
          {renderIdentity}
        </Stack>
      )}
      {user?.UserProfile != null && (
        <Stack spacing={3} gridColumn="span 1" sx={{ mt: { xs: '50px', sm: 0 } }}>
          {renderProfile}
          {renderAddress}
        </Stack>
      )}
      {/* {user?.identityDetails != null && (
        <Stack spacing={3} gridColumn="span 1" sx={{ mt: { xs: "50px", sm: 0 } }}>
          {renderPassport}
        </Stack>
      )} */}
    </Grid>
  );
}
ProfileHome.propTypes = {
  voter: PropTypes.object,
  candidates: PropTypes.object,
  newVoter: PropTypes.object,
  setCurrentTab: PropTypes.func,
  currentTab: PropTypes.string,
  setAddressFormSubmitted: PropTypes.func,
  addressFormSubmitted: PropTypes.bool,
};
