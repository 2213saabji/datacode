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
import { useGetSingleDriverRequestList } from 'src/api/requestLicenseAcceptance';

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

export default function DriverDetailsView({ id }) {
  const { user } = useAuthContext();
  const [details, setdetails] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const { users, usersError } = useGetSingleDriverRequestList(id, user.accessToken);
  
  useEffect(() => {
    if (users?.data) {
      const filterdetail = users?.data?.find((item) => item.driverId.toString() === id);

      setdetails(filterdetail);
    }
  }, [id, users]);
  //   const renderSkeleton = <PostDetailsSkeleton />;
  const vehicle = details?.VehicleDetails?.[0] || {};

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
  const renderPost = details && (
    <>
      <DoctorDetailsToolbar
        backLink={paths.dashboard.request_license_acceptence.root}
        // editLink={paths.dashboard.blog.edit(`${users?.data?.blogId}`)}
      />
      <DoctorDetailsHero
        degreeImageDetails={details?.licenseNumberFrontImage?.preview}
        licenseImageDetails={details?.licenseNumberBackImage?.preview}
        view="Driver"
      />

      <Stack
        sx={{
          maxWidth: 720,
          mx: 'auto',
          mt: { xs: 5, md: 10 },
        }}
      >
        <Typography variant="h6">Driver Name:</Typography>
        <Typography>{details?.driverName}</Typography>

        <Markdown sx={{ mt: 1 }} children={details?.User?.phone} />
        <Markdown sx={{ mt: 1 }} children={details?.User?.email} />

        <Stack
          spacing={2}
          direction="row"
          alignItems="center"
          sx={{
            py: 1,
            borderTop: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        >
          <Typography variant="h6">Driver Id :</Typography>
          <Typography>{details?.driverId}</Typography>
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
          <Typography variant="h6">Account Type :</Typography>
          <Typography>{details?.accountType}</Typography>
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
          <Typography variant="h6">Driver Type :</Typography>
          <Typography>{details?.driverType}</Typography>
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
          <Typography variant="h6">License Expiration Date :</Typography>
          <Typography>{details?.licenseExpirationDate}</Typography>
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
          <Typography variant="h6">License Issuing State :</Typography>
          <Typography>{details?.licenseIssuingState}</Typography>
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
          <Typography variant="h6"> Payment Method :</Typography>
          <Typography>{details?.paymentMethod}</Typography>
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
          <Typography variant="h6">License Number :</Typography>
          <Typography>{details?.licenseNumber}</Typography>
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
          <Typography variant="h6">License Number :</Typography>
          <Typography>{details?.licenseNumber}</Typography>
        </Stack>
        {vehicle && Object.keys(vehicle).length > 0 && (
          <>
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
              <Typography variant="h6">Vehicle Type:</Typography>
              <Typography>{vehicle?.vehicleType}</Typography>
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
              <Typography variant="h6">Vehicle Name:</Typography>
              <Typography>{vehicle?.vehicleName}</Typography>
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
              <Typography variant="h6">Model:</Typography>
              <Typography>{vehicle?.model}</Typography>
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
              <Typography variant="h6">Year:</Typography>
              <Typography>{vehicle?.year}</Typography>
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
              <Typography variant="h6">Chassis Number:</Typography>
              <Typography>{vehicle?.chassisNumber}</Typography>
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
              <Typography variant="h6">Color:</Typography>
              <Typography>{vehicle?.color}</Typography>
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
              <Typography variant="h6">Manufacturing Year:</Typography>
              <Typography>{vehicle?.manufacturingYear}</Typography>
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
              <Typography variant="h6">Engine Number:</Typography>
              <Typography>{vehicle?.engineNumber}</Typography>
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
              <Typography variant="h6">Fuel Type:</Typography>
              <Typography>{vehicle?.fuelType}</Typography>
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
              <Typography variant="h6">Gross Vehicle Weight:</Typography>
              <Typography>{vehicle?.grossVehicleWeight}</Typography>
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
              <Typography variant="h6">Registration Number:</Typography>
              <Typography>{vehicle?.registrationNumber}</Typography>
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
              <Typography variant="h6">Insurance PDF:</Typography>
              <Typography>
                <a href={vehicle?.insurancePdf?.preview} target="_blank" rel="noopener noreferrer">
                  View Insurance PDF
                </a>
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
              <Typography variant="h6">Maintenance History:</Typography>
              <Typography>{vehicle?.maintenanceHistory}</Typography>
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
              <Typography variant="h6">Vehicle Condition:</Typography>
              <Typography>{vehicle?.vehicleCondition}</Typography>
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
              <Typography variant="h6">Availability:</Typography>
              <Typography>{vehicle?.availability ? 'Available' : 'Not Available'}</Typography>
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
              <Typography variant="h6">RC PDF:</Typography>
              <Typography>
                <a href={vehicle?.rcPdf?.preview} target="_blank" rel="noopener noreferrer">
                  View RC PDF
                </a>
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
              <Typography variant="h6">GPS Tracking:</Typography>
              <Typography>{vehicle?.gpsTracking ? 'Enabled' : 'Disabled'}</Typography>
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
              <Typography variant="h6">Vehicle Image:</Typography>
              <Typography>
                <img src={vehicle?.vehicleImageUrl?.preview} alt="Vehicle" />
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
              <Typography variant="h6">Insurance Expiry Date:</Typography>
              <Typography>{new Date(vehicle?.insuranceExpiryDate).toLocaleDateString()}</Typography>
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
              <Typography variant="h6">Additional Equipment:</Typography>
              <Typography>{vehicle?.additionalEquipment || 'None'}</Typography>
            </Stack>
          </>
        )}
      </Stack>
    </>
  );

  return (
    <Container maxWidth={false}>
      {/* {usersLoading && renderSkeleton} */}

      {usersError && renderError}

      {details && renderPost}
    </Container>
  );
}

DriverDetailsView.propTypes = {
  id: PropTypes.string,
};
