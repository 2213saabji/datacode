import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { Box, Card, Grid, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetInstituteAppointmentDetail } from 'src/api/Institution/InstituteAppointments';

import Image from 'src/components/image';
import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import InstitutionRegDetailsHero from '../institution-reg-details-hero';

// ----------------------------------------------------------------------

export default function InstitutionAppointmentDetailsView({ id }) {
  const { instituteAppointDetails, instituteAppointDetailsError } =
    useGetInstituteAppointmentDetail(id);
  const [appointmentData, setAppointmentData] = useState({});
  console.log('appointmentData', appointmentData);

  useEffect(() => {
    if (instituteAppointDetails && instituteAppointDetails.data) {
      setAppointmentData(instituteAppointDetails.data);
    }
  }, [instituteAppointDetails]);

  const imgArr = Object.entries(
    appointmentData?.pdfImageUrl ? appointmentData?.pdfImageUrl : {}
  ).map(([key, value]) => ({ key, value }));

  const slides = imgArr.map((image, idx) => ({
    src: image.value,
    title: image.key,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${instituteAppointDetailsError?.message}`}
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

  const renderStatusLabel = (status) => {
    let color;
    switch (status) {
      case 'Accepted':
        color = 'success';
        break;
      case 'Pending':
        color = 'warning';
        break;
      case 'Rejected':
        color = 'error';
        break;
      default:
        color = 'default';
    }
    return (
      <Label color={color} variant="filled">
        {status}
      </Label>
    );
  };

  const renderPost = (
    <>
      <InstitutionRegDetailsHero title="APPOINTMENT DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Appointment',
              href: paths.dashboard?.StudentCareer.root,
            },
            {
              name: 'Details',
              href: paths.appointment,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>
      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Date:</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentDate}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Time:</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentTime}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Type :</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentType}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Status:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {renderStatusLabel(appointmentData?.appointmentPassStatus)}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Meeting Link:</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentPassMeetingLink}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Description:</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.description}</Typography>
            </Stack>

            <Divider sx={{ mt: 3, mb: 3 }} />
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180, fontWeight: '700' }}>Image:</Typography>
              {imgArr.length === 0 ? <Typography sx={{ ml: 1 }}>not provided</Typography> : null}
            </Stack>
          </Stack>
          {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}
        </Stack>

        {imgArr.length >= 0 ? (
          <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
            <Grid spacing={3}>
              <Grid xs={12} md={9}>
                <Box
                  gap={3}
                  display="grid"
                  // alignItems={{xs:'center'}}
                  gridTemplateColumns={{
                    xs: 'repeat(1, 1fr)',
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
                          width: 300,
                        }}
                      />
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Card>
        ) : (
          <Typography sx={{ ml: 1 }}>not provided</Typography>
        )}
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
      {/* <EmptyContent title="Coming soon..." />,
<Typography>Hello</Typography> */}
      {instituteAppointDetailsError && renderError}

      {renderPost}
    </>
  );
}
InstitutionAppointmentDetailsView.propTypes = {
  id: PropTypes.string,
};
