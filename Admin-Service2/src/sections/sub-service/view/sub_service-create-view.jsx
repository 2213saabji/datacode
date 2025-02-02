import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SubServiceNewEditForm from '../sub-service-new-edit-form';
// ----------------------------------------------------------------------

export default function SubServiceCreateView() {
  const settings = useSettingsContext();

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
      <Container maxWidth={settings.themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading="CREATE A NEW SUB SERVICE"
          links={[
            {
              name: 'Sub service ',
              href: paths.dashboard.LMS_sub_service.root,
            },
            { name: 'New Sub Service' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <SubServiceNewEditForm />
      </Container>
    </>
  );
}
