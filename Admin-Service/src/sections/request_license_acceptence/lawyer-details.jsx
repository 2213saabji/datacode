import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { format } from 'date-fns';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import { useGetSingleLawyerDetails } from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';

import DoctorDetailsHero from './doctor-details-hero';
import DoctorDetailsToolbar from './doctor-details-toolbar';

// ----------------------------------------------------------------------

export default function LawyerDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { users, usersError } = useGetSingleLawyerDetails(id, user.accessToken);
  useEffect(() => {
    if (users) {
      const filterdetail = users?.data?.filter((item) => item.lawyerId.toString() === id);
      setdetails(filterdetail);
    }
  }, [id, users]);

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
        degreeImageDetails={details[0]?.lawyerCertificateImageUrl?.preview}
        view="Lawyer"
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h6">Name:</Typography>
        <Typography>{details[0]?.lawyerName}</Typography>

        <Markdown sx={{ mt: 1 }} children={details[0]?.User?.phone} />
        <Markdown sx={{ mt: 1 }} children={details[0]?.User?.email} />

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Lawyer Id :</Typography>
          <Typography>{details[0]?.lawyerId}</Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Bar Association Membership :</Typography>
          <Typography>{details[0]?.barAssociationMembership}</Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Registration Date :</Typography>
          <Typography>
            {details[0]?.registrationDate
              ? format(new Date(details[0].registrationDate), 'dd/MM/yyyy')
              : 'N/A'}
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Bar Membership Status :</Typography>
          <Typography
            sx={{
              color:
                (details[0]?.barMembershipStatus === 'Active' && 'green') ||
                (details[0]?.barMembershipStatus === 'Inactive' && 'orange') ||
                (details[0]?.barMembershipStatus === 'Suspended' && 'red') ||
                'gray',
            }}
          >
            {details[0]?.barMembershipStatus || 'Unknown Status'}
          </Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Lawyer Certificate :</Typography>
          <Typography>{details[0]?.lawyerCertificate}</Typography>
        </Stack>

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Service Description :</Typography>
          <Typography>{details[0]?.serviceDescription}</Typography>
        </Stack>
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {usersError && renderError}

      {details && details.length > 0 && renderPost}
    </Container>
  );
}

LawyerDetailsView.propTypes = {
  id: PropTypes.string,
};
