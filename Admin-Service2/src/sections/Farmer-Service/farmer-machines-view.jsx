
import PropTypes from 'prop-types';

import { Box } from '@mui/material';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import FarmerCard from "./former-card-component"

export default function FarmerMachines({stateName }) {
  const {user } = useAuthContext();
  const { cards } = useGetCards('Agriculture Equipment',stateName || user?.UserAddressesses[0]?.userState);

  return (
    
    <Box>
      <FarmerCard cards={cards} />
  </Box>
  );
}

FarmerMachines.propTypes = {
  stateName: PropTypes.string,
};
