/* eslint-disable no-plusplus */
import PropTypes from 'prop-types';
import { useState, useEffect ,useCallback} from 'react';

import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
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
  Dialog, DialogActions, DialogContent, DialogTitle, TextField  // chetan
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useGetServices } from 'src/api/service';
import { useGetSubServices } from 'src/api/sub-service';
import { useGetCharteredAccountant } from 'src/api/chartedAccountant';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';



// import BannerBlurImg from './assets/overlay_2.jpg';
// import DriverDetailsHero from '../chartedAccountant-details-hero';

// ----------------------------------------------------------------------




export default function ChartedAccountantDetailView({ id }) {
  const { chartedaccpunt, chartedaccpuntError } = useGetCharteredAccountant(id);
  const [driverData, setDriverData] = useState({});

  const [isFormOpen, setIsFormOpen] = useState(false); // chetan
const [isFormSubmitted, setIsFormSubmitted] = useState(false);

// const handleSendDocumentClick = () => {
//   setIsFormOpen(true);
// };  // chetan

const router = useRouter();
const handleViewCase = useCallback(() => {
  router.push({ pathname: paths.dashboard.LMS_document.create });
}, [router]);

const handleFormSubmit = () => {
  // Perform form submission logic here
  setIsFormSubmitted(true);
  setIsFormOpen(false);// chetan
};

const handleFormClose = () => {  // chetan
  setIsFormOpen(false);
};

  useEffect(() => {
    if (chartedaccpunt && chartedaccpunt.data) {
      setDriverData(chartedaccpunt.data);
    }
  }, [chartedaccpunt]);

  const { services: serviceList } = useGetServices();
  const ServiceListArr = serviceList?.data || [];
  const ServiceData = ServiceListArr.map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));
  const service = ServiceData.find((item) => item.value === driverData.serviceId);

  const { subservices: subserviceList } = useGetSubServices();
  const SubServiceListArr = subserviceList?.data || [];
  const SubServiceData = SubServiceListArr.map((list) => ({
    value: list.issueId,
    label: list.issueType,
  }));
  const subService = SubServiceData.find((item) => item.value === driverData.issueId);

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

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${chartedaccpuntError?.message}`}
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

  const renderPost = chartedaccpunt && (
    <>
      {/* <DriverDetailsHero title="CHARTED ACCOUNTANT DETAILS" coverUrl={BannerBlurImg} /> */}
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
              name: 'Charted Account',
              // href: paths.dashboard.chartered_accountant.root,
            },
            {
              name: 'Details',
              href: paths.chartered_accountant,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Stack
          sx={{
            maxWidth: 720,
            mx: 'auto',
            px: 2,
            py: 3,
            borderRadius: '8px',
            border: '1px solid #ddd',
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
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
                  <TableCell>{driverData.providerName}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Experience Level</TableCell>
                  <TableCell>{driverData.experienceLevel}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Registration Number</TableCell>
                  <TableCell>{driverData.registrationNumber}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Area</TableCell>
                  <TableCell>{driverData.serviceArea}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Type</TableCell>
                  <TableCell>{service?.label}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Sub Service Type</TableCell>
                  <TableCell>{subService?.label}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>License Certification</TableCell>
                  <TableCell>{driverData.licenseCertification}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Service Description</TableCell>
                  <TableCell>{driverData.serviceDescription}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>Rating</TableCell>
                  <TableCell>
                    <Stack direction="row" alignItems="center">
                      {renderStars(driverData.rating)}
                    </Stack>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          <Divider sx={{ my: 4 }} />
          {/* <Stack direction="row" alignItems="center" spacing={5}>
            <Button variant="contained" sx={{ alignSelf: 'center' }}>
              Send Document Details
            </Button>
            <Button variant="contained" sx={{ alignSelf: 'center' }}>
              Sign Contract
            </Button>
          </Stack> */}
           <Stack direction="row" alignItems="center" spacing={5}>
        <Button
          variant="contained"
          onClick={handleViewCase}
        >
          Send Case Details
        </Button>
        {/* <Button
          variant="contained"
          disabled={!isFormSubmitted}
        >
          Sign Contract
        </Button> */}
      </Stack>

      <Dialog open={isFormOpen} onClose={handleFormClose}>
        <DialogTitle>Send Document Details</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="document-details"
            label="Document Details"
            type="text"
            fullWidth
            variant="outlined"
          />
          {/* Add more form fields as needed */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleFormClose}>Cancel</Button>
          <Button onClick={handleFormSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {chartedaccpuntError && renderError}
      {chartedaccpunt && renderPost}
    </>
  );
}

ChartedAccountantDetailView.propTypes = {
  id: PropTypes.string,
};
