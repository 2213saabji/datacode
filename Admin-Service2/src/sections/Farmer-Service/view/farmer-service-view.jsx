import { useState } from 'react';

import { Box, Grid, Card, CardMedia, Typography, CardContent, CardActionArea } from '@mui/material';

import FarmerMarketPlace from '../farmer-market-place';

export default function FarmerService() {
  const [toggle, settoggle] = useState(false);

  const cardsData = [
    {
      id: 1,
      title: 'Guide for Seed Usage',
      description:
        'This guide will sprout your knowledge on using seeds! Learn how to select seeds, prepare for planting, nurture seedlings, and watch your garden flourish. From seed selection to harvest, this guide is your companion for a successful planting adventure.',
      navigate: 'https://www.gardeners.com/',
      path: '/assets/images/FarmerLabour/Guid_seed_usage.png',
    },
    {
      id: 2,
      title: 'Manual for Fertilizer Application',
      description:
        'This manual is your recipe for healthy, thriving plants. Unleash the potential of your garden by learning how to choose the right fertilizer, apply it effectively, and ensure optimal nutrient delivery for flourishing crops and dazzling blooms.',
      navigate: 'https://enam.gov.in/web/resources/manual',
      path: '/assets/images/FarmerLabour/FertilizerApplication.jpg',
    },
    {
      id: 3,
      title: 'Instructions for Pesticide Management',
      description:
        'This guide equips you for responsible pest control. Learn how to identify pests, choose the least-toxic solutions, apply pesticides safely and effectively, and safeguard your garden and your health. Protect your plants while prioritizing a healthy environment.',
      navigate:
        'https://ppqs.gov.in/divisions/integrated-pest-management/instruction-safe-use-pesticide',
      path: '/assets/images/FarmerLabour/PestManagement.png',
    },
    {
      id: 4,
      title: 'Farmer Marketplace',
      description:
        'This guide empowers you to navigate the exciting world of Farmer Marketplaces! Learn how to become a vendor, showcase your freshest produce, connect with local customers, and build a thriving farm business. We will guide you through everything from setting up your booth to maximizing sales, making your Farmer Marketplace experience a success.',
      navigateComp: true,
      path: '/assets/images/FarmerLabour/FarmerMarketplace.png',
    },
    {
      id: 5,
      title: 'Entrepreneurial Training for Farmers',
      description:
        'Turn your passion into profit! This program equips farmers with the skills to manage, market, and grow their businesses. Learn how to write a business plan, manage finances, and reach new customers. Take your farm to the next level.',
      navigate: 'https://nfu.org/',
      path: '/assets/images/FarmerLabour/EnterpreneurialTraining.jpeg',
    },
    {
      id: 6,
      title: 'Building Your Farm',
      description:
        'Plan your dream farm: size, location, and style.  Craft a business plan for success: goals, finances, and sales strategy.  Secure resources and start small, scaling up as you grow.',
      navigate: 'https://agriwelfare.gov.in/',
      path: '/assets/images/FarmerLabour/buildingfarm.png',
    },
  ];

  const handleCardClick = (id) => {
    if (id === 4) {
      settoggle(true);
    } else {
      window.open(cardsData.find((card) => card.id === id).navigate, '_blank');
    }
  };

  return (
    <>
      {!toggle ? (
        <Box>
          <Typography
            variant="h4"
            sx={{ color: '#078dee', borderBottom: '2.5px solid #078dee', width: 'fit-content' }}
          >
            Farmer Career Roadmap
          </Typography>
          <Grid container spacing={2} sx={{ mt: 2, gridGap: 20, justifyContent: 'space-evenly' }}>
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
                <CardActionArea
                  onClick={() => handleCardClick(card.id)}
                  sx={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}>
                    <CardMedia sx={{ p: 1 }}>
                      <Box component="img" src={card.path} alt={card.title} height={150} />
                    </CardMedia>
                    <CardContent>
                      <Typography variant="h5">{card.title}</Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        sx={{
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
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
      ) : (
        <FarmerMarketPlace settoggle={settoggle} />
      )}
    </>
  );
}
