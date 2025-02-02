import PropTypes from 'prop-types';
import { useMemo, useState, useCallback } from 'react';

import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import Iconify from 'src/components/iconify';
import { Upload } from 'src/components/upload';
import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------

export default function ResumeUploadDialog({
  title = 'Upload Files',
  open,
  onClose,
  setFiles,
  files,
}) {
  const { enqueueSnackbar } = useSnackbar();
  const [dropfile, setdropFiles] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFile = Object.assign(acceptedFiles[0], {
        preview: URL.createObjectURL(acceptedFiles[0]),
      });
      if (newFile.type === 'application/pdf') {
        setdropFiles([newFile]);
      } else {
        enqueueSnackbar('PDF are allowed to Upload only', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const uploadFile = useMemo(
    () => async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);
        const response = await uploadclaimFileInAWSS3(formData);
        const fileUrl = response?.data?.data || {};
        if (fileUrl) {
          setFiles([fileUrl]);
          onClose();
        } else {
          console.error('Error in uploading file:', response);
        }
      } catch (error) {
        console.error('Error in uploading file:', error);
      }
    },
    [onClose, setFiles]
  );
  const handleUpload = () => {
    uploadFile(dropfile[0]);
  };

  const handleRemoveFile = (inputFile) => {
    setFiles([]);
  };

  return (
    <Dialog fullWidth maxWidth="sm" open={open} onClose={onClose}>
      <DialogTitle sx={{ p: (theme) => theme.spacing(3, 3, 2, 3) }}> {title} </DialogTitle>

      <DialogContent dividers sx={{ pt: 1, pb: 0, border: 'none' }}>
        <Upload multiple files={dropfile} onDrop={handleDrop} onRemove={handleRemoveFile} />
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          startIcon={<Iconify icon="eva:cloud-upload-fill" />}
          onClick={handleUpload}
          disabled={dropfile.length === 0}
        >
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
}

ResumeUploadDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string,
  setFiles: PropTypes.func,
  files: PropTypes.array,
};
