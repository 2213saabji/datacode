import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetDriver } from 'src/api/driver';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import DriverDetailsHero from '../driver-details-hero';

// ----------------------------------------------------------------------

export default function DriverDetailsView({ id }) {
  const { driver, driverError } = useGetDriver(id);
  const [driverData, setDriverData] = useState({});

  useEffect(() => {
    if (driver && driver.data) {
      setDriverData(driver.data);
    }
  }, [driver]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${driverError?.message}`}
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

  const renderPost = driver && (
    <>
      <DriverDetailsHero title="DRIVER DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Driver',
              href: paths.dashboard.driver.root,
            },
            {
              name: 'Details',
              href: paths.driver,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Box
          sx={{
            maxWidth: 720,
            mx: 'auto',
            p: 3, // Padding
            border: '1px solid #ddd', // Border color
            borderRadius: '8px', // Rounded corners
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Shadow effect
            backgroundColor: '#fff', // Background color
          }}
        >
          <Stack spacing={2} alignItems="start">
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>Full Name:</Typography>
              <Typography> {driverData.driverName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                Driver Type:
              </Typography>
              <Typography> {driverData.driverType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                Payment Method:
              </Typography>
              <Typography> {driverData.paymentMethod}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                License Number:
              </Typography>
              <Typography> {driverData.licenseNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                License Expiration Date:
              </Typography>
              <Typography> {driverData.licenseExpirationDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                License Issuing State:
              </Typography>
              <Typography> {driverData.licenseIssuingState}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start">
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>
                Account Type:
              </Typography>
              <Typography> {driverData.accountType}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Box>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {driverError && renderError}

      {driver && renderPost}
    </>
  );
}
DriverDetailsView.propTypes = {
  id: PropTypes.string,
};
