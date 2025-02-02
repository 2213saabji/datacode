import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CardHeader, Typography } from '@mui/material';
// ----------------------------------------------------------------------

export default function VoterElectionDetails({ voterElectionData }) {
  const renderProfile = (
    <Grid container spacing={3} sx={{ maxWidth: 800 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        sx={{ pb: 1, width: '100%', bgcolor: '#f4f6f8' }}
      >
        <CardHeader title="Election Details" />
        <CardHeader title="Description" />
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Election Titles: </Typography>
          <Typography>{voterElectionData?.electionTitle}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Election Type:</Typography>
          <Typography> {voterElectionData?.electionType} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Election Date:</Typography>
          <Typography> {voterElectionData?.electionDate} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Start Time:</Typography>
          <Typography> {voterElectionData?.electionStartTime} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>End Time:</Typography>
          <Typography> {voterElectionData?.electionEndTime} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Election Method:</Typography>
          <Typography> {voterElectionData?.electionInstrumentUsed} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>
            Election Description:
          </Typography>
          <Typography> {voterElectionData?.electionDescription} </Typography>
        </Stack>
      </Stack>
    </Grid>
  );

  return (
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
  );
}
VoterElectionDetails.propTypes = {
  voterElectionData: PropTypes.object,
};
