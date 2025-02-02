import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
// import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

// import { paths } from 'src/routes/paths';

// import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { bgGradient } from 'src/theme/css';
// import { useAuthContext } from 'src/auth/hooks';

// import { useState } from 'react';
import ReactPlayer from 'react-player';
// import { useState, useEffect } from 'react';

import { Button } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';

import Logo from 'src/components/logo';
// import { height, width } from '@mui/system';
// import { border } from '@mui/system';

// ----------------------------------------------------------------------

// const METHODS = [
//   {
//     id: 'jwt',
//     label: 'Jwt',
//     path: paths.auth.jwt.login,
//     icon: '/assets/icons/auth/ic_jwt.svg',
//   },
//   {
//     id: 'firebase',
//     label: 'Firebase',
//     path: paths.auth.firebase.login,
//     icon: '/assets/icons/auth/ic_firebase.svg',
//   },
//   {
//     id: 'amplify',
//     label: 'Amplify',
//     path: paths.auth.amplify.login,
//     icon: '/assets/icons/auth/ic_amplify.svg',
//   },
//   {
//     id: 'auth0',
//     label: 'Auth0',
//     path: paths.auth.auth0.login,
//     icon: '/assets/icons/auth/ic_auth0.svg',
//   },
//   {
//     id: 'supabase',
//     label: 'Supabase',
//     path: paths.auth.supabase.login,
//     icon: '/assets/icons/auth/ic_supabase.svg',
//   },
// ];
export default function AuthClassicLayout({ children, image, title }) {
  const { toggling } = useAuthContext();
  const theme = useTheme();

  const mdUp = useResponsive('up', 'md');

  // const [supportsPWA, setSupportsPWA] = useState(false);
  // const [promptInstall, setPromptInstall] = useState(null);

  // useEffect(() => {
  //   const handler = (e) => {
  //     e.preventDefault();
  //     console.log('Installation prompt was triggered');
  //     setSupportsPWA(true);
  //     setPromptInstall(e);
  //   };
  //   window.addEventListener('beforeinstallprompt', handler);

  //   return () => window.removeEventListener('beforeinstallprompt', handler);
  // }, []);

  // const onhandleDownloadApp = (evt) => {
  //   evt.preventDefault();
  //   if (!promptInstall) {
  //     console.log('The deferred prompt is not available');
  //     return;
  //   }
  //   promptInstall.prompt();
  // };

  // if (!supportsPWA) {
  //   return null;
  // }
  const renderLogo = (
    <Logo
      sx={{
        zIndex: 9,
        position: 'absolute',
        m: { xs: 3, md: 5 },
        // mt:{xs:5},
      }}
    />
  );

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,

        pl: { xs: 3, md: 'auto' },
        pr: { xs: 3, md: 15 },
        pt: { xs: 15, md: 20 },
        pb: { xs: 15, md: 0 },
        // border:"2px solid red",
      }}
    >
      {children}
    </Stack>
  );

  const renderSection = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      {/* <Typography variant="h3" sx={{ maxWidth: 480, textAlign: 'center' }}>
        {title}
      </Typography> */}

      <Box
        // component="img"
        alt="auth"
        // src={image || '/assets/illustrations/illustration_dashboard.png'}
        sx={{
          maxWidth: {
            xs: 480,
            lg: 560,
            xl: 720,
          },
        }}
      />

      {/* <Stack>SCAN TO INSTALL THE APP</Stack> */}
      <Stack sx={{ mt: -2 }} alignItems="center" spacing={2} direction="column">
        <Box
          component="img"
          src={image || '/assets/images/install_qr_code/Install_app_.png'}
          alt="Install App QR Code"
          sx={{ width: '100%', maxWidth: 300 }}
        />
        <Stack>SCAN TO INSTALL THE APP</Stack>
        {/* <LoadingButton type="submit" variant="contained" onClick={onhandleDownloadApp}>
          Install App
        </LoadingButton> */}
      </Stack>

      {/* Login Page icons */}

      {/* <Stack direction="row" spacing={2}>
        {METHODS.map((option) => (
          <Tooltip key={option.label} title={option.label}>
            <Link component={RouterLink} href={option.path}>
              <Box
                component="img"
                alt={option.label}
                src={option.icon}
                sx={{
                  width: 32,
                  height: 32,
                  ...(method !== option.id && {
                    filter: 'grayscale(100%)',
                  }),
                }}
              />
            </Link>
          </Tooltip>
        ))}
      </Stack> */}
    </Stack>
  );
  const handleWatchButtonClick = () => {
    window.open('https://www.youtube.com/@attplgroup/shorts', '_blank');
  };

  const renderVideo = (
    <Stack
      flexGrow={1}
      spacing={10}
      alignItems="center"
      justifyContent="center"
      sx={{
        ...bgGradient({
          color: alpha(
            theme.palette.background.default,
            theme.palette.mode === 'light' ? 0.88 : 0.94
          ),
          imgUrl: '/assets/background/overlay_2.jpg',
        }),
      }}
    >
      <Stack sx={{ height: '80%', width: '60%', padding: '10px' }}>
        <div style={{ borderRadius: '10px', overflow: 'hidden', height: '100%', width: '100%' }}>
          <ReactPlayer
            url="https://www.youtube.com/watch?v=q0FBL3fXECA"
            width="100%"
            height="100%"
            playing
            loop
            muted
          />
        </div>
        <Button
          sx={{
            width: '20%',
            height: '45px',
            margin: 'auto',
            mt: 8,
            fontSize: 18,
            background: '#078dee',
          }}
          variant="contained"
          onClick={handleWatchButtonClick}
        >
          Watch
        </Button>
        <Typography sx={{ mt: 1, fontSize: 18, fontWeight: 400, textAlign: 'center' }}>
          Whether the leader has won or lost, get all your personal and regional work done through
          your favorite leader for just 1 rupee for a full 5 years. Install ATTPL EMS now for more
          information. See the YouTube link.
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      sx={{
        minHeight: '100vh',
      }}
    >
      {renderLogo}

      {toggling && mdUp && renderSection}
      {!toggling && mdUp && renderVideo}
      {renderContent}
    </Stack>
  );
}

AuthClassicLayout.propTypes = {
  children: PropTypes.node,
  image: PropTypes.string,
  title: PropTypes.string,
};
