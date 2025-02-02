import PropTypes from 'prop-types';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetTool } from 'src/api/agriculture/modernAgri';
import { useGetTractor } from 'src/api/agriculture/tractor';
import { useGetIrrigation } from 'src/api/agriculture/irrigation';
import { useGetcultivation } from 'src/api/agriculture/cultivation';
import { useGetCombineHarvester } from 'src/api/agriculture/combineharvesters';

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

export default function FarmerRegEditView({ id }) {
  const settings = useSettingsContext();

  const { irrigation: currentIrrigation } = useGetIrrigation(id);
  console.log('currentIrrigation----->', currentIrrigation);

  const { tool: currentTool } = useGetTool(id);

  const { combineHarvester: currentHarvester } = useGetCombineHarvester(id);

  const { cultivation: currentCultivation } = useGetcultivation(id);

  const { tractor: currentTractor } = useGetTractor(id);

  const sellerLocalData =
    localStorage.getItem('sellerDetails') !== 'undefined' && localStorage.getItem('sellerDetails');
  const seller = sellerLocalData !== 'undefined' ? JSON.parse(sellerLocalData) : {};
  // console.log('seller------>', seller)

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
        return <FarmerTractorNewEditForm currentTractor={currentTractor} />;
      case 'Combine Harvester':
        return <HarvestersNewEditForm currentHarvester={currentHarvester} />;
      case 'Irrigration System':
        return <IrrigationEditForm currentIrrigation={currentIrrigation} />;
      case 'Cultivation Equipment':
        return <CultivationEquipEditForm currentCultivation={currentCultivation} />;
      default:
        return <ModernAgriEditForm currentTool={currentTool} />;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={`EDIT ${seller?.sellerType?.toUpperCase() || ''} DETAILS`}
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

      {seller.sellerType ? renderForm() : renderError}
    </Container>
  );
}

FarmerRegEditView.propTypes = {
  id: PropTypes.string,
};
