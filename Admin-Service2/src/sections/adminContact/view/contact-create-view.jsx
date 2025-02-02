import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContactNewEditForm from '../contact-new-edit-form';

// ----------------------------------------------------------------------

export default function ContactCreateView() {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="CREATE A NEW CONTACT"
        links={[
          {
            name: 'Contact ',
            href: paths.dashboard.contact.root,
          },
          { name: 'New Contact' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ContactNewEditForm />
    </Container>
  );
}
