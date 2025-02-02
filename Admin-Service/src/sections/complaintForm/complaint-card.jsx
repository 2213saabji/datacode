import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Stack } from '@mui/system';
import {
  Card,
  Grid,
  Dialog,
  Button,
  CardMedia,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

function ComplaintCard({ cards }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentNavigate, setCurrentNavigate] = useState(null);
  const [currentEmail, setCurrentEmail] = useState(null);

  const navigate = useNavigate();

  const handleCardClick = (navigateUrl, complainMail, stateComplainMail) => {
    const emailToUse = complainMail || stateComplainMail;
    console.log("navigateUrl", navigateUrl)
    setCurrentNavigate(navigateUrl);
    setCurrentEmail(emailToUse);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
  };

  const handlePrimaryButtonClick = () => {
    sessionStorage.setItem('complaintEmail', currentEmail);
    setDialogOpen(false);
    navigate('/dashboard/mail_form');
  };

  const handleSecondaryButtonClick = (url) => {
    window.open(url, '_blank');
    setDialogOpen(false);
  };

  return (
    <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
      {cards.map((card) => (
        <Grid
          key={card.id}
          item
          xs={12}
          sm={8}
          md={4}
          lg={3}
          sx={{
            borderRadius: '20px',
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            padding: '0 !important',
            margin: '0 !important',
            transition: 'transform 0.4s ease-in',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Stack
            onClick={() =>
              handleCardClick(
                card.cardUrl,
                card.complainMailDetails?.mailTo,
                card.mailDetails?.mailTo
              )
            }
            style={{ cursor: 'pointer' }}
          >
            <Card sx={{ height: '100%', width: '100%' }}>
              <CardMedia sx={{ p: 1 }}>
                <Box component="img" src={card?.cardImage?.url} alt={card.cardName} />
              </CardMedia>
              <CardContent sx={{ pt: 1 }}>
                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: { xs: 3, md: 2 },
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    fontWeight: 'bold',
                    textAlign: 'center',
                    fontSize: '16px',
                    textTransform: 'capitalize',
                    color: '#000'
                  }}
                >
                  {card.cardName}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      ))}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle id="alert-dialog-title">Select To Register Your Complaint!</DialogTitle>
        <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
          <Button onClick={handlePrimaryButtonClick} color="primary">
            Complaint Via Mail
          </Button>
          <Button onClick={() => handleSecondaryButtonClick(currentNavigate)} color="secondary">
            Complaint Via Portal
          </Button>
        </DialogActions>
      </Dialog>
    </Grid>
  );
}

ComplaintCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      cardUrl: PropTypes.string.isRequired,
      cardImage: PropTypes.shape({
        url: PropTypes.string,
      }),
      cardName: PropTypes.string,
      cardDescription: PropTypes.string.isRequired,
      complainMailDetails: PropTypes.shape({
        mailTo: PropTypes.string.isRequired,
      }).isRequired,
      mailDetails: PropTypes.shape({
        mailTo: PropTypes.string.isRequired,
      }).isRequired,
    })
  ).isRequired,
};

export default ComplaintCard;
