import React from 'react';
import PropTypes from 'prop-types';

import { Box } from '@mui/system';

import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';

import StudentCard from '../student_card_component';

export default function HealthCareer({stateName}) {
  const { user } = useAuthContext();

  //   const arr = url.split('/');

  //   if (open) {
  //     openPaymentModal();
  //   } else if (arr[0] === '') {
  //     window.open(url, '_self');
  //   } else {
  //     window.open(url, '_blank');
  //   }
  // };
  console.log("stateName", user)

  const { cards } = useGetCards('Medical Careers', stateName || user?.UserAddressesses[0]?.userState);

  console.log(cards);

  return (
    <Box>
      <StudentCard cards={cards} />
  </Box>
  );
}
HealthCareer.propTypes = {
  stateName: PropTypes.string,
};
