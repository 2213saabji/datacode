// import { useState } from 'react';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box } from '@mui/material';

import InstitutionListView from './Institution-list-view';

export default function RegisterYourCompany({ settoggle }) {
  return (
    <Box>
      {/* <EmptyContent
        filled
        title="Coming Soon..."
        sx={{
          py: 10,
        }}
      /> */}
      <InstitutionListView />
    </Box>
  );
}

RegisterYourCompany.propTypes = {
  settoggle: PropTypes.object,
};
