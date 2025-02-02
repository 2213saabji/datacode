/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';

// ----------------------------------------------------------------------

export default function DoctorDetailsHero({ degreeImageDetails, licenseImageDetails, view }) {
  const theme = useTheme();

  const smUp = useResponsive('up', 'sm');
  // console.log("post-details-hero")
  return (
    <Stack direction={{ md: 'row', xs: 'column' }} alignItems="center">
      <Box sx={{ width: { md: '50%', sm: '100%', xs: '100%' } }}>
        {view === 'Doctor' && <Typography sx={{ mb: 2 }}>Degree Image</Typography>}
        {view === 'Employer' && <Typography sx={{ mb: 2 }}>License Front Image</Typography>}
        {degreeImageDetails && (
          <Box
            sx={{
              maxWidth: '500px',
              height: { xs: 250, md: 300 },
              overflow: 'hidden',
              borderRadius: '10px 10px 10px 10px',
              ...bgGradient({
                imgUrl: degreeImageDetails,
                startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
                endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
              }),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </Box>
      <Box sx={{ width: { md: '50%', sm: '100%', xs: '100%' } }}>
        {view === 'Doctor' && <Typography sx={{ mb: 2 }}>License Image</Typography>}
        {view === 'Employer' && <Typography sx={{ mb: 2 }}>License Back Image</Typography>}

        {licenseImageDetails && (
          <Box
            sx={{
              maxWidth: '500px',
              height: { xs: 250, md: 300 },
              overflow: 'hidden',
              borderRadius: '10px 10px 10px 10px',
              ...bgGradient({
                imgUrl: licenseImageDetails,
                startColor: `${alpha(theme.palette.grey[900], 0.64)} 0%`,
                endColor: `${alpha(theme.palette.grey[900], 0.64)} 100%`,
              }),
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
            }}
          />
        )}
      </Box>
    </Stack>
  );
}

DoctorDetailsHero.propTypes = {
  degreeImageDetails: PropTypes.string,
  licenseImageDetails: PropTypes.string,
  view: PropTypes.string,
};
