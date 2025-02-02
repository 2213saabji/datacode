import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CardHeader, Typography } from '@mui/material';

import VoterCandidateAbout from './voter-candidate-about';
import VoterCandidateSocial from './voter-candidate-social';

// ----------------------------------------------------------------------

export default function VoterCandidateDetail({ candidateDetails }) {
  const renderProfile = (
    <Grid container spacing={3} sx={{ maxWidth: 500, mt: 2 }}>
      <Stack sx={{ width: '100%' }}>
        <CardHeader title="Candidate Details" />
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: 180 }}>Candidate ID: </Typography>
          <Typography>
            {candidateDetails[0]?.candidateProfileId || candidateDetails[0].index}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: 180 }}>Gender:</Typography>
          <Typography>
            {' '}
            {candidateDetails[0]?.User?.UserProfile?.gender || candidateDetails[0].gender}{' '}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: 180 }}>Legal Case:</Typography>
          <Typography>
            {' '}
            {candidateDetails[0]?.legalCase || candidateDetails[0].legalCase}{' '}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: 180 }}>Education Degree:</Typography>
          <Typography>
            {' '}
            {candidateDetails[0]?.User?.UserProfile?.highestQualification ||
              candidateDetails[0].educationDegree}{' '}
          </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: 180 }}>Citizenship Status:</Typography>
          <Typography>
            {' '}
            {candidateDetails[0]?.User?.UserProfile?.nationality ||
              candidateDetails[0].citizenshipStatus}{' '}
          </Typography>
        </Stack>
      </Stack>
    </Grid>
  );

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6} mt={2}>
        <VoterCandidateAbout candidateAbout={candidateDetails} />
      </Grid>

      <Grid
        container
        spacing={3}
        p={2}
        gap={6}
        display="grid"
        borderRadius="none"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack spacing={2} gridColumn="span 2">
          {renderProfile}
        </Stack>
      </Grid>
      <Grid item xs={12} md={6}>
        <VoterCandidateSocial />
      </Grid>
    </Grid>
  );
}
VoterCandidateDetail.propTypes = {
  candidateDetails: PropTypes.object,
};
