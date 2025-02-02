/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import { keyframes } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Grid, Modal, Button, IconButton } from '@mui/material';

import EmptyContent from 'src/components/empty-content';

const cardsData = [
  {
    id: 1,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580349244-ales_kladnik--fallopia_japonica_growing_timelapse.mp4',
  },
  {
    id: 2,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580457796-WhatsApp Video 2024-06-28 at 6.29.16 PM (1).mp4',
  },
  {
    id: 3,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580534924-WhatsApp Video 2024-06-28 at 6.28.32 PM.mp4',
  },
  {
    id: 4,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580457796-WhatsApp Video 2024-06-28 at 6.29.16 PM (1).mp4',
  },
  {
    id: 5,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719579784034-WhatsApp Video 2024-06-28 at 6.29.59 PM.mp4',
  },
  {
    id: 6,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580534924-WhatsApp Video 2024-06-28 at 6.28.32 PM.mp4',
  },
  {
    id: 7,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580349244-ales_kladnik--fallopia_japonica_growing_timelapse.mp4',
  },
  {
    id: 8,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580534924-WhatsApp Video 2024-06-28 at 6.28.32 PM.mp4',
  },
  {
    id: 9,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719579784034-WhatsApp Video 2024-06-28 at 6.29.59 PM.mp4',
  },
  {
    id: 10,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580534924-WhatsApp Video 2024-06-28 at 6.28.32 PM.mp4',
  },
  {
    id: 11,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719579784034-WhatsApp Video 2024-06-28 at 6.29.59 PM.mp4',
  },
  {
    id: 12,
    path: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719580534924-WhatsApp Video 2024-06-28 at 6.28.32 PM.mp4',
  },
];
export default function GalleryAudio({ galleryDataAudio, deleter }) {
  // const handleCardClick = (id) => {
  //   window.open(cardsData.find(card => card.id === id).navigate, '_blank');
  // };

  // const [open, setOpen] = useState(false);
  // const [selectedCard, setSelectedCard] = useState(null);

  // const handleOpen = (card) => {
  //   setSelectedCard(card);
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  //   setSelectedCard(null);
  // };

  const shake = keyframes`
      0% { transform: rotate(0); }
      25% { transform: rotate(30deg); }
      50% { transform: rotate(-30deg); }
      75% { transform: rotate(30deg); }
      100% { transform: rotate(0); }
    `;
  const [isReady, setIsReady] = useState(false);

  const handleReady = () => {
    setIsReady(true);
  };

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const handleMouseEnter = (cardId) => {
    setHoveredCardId(cardId);
  };

  const handleMouseLeave = () => {
    setHoveredCardId(null);
  };

  const handleOpen = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  const handleDelete = (cardId) => {
    // console.log(`Delete card with ID: ${cardId}`);
    handleClose();
  };
  return (
    <Box>
      {galleryDataAudio.length > 0 && (
        <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
          {galleryDataAudio.map((card) => (
            <Grid
              item
              key={card.galleryId}
              xs={12}
              sm={8}
              md={4}
              lg={3}
              sx={{
                boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
                borderRadius: '10px',
                height: '100%',
                padding: '0 !important',
                margin: '0 !important',
                transition: 'transform 0.4s ease-in',
                position: 'relative',
                '&:hover': {
                  transform: { xs: 'scale(1)', md: 'scale(1.05)' },
                },
              }}
              onMouseEnter={() => handleMouseEnter(card.galleryId)}
              onMouseLeave={handleMouseLeave}
            >
              <Box
                sx={{
                  position: 'relative',
                  paddingBottom: '56.25%',
                  height: 0,
                  overflow: 'hidden',
                  borderRadius: '5px',
                }}
              >
                <ReactPlayer
                  url={card.video.preview}
                  width="100%"
                  height="100px"
                  style={{ position: 'absolute', top: 0, left: 0 }}
                  // loop
                  // muted
                  // onReady={handleReady}
                  // light={isReady ? null : 'path_to_your_thumbnail_image_url'}
                />
              </Box>

              {hoveredCardId === card.galleryId && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'rgba(255, 255, 255, 0.2)',
                    zIndex: 1,
                  }}
                >
                  <Button
                    variant="contained"
                    sx={{
                      m: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      color: 'black',
                      position: 'relative',
                      '&:hover': {
                        color: 'white',
                        '& .view-text': {
                          display: 'none',
                        },
                        '& .view-icon': {
                          display: 'inline-flex',
                          transform: { xs: 'scale(1)', md: 'scale(1.2)' },
                        },
                      },
                    }}
                    onMouseEnter={() => setHover(true)}
                    onMouseLeave={() => setHover(false)}
                  >
                    <span className="view-text">View</span>
                    <VisibilityIcon
                      className="view-icon"
                      sx={{ display: 'none' }}
                      onClick={() => handleOpen(card)}
                    />
                  </Button>

                  <Button
                    variant="contained"
                    sx={{
                      m: 1,
                      bgcolor: 'rgba(255, 255, 255, 0.5)',
                      color: 'black',
                      '&:hover': {
                        color: 'white',
                        bgcolor: 'red',
                        '& .MuiSvgIcon-root': {
                          animation: `${shake} 0.5s`,
                          animationIterationCount: 'initial',
                        },
                      },
                    }}
                    onClick={() => deleter(card.galleryId)}
                  >
                    <DeleteIcon />
                  </Button>
                </Box>
              )}
            </Grid>
          ))}
        </Grid>
      )}

      {galleryDataAudio.length === 0 && (
        <EmptyContent title="No Audio" description="There is no data available." sx={{ py: 0 }} />
      )}

      <Modal open={open} onClose={handleClose}>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '90%',
            maxWidth: 800,
            // maxHeight: '90%',
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: '24px',
            borderRadius: 2,
            padding: 16,
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              top: 20,
              right: 20,
              color: 'white',
              zIndex: '2',
              '&:hover': { bgcolor: '#2da6f2' },
            }}
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>

          {selectedCard && (
            <ReactPlayer
              url={selectedCard.video.preview}
              width="100%"
              height="100%"
              style={{ borderRadius: 2 }}
              playing
              loop
              controls
              onReady={handleReady}
            />
          )}
        </div>
      </Modal>
    </Box>
  );
}

GalleryAudio.propTypes = {
  galleryDataAudio: PropTypes.object,
  deleter: PropTypes.func,
};
