import { useParams } from 'react-router';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
// import { RouterLink } from 'src/routes/components';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// import { useGetVoter } from 'src/api/voter';

import { useGetParty } from 'src/api/party';

import Label from 'src/components/label';
// import Iconify from 'src/components/iconify/iconify';
// import EmptyContent from 'src/components/empty-content/empty-content';

import BannerBlurImg from './assets/overlay_2.jpg';
import VoterDetailsHero from '../voter-details-hero';

// ----------------------------------------------------------------------

export default function VoterDetailsView() {
  const { id } = useParams();
  const voter = JSON.parse(decodeURIComponent(id));

  const { party: partyDetails } = useGetParty(voter.voterPartyId);

  const partyData = partyDetails?.data || [];

  const [voterData, setVoterData] = useState({});
  const [voterProfile, setVoterProfile] = useState({});

  useEffect(() => {
    if (voter) {
      setVoterData(voter.user);
      setVoterProfile(voter.profile);
    }
  }, [voter]);

  // const renderError = (
  //   <Container sx={{ my: 10 }}>
  //     <EmptyContent
  //       filled
  //       title='No Data'
  //       action={
  //         <Button
  //           component={RouterLink}
  //           href={paths.voter}
  //           startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
  //           sx={{ mt: 3 }}
  //         >
  //           Back to List
  //         </Button>
  //       }
  //       sx={{ py: 10 }}
  //     />
  //   </Container>
  // );

  const renderPost = voter && (
    <>
      <VoterDetailsHero title="VOTER DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Voter',
              href: paths.dashboard.vote_prediction.root,
            },
            {
              name: 'Details',
              href: paths.voter,
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
              <Typography sx={{ ml: 1 }}>
                {voter.profile === null
                  ? `${voterData.userName}`
                  : `${voterProfile?.firstName} ${voterProfile?.middleName} ${voterProfile?.lastName}`}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone No.:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {voterData.phone}</Typography>
                {voterData.isMobileVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack
              direction="row"
              alignItems="start"
              sx={{ marginTop: '10px', display: `${voterData.email === null ? 'none' : 'flex'}` }}
            >
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {voterData.email}</Typography>
                {voterData.isEmailVerified ? (
                  <Label color="success">Verified</Label>
                ) : (
                  <Label color="error">Not Verified</Label>
                )}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>UPI ID:</Typography>
              <Typography sx={{ ml: 1 }}> {voter.voterUpiId}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Voted to:</Typography>
              <Typography sx={{ ml: 1 }}>
                {voter.voterPartyId === null ? (
                  <Label color="error">Not Voted</Label>
                ) : (
                  `${partyData?.partyName}`
                )}
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {voter && renderPost}
    </>
  );
}
