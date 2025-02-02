import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetPool } from 'src/api/poolManagement';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PoolNewEditForm from '../pooling-Management-new-edit-form';

// ----------------------------------------------------------------------

export default function PoolingEditView({ id }) {
  const settings = useSettingsContext();

  const { pool: currentPool } = useGetPool(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT POLL"
        links={[
          {
            name: 'Poll Management',
            href: paths.dashboard.poolmanagement.root,
          },
          { name: currentPool?.data.pollingStationName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <PoolNewEditForm currentPool={currentPool} />
    </Container>
  );
}

PoolingEditView.propTypes = {
  id: PropTypes.string,
};
