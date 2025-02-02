import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetBooth } from 'src/api/booth';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import BoothDetailsHero from '../booth-details-hero';

// ----------------------------------------------------------------------

export default function BoothDetailsView({ id }) {
  const { booth, boothError } = useGetBooth(id);
  const [boothData, setBoothData] = useState({});

  useEffect(() => {
    if (booth) {
      setBoothData(booth.data);
    }
  }, [booth]);

  const renderError = (
    <EmptyContent
      filled
      title={`${boothError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.boothmanagement}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderBooth = booth && (
    <>
      <BoothDetailsHero title="BOOTH DETAILS" coverUrl={BannerBlurImg} />
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
              name: 'Booth Management',
              href: paths.dashboard.boothmanagement.root,
            },
            {
              name: 'Details',
              href: paths.boothmanagement,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Name:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Dimensions:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothDimensions}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothCapacity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Address:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothStreetAddress}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>City:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothCity}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothState}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Postal Code:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothPostalCode}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Country:</Typography>
              <Typography sx={{ ml: 1 }}> {boothData?.boothCountry}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {boothError && renderError}

      {booth && renderBooth}
    </>
  );
}

BoothDetailsView.propTypes = {
  id: PropTypes.string,
};
