import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function CandidateProfileCover({ coverUrl, candidatePhoto, candidateName, title }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.0.1)',
        ...bgGradient({
          color: alpha(theme.palette.primary.dark, 0.5),
          imgUrl: coverUrl,
        }),
        height: 1,
        color: 'common.white',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        sx={{
          left: { md: 24 },
          bottom: { md: 24 },
          zIndex: { md: 10 },
          pt: { xs: 6, md: 0 },
          position: { md: 'absolute' },
        }}
      >
        <Avatar
          // alt={name}
          src={candidatePhoto}
          sx={{
            mx: 'auto',
            width: { xs: 64, md: 128 },
            height: { xs: 64, md: 128 },
            border: `solid 2px ${theme.palette.common.white}`,
          }}
        >
          {/* {name?.charAt(0).toUpperCase()} */}
        </Avatar>

        <ListItemText
          sx={{
            mt: 3,
            ml: { md: 3 },
            textShadow: '2px 2px 4px rgba(0, 0, 0, 1)',
            textAlign: { xs: 'center', md: 'unset' },
            fontWeight: '700',
          }}
          primary={candidateName}
          secondary={title}
          primaryTypographyProps={{
            typography: 'h4',
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            color: 'inherit',
            component: 'span',
            typography: 'body2',
            sx: { opacity: 0.48 },
          }}
        />
      </Stack>
    </Box>
  );
}

CandidateProfileCover.propTypes = {
  candidatePhoto: PropTypes.string,
  coverUrl: PropTypes.string,
  candidateName: PropTypes.string,
  title: PropTypes.string,
};
