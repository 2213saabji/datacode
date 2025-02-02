import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetElection } from 'src/api/election';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import ElectionDetailsHero from '../election-details-hero';

// ----------------------------------------------------------------------

export default function ElectionDetailsView({ id }) {
  const { election, electionError } = useGetElection(id);
  const [electionData, setElectionData] = useState({});

  useEffect(() => {
    if (election && election.data) {
      setElectionData(election.data);
    }
  }, [election]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${electionError?.message}`}
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

  const renderPost = election && (
    <>
      <ElectionDetailsHero title="ELECTION DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Election',
              href: paths.dashboard.electionmanagement.root,
            },
            {
              name: 'Details',
              href: paths.electionmanagement,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Election Title:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionTitle}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Election Description:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionDescription}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Election Date:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionDate}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Start Time:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionStartTime}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>End Time:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionEndTime}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Election Type:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Security Measures:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.securityMeasures}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Method:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.electionInstrumentUsed}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Eligibility Type:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.eligibilityType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Nomination Start:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.nominationStart}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Nomination End:</Typography>
              <Typography sx={{ ml: 1 }}> {electionData?.nominationEnd}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {electionError && renderError}

      {election && renderPost}
    </>
  );
}
ElectionDetailsView.propTypes = {
  id: PropTypes.string,
};
