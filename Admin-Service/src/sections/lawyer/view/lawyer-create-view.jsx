import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import LawyerNewEditForm from '../lawyer-new-edit-form';
// ----------------------------------------------------------------------

export default function LawyerCreateView() {
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
          heading="CREATE A NEW LAWYER"
          links={[
            {
              name: 'Lawyer ',
              href: paths.dashboard.lawyer.root,
            },
            { name: 'New Lawyer' },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />
        <LawyerNewEditForm />
      </Container>
    </>
  );
}
