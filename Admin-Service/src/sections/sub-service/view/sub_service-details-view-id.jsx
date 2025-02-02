/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
/* eslint-disable radix */

import { useState, useEffect } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Stack,
  Button,
  Divider,
  Container,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetLawyer } from 'src/api/lawyer';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import DriverDetailsHero from '../sub-service-details-hero';

export default function SubServiceDetailsView( ) {
    const id = 1;
  const { lawyer, lawyerError } = useGetLawyer(id);
  const [lawyerData, setLawyerData] = useState({});
  const [openRatingDialog, setOpenRatingDialog] = useState(false);
  // const [rating, setRating] = useState(0);
  const [openBookingDialog, setOpenBookingDialog] = useState(false);
  const [openLaywerDialog,setOpenLaywerDialog] = useState(false)
  const [name, setName] = useState('');
  const [proposal, setProposal] = useState('');
  const [number, setNumber] = useState('');
  const [caseId, setCaseId] = useState(''); // State for Case ID
  const[status,setStatus] = useState('')
  const [startDate, setStartDate] = useState(''); // State for Start Date
  const [endDate, setEndDate] = useState(''); // State for End Date
  const [paymentAmount, setPaymentAmount] = useState(''); // State for Payment Amount
  const [contractType, setContractType] = useState(''); // State for Contract Type
  const [contractDescription, setContractDescription] = useState(''); // State for Contract Description
  const [contractDocumentImageUrl, setContractDocumentImageUrl] = useState({
    image1: '',
    image2: ''
  }); // State for Contract Document Image URLs
  const [userIds, setUserIds] = useState([]); 
console.log(lawyer);
  const handleCloseBookingDialog = () => {
    setOpenBookingDialog(false); // Example close dialog function
  };
 const handleCloseLaywerDialog = () =>{
    setOpenLaywerDialog(false)
 }
  const bookingData = {
    caseId,
    startDate,
    endDate,
    status: 'open', // Example static value
    paymentAmount: parseFloat(paymentAmount), // Convert to float if necessary
    contractType,
    contractDescription,
    contractDocumentImageUrl: {
      image1: contractDocumentImageUrl.image1,
      image2: contractDocumentImageUrl.image2
    },
    // userIds: userIds.map(id => parseInt(id.trim())) // Example: Convert to integers
  };

  console.log(bookingData); 

  // Perform API call or further logic for submission


  useEffect(() => {
    if (lawyer && lawyer.data) {
      setLawyerData(lawyer.data);
    }
  }, [lawyer]);


  const handleRatingSubmit = () => {
    // console.log('Rating submitted:', rating);
    setOpenRatingDialog(false);
    // Add logic to handle rating submission
  };

 
  const handleCloseBookingDialo = () => {
    setOpenLaywerDialog(false);
  };

  const handleBookingSubmit = () => {
    // Handle form submission logic here
    console.log('Name:', name);
    console.log('Proposal:', proposal);
    console.log('Number:', number);
    
    setName('')
    setProposal('')
    setNumber('')
    // You can add further logic to submit this data or close the modal, etc.
    setOpenBookingDialog(false);  
  };

  const renderStars = (rating) => {
    const totalStars = 5; // Assuming a 5-star rating system
    const stars = [];
    // eslint-disable-next-line no-plusplus
    for (let i = 1; i <= totalStars; i++) {
      if (i <= rating / 2) {
        stars.push(<StarIcon key={i} style={{ color: 'gold' }} />); // Filled star
      } else {
        stars.push(<StarBorderIcon key={i} style={{ color: 'gold' }} />); // Empty star
      }
    }
    return stars;
  };

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${lawyerError?.message}`}
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

  const renderPost = lawyer && (
    <>
      <DriverDetailsHero title="SUB SERVICE DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Sub Service',
            //   href: paths.dashboard.lawyer.root,
            },
            {
              name: 'Details',
            //   href: paths.Lawyer,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Full Name:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.userFullName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Experience Level:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.experienceLevel}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Work Areas:</Typography>
              <Typography sx={{ ml: 1 }}>Civil cases , Criminal cases</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Registration Number:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.registrationNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Service Area:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.serviceArea}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>License Certification:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.licenseCertification}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Service Description:</Typography>
              <Typography sx={{ ml: 1 }}> {lawyerData.serviceDescription}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Rating:</Typography>
              <Typography sx={{ ml: 1 }}>{renderStars(lawyerData.rating)}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
          
        </Stack>
      </Container>
    </>
  );
  const handleBookSubmit = async () => {
    try {
      const apiUrl = 'http://localhost:8082/api/v1/contract-details/create';
      console.log(apiUrl);
      const requestBody = {
        caseId: parseInt(caseId), // Assuming caseId should be an integer based on your API example
        startDate,
        endDate,
        paymentAmount: parseFloat(paymentAmount), // Assuming paymentAmount should be a number
        contractType,
        contractDescription,
        contractDocumentImageUrl,
        userIds: userIds.map(id => parseInt(id.trim())) // Assuming userIds should be an array of integers
      };
     console.log();
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });
  
      if (response.ok) {
        // Handle success
        console.log('Contract details submitted successfully');
        handleCloseBookingDialog(); // Close dialog upon successful submission
      } else {
        // Handle error
        console.error('Failed to submit contract details');
        // You can optionally handle error messages here
      }
    } catch (error) {
      console.error('Error submitting contract details:', error);
      // Handle network errors or other exceptions
    }
  };
  return (
    <>
      {lawyerError && renderError}
      {lawyer && renderPost}
    </>
  );
}


