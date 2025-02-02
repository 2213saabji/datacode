import { useState } from 'react';
import PropTypes from 'prop-types';
 
import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import TrainTravels from '../train-travels';
import TuorAndTravelsCard from "../tour-travels-card-component"
 
export default function TourTravelsService({stateName}) {
  const { user } = useAuthContext();
  console.log("Tour & Travels Service stateName", user)
  const { cards } = useGetCards('Tour & Travels Service',stateName || user?.UserAddressesses[0]?.userState );
  const [toggle, settoggle] = useState(false);
 
 
 
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
      {!toggle ? (
        // <Box>
        //   <Typography
        //     variant="h4"
        //     sx={{ color: '#078dee', borderBottom: '2.5px solid #078dee', width: 'fit-content' }}
        //   >
        //     Farmer Career Roadmap
        //   </Typography>
        //   <Grid container spacing={2} sx={{ mt: 2, gridGap: 20, justifyContent: 'space-evenly' }}>
        //     {cards.map((card) => (
        //       <Grid
        //         item
        //         key={card.routeTypeId}
        //         xs={10}
        //         sm={8}
        //         md={4}
        //         lg={3}
        //         sx={{
        //           borderRadius: '20px',
        //           boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
        //           padding: '0 !important',
        //           margin: '0 !important',
        //         }}
        //       >
        //         <CardActionArea
        //           onClick={() => handleCardClick(card.cardUrl)}
        //           sx={{
        //             textDecoration: 'none',
        //             textAlign: 'center',
        //             height: '100%',
        //             width: '100%',
        //           }}
        //         >
        //           <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}>
        //             <CardMedia sx={{ p: 1 }}>
        //               <Box
        //                 component="img"
        //                 src={card?.cardImage?.imageUrl}
        //                 alt={card.cardName}
        //                 height={150}
        //               />
        //             </CardMedia>
        //             <CardContent>
        //               <Typography variant="h5">{card.cardName}</Typography>
        //               <Typography
        //                 variant="body2"
        //                 color="textSecondary"
        //                 sx={{
        //                   display: '-webkit-box',
        //                   WebkitLineClamp: 3,
        //                   WebkitBoxOrient: 'vertical',
        //                   overflow: 'hidden',
        //                   textOverflow: 'ellipsis',
        //                 }}
        //               >
        //                 {card.cardDescription}
        //               </Typography>
        //             </CardContent>
        //           </Card>
        //         </CardActionArea>
        //       </Grid>
        //     ))}
        //   </Grid>
        // </Box>
        <Box>
    <TuorAndTravelsCard cards={cards} />
  </Box>
      ) : (
        <TrainTravels settoggle={settoggle} />
      )}
    </>
  );
}
 
TourTravelsService.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
 
 