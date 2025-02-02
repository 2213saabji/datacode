import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SmsNewEditForm from '../sms-new-edit-form';

// ----------------------------------------------------------------------

export default function SmsCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE SUPPORT TICKET"
        links={[
          {
            name: 'Support Ticket',
            href: paths.dashboard.sms,
          },
          { name: 'New Support Ticket' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <SmsNewEditForm />
    </Container>
  );
}
