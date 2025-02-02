/* eslint-disable no-shadow */
/* eslint-disable radix */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  Stack,
  Table,
  Paper,
  Button,
  Divider,
  TableRow,
  Container,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/service';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import DriverDetailsHero from '../service-details-hero';

export default function ServiceDetailsView({ id }) {
  const { service, serviceError } = useGetService(id);
  const [serviceData, setserviceData] = useState({});

  console.log(service);

  useEffect(() => {
    if (service && service.data) {
      setserviceData(service.data);
    }
  }, [service]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${serviceError?.message}`}
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

  const renderPost = service && (
    <>
      <DriverDetailsHero title="SERVICE DETAILS" coverUrl={BannerBlurImg} />
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
              name: 'Service',
              href: paths.dashboard.LMS_service.root,
            },
            {
              name: 'Details',
              href: paths.service,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 3 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ fontWeight: 'bold', minWidth: 180 }}>Service Name</TableCell>
                  <TableCell sx={{ fontWeight: 'bold' }}>Service</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>Full Name:</TableCell>
                  <TableCell>{serviceData.serviceName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Number:</TableCell>
                  <TableCell>{serviceData.serviceId}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Description:</TableCell>
                  <TableCell>{serviceData.serviceDescription}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {serviceError && renderError}
      {service && renderPost}
    </>
  );
}

ServiceDetailsView.propTypes = {
  id: PropTypes.string,
};
