import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

export default function AppWelcome({
  title,
  title2,
  newstitle,
  description,
  headertitle,
  govtTitle,
  action,
  img,
  newsImage,
  ...other
}) {
  const theme = useTheme();

  return (
    <Stack
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        borderRadius: 3,
        overflow: 'hidden',
        position: 'relative',
        color: 'primary.darker',
        backgroundColor: 'common.white',
        boxShadow: '0px 0px 10px 3px rgba(0,0,0,0.1)',
        height: { md: 1 },
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: {
            xs: theme.spacing(5, 3),
            md: theme.spacing(3),
          },
          // p:2,
          textAlign: { xs: 'center', md: 'left' },
          zIndex: 1,
        }}
      >
        <Typography variant="h3" sx={{ mb: 1, color: 'text.primary' }}>
          {title}
        </Typography>

        <Typography variant="h5" sx={{ mb: 1, color: 'text.secondary' }}>
          {title2}
        </Typography>

        <Typography variant="body1" sx={{ mb: 1, color: 'text.secondary' }}>
          {newstitle}
        </Typography>

        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark', fontWeight: 'bold' }}>
          {govtTitle}
        </Typography>

        <Typography variant="h6" sx={{ mb: 1, color: 'primary.dark', fontWeight: 'bold' }}>
          {headertitle}
        </Typography>

        <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary', maxWidth:500 }}>
          {description}
        </Typography>

        {action && (
          <Box sx={{ mt: 3 }}>
            <Button variant="contained" color="primary" size="large">
              {action}
            </Button>
          </Box>
        )}
      </Stack>

      {img && (
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            flexGrow: 1,
            p: { xs: 0, sm:2, md: 3 },
            // bgcolor: 'background.default',
            borderRadius: 2,
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <Box sx={{ width: '100%', height: 'auto' }}>{img}</Box>
        </Stack>
      )}
    </Stack>
  );
}

AppWelcome.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  title2: PropTypes.string,
  newstitle: PropTypes.string,
  headertitle: PropTypes.string,
  govtTitle: PropTypes.string,
  newsImage: PropTypes.string,
  description: PropTypes.string,
};
