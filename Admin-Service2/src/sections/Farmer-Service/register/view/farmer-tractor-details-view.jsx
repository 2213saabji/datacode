import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetTractor } from 'src/api/agriculture/tractor';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import FarmerRegDetailsHero from '../farmer-reg-details-hero';

// ----------------------------------------------------------------------

export default function FarmerTractorDetailsView({ id }) {
  const { tractor, tractorError } = useGetTractor(id);

  const [tractorData, setTractorData] = useState({});

  useEffect(() => {
    if (tractor && tractor.data) {
      setTractorData(tractor.data);
    }
  }, [tractor]);

  const imgArr = Object.entries(tractorData?.imageUrl ? tractorData?.imageUrl : {}).map(
    ([key, value]) => ({ key, value })
  );

  const slides = imgArr.map((image, idx) => ({
    src: image.value,
    title: image.key,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${tractorError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.FarmerService.new}
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
      <FarmerRegDetailsHero title="TRACTOR DETAILS" coverUrl={BannerBlurImg} />

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
          to="/dashboard/FarmerService"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
        >
          Back
        </Button>
        <CustomBreadcrumbs
          links={[
            {
              name: 'Tractor',
              href: paths.dashboard.FarmerService.root,
            },
            {
              name: 'Details',
              href: paths.FarmerService,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Brand Name:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.brand}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Model:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.model}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Manufactured Year:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.yearManufactured}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Condition:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.condition}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Weight:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.weightKg} Kg</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Horse Power:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.horsepower} hp</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Engine Type:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.engineType}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Fule Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.fuelCapacityLitres} ltr</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Transmission Type:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.transmissionType}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Tyre Type:</Typography>
              <Typography sx={{ ml: 1 }}> {tractorData?.tireType}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Price:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {tractorData?.price}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
            {imgArr.length === 0 ? <Typography sx={{ ml: 1 }}>not provided</Typography> : null}
          </Stack>
        </Stack>

        {imgArr.length !== 0 ? (
          <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
            <Grid spacing={3}>
              <Grid xs={12} md={9}>
                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  }}
                >
                  {slides.map((slide) => {
                    const thumbnail = slide.src;

                    return (
                      <Image
                        key={thumbnail}
                        alt={thumbnail}
                        src={thumbnail}
                        ratio="1/1"
                        onClick={() => lightbox.onOpen(`${thumbnail}`)}
                        sx={{
                          borderRadius: 1,
                          boxShadow: '0 0 8px gray',
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </Container>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
        disabledZoom={false}
        disabledTotal={false}
        disabledVideo={false}
        disabledCaptions={false}
        disabledSlideshow={false}
        disabledThumbnails={false}
        disabledFullscreen={false}
      />
    </>
  );
  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {tractorError && renderError}

      {tractor && renderPost}
    </>
  );
}
FarmerTractorDetailsView.propTypes = {
  id: PropTypes.string,
};
