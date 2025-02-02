import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetSmsById } from 'src/api/sms';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SmsNewEditForm from '../sms-new-edit-form';

// ----------------------------------------------------------------------

export default function SmsEditView({ id }) {
  const settings = useSettingsContext();
  const { sms: currentSms } = useGetSmsById(id);
  // console.log(sms)

  // console.log(currentSms)

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT SMS DETAILS"
        links={[
          {
            name: 'Support Management',
            href: paths.dashboard.sms.root,
          },
          { name: currentSms?.data.smshName },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SmsNewEditForm currentSms={currentSms} />
    </Container>
  );
}

SmsEditView.propTypes = {
  id: PropTypes.string,
};
