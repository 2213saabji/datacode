/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable radix */
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import {
  Stack,
  Table,
  Paper,
  Button,
  Avatar,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  Typography,
  TableContainer,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useGetLawyer } from 'src/api/lawyer';
import { useGetServices } from 'src/api/service';
import { useGetSubServices } from 'src/api/sub-service';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../lawyer-details-hero';

export default function LawyerDetailsView({ id }) {
  useEffect(() => {
    sessionStorage.setItem('providerId', id);
  }, [id]);

  const router = useRouter();
  const { lawyer, lawyerError } = useGetLawyer(id);
  const [lawyerData, setLawyerData] = useState({});

  const handleViewCase = useCallback(() => {
    router.push({ pathname: paths.dashboard.LMS_document.create });
  }, [router]);

  // const handleViewContract = useCallback(() => {
  //   router.push(paths.dashboard.LMS_contract.create);
  // }, [router]);

  useEffect(() => {
    if (lawyer && lawyer.data) {
      setLawyerData(lawyer.data);
    }
  }, [lawyer]);

  const renderStars = (rating) => {
    const totalStars = 5;
    const stars = [];
    for (let i = 1; i <= totalStars; i++) {
      stars.push(
        i <= rating / 2 ? (
          <StarIcon key={i} style={{ color: 'gold' }} />
        ) : (
          <StarBorderIcon key={i} style={{ color: 'gold' }} />
        )
      );
    }
    return stars;
  };

  const { services: serviceList } = useGetServices();
  const ServiceListArr = serviceList?.data || [];
  const ServiceData = ServiceListArr.map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));
  const service = ServiceData.find((service) => service.value === lawyerData.serviceId);

  const { subservices: subserviceList } = useGetSubServices();
  const SubServiceListArr = subserviceList?.data || [];
  const SubServiceData = SubServiceListArr.map((list) => ({
    value: list.issueId,
    label: list.issueType,
  }));
  const subService = SubServiceData.find((subService) => subService.value === lawyerData.issueId);
  const [caseAccepted, setCaseAccepted] = useState(false);

  const renderError = (
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

  const renderPost = lawyer && (
    <>
      {/* <DriverDetailsHero title="LAWYER DETAILS" coverUrl={BannerBlurImg} /> */}
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
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
              name: 'Lawyer',
              // href: paths.dashboard.lawyer.root,
            },
            {
              name: 'Details',
              href: paths.Lawyer,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }} spacing={3}>
          <Stack direction="column" alignItems="flex-start" sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Lawyer Information
            </Typography>
            <TableContainer component={Paper}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Attribute</TableCell>
                    <TableCell>Details</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>Full Name</TableCell>
                    <TableCell>{lawyerData.providerName}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Experience Level</TableCell>
                    <TableCell>{lawyerData.experienceLevel}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Areas</TableCell>
                    <TableCell>{service?.label}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Work Areas</TableCell>
                    <TableCell>{subService?.label}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Registration Number</TableCell>
                    <TableCell>{lawyerData.registrationNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Area</TableCell>
                    <TableCell>{lawyerData.serviceArea}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>License Certification</TableCell>
                    <TableCell>{lawyerData.licenseCertification}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Service Description</TableCell>
                    <TableCell>{lawyerData.serviceDescription}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Rating</TableCell>
                    <TableCell>
                      <Stack direction="row" alignItems="center">
                        {renderStars(lawyerData.rating)}
                      </Stack>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>Image</TableCell>
                    <TableCell>
                      <Avatar
                        src={lawyerData?.registrationImageUrl?.preview}
                        sx={{ width: 100, height: 100, borderRadius: '8px' }}
                      />
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Stack>

          <Divider sx={{ my: 5 }} />
          <Stack direction="row" alignItems="center" spacing={5}>
            <Button variant="contained" sx={{ alignSelf: 'center' }} onClick={handleViewCase}>
              Send Case Details
            </Button>
            {/* <Button
              variant="contained"
              sx={{ alignSelf: 'center' }}
              onClick={handleViewContract}
              disabled={!caseAccepted} // Disable if case is not accepted
            >
              Sign Contract
            </Button> */}
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {lawyerError && renderError}
      {lawyer && renderPost}
    </>
  );
}

LawyerDetailsView.propTypes = {
  id: PropTypes.string.isRequired,
};
