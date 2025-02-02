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
// import CardMedia from '@mui/material/CardMedia';
// import TextField from '@mui/material/TextField';
// import ReplyIcon from '@mui/icons-material/Reply';
// import CardHeader from '@mui/material/CardHeader';
import IconButton from '@mui/material/IconButton';
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

// import { useGetAppointment } from 'src/api/appointment';
import { useGetDesire } from 'src/api/desire';
// import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
// import { Link } from 'react-router-dom';
// import { UpgradeStorageIllustration } from 'src/assets/illustrations';

// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import BannerBlurImg from './assets/overlay_2.jpg';
import AppointmentDetailsHero from '../Desire-details-hero';

// ----------------------------------------------------------------------
const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));
export default function DesireDetailsView({ id }) {
  // const theme = useTheme();
  const targetRef = useRef();
  // const [selectedValue, setSelectedValue] = useState('');
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  const { Desires, DesiresError } = useGetDesire(id);
  // const [partyData, setPartyData] = useState({});
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { user } = useAuthContext();

  const getInitials = (name) => {
    if (!name) return '';
    return name.charAt(0).toUpperCase();
  };
  const voter = user.userRoleType === 'Voter';
  // useEffect(() => {
  //   if (Desires && Desires.data) {
  //     setPartyData(Desires.data);
  //   }
  // }, [Desires]);

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
        title={`${DesiresError?.message}`}
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
      <AppointmentDetailsHero title="Details" coverUrl={BannerBlurImg} />

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
              href: paths.dashboard.Desire.root,
            },
            {
              name: 'Details',
              href: paths.Desires,
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
                      <Typography>{Desires?.data?.Voter?.email}</Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: { xs: 'center', sm: 'flex-start' },
                      }}
                    >
                      <Typography sx={{ fontWeight: '700', marginRight: 1 }}>Phone:</Typography>
                      <Typography>{Desires?.data?.Voter?.phone}</Typography>
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
                      <Typography sx={{ ml: 1 }}> {Desires?.data?.problemDescription}</Typography>
                    </Stack>
                    <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                      <Typography sx={{ mr: 1, minWidth: 180 }}>AappointmentStatus:</Typography>
                      <Typography sx={{ ml: 1 }}> {Desires?.data?.appointmentStatus}</Typography>
                    </Stack>
                  </Stack>
                </Box>
              </Grid>
            </Grid>
          </Card>
          <Divider sx={{ mt: 5, mb: 2 }} />

          {voter && Desires?.data?.appointmentType && (
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
                    Your Meeting is approved by Candidate !!
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
                        <Typography sx={{ mr: 1, minWidth: 180 }}> Desires Type:</Typography>
                        <Typography sx={{ ml: 1 }}> {Desires?.data?.appointmentType}</Typography>
                      </Stack>

                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>AappointmentTime:</Typography>
                        <Typography sx={{ ml: 1 }}> {Desires?.data?.appointmentTime}</Typography>
                      </Stack>
                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>Desires Date:</Typography>
                        <Typography sx={{ ml: 1 }}> {Desires?.data?.appointmentDate}</Typography>
                      </Stack>

                      <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
                        <Typography sx={{ mr: 1, minWidth: 180 }}>Meeting Link</Typography>
                        <Typography sx={{ ml: 1 }}>
                          {' '}
                          {Desires?.data?.appointmentPassMeetingLink}
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
                  <Typography>{Desires?.data?.Voter?.email}</Typography>
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
                  <Typography>{Desires?.data?.Voter?.phone}</Typography>
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
                Candidate Name:
              </Typography>
              <Typography sx={{ mr: 1, minWidth: 180, ml: { xs: 0, sm: 6 } }}>
                {Desires?.data?.Candidate?.UserProfile?.firstName}{' '}
                {Desires?.data?.Candidate?.UserProfile?.lastName}
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
                Desires Type:
              </Typography>
              <Typography sx={{ mr: 1, minWidth: 180, ml: { xs: 0, sm: 6 } }}>
                {Desires?.data?.appointmentType}
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
              {Desires?.data?.appointmentPassStatus === 'in-progres' ? (
                <Typography
                  variant="h5"
                  color="#fff"
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  Candidate is approved. Your Desires!!
                </Typography>
              ) : (
                <Typography
                  variant="h5"
                  color="#fff"
                  sx={{ fontWeight: 'bold', textAlign: 'center' }}
                >
                  Your Desires is send to Candidate !!
                </Typography>
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
            {(Desires?.data?.appointmentType === 'office' ||
              Desires?.data?.appointmentType === 'remote') &&
              Desires?.data?.appointmentPassStatus === 'in-progres' && (
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
                  Desires?.data?.appointmentType === 'office' &&
                  Desires?.data?.appointmentPassStatus === 'in-progres' && (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, margin: 'auto' }}>
                      <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                        Desires Details:
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Desires Type:</span>{' '}
                        {Desires?.data?.appointmentType}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Address:</span>{' '}
                        {Desires?.data?.reportingContactAddress}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Contact Person Name:</span>{' '}
                        {Desires?.data?.reportingContactName}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Contact Mobile No.:</span>{' '}
                        {Desires?.data?.reportingContactNumber}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Desires Time:</span>{' '}
                        {Desires?.data?.appointmentTime}
                      </Typography>
                      <Typography>
                        <span style={{ fontWeight: 'bold' }}>Desires Date:</span>{' '}
                        {Desires?.data?.appointmentDate}
                      </Typography>
                    </Box>
                  )}
              </CardContent>
              {voter &&
                Desires?.data?.appointmentType === 'remote' &&
                Desires?.data?.appointmentPassStatus === 'in-progres' && (
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
                            <Typography sx={{ mr: 1, minWidth: 180 }}>Meeting Link:</Typography>
                            <Typography sx={{ ml: 1 }}>
                              <a
                                href={Desires?.data?.appointmentPassMeetingLink}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {Desires?.data?.appointmentPassMeetingLink}
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
                <Typography>{Desires?.data?.problemDescription}</Typography>
              </Box>
            </Grid>
          </Grid>
        </Card>
        {/* </Stack> */}

        <Divider sx={{ mt: 5, mb: 2 }} />
        {/* {voter && Desires?.data?.appointmentType === 'office' && (
  <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
    <Grid spacing={3}>
      <Typography sx={{ margin: 'auto', minWidth: 180, textAlign: 'center', color: 'green', fontWeight: 'bold', fontSize: '19px' }}>
        Your Meeting is approved by Candidate !!
      </Typography>

      <Box gap={3} display="grid" gridTemplateColumns={{ xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)' }}>
        <Stack direction="column" alignItems="start">
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Desires Type:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.appointmentType}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Address:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.address}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Contact Person Name:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.contactPersonName}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Contact Mobile No.:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.contactMobileNo}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Desires Time:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.appointmentTime}</Typography>
          </Stack>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}> Desires Date:</Typography>
            <Typography sx={{ ml: 1 }}>{Desires?.data?.appointmentDate}</Typography>
          </Stack>
        </Stack>
      </Box>
    </Grid>
  </Card>
)} */}
        {/* 
{voter && Desires?.data?.appointmentType === 'office' && (
  <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto', borderRadius: 8 }}>
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Typography sx={{ margin: 'auto', textAlign: 'center', color: 'green', fontWeight: 'bold', fontSize: '1.2rem' }}>
          Your Meeting is approved by Candidate!!
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>Desires Details:</Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Desires Type:</span> {Desires?.data?.appointmentType}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Address:</span> {Desires?.data?.address}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Contact Person Name:</span> {Desires?.data?.contactPersonName}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Contact Mobile No.:</span> {Desires?.data?.contactMobileNo}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Desires Time:</span> {Desires?.data?.appointmentTime}
          </Typography>
          <Typography>
            <span style={{ fontWeight: 'bold' }}>Desires Date:</span> {Desires?.data?.appointmentDate}
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

      {DesiresError && renderError}
      {Desires && voter && renderPostv}
      {Desires && !voter && renderPostc}
    </>
  );
}
DesireDetailsView.propTypes = {
  id: PropTypes.string,
};
