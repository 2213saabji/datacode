import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CardHeader, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function VoterBoothDetails({ voterBoothData }) {
  const BoothData = voterBoothData?.WardDetails?.[0]?.BoothDetails?.[0] ?? {};
  const renderBoothDetails = (
    <Grid container spacing={3} sx={{ maxWidth: 800 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={2}
        sx={{ width: '100%', pb: 1, bgcolor: '#f4f6f8' }}
      >
        <CardHeader title="Booth Details" />
        <CardHeader title="Description" />
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ minWidth: 180 }}>Booth Name: </Typography>
          <Typography>{BoothData?.boothName}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ minWidth: 180 }}>Street Address:</Typography>
          <Typography> {BoothData?.boothStreetAddress} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ minWidth: 180 }}>City:</Typography>
          <Typography> {BoothData?.boothCity} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ minWidth: 180 }}>State:</Typography>
          <Typography> {BoothData?.boothState} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ minWidth: 180 }}>Capacity:</Typography>
          <Typography> {BoothData?.boothCapacity} </Typography>
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
        {renderBoothDetails}
      </Stack>
    </Grid>
  );
}
VoterBoothDetails.propTypes = {
  voterBoothData: PropTypes.object,
};
