import PropTypes from 'prop-types';

import { Button } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetContract } from 'src/api/contract';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContractNewEditForm from '../contract-new-edit-form';
// ----------------------------------------------------------------------

export default function ContractEditView({ id }) {
  const settings = useSettingsContext();

  const { lawyer: currentDriver } = useGetContract(id);

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
          heading="EDIT CONTRACT DETAILS"
          links={[
            // { name: 'Dashboard', href: paths.dashboard.root },
            {
              name: 'Contract',
              href: paths.dashboard.LMS_contract.root,
            },
            { name: currentDriver?.data.serviceArea },
          ]}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        />

        <ContractNewEditForm currentDriver={currentDriver} />
      </Container>
    </>
  );
}

ContractEditView.propTypes = {
  id: PropTypes.string,
};
