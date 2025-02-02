import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

export default function EmergancyServiceCards({stateName}) {
  const { open, openPaymentModal, user } = useAuthContext();

  const handleCardClick = (url) => {
    const arr = url.split('/');

    if (open) {
      openPaymentModal();
    } else if (arr[0] === '') {
      window.open(url, '_self');
    } else {
      window.open(url, '_blank');
    }
  };

  console.log("stateName", user)

  const { cards } = useGetCards('Emergency Ambulance Service',stateName || user?.UserAddressesses[0]?.userState );

  console.log(cards);

  return (
    <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
      {cards.map((card) => (
        <Grid
          item
          key={card.routeTypeId}
          xs={12}
          sm={8}
          md={4}
          lg={3}
          sx={{
            borderRadius: '20px',
            // border: "1px solid red",
            // boxShadow: '4px 4px 6px rgba(0, 0, 0, 0.1)',
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            padding: '0 !important',
            margin: '0 !important',
            transition: 'transform 0.4s ease-in', // Add transition for smooth scaling
            '&:hover': {
              transform: { xs: 'scale(1)', md: 'scale(1.05)' }, // Scale the grid item on hover
            },
          }}
        >
          <Link
            onClick={() => handleCardClick(card.cardUrl)}
            style={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
          >
            <Card sx={{ height: '100%', width: '100%' }}>
              <CardMedia sx={{ p: 1 }}>
                <Box component="img" src={card?.cardImage?.imageUrl} alt={card.cardName} />
              </CardMedia>
              <CardContent sx={{ pt: 1 }}>
                <Typography variant="h5">{card.cardName}</Typography>
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
                  {card.cardDescription}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

EmergancyServiceCards.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
