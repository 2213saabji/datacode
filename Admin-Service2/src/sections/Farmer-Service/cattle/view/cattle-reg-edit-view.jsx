/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCattle, useGetCattleDetailsData } from 'src/api/agriculture/cattle';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CattlesNewEditForm from '../cattle-new-edit-form';

// ----------------------------------------------------------------------

export default function CattleRegEditView({ id, cattleId }) {
  const settings = useSettingsContext();

  const { cattle: currentCattle } = useGetCattle(id)
  const { cattleDetail: currentCattleDetail } = useGetCattleDetailsData(cattleId)


  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title="Having some issue!"
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.FarmerService.new}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT CATTLE DETAILS"
        links={[
          {
            name: 'COMPANY',
            href: paths.dashboard.FarmerService,
          },
          { name: 'product' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <CattlesNewEditForm currentCattle={currentCattle} currentCattleDetail={currentCattleDetail} />
    </Container>
  );
}

CattleRegEditView.propTypes = {
  id: PropTypes.string,
  cattleId: PropTypes.string,
};
