import PropTypes from 'prop-types';
 
import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import FarmerCard from "./former-card-component"
 
export default function FarmerSeeds({stateName}) {
  const {user } = useAuthContext();
  const { cards } = useGetCards('Farmer Guide',stateName || user?.UserAddressesses[0]?.userState);

 
  return (
    <Box>
       <FarmerCard cards={cards} />
  </Box>
  );
}
FarmerSeeds.propTypes = {
  stateName: PropTypes.string, 
};
 
 
 