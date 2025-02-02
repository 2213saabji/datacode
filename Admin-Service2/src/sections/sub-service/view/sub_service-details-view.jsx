/* eslint-disable no-shadow */
/* eslint-disable radix */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import {
  Stack,
  Button,
  Divider,
  Container,
  Typography,
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetService } from 'src/api/sub-service';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import DriverDetailsHero from '../sub-service-details-hero';

export default function SubServiceDetailsView({ id }) {
  const { subservice, subserviceError } = useGetService(id);
  console.log(subservice);
  
  const [subserviceData, setsubserviceData] = useState({});
  console.log(subserviceData);
  

 

  // Perform API call or further logic for submission

  useEffect(() => {
    if (subservice && subservice.data) {
      setsubserviceData(subservice.data);
    }
  }, [subservice]);

 

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${subserviceError?.message}`}
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

  const renderPost = subservice && (
    <>
      <DriverDetailsHero title="SUB SERVICE DETAILS" coverUrl={BannerBlurImg} />
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
              name: 'Sub Service',
              href: paths.dashboard.LMS_sub_service.root,
            },
            {
              name: 'Details',
              href: paths.LMS_sub_service,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
      <Stack sx={{ maxWidth: 720, mx: 'auto', p: 2, borderRadius: '8px', boxShadow: 3, bgcolor: '#fff' }}>
      <Stack direction="column" spacing={2}>
        <Stack direction="row" alignItems="start" spacing={2}>
          <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Service Number:</Typography>
          <Typography> {subserviceData.serviceId}</Typography>
        </Stack>
        <Stack direction="row" alignItems="start" spacing={2}>
          <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Issue Type:</Typography>
          <Typography> {subserviceData.issueType}</Typography>
        </Stack>
        <Stack direction="row" alignItems="start" spacing={2}>
          <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Issue Description:</Typography>
          <Typography> {subserviceData.issueDescription}</Typography>
        </Stack>
      </Stack>
      <Divider sx={{ my: 3 }} />
      
    </Stack>
      </Container>
    </>
  );
 
  return (
    <>
      {subserviceError && renderError}
      {subservice && renderPost}
      
    </>
  );
}

SubServiceDetailsView.propTypes = {
  id: PropTypes.string,
};
