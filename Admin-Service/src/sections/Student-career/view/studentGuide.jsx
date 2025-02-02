import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/system';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import StudentCard from '../student_card_component';

export default function StudentGuide({stateName}) {
  const { user } = useAuthContext();

  console.log("stateName", user)

  const { cards } = useGetCards('Student Guide', stateName || user?.UserAddressesses[0]?.userState);

  console.log(cards);

  return (
    <Box>
    <StudentCard cards={cards} />
  </Box>
  );
}


StudentGuide.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
