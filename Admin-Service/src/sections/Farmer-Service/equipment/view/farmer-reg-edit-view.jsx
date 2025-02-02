import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useGetEquipment, useGetEquipmentDetail } from 'src/api/agriculture/equipment';

import FormDetailsNewEditForm from '../farmer-details-new-edit-form'


// ----------------------------------------------------------------------

export default function FarmerRegEditView({ id, equipmentDetailsId }) {
  const settings = useSettingsContext();

  const { equipment: currentEquipment } = useGetEquipment(id);
  const { equipmentDetail: currentEquipmentDetail } = useGetEquipmentDetail(equipmentDetailsId);


  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title='Having some issue!'
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
        heading='EDIT EQUIPMENT DETAILS'
        links={[
          {
            name: 'EQUIPMENTS',
            href: paths.dashboard.FarmerService,
          },
          { name: 'Equipment' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <FormDetailsNewEditForm currentEquipment={currentEquipment} currentEquipmentDetail={currentEquipmentDetail} />
    </Container>
  );
}

FarmerRegEditView.propTypes = {
  id: PropTypes.string,
  equipmentDetailsId: PropTypes.string
};
