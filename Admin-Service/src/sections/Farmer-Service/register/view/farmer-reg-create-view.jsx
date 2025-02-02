import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FarmerTractorNewEditForm from '../farmer-Tractor-new-edit-form';
import ModernAgriEditForm from '../farmer-modernAgriculture-new-edit-form';
import IrrigationEditForm from '../farmer-irrigrationSystems-new-edit-form';
import HarvestersNewEditForm from '../farmer-combineHarvesters-new-edit-form';
import CultivationEquipEditForm from '../farmer-cultivationEquip-new-edit-form';

// ----------------------------------------------------------------------

export default function FarmerRegCreateView() {
  const settings = useSettingsContext();

  const sellerLocalData =
    localStorage.getItem('sellerDetails') !== 'undefined' && localStorage.getItem('sellerDetails');
  const seller = sellerLocalData !== 'undefined' ? JSON.parse(sellerLocalData) : {};

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

  const renderForm = () => {
    switch (seller.sellerType) {
      case 'Tractor':
        return <FarmerTractorNewEditForm />;
      case 'Combine Harvester':
        return <HarvestersNewEditForm />;
      case 'Irrigration System':
        return <IrrigationEditForm />;
      case 'Cultivation Equipment':
        return <CultivationEquipEditForm />;
      default:
        return <ModernAgriEditForm />;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading={`ADD NEW ${seller?.sellerType?.toUpperCase() || ''} DETAILS`}
        links={[
          {
            name: 'Company Registration',
            href: paths.dashboard.FarmerService.root,
          },
          { name: 'New Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: 5,
        }}
      />

      {seller?.sellerType ? renderForm() : renderError}
    </Container>
  );
}
