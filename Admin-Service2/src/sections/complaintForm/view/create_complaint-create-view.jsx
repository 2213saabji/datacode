import { useState } from 'react';

import {
  Box,
  Card,
  Grid,
  Button,
  CardMedia,
  Typography,
  CardContent,
  CardActionArea,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useGetCompalints } from 'src/api/blog';

import ComplaintFood from '../complaint-food';
import ComplaintHero from '../complaint-hero';
import ComplaintRoad from '../complaint-road';
import ComplaintLight from '../complaint-light';
import ComplaintWater from '../complaint-water';
import ComplaintHospital from '../complaint-hospital';
import ComplaintEducation from '../complaint-education';
import ComplaintFakeVoting from '../complaint-fake-voting';
import ComplaintGasPipeline from '../complaint-gas-pipeline';
import ComplaintSewageProblem from '../complaint-sewage-problem';

export default function CreateComplaint() {
  const { complaintsCards } = useGetCompalints();
  console.log('complaintsCards', complaintsCards);

  const [togal, setTogal] = useState(null);

  const handleCardClick = (id) => {
    setTogal(id);
    console.log('Clicked card ID:', id);
  };

  return (
    <>
      <ComplaintHero />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2 }}
      >
        Back
      </Button>

      <Box sx={{ mt: 5 }}>
        {!togal && (
          <Grid container sx={{ gridGap: 16, justifyContent: 'space-evenly' }}>
            {complaintsCards.map((card) => (
              <Grid
                item
                key={card.complainSectionRouteId}
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
                  onClick={() => handleCardClick(card.complainSectionRouteId)}
                  sx={{
                    textDecoration: 'none',
                    textAlign: 'center',
                    height: '100%',
                    width: '100%',
                  }}
                >
                  <Card sx={{ height: '100%', width: '100%', borderRadius: '20px' }}>
                    <CardMedia sx={{ p: 1 }}>
                      <Box component="img" src={card?.cardImage.url} alt={card.cardName} />
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
            component={RouterLink}
            // to="/dashboard"
            onClick={() => setTogal(null)}
            variant="outlined"
            color="primary"
            style={{
              textDecoration: 'none',
              width: '120px',
              padding: '3px 5px',
              marginBottom: '10px',
            }}
          >
            Back to card
          </Button>
        )}

        {togal === 1 && <ComplaintHospital id={togal} />}

        {togal === 2 && <ComplaintLight id={togal} />}

        {togal === 3 && <ComplaintWater id={togal} />}

        {togal === 4 && <ComplaintRoad id={togal} />}

        {togal === 5 && <ComplaintEducation id={togal} />}

        {togal === 6 && <ComplaintFood id={togal} />}

        {togal === 7 && <ComplaintSewageProblem id={togal} />}

        {togal === 8 && <ComplaintGasPipeline id={togal} />}

        {togal === 9 && <ComplaintFakeVoting id={togal} />}
      </Box>
    </>
  );
}
