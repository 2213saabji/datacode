import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
// import Divider from '@mui/material/Divider';
// import Checkbox from '@mui/material/Checkbox';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { fShortenNumber } from 'src/utils/format-number';
import { useAuthContext } from 'src/auth/hooks';
import { useGetSingleDoctorRequestList } from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import Markdown from 'src/components/markdown';
import EmptyContent from 'src/components/empty-content';

import DoctorDetailsHero from './doctor-details-hero';
import DoctorDetailsToolbar from './doctor-details-toolbar';

// import PostDetailsHero from '../users-details-hero';
// import PostCommentList from '../users-comment-list';
// import PostCommentForm from '../users-comment-form';
// import { PostDetailsSkeleton } from '../users-skeleton';
// import PostDetailsToolbar from '../users-details-toolbar';

// ----------------------------------------------------------------------

export default function DoctorDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { users, usersLoading, usersError } = useGetSingleDoctorRequestList(id, user.accessToken);

  useEffect(() => {
    if (users) {
      const filterdetail = users?.data?.filter((item) => item.doctorId.toString() === id);
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
      <DoctorDetailsToolbar
        backLink={paths.dashboard.request_license_acceptence.root}
        // editLink={paths.dashboard.blog.edit(`${users?.data?.blogId}`)}
      />
      <DoctorDetailsHero
        degreeImageDetails={details[0]?.degreeCertificate?.front?.preview}
        licenseImageDetails={details[0]?.licenseImageUrl?.front?.preview}
        view="Doctor"
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h6">Doctor Name:</Typography>
        <Typography>{details?.doctorName}</Typography>

        <Markdown sx={{ mt: 1 }} children={details[0]?.phoneNumber} />
        <Markdown sx={{ mt: 1 }} children={details[0]?.workEmailId} />

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Doctor Id :</Typography>
          <Typography>{details[0]?.doctorDetailsId}</Typography>
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
          <Typography variant="h6">Degree :</Typography>
          <Typography>{details[0]?.degree}</Typography>
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
          <Typography variant="h6">Specialization :</Typography>
          <Typography>{details[0]?.specialization}</Typography>
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
          <Typography variant="h6">Hospital Name :</Typography>
          <Typography>{details[0]?.hospitalName}</Typography>
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
          <Typography variant="h6">Hospital Address :</Typography>
          <Typography>{details[0]?.hospitalAddress}</Typography>
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
          <Typography variant="h6">Hospital Phone Number :</Typography>
          <Typography>{details[0]?.hospitalPhoneNumber}</Typography>
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
          <Typography variant="h6">Start Time :</Typography>
          <Typography>{details[0]?.startTime}</Typography>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography variant="h6">End Time :</Typography>
            <Typography>{details[0]?.endTime}</Typography>
          </Stack>
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
          <Typography variant="h6">Experience :</Typography>
          <Typography>{details[0]?.experienceLevel}</Typography>
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
          <Typography variant="h6">License Number :</Typography>
          <Typography>{details[0]?.licenseNumber}</Typography>
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

DoctorDetailsView.propTypes = {
  id: PropTypes.string,
};
