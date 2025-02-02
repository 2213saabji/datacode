import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/system';
import { Button,Container } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import HealthTipsHero from '../HealthTips-hero';
import HealthTipsCompCard from '../HeathTips-card-component';

export default function HealthTipsCards({stateName}) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Health Tips', stateName || user?.UserAddressesses[0]?.userState);

  return (
    <>
    <HealthTipsHero />
 
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
 
      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 4, md: 5 },
          position: 'relative',
        }}
      >
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
        <HealthTipsCompCard cards={cards}/>
        </Box>
      </Container>
      </>
  );
}

HealthTipsCards.propTypes = {
  stateName: PropTypes.string,
};

