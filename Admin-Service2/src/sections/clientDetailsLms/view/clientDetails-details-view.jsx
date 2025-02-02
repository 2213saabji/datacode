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

import { useGetClientDetail } from 'src/api/clientDetails';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../client-details-hero';

// ----------------------------------------------------------------------

export default function ClientDetailsDetailsView({ id }) {
  const { client, clientError } = useGetClientDetail(id);
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
              href: paths.dashboard.LMS_caseDetails.root,
            },
            {
              name: 'Details',
              href: paths.LMS_caseDetails,
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
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>User Name:</Typography>
              <Typography>{clientData.userId}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={1}>
              <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Case Name:</Typography>
              <Typography>{clientData.caseId}</Typography>
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
ClientDetailsDetailsView.propTypes = {
  id: PropTypes.string,
};
