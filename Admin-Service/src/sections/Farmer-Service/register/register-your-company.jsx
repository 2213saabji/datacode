import PropTypes from 'prop-types';

// import ReplyAllIcon from '@mui/icons-material/ReplyAll';
import { Box } from '@mui/material';

import { FarmerRegListView } from './view';

export default function RegisterYourCompany({ settoggle }) {
  return (
    <Box>
      <FarmerRegListView />
    </Box>
  );
}

RegisterYourCompany.propTypes = {
  settoggle: PropTypes.object,
};
