import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetBooth } from 'src/api/booth';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BoothNewEditForm from '../booth-new-edit-form';

// ----------------------------------------------------------------------

export default function BoothEditView({ id }) {
  const settings = useSettingsContext();
  const { booth: currentBooth } = useGetBooth(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT BOOTH DETAILS"
        links={[
          {
            name: 'Booth Management',
            href: paths.dashboard.boothmanagement.root,
          },
          { name: currentBooth?.data.boothName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <BoothNewEditForm currentBooth={currentBooth} />
    </Container>
  );
}

BoothEditView.propTypes = {
  id: PropTypes.string,
};
