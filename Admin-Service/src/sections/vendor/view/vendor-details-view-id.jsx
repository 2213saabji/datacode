/* eslint-disable no-plusplus */
import { useState, useEffect } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import { Card, Grid, Stack, Button, Dialog, Divider, Container, CardMedia, Typography, CardContent, DialogTitle, DialogActions, DialogContent } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetCharteredAccountant } from 'src/api/chartedAccountant';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../vendor-details-hero';

export default function VendorDetailsViewById() {
  const id = 1;
  const { chartedaccpunt, chartedaccpuntIdError } = useGetCharteredAccountant(id);
  const [chartedAccountantData, setchartedAccountantData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    if (chartedaccpunt && chartedaccpunt.data) {
      setchartedAccountantData(chartedaccpunt.data);
    }
  }, [chartedaccpunt]);

  const handleDialogOpen = () => setOpenDialog(true);
  const handleDialogClose = () => setOpenDialog(false);

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
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
        title={`${chartedaccpuntIdError?.message}`}
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

  const renderPost = chartedaccpunt && (
    <>
      {/* <DriverDetailsHero title="MY DETAILS" coverUrl={BannerBlurImg} /> */}

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[{ name: 'Vendor Details' }, { name: 'Details' }]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start" spacing={2}>
            {/* Existing Details */}
            <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>Full Name:</Typography>
              <Typography sx={{ ml: 1 }}>{chartedaccpunt.providerName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>Experience Level:</Typography>
              <Typography sx={{ ml: 1 }}>{chartedaccpunt.experienceLevel}</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: 'bold' }}>Rating:</Typography>
              <Typography sx={{ ml: 1 }}>{renderStars(chartedAccountantData.rating)}</Typography>
            </Stack>
            <Stack direction="row" spacing={2} sx={{ marginTop: 2 }}>
              <Button variant="contained" color="primary" onClick={handleDialogOpen}>
                View More Details
              </Button>
              <Button variant="outlined" color="secondary">
                Contact
              </Button>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />

          {/* Layout with Grid */}
          <Grid container spacing={3}>
            {/* Left Side Box */}
            <Grid item xs={12} md={9}>
              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    User Data
                  </Typography>
                  <Typography>Name: {chartedaccpunt.providerName}</Typography>
                  <Typography>Experience Level: {chartedaccpunt.experienceLevel}</Typography>
                  {/* Add other user data fields here */}
                </CardContent>
              </Card>
            </Grid>

            {/* Right Side Boxes */}
            <Grid item xs={12} md={16}>
              <Card sx={{ borderRadius: 2, boxShadow: 3, mb: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Case Photos
                  </Typography>
                  <Stack direction="row" spacing={2}>
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7aUxt78KTvjzlPIXHt5mJ5YHUnI-RFcngmA&s"
                      alt="Case Photo 1"
                      sx={{ borderRadius: 1 }}
                    />
                    <CardMedia
                      component="img"
                      height="140"
                      image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRj7oH6ktUqCAB58fhWrBgoud9x8y3eKVDUX41AfARl4th7nbhKt2HB13vhzOJ4hID2Lko&usqp=CAU"
                      alt="Case Photo 2"
                      sx={{ borderRadius: 1 }}
                    />
                  </Stack>
                </CardContent>
              </Card>

              <Card sx={{ borderRadius: 2, boxShadow: 3 }}>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Affidavit
                  </Typography>
                  <Typography variant="body2" paragraph>
                    I, Mr./Ms. [Name], Age [Age], Occupation [Occupation], R/at [Address], do hereby
                    take oath and state on solemn affirmation as under:
                  </Typography>
                  <Typography variant="body2" paragraph>
                    I undertake to show all the original documents at the time of
                    submission/admission. I will submit true/attested copies of Marksheet, Passport,
                    and Visa.
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Stack>
      </Container>

      {/* Dialog for more details */}
      <Dialog open={openDialog} onClose={handleDialogClose} fullWidth>
        <DialogTitle>Vendor Profile Details</DialogTitle>
        <DialogContent>
          <Typography variant="h6">Full Name:</Typography>
          <Typography>{chartedaccpunt.providerName}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Experience Level:</Typography>
          <Typography>{chartedaccpunt.experienceLevel}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Rating:</Typography>
          <Typography>{renderStars(chartedAccountantData.rating)}</Typography>
          <Typography variant="h6" sx={{ mt: 2 }}>Additional Info:</Typography>
          <Typography>Here you can add more detailed information about the vendor.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );

  return (
    <>
      {chartedaccpuntIdError && renderError}
      {chartedaccpunt && renderPost}
    </>
  );
}
