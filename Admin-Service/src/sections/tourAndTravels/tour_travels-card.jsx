import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Card, Grid, CardMedia, Typography, CardContent } from '@mui/material';

function TourTravelsCard({ cards }) {
  return (
    <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
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
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            padding: '0 !important',
            margin: '0 !important',
            transition: 'transform 0.4s ease-in',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          <Link
            to={card.navigate}
            target="_blank"
            style={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
          >
            <Card sx={{ height: '100%', width: '100%' }}>
              <CardMedia sx={{ p: 1 }}>
                <Box component="img" src={card.path} alt={card.title} />
              </CardMedia>
              <CardContent sx={{ pt: 1 }}>
                {/* <Typography variant="p">
                    {card.title}
                  </Typography> */}
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
                  {card.description}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        </Grid>
      ))}
    </Grid>
  );
}

TourTravelsCard.propTypes = {
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      navigate: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TourTravelsCard;
