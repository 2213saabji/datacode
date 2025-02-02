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
import CandidateDetailsHero from '../user-profile-details-hero';

export default function UserProfileDetailsView({ id }) {
  const { user, userError } = useGetUser(id);
  console.log('fm', user);
  const [userData, setUserData] = useState({});
  const [userAddressData, setUserAddressData] = useState({});
  const [userIdentityData, setUserIdentityData] = useState({});

  useEffect(() => {
    if (user) {
      const { UserAddressesses, userIdentityDetails, ...restUserData } = user.data;
      setUserData(restUserData);
      setUserAddressData(UserAddressesses[0]); // Assuming there's only one address, adjust accordingly if needed
      setUserIdentityData(userIdentityDetails[0]); // Assuming there's only one identity, adjust accordingly if needed
    }
  }, [user]);

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
              href: paths.dashboard.userProfileManagement.root,
            },
            {
              name: 'Details',
              href: paths.userProfileManagement,
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
              <Typography sx={{ mr: 1, minWidth: 180 }}>Current Job Title:</Typography>
              <Typography sx={{ ml: 1 }}> {userData.currentJobTitle}</Typography>
            </Stack>

            {userIdentityData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Identity Type:</Typography>
                <Typography sx={{ ml: 1 }}> {userIdentityData.identityType}</Typography>
              </Stack>
            )}

            {userIdentityData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Identity Number:</Typography>
                <Typography sx={{ ml: 1 }}> {userIdentityData.identityNumber}</Typography>
              </Stack>
            )}

            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Street Address:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.streetAddress}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>City:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.city}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.state}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Postal Code:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.postalCode}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Latitude:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.latitude}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Longitude:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.longitude}</Typography>
              </Stack>
            )}
            {userAddressData && (
              <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                <Typography sx={{ mr: 1, minWidth: 180 }}>Address Type:</Typography>
                <Typography sx={{ ml: 1 }}> {userAddressData.addressType}</Typography>
              </Stack>
            )}
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {userError && renderError}
      {user && renderPost}
    </>
  );
}

UserProfileDetailsView.propTypes = {
  id: PropTypes.string,
};
