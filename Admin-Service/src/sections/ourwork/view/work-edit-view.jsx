import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetWorkbyID } from 'src/api/work';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import WorkNewEditForm from '../work-new-edit-form';

// ----------------------------------------------------------------------

export default function WorkEditView({ id }) {
  const settings = useSettingsContext();

  const { works: currentWork } = useGetWorkbyID(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT WORK DETAILS"
        links={[
          {
            name: ' Our Work ',
            href: paths.dashboard.work.root,
          },
          { name: currentWork?.data.expenseWorkId },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <WorkNewEditForm currentWork={currentWork} />
    </Container>
  );
}

WorkEditView.propTypes = {
  id: PropTypes.string,
};
