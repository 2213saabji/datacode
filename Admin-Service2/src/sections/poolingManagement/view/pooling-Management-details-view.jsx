import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetPool } from 'src/api/poolManagement';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import CandidateDetailsHero from '../pooling-Management-details-hero';

export default function PoolingDetailsView({ id }) {
  const { pool, poolError } = useGetPool(id);

  const [poolData, setPoolData] = useState({});

  useEffect(() => {
    if (pool && pool.data) {
      setPoolData(pool.data);
    }
  }, [pool]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${poolError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.user}
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
      <CandidateDetailsHero title="POLLING STATION DETAILS" coverUrl={BannerBlurImg} />

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
              name: 'Polling Station',
              href: paths.dashboard.poolmanagement.root,
            },
            {
              name: 'Details',
              href: paths.poolmanagement,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Polling Station Name:</Typography>
              <Typography sx={{ ml: 1 }}> {poolData.pollingStationName}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Polling Station Capacity:</Typography>
              <Typography sx={{ ml: 1 }}> {poolData.pollingCapacity}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Number Of Booth:</Typography>
              <Typography sx={{ ml: 1 }}> {poolData.numberOfBooth}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {poolError && renderError}
      {pool && renderPost}
    </>
  );
}

PoolingDetailsView.propTypes = {
  id: PropTypes.string,
};
