import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useGetClaim } from 'src/api/exp_claim';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClaimNewEditForm from '../claim-new-edit-form';

// ----------------------------------------------------------------------

export default function ClaimEditView({ id }) {
  const settings = useSettingsContext();

  const { claim: currentClaim } = useGetClaim(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="EDIT CLAIM DETAILS"
        links={[
          {
            name: 'Claim Management',
            href: paths.dashboard.claim.root,
          },
          { name: currentClaim?.data.expenseClaimId },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <ClaimNewEditForm currentClaim={currentClaim} />
    </Container>
  );
}

ClaimEditView.propTypes = {
  id: PropTypes.string,
};
