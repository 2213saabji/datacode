import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ModelReviewItem from './model-review-item';

// ----------------------------------------------------------------------

export default function ModelReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <ModelReviewItem key={review.id} review={review} />
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

ModelReviewList.propTypes = {
  reviews: PropTypes.array,
};
