import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

export default function HealthTipsCards({stateName}) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Health Tips', stateName || user?.UserAddressesses[0]?.userState);
  // const cardsData = [
  //   {
  //     id: 1,
  //     title: 'Homeopathy',
  //     description: 'Boost your immune system with natural remedies and individualized care in homeopathy.',
  //     path: '/assets/images/Appointment/homeopathy.jpg',
  //     navigate: 'https://nch.org.in/',
  //   },
  //   {
  //     id: 2,
  //     title: 'Allopathic',
  //     description: 'Follow prescribed medications and regular check-ups for effective and evidence-based allopathic treatment.',
  //     path: '/assets/images/Appointment/allopathic.jpg',
  //     navigate: 'https://www.nmc.org.in/',
  //   },
  //   {
  //     id: 3,
  //     title: 'Ayurvedic',
  //     description: 'Incorporate a balanced diet, daily exercise, and natural herbs for holistic wellness in Ayurvedic practice.',
  //     path: '/assets/images/Appointment/Ayurvedic.jpg',
  //     navigate: 'https://www.ccimindia.org.in/',
  //   },

  // ];

  return (
    <Grid container sx={{ mt: 5, gridGap: 24, justifyContent: 'space-evenly' }}>
      {cards.map((card) => (
        <Grid
          item
          key={card.id}
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
            to={card?.cardUrl}
            target="_blank"
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

HealthTipsCards.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
