import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
// import { useGetUsers } from 'src/api/user';
import { Modal } from '@mui/material';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { GetVoterReferral } from 'src/api/user';
// import { useGetPools } from 'src/api/poolManagement';
import { createVoterProfile, UpdateVoterProfile } from 'src/api/voter';

import FormProvider from 'src/components/hook-form'; // RHFAutocomplete, // RHFTextField,
import { useSnackbar } from 'src/components/snackbar';

import GetLink from './get-link';

// ----------------------------------------------------------------------

export default function VoterReferalNewEditForm({ currentVoter }) {
  const navigate = useNavigate();

  const voterId = currentVoter?.data.voterProfileId;

  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  // const response = GetVoterReferral(user?.accessToken)
  // console.log("voterReferral----->", response)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  console.log(handleOpen);
  const handleClose = () => setOpen(false);

  // for getting all voters those have voter profile id

  // const { voters: voterList } = useGetVoters();
  // const VoterListArr = voterList?.data || [];
  // const VoterProfileList = VoterListArr?.map((voter) => voter.userId) || [];

  // for getting all the users

  // const { users: usersList } = useGetUsers();

  // const allUserArr = usersList?.data || [];

  // const usersListArr = usersList && usersList.data ? usersList.data.filter(user => !VoterProfileList.includes(user.userId)) : []

  // const UserData = usersListArr.map((list) => ({
  //   value: list.userId,
  //   label: list.userName,
  // }));

  // const AllUserData = allUserArr.map((list) => ({
  //   value: list.userId,
  //   label: list.userName,
  // }));

  // const AllUserDataForOptions = AllUserData.map((option) => option.value);

  // const UserListDataForOptions = UserData.map((option) => option.value);

  // for getting all the polling stations

  // const { pools: pollList } = useGetPools();

  // const pollListArr = pollList?.data || [];

  // const PollData = pollListArr.map((list) => ({
  //   value: list.pollingStationId,
  //   label: list.pollingStationName,
  // }));

  // const PollListDataForOptions = PollData.map((option) => option.value);

  // Schema
  const VoterSchema = Yup.object().shape({
    emailId: Yup.string().required('Email is required'),
    yourLink: Yup.string().required('Link is required'),
    fullName: Yup.string().required('Full Name is required'),
  });

  const defaultValues = useMemo(
    () => ({
      emailId: currentVoter?.data.userId || '',
      fullName: currentVoter?.data.upiId || '',
    }),
    [currentVoter]
  );

  const methods = useForm({
    resolver: yupResolver(VoterSchema),
    defaultValues,
  });

  // for Profile from
  const { handleSubmit, reset } = methods;

  useEffect(() => {
    if (currentVoter) {
      reset(defaultValues);
    }
  }, [currentVoter, defaultValues, reset]);

  //  Profile Creation function

  const onSubmitProfile = handleSubmit(async (data) => {
    try {
      const response = await createVoterProfile(data);

      if (response) {
        enqueueSnackbar('Voter Profile created successfully', { variant: 'success' });
        navigate('/dashboard/voter');
      } else {
        enqueueSnackbar('Failed to create voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting voter profile:', error);
      enqueueSnackbar('An error occurred while creating voter profile', { variant: 'error' });
    }
  });

  // Profile Update function

  const onSubmitProfileUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdateVoterProfile(voterId, data);

      if (response) {
        enqueueSnackbar('Voter Profile updated successfully', { variant: 'success' });
        navigate(`/dashboard/voter/${voterId}`);
      } else {
        enqueueSnackbar('Failed to update voter profile', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating  voter profile:', error);
      enqueueSnackbar('An error occurred while updating voter profile', { variant: 'error' });
    }
  });

  const handleShare = async () => {
    try {
      const response = await GetVoterReferral(user?.accessToken);
      const token = response?.data?.data?.referralToken;
      const URL =
        import.meta.env.VITE_NODE_ENV === 'PROD'
          ? `https://app.attplems.com/auth/jwt/register?referralToken=${token}`
          : `https://appdev.attplems.com/auth/jwt/register?referralToken=${token}`;
      sessionStorage.setItem('referralURL', URL);
      // console.log("voterReferral----->", response)
      if (navigator.share) {
        await navigator.share({
          title: 'Share Example',
          text: 'Check out this link!',
          url: URL,
        });
        // console.log('Shared successfully');
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
      // Fallback for browsers that do not support Web Share API
      alert('Your browser does not support sharing.');
    }
  };

  // const referralData = useGetVoterReferral(user?.accessToken);
  // const handleInviteFriend = async () => {
  //   try {
  //     console.log(referralData)
  //     await handleShare();
  //   } catch (error) {
  //     console.error('Error inviting friend:', error);
  //   }
  // };

  return (
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
            // width: 400,
            // bgcolor: 'background.paper',
            // border: '2px solid #000',
            // boxShadow: 24,
            p: 4,
          }}
        >
          <GetLink />
        </Box>
      </Modal>
      {user.userRoleId === 9 && (
        <FormProvider
          methods={methods}
          onSubmit={currentVoter ? onSubmitProfileUpdate : onSubmitProfile}
        >
          <Grid xs={12} md={8}>
            {/* <Typography variant="h6" sx={{ color: 'rgb(37, 150, 190)' }}>
              Spread the world, reap the reward: Refer a friend, both wins restored!
            </Typography>
             */}
            <Card
              sx={{
                p: 3,
                height: 350,
                width: { md: 380 },
                boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
                '@media (max-width:900px)': {
                  mt: 5,
                  alignContent: 'center',
                },
              }}
            >
              <Box
                display="grid"
                sx={{
                  height: 240,
                  width: { md: 350 },
                  display: 'flex',
                  justifyContent: 'center',
                  // alignItems: 'center',
                }}
              >
                <img
                  src="/assets/images/voterreferral/Voter_Referral_Clip_art.png"
                  alt="voterImg"
                />
                {/* <RHFTextField sx={{ mt: 2 }} name="emailId" label="Email Id" />
                <RHFTextField sx={{ mt: 2 }} name="fullName" label="Full Name" /> */}
              </Box>

              <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                <LoadingButton
                  type="submit"
                  variant="contained"
                  onClick={() => handleShare()}
                  fullWidth="100%"
                  sx={{ bgcolor: 'rgb(37, 150, 190)' }}
                >
                  Invite Your Friend and Get Rs 10.
                </LoadingButton>
              </Stack>
            </Card>
          </Grid>
        </FormProvider>
      )}
    </>
  );
}

VoterReferalNewEditForm.propTypes = {
  currentVoter: PropTypes.object,
};
