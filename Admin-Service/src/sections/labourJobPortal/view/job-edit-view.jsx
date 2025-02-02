import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetJob } from 'src/api/labour_job';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobEditView({ id }) {
  const settings = useSettingsContext();

  const { job } = useGetJob(id);

  const jobData = job?.data || {};

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT JOB POST"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Job List',
            href: paths.dashboard.labour_job_portal.root,
          },
          { name: jobData?.jobTitle },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm jobData={jobData} />
    </Container>
  );
}

JobEditView.propTypes = {
  id: PropTypes.string,
};
