import { Box, Grid, Card, CardMedia, Typography, CardContent, CardActionArea } from '@mui/material';

// import FarmerMarketPlace from './farmer-market-place';

export default function FlightTravels() {
  //  dummy images
  // const cardsData = [
  //   { id: 1,  description: "IndiGo is India's largest and most popular low-cost airline, known for its extensive domestic and international network.", navigate: `https://www.goindigo.in/`, path: '/assets/images/tourAndTravels/FlightBooking.png' },
  //   { id: 2,  description: 'Air India operates an extensive network of domestic and international flights, connecting major cities in India to various destinations across the globe.', navigate: 'https://www.airindia.com/', path: '/assets/images/tourAndTravels/FlightBooking-1.png' },
  //   { id: 3,  description: 'Vistara operates a growing network of domestic and international flights, connecting key cities in India with major destinations around the world.', navigate: `https://www.airvistara.com/in/en`, path: '/assets/images/tourAndTravels/FlightBooking-2.png' },
  // ];

  // real images

  const cardsData = [
    // { id: 1,  description: "IndiGo is India's largest and most popular low-cost airline, known for its extensive domestic and international network.", navigate: `https://www.goindigo.in/`, path: '/assets/images/tourAndTravels2/flightBookingService2/7.png' },
    {
      id: 2,
      description:
        'Air India operates an extensive network of domestic and international flights, connecting major cities in India to various destinations across the globe.',
      navigate: 'https://www.airindia.com/',
      path: '/assets/images/tourAndTravels2/flightBookingService2/8.png',
    },
    // { id: 3,  description: 'Vistara operates a growing network of domestic and international flights, connecting key cities in India with major destinations around the world.', navigate: `https://www.airvistara.com/in/en`, path: '/assets/images/tourAndTravels2/flightBookingService2/9.png' },
  ];

  const handleCardClick = (id) => {
    window.open(cardsData.find((card) => card.id === id).navigate, '_blank');
  };

  return (
    <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
      {cardsData.map((card) => (
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
          <CardActionArea
            onClick={() => handleCardClick(card.id)}
            sx={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
          >
            <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}>
              <CardMedia sx={{ p: 1 }}>
                <Box component="img" src={card.path} alt={card.title} />
              </CardMedia>
              <CardContent>
                <Typography variant="h5">{card.title}</Typography>
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
          </CardActionArea>
        </Grid>
      ))}
    </Grid>
  );
}
