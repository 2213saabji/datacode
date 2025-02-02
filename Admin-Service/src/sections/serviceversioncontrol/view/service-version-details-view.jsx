import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { useGetCandidate } from 'src/api/candidate';
import { useGetService } from 'src/api/vms';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import CandidateDetailsHero from '../service-version-details-hero';

// ----------------------------------------------------------------------

export default function ServiceVersionDetailsView({ id }) {
  // const { candidate, candidateError } = useGetCandidate(id);
  // const [candidateData, setCandidateData] = useState({});
  // const [candidateProfile, setCandidateProfile] = useState({});

  const { versions, versionsError } = useGetService(id);
  const [versionData, setVersionData] = useState({});
  // const [serviceVersionData, setServiceVersionData] = useState({});

  // useEffect(() => {
  //   if (candidate && candidate.data) {
  //     setCandidateData(candidate.data);
  //     setCandidateProfile(candidate.data.User);
  //   }
  // }, [candidate]);

  useEffect(() => {
    if (versions && versions.data) {
      setVersionData(versions.data);
      // setServiceVersionData(versions.data.User);
      // console.log("versions-> ", versions)
    }
  }, [versions]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${versionsError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.serviceversion}
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

  const renderPost = versions && (
    <>
      <CandidateDetailsHero title="Service version Details" coverUrl={BannerBlurImg} />

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
              name: 'Service',
              href: paths.dashboard.serviceversion.root,
            },
            {
              name: 'Details',
              href: paths.serviceversion,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Service Name:</Typography>
              <Typography sx={{ ml: 1 }}> {versionData.serviceName}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                {/* <Typography sx={{ ml: 1 }}> {versionData.status}</Typography> */}
                {/* {versionData.status === 'Active' ?  <Label color="success">Active</Label> :  <Label color="error">Inactive</Label>} */}
                <Label color="success">{versionData.status}</Label>
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Service Owner:</Typography>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography sx={{ ml: 1 }}> {versionData.serviceOwner}</Typography>
                {/* {candidateProfile.isEmailVerified ?  <Label color="success">Verified</Label> :  <Label color="error">Not Verified</Label> } */}
              </Stack>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Testing results:</Typography>
              <Typography sx={{ ml: 1 }}> {versionData.testingResults}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {versionsError && renderError}

      {versions && renderPost}
    </>
  );
}
ServiceVersionDetailsView.propTypes = {
  id: PropTypes.string,
};
