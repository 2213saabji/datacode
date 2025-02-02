import PropTypes from 'prop-types';

import { Box, Grid, Card, CardMedia, Typography, CardContent, CardActionArea } from '@mui/material';

export default function TrainTravels({ settoggle }) {
  // const cardsData = [
  //   { id: 1,  description: 'RedRail aims to make train travel booking in India more accessible and convenient, leveraging the reliability and widespread network of Indian Railways.', navigate: `https://www.redbus.in/railways`, path: '/assets/images/tourAndTravels/TrainBooking.png' },
  //   { id: 2,  description: `IRCTC aims to enhance the travel experience by providing a range of services that simplify train travel and tourism in India.`, navigate: `https://www.irctc.co.in/nget/train-search`, path: '/assets/images/tourAndTravels/TrainBooking-1.png' },
  //   { id: 3,  description: `RailYatri aims to make train travel in India more convenient and enjoyable by providing a range of services that cater to the needs of railway passengers.`, navigate: `https://www.railyatri.in/`, path: '/assets/images/tourAndTravels/TrainBooking-2.png' },
  // ];

  const cardsData = [
    {
      id: 1,
      description:
        'RedRail aims to make train travel booking in India more accessible and convenient, leveraging the reliability and widespread network of Indian Railways.',
      navigate: `https://www.redbus.in/railways`,
      path: '/assets/images/tourAndTravels2/trainBookingService2/4.png',
    },
    // { id: 2,  description: `IRCTC aims to enhance the travel experience by providing a range of services that simplify train travel and tourism in India.`, navigate: `https://www.irctc.co.in/nget/train-search`, path: '/assets/images/tourAndTravels2/trainBookingService2/5.png' },
    // { id: 3,  description: `RailYatri aims to make train travel in India more convenient and enjoyable by providing a range of services that cater to the needs of railway passengers.`, navigate: `https://www.railyatri.in/`, path: '/assets/images/tourAndTravels2/trainBookingService2/6.png' },
  ];

  const handleCardClick = (id) => {
    window.open(cardsData.find((card) => card.id === id).navigate, '_blank');
  };
  return (
    <Box>
      {/* <Typography variant='h4' sx={{ color: "#078dee", borderBottom: "2.5px solid #078dee", width: "fit-content" }}>Farmer Market Place</Typography>
      <Button sx={{ mt: 2 }} onClick={() => settoggle(false)}><ReplyAllIcon /></Button> */}
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
    </Box>
  );
}

TrainTravels.propTypes = {
  settoggle: PropTypes.object,
};
