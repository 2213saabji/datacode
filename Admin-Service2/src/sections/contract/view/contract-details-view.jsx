import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Stack, Avatar, Button, Container, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetContract } from 'src/api/contract';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../contract-details-hero';

export default function ContractDetailsView({ id }) {
  const { user } = useAuthContext();
  console.log('User: ', user);
  const { lawyer, lawyerError } = useGetContract(id);
  const [lawyerData, setLawyerData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (lawyer) {
      setLawyerData(lawyer.data);
      setLoading(false);
    }
  }, [lawyer]);

  if (lawyerError) {
    return (
      <Container sx={{ my: 10 }}>
        <EmptyContent
          filled
          title={`${lawyerError?.message}`}
          action={
            <Button
              component={RouterLink}
              href={paths.driver}
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
  }

  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const renderBackButton = () => {
    if (user?.userRoleType === 'Admin') {
      return (
        <Stack sx={{ maxWidth: 720, mx: 'auto', mt: 3 }}>
          <Button
            component={RouterLink}
            href={paths.dashboard.LMS_contract.list}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        </Stack>
      );
    }

    if (
      user?.userRoleType === 'Voter' ||
      user?.userRoleType === 'LMS Client' ||
      user?.userRoleType === 'Lawyer' ||
      user?.userRoleType === 'LMS CA'
    ) {
      return (
        <Stack sx={{ maxWidth: 720, mx: 'auto', mt: 3 }}>
          {/* <Button
            component={RouterLink}
            href={paths.dashboard.LMS_case.list}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back
          </Button> */}
        </Stack>
      );
    }

    return null; // Return null if the role is neither "voter" nor "lawyer".
  };

  const renderPost = (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
      {/* <DriverDetailsHero title="CONTRACT DETAILS" coverUrl={BannerBlurImg} /> */}
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
              name: 'Contract',
              href: paths.dashboard.LMS_contract.root,
            },
            {
              name: 'Details',
              href: paths.LMS_contract,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      {/* Render buttons based on user role */}
      {renderBackButton()}

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto', p: 2, borderRadius: 2, boxShadow: 1 }}>
          <Stack
            direction="column"
            alignItems="start"
            sx={{ border: '1px solid #ddd', borderRadius: 2, p: 2 }}
          >
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Start Date:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.startDate || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>End Date:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.endDate || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.status || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Payment Amount:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.paymentAmount || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contract Type:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.contractType || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Contract Description:</Typography>
              <Typography sx={{ ml: 1 }}>{lawyerData?.contractDescription || 'N/A'}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
              <Avatar
                src={lawyerData?.registrationImageUrl?.preview || ''}
                sx={{ width: 100, height: 100, borderRadius: '8px' }}
              />
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return <>{renderPost}</>;
}

ContractDetailsView.propTypes = {
  id: PropTypes.string.isRequired,
  user: PropTypes.shape({
    userRoleType: PropTypes.string.isRequired,
  }).isRequired,
};
