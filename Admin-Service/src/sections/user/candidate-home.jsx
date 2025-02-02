import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
import { Box, Modal, Button, Typography } from '@mui/material';

import { UseMockedUser } from 'src/hooks/use-mocked-user';

import Label from 'src/components/label';

import JwtRegisterView from './jwt-register-view';

// ----------------------------------------------------------------------

export default function CandidateHome({ info, posts }) {
  const [userData, setUserData] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { response } = await UseMockedUser();
        setUserData(response.data.data);
        // console.log(response, 'dattaaaaaaaaaaaaaaaaaaaa');
      } catch (error) {
        console.error(error);
      }
    };

    fetchUserData();
  }, []);

  const renderAbout = (
    <Card sx={{ width: '470px' }}>
      {/* <CardHeader title="About" /> */}
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Typography sx={{ mr: 1, minWidth: 180 }}>FullName: </Typography>
          <Typography>
            {' '}
            {userData?.UserProfile?.firstName} {userData?.UserProfile?.middleName}{' '}
            {userData?.UserProfile?.lastName}
          </Typography>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Typography sx={{ mr: 1, minWidth: 180 }}>EMAIL: </Typography>

          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography> {userData?.email}</Typography>
            <Typography>
              {' '}
              {userData?.isEmailVerified ? (
                <Label color="success">Verified</Label>
              ) : (
                <Label color="error">Not Verified</Label>
              )}{' '}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Typography sx={{ mr: 1, minWidth: 180 }}>PHONE: </Typography>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography> {userData?.phone}</Typography>
            <Typography>
              {userData?.isMobileVerified ? (
                <Label color="success">Verified</Label>
              ) : (
                <Label color="error">Not Verified</Label>
              )}
            </Typography>
          </Stack>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Typography sx={{ mr: 1, minWidth: 180 }}>Legal Case: </Typography>
        </Stack>

        <Stack
          direction="row"
          sx={{ typography: 'body2', width: '100%', justifyContent: 'center' }}
        >
          {userData?.isMobileVerified && userData?.isEmailVerified ? (
            ''
          ) : (
            <>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.paper',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                  }}
                >
                  <JwtRegisterView user={userData} />
                </Box>
              </Modal>
              <Button
                color="success"
                sx={{ fontSize: '14px', mt: '5px' }}
                onClick={handleOpen}
                disableTouchRipple
              >
                Verify Now
              </Button>
            </>
          )}
        </Stack>
      </Stack>
    </Card>
  );

  // const renderProfile = (
  //   <Card sx={{ width: '733px' }}>
  //     <CardHeader title="Profile" />
  //     <Stack spacing={2} sx={{ p: 3 }}>
  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>FullName: </Typography>
  //         <Typography sx={{ ml: 10 }}>
  //           {userData?.UserProfile?.firstName} {userData?.UserProfile?.middleName}{' '}
  //           {userData?.UserProfile?.lastName}{' '}
  //         </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>DOB:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.dateOfBirth} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>GENDER:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.gender} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>FATHER NAME:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.fatherName} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>MOTHER NAME:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.motherName} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>QUALIFICATION:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.highestQualification} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ minWidth: 180 }}>POLITICAL AFFILIATION:</Typography>
  //         <Typography sx={{ ml: 10 }}>
  //           {' '}
  //           {userData?.UserProfile?.politicalPartyAffiliation}{' '}
  //         </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>CURRENT JOB:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.currentJobTitle} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>WHATSAPP NO.:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.whatsappNumber} </Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>NATIONALITY:</Typography>
  //         <Typography sx={{ ml: 10 }}> {userData?.UserProfile?.nationality}</Typography>
  //       </Stack>
  //     </Stack>
  //   </Card>
  // );

  // const renderIdentityDetails = (
  //   <Card sx={{ minWidth: 300 }}>
  //     <CardHeader title="IdentityDetails" />
  //     <Stack spacing={2} sx={{ p: 3 }}>
  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>Identity Type:</Typography>
  //         <Typography sx={{ ml: 10 }}>{userData?.UserIdentityDetails[0]?.identityType}</Typography>
  //       </Stack>

  //       <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
  //         <Typography sx={{ mr: 1, minWidth: 180 }}>Identity Number:</Typography>
  //         <Typography sx={{ ml: 10 }}>
  //           {userData?.UserIdentityDetails[0]?.identityNumber}
  //         </Typography>
  //       </Stack>
  //     </Stack>
  //   </Card>
  // );

  // const renderAddresses = (
  //   <Card sx={{ minWidth: 300 }}>
  //     <CardHeader title="Address" />
  //     <Stack spacing={2} sx={{ p: 3 }}>
  //       <Stack direction="row" gap={1}>
  //         <Typography>{userData?.UserAddressesses[0]?.streetAddress} ,</Typography>
  //         <Typography>{userData?.UserAddressesses[0]?.userCity} ,</Typography>
  //         <Typography>{userData?.UserAddressesses[0]?.userState}</Typography>
  //       </Stack>
  //       <Stack direction="row" gap={1}>
  //         <Typography>{userData?.UserAddressesses[0]?.postalCode}, </Typography>
  //         <Typography>{userData?.UserAddressesses[0]?.country}, </Typography>
  //         <Typography>{userData?.UserAddressesses[0]?.addressType}</Typography>
  //       </Stack>
  //     </Stack>
  //   </Card>
  // );

  return (
    <Grid container spacing={3} gap={3}>
      <>
        {userData && (
          <Grid xs={12} md={4}>
            <Stack spacing={3}>{renderAbout}</Stack>
          </Grid>
        )}
        {/* <Grid direction="column">
          {userData?.UserProfile != null && <Stack spacing={3}>{renderProfile}</Stack>}
          {userData?.UserIdentityDetails?.length !== 0 && (
            <Stack spacing={3} mt={4}>
              {renderIdentityDetails}
            </Stack>
          )}

          {userData?.UserAddressesses?.length !== 0 && (
            <Stack spacing={3} mt={4}>
              {renderAddresses}
            </Stack>
          )}
        </Grid> */}
      </>
    </Grid>
  );
}

CandidateHome.propTypes = {
  info: PropTypes.object,
  posts: PropTypes.array,
};
