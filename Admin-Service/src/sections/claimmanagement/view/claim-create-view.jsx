import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClaimNewEditForm from '../claim-new-edit-form';

// ----------------------------------------------------------------------

export default function ClaimCreateView() {
  const settings = useSettingsContext();

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
        heading="CREATE A NEW CLAIM"
        links={[
          {
            name: 'Claim Management',
            href: paths.dashboard.claim.root,
          },
          { name: 'New Claim' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ClaimNewEditForm />
    </Container>
  );
}
