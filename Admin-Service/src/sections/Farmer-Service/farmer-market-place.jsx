 
import PropTypes from 'prop-types';
 
import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import FarmerCard from "./former-card-component"
 
export default function FarmerMarketPlace({ stateName }) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Farmer MarketPlace', stateName || user?.UserAddressesses[0]?.userState);
   
  return (
    
    <Box>
       <FarmerCard cards={cards} />
  </Box>
  );
}
 
FarmerMarketPlace.propTypes = {
  stateName: PropTypes.string,
};
 
 