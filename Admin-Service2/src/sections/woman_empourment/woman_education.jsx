import PropTypes from 'prop-types';
 
import { Box } from '@mui/system';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import WomenCard from './women-card-component';
 
export default function WomanEducation({ stateName }) {
  const { user } = useAuthContext();
 
  const { cards } = useGetCards(
    'Education & Training',
    stateName || user?.UserAddressesses[0]?.userState
  );
 
 
  return (
    <Box>
      <WomenCard cards={cards} />
    </Box>
  );
}
 
WomanEducation.propTypes = {
  stateName: PropTypes.string,
};
 
 