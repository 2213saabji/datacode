// import { useState } from 'react';
import PropTypes from 'prop-types';
 
import {
  Box,
  // Grid,
  // Card,
  Button,
  // CardMedia,
  // Typography,
  // CardContent,
  // CardActionArea,
} from '@mui/material';
 
import { RouterLink } from 'src/routes/components';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
// import BusTravels from '../bus-travels';
// import TrainTravels from '../train-travels';
// import FlightTravels from '../flight-travels';
import TourAndTravelsHero from '../tour_travels-hero';
import TuorAndTravelsCard from "../tour-travels-card-component"
 
export default function CreateTourAndTravels({stateName}) {
  // const [togal, setTogal] = useState(null);
  const { user } = useAuthContext();
  console.log("stateName", user?.UserAddressesses[0]?.userState)
 
  const { cards } = useGetCards('Tour & Travels Service', stateName || user?.UserAddressesses[0]?.userState);
 
  console.log(cards);
 
 
  // const handleCardClick = (url) => {
  //   const arr = url.split('/');
 
  //   if (open) {
  //     openPaymentModal();
  //   } else if (arr[0] === '') {
  //     window.open(url, '_self');
  //   } else {
  //     window.open(url, '_blank');
  //   }
  // };
 
  return (
    <>
      <TourAndTravelsHero />
 
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
 
      {/* <Box sx={{ mt: 5 }}>
        {!togal && (
          <Grid container sx={{ gridGap: 16, justifyContent: 'space-evenly' }}>
            {cards.map((card) => (
              <Grid
                item
                key={card.routeTypeId}
                xs={10}
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
                }}
              >
                <CardActionArea
                  onClick={() => handleCardClick(card.cardUrl)}
                  sx={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}>
                    <CardMedia sx={{ p: 1 }}>
                      <Box component="img" src={card?.cardImage?.imageUrl} alt={card.cardName} />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h6">{card.cardName}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                        }}
                      >
                        {card.cardDescription}
                      </Typography>
                    </CardContent>
                  </Card>
                </CardActionArea>
              </Grid>
            ))}
          </Grid>
        )}
 
        {togal && (
          <Button
            type="button"
            onClick={() => {
              setTogal(false);
            }}
          >
            Back
          </Button>
        )}
 
        {togal === 1 && <BusTravels />}
 
        {togal === 2 && <FlightTravels />}
 
        {togal === 3 && <TrainTravels />}
      </Box> */}
      <Box>
    <TuorAndTravelsCard cards={cards} />
  </Box>
    </>
  );
}
 
CreateTourAndTravels.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
 
 