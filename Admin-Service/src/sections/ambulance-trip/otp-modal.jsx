import PropTypes from 'prop-types';
import React, { useRef, useState } from 'react';

import { Box, Modal, Stack, Button, TextField, Typography } from '@mui/material';

const OtpModal = ({ open, onClose, onSubmit, otpRef }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(), useRef(), useRef(), useRef(), useRef(), useRef()];

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onSubmit(otpString);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 350,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" component="h2" gutterBottom>
          Enter OTP To Start Trip
        </Typography>
        <Typography
          variant="p"
          component="h3"
          gutterBottom
          style={{ fontSize: '0.875rem', color: 'rgba(0, 0, 0, 0.6)' }}
        >
          Ref For OTP : {otpRef}
        </Typography>
        <Stack direction="row" spacing={1} justifyContent="space-between" mb={2}>
          {otp.map((digit, index) => (
            <TextField
              key={index}
              inputRef={inputRefs[index]}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              inputProps={{
                maxLength: 1,
                style: { textAlign: 'center' },
              }}
              sx={{ width: 50 }}
            />
          ))}
        </Stack>
        <Button
          fullWidth
          variant="contained"
          onClick={handleSubmit}
          disabled={otp.join('').length !== 6}
        >
          Start Trip
        </Button>
      </Box>
    </Modal>
  );
};

OtpModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  otpRef: PropTypes.string.isRequired,
};

export default OtpModal;
