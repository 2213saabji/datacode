import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetContact } from 'src/api/contact';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContactNewEditForm from '../contact-new-edit-form';

// ----------------------------------------------------------------------

export default function ContactEditView({ id }) {
  const settings = useSettingsContext();

  const { contact: currentContact } = useGetContact(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Edit Contact Details"
        links={[
          {
            name: ' Contact',
            href: paths.dashboard.contact.root,
          },
          { name: currentContact?.data.name },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ContactNewEditForm currentContact={currentContact} />
    </Container>
  );
}

ContactEditView.propTypes = {
  id: PropTypes.string,
};
