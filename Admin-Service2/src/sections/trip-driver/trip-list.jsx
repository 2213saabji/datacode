import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

// ----------------------------------------------------------------------

export default function TripDriverList({ products, loading, ...other }) {
  return (
    <>
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

TripDriverList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};
