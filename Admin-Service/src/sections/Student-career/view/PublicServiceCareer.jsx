import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/system';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import StudentCard from '../student_card_component';

export default function PublicServiceCareer({stateName}) {
  const { user } = useAuthContext();

  console.log("stateName", user)
  const { cards } = useGetCards('Public Service Careers',stateName || user?.UserAddressesses[0]?.userState);

  console.log(cards);

  return (
    <Box>
      <StudentCard cards={cards} />
  </Box>
  );
}

PublicServiceCareer.propTypes = {
  stateName: PropTypes.string, // Add stateName prop type validation
};
