// import PropTypes from 'prop-types';
// import { useNavigate } from 'react-router-dom';
// import { useState, useEffect, useCallback } from 'react';

// import { Box } from '@mui/system';
// import {
//   Stack,
//   Table,
//   Paper,
//   Button,
//   TableRow,
//   Container,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableContainer,
// } from '@mui/material';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';

// import { useGetService } from 'src/api/case';
// import { useGetContracts } from 'src/api/contract';

// import Iconify from 'src/components/iconify';
// import EmptyContent from 'src/components/empty-content';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/case-law.jpg';
// import DriverDetailsHero from '../case-details-hero';

// export default function CaseDetailsView({ id }) {
//   const navigate = useNavigate();
//   const { document, documentError } = useGetService(id);
//   const { services } = useGetContracts();
//   const [documentData, setDocumentData] = useState({});
//   const [matchingContractId, setMatchingContractId] = useState(null);

//   console.log('caseBYId', document?.data);
//   console.log('contracts', services?.data);

//   useEffect(() => {
//     if (document && document.data) {
//       setDocumentData(document.data);
//     }
//   }, [document]);

//   useEffect(() => {
//     if (services?.data) {
//       const matchedContract = services.data.filter((service) => service?.caseId === Number(id));
//       if (matchedContract.length > 0) {
//         setMatchingContractId(matchedContract[0]?.contractId);
//       } else {
//         setMatchingContractId(null);
//       }
//       console.log('matchingContract', matchedContract[0]);
//     }
//   }, [services, id]);

//   const handleSeeContractClick = () => {
//     if (matchingContractId) {
//       console.log('matchingContractId', matchingContractId);
//       navigate(`/dashboard/LMS_contract/${matchingContractId}`);
//     }
//   };

//   const router = useRouter();
//   const handleViewContract = useCallback(() => {
//     router.push(paths.dashboard.LMS_contract.create);
//   }, [router]);

//   // const handleViewCase = useCallback(() => {
//   //   router.push({ pathname: paths.dashboard.LMS_case.create });
//   // }, [router]);

//   const renderError = (
//     <Container sx={{ my: 10 }}>
//       <EmptyContent
//         filled
//         title={documentError?.message || 'An error occurred'}
//         action={
//           <Button
//             component={RouterLink}
//             href={paths.driver}
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

//   const renderPost = document && (
//     <>
//       <Button
//         component={RouterLink}
//         to="/dashboard"
//         variant="outlined"
//         color="primary"
//         style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
//       >
//         Back
//       </Button>
//       <DriverDetailsHero title="Case Details" coverUrl={BannerBlurImg} />

//       <Container
//         maxWidth={false}
//         sx={{
//           py: 3,
//           mb: 5,
//           borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
//         }}
//       >
//         <CustomBreadcrumbs
//           links={[
//             { name: 'Cases', href: paths.dashboard.LMS_case.root },
//             { name: 'Details', href: paths.LMS_case },
//           ]}
//           sx={{ maxWidth: 720, mx: 'auto' }}
//         />
//       </Container>

//       <Container maxWidth="md">
//         <Stack
//           sx={{
//             p: 2,
//             borderRadius: 2,
//             boxShadow: 1,
//             backgroundColor: 'background.paper',
//           }}
//         >
//           <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
//             <Table>
//               <TableHead>
//                 <TableRow>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Field</TableCell>
//                   <TableCell sx={{ fontWeight: 'bold' }}>Value</TableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {Object.entries(documentData).map(([key, value]) => (
//                   <TableRow key={key}>
//                     <TableCell sx={{ fontWeight: 'bold' }}>{formatKey(key)}</TableCell>
//                     {/* <TableCell>{value || 'N/A'}</TableCell> */}
//                     {typeof value === 'object' && value !== null
//                       ? JSON.stringify(value) // Safely convert objects/arrays to strings
//                       : value || 'N/A'}{' '}
//                     {/* Render value or 'N/A' if falsy */}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           </TableContainer>

//           {/* Conditionally render the "See Contract" button */}
//           {/* {
//           // matchingContractId
//           //  && 
//            (
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSeeContractClick}
//               sx={{ mt: 3 }}
//             >
//               See Contract
//             </Button>
//           )} */}
//           <Box
//             sx={{
//               display: 'flex',
//               justifyContent: 'space-between', // Distribute space between buttons
//               alignItems: 'center', // Align buttons vertically in the center
//               gap: 2, // Add spacing between the buttons
//             }}
//           >
//             {documentData.caseStatus !== 'open' && (
//               <Button
//                 variant="contained"
//                 sx={{
//                   alignSelf: 'center',
//                 }}
//                 onClick={handleSeeContractClick}
//               >
//                 See Contract
//               </Button>
//             )}

//             {documentData.caseStatus === 'open' && (
//               <Button
//                 variant="contained"
//                 sx={{ alignSelf: 'center' }}
//                 onClick={handleViewContract}
//                 // disabled={!caseAccepted}
//                 // Disable if case is not accepted
//               >
//                 Sign Contract
//               </Button>
//             )}

//             {/* <Button
//               variant="contained"
//               sx={{
//                 alignSelf: 'center',
//               }}
//               onClick={handleViewCase}
//             >
//               Create Case
//             </Button> */}
//           </Box>
//         </Stack>
//       </Container>
//     </>
//   );

//   function formatKey(key) {
//     return key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
//   }

//   return (
//     <>
//       {documentError && renderError}
//       {document && renderPost}
//     </>
//   );
// }

// CaseDetailsView.propTypes = {
//   id: PropTypes.string,
// };
/* eslint-disable no-shadow */
/* eslint-disable radix */
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect,useCallback } from 'react';

import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/case';
import { useGetContracts } from 'src/api/contract';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/case-law.jpg';
import DriverDetailsHero from '../case-details-hero';

export default function CaseDetailsView({ id }) {
  
  const { document, documentError } = useGetService(id);
  const { services } = useGetContracts();
  console.log(document);
  const [documentData, setdocumentData] = useState({});
  console.log(documentData);
  const [matchingContractId, setMatchingContractId] = useState(null);
  const navigate = useNavigate();
  console.log('caseBYId', document?.data);
  console.log('contracts', services?.data);
  // Perform API call or further logic for submission

  useEffect(() => {
    if (document && document.data) {
      setdocumentData(document.data);
    }
  }, [document]);

    useEffect(() => {
    if (services?.data) {
      const matchedContract = services.data.filter((service) => service?.caseId === Number(id));
      if (matchedContract.length > 0) {
        setMatchingContractId(matchedContract[0]?.contractId);
      } else {
        setMatchingContractId(null);
      }
      console.log('matchingContract', matchedContract[0]);
    }
  }, [services, id]);

  const handleSeeContractClick = () => {
    if (matchingContractId) {
      console.log('matchingContractId', matchingContractId);
      navigate(`/dashboard/LMS_contract/${matchingContractId}`);
    }
  };

  const router = useRouter();
  const handleViewContract = useCallback(() => {
    router.push(paths.dashboard.LMS_contract.create);
  }, [router]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${documentError?.message}`}
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

  const renderPost = document && (
    <>
      <DriverDetailsHero title="CASE DETAILS" coverUrl={BannerBlurImg} />
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px',margin:'3px' }}
      >
        Back
      </Button>
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
              name: 'Case',
              href: paths.dashboard.LMS_case.root,
            },
            {
              name: 'Details',
              href: paths.LMS_case,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Stack
            direction="column"
            alignItems="start"
            sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}
          >
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Case Detail:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.caseDetails}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Case Status:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.caseStatus}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Case Approval Date:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.caseApprovalDate}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Case Notes:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.caseNotes}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Deadline:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.deadline}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Urgency:</Typography>
              <Typography sx={{ ml: 1 }}>{documentData.urgency}</Typography>
            </Stack>
          </Stack>

        
            {documentData.caseStatus !== 'open' && (
              <Button
                variant="contained"
                sx={{
                  alignSelf: 'center',
                }}
                onClick={handleSeeContractClick}
              >
                View Contract
              </Button>
            )}

            {documentData.caseStatus === 'open' && (
              <Button
                variant="contained"
                sx={{ alignSelf: 'center' }}
                onClick={handleViewContract}
                // disabled={!caseAccepted}
                // Disable if case is not accepted
              >
                Sign Contract
              </Button>
            )}

            {/* <Button
              variant="contained"
              sx={{
                alignSelf: 'center',
              }}
              onClick={handleViewCase}
            >
              Create Case
            </Button> */}
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {documentError && renderError}
      {document && renderPost}
     
    </>
  );
}

CaseDetailsView.propTypes = {
  id: PropTypes.string,
};
