import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import CategoryItem from './category-item';
import { CategoryItemSkeleton } from './category-skeleton';

// ----------------------------------------------------------------------

export default function CategoryList({ products, loading, ...other }) {
  const renderSkeleton = (
    <>
      {[...Array(16)].map((_, index) => (
        <CategoryItemSkeleton key={index} />
      ))}
    </>
  );

  const renderList = (
    <>
      {products.map((product) => (
        <CategoryItem key={product.id} product={product} />
      ))}
    </>
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
          lg: 'repeat(4, 1fr)',
        }}
        {...other}
      >
        {loading ? renderSkeleton : renderList}
      </Box>

      {products.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

CategoryList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};
