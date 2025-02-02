import React from 'react';
import PropTypes from 'prop-types';

import { Box,Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import GovSchemeHero from '../govScheme-hero';
import GovSchemeCard from '../govScheme-card';

export default function GovtSchemeView({ stateName }) {
  const { user } = useAuthContext();
  console.log("GovtSchemeView stateName", user);

  // Fetch cards based on the state name or user's default state
  const { cards } = useGetCards('Government Scheme', stateName || user?.UserAddressesses[0]?.userState);

  return (
    <>
      <GovSchemeHero />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <Box>
        <GovSchemeCard cards={cards} />
      </Box>
    </>
  );
}

GovtSchemeView.propTypes = {
  stateName: PropTypes.string,
};

