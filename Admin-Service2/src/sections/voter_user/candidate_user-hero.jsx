import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { varFade, MotionContainer } from 'src/components/animate';
// import { borderRadius } from '@mui/system';
// import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function CandidateUserHero({ currentTab }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0.8),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
        height: { md: 260 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 2,
      }}
    >
      <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <div>
            <TextAnimate
              text="Candidate"
              sx={{ color: 'primary.main' }}
              variants={varFade().inRight}
            />
            <br />
            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <TextAnimate text="Profile" />
            </Stack>
          </div>
        </Box>
      </Container>
    </Box>
  );
}

CandidateUserHero.propTypes = {
  currentTab: PropTypes.string,
};

// ----------------------------------------------------------------------

function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h2',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}

TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
  currentTab: PropTypes.string,
};
