import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import TripReviewItem from './trip-item';

// ----------------------------------------------------------------------

export default function TripReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <TripReviewItem key={review.id} review={review} />
      ))}

      <Pagination
        count={10}
        sx={{
          mx: 'auto',
          [`& .${paginationClasses.ul}`]: {
            my: 5,
            mx: 'auto',
            justifyContent: 'center',
          },
        }}
      />
    </>
  );
}

TripReviewList.propTypes = {
  reviews: PropTypes.array,
};
