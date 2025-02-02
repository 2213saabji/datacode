import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CattlesNewEditForm from '../cattle-new-edit-form';

export default function CattleRegCreateView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

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
      <Button
        component={RouterLink}
        to="/dashboard/FarmerService"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="ADD NEW CATTLE DETAILS"
        links={[
          {
            name: 'Cattle Registration',
            href: paths.dashboard.FarmerService.root,
          },
          { name: 'New Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: 5,
        }}
      />

      <CattlesNewEditForm />
    </Container>
  );
}