import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { Box, Grid, Card, CardMedia, Typography, CardContent } from '@mui/material';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function BusinessLoan({ currentTab }) {
  const cardsData = [
    {
      id: 1,
      title: 'attplfinacee',
      description:
        'Offers advice, insights, and resources for small business owners and entrepreneurs in India',
      navigate: '',
      icon: 5,
      path: '/assets/images/business/Entreprenuer.png',
    },

    {
      id: 2,
      title: 'MSME Ministry Portal',
      description:
        'Official portal of the Ministry of Micro, Small and Medium Enterprises (MSME) of the Government of India, providing information and support for small businesses',
      navigate: 'https://www.herofincorp.com/business-loan',
      icon: 5,
      path: '/assets/images/business/MSME Ministry Portral.png',
    },

    {
      id: 3,
      title: 'Raleigh',
      description: 'Ready to start your new business in Raleigh?  Let us help!.',
      navigate: 'https://www.bajajfinserv.in/business-loan',
      icon: 5,
      path: '/assets/images/business/Raleigh.png',
    },
  ];
  return (
    <Box>
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
              marginTop: '10px !important',
            }}
          >
            <Link
              to={card.navigate}
              target="_blank"
              style={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
            >
              <Card sx={{ height: '100%', width: '100%' }}>
                <CardMedia sx={{ p: 2 }}>
                  <Box component="img" src={card.path} alt={card.title} />
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
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

BusinessLoan.propTypes = {
  currentTab: PropTypes.string,
};

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h2',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
  currentTab: PropTypes.string,
};
