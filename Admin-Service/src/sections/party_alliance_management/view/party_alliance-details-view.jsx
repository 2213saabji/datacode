import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetPartyAlliance } from 'src/api/party_alliance';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import PartyAllianceDetailsHero from '../party_alliance-details-hero';

// ----------------------------------------------------------------------

export default function PartyAllianceDetailsView({ id }) {
  const { PartyAlliance, PartyAllianceError } = useGetPartyAlliance(id);

  const [partyAllianceData, setPartyData] = useState({});

  useEffect(() => {
    if (PartyAlliance && PartyAlliance.data) {
      setPartyData(PartyAlliance.data);
    }
  }, [PartyAlliance]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${PartyAllianceError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.party_alliance}
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
      <PartyAllianceDetailsHero title="PARTY ALLIANCE DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Party Alliance',
              href: paths.dashboard.party_alliance.root,
            },
            {
              name: 'Details',
              href: paths.party_alliance,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Party Alliance Name:</Typography>
              <Typography sx={{ ml: 1 }}> {partyAllianceData.partyAllianceName}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );
  return (
    <>
      {PartyAllianceError && renderError}

      {PartyAlliance && renderPost}
    </>
  );
}
PartyAllianceDetailsView.propTypes = {
  id: PropTypes.string,
};
