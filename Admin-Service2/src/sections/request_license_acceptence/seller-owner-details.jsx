/* eslint-disable no-nested-ternary */
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
import { useGetSingleSellerOwnerRequestList } from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';

import DoctorDetailsToolbar from './doctor-details-toolbar';

// ----------------------------------------------------------------------

export default function SellerOwnerDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { users, usersLoading, usersError } = useGetSingleSellerOwnerRequestList(
    id,
    user.accessToken
  );
  useEffect(() => {
    if (users) {
      const filterdetail = users?.data?.filter((item) => item.sellerOwnerId.toString() === id);
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

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">First Name :</Typography>
          <Typography>{details[0]?.sellerOwnerfirstName}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Last Name :</Typography>
          <Typography>{details[0]?.sellerOwnerlastName}</Typography>
        </Stack>
        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Contact Number :</Typography>
          <Typography>{details[0]?.sellerOwnercontactNumber}</Typography>
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
          <Typography variant="h6">Email Id :</Typography>
          <Typography>{details[0]?.sellerOwneremail}</Typography>
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
          <Typography variant="h6">Approval Status :</Typography>
          <Typography>
            {details[0]?.approvalStatus === 0
              ? 'pending'
              : details[0]?.approvalStatus === -1
                ? 'Rejected'
                : details[0]?.approvalStatus === 1
                  ? 'Success'
                  : ''}
          </Typography>
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
          <Typography variant="h6">Address :</Typography>
          <Typography>{details[0]?.sellerOwneraddress}</Typography>
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

SellerOwnerDetailsView.propTypes = {
  id: PropTypes.string,
};
