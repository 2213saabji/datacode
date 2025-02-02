import React from 'react';
import PropTypes from 'prop-types';
 
import { Box } from '@mui/system';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import WomenCard from './women-card-component';
 
export default function WomanEmpowermentReproductive({stateName}) {
  const {user } = useAuthContext();

 
  const { cards } = useGetCards('Heathcare & Reproductive Rights', stateName || user?.UserAddressesses[0]?.userState);
  return (
    <Box>
      <WomenCard cards={cards} />
    </Box>
  );
}
 
 
WomanEmpowermentReproductive.propTypes = {
  stateName: PropTypes.string, 
};
 