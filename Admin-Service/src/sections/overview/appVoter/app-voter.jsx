import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';
// import Grid from '@mui/material/Unstable_Grid2';
import IconButton from '@mui/material/IconButton';

import { usePathname } from 'src/routes/hooks';

import { _socials } from 'src/_mock';

// import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------

export default function Footer() {
  const pathname = usePathname();

  const homePage = pathname === '/';
  const handleButtonClick = (event, path) => {
    event.preventDefault();
    window.open(path, '_blank');
  };

  const simpleFooter = (
    <Box
      component="footer"
      sx={{
        py: 5,
        textAlign: 'center',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    />
  );
  const mainFooter = (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Divider />

      <Container
        sx={{
          pt: 3,
          pb: 2,
          textAlign: { xs: 'center', md: 'center' },
        }}
      >
        <Typography variant="h7" sx={{ mt: 5 }}>
          Visit the Flag above for solution of your problems.
        </Typography>
        <Typography variant="h6" sx={{ mt: 1, whiteSpace: 'pre-line' }}>
          You Can Follow us on :{' '}
        </Typography>
        <Stack
          direction="row"
          justifyContent={{ xs: 'center', md: 'center' }}
          sx={{
            mt: 1,
            mb: { xs: 5, md: 0 },
          }}
        >
          {_socials.map((social) => (
            <IconButton
              key={social.name}
              onClick={(event) => handleButtonClick(event, social.path)}
              sx={{
                '&:hover': {
                  bgcolor: alpha(social.color, 0.08),
                },
              }}
            >
              <Iconify color={social.color} icon={social.icon} width={30} height={30} />
            </IconButton>
          ))}
        </Stack>
        <Typography variant="body2" sx={{ mt: 1 }}>
          © 2024. All rights reserved by ATTPLEMS
        </Typography>
      </Container>
    </Box>
  );

  return homePage ? simpleFooter : mainFooter;
}
