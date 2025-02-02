import React, { useState } from 'react';
import { m, LazyMotion } from 'framer-motion';

import { Box, Stack } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import { Modal, Button, IconButton, Typography } from '@mui/material';

import { paths } from 'src/routes/paths';

const loadFeatures = () => import('framer-motion').then((res) => res.domAnimation);

export default function SurveyPopup() {
  const [open, setOpen] = useState(true);
  // const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const text = ['Take a Quick', 'Survey'];
  const colors = ['#3975bf', '#ef9a6e'];

  return (
    <Modal
      open={open}
      // onClose={handleClose}
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
          // bgcolor: 'background.paper',
          borderRadius: '20px',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          bgcolor: '#eaf7fa',
          // backgroundImage: 'https://website-assets-fw.freshworks.com/attachments/cku3qhqxb03zw1ffz98vzq5m7-survey-02.full.png',
          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
        }}
      >
        <Box sx={{ textAlign: 'end' }}>
          <IconButton
            onClick={handleClose}
            sx={{
              // p: '10px',
              bgcolor: '#ecc9a3',
              color: 'white',
              '&:hover': {
                color: 'grey.700',
              },
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* <Typography variant='h2' color='#3975bf'>Take a Quick <Typography variant='h2' color='#ef9a6e'> Survey</Typography></Typography> */}
          <LazyMotion features={loadFeatures}>
            <Stack direction="column" alignItems="center" justifyContent="flex-start">
              {text.map((word, index) => (
                <m.div
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.5, duration: 0.5 }}
                >
                  <Typography variant="h2" color={colors[index]}>
                    {word}
                  </Typography>
                </m.div>
              ))}
            </Stack>
          </LazyMotion>

          <Button
            variant="contained"
            sx={{
              p: '15px 20px',
              color: 'white',
              bgcolor: '#3d5a6a',
              whiteSpace: 'nowrap',
              textAlign: 'right',
              minWidth: '80px',
              transition: 'background-color 0.3s ease-in-out, transform 0.3s ease-in-out',
              borderRadius: '30px',
              '&:hover': {
                backgroundColor: '#ecc9a3',
                color: '#3d5a6a',
              },
              '&:active': {
                transform: 'scale(1.1)',
              },
            }}
            href={paths.dashboard.fill_survey.new}
          >
            Go to Survey
          </Button>
        </Box>

        {/* <Image src='assets/images/Survey/survey_popup.gif' /> */}
        {/* <ReactPlayer
                    url='assets/images/Survey_video.mov'
                    width="100%"
                    height="100%"
                    playing
                    loop
                    muted
                // onReady={()=>handleReady()}
                // light={isReady ? null : coverUrl}
                /> */}
      </Box>
    </Modal>
  );
}
