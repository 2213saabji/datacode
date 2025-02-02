import PropTypes from 'prop-types';

import Pagination, { paginationClasses } from '@mui/material/Pagination';

// ----------------------------------------------------------------------

export default function VehicleList({ products, loading, ...other }) {
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

VehicleList.propTypes = {
  loading: PropTypes.bool,
  products: PropTypes.array,
};
