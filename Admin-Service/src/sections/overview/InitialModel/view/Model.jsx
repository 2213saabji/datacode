import React, { useState } from 'react';

import { Box } from '@mui/system';
import { Modal } from '@mui/material';

// import { useAuthContext } from 'src/auth/hooks';

import FormDetailsPop from '../Form-details-popup';

function Model() {
  // const { user } = useAuthContext()
  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Modal
        open={open}
        // onClose={!localStorage.getItem('register') && handleClose}
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
          <FormDetailsPop handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}

export default Model;
