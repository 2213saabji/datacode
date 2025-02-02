import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { varFade } from 'src/components/animate';

// ----------------------------------------------------------------------

export default function FarmerHero({ currentTab }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0),
          imgUrl: '/assets/images/FarmerLabour/Banner.png',
        }),
        boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
        height: { md: 260 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        scale: 0.5,
        borderRadius: { xs: 0, md: 2 },
      }}
    />
  );
}

FarmerHero.propTypes = {
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
