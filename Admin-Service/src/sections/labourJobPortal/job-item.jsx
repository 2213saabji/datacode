/* eslint-disable react/jsx-no-useless-fragment */
import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import { Box } from '@mui/system';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { Button, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';

import { useAuthContext } from 'src/auth/hooks';
import PhoneIcon from '@mui/icons-material/Phone';
// import { fCurrency } from 'src/utils/format-number';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { useCallback, useRef, useState } from 'react';
import { createConsumerRequest } from 'src/api/interestedConsumer';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function JobItem({ job, onView, onEdit, onDelete }) {
  const popover = usePopover();
  const { enqueueSnackbar } = useSnackbar();

  const { jobPostId, jobTitle, created_at, applicationDeadline, companyName, location, PostBy } = job;

  const { user } = useAuthContext();
  const btnRef = useRef(null)
  const [open, setOpen] = useState(false);
  // console.log('--->',params)
  const handleOpen = useCallback(async () => {
    setOpen(true)
    const updatedData = {
      sellerId: job?.userId,
      consumerId: user?.userId
    }
    try {
      const response = await createConsumerRequest(updatedData);
      if (response) {
        enqueueSnackbar('Your details have been shared with the employer', { variant: 'success' });
        // createNotifications(
        //   params?.row?.userId,
        //   `Viewer contact detail ${user?.phone ? user?.phone : user?.UserProfile?.firstName}`,
        //   `${params?.row?.type} Viewed by ${user?.UserProfile ? user?.UserProfile?.firstName : user?.email}`,
        //   '/dashboard/FarmerService'
        // );
        setOpen(true)
      } else {
        enqueueSnackbar('Failed to view contact', { variant: 'error' });

      }
    } catch (error) {
      console.error('Error viewing contact :', error);
      // enqueueSnackbar('An error occurred while viewing contact ', { variant: 'error' });
    }
  }, [user, job, enqueueSnackbar]);

  const handleClose = () => setOpen(false);
  const formatName = (User) => {
    const firstName = User?.UserProfile?.firstName || 'NA';
    const lastName = User?.UserProfile?.lastName || 'NA';
    return `${firstName} ${lastName}`.trim();
  }

  return (
    <>
      <Card>
        {user?.userRoleId === 1 || user?.userRoleId === 30 ? (
          <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        ) : (
          <></>
        )}

        <Stack sx={{ p: 3, pb: 2 }}>
          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <>
                <Link
                  component={RouterLink}
                  href={paths.dashboard.labour_job_portal.details(jobPostId)}
                  color="inherit"
                >
                  {jobTitle?.toUpperCase()}
                </Link>
                <Typography>{companyName}</Typography>
                <Typography>{location}</Typography>
                <Button
                  ref={btnRef}
                  onClick={handleOpen}
                  onMouseEnter={() => btnRef.current.transform('scale(1.5)')}
                  startIcon={<PhoneIcon sx={{ color: 'black', ml: 0.5 }} />}
                  sx={{
                    p: '0px 5px 0px 5px',
                    backgroundColor: '#fda92daa',
                    color: 'black',
                    // border: params?.row?.status ? '2px solid #acb5c0' : '2px solid green',
                    transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
                    borderRadius: '50px',
                    '&:hover': {
                      backgroundColor: '#31983155',
                    },
                    '&:active': {
                      transform: 'scale(1.1)',
                    },
                  }}
                >
                  Contact
                </Button>

                {/* Modal to show the employer details */}
                <Modal open={open}>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      width: 400,
                      bgcolor: 'background.paper',
                      // border: '2px solid #000',
                      borderRadius: 2,
                      boxShadow: 24,
                      p: 4,
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between" alignItems="center" mb={1}>
                      <Typography variant="h6">Employer Details</Typography>
                      <IconButton onClick={handleClose} sx={{ bgcolor: '#fda92daa', color: 'black' }}>
                        <CloseIcon />
                      </IconButton>
                    </Stack>

                    <Divider />
                    <Typography sx={{ mt: 2 }}>
                      {/* Display relevant seller details here */}
                      {/* Name: {PostBy?.UserProfile?.firstName || 'NA'} */}
                      Name: {formatName(PostBy) || 'NA'}
                      {/* Name: {} */}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      Email: {PostBy?.email || 'NA'}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                      Contact: {PostBy?.phone || 'NA'}
                    </Typography>
                  </Box>
                </Modal>
              </>
            }
            // secondary={`Posted date: ${fDate(createdAt)}`}
            secondary={`Posted date: ${fDate(created_at)} | Expiry date: ${fDate(applicationDeadline)}`} // Add expiry date here
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
          <Stack>
            {/* <Stack
            spacing={0.5}
            direction="row"
            alignItems="center"
            sx={{  typography: 'caption' }}
          >
            <Typography sx={{ color: 'primary.main',typography: 'caption' }}>Filled By</Typography>
            <Iconify width={16} icon="solar:users-group-rounded-bold" />
            {candidates.length} Candidates
          </Stack> */}
            {/* <Stack
           spacing={0.5}
           direction="row"
           alignItems="center"
           sx={{  typography: 'caption' }}>
            <Typography sx={{typography: 'caption' }}>Status:</Typography>
            {candidates.length}
             Open
          </Stack> */}
          </Stack>
        </Stack>
        <Divider sx={{ borderStyle: 'dashed' }} />
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onDelete();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

JobItem.propTypes = {
  job: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};
