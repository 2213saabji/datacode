/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { useBoolean } from 'src/hooks/use-boolean';

import { fDateTime } from 'src/utils/format-time';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { fileFormat } from 'src/components/file-thumbnail';

import FileManagerShareDialog from '../file-manager/file-manager-share-dialog';
import FileManagerInvitedItem from '../file-manager/file-manager-invited-item';

// ----------------------------------------------------------------------

export default function FileManagerDocDetails({
  item,
  id,
  open,
  favorited,
  //
  onFavorite,
  onCopyLink,
  onClose,
  onDelete,
  convertKbToMb,
  deleter,
  ...other
}) {
  const { icon, name, size, url, usedStorage, type, shared, modifiedAt, preview } = item.pdf;
  // console.log('item------>', item.pdf)

  const hasShared = shared && !!shared.length;

  const enqueueSnackbar = useSnackbar();

  const toggleTags = useBoolean(true);

  const share = useBoolean();

  const properties = useBoolean(true);

  const [inviteEmail, setInviteEmail] = useState('');

  const [tags, setTags] = useState(item.tags);

  const handleChangeInvite = useCallback((event) => {
    setInviteEmail(event.target.value);
  }, []);

  const handleChangeTags = useCallback((newValue) => {
    setTags(newValue);
  }, []);

  const handleDownload = useCallback(
    (fileUrl) => {
      const link = document.createElement('a');
      link.href = fileUrl;
      link.setAttribute('download', fileUrl.split('/').pop());
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      enqueueSnackbar('Download started!');
    },
    [enqueueSnackbar]
  );

  //   const renderTags = (
  //     <Stack spacing={1.5}>
  //       <Stack
  //         direction="row"
  //         alignItems="center"
  //         justifyContent="space-between"
  //         sx={{ typography: 'subtitle2' }}
  //       >
  //         Tags
  //         <IconButton size="small" onClick={toggleTags.onToggle}>
  //           <Iconify
  //             icon={toggleTags.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
  //           />
  //         </IconButton>
  //       </Stack>

  //       {toggleTags.value && (
  //         <Autocomplete
  //           multiple
  //           freeSolo
  //           options={item.tags.map((option) => option)}
  //           getOptionLabel={(option) => option}
  //           defaultValue={item.tags.slice(0, 3)}
  //           value={tags}
  //           onChange={(event, newValue) => {
  //             handleChangeTags(newValue);
  //           }}
  //           renderOption={(props, option) => (
  //             <li {...props} key={option}>
  //               {option}
  //             </li>
  //           )}
  //           renderTags={(selected, getTagProps) =>
  //             selected.map((option, index) => (
  //               <Chip
  //                 {...getTagProps({ index })}
  //                 size="small"
  //                 variant="soft"
  //                 label={option}
  //                 key={option}
  //               />
  //             ))
  //           }
  //           renderInput={(params) => <TextField {...params} placeholder="#Add a tags" />}
  //         />
  //       )}
  //     </Stack>
  //   );

  const renderProperties = (
    <Stack spacing={1.5}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{ typography: 'subtitle2' }}
      >
        Properties
        <IconButton size="small" onClick={properties.onToggle}>
          <Iconify
            icon={properties.value ? 'eva:arrow-ios-upward-fill' : 'eva:arrow-ios-downward-fill'}
          />
        </IconButton>
      </Stack>

      {properties.value && (
        <>
          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Size
            </Box>
            {/* {fData(item.usedStorage)} */}
            {convertKbToMb(size)} Mb
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              File Name
            </Box>
            {name}
          </Stack>
          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Created At
            </Box>
            {fDateTime(item.created_at)}
          </Stack>
          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Updated At
            </Box>
            {fDateTime(item.updated_at)}
          </Stack>

          <Stack direction="row" sx={{ typography: 'caption', textTransform: 'capitalize' }}>
            <Box component="span" sx={{ width: 80, color: 'text.secondary', mr: 2 }}>
              Type
            </Box>
            {fileFormat(type)}
            {/* {type} */}
          </Stack>
        </>
      )}
    </Stack>
  );

  const renderShared = (
    <>
      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
        <Typography variant="subtitle2"> File Download </Typography>

        <IconButton
          size="small"
          color="primary"
          // onClick={share.onTrue}
          onClick={() => handleDownload(preview)}
          sx={{
            width: 24,
            height: 24,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            '&:hover': {
              bgcolor: 'primary.dark',
            },
          }}
        >
          <Iconify icon="eva:download-outline" />
        </IconButton>
      </Stack>

      {hasShared && (
        <Box sx={{ pl: 2.5, pr: 1 }}>
          {shared.map((person) => (
            <FileManagerInvitedItem key={person.id} person={person} />
          ))}
        </Box>
      )}
    </>
  );

  return (
    <>
      <Drawer
        open={open}
        onClose={onClose}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 320 },
        }}
        {...other}
      >
        <Scrollbar sx={{ height: 1 }}>
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ p: 2.5 }}>
            <Typography variant="h6"> Info </Typography>

            <Checkbox
              color="warning"
              icon={<Iconify icon="eva:star-outline" />}
              checkedIcon={<Iconify icon="eva:star-fill" />}
              //   checked={favorited}
              //   onChange={onFavorite}
            />
          </Stack>

          <Stack
            spacing={2.5}
            justifyContent="center"
            sx={{
              p: 2.5,
              bgcolor: 'background.neutral',
            }}
          >
            {/* <FileThumbnail
                        imageView
                        file={type === 'folder' ? type : item.icon}
                        sx={{ width: 6, height: 6 }}
                        imgSx={{ borderRadius: 1 }}
                        /> */}
            <Box>
              <Box
                component="img"
                src="/assets/icons/files/ic_document.svg"
                sx={{ width: 46, height: 46 }}
              />
            </Box>

            <Typography
              variant="subtitle3"
              sx={{
                wordBreak: 'break-all',
                typography: 'caption',
                textTransform: 'capitalize',
                fontWeight: '700',
              }}
            >
              {name}
            </Typography>

            <Divider sx={{ borderStyle: 'dashed' }} />

            {/* {renderTags} */}

            {renderProperties}
          </Stack>

          {renderShared}
        </Scrollbar>

        <Box sx={{ p: 2.5 }}>
          <Button
            fullWidth
            variant="soft"
            color="error"
            size="large"
            startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
            onClick={() => {
              deleter(item.galleryId);
              onClose();
            }}
          >
            Delete
          </Button>
        </Box>
      </Drawer>

      <FileManagerShareDialog
        open={share.value}
        shared={shared}
        inviteEmail={inviteEmail}
        onChangeInvite={handleChangeInvite}
        onCopyLink={onCopyLink}
        onClose={() => {
          share.onFalse();
          setInviteEmail('');
        }}
      />
    </>
  );
}

FileManagerDocDetails.propTypes = {
  open: PropTypes.bool,
  item: PropTypes.object,
  id: PropTypes.string,
  onClose: PropTypes.func,
  onDelete: PropTypes.func,
  favorited: PropTypes.bool,
  onCopyLink: PropTypes.func,
  onFavorite: PropTypes.func,
  convertKbToMb: PropTypes.func,
  deleter: PropTypes.func,
};
