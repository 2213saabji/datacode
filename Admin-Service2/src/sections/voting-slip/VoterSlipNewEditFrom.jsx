/* eslint-disable no-unused-vars */
// // import PropTypes from 'prop-types';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
// // import { whitespace } from 'stylis';
import generatePDF from 'react-to-pdf';
import { useRef, useMemo, useState } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';
import ReplyIcon from '@mui/icons-material/Reply';
import LoadingButton from '@mui/lab/LoadingButton';
import DownloadIcon from '@mui/icons-material/Download';
import {
  Table,
  Paper,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  useMediaQuery,
  TableContainer,
} from '@mui/material';

import { fAge } from 'src/utils/format-time';
import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
import { useGetNewVotersDetails } from 'src/api/voter';
import { UpgradeStorageIllustration } from 'src/assets/illustrations';

import Image from 'src/components/image';
import { useSnackbar } from 'src/components/snackbar';

// import { whitespace } from 'stylis';

// import { margin } from '@mui/system';

export default function VoterSlipNewEditForm() {
  const { user } = useAuthContext();
  const theme = useTheme();
  // const { voters } = useGetVotersDetails();
  const { voters } = useGetNewVotersDetails(user?.accessToken);

  // console.log('voters------->', voters)
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { enqueueSnackbar } = useSnackbar();

  const voterDetails = voters && voters.data ? voters.data : {};

  const targetRef = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingShare, setIsLoadingShare] = useState(false);
  const [shareUrl, setShareUrl] = useState(null);
  const [toggle, setToggle] = useState(null);

  // console.log('shareUrl----->', shareUrl)

  const [profileImageBase64, setProfileImageBase64] = useState(null);

  // useEffect(() => {
  //   const toDataURL = async (url) => {
  //     const response = await fetch(url);
  //     const blob = await response.blob();
  //     const reader = new FileReader();
  //     reader.readAsDataURL(blob);
  //     reader.onloadend = () => {
  //       setProfileImageBase64(reader.result);
  //     };
  //   };

  //   toDataURL(user?.UserProfile?.userProfileImageDetails?.preview);
  // }, [user?.UserProfile?.userProfileImageDetails?.preview]);

  async function handleDownload() {
    setIsLoading(true);
    await generatePDF(targetRef, { filename: 'voter-slip.pdf' });
    setIsLoading(false);
  }

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadclaimFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response.data.data : {};
        return imageUrl.preview || null;
      } catch (error) {
        console.error('Error uploading image:', error);
        enqueueSnackbar('Error while uploading image', { variant: 'error' });
        return null;
      }
    },
    [enqueueSnackbar]
  );

  const handleGenerateAndUploadImage = async () => {
    setToggle(false);
    setIsLoadingShare(true);

    // Generate image from component
    const canvas = await html2canvas(targetRef.current);
    const imgData = canvas.toDataURL('image/png');

    // Create a PDF using jsPDF
    const pdf = jsPDF();
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    const blob = pdf.output('blob');
    const originalFile = new File([blob], 'imageFile.pdf', { type: 'application/pdf' });

    // Upload the image and get the URL
    const imageUrl = await uploadImage(originalFile);
    if (imageUrl) {
      setShareUrl(imageUrl);
      setToggle(true);
      setIsLoadingShare(false);
    } else {
      console.error('Failed to upload image or get URL');
      setIsLoadingShare(false);
    }
  };

  const handleSharee = async () => {
    if (!shareUrl) {
      alert('No URL available to share');
      return;
    }

    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Example',
          text: 'Check out this link!',
          url: shareUrl,
        });
        setToggle(null);
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
      alert('Your browser does not support sharing.');
    }
  };

  return (
    <Grid container spacing={2} justifyContent="center" mt={5} alignItems="stretch">
      <Grid item xs={12} md={7} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Card
          sx={{
            p: 1.5,
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            marginBottom: { xs: 2, md: 0 },
            flex: 1,
          }}
        >
          <Box sx={{ pl: 3 }} ref={targetRef}>
            <Box
              sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}
            >
              {/* <Image sx={{ width: 130, height: 130, borderRadius: 1.5, mb: 5 }} src="/assets/images/voteruser/bjp.jpg" /> */}
              {/* {user?.UserProfile?.userProfileImageDetails?.preview ?
              <Image
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: 1.5,
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',  // Add boxShadow here
                }}
                // src='https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1717151267804-blob'
                src={user?.UserProfile?.userProfileImageDetails?.preview}
              /> : (
                <Avatar
                sx={{
                  width: 130,
                  height: 130,
                  borderRadius: 1.5,
                  boxShadow: '0px 0px 8px rgba(0, 0, 0, 0.5)',
                  fontSize: 88,  
                }}
              >
                {user?.UserProfile?.firstName?.slice(0, 1)}
              </Avatar>
              )} */}
              <Image
                sx={{
                  width: 100,
                  height: 100,
                  borderRadius: 3.5,
                  mr: 4,
                  // boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',  // Add boxShadow here
                }}
                src="/logo/logo_single.png"
              />
            </Box>

            <Divider sx={{ border: '1px dashed lightgray', mb: 2, opacity: 0.2 }} />

            <TableContainer component={Paper}>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Name&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">
                        {user?.UserProfile?.firstName || 'not provided'}{' '}
                        {user?.UserProfile?.lastName}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Age&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">
                        {fAge(user?.UserProfile?.dateOfBirth)}
                      </Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Father Name &nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{user?.UserProfile?.fatherName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Gender&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{user?.UserProfile?.gender}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        EPIC No. / Voter No.&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{voters?.data?.epicNo ?? 'NA'}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Panchayat name&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{voters?.data?.panchayatName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Ward number&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{voters?.data?.wardNo}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Tehsil Name&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">{voters?.data?.tehsilName}</Typography>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography sx={{ fontWeight: '700', display: 'inline' }}>
                        Aadhar No.&nbsp;:
                      </Typography>
                    </TableCell>
                    <TableCell sx={{ p: '4px', width: '250px' }}>
                      <Typography display="inline">
                        {user?.UserIdentityDetails && user?.UserIdentityDetails[0]?.identityNumber}
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Card>
      </Grid>
      <Grid item xs={12} md={5} sx={{ display: 'flex', flexDirection: 'column' }}>
        <Stack
          alignItems="center"
          sx={{
            ...bgGradient({
              direction: '180deg',
              // startColor: theme.palette.primary.main,
              // endColor: theme.palette.primary.dark,
              startColor: 'white',
              endColor: '#0001',
            }),
            p: 5,
            borderRadius: 2,
            backgroundColor: 'common.white',
            height: { md: '470px' },
            boxShadow: '0 0 5px #0005',
          }}
        >
          <UpgradeStorageIllustration />
          <Stack direction="row" alignItems="center" justifyContent="center" gap={2} width="100%">
            {toggle !== true && (
              <LoadingButton
                loading={isLoadingShare}
                loadingPosition="start"
                sx={{
                  mt: 5,
                  px: 2,
                  color: 'white',
                  backgroundColor: 'black',
                  '&:hover': { backgroundColor: 'white', color: 'black' },
                }}
                onClick={() => {
                  handleGenerateAndUploadImage();
                }}
              >
                <ReplyIcon sx={{ transform: 'rotateY(180deg)', mr: 1 }} /> Generate Link
              </LoadingButton>
            )}
            {toggle === true && (
              <Button
                sx={{
                  mt: 5,
                  px: 2,
                  color: 'white',
                  backgroundColor: 'black',
                  '&:hover': { backgroundColor: 'white', color: 'black' },
                }}
                onClick={() => handleSharee()}
              >
                <ReplyIcon sx={{ transform: 'rotateY(180deg)', mr: 1 }} /> SHARE
              </Button>
            )}
            <LoadingButton
              color="inherit"
              loading={isLoading}
              loadingPosition="start"
              onClick={() => handleDownload()}
              sx={{
                mt: 5,
                px: 2,
                backgroundColor: 'black',
                color: 'white',
                '&:hover': { backgroundColor: 'white', color: 'black' },
              }}
            >
              <DownloadIcon /> DOWNLOAD
            </LoadingButton>
          </Stack>
          {toggle === false && (
            <Typography sx={{ mt: 2, color: 'green' }}>
              Wait until your link is being generated
            </Typography>
          )}
        </Stack>
      </Grid>
    </Grid>
  );
}

VoterSlipNewEditForm.propTypes = {};
