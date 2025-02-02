import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import ClaimReviewItem from './claim-review-item';

// ----------------------------------------------------------------------

export default function ClaimReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <ClaimReviewItem key={review.id} review={review} />
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

ClaimReviewList.propTypes = {
  reviews: PropTypes.array,
};
