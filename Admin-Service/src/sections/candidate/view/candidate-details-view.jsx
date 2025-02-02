import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCandidate } from 'src/api/candidate';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import CandidateDetailsHero from '../candidate-details-hero';

// ----------------------------------------------------------------------

export default function CandidateDetailsView({ id }) {
  const { candidate, candidateError } = useGetCandidate(id);
  const [candidateData, setCandidateData] = useState({});
  const [candidateProfile, setCandidateProfile] = useState({});

  useEffect(() => {
    if (candidate && candidate.data) {
      // console.log("===============>",candidate);
      setCandidateData(candidate.data);
      setCandidateProfile(candidate.data.User);
    }
  }, [candidate]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${candidateError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.candidate}
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

  const renderPost = candidate && (
    <>
      <CandidateDetailsHero title="CANDIDATE DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Candidate',
              href: paths.dashboard.candidate.root,
            },
            {
              name: 'Details',
              href: paths.candidate,
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
                {candidateProfile?.UserProfile === null ||
                candidateProfile?.UserProfile?.firstName === null
                  ? candidateProfile?.phone
                  : candidateProfile?.UserProfile?.firstName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone No.:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {candidateProfile?.phone}</Typography>
                {candidateProfile?.isMobileVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {candidateProfile?.email}</Typography>
                {candidateProfile?.isEmailVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Legal Case:</Typography>
              <Typography sx={{ ml: 1 }}> {candidateData.legalCase}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {candidateError && renderError}

      {candidate && renderPost}
    </>
  );
}
CandidateDetailsView.propTypes = {
  id: PropTypes.string,
};
