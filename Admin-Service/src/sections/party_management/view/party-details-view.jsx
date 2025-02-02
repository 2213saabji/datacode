import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { Avatar, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetParty } from 'src/api/party';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import PartyDetailsHero from '../party-details-hero';

// ----------------------------------------------------------------------

export default function PartyDetailsView({ id }) {
  const { party, partyError } = useGetParty(id);
  const [partyData, setPartyData] = useState({});

  useEffect(() => {
    if (party && party.data) {
      setPartyData(party.data);
    }
  }, [party]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${partyError?.message}`}
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
      <PartyDetailsHero title="PARTY DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Party',
              href: paths.dashboard.party.root,
            },
            {
              name: 'Details',
              href: paths.party,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Name:</Typography>
              <Typography sx={{ ml: 1 }}> {partyData.partyName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Leader:</Typography>
              <Typography sx={{ ml: 1 }}> {partyData.partyLeader}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Symbol:</Typography>
              <Avatar
                sx={{ ml: 1 }}
                src={partyData.partySymbolImageDetails?.preview}
                alt={partyData.partyName}
              />
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Foundation Year:</Typography>
              <Typography sx={{ ml: 1 }}> {partyData.partyFoundationYear}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Membership Count:</Typography>
              <Typography sx={{ ml: 1 }}> {partyData.partyMembershipCount}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Manifesto:</Typography>
              <Typography sx={{ ml: 1 }}> {partyData.partyManifesto}</Typography>
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

      {partyError && renderError}

      {party && renderPost}
    </>
  );
}
PartyDetailsView.propTypes = {
  id: PropTypes.string,
};
