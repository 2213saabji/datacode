import { useState, useCallback } from 'react';
// import { BsArrowLeft, BsPencil, BsCheck2 } from "react-icons/bs";

import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Stack from '@mui/material/Stack';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import Select from '@mui/material/Select';
// import Button from '@mui/material/Button';
// import { TextField } from "@mui/material";
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Backdrop from '@mui/material/Backdrop';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import Badge, { badgeClasses } from '@mui/material/Badge';

// import { UseMockedUser } from 'src/hooks/use-mocked-user';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

const style = {
  position: 'absolute',
  margin: 'auto',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: '#fff',
  border: '1px solid gray',
  boxShadow: 24,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  textAlign: 'center',
  p: 6,
};

// ----------------------------------------------------------------------

// const useStyles = (theme) => ({
//   root: {
//     width: "100%",
//     height: "100%",
//   },
//   header: {
//     display: "flex",
//     alignItems: "center",
//     backgroundColor: "#008069",
//     color: "white",
//     paddingTop: theme.spacing(16),
//     paddingLeft: theme.spacing(10),
//     paddingRight: theme.spacing(10),
//     paddingBottom: theme.spacing(5),
//     "& .icon": {
//       cursor: "pointer",
//       fontSize: "2rem",
//       fontWeight: "bold",
//     },
//   },
//   content: {
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//     marginTop: theme.spacing(12),
//     "& .avatar": {
//       width: "15vw",
//       height: "15vh",
//       cursor: "pointer",
//     },
//   },
//   username: {
//     backgroundColor: "white",
//     padding: theme.spacing(3),
//     "& .editIcon": {
//       cursor: "pointer",
//     },
//     "& .textField": {
//       width: "80%",
//       borderBottom: "2px solid #007BFF",
//     },
//   },
//   description: {
//     backgroundColor: "white",
//     padding: theme.spacing(3),
//     marginTop: theme.spacing(5),
//   },
// });
export default function ChatNavAccount() {
  //  const { user: roleList } = useGetUser()
  const { user } = useAuthContext();
  const imageDetails = user?.UserProfile?.userProfileImageDetails?.preview;

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // const [username, setUsername] = useState(user?.userName)
  // const [isEditing, setIsEditing] = useState(false);

  // const handleEditToggle = () => {
  //   setIsEditing(!isEditing);
  // };

  // const handleUsernameChange = (e) => {
  //   setUsername(e.target.value);
  // };

  // const handleUpdate = () => {
  //   // handle update logic
  //   handleEditToggle();
  // };

  const popover = usePopover();

  const [status, setStatus] = useState('online');

  const handleChangeStatus = useCallback((event) => {
    setStatus(event.target.value);
  }, []);

  return (
    <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade
          in={open}
          style={{
            // Add your color here
            backgroundColor: '#fff',
            // backgroundColor: '#212b36',
            border: '2px solid #333',
            borderRadius: '8px',
            padding: '20px',
          }}
        >
          <Box sx={style}>
            <Avatar
              src={imageDetails}
              alt={user?.userName}
              onClick={popover.onOpen}
              sx={{ cursor: 'pointer', width: 95, height: 95 }}
            >
              {user?.UserProfile?.firstName?.charAt(0).toUpperCase()}
            </Avatar>
            <ListItemText
              primary={user?.UserProfile?.firstName || user?.phone}
              secondary={user?.email}
              secondaryTypographyProps={{ component: 'span' }}
            />
            <Stack>{user?.userName}</Stack>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Update your profile details to enhance your experience!
            </Typography>
          </Box>
        </Fade>
      </Modal>

      <Badge variant={status} anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Avatar
          src={imageDetails}
          alt={user?.UserProfile?.firstName}
          onClick={popover.onOpen}
          sx={{ cursor: 'pointer', width: 48, height: 48 }}
        >
          {user?.userName?.charAt(0).toUpperCase()}
        </Avatar>
      </Badge>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="top-left" sx={{ p: 0 }}>
        <Stack
          direction="row"
          alignItems="center"
          spacing={2}
          sx={{
            py: 2,
            pr: 1,
            pl: 2.5,
          }}
        >
          <ListItemText
            primary={user?.UserProfile?.firstName || user?.phone}
            secondary={user?.email}
            secondaryTypographyProps={{ component: 'span' }}
          />

          <Tooltip title="Log out">
            <IconButton color="error">
              <Iconify icon="ic:round-power-settings-new" />
            </IconButton>
          </Tooltip>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack sx={{ p: 1 }}>
          <MenuItem>
            <Badge
              variant={status}
              sx={{
                [`& .${badgeClasses.badge}`]: {
                  position: 'static',
                  m: 0.75,
                  width: 12,
                  height: 12,
                  flexShrink: 0,
                },
              }}
            />

            <Select
              native
              fullWidth
              value={status}
              onChange={handleChangeStatus}
              input={<InputBase sx={{ pl: 2 }} />}
              inputProps={{
                sx: { textTransform: 'capitalize' },
              }}
            >
              {['online', 'alway', 'busy', 'offline'].map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </MenuItem>

          <MenuItem onClick={handleOpen}>
            <Iconify icon="solar:user-id-bold" width={24} />
            Profile
          </MenuItem>

          <MenuItem>
            <Iconify icon="eva:settings-2-fill" width={24} />
            Settings
          </MenuItem>
        </Stack>
      </CustomPopover>
    </>
  );
}
