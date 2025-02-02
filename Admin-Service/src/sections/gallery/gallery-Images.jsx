/* eslint-disable no-unused-vars */
import { useState } from 'react';
import PropTypes from 'prop-types';

import { keyframes } from '@mui/system';
import CloseIcon from '@mui/icons-material/Close';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { Box, Grid, Modal, Button, CardMedia, IconButton } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';

import EmptyContent from 'src/components/empty-content/empty-content';

// ----------------------------------------------------------------------

export default function GalleryImages({ galleryDataPhotos, deleter }) {
  const { user } = useAuthContext();

  const cardsData = [
    {
      id: 1,
      path: 'https://fastly.picsum.photos/id/237/3500/2095.jpg?hmac=y2n_cflHFKpQwLOL1SSCtVDqL8NmOnBzEW7LYKZ-z_o',
    },
    {
      id: 2,
      path: 'https://fastly.picsum.photos/id/103/2592/1936.jpg?hmac=aC1FT3vX9bCVMIT-KXjHLhP6vImAcsyGCH49vVkAjPQ',
    },
    {
      id: 3,
      path: 'https://fastly.picsum.photos/id/191/2560/1707.jpg?hmac=60dSBXsS8n-Gi2-LMtm-BfDd6Mz_JMrYI8jN4yb41qg',
    },
    {
      id: 4,
      path: 'https://fastly.picsum.photos/id/378/5000/3333.jpg?hmac=Jh9hcCIe9-6cNIvJnO5d33CuAR-3RKeOMRx4ki5nKt8',
    },
    {
      id: 5,
      path: 'https://fastly.picsum.photos/id/528/4000/3000.jpg?hmac=b5k40WwSa0r9VKc6WfCPhDwAOYkR2duODFHksnqAlf8',
    },
    {
      id: 6,
      path: 'https://fastly.picsum.photos/id/48/5000/3333.jpg?hmac=y3_1VDNbhii0vM_FN6wxMlvK27vFefflbUSH06z98so',
    },
    {
      id: 7,
      path: 'https://fastly.picsum.photos/id/28/4928/3264.jpg?hmac=GnYF-RnBUg44PFfU5pcw_Qs0ReOyStdnZ8MtQWJqTfA',
    },
    {
      id: 8,
      path: 'https://fastly.picsum.photos/id/57/2448/3264.jpg?hmac=ewraXYesC6HuSEAJsg3Q80bXd1GyJTxekI05Xt9YjfQ',
    },
    {
      id: 9,
      path: 'https://fastly.picsum.photos/id/376/5000/3324.jpg?hmac=YsGSzJMjAbs9Y95mgDvjlhJ28wfLdf55oWsN7pOhytY',
    },
    {
      id: 10,
      path: 'https://fastly.picsum.photos/id/22/4434/3729.jpg?hmac=fjZdkSMZJNFgsoDh8Qo5zdA_nSGUAWvKLyyqmEt2xs0',
    },
    {
      id: 11,
      path: 'https://fastly.picsum.photos/id/0/5000/3333.jpg?hmac=_j6ghY5fCfSD6tvtcV74zXivkJSPIfR9B8w34XeQmvU',
    },
    {
      id: 12,
      path: 'https://fastly.picsum.photos/id/193/3578/2451.jpg?hmac=M5yoazhwdwMa_27rC5-S50SNFvCy4Kni0wXoa6iVF0g',
    },
  ];

  // async function deleteImage(galleryId) {
  //   const url = `${ATTPL_EMS_HOST_API}/gallery/delete/${galleryId}`
  //   const headers = {
  //     headers: {
  //       Authorization: `Bearer ${user.accessToken}`,
  //     },
  //   }
  //   const res = await axios.delete(url, headers)
  //   if(res){
  //     enqueueSnackbar('Deleted successfully', {variant:'success'})
  //     refetch()
  //   }
  //   console.log('res----->', res)
  // }

  const [hoveredCardId, setHoveredCardId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [open, setOpen] = useState(false);
  const [hover, setHover] = useState(false);

  const shake = keyframes`
  0% { transform: rotate(0); }
  25% { transform: rotate(30deg); }
  50% { transform: rotate(-30deg); }
  75% { transform: rotate(30deg); }
  100% { transform: rotate(0); }
`;

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
      {galleryDataPhotos.length > 0 && (
        <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
          {galleryDataPhotos?.map((card) => (
            <Grid
              item
              key={card.galleryId}
              xs={12}
              sm={8}
              md={4}
              lg={3}
              sx={{
                borderRadius: '10px',
                boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
                padding: '0 !important',
                margin: '0 !important',
                transition: 'transform 0.4s ease-in',
                height: '100%',
                position: 'relative',
                '&:hover': {
                  transform: { xs: 'scale(1)', md: 'scale(1.05)' },
                },
              }}
              onMouseEnter={() => handleMouseEnter(card.galleryId)}
              onMouseLeave={handleMouseLeave}
            >
              {/* <CardActionArea
            sx={{  textDecoration: 'none', textAlign: 'center', height: '0%', width: '100%', borderRadius: "10px"  }}
          > */}
              {/* <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}> */}
              <CardMedia sx={{ p: 0 }}>
                <Box
                  component="img"
                  src={card.photo.preview}
                  // alt={card.title}
                  // sx={{ width: '100%', height: '100%' }}
                  sx={{ objectFit: 'cover', borderRadius: '10px' }}
                />
              </CardMedia>
              {/* </Card> */}
              {/* </CardActionArea> */}

              {hoveredCardId === card.galleryId && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    bgcolor: 'rgba(0, 0, 0, 0.5)',
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

      {galleryDataPhotos.length === 0 && (
        <EmptyContent title="No Images" description="There is no data available." sx={{ py: 0 }} />
      )}

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            // border: '2px solid #000',
            borderRadius: '20px',
            boxShadow: 24,
            p: 4,
          }}
        >
          <IconButton
            sx={{
              position: 'absolute',
              bgcolor: 'rgba(255, 255, 255, 0.5)',
              color: 'black',
              top: 5,
              right: 5,
              zIndex: '2',
              '&:hover': {
                color: 'white',
                bgcolor: 'red',
                '& .MuiSvgIcon-root': {
                  animation: `${shake} 0.5s`,
                  animationIterationCount: 'initial',
                },
              },
            }}
            onClick={() => {
              handleClose();
            }}
          >
            <CloseIcon />
          </IconButton>
          {selectedCard && (
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
              <img
                src={selectedCard.photo.preview}
                alt={selectedCard.photo.blob}
                style={{ width: '100%' }}
              />
            </Box>
          )}
        </Box>
      </Modal>
    </Box>
  );
}

GalleryImages.propTypes = {
  galleryDataPhotos: PropTypes.object,
  deleter: PropTypes.func,
};
