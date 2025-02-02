// import PropTypes from 'prop-types';
// import { useState, useEffect } from 'react';

// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
// import Container from '@mui/material/Container';
// import { Box, Card, Grid, Link, Typography } from '@mui/material';
// // import { Link } from 'react-router-dom';

// import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';

// import { useGetAppoinmnetForAgri } from 'src/api/agriculture/appointmentforagri';

// import Image from 'src/components/image';
// import Iconify from 'src/components/iconify';
// import EmptyContent from 'src/components/empty-content';
// import Lightbox, { useLightBox } from 'src/components/lightbox';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import FarmerRegDetailsHero from '../farmer-reg-details-hero';

// // ----------------------------------------------------------------------

// export default function FarmerAppointmentDetailsView({ id }) {
//   const { appointment, appointmentError } = useGetAppoinmnetForAgri(id);
//   console.log('appointment', appointment);
//   const [appointmentData, setAppointmentData] = useState({});

//   useEffect(() => {
//     if (appointment && appointment.data) {
//       setAppointmentData(appointment.data);
//     }
//   }, [appointment]);

//   const imgArr = Object.entries(appointmentData?.imageUrl ? appointmentData?.imageUrl : {}).map(
//     ([key, value]) => ({ key, value })
//   );

//   const slides = imgArr.map((image, idx) => ({
//     src: image.value,
//     title: image.key,
//   }));

//   const lightbox = useLightBox(slides);

//   const renderError = (
//     <Container sx={{ my: 10 }}>
//       <EmptyContent
//         filled
//         title={`${appointmentError?.message}`}
//         action={
//           <Button
//             component={RouterLink}
//             href={paths.ward}
//             startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
//             sx={{ mt: 3 }}
//           >
//             Back to List
//           </Button>
//         }
//         sx={{ py: 10 }}
//       />
//     </Container>
//   );

//   const renderPost = (
//     <>
//       <FarmerRegDetailsHero title="APPOINTMENT DETAILS" coverUrl={BannerBlurImg} />

//       <Container
//         maxWidth={false}
//         sx={{
//           py: 3,
//           mb: 5,
//           borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
//         }}
//       >
//         <Button
//           component={RouterLink}
//           to="/dashboard/FarmerService"
//           variant="outlined"
//           color="primary"
//           style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
//         >
//           Back
//         </Button>
//         <CustomBreadcrumbs
//           links={[
//             {
//               name: 'Appointment',
//               href: paths.dashboard?.FarmerCompanyRegister?.root,
//             },
//             {
//               name: 'Details',
//               href: paths.appointment,
//             },
//           ]}
//           sx={{ maxWidth: 720, mx: 'auto', mt:2 }}
//         />
//       </Container>
//       <Container maxWidth={false}>
//         <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
//           <Stack direction="column" alignItems="start">
//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Date:</Typography>
//               <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentDate}</Typography>
//             </Stack>

//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Time:</Typography>
//               <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentTime}</Typography>
//             </Stack>

//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Type :</Typography>
//               <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentType}</Typography>
//             </Stack>

//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Status:</Typography>
//               <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentPassStatus}</Typography>
//             </Stack>

//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Meeting Link:</Typography>
//               <Link href={appointmentData?.appointmentPassMeetingLink} sx={{ ml: 1 }}>
//                 {appointmentData?.appointmentPassMeetingLink}
//               </Link>
//             </Stack>

//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}> Description:</Typography>
//               <Typography sx={{ ml: 1 }}> {appointmentData?.description}</Typography>
//             </Stack>

//             <Divider sx={{ mt: 3, mb: 3 }} />
//             <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//               <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
//               {imgArr.length === 0 ? <Typography sx={{ ml: 1 }}>not provided</Typography> : null}
//             </Stack>
//           </Stack>
//           <Divider sx={{ mt: 5, mb: 2 }} />
//         </Stack>

//         {imgArr.length !== 0 ? (
//           <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
//             <Grid spacing={3}>
//               <Grid xs={12} md={9}>
//                 <Box
//                   gap={3}
//                   display="grid"
//                   gridTemplateColumns={{
//                     xs: 'repeat(2, 1fr)',
//                     sm: 'repeat(3, 1fr)',
//                     md: 'repeat(4, 1fr)',
//                   }}
//                 >
//                   {slides.map((slide) => {
//                     const thumbnail = slide.src;

//                     return (
//                       <Image
//                         key={thumbnail}
//                         alt={thumbnail}
//                         src={thumbnail}
//                         ratio="1/1"
//                         onClick={() => lightbox.onOpen(`${thumbnail}`)}
//                         sx={{
//                           borderRadius: 1,
//                           boxShadow: '0 0 8px gray',
//                           cursor: 'pointer',
//                         }}
//                       />
//                     );
//                   })}
//                 </Box>
//               </Grid>
//             </Grid>
//           </Card>
//         ) : null}
//       </Container>

//       <Lightbox
//         open={lightbox.open}
//         close={lightbox.onClose}
//         slides={slides}
//         index={lightbox.selected}
//         disabledZoom={false}
//         disabledTotal={false}
//         disabledVideo={false}
//         disabledCaptions={false}
//         disabledSlideshow={false}
//         disabledThumbnails={false}
//         disabledFullscreen={false}
//       />
//     </>
//   );
//   return (
//     <>
//       {appointmentError && renderError}

//       {appointment && renderPost}
//     </>
//   );
// }
// FarmerAppointmentDetailsView.propTypes = {
//   id: PropTypes.string,
// };

import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { Box, Card, Grid, Link, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetAppoinmnetForAgri } from 'src/api/agriculture/appointmentforagri';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import FarmerRegDetailsHero from '../farmer-reg-details-hero';

// ----------------------------------------------------------------------

export default function FarmerAppointmentDetailsView({ id }) {
  const { appointment, appointmentError } = useGetAppoinmnetForAgri(id);
  const [appointmentData, setAppointmentData] = useState({});

  useEffect(() => {
    if (appointment && appointment.data) {
      setAppointmentData(appointment.data);
    }
  }, [appointment]);

  // useEffect(() => {
  //   console.log('appointmentData:', appointmentData);
  //   console.log('appointmentData?.imageUrl:', appointmentData?.imageUrl);
  // }, [appointmentData]);

  const imgArr = Object.entries(appointmentData?.pdfImageUrl ?? {}).map(([key, value]) => ({
    key,
    value,
  }));

  // Get the last entry in imgArr
  const lastImage = imgArr[imgArr.length - 1];

  const slides = lastImage ? [{ src: lastImage.value, title: lastImage.key }] : [];

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${appointmentError?.message}`}
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
      <FarmerRegDetailsHero title="APPOINTMENT DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Appointment',
              href: paths.dashboard?.FarmerCompanyRegister?.root,
            },
            {
              name: 'Details',
              href: paths.appointment,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto', mt: 2 }}
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
              <Typography sx={{ ml: 1 }}> {appointmentData?.appointmentPassStatus}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Meeting Link:</Typography>
              <Link href={appointmentData?.appointmentPassMeetingLink} sx={{ ml: 1 }}>
                {appointmentData?.appointmentPassMeetingLink}
              </Link>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Description:</Typography>
              <Typography sx={{ ml: 1 }}> {appointmentData?.description}</Typography>
            </Stack>

            <Divider sx={{ mt: 3, mb: 3 }} />
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
              {imgArr.length === 0 ? <Typography sx={{ ml: 1 }}>not provided</Typography> : null}
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>

        {lastImage ? (
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
                  <Image
                    key={lastImage.value}
                    alt={lastImage.value}
                    src={lastImage.value}
                    ratio="1/1"
                    onClick={() => lightbox.onOpen(lastImage.value)}
                    sx={{
                      borderRadius: 1,
                      boxShadow: '0 0 8px gray',
                      cursor: 'pointer',
                    }}
                  />
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
      {appointmentError && renderError}

      {appointment && renderPost}
    </>
  );
}

FarmerAppointmentDetailsView.propTypes = {
  id: PropTypes.string,
};
