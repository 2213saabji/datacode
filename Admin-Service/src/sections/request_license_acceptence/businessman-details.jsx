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
import { useGetSingleBusinessmanRequestList } from 'src/api/requestLicenseAcceptance';

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

export default function BusinessmanDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);

  // eslint-disable-next-line no-unused-vars
  const { users, usersLoading, usersError } = useGetSingleBusinessmanRequestList(
    id,
    user.accessToken
  );

  useEffect(() => {
    if (users) {
      const filterdetail = users?.data?.filter((item) => item?.businessmanId.toString() === id);
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
        degreeImageDetails={details[0]?.licenseImageUrl?.front?.preview}
        licenseImageDetails={details[0]?.licenseImageUrl?.back?.preview}
        view="Employer"
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h6">Businessman Name:</Typography>
        <Typography>{details[0]?.businessmanName}</Typography>

        <Markdown sx={{ mt: 1 }} children={details[0]?.phoneNumber} />
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
          <Typography variant="h6">Businessman Id :</Typography>
          <Typography>{details[0]?.businessmanId}</Typography>
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

BusinessmanDetailsView.propTypes = {
  id: PropTypes.string,
};
