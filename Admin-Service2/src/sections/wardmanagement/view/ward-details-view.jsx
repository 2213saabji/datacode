import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetWard } from 'src/api/ward';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import WardDetailsHero from '../ward-details-hero';
// import { CandidateDetailsSkeleton } from '../candidate-skeleton';

// ----------------------------------------------------------------------

export default function WardDetailsView({ id }) {
  const { ward, wardError } = useGetWard(id);
  const [wardData, setWardData] = useState({});

  useEffect(() => {
    if (ward && ward.data) {
      setWardData(ward.data);
    }
  }, [ward]);

  // const renderSkeleton = <CandidateDetailsSkeleton />;

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${wardError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.ward}
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

  const renderPost = (
    <>
      <WardDetailsHero title="WARD DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Ward',
              href: paths.dashboard.wardmanagement.root,
            },
            {
              name: 'Details',
              href: paths.ward,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Ward Number:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Ward Name:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Address:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardStreetAddress}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardState}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>City:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardCity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Country:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardCountry}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Postal Code:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardPostalCode}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.wardCapacity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Emergency Number:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.emergencyContactNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Incident Reporting:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.incidentReporting}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>District Name:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.districtName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Tehsil Name:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.tehsilName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>securityMeasures:</Typography>
              <Typography sx={{ ml: 1 }}> {wardData.securityMeasures}</Typography>
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

      {wardError && renderError}

      {ward && renderPost}
    </>
  );
}
WardDetailsView.propTypes = {
  id: PropTypes.string,
};
