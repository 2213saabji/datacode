import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetSurveyResponse } from 'src/api/survey';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function JobEditView({ id }) {
  const settings = useSettingsContext();

  const { survey } = useGetSurveyResponse(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="SURVEY EDIT"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Survey',
            href: paths.dashboard.survey.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <JobNewEditForm surveyData={survey} />
    </Container>
  );
}

JobEditView.propTypes = {
  id: PropTypes.string,
};
