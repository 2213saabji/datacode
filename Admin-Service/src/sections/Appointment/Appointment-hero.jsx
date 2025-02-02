import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import { varFade } from 'src/components/animate';
// import { borderRadius } from '@mui/system';
// import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function AppointmentHero({ currentTab }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0),
          // imgUrl: '/assets/images/Appointment/Appointment_Bookings.webp',
          imgUrl: '/assets/images/Appointment/Appointment_Booking.webp',
        }),
        boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
        height: { md: 260 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        scale: 0.5,
        borderRadius: { xs: 0, md: 2 },
        marginBottom: 10,
      }}
    >
      {/* <Container component={MotionContainer}>
        <Box
          sx={{
            bottom: { md: 80 },
            position: { md: 'absolute' },
            textAlign: { xs: 'center', md: 'unset' },
          }}
        >
          <div>
            <Typography
              text={currentTab === 'candidatelist' ? "Nominated" : "Your"}
              sx={{ color: 'primary.main',fontSize: '2.8rem',fontWeight:800,textShadow:"5px 5px 18px 8px rgba(0,0,0)" }} variants={varFade().inRight}
            >
              {currentTab === 'candidatelist' ? "Nominated" : "Your"}
            <br />
            <Stack spacing={2} display="inline-flex" direction="row" sx={{ color: 'common.white' }}>
              <Typography sx={{ color: 'primary.main',fontSize: '2.8rem',fontWeight:800, mr:"auto" }} text={currentTab === 'electiondetails' ? "Election" : ""} >{currentTab === 'electiondetails' ? "Election" : ""}</Typography>
              <Typography sx={{ color: 'primary.main',fontSize: '2.8rem',fontWeight:800, mr:"auto" }} text={currentTab === 'wardetails' ? "Ward" : ""} >{currentTab === 'wardetails' ? "Ward" : ""}</Typography>
              <Typography sx={{ color: 'primary.main',fontSize: '2.8rem',fontWeight:800, mr:"auto" }} text={currentTab === 'boothdetails' ? "Booth" : ""} >{currentTab === 'boothdetails' ? "Booth" : ""}</Typography>
              <Typography sx={{ color: 'primary.main',fontSize: '2.8rem',fontWeight:800, mr:"auto" }} text={currentTab === 'candidatelist' ? "Candidate" : ""} >{currentTab === 'candidatelist' ? "Candidate" : ""}</Typography>
            </Stack>
            </Typography>
          </div>
        </Box>
      </Container> */}
      {/* <TextAnimate text={currentTab === 'electiondetails' ? "Election" : ""} />
            <TextAnimate text={currentTab === 'wardetails' ? "Ward" : ""} />
            <TextAnimate text={currentTab === 'boothdetails' ? "Booth" : ""} />
            <TextAnimate text={currentTab === 'candidatelist' ? "Candidate" : ""} /> */}
    </Box>
  );
}

AppointmentHero.propTypes = {
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
