import React from 'react';
import PropTypes from 'prop-types';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import DocterCard from './docter-card';
 
export default function EmergancyServiceCards({stateName}) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Docter Services', stateName || user?.UserAddressesses[0]?.userState);
 
  return (
    <DocterCard cards={cards}/>
  );
}
 
EmergancyServiceCards.propTypes = {
  stateName: PropTypes.string, 
};
 