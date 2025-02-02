import PropTypes from 'prop-types';
import { useState, useEffect,useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useGetVendor } from 'src/api/vendor';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../vendor-details-hero';

// ----------------------------------------------------------------------

export default function VendorDetailsView({ id }) {
  const { vendor, vendorError } = useGetVendor(id);
  console.log(vendor);
  const router = useRouter();
  const [driverData, setDriverData] = useState({});
  const [caseAccepted, setCaseAccepted] = useState(false);
  useEffect(() => {
    if (vendor && vendor.data) {
      setDriverData(vendor.data);
    }
  }, [vendor]);
  // const handleViewContract = useCallback(() => {
  //   router.push(paths.dashboard.LMS_contract.create);
  // }, [router]);

  const handleViewCase = useCallback(() => {
    router.push({ pathname: paths.dashboard.LMS_document.create });
  }, [router]);
  
  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i += 1) {
      stars.push(
        i <= rating / 2 ? (
          <StarIcon key={i} style={{ color: 'gold' }} />
        ) : (
          <StarBorderIcon key={i} style={{ color: 'gold' }} />
        )
      );
    }
    return stars;
  };

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${vendorError?.message}`}
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

  const renderPost = vendor && (
    <>
      {/* <DriverDetailsHero title="VENDOR DETAILS" coverUrl={BannerBlurImg} /> */}
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
              name: 'Vendor',
              // href: paths.dashboard.lms_vendor.root,
            },
            {
              name: 'Details',
              href: paths.lms_vendor,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>
      ;
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack
          sx={{
            maxWidth: 720,
            mx: 'auto',
            px: 3,
            py: 4,
            borderRadius: '12px',
            border: '1px solid #ddd',
            boxShadow: '0px 6px 12px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#fff',
          }}
        >
          <Stack spacing={2}>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                Full Name:
              </Typography>
              <Typography variant="body1"> {driverData.providerName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                Registration Number:
              </Typography>
              <Typography variant="body1"> {driverData.registrationNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                Service Area:
              </Typography>
              <Typography variant="body1"> {driverData.serviceArea}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                License Certification:
              </Typography>
              <Typography variant="body1"> {driverData.licenseCertification}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                ServiceArea State:
              </Typography>
              <Typography variant="body1"> {driverData.serviceAreaState}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                Rating:
              </Typography>
              {/* <Typography variant="body1"> {driverData.rating}</Typography> */}
              <Typography variant="body1"> {renderStars(driverData.rating)}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" spacing={2}>
              <Typography variant="subtitle1" sx={{ fontWeight: 'bold', minWidth: 180 }}>
                Service Description:
              </Typography>
              <Typography variant="body1"> {driverData.serviceDescription}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ my: 4 }} />
          <Stack direction="row" alignItems="center" spacing={5}>
            <Button variant="contained" sx={{ alignSelf: 'center' }} onClick={handleViewCase}>
              Send Case Details
            </Button>
            {/* <Button
              variant="contained"
              sx={{ alignSelf: 'center' }}
              onClick={handleViewContract}
              disabled={!caseAccepted} // Disable if case is not accepted
            >
              Sign Contract
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {vendorError && renderError}

      {vendor && renderPost}
    </>
  );
}
VendorDetailsView.propTypes = {
  id: PropTypes.string,
};
