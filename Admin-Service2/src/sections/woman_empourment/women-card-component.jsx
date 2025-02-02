import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Card,
  Grid,
  Stack,
  Button,
  Dialog,
  CardMedia,
  Typography,
  CardContent,
  DialogTitle,
  DialogActions,
} from '@mui/material';

function WomenCard({ cards }) {
  
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentNavigate, setCurrentNavigate] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const navigate = useNavigate();

  const handleCardClick = (card) => {
    setCurrentNavigate(card.cardUrl);
    setSelectedCard(card);
    setDialogOpen(true);
  };

const handlePrimaryButtonClick = () => {
    if (selectedCard?.applyUrl) {
      window.open(selectedCard.applyUrl, '_blank'); 
    }
    setDialogOpen(false);
  };

  const handleSecondaryButtonClick = () => {
    window.open(currentNavigate, '_blank');
    setDialogOpen(false);
  };

  useEffect(() => {
    if (selectedCard && !selectedCard.applyUrl) {
      if (selectedCard.cardUrl.startsWith('http')) {
        window.open(selectedCard.cardUrl, '_blank');
      } else {
        navigate(selectedCard.cardUrl);
      }
    }
  }, [selectedCard, currentNavigate, navigate]);

  return (
    <>
      <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
        {cards.map((card) => (
          <Grid
            key={card.routeTypeId}
            item
            xs={12}
            sm={8}
            md={4}
            lg={3}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          >
            <Stack onClick={() => handleCardClick(card)} style={{ cursor: 'pointer' }}>
              <Card>
                <CardMedia>
                  <Box component="img" src={card?.cardImage?.imageUrl} alt={card.cardName} />
                </CardMedia>
                <CardContent>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: { xs: 3, md: 2 },
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {card.cardName}
                  </Typography>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        ))}
      </Grid>

      {selectedCard && selectedCard.applyUrl &&  (
  <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
    <DialogTitle>Select Your {selectedCard.cardName}</DialogTitle>
    <DialogActions sx={{ display: 'flex', justifyContent: 'space-around' }}>
      <Button onClick={handlePrimaryButtonClick} color="primary">
        Want to Contact
      </Button>
      <Button onClick={handleSecondaryButtonClick} color="secondary">
        Want to Explore
      </Button>
    </DialogActions>
  </Dialog>
)}
    </>
  );
}

WomenCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      routeTypeId: PropTypes.number.isRequired,
      cardUrl: PropTypes.string.isRequired,
      cardImage: PropTypes.shape({ imageUrl: PropTypes.string }),
      cardName: PropTypes.string,
      cardDescription: PropTypes.string.isRequired,
      complainMailDetails: PropTypes.shape({ mailTo: PropTypes.string.isRequired }),
      mailDetails: PropTypes.shape({ mailTo: PropTypes.string.isRequired }),
    })
  ).isRequired,
};

export default WomenCard;
