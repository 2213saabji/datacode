import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
// import DialogTitle from '@mui/material/DialogTitle';
// import imageCompression from 'browser-image-compression';

import { enqueueSnackbar } from 'notistack';

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { poster, endpoints } from 'src/utils/axios-templateManagemet';
import { uploadclaimFilesInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';

// ----------------------------------------------------------------------

export default function FileManagerNewFolderDialog({
  title = 'Upload Files',
  open,
  onClose,
  //
  onCreate,
  onUpdate,
  //
  folderName,
  onChangeFolderName,
  ...other
}) {
  const { user } = useAuthContext();
  const [files, setFiles] = useState([]);

  useEffect(() => {
    if (!open) {
      setFiles([]);
    }
  }, [open]);

  const handleDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setFiles([...newFiles]);
  }, []);

  const handleUpload = async () => {
    try {
      const Files = await Promise.all(files);

      const formData = new FormData();
      Files.forEach((file, index) => {
        // Create a new Blob object with the compressed file content and type
        const blob = new Blob([file], { type: file.type });
        // Create a new File object with the Blob and original filename
        const newFile = new File([blob], file.name, { type: file.type });
        formData.append('images', newFile);
      });

      const response = await uploadclaimFilesInAWSS3(formData);
      const fileUrls =
        response.data && response.data.data && response.data.data.length
          ? response?.data?.data
          : [];
      const header = { headers: { Authorization: `Bearer ${user?.accessToken}` } };
      const data = {
        templateImageDetails: fileUrls[0],
      };
      const res = await poster(endpoints.templateManagement.upload, data, header);
      // setValue('receiptImageUrl', imageUrls);
      // setUploadBtn(true);

      // enqueueSnackbar('Uploaded successfully', { variant: 'success' });
      if (res.success) {
        onClose();
      }

      // console.info('ON UPLOAD');
    } catch (error) {
      console.error('Error in uploading files:', error);
      enqueueSnackbar('Error while uploading', { variant: 'error' });
    }
  };

  const handleRemoveFile = (inputFile) => {
    const filtered = files.filter((file) => file !== inputFile);
    setFiles(filtered);
  };

  const handleRemoveAllFiles = () => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose} {...other}>
      {/* <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle> */}

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        {(onCreate || onUpdate) && (
          <TextField
            fullWidth
            label="Folder name"
            value={folderName}
            onChange={onChangeFolderName}
            sx={{ mb: 3 }}
          />
        )}

        <Upload multiple files={files} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        {!!files.length && (
          <Button
            variant="contained"
            startIcon={<Iconify icon="eva:cloud-upload-fill" />}
            onClick={handleUpload}
          >
            Upload
          </Button>
        )}

        {!!files.length && (
          <Button variant="outlined" color="inherit" onClick={handleRemoveAllFiles}>
            Remove
          </Button>
        )}

        {(onCreate || onUpdate) && (
          <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
            <Button variant="soft" onClick={onCreate || onUpdate}>
              {onUpdate ? 'Save' : 'Create'}
            </Button>
          </Stack>
        )}
      </DialogActions>
    </Dialog>
  );
}

FileManagerNewFolderDialog.propTypes = {
  folderName: PropTypes.string,
  onChangeFolderName: PropTypes.func,
  onClose: PropTypes.func,
  onCreate: PropTypes.func,
  onUpdate: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
};
