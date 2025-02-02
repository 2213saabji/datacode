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

import { useGetDriver } from 'src/api/driver';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import DriverDetailsHero from '../lawyer-details-hero';


// ----------------------------------------------------------------------

export default function LawyerDetailsView({ id }) {
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
      <DriverDetailsHero title='LAWYER DETAILS' coverUrl={BannerBlurImg} />

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
              name: 'Lawyer',
              href: paths.dashboard.Lawyer.root,
            },
            {
              name: 'Details',
              href: paths.Lawyer,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Full Name:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.fullName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone Number:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>PaymentMethod:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.paymentMethod}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>LicenseNumber:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.licenseNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>license Expiration Date:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.licenseExpirationDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Address:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.address}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>License Issuing State:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.licenseIssuingState}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Account Type:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.accountType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Typography sx={{ ml: 1 }}> {driverData.email}</Typography>
            </Stack>
           
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
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
LawyerDetailsView.propTypes = {
  id: PropTypes.string,
};