import Box from '@mui/material/Box';

import CandidateNewEditForm from './candidate-new-edit-form';

// ----------------------------------------------------------------------

export default function CandidateEdit(candidates) {
  // Do api call here

  return (
    // <>
    <Box
      gap={3}
      display="grid"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(1, 1fr)',
      }}
    >
      {/* Pass Props HEre  */}
      <CandidateNewEditForm currentCandidate={candidates} />
    </Box>
    // </>
  );
}
