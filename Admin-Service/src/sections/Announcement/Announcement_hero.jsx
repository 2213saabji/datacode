import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';

import Image from 'src/components/image';
import { varFade } from 'src/components/animate';
// import { borderRadius } from '@mui/system';
// import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AnnouncementHero() {
  return (
    <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
      {/* <Box
        sx={{
          ...bgGradient({
            color: alpha(theme.palette.grey[900], 0),
            imgUrl: '/assets/images/about/315.jpg',
          }),
          boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
          height: { md: 260 },
          py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          scale: 0.5,
          borderRadius: { xs: 0, md: 2 },
          mb: { xs: 3, md: 0 },
          width: { xs: '100%', md: 'calc(50% - 8px)' },
          backgroundSize:'cover'
        }}
      /> */}
      <Image
        src="/assets/images/about/315.jpg"
        sx={{
          boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
          height: { md: 260 },
          // py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          scale: 0.5,
          borderRadius: { xs: 0, md: 2 },
          // mb: { xs: 3, md: 0 },
          width: { xs: '100%', md: 'calc(50% - 8px)' },
        }}
      />

      <Image
        src="/assets/images/about/611.jpg"
        sx={{
          boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
          height: { md: 260 },
          // py: { xs: 10, md: 0 },
          overflow: 'hidden',
          position: 'relative',
          scale: 0.5,
          borderRadius: { xs: 0, md: 2 },
          // mb: { xs: 3, md: 0 },
          width: { xs: '100%', md: 'calc(50% - 8px)' },
        }}
      />
    </Stack>
  );
}

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
