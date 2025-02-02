import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetWorkbyID } from 'src/api/work';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import WorkDetailsHero from '../work-details-hero';

// ----------------------------------------------------------------------

export default function WorkDetailsView({ id }) {
  const { works, workError } = useGetWorkbyID(id);
  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    if (works && works.data) {
      setClaimData(works.data);
    }
  }, [works]);

  const imgArr = claimData.imageUrl?.split(',').filter(Boolean) || [];

  const slides = imgArr.map((url, idx) => ({
    src: url,
    title: 'Receipt',
    description: `Receipt Image: ${parseInt(idx, 10) + 1}`,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${workError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.work}
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

  const renderPost = works && (
    <>
      <WorkDetailsHero title="CLAIM DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Our work',
              href: paths.dashboard.work.root,
            },
            {
              name: 'Details',
              href: paths.work,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Title:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {claimData.title}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Description:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.description}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mt: 3, mb: 3 }} />
          <Typography sx={{ mr: 1, minWidth: 180 }}>Cover Image:</Typography>
        </Stack>

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

      {workError && renderError}

      {works && renderPost}
    </>
  );
}
WorkDetailsView.propTypes = {
  id: PropTypes.string,
};
