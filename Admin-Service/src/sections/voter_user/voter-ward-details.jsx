import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CardHeader, Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function VoterWardDetails({ voterWardData }) {
  const wardData = voterWardData && voterWardData?.WardDetails ? voterWardData?.WardDetails[0] : {};

  const renderProfile = (
    <Grid container spacing={3} sx={{ maxWidth: 800 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={10}
        sx={{ pb: 1, width: '100%', bgcolor: '#f4f6f8' }}
      >
        <CardHeader title="Ward Details" />
        <CardHeader title="Description" />
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Ward Name: </Typography>
          <Typography>{wardData?.wardName}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Street Address:</Typography>
          <Typography> {wardData?.wardStreetAddress} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>City:</Typography>
          <Typography> {wardData?.wardCity} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>State:</Typography>
          <Typography> {wardData?.wardState} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Capacity:</Typography>
          <Typography> {wardData?.wardCapacity}</Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>Emergency No:</Typography>
          <Typography> {wardData?.emergencyContactNumber} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>
            Incident Reporting:
          </Typography>
          <Typography> {wardData?.incidentReporting} </Typography>
        </Stack>

        <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          <Typography sx={{ mr: 10, minWidth: { xs: 120, md: 180 } }}>
            Security Measures:
          </Typography>
          <Typography> {wardData?.securityMeasures} </Typography>
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
VoterWardDetails.propTypes = {
  voterWardData: PropTypes.object,
};
