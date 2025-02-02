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

import { useGetClaim } from 'src/api/exp_claim';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import ClaimDetailsHero from '../claim-details-hero';

// ----------------------------------------------------------------------

export default function ClaimDetailsView({ id }) {
  const { claim, claimError } = useGetClaim(id);

  const [claimData, setClaimData] = useState({});

  useEffect(() => {
    if (claim && claim.data) {
      setClaimData(claim.data);
    }
  }, [claim]);

  const imgArr = claimData.ExpenseClaimImagesDetails || [];

  const slides = imgArr.map((image, idx) => ({
    src: image.receiptImageDetails?.preview,
    title: 'Receipt',
    description: image.receiptImageDetails?.name,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${claimError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.claim}
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

  const renderPost = claim && (
    <>
      <ClaimDetailsHero title="CLAIM DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Claim',
              href: paths.dashboard.claim.root,
            },
            {
              name: 'Details',
              href: paths.claim,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Claim Id:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.expenseClaimId}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Category:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {claimData.ExpenseCategory?.expenseCategoryName}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Amount:</Typography>
              <Typography sx={{ ml: 1 }}>₹ {claimData.amount}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Payment Method:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.paymentMethod}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Purchase Date:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.purchaseDate}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Description:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.description}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Typography sx={{ ml: 1 }}> {claimData.claimStatus}</Typography>
            </Stack>
          </Stack>

          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}>Receipt Image:</Typography>
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

      {claimError && renderError}

      {claim && renderPost}
    </>
  );
}
ClaimDetailsView.propTypes = {
  id: PropTypes.string,
};
