import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import WorkReviewItem from './work-review-item';

// ----------------------------------------------------------------------

export default function WorkReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <WorkReviewItem key={review.id} review={review} />
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

WorkReviewList.propTypes = {
  reviews: PropTypes.array,
};
