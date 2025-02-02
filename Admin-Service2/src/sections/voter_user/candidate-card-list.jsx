// import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { Grid, Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';

import { _socials } from 'src/_mock';
import { bgGradient } from 'src/theme/css';
import { AvatarShape } from 'src/assets/illustrations';
import { voter_candidates } from 'src/_mock/votercandidate';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function CandidateCard({ candidateData }) {
  const voter_candidatess =
    candidateData && candidateData?.CandidateProfiles
      ? candidateData?.CandidateProfiles
      : voter_candidates;
  const theme = useTheme();

  // const [open, setOpen] = useState(false);
  // const [selectedCandidateIndex, setSelectedCandidateIndex] = useState(null);

  // const router = useRouter()
  // const handleOpen = (index) => {
  //   setSelectedCandidateIndex(index);
  //   router.push(paths.dashboard.voterview.info(encodeURIComponent(JSON.stringify(voter_candidates))))
  // };

  return (
    <Grid
      container
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
      {voter_candidatess.map((item, index) => (
        <Card key={index} sx={{ textAlign: 'center' }}>
          <Box sx={{ position: 'relative' }}>
            <AvatarShape
              sx={{
                left: 0,
                right: 0,
                zIndex: 10,
                mx: 'auto',
                bottom: -26,
                position: 'absolute',
              }}
            />
            <Avatar
              // alt={name}
              src={item?.User?.UserProfile?.userProfileImageDetails?.preview}
              sx={{
                width: 64,
                height: 64,
                zIndex: 11,
                left: 0,
                right: 0,
                bottom: -32,
                mx: 'auto',
                position: 'absolute',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.5)',
              }}
            />

            <Image
              src={item?.PartyDetail?.partySymbolImageDetails?.preview}
              ratio="16/9"
              overlay={alpha(theme.palette.grey[900], 0.38)}
            />
          </Box>

          <ListItemText
            sx={{ mt: 7, mb: 1 }}
            primary={item?.User?.UserProfile?.firstName}
            secondary={item?.User?.UserProfile?.currentJobTitle}
            primaryTypographyProps={{ typography: 'subtitle1' }}
            secondaryTypographyProps={{ component: 'span', mt: 0.5 }}
          />

          <Stack direction="row" alignItems="center" justifyContent="center" sx={{ mb: 2.5 }}>
            {_socials.map((social) => (
              <IconButton
                key={social.name}
                sx={{
                  color: social.color,
                  '&:hover': {
                    bgcolor: alpha(social.color, 0.08),
                  },
                }}
              >
                <Iconify icon={social.icon} />
              </IconButton>
            ))}
          </Stack>

          <Button
            variant="contained"
            component={Link}
            to={paths.dashboard.voterview.info(
              encodeURIComponent(JSON.stringify(item?.candidateProfileId || item?.index))
            )}
            sx={{
              borderRadius: '20px',
              p: '5px 10px',
              mb: 2,
              ...bgGradient({
                direction: '135deg',
                startColor: theme.palette.primary.main,
                endColor: theme.palette.primary.dark,
              }),
            }}
          >
            Detail Information
          </Button>
        </Card>
      ))}
    </Grid>
  );
}

CandidateCard.propTypes = {
  // user: PropTypes.object,
  candidateData: PropTypes.object,
};
