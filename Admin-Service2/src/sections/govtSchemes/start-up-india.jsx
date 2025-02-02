import { useParams } from 'react-router-dom';

import { Box, Card, Grid, Stack, Button, CardMedia, Typography, CardContent } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import GovSchemeHero from './govScheme-hero';

export default function StartUpIndia() {
  const { name } = useParams();
  const { user } = useAuthContext();
  const { cards } = useGetCards(name, user?.UserAddressesses?.[0]?.userState);
  console.log("startup", name);

  const handleCardClick = (card) => {
    if (card) {
      window.open(card, '_blank');
    }
  };

  return (
    <>

    <GovSchemeHero />

    <Button
      component={RouterLink}
      to="/dashboard/GovtScheme"
      variant="outlined"
      color="primary"
      style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
    >
      Back to card
    </Button>
    
    <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
      {cards.map((card) => (
        <Grid
          key={card.routeTypeId}
          item
          xs={12}
          sm={8}
          md={4}
          lg={3}
          sx={{
            borderRadius: '20px',
            boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
            '&:hover': { transform: 'scale(1.05)' },
          }}
        >
          <Stack onClick={() => handleCardClick(card?.cardUrl)} style={{ cursor: 'pointer' }}>
            <Card>
              <CardMedia>
                <Box component="img" src={card?.cardImage?.imageUrl} alt={card.cardName} />
              </CardMedia>
              <CardContent>
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
                  {card.cardName}
                </Typography>
              </CardContent>
            </Card>
          </Stack>
        </Grid>
      ))}
    </Grid>
    </>
  );
}



