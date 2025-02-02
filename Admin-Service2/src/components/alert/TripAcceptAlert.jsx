import PropTypes from 'prop-types';
import { fromLatLng } from 'react-geocode';
import React, { useState, useEffect } from 'react';

import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { useGetUserByUserId } from 'src/api/user';

export function ConfirmModal({ isOpen, onConfirm, onCancel, trip }) {
  const [address, setAddress] = useState('');
  console.log(trip.newTrip.tripRequestBy);
  const { user } = useGetUserByUserId(Number(trip.newTrip.tripRequestBy));

  const userProfile = user?.data?.UserProfile;
  const userName = [userProfile?.firstName, userProfile?.middleName, userProfile?.lastName]
    .filter(Boolean)
    .join(' ')
    .trim();

  const getAddressFromCoordinates = (lat, lng) => {
    fromLatLng(lat, lng).then(
      (response) => {
        const addresss = response.results[0].formatted_address;
        setAddress(addresss);
      },
      (error) => {
        console.error(error);
      }
    );
  };
  const { latitude, longitude } = trip.newTrip.tripSource;
  useEffect(() => {
    console.log(latitude, longitude);
    getAddressFromCoordinates(latitude, longitude);
  }, [latitude, longitude]);

  return (
    <Modal
      open={isOpen}
      // onClose={onCancel}
      aria-labelledby="confirm-modal-title"
      aria-describedby="confirm-modal-description"
    >
      <div
        style={{
          position: 'absolute',
          width: { xs: 300, md: 600 },
          backgroundColor: 'white',
          border: 'none', // Remove the border
          boxShadow: '0px 0px 2px 2px rgba(0,0,0,0.3)',
          padding: 20,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 8,
        }}
      >
        <Typography variant="h5" id="confirm-modal-title" gutterBottom>
          Confirm Ambulance Request
        </Typography>
        <Typography variant="h5" id="confirm-modal-title" gutterBottom>
          Request By: {userName}
        </Typography>
        <Typography variant="h5" id="confirm-modal-title" gutterBottom>
          Source Address: {address}
        </Typography>
        <Typography variant="body1" id="confirm-modal-description" gutterBottom>
          Are you sure you want to request an ambulance to your current location? This action will
          alert emergency services immediately. Please only confirm if this is a genuine medical
          emergency requiring urgent assistance.
        </Typography>
        <div style={{ textAlign: 'right' }}>
          <Button onClick={onCancel} style={{ marginRight: 10 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={onConfirm}>
            Confirm
          </Button>
        </div>
      </div>
    </Modal>
  );
}
ConfirmModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onConfirm: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  trip: PropTypes.object.isRequired,
};

// const Page = () => {
//   const [modalOpen, setModalOpen] = useState(false);

//   const handleConfirm = () => {
//     // Do something when confirmed
//     setModalOpen(false);
//   };

//   const handleCancel = () => {
//     // Do something when canceled
//     setModalOpen(false);
//   };

//   return (
//     <div>
//       <h1>Your Page</h1>
//       <Button onClick={() => setModalOpen(true)}>Open Confirm Modal</Button>
//       <ConfirmModal
//         isOpen={modalOpen}
//         message="Are you sure you want to proceed?"
//         onConfirm={handleConfirm}
//         onCancel={handleCancel}
//       />
//     </div>
//   );
// };

// export default Page;
