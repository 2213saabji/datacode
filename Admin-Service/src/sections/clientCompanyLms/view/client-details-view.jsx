import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetClient } from 'src/api/clientLms';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../client-details-hero';

// ----------------------------------------------------------------------

export default function ClientDetailsView({ id }) {
  const { client, clientError } = useGetClient(id);
  const [clientData, setClientData] = useState({});

  useEffect(() => {
    if (client && client.data) {
      setClientData(client.data);
    }
  }, [client]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${clientError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.driver}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = client && (
    <>
      {/* <DriverDetailsHero title="CLIENT DETAILS" coverUrl={BannerBlurImg} /> */}
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Client',
              href: paths.dashboard.Lms_client.root,
            },
            {
              name: 'Details',
              href: paths.Lms_client,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack
          sx={{
            maxWidth: 720,
            mx: 'auto',
            p: 2,
            borderRadius: '8px',
            boxShadow: 3,
            bgcolor: '#fff',
          }}
        >
          <Stack direction="column" spacing={2}>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Current Job Title:</Typography>
              <Typography>{clientData.currentJobTitle}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Company Name:</Typography>
              <Typography>{clientData.companyName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Contact Person:</Typography>
              <Typography>{clientData.contactPerson}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Phone Number:</Typography>
              <Typography>{clientData.phone}</Typography>
            </Stack>

            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Email:</Typography>
              <Typography>{clientData.email}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Address:</Typography>
              <Typography>{clientData.address}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Industry:</Typography>
              <Typography>{clientData.industry}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Sector:</Typography>
              <Typography>{clientData.sector}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Pan Number:</Typography>
              <Typography>{clientData.panNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>GST Number:</Typography>
              <Typography>{clientData.gstNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Billing Contact:</Typography>
              <Typography>{clientData.billingContact}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Annual Revenue:</Typography>
              <Typography>{clientData.annualRevenue}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ my: 3 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {clientError && renderError}

      {client && renderPost}
    </>
  );
}
ClientDetailsView.propTypes = {
  id: PropTypes.string,
};
