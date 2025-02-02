/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
// import React from 'react'
import {
  React,
  useRef,
  useState,
  // useEffect
} from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
// import Typography from '@mui/material/Typography';
// import { red } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

// import CardMedia from '@mui/material/CardMedia';4
import Lightbox, { useLightBox } from 'src/components/lightbox';
// import TextField from '@mui/material/TextField';
// import ReplyIcon from '@mui/icons-material/Reply';
// import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';

import Image from 'src/components/image';
// import ShareIcon from '@mui/icons-material/Share';
// import LoadingButton from '@mui/lab/LoadingButton';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { useHistory } from 'react-router-dom';
import DownloadIcon from '@mui/icons-material/Download';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  // alpha,
  // useTheme,
  styled,
} from '@mui/material/styles';
import {
  // FormControl,
  // InputLabel,
  // Select,
  // MenuItem,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fAge } from 'src/utils/format-time';

// import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
import { useGetalldoctorDetails, useGetDoctorAppointment } from 'src/api/appointmentwithdoctor';
// import { Link } from 'react-router-dom';
// import { UpgradeStorageIllustration } from 'src/assets/illustrations';

// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import BannerBlurImg from './assets/overlay_2.jpg';
import AppointmentwithdoctorDetailsHero from '../Appointment-details-hero';

// ----------------------------------------------------------------------
const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function AppointmentwithdoctorDetailsView({ id }) {
  const [expanded, setExpanded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const targetRef = useRef();
  const { user } = useAuthContext();
  const { appointment, appointmentError } = useGetDoctorAppointment(id);
  const { alldoctorDetails, alldoctorDetailsLoading } = useGetalldoctorDetails();

  const docterdetails = alldoctorDetails?.data?.filter(
    (el) => el.doctorId === appointment?.data?.doctorId
  );

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const imgArr = appointment?.data?.medicalRecords || [];

  // console.log(imgArr?.[0]?.preview)
  const slides = imgArr.map((image, idx) => ({
    src: image?.preview,
    title: 'Receipt',
    description: image.name,
  }));

  console.log(imgArr.src);
  const lightbox = useLightBox(imgArr);

  const getInitials = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };
  const voter = user.userRoleType === 'Voter';
  // useEffect(() => {
  //   if (appointment && appointment.data) {
  //     setPartyData(appointment.data);
  //   }
  // }, [appointment]);

  async function handleDownload() {
    // setIsLoading(true);
    // await generatePDF(targetRef, { filename: 'voter-slip.pdf' });
    // setIsLoading(false);
  }
  // const handleChange = (event) => {
  //   const value = event.target.value;
  //   setSelectedValue(value);
  //   console.log(value);

  //   const selectedOption = candidateProfiles.find(
  //     (option) => option?.User?.UserProfile?.firstName === value
  //   );

  //   setSelectedId(selectedOption ? selectedOption.User.userId : '');
  //   console.log(selectedOption);
  // };

  // const handleShare = async () => {
  //   try {
  //     if (navigator.share) {
  //       await navigator.share({
  //         title: 'Share Example',
  //         text: 'Check out this link!',
  //         url: window.location.href,
  //       });
  //     } else {
  //       throw new Error('Web Share API not supported');
  //     }
  //   } catch (error) {
  //     console.error('Error sharing:', error.message);
  //     // Fallback for browsers that do not support Web Share API
  //     alert('Your browser does not support sharing.');
  //   }
  // };

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
  const renderPostc = (
    <>
      <AppointmentwithdoctorDetailsHero title="Details" coverUrl={BannerBlurImg} />

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
              name: '',
              href: paths.dashboard.Appointment.root,
            },
            {
              name: 'Details',
              href: paths.Appointment,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>
      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Grid item xs={12} md={7}>
            <Card
              sx={{
                p: 1.5,
                boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
                marginBottom: { xs: 2, md: 0 },
              }}
            >
              <Box sx={{ pl: 3 }} ref={targetRef}>
                <Box
                  sx={{
                    p: 2,
                    pl: { xs: 1, md: 3 },
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    alignItems: 'center',
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: { xs: 'center', sm: 'flex-start' },
                      mb: { xs: 2, sm: 0 },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 80, sm: 130 },
                        height: { xs: 80, sm: 130 },
                        borderRadius: '1.5rem',
                        bgcolor: '#3f51b5',
                        fontSize: { xs: '1.5rem', sm: '3rem' },
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {getInitials(user?.UserProfile?.firstName) +
                        getInitials(user?.UserProfile?.lastName)}
                    </Avatar>
                  </Box>
                  <Box
                    sx={{
                      pl: { xs: 0, sm: 3 },
                      display: 'flex',
                      flexDirection: 'column',
                      rowGap: 2,
                      ml: { xs: 0, sm: 10 },
                      textAlign: { xs: 'center', sm: 'left' },
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                      }}
                    >
                      <Typography sx={{ fontWeight: '700', marginRight: 1 }}>Name:</Typography>
                      <Typography>
                        {user?.UserProfile?.firstName || 'not provided'}{' '}
                        {user?.UserProfile?.lastName}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                      }}
                    >
                      <Typography sx={{ fontWeight: '700', marginRight: 1 }}>Email:</Typography>
                      <Typography>{appointment?.data?.Voter?.email}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                      }}
                    >
                      <Typography sx={{ fontWeight: '700', marginRight: 1 }}>Phone:</Typography>
                      <Typography>{appointment?.data?.Voter?.phone}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                      }}
                    >
                      <Typography sx={{ fontWeight: '700', marginRight: 1 }}>Age:</Typography>
                      <Typography>{fAge(user?.UserProfile?.dateOfBirth)}</Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Card>
          </Grid>

          <Divider sx={{ mt: 5, mb: 2 }} />

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
                  <Stack direction="column" alignItems="start">
                    <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                      <Typography sx={{ mr: 1, minWidth: 180 }}> problemDescription:</Typography>
                      <Typography sx={{ ml: 1 }}>
                        {' '}
                        {appointment?.data?.problemDescription}
                      </Typography>
                    </Stack>
                    <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                      <Typography sx={{ mr: 1, minWidth: 180 }}>AppointmentStatus:</Typography>
                      <Typography sx={{ ml: 1 }}>
                        {' '}
                        {appointment?.data?.appointmentPassStatus}
                      </Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <Divider sx={{ mt: 5, mb: 2 }} />

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
                    {imgArr?.map((slide, i) => {
                      const thumbnail = slide?.src;

                      return (
                        <>
                          {/* {slide?.preview} */}

                          <Image
                            key={i}
                            alt={thumbnail}
                            src={slide?.preview}
                            ratio="1/1"
                            onClick={() => lightbox.onOpen(`${thumbnail}`)}
                            sx={{
                              height: '150px',
                              width: '150px',
                              borderRadius: 1,
                              boxShadow: '0 0 8px gray',
                              cursor: 'pointer',
                            }}
                          />
                        </>
                      );
                    })}
                  </Box>

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
                </Grid>
              </Grid>
            </Card>
          ) : null}

          {voter && appointment?.data?.appointmentType && (
            <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
              <Grid spacing={3}>
                <Grid xs={12} md={9}>
                  <Typography
                    sx={{
                      margin: 'auto',
                      minWidth: 180,
                      textAlign: 'center',
                      color: 'green',
                      fontWeight: 'bold',
                      fontSize: '19px',
                    }}
                  >
                    Your Meeting is approved by Doctor !!
                  </Typography>

                  <Box
                    gap={3}
                    display="grid"
                    gridTemplateColumns={{
                      xs: 'repeat(2, 1fr)',
                      sm: 'repeat(3, 1fr)',
                      md: 'repeat(4, 1fr)',
                    }}
                  >
                    <Stack direction="column" alignItems="start">
                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Type:</Typography>
                        <Typography sx={{ ml: 1 }}>
                          {' '}
                          {appointment?.data?.appointmentType}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>AappointmentTime:</Typography>
                        <Typography sx={{ ml: 1 }}>
                          {' '}
                          {appointment?.data?.appointmentTime}
                        </Typography>
                      </Stack>
                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>Appointment Date:</Typography>
                        <Typography sx={{ ml: 1 }}>
                          {' '}
                          {appointment?.data?.appointmentDate}
                        </Typography>
                      </Stack>

                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>Meeting Link</Typography>
                        <Typography sx={{ ml: 1 }}>
                          {' '}
                          {appointment?.data?.appointmentPassMeetingLink}
                        </Typography>
                      </Stack>
                    </Stack>
                  </Box>
                </Grid>
              </Grid>
            </Card>
          )}
        </Stack>
      </Container>
    </>
  );

  const renderPostv = (
    <Container maxWidth={false}>
      <Stack sx={{ maxWidth: '90%', margin: '5px auto', pt: '20px' }}>
        {/* <Button variant="contained" onClick={handleClick}>
      Go Back
    </Button> */}
        <Grid item xs={12} md={7} sx={{ display: 'flex', flexWrap: 'wrap' }}>
          <Card
            sx={{
              p: 2.5,
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              textAlign: 'center',
              width: { xs: '100%', md: '100%', lg: '62%' },
              marginBottom: { xs: 2, md: 0 },
            }}
          >
            <Box
              sx={{
                pl: { xs: 1, md: 3 },
                display: 'flex',
                flexDirection: { xs: 'column', sm: 'row' },
                alignItems: 'center',
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: { xs: 'center', sm: 'flex-start' },
                  mb: { xs: 2, sm: 0 },
                }}
              >
                <Avatar
                  sx={{
                    width: { xs: 80, sm: 130 },
                    height: { xs: 80, sm: 130 },
                    borderRadius: '1.5rem',
                    bgcolor: '#3f51b5',
                    fontSize: { xs: '1.5rem', sm: '3rem' },
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getInitials(user?.UserProfile?.firstName) +
                    getInitials(user?.UserProfile?.lastName)}
                </Avatar>
              </Box>
              <Box
                sx={{
                  pl: { xs: 0, sm: 3 },
                  display: 'flex',
                  flexDirection: 'column',
                  rowGap: 2,
                  ml: { xs: 0, sm: 10 },
                  textAlign: { xs: 'center', sm: 'left' },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  <Typography sx={{ fontWeight: { xs: 300, sm: 700 }, marginRight: 1 }}>
                    Name:
                  </Typography>
                  <Typography>
                    {user?.UserProfile?.firstName || 'not provided'} {user?.UserProfile?.lastName}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                    flexWrap: 'wrap',
                  }}
                >
                  <Typography sx={{ fontWeight: { xs: 300, sm: 700 } }}>Email:</Typography>
                  <Typography>{user?.email}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  <Typography sx={{ fontWeight: { xs: 400, sm: 700 }, marginRight: 1 }}>
                    Phone:
                  </Typography>
                  <Typography>{user?.phone}</Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'flex-start' },
                  }}
                >
                  <Typography sx={{ fontWeight: { xs: 400, sm: 700 }, marginRight: 1 }}>
                    Age:
                  </Typography>
                  <Typography>{fAge(user?.UserProfile?.dateOfBirth)}</Typography>
                </Box>
              </Box>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: { xs: 2, sm: 4 },
                mt: 3,
                justifyContent: { xs: 'center', sm: 'flex-start' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Typography sx={{ fontWeight: { xs: 400, sm: 700 }, marginRight: 1 }}>
                Doctor Name:
              </Typography>
              <Typography sx={{ mr: 1, minWidth: 180, ml: { xs: 0, sm: 6 } }}>
                {docterdetails?.[0]?.doctorName}
                {/* {appointment?.data?.Candidate?.UserProfile?.firstName}{' '}
                {appointment?.data?.Candidate?.UserProfile?.lastName} */}
              </Typography>
            </Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                pl: { xs: 2, sm: 4 },
                mt: 3,
                justifyContent: { xs: 'center', sm: 'flex-start' },
                textAlign: { xs: 'center', sm: 'left' },
              }}
            >
              <Typography sx={{ fontWeight: { xs: 300, sm: 700 }, marginRight: 1 }}>
                Appointment Type:
              </Typography>
              <Typography sx={{ mr: 1, minWidth: 180, ml: { xs: 0, sm: 6 } }}>
                {appointment?.data?.appointmentType}
              </Typography>
            </Box>
          </Card>

          <Card
            sx={{
              margintop: '20px',
              maxWidth: 345,
              backgroundColor: '#004792',
              color: '#fff',
              margin: '1px auto',
            }}
          >
            <CardContent sx={{ margin: 'auto', color: 'black' }}>
              {appointment?.data?.appointmentPassStatus === 'in-progress' ? (
                <Typography
                  variant="h5"
                  color="#fff"
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  Doctor is approved. Your appointment!!
                </Typography>
              ) : (
                <>
                  {appointment?.data?.appointmentPassStatus === 'close' ? (
                    <Typography
                      variant="h5"
                      color="#fff"
                      sx={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                      Your appointment were closed !!
                    </Typography>
                  ) : (
                    <Typography
                      variant="h5"
                      color="#fff"
                      sx={{ fontWeight: 'bold', textAlign: 'center' }}
                    >
                      Your appointment is send to Doctor !!
                    </Typography>
                  )}
                </>
              )}
            </CardContent>

            <CardActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
              <Button
                color="inherit"
                loading={isLoading}
                loadingPosition="start"
                onClick={() => handleDownload()}
                sx={{
                  mt: 5.2,
                  ml: { xs: 5, sm: 0 },
                  px: 1,
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: 'white', color: 'black' },
                }}
              >
                <DownloadIcon />
              </Button>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
                sx={{
                  mt: 5.2,
                  px: 1,
                  bgcolor: 'black',
                  color: 'white',
                  '&:hover': { bgcolor: 'white', color: 'black' },
                }}
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            {(appointment?.data?.appointmentType === 'clinic' ||
              appointment?.data?.appointmentType === 'Remote') &&
              appointment?.data?.appointmentPassStatus === 'in-progress' && (
                <Typography
                  variant="h5"
                  color="#fff"
                  sx={{ fontWeight: 'bold', textAlign: 'center', marginBottom: '10px' }}
                >
                  Details are down below
                </Typography>
              )}

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                {voter &&
                  appointment?.data?.appointmentType === 'clinic' &&
                  appointment?.data?.appointmentPassStatus === 'in-progress' && (
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2,
                        margin: 'auto',
                        textAlign: 'center',
                      }}
                    >
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        || Appointment Details ||
                      </Typography>
                      {/* <Typography>
                      <span style={{ fontWeight: 'bold' }}>Appointment Type:</span>{' '}
                      {appointment?.data?.appointmentType}
                    </Typography> */}
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Hospital Address:</span>{' '}
                        {docterdetails?.[0]?.hospitalAddress}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Hospital Name:</span>{' '}
                        {docterdetails?.[0]?.hospitalName}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}> Hospital Mobile No.:</span>{' '}
                        {docterdetails?.[0]?.hospitalPhoneNumber}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Appointment Time:</span>{' '}
                        {appointment?.data?.appointmentTime}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Appointment Date:</span>{' '}
                        {appointment?.data?.appointmentDate}
                      </Typography>
                    </Box>
                  )}
              </CardContent>
              {voter &&
                appointment?.data?.appointmentType === 'remote' &&
                appointment?.data?.appointmentPassStatus === 'in-progress' && (
                  <Card sx={{ p: 2, maxWidth: 820, mt: 2, mx: 'auto', mb: 1 }}>
                    <Grid container spacing={3}>
                      <Box
                        gap={3}
                        display="grid"
                        gridTemplateColumns={{
                          xs: 'repeat(2, 1fr)',
                          sm: 'repeat(3, 1fr)',
                          md: 'repeat(4, 1fr)',
                        }}
                      >
                        <Stack direction="column" alignItems="start">
                          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                            <Typography>
                              <span style={{ fontWeight: 'bold' }}>Appointment Time:</span>{' '}
                              {appointment?.data?.appointmentTime}
                            </Typography>
                            <Typography>
                              <span style={{ fontWeight: 'bold' }}>Appointment Date:</span>{' '}
                              {appointment?.data?.appointmentDate}
                            </Typography>
                            <Typography sx={{ mr: 1, minWidth: 180 }}>Meeting Link:</Typography>
                            <Typography sx={{ ml: 1 }}>
                              <a
                                href={appointment?.data?.appointmentPassMeetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {appointment?.data?.appointmentPassMeetingLink}
                              </a>
                            </Typography>
                          </Stack>
                        </Stack>
                      </Box>
                    </Grid>
                  </Card>
                )}
            </Collapse>
          </Card>
        </Grid>

        <Divider sx={{ mt: 5, mb: 2 }} />

        {/* <Stack sx={{margin:'1px auto'}}> */}
        <Card sx={{ p: 3, maxWidth: 1100, mt: 2 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={9}>
              <Box display="flex" sx={{ flexWrap: 'wrap' }}>
                <Typography sx={{ fontWeight: 'bold', minWidth: 180 }}>
                  Problem Description:
                </Typography>
                <Typography>{appointment?.data?.problemDescription}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
        {/* </Stack> */}

        <Divider sx={{ mt: 5, mb: 2 }} />
        {/* {voter && appointment?.data?.appointmentType === 'office' && (
  <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
    <Grid spacing={3}>
      <Typography sx={{ margin: 'auto', minWidth: 180, textAlign: 'center', color: 'green', fontWeight: 'bold', fontSize: '19px' }}>
        Your Meeting is approved by Candidate !!
      </Typography>

      <Box gap={3} display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}>
        <Stack direction="column" alignItems="start">
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Type:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.appointmentType}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Address:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.address}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Contact Person Name:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.contactPersonName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Contact Mobile No.:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.contactMobileNo}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Time:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.appointmentTime}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Appointment Date:</Typography>
            <Typography sx={{ ml: 1 }}>{appointment?.data?.appointmentDate}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  </Card>
)} */}
        {/* 
{voter && appointment?.data?.appointmentType === 'office' && (
  <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto', borderRadius: 8 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography sx={{ margin: 'auto', textAlign: 'center', color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Your Meeting is approved by Candidate!!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Appointment Details:</Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Appointment Type:</span> {appointment?.data?.appointmentType}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Address:</span> {appointment?.data?.address}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Contact Person Name:</span> {appointment?.data?.contactPersonName}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Contact Mobile No.:</span> {appointment?.data?.contactMobileNo}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Appointment Time:</span> {appointment?.data?.appointmentTime}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Appointment Date:</span> {appointment?.data?.appointmentDate}
          </Typography>
        </Box>
      </Grid>
    </Grid>
  </Card>
)} */}
      </Stack>
    </Container>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {appointmentError && renderError}
      {appointment && voter && renderPostv}
      {appointment && !voter && renderPostc}
    </>
  );
}
AppointmentwithdoctorDetailsView.propTypes = {
  id: PropTypes.string,
};
