import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

import CategoryReviewItem from './category-review-item';

// ----------------------------------------------------------------------

export default function CategoryReviewList({ reviews }) {
  return (
    <>
      {reviews.map((review) => (
        <CategoryReviewItem key={review.id} review={review} />
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

CategoryReviewList.propTypes = {
  reviews: PropTypes.array,
};
