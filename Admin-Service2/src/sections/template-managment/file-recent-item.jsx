import PropTypes from 'prop-types';
// import {
//   useState,
//   useCallback,
//   // useEffect
// } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
// import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
// import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';
// import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

// import { useSnackbar } from 'src/components/snackbar';
import { Avatar } from '@mui/material';

import { fData } from 'src/utils/format-number';
import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
// import FileThumbnail from 'src/components/file-thumbnail';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// import FileManagerShareDialog from './file-manager-share-dialog';
// import FileManagerFileDetails from './file-manager-file-details';

// ----------------------------------------------------------------------

export default function FileRecentItem({ file, onDelete, sx, ...other }) {
  // const { enqueueSnackbar } = useSnackbar();

  // const { copy } = useCopyToClipboard();

  const smUp = useResponsive('up', 'sm');

  // const [inviteEmail, setInviteEmail] = useState('');

  const popover = usePopover();

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Example',
          text: 'Check out this link!',
          url: window.location.href,
        });
        // console.log('Shared successfully');
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
      // Fallback for browsers that do not support Web Share API
      alert('Your browser does not support sharing.');
    }
  };

  const details = useBoolean();
  const renderAction = (
    <Box
      sx={{
        top: 0,
        right: 8,
        position: 'absolute',
        ...(smUp && {
          flexShrink: 0,
          position: 'unset',
        }),
      }}
    >
      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Box>
  );

  const fileLogos = {
    pdf: 'public/assets/icons/extensionLogos/pdf.png',
    docx: 'public/assets/icons/extensionLogos/doc.png',
    xlsx: 'public/assets/icons/extensionLogos/xls.png',
  };

  const getFileLogo = (filename) => {
    const extension = filename.split('.').pop().toLowerCase();
    if (extension === 'png' || extension === 'jpg' || extension === 'svg.png') {
      return filename;
    }
    return fileLogos[extension];
  };

  const renderAvatar = (
    <Avatar
      variant="rounded"
      alt={file?.templateImageDetails?.name}
      src={getFileLogo(file?.templateImageDetails?.name)}
      sx={{ mr: 2, width: 48, height: 48 }}
    />
  );

  const renderText = (
    <ListItemText
      onClick={details.onTrue}
      primary={file?.templateImageDetails?.name}
      secondary={
        <>
          {fData(file.templateImageDetails?.size)}
          <Box
            sx={{
              mx: 0.75,
              width: 2,
              height: 2,
              borderRadius: '50%',
              bgcolor: 'currentColor',
            }}
          />
          {fDateTime(file.updated_at)}
        </>
      }
      primaryTypographyProps={{
        noWrap: true,
        typography: 'subtitle2',
      }}
      secondaryTypographyProps={{
        mt: 0.5,
        component: 'span',
        alignItems: 'center',
        typography: 'caption',
        color: 'text.disabled',
        display: 'inline-flex',
      }}
    />
  );

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={1}
        direction={{ xs: 'column', sm: 'row' }}
        alignItems={{ xs: 'unset', sm: 'center' }}
        sx={{
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          p: { xs: 2.5, sm: 2 },
          '&:hover': {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          },
          ...sx,
        }}
        {...other}
      >
        {renderAvatar}
        {renderText}
        {renderAction}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            handleShare();
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

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

      {/* <FileManagerFileDetails
        item={file}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={() => {
          details.onFalse();
          onDelete();
        }}
      /> */}

      {/* <FileManagerShareDialog
        open={share.value}
        shared={file.shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={handleCopy}
        onClose={() => {
          share.onFalse();
          setInviteEmail('');
        }}
      /> */}
    </>
  );
}

FileRecentItem.propTypes = {
  file: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onDelete: PropTypes.func,
  sx: PropTypes.object,
};
