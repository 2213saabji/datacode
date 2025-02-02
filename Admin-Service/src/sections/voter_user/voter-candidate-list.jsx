// import PropTypes from 'prop-types';
// import { useState } from 'react';

// import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Box, Stack } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { Card, Avatar, Button, Typography } from '@mui/material';

// import { useNavigate } from 'react-router';
import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

// import { _socials } from 'src/_mock';
import { voter_candidates } from 'src/_mock/votercandidate';

// import Iconify from 'src/components/iconify';

// import VoterCandidateProfile from './voter-candidate-profile';

// ----------------------------------------------------------------------

export default function VoterCandidateList() {
  // const { user } = useAuthContext();
  // const [open, setOpen] = useState(false);
  // const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);

  // const router = useRouter()
  // const handleOpen = (index) => {
  //   setSelectedCandidateIndex(index);
  //   // setOpen(true);
  //   router.push(paths.dashboard.voterview.info(encodeURIComponent(JSON.stringify(voter_candidates))))
  // };
  // const handleClose = () => setOpen(false);
  // const handleOpen = () => setOpen(true);

  return (
    <>
      {/* {!open ?
        ( */}
      <Grid
        container
        spacing={3}
        position="relative"
        p={2}
        gap={6}
        // border='1px solid red'
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {voter_candidates.map((item, index) => (
          <Card sx={{ boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)' }}>
            <Stack direction="column" justifyContent="space-between" sx={{}}>
              <Box
                sx={{
                  // position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  // p: 1,
                  mb: 2,
                  height: '100%', // Ensure the Box takes full height of the card
                }}
              >
                <Box
                  sx={{
                    width: '100%',
                    height: '240px',
                    backgroundImage: `url(${item.logo})`,
                    backgroundSize: 'cover', // Optional: Adjust background size as needed
                    backgroundPosition: 'center',
                  }}
                />

                <Box
                  sx={{
                    bottom: 180,
                    mt: -4,
                    zIndex: 9,
                    borderRadius: '50%',
                    border: '10px solid white',
                    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                  }}
                >
                  <Avatar alt="image" src={item.candidatePhoto} />
                </Box>

                <Stack direction="column" alignItems="center" justifyContent="center" mt={2}>
                  <Typography variant="h6">{item.candidateName}</Typography>

                  <Typography>{item.title}</Typography>

                  {/* <Stack direction="row" gap={1} mt={1}>
                    {_socials.map((action) => (
                      <Iconify icon={action.icon} sx={{ color: action.color, width: '20px' }} />
                    ))}
                  </Stack> */}

                  {/* <Divider/> */}
                  <Box
                    display="flex"
                    textAlign="start"
                    justifyContent="center"
                    mt={3}
                    sx={{ width: '270px', p: 1 }}
                  >
                    {/* <Button variant='contained' onClick={()=>handleOpen(index)} sx={{ bgcolor: '#6f8fd6', borderRadius: '20px', p: "0 5px", }}>Detail Information</Button> */}
                    <Button
                      variant="contained"
                      component={Link}
                      to={paths.dashboard.voterview.info(
                        encodeURIComponent(JSON.stringify(item.index))
                      )}
                      sx={{ bgcolor: '#6f8fd6', borderRadius: '20px', p: '5px 10px' }}
                    >
                      Detail Information
                    </Button>
                  </Box>
                </Stack>
              </Box>
            </Stack>
          </Card>
        ))}
      </Grid>
    </>
  );
}
VoterCandidateList.propTypes = {
  // voter: PropTypes.object,
  // candidates: PropTypes.object,
};
