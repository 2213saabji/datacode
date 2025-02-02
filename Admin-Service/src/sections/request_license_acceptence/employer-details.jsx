import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetSingleEmployerRequestList } from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';

import DoctorDetailsHero from './doctor-details-hero';
import DoctorDetailsToolbar from './doctor-details-toolbar';

// ----------------------------------------------------------------------

export default function EmployerDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { users, usersLoading, usersError } = useGetSingleEmployerRequestList(id, user.accessToken);

  useEffect(() => {
    if (users) {
      const filterdetail = users?.data?.filter((item) => item.employerId.toString() === id);
      setdetails(filterdetail);
    }
  }, [id, users]);

  //   const renderSkeleton = <PostDetailsSkeleton />;
  const renderError = (
    <EmptyContent
      filled
      title={`${usersError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.dashboard.request_license_acceptence.root}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{
        py: 20,
      }}
    />
  );
  const renderPost = details && details.length > 0 && (
    <>
      <DoctorDetailsToolbar backLink={paths.dashboard.request_license_acceptence.root} />
      <DoctorDetailsHero
        degreeImageDetails={details[0]?.registrationImageUrl?.front?.preview}
        licenseImageDetails={details[0]?.registrationImageUrl?.back?.preview}
        view="Employer"
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h6">Employer Name:</Typography>
        <Typography>{details[0]?.employerName}</Typography>

        <Markdown sx={{ mt: 1 }} children={details[0]?.contactNumber} />
        <Markdown sx={{ mt: 1 }} children={details[0]?.emailId} />

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Employer Id :</Typography>
          <Typography>{details[0]?.employerDetailsId}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            // borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Business Name :</Typography>
          <Typography>{details[0]?.businessName}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            // borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Business Address :</Typography>
          <Typography>{details[0]?.businessAddress}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            // borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Business Phone Number :</Typography>
          <Typography>{details[0]?.businessPhoneNumber}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            // borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Registration Number :</Typography>
          <Typography>{details[0]?.registrationNumber}</Typography>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {/* {usersLoading && renderSkeleton} */}

      {usersError && renderError}

      {details && details.length > 0 && renderPost}
    </Container>
  );
}

EmployerDetailsView.propTypes = {
  id: PropTypes.string,
};
