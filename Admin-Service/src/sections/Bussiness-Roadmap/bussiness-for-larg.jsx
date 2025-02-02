import PropTypes from 'prop-types';
 
import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import BussinessCard from "./bussiness-card-component"
 
export default function BusinessForLarge({stateName}) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Large Scale Business', stateName || user?.UserAddressesses[0]?.userState);
 
  return (
    <Box>
       <BussinessCard cards={cards} />
  </Box>
  );
}
 
BusinessForLarge.propTypes = {
  stateName: PropTypes.string, 
};
 
 
 