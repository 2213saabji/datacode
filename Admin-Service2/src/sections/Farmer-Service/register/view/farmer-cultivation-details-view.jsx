import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetcultivation } from 'src/api/agriculture/cultivation';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import FarmerRegDetailsHero from '../farmer-reg-details-hero';

// ----------------------------------------------------------------------

export default function FarmerCultivationDetailsView({ id }) {
  const { cultivation, cultivationError } = useGetcultivation(id);

  const [cultivationData, setCultivationData] = useState({});

  useEffect(() => {
    if (cultivation && cultivation.data) {
      setCultivationData(cultivation.data);
    }
  }, [cultivation]);

  const imgArr = Object.entries(cultivationData?.imageUrl ? cultivationData?.imageUrl : {}).map(
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
        title={`${cultivationError?.message}`}
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
      <FarmerRegDetailsHero title="CULTIVATION DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Cultivation',
              href: paths.dashboard?.cultivation?.root,
            },
            {
              name: 'Details',
              href: paths.cultivation,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Type:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.type}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Brand Name:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.brand}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Condition :</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.condition}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Depth:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.depthCm} cm</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Size:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.size}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Working Width:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.workingWidthMeters} m</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Manifactured Year:</Typography>
              <Typography sx={{ ml: 1 }}> {cultivationData?.yearManufactured}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Price</Typography>
              <Typography sx={{ ml: 1 }}>₹ {cultivationData?.price}</Typography>
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

      {cultivationError && renderError}

      {cultivation && renderPost}
    </>
  );
}
FarmerCultivationDetailsView.propTypes = {
  id: PropTypes.string,
};
