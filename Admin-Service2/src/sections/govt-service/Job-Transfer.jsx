// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box, Grid, Card, CardMedia, Typography, CardContent } from '@mui/material';

export default function JobTransfer({ settoggle }) {
  const cardsData = [
    {
      id: 1,
      title: 'Tractors',
      description:
        'Versatile machines used for various agricultural tasks such as plowing, planting, and harvesting.',
      navigate: ``,
      path: '/assets/images/FarmerLabour/Agriculture_Equipment.jpg',
    },
    {
      id: 2,
      title: 'Combine Harvesters',
      description:
        'Efficiently harvest grains and other crops by combining reaping, threshing, and winnowing functions.',
      navigate: ``,
      path: '/assets/images/FarmerLabour/CombineHarvestor.png',
    },
    // { id: 3, title: 'Irrigation Systems', description: 'Ensure consistent water supply to crops for optimal growth and yield, reducing dependence on rainfall.', navigate: ``, path: '/assets/images/FarmerLabour/Irrigationsystem.jpg' },
  ];
  return (
    <Box>
      {/* <Typography variant='h4' sx={{ color: "#078dee", borderBottom: "2.5px solid #078dee", width: "fit-content" }}>Farmer Market Place</Typography>
      <Button sx={{ mt: 2 }} onClick={() => settoggle(false)}><ReplyAllIcon /></Button> */}
      <Grid container sx={{ mt: 2, gridGap: 16, justifyContent: 'space-evenly' }}>
        {cardsData.map((card) => (
          <Grid
            item
            key={card.id}
            xs={10}
            sm={8}
            md={4}
            lg={3}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              padding: '0 !important',
              margin: '0 !important',
            }}
          >
            <Link
              to={card.navigate}
              target="_blank"
              style={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
            >
              <Card sx={{ height: '100%', width: '100%' }}>
                <CardMedia sx={{ p: 1 }}>
                  <Box component="img" src={card.path} alt={card.title} height={150} />
                </CardMedia>
                <CardContent>
                  <Typography variant="h5">{card.title}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
      {/* <Typography variant='h4' sx={{color: "#078dee", borderBottom: "2.5px solid #078dee", width: "fit-content"}}>Farmer Equipment</Typography> */}
      {/* <Typography variant='h4' sx={{color: "#078dee", borderBottom: "2.5px solid #078dee", width: "fit-content"}}>Farmer Seeds</Typography> */}
      {/* <Typography variant='h4' sx={{color: "#078dee", borderBottom: "2.5px solid #078dee", width: "fit-content"}}>Farmer marketPlace</Typography> */}
    </Box>
  );
}

JobTransfer.propTypes = {
  settoggle: PropTypes.object,
};
