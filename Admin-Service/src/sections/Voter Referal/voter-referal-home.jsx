// import PropTypes from 'prop-types';
// import { useState } from 'react';

// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Unstable_Grid2';
// import CardHeader from '@mui/material/CardHeader';
// import { Box, Modal, Button, Typography } from '@mui/material';

// import { useAuthContext } from 'src/auth/hooks';

// import Label from 'src/components/label';
// import Iconify from 'src/components/iconify';

// import JwtRegisterView from './jwt-register-view';

// // ----------------------------------------------------------------------

// export default function ReferalHome({ voter, candidates }) {

//   const { user } = useAuthContext();
//   const [open, setOpen] = useState(false);
//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);

//   const renderAbout = (
//     <Grid container spacing={3} sx={{ maxWidth: 800 }}>
//       <Card sx={{ width: '100%' }}>
//         <CardHeader title="About" />
//         <Stack spacing={2} sx={{ p: 3 }}>
//           {/* <Stack direction="row" alignItems="start">
//             <Typography >{candidates?.candidates?.data?.ElectionDetail?.electionType}</Typography>
//           </Stack> */}

//           {/* <Stack direction="row" alignItems="start">
//             <Typography >{candidates?.candidates?.data?.PartyDetail?.partyName}</Typography>
//           </Stack> */}

//           {/* <Stack direction="column" alignItems="start"> */}
//             {/* <Typography >{candidates?.candidates?.data?.legalCase}</Typography> */}
//             <Stack direction="row" sx={{ typography: 'body2' }}>
//               <Iconify icon="ic:baseline-account-circle" width={24} sx={{ mr: 3 }} />
//               {user?.userName}
//             </Stack>

//             <Stack direction="row" sx={{ typography: 'body2' }}>
//               <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 3 }} />
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <Typography> {user?.email}</Typography>
//                 <Typography>
//                   {' '}
//                   {user?.isEmailVerified ? (
//                     <Label color="success">Verified</Label>
//                   ) : (
//                     <Label color="error">Not Verified</Label>
//                   )}{' '}
//                 </Typography>
//               </Stack>
//             </Stack>

//             <Stack direction="row" sx={{ typography: 'body2' }}>
//               <Iconify icon="ic:sharp-smartphone" width={24} sx={{ mr: 3 }} />
//               <Stack direction="row" alignItems="center" spacing={1}>
//                 <Typography> {user?.phone}</Typography>
//                 <Typography>
//                   {user?.isMobileVerified ? (
//                     <Label color="success">Verified</Label>
//                   ) : (
//                     <Label color="error">Not Verified</Label>
//                   )}
//                 </Typography>
//               </Stack>
//             </Stack>

//             <Stack
//               direction="row"
//               sx={{ typography: 'body2', width: '100%', justifyContent: 'center' }}
//             >
//               {user?.isMobileVerified && user?.isEmailVerified ? (
//                 ''
//               ) : (
//                 <>
//                   <Modal
//                     open={open}
//                     onClose={handleClose}
//                     aria-labelledby="modal-modal-title"
//                     aria-describedby="modal-modal-description"
//                   >
//                     <Box
//                       sx={{
//                         position: 'absolute',
//                         top: '50%',
//                         left: '50%',
//                         transform: 'translate(-50%, -50%)',
//                         width: 400,
//                         bgcolor: 'background.paper',
//                         border: '2px solid #000',
//                         boxShadow: 24,
//                         p: 4,
//                       }}
//                     >
//                       <JwtRegisterView user={user} />
//                     </Box>
//                   </Modal>
//                   <Button
//                     color="success"
//                     sx={{ fontSize: '14px', mt: '5px' }}
//                     onClick={handleOpen}
//                     disableTouchRipple
//                   >
//                     Verify Now
//                   </Button>
//                 </>
//               )}
//             </Stack>
//           {/* </Stack> */}
//         </Stack>
//       </Card>
//     </Grid>
//   );

//   const renderCandidate = (
//     <Grid container spacing={3} sx={{ maxWidth: 800 }}>
//       <Card sx={{ width: '100%' }}>
//         <CardHeader title="Candidate" />
//         <Stack spacing={2} sx={{ p: 3 }}>
//           <Stack direction="row" alignItems="start">
//             <Typography sx={{ mr: 1, minWidth: 180 }}>ELECTION: </Typography>
//             <Typography>{candidates?.data?.ElectionDetail?.electionType}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start">
//             <Typography sx={{ mr: 1, minWidth: 180 }}>PARTY: </Typography>
//             <Typography>{candidates?.data?.PartyDetail?.partyName}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start">
//             <Typography sx={{ mr: 1, minWidth: 180 }}>LEGAL CASE: </Typography>
//             <Typography>{candidates?.data?.legalCase}</Typography>
//           </Stack>
//         </Stack>
//       </Card>
//     </Grid>
//   );

//   const renderVoter = (
//     <Grid container spacing={3} sx={{ maxWidth: 800 }}>
//       <Card sx={{ width: '100%' }}>
//         <CardHeader title="Voter" />
//         <Stack spacing={2} sx={{ p: 3 }}>
//           <Stack direction="row" alignItems="start">
//             <Typography sx={{ mr: 10, minWidth: 180 }}>Polling Station Name: </Typography>
//             <Typography>{voter?.data?.PollingStationDetail?.pollingStationName}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start">
//             <Typography sx={{ mr: 10, minWidth: 180 }}>UPI ID: </Typography>
//             <Typography>{voter?.data?.upiId}</Typography>
//           </Stack>
//         </Stack>
//       </Card>
//     </Grid>
//   );
//   const renderProfile = (
//     <Grid container spacing={3} sx={{ maxWidth: 800 }}>
//       <Card sx={{ width: '100%' }}>
//         <CardHeader title="Profile" />
//         <Stack spacing={2} sx={{ p: 3 }}>
//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>FullName: </Typography>
//             <Typography>
//               {user?.UserProfile?.firstName } {user?.UserProfile?.middleName}{' '}
//               {user?.UserProfile?.lastName}{' '}
//             </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>DOB:</Typography>
//             <Typography> {user?.UserProfile?.dateOfBirth} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>GENDER:</Typography>
//             <Typography> {user?.UserProfile?.gender} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>FATHER NAME:</Typography>
//             <Typography> {user?.UserProfile?.fatherName} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>MOTHER NAME:</Typography>
//             <Typography> {user?.UserProfile?.motherName} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>QUALIFICATION:</Typography>
//             <Typography> {user?.UserProfile?.highestQualification} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>POLITICAL AFFILIATION:</Typography>
//             <Typography> {user?.UserProfile?.politicalPartyAffiliation} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>CURRENT JOB:</Typography>
//             <Typography> {user?.UserProfile?.currentJobTitle} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>WHATSAPP NO.:</Typography>
//             <Typography> {user?.UserProfile?.whatsappNumber} </Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>NATIONALITY:</Typography>
//             <Typography> {user?.UserProfile?.nationality}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>IDENTITY TYPE :</Typography>
//             <Typography>{user?.UserIdentityDetails[0]?.identityType}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>IDENTITY NUMBER:</Typography>
//             <Typography>{user?.UserIdentityDetails[0]?.identityNumber}</Typography>
//           </Stack>

//           <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
//             <Typography sx={{ mr: 10, minWidth: 180 }}>ADDRESS:</Typography>
//             <Stack direction="column">
//               <Typography>
//                 {user?.UserAddressesses[0]?.streetAddress} ,{' '}
//                 {user?.UserAddressesses[0]?.userCity} ,{' '}
//                 {user?.UserAddressesses[0]?.userState}
//               </Typography>
//               <Typography>
//                 {user?.UserAddressesses[0]?.postalCode},{' '}
//                 {user?.UserAddressesses[0]?.country},{' '}
//                 {user?.UserAddressesses[0]?.addressType}
//               </Typography>
//             </Stack>
//           </Stack>
//         </Stack>
//       </Card>
//     </Grid>
//   );

//   return (
//     <Grid
//       container
//       spacing={3}
//       p={2}
//       gap={6}
//       display="grid"
//       gridTemplateColumns={{
//         xs: 'repeat(1, 1fr)',
//         sm: 'repeat(1, 1fr)',
//         md: 'repeat(2, 1fr)',
//       }}
//     >
//       {user && (
//         <Stack spacing={3} gridColumn="span 1" sx={{ gap: '50px' }}>
//           {renderAbout}
//           {user?.userRoleId === 2 ? renderCandidate : ''}
//           {renderVoter}
//         </Stack>
//       )}
//       {user?.UserProfile != null && (
//         <Stack spacing={3} gridColumn="span 1">
//           {renderProfile}
//         </Stack>
//       )}
//     </Grid>
//   );
// }
// ReferalHome.propTypes = {
//   voter: PropTypes.object,
//   candidates: PropTypes.object,
// };
