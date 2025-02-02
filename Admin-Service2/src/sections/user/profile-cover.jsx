import PropTypes from 'prop-types';
import imageCompression from 'browser-image-compression';
import { useRef, useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import EditIcon from '@mui/icons-material/Edit';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { bgGradient } from 'src/theme/css';
import { useAuthContext } from 'src/auth/hooks';
import { uploadUserProfileImage, UpdateUserProfileImage } from 'src/api/user';

import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function ProfileCover({
  name,
  avatarUrl,
  role,
  coverUrl,
  profileName,
  imageAvailable,
}) {
  const theme = useTheme();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const fileInputRef = useRef(null);
  const [image, setImage] = useState(avatarUrl);
  const handleDropAvatar = useCallback(
    async (imageUrl) => {
      try {
        const uploadImageResponse = await uploadUserProfileImage(
          imageUrl,
          user?.userId,
          user.accessToken
        );

        if (uploadImageResponse) {
          setImage(uploadImageResponse?.data?.preview);
          enqueueSnackbar('Profile Image Uploaded Successfully', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Failed To Upload Image', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user]
  );
  const handleUpdateAvatar = useCallback(
    async (imageUrl) => {
      try {
        const uploadImageResponse = await UpdateUserProfileImage(
          imageUrl,
          user?.userId,
          user.accessToken
        );

        if (uploadImageResponse) {
          setImage(uploadImageResponse?.data?.UserProfile?.userProfileImageDetails?.preview);
          enqueueSnackbar('Profile Image Updated Successfully', { variant: 'success' });
        }
      } catch (error) {
        enqueueSnackbar('Failed To Update Image', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user]
  );

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5,
          maxWidthOrHeight: 800,
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadclaimFileInAWSS3(formData);

        const imageUrl = response.data && response.data.data ? response.data.data : {};
        if (imageUrl) {
          if (imageAvailable === null) {
            handleDropAvatar(imageUrl);
          } else {
            handleUpdateAvatar(imageUrl);
          }
        } else {
          console.error('Error in uploading file:', response);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
      }
    },
    [imageAvailable, handleDropAvatar, handleUpdateAvatar, enqueueSnackbar]
  );

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.primary.darker, 0.8),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Box
          onClick={handleAvatarClick}
          sx={{ display: 'flex', direction: 'row', width: 'fit-content', mx: { xs: 'auto' } }}
        >
          <Avatar
            alt={profileName}
            name="userProfileImageDetails"
            src={image}
            sx={{
              mx: 'auto',
              width: { xs: 64, md: 128 },
              height: { xs: 64, md: 128 },
              border: `solid 2px ${theme.palette.common.white}`,
              cursor: 'pointer',
            }}
          >
            {name?.charAt(0).toUpperCase()}
          </Avatar>
          <EditIcon />
        </Box>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
          accept="image/*"
        />
        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textAlign: { xs: 'center', md: 'unset' },
          }}
          primary={profileName}
          secondary={role}
          primaryTypographyProps={{
            typography: 'h4',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
    </Box>
  );
}

ProfileCover.propTypes = {
  avatarUrl: PropTypes.string,
  coverUrl: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string,
  profileName: PropTypes.string,
  imageAvailable: PropTypes.object,
};
