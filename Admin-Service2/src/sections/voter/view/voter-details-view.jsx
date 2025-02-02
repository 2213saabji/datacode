import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetVoter } from 'src/api/voter';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify/iconify';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import EmptyContent from 'src/components/empty-content/empty-content';

import BannerBlurImg from './assets/overlay_2.jpg';
import VoterDetailsHero from '../voter-details-hero';

// ----------------------------------------------------------------------

export default function VoterDetailsView({ id }) {
  const { voter, voterError } = useGetVoter(id);
  const [voterData, setVoterData] = useState({});
  const [voterProfile, setVoterProfile] = useState({});

  useEffect(() => {
    if (voter && voter.data) {
      setVoterData(voter.data);
      setVoterProfile(voter.data.User);
    }
  }, [voter]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${voterError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.voter}
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

  const renderPost = voter && (
    <>
      <VoterDetailsHero title="" coverUrl={BannerBlurImg} />

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
              name: 'Voter',
              href: paths.dashboard.voter.root,
            },
            {
              name: 'Details',
              href: paths.voter,
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
                {voterProfile?.UserProfile === null || voterProfile?.UserProfile?.firstName === null
                  ? voterProfile?.phone
                  : voterProfile?.UserProfile?.firstName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone No.:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {voterProfile.phone}</Typography>
                {voterProfile.isMobileVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {voterProfile.email}</Typography>
                {voterProfile.isEmailVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>UPI ID:</Typography>
              <Typography sx={{ ml: 1 }}> {voterData.upiId}</Typography>
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

      {voterError && renderError}

      {voter && renderPost}
    </>
  );
}
VoterDetailsView.propTypes = {
  id: PropTypes.string,
};
