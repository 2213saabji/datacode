import PropTypes from 'prop-types';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';
import { bgGradient } from 'src/theme/css';
import { Box } from '@mui/system';
import Image from 'src/components/image';

// ----------------------------------------------------------------------

export default function AppWelcome({ title, description, action, img, ...other }) {
  const theme = useTheme();

  return (
    <Stack
      alignItems="center"
      flexDirection={{ xs: 'column', md: 'row' }}
      sx={{
        ...bgGradient({
          direction: '135deg',
          startColor: alpha(theme.palette.primary.light, 0.2),
          endColor: alpha(theme.palette.primary.main, 0.2),
        }),
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        color: 'primary.darker',
        backgroundColor: 'common.white',
        overflow: 'hidden',
        position: 'relative',
      }}
      {...other}
    >
      <Stack
        flexGrow={1}
        justifyContent="center"
        alignItems={{ xs: 'center', md: 'flex-start' }}
        sx={{
          p: { xs: theme.spacing(4, 2), md: theme.spacing(6) },
          textAlign: { xs: 'center', md: 'left' },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            mb: 2,
            whiteSpace: 'pre-line',
            ml: { xs: 0, md: 2 },
            fontWeight: 'bold',
          }}
        >
          {title}
        </Typography>

        <Typography
          variant="body2"
          sx={{
            opacity: 0.8,
            maxWidth: { xs: '100%', md: 450 },
            mb: { xs: 3, xl: 5 },
            pl: { xs: 0, md: 1 },
          }}
        >
          {description}
        </Typography>

        {action}
      </Stack>

      {img && (
        <Box sx={{ width: { xs: 240, sm: 250, md: 450 }, height: 'auto', mx: 2 }}>
          <Image
            alt={title}
            src={img}
            sx={{
              borderRadius: 2,
              transition: 'transform 0.3s ease-in-out',
              '&:hover': { transform: 'scale(1.05)' },
            }}
          />
        </Box>
      )}
    </Stack>
  );
}

AppWelcome.propTypes = {
  img: PropTypes.node,
  action: PropTypes.node,
  title: PropTypes.string,
  description: PropTypes.string,
};
