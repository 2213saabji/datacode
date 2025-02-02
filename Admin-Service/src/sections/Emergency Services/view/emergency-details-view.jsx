import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useGetEmergencyNumber } from 'src/api/emergency_service';

// import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import { Typography } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import EmergencyServiceHero from '../emergency-service-hero';

export default function EmergencyDetailsView({ id }) {
  const { emergencyNumber, emergencyNumberError } = useGetEmergencyNumber(id);
  const [emergencyData, setEmergencyData] = useState({});

  useEffect(() => {
    if (emergencyNumber && emergencyNumber?.data) {
      setEmergencyData(emergencyNumber?.data);
    }
  }, [emergencyNumber]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${emergencyNumberError?.message}`}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.ward}
        //     startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
        //     sx={{ mt: 3 }}
        //   >
        //     Back to List
        //   </Button>
        // }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost =
    <>
      {/* <EmergencyServiceHero title='Emergency Servive Details'/> */}

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <Button
          component={RouterLink}
          to="/dashboard/emergencyServices"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
        >
          Back
        </Button>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Emergency Service',
              href: paths.dashboard.emergencyServices.root,
            },
            {
              name: 'Details',
              href: paths.party,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Department Type:</Typography>
              <Typography sx={{ ml: 1 }}> {emergencyData.departmentName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Person:</Typography>
              <Typography sx={{ ml: 1 }}> {emergencyData.contactName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contact Mobile Number:</Typography>
              <Typography sx={{ ml: 1 }}> {emergencyData.phoneNumber}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
    ;

  return (
    <>
      {emergencyNumberError && renderError}

      {emergencyNumber && renderPost}
    </>
  );
}
EmergencyDetailsView.propTypes = {
  id: PropTypes.string,
};
