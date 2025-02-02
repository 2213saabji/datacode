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

// import BannerBlurImg from './assets/overlay_2.jpg';

import { fDate } from 'src/utils/format-time';

// import BannerBlurImg from './assets/overlay_2.jpg';
import { useGetCattle, useGetCattleDetailsData } from 'src/api/agriculture/cattle';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useRouter } from 'src/routes/hooks';




// ----------------------------------------------------------------------

export default function CattleCombineDetailsView({ id, cattleTypeId }) {

  const router = useRouter()
  const { cattle, cattleError } = useGetCattle(id);
  const { cattleDetail, cattleDetailError } = useGetCattleDetailsData(cattleTypeId);

  // const [cattleData, setcattleData] = useState({});
  const [cattleData, setCattleData] = useState({});
  const [cattleDetailData, setCattleDetailData] = useState({});

  useEffect(() => {
    if (cattle && cattle?.data || cattleDetail && cattleDetail?.data) {
      setCattleData(cattle?.data);
      setCattleDetailData(cattleDetail?.data)
    }
  }, [cattle, cattleDetail]);

  const imgArr = Object.entries(cattleData?.imageUrl ? cattleData?.imageUrl : {}).map(([key, value]) => ({ key, value }));
  // console.log('cattle--->', imgArr)

  const slides = imgArr.map((image, idx) => ({
    src: image.value.preview,
    title: image.key,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${cattleError?.message}`}
        // action={
        //   <Button
        //     component={RouterLink}
        //     onClick={()=>router.push(paths.dashboard.FarmerService)}
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

  const renderPost = (
    <>
      {/* <FarmerRegDetailsHero title='COMBINE HARVESTER DETAILS' coverUrl={BannerBlurImg} /> */}

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
              name: 'Cattle Details',
              href: paths.dashboard?.FarmerService.cattle?.root,
            },
            {
              name: 'Details',
              href: paths.dashboard.FarmerService.cattle,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Cattle Type:</Typography>
              <Typography sx={{ ml: 1 }}> {cattleData?.type}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Cattel Breed:</Typography>
              <Typography sx={{ ml: 1 }}> {cattleData?.breed}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Price:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {cattleData?.price}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Description:</Typography>
              <Typography sx={{ ml: 1 }}>{cattleData?.description}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Age:</Typography>
              <Typography sx={{ ml: 1 }}> {cattleData?.age} Yrs</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Health Status:</Typography>
              <Typography sx={{ ml: 1 }}> {cattleData?.healthStatus} </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Weight:</Typography>
              <Typography sx={{ ml: 1 }}> {cattleData?.weight} kg</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Price:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {cattleData?.price}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> City:</Typography>
              <Typography sx={{ ml: 1 }}>{cattleDetailData?.city}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Date Listed:</Typography>
              <Typography sx={{ ml: 1 }}>{fDate(cattleDetailData?.dateListed)}</Typography>
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

      {cattleError && renderError}

      {cattle && renderPost}
    </>
  );
}
CattleCombineDetailsView.propTypes = {
  id: PropTypes.string,
  cattleTypeId: PropTypes.string,
};