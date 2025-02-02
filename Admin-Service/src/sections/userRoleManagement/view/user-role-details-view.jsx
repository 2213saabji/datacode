import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetUser } from 'src/api/user';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import CandidateDetailsHero from '../user-role-details-hero';
// import { CandidateDetailsSkeleton } from '../candidate-skeleton';

// ----------------------------------------------------------------------

export default function UserDetailsView({ id }) {
  const { user, userError } = useGetUser(id);
  const [userData, setUserData] = useState({});
  console.log('userData', userData);

  useEffect(() => {
    if (user) {
      setUserData(user.data);
      console.log('User Data From user details ', user.data);
    }
  }, [user]);

  // const renderSkeleton = <CandidateDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${userError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.user}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = user && (
    <>
      <CandidateDetailsHero title="User Details" coverUrl={BannerBlurImg} />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'User',
              href: paths.dashboard.userRoleManagement.root,
            },
            {
              name: 'Details',
              href: paths.userRoleManagement,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Full Name:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {userData.firstName} {userData.middleName} {userData.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Date Of Birth:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.dateOfBirth}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Mother Name:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.motherName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Gender:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.gender}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Current Job Title:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.currentJobTitle}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.emailAddress}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Number:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.contactNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Number:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.contactNumber}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {userError && renderError}

      {user && renderPost}
    </>
  );
}
UserDetailsView.propTypes = {
  id: PropTypes.string,
};
