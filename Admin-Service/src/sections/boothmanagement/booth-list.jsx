import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

// import BoothItem from './booth-item';
// import { BoothItemSkeleton } from './booth-skeleton';

// ----------------------------------------------------------------------

export default function BoothList({ products, loading, ...other }) {
  const renderSkeleton = (
    <>
      {/* {[...Array(16)].map((_, index) => (
        <BoothItemSkeleton key={index} />
      ))} */}
    </>
  );

  const renderList = (
    <>
      {/* {products.map((product) => (
        <BoothItem key={product.id} product={product} />
      ))} */}
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

BoothList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};
