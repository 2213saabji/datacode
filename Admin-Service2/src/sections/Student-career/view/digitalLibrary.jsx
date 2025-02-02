import PropTypes from 'prop-types';

import { Box } from '@mui/system';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import StudentCard from '../student_card_component';

export default function DigitalLibrary({stateName}) {
  const { user } = useAuthContext();

  console.log("stateName", user)

  const { cards } = useGetCards(' Digital Library', stateName|| user?.UserAddressesses[0]?.userState);

  return (
    <Box>
      <StudentCard cards={cards} />
  </Box>
  );
}

DigitalLibrary.propTypes = {
  stateName: PropTypes.string, 
};
