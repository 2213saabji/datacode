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


import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
import { useGetEquipment } from 'src/api/agriculture/equipment';
import FarmerRegDetailsHero from '../farmer-reg-details-hero';



// ----------------------------------------------------------------------

export default function FarmerCombineDetailsView({ id }) {
  const { equipment, equipmentError } = useGetEquipment(id);


  const [equipmentData, setEquipmentData] = useState({});

  useEffect(() => {
    if (equipment && equipment.data) {
      setEquipmentData(equipment.data);
    }
  }, [equipment]);

  const imgArr = Object.entries(equipmentData?.imageUrl ? equipmentData?.imageUrl : {}).map(([key, value]) => ({ key, value }));

  const slides = imgArr.map((image, idx) => ({
    src: image.value.preview,
    title: image.key,
  }));


  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${equipmentError?.message}`}
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

  const renderPost =
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
              name: 'Equipment Details',
              href: paths.dashboard?.FarmerService.detail?.root,
            },
            {
              name: 'Details',
              href: paths.dashboard.FarmerService.detail,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Equipment Type:</Typography>
              <Typography sx={{ ml: 1 }}> {equipmentData?.type}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Equipment Brand:</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].brand}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Equipment Condition:</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].condition}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Equipment Model:</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].model}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Price:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {equipment?.data?.EquipmentDetails[0].price}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>State:</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].state}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>City</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].city} </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>District</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].district} </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Tehsil</Typography>
              <Typography sx={{ ml: 1 }}> {equipment?.data?.EquipmentDetails[0].tehsil}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Purchased in Year:</Typography>
              <Typography sx={{ ml: 1 }}>{equipment?.data?.EquipmentDetails[0].yearOfPurchase}</Typography>
            </Stack>
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}>Equipment Description:</Typography>
            <Typography sx={{ ml: 1 }}> {equipmentData?.description}</Typography>
          </Stack>

          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
            {
              imgArr.length === 0 ?
                <Typography sx={{ ml: 1 }}>not provided</Typography>
                :
                null
            }
          </Stack>

        </Stack>

        {
          imgArr.length !== 0 ? (
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

          ) :
            null
        }

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
    ;

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {equipmentError && renderError}

      {equipmentData && renderPost}
    </>
  );
}
FarmerCombineDetailsView.propTypes = {
  id: PropTypes.string,
};