import { Box } from '@mui/system';
import Container from '@mui/material/Container';

// import { alpha, useTheme } from '@mui/material/styles';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { bgGradient } from 'src/theme/css';

import VoterSlipNewEditForm from '../VoterSlipNewEditFrom';

export default function votingSlip() {
  // const theme = useTheme();
  return (
    <Container>
      <Box
        sx={{
          ...bgGradient({
            color: 'transparent',
            imgUrl: '/assets/images/voterreferral/Voting_Slip.webp',
          }),
          boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
          height: { md: 260 },
          py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          borderRadius: { xs: 0, md: 2 },
          mb: 5,
        }}
      />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <VoterSlipNewEditForm />
    </Container>
  );
}
