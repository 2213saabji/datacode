import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetComplaintByvoterProblemId } from 'src/api/govtServiceRoadmap';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostDetailsHero from 'src/sections/electionmanagement/election-details-hero';
import BannerBlurImg from 'src/sections/electionmanagement/view/assets/overlay_2.jpg';

export default function GovtServiceRoadmapDetails({ id }) {
  const { user } = useAuthContext();
  const { govtservice, govtserviceError } = useGetComplaintByvoterProblemId(id, user.accessToken);
  // console.log("govtservice", govtservice)

  const [govtserviceData, setgovtserviceData] = useState({});

  useEffect(() => {
    if (govtservice && govtservice.data) {
      setgovtserviceData(govtservice.data);
    }
  }, [govtservice]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${govtserviceError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.GovtService.list}
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
      <PostDetailsHero title="Desire List" coverUrl={BannerBlurImg} />

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
              name: 'Desire Details',
              href: paths.dashboard.GovtService.list,
            },
            {
              name: 'Details',
              href: paths.GovtService,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Name :</Typography>
              <Typography sx={{ ml: 1 }}>{govtserviceData?.name}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Problem Title :</Typography>
              <Typography sx={{ ml: 1 }}> {govtserviceData?.problemTitle}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Problem Description :</Typography>
              <Typography sx={{ ml: 1 }}> {govtserviceData?.problemDescription}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Mobile Number :</Typography>
              <Typography sx={{ ml: 1 }}> {govtserviceData?.mobileNumber}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email Id :</Typography>
              <Typography sx={{ ml: 1 }}> {govtserviceData?.email}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Address :</Typography>
              <Typography sx={{ ml: 1 }}> {govtserviceData?.address}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );
  return (
    <>
      {govtservice && renderPost}
      {govtserviceError && renderError}
    </>
  );
}
GovtServiceRoadmapDetails.propTypes = {
  id: PropTypes.string,
};
