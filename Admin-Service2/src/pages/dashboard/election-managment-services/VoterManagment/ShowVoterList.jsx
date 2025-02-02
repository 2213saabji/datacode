import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { VoterListView } from 'src/sections/voter/view';

// ----------------------------------------------------------------------

export default function VoterListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Voter List</title>
      </Helmet>

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        sx={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mb: 2 }}
      >
        Back
      </Button>

      <VoterListView />
    </>
  );
}
