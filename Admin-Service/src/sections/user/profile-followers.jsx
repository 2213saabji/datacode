import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import UserProfileUpdateForm from './user-profile-update-form';
// ----------------------------------------------------------------------

export default function ProfileEdit({ newVoter, setNewVoter, voter, candidates }) {
  return (
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
      }}
    >
      <UserProfileUpdateForm
        candidates={candidates}
        voter={voter}
        newVoter={newVoter}
        setNewVoter={setNewVoter}
      />
    </Box>
  );
}
ProfileEdit.propTypes = {
  voter: PropTypes.object,
  candidates: PropTypes.object,
  newVoter: PropTypes.object,
  setNewVoter: PropTypes.func,
};
