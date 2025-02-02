import * as Yup from 'yup';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, Controller } from 'react-hook-form';

import Link from '@mui/material/Link';
import { Box, Stack } from '@mui/system';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { Modal, Button, CardHeader } from '@mui/material';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export function RenderCellDoctorDetailsId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.doctorDetailsId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDoctorDetailsId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellDoctorName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.doctorName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDoctorName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellHospitalName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.hospitalName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellHospitalName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellLicenseNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.licenseNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellLicenseNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Employer functions--------------------------------

export function RenderCellEmployerId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.employerDetailsId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEmployerId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellEmployerName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.employerName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEmployerName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellBusinessName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.businessName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBusinessName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellRegistrationNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.registrationNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellRegistrationNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Businessman functions-----------------------
export function RenderCellBusinessmanId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.businessmanId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBusinessmanId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellBusinessmanName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.businessmanName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBusinessmanName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Lawyer cells functions-----------------------

export function RenderCellLawyerId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.lawyerId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellLawyerId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellLawyerName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.lawyerName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellLawyerName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellBarMembershipStatus({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.barMembershipStatus}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellBarMembershipStatus.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};


export function RenderCellLawyerCertificate({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.lawyerCertificate}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellLawyerCertificate.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Institute Owner functions-----------------------

export function RenderCellInstitutionOwnerId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.institutionOwnerId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellInstitutionOwnerId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellInstitutionOwnerName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.instituteOwnerFirstName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellInstitutionOwnerName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellEmailName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.email}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellEmailName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellContactNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.contactNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellContactNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Seller Owner functions-----------------------

export function RenderCellSellerOwnerId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.sellerOwnerId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSellerOwnerId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSellerOwnerName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.sellerOwnerfirstName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSellerOwnerName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSellerOwnerEmailName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.sellerOwneremail}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSellerOwnerEmailName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellSellerOwnerContactNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.sellerOwnercontactNumber}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellSellerOwnerContactNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------Driver details functions-----------------------

export function RenderCellDriverId({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.driverId}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDriverId.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellDriverName({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.driverName}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellDriverName.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

export function RenderCellPhoneNumber({ params }) {
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params?.row?.User?.phone}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellPhoneNumber.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
};

// ------------------------verification dynamic functions-----------------------

export function RenderCellVerificationButton({
  params,
  currentTab,
  handleVerifyDoctorDetails,
  handleVerifyEmployerDetails,
  handleVerifyBusinessmanDetails,
  handleVerifyInstituteOwnerDetails,
  handleVerifySellerOwnerDetails,
  handleVerifyDriverDetails,
  handleVerifyLawyerDetails,
}) {
  const verifyRequestCaller = () => {
    if (currentTab === 'doctor') {
      handleVerifyDoctorDetails(params.row.licenseNumber);
    } else if (currentTab === 'employer') {
      handleVerifyEmployerDetails(params.row.registrationNumber);
    } else if (currentTab === 'businessman') {
      handleVerifyBusinessmanDetails(params.row.licenseNumber);
    } else if (currentTab === 'instituteOwner') {
      handleVerifyInstituteOwnerDetails(params.row.contactNumber);
    } else if (currentTab === 'agricultureSellerOwner') {
      handleVerifySellerOwnerDetails(params.row.sellerOwnercontactNumber);
    } else if (currentTab === 'driver') {
      handleVerifyDriverDetails(params.row.driverId);
    } else if (currentTab === 'lawyer') {
      handleVerifyLawyerDetails(params.row.lawyerCertificate);
    }
  };
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params.row.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          {params.row.approvalStatus ? (
            <Button
              sx={{
                p: '0px 5px 0px 5px',
                color: '#ffb02e',
                border: '2px solid #acb5c0',
                whiteSpace: 'nowrap',
                minWidth: '80px',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#ffb02e55',
                },
                '&:active': {
                  transform: 'scale(1.1)',
                },
              }}
              disabled
            >
              Verified
            </Button>
          ) : (
            <Button
              sx={{
                p: '0px 5px 0px 5px',
                color: 'green',
                border: '2px solid green',
                whiteSpace: 'nowrap',
                minWidth: '80px',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#31983155',
                },
                '&:active': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={verifyRequestCaller}
            >
              Verify User
            </Button>
          )}
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellVerificationButton.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  handleVerifyDoctorDetails: PropTypes.func,
  handleVerifyEmployerDetails: PropTypes.func,
  handleVerifyBusinessmanDetails: PropTypes.func,
  handleVerifyInstituteOwnerDetails: PropTypes.func,
  handleVerifySellerOwnerDetails: PropTypes.func,
  handleVerifyDriverDetails: PropTypes.func,
  handleVerifyLawyerDetails: PropTypes.func,
  currentTab: PropTypes.string,
};

export function RenderCellAcceptRequestButton({
  params,
  currentTab,
  handleAcceptDoctorDetails,
  handleAcceptEmployerDetails,
  handleAcceptBusinessmanDetails,
  handleAcceptInstituteOwnerDetails,
  handleAcceptSellerOwnerDetails,
  handleAcceptDriverDetails,
  handleDoctorRejectRequest,
  handleBusinessmanRejectRequest,
  handleEmployerRejectRequest,
  handleInstituteOwnerRejectRequest,
  handleSellerOwnerRejectRequest,
  handleDriverRejectRequest,
  handleAcceptLawyerDetails,
  handleRejectLawyerRequest,
}) {
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [openRejectPopup, setOpenRejectPopup] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const handleCloseRejectPopup = () => setOpenRejectPopup(false);
  const handleOpenRejectPopup = () => setOpenRejectPopup(true);
  const otpSchema = Yup.object().shape({
    verificationId: Yup.string().required('Required'),
  });

  const otpMethods = useForm({
    defaultValues: {
      verificationId: '',
    },
    resolver: yupResolver(otpSchema),
  });

  const { handleSubmit: handleSubmitOtp, control } = otpMethods;

  const onSubmitOtp = handleSubmitOtp(async (data) => {
    try {
      if (currentTab === 'doctor') {
        handleAcceptDoctorDetails(
          params?.row?.doctorId,
          params?.row?.licenseNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'employer') {
        handleAcceptEmployerDetails(
          params?.row?.employerId,
          params?.row?.registrationNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'businessman') {
        handleAcceptBusinessmanDetails(
          params?.row?.userId,
          params?.row?.licenseNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'instituteOwner') {
        handleAcceptInstituteOwnerDetails(
          params?.row?.userId,
          params?.row?.contactNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'agricultureSellerOwner') {
        handleAcceptSellerOwnerDetails(
          params?.row?.userId,
          params?.row?.sellerOwnercontactNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'driver') {
        handleAcceptDriverDetails(
          params?.row?.userId,
          params?.row?.licenseNumber,
          data?.verificationId
        );
        handleClose();
      } else if (currentTab === 'lawyer') {
        handleAcceptLawyerDetails(
          params?.row?.userId,
          params?.row?.lawyerCertificate,
          params?.row?.barMembershipStatus,
          data?.verificationId
        );
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Failed to verify OTP.', { variant: 'error' });
    }
  });

  function RejectRequestFunction(row) {
    if (currentTab === 'doctor') {
      handleDoctorRejectRequest(row?.doctorDetailsId);
      handleCloseRejectPopup();
    } else if (currentTab === 'employer') {
      handleEmployerRejectRequest(row?.employerDetailsId);
      handleCloseRejectPopup();
    } else if (currentTab === 'businessman') {
      handleBusinessmanRejectRequest(row?.businessmanId);
      handleCloseRejectPopup();
    } else if (currentTab === 'instituteOwner') {
      handleInstituteOwnerRejectRequest(row?.institutionOwnerId);
      handleCloseRejectPopup();
    } else if (currentTab === 'agricultureSellerOwner') {
      handleSellerOwnerRejectRequest(row?.sellerOwnerId);
      handleCloseRejectPopup();
    } else if (currentTab === 'driver') {
      handleDriverRejectRequest(row?.driverId);
      handleCloseRejectPopup();
    } else if (currentTab === 'lawyer') {
      handleRejectLawyerRequest(row?.lawyerId);
      handleCloseRejectPopup();
    }
  }
  return (
    <ListItemText
      disableTypography
      primary={
        <Link
          noWrap
          color="inherit"
          variant="subtitle2"
          onClick={params?.row?.onViewRow}
          sx={{ cursor: 'pointer' }}
        >
          <Stack direction="column" spacing="5px">
            <Button
              sx={{
                p: '0px 5px 0px 5px',
                color: 'green',
                border: params?.row?.approvalStatus ? '2px solid #acb5c0' : '2px solid green',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#31983155',
                },
                '&:active': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={handleOpen}
              disabled={params?.row?.approvalStatus}
            >
              Accept
            </Button>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: '20px',
                  border: '2px solid #000',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <FormProvider methods={otpMethods} onSubmit={onSubmitOtp}>
                  <Typography variant="body2">
                    Enter your Verification Id For Update Account
                  </Typography>
                  <Controller
                    name="verificationId"
                    control={control}
                    render={({ field }) => (
                      <RHFTextField
                        {...field}
                        label="Verification Id"
                        variant="outlined"
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                  <Box mt={5}>
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </Box>
                </FormProvider>
              </Box>
            </Modal>
            <Button
              sx={{
                p: '0px 5px 0px 5px',
                color: 'red',
                border: params?.row?.approvalStatus ? '2px solid #acb5c0' : '2px solid red',
                transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                borderRadius: '50px',
                '&:hover': {
                  backgroundColor: '#ff0b0b55',
                },
                '&:active': {
                  transform: 'scale(1.1)',
                },
              }}
              onClick={handleOpenRejectPopup}
              disabled={params?.row?.approvalStatus}
            >
              Reject
            </Button>
            <Modal
              open={openRejectPopup}
              onClose={handleCloseRejectPopup}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  maxWidth: '600px',
                  maxHeight: '100%',
                  overflowY: 'auto',
                  bgcolor: 'background.paper',
                  borderRadius: '20px',
                  boxShadow: 24,
                  p: 4,
                }}
              >
                <CardHeader title="ARE YOU SURE TO REJECT THIS REQUEST" />
                <Stack direction="row" gap="10px" mt={5} ml={2}>
                  <Button
                    onClick={() => {
                      RejectRequestFunction(params.row);
                    }}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Reject
                  </Button>
                  <Button
                    onClick={handleCloseRejectPopup}
                    type="submit"
                    variant="contained"
                    color="primary"
                  >
                    Close
                  </Button>
                </Stack>
              </Box>
            </Modal>
          </Stack>
        </Link>
      }
      sx={{ display: 'flex', flexDirection: 'column' }}
    />
  );
}

RenderCellAcceptRequestButton.propTypes = {
  params: PropTypes.shape({
    row: PropTypes.object,
  }),
  currentTab: PropTypes.string,
  handleAcceptDoctorDetails: PropTypes.func,
  handleDoctorRejectRequest: PropTypes.func,
  handleAcceptEmployerDetails: PropTypes.func,
  handleEmployerRejectRequest: PropTypes.func,
  handleAcceptBusinessmanDetails: PropTypes.func,
  handleBusinessmanRejectRequest: PropTypes.func,
  handleAcceptInstituteOwnerDetails: PropTypes.func,
  handleInstituteOwnerRejectRequest: PropTypes.func,
  handleAcceptSellerOwnerDetails: PropTypes.func,
  handleSellerOwnerRejectRequest: PropTypes.func,
  handleAcceptDriverDetails: PropTypes.func,
  handleDriverRejectRequest: PropTypes.func,
  handleLawyerRejectRequest: PropTypes.func,
  handleAcceptVendorDetails: PropTypes.func,
  handleVendorRejectRequest: PropTypes.func,
  handleDeleteRow: PropTypes.func,
  handleEmployerDeleteRow: PropTypes.func,
  handleBusinessmanDeleteRow: PropTypes.func,
  handleAcceptLawyerDetails: PropTypes.func,
  handleRejectLawyerRequest: PropTypes.func,
};
