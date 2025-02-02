// import { Link } from 'react-router-dom';
import { useState, } from 'react';

import { Box } from '@mui/system';
import { Modal, } from '@mui/material';


import InstitutionDetailsNewEditForm from '../Institution-details-new-edit-form';

export default function InstituteOwnerDetailsModal() {

  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <Modal
      open={isModalOpen}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          height: 600,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
          overflow: 'auto',
          '&::-webkit-scrollbar': {
            width: '0px',
          },
        }}
      >
        <InstitutionDetailsNewEditForm setIsModalOpen={setIsModalOpen} />
      </Box>
    </Modal>
  )
}
