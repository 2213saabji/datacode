import PropTypes from 'prop-types';

import { Stack } from '@mui/system';
import { CardHeader } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function VoterCandidateAbout({ candidateAbout }) {
  const renderProfile = (
    <Grid container spacing={3} sx={{ maxWidth: 400 }}>
      <Stack sx={{ width: '100%' }}>
        <CardHeader title="About" />
        <CardHeader title="Description" />
      </Stack>
      <Stack spacing={2} sx={{ p: 3 }}>
        {/* It Will be updated when there is clerification for the description */}
        {/* <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
          {item==="0" && <Typography sx={{  minWidth: 180 }}>
            He is an Indian politician who has served as the 14th prime minister of India since May
            2014. Modi was the chief minister of Gujarat from 2001 to 2014 and is the Member of
            Parliament (MP) for Varanasi.
          </Typography>}
          {item==="1" && <Typography sx={{ minWidth: 180 }}>
          Rahul Gandhi is a prominent Indian politician, part of the Nehru-Gandhi political dynasty. 
          Born on June 19, 1970, in New Delhi, India, he hails from a family deeply entrenched in Indian politics,
           including his grandmother, Indira Gandhi, and great-grandfather, Jawaharlal Nehru, both former Prime Ministers of India.
        
          </Typography>}
          {item==="2" && <Typography sx={{  minWidth: 180 }}>
          Arvind Kejriwal is an Indian politician and the current Chief Minister of Delhi.
          He is the founder of the Aam Aadmi Party (AAP), which emerged as a significant force in Indian 
            politics, especially in Delhi. Kejriwal first rose to prominence during the anti-corruption 
            movement led by activist Anna Hazare. He became Chief Minister of Delhi in December 2013 but 
            resigned after 49 days. However, he was re-elected in February 2015 and has since focused 
            on issues such as education, healthcare, and public services in Delhi. 
          </Typography>}
        </Stack> */}
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="ic:baseline-account-circle" width={24} sx={{ mr: 3 }} />
          {candidateAbout[0]?.User?.UserProfile?.nationality}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 3 }} />
          {candidateAbout[0]?.User?.email}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="ic:baseline-account-circle" width={24} sx={{ mr: 3 }} />
          {candidateAbout[0]?.User?.UserProfile?.currentJobTitle}
        </Stack>
        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="ic:baseline-account-circle" width={24} sx={{ mr: 3 }} />
          {candidateAbout[0]?.User?.UserProfile?.highestQualification}
        </Stack>
      </Stack>
    </Grid>
  );

  return (
    <Grid>
      <Grid
        container
        spacing={3}
        p={2}
        gap={6}
        display="grid"
        borderRadius="none"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(1, 1fr)',
          md: 'repeat(2, 1fr)',
        }}
      >
        <Stack spacing={2} gridColumn="span 2">
          {renderProfile}
        </Stack>
      </Grid>
    </Grid>
  );
}
VoterCandidateAbout.propTypes = {
  // voter: PropTypes.object,
  // candidates: PropTypes.object,
  candidateAbout: PropTypes.object,
};
