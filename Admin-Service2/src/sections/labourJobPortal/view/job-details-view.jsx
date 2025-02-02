import PropTypes from 'prop-types';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { fDate } from 'src/utils/format-time';

import { useGetJob } from 'src/api/labour_job';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';

import JobDetailsToolbar from '../job-details-toolbar';

// ----------------------------------------------------------------------

export default function JobDetailsView({ id, selfCoordinates }) {
  const { job } = useGetJob(id);

  const jobData = job?.data || {};

  const settings = useSettingsContext();

  function handleGetDirection() {
    window.open(
      `https://www.google.com/maps/dir/?api=1&origin=${selfCoordinates.lat}%2C${selfCoordinates.lng}&destination=${jobData.latitude}%2C${jobData.longitude}&travelmode=driving`,
      '_blank'
    );
  }

  const renderContent = (
    <Stack component={Card} spacing={3} sx={{ p: 3 }}>
      <Typography variant="h4">{jobData?.jobTitle?.toUpperCase()}</Typography>

      <Stack spacing={2}>
        <Typography variant="h6">Work Description</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="paragraph">{jobData.jobDescription}</Typography>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Key Responsibilities</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ul style={{ padding: '0 20px', margin: 0 }}>
            {jobData?.responsibilities?.map((req) => (
              <li>{req}</li>
            ))}
          </ul>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Requirements</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <ul style={{ padding: '0 20px', margin: 0 }}>
            {jobData?.requirements?.map((req) => (
              <li>{req}</li>
            ))}
          </ul>
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">Benefits</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          {jobData?.benefits?.map((benefit, idx) => (
            <Chip key={idx} label={benefit} variant="soft" />
          ))}
        </Stack>
      </Stack>

      <Stack spacing={2}>
        <Typography variant="h6">How To Apply</Typography>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Typography variant="paragraph">{jobData.howToApply}</Typography>
        </Stack>
      </Stack>
    </Stack>
  );

  const renderOverview = (
    <Stack component={Card} spacing={2} sx={{ p: 3 }}>
      {[
        {
          label: 'Date Posted',
          value: fDate(jobData.created_at),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Expiration date',
          value: fDate(jobData.applicationDeadline),
          icon: <Iconify icon="solar:calendar-date-bold" />,
        },
        {
          label: 'Employment type',
          value: jobData.employmentType,
          icon: <Iconify icon="solar:clock-circle-bold" />,
        },
        {
          label: 'Offered salary',
          value: `₹ ${jobData?.salary?.price} (${jobData?.salary?.type}) `,
          icon: <Iconify icon="solar:wad-of-money-bold" />,
        },
      ].map((item) => (
        <Stack key={item.label} spacing={1.5} direction="row">
          {item.icon}
          <ListItemText
            primary={item.label}
            secondary={item.value}
            primaryTypographyProps={{
              typography: 'body2',
              color: 'text.secondary',
              mb: 0.5,
            }}
            secondaryTypographyProps={{
              typography: 'subtitle2',
              color: 'text.primary',
              component: 'span',
            }}
          />
        </Stack>
      ))}
    </Stack>
  );

  const renderCompany = (
    <Stack
      component={Paper}
      variant="outlined"
      spacing={2}
      direction="row"
      sx={{ p: 3, borderRadius: 2, mt: 3 }}
    >
      <Stack spacing={1}>
        <Typography variant="h6">COMPANY DETAILS</Typography>
        <Typography variant="subtitle1">{jobData.companyName}</Typography>
        <Typography variant="body2">{jobData.location}</Typography>
        {/* <Typography variant="body2">{job.company.phoneNumber}</Typography> */}
      </Stack>
      <Stack direction="row" alignItems="end" sx={{ marginTop: '15px' }}>
        <Button variant="contained" onClick={() => handleGetDirection()}>
          Get Direction
        </Button>
      </Stack>
    </Stack>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <JobDetailsToolbar backLink={paths.dashboard.labour_job_portal.subList(jobData?.jobType)} />
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          {renderContent}
        </Grid>

        <Grid xs={12} md={4}>
          {renderOverview}

          {renderCompany}
        </Grid>
      </Grid>
    </Container>
  );
}

JobDetailsView.propTypes = {
  id: PropTypes.string,
  selfCoordinates: PropTypes.object,
};
