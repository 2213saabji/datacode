// import PropTypes from 'prop-types';

// import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';

import { bgGradient } from 'src/theme/css';
import { GetVoterReferral } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';

// ----------------------------------------------------------------------

export default function BankingInviteFriends() {
  const theme = useTheme();
  // const [url, setUrl] = useState('')
  const { user } = useAuthContext();

  const handleShare = async () => {
    try {
      const response = await GetVoterReferral(user?.accessToken);
      const token = response?.data?.data?.referralToken;
      const URL =
        import.meta.env.VITE_NODE_ENV === 'PROD'
          ? `https://app.attplems.com/auth/jwt/register?referralToken=${token}`
          : `https://appdev.attplems.com/auth/jwt/register?referralToken=${token}`;
      sessionStorage.setItem('referralURL', URL);
      // setUrl(`https://app.attplems.com/auth/jwt/register?referralToken=${token}`)
      // console.log("voterReferral----->", response)
      if (navigator.share) {
        await navigator.share({
          title: 'Share Example',
          text: 'Check out this link!',
          url: URL,
        });
        // console.log('------------->', navigator.share)
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
      // Fallback for browsers that do not support Web Share API
      alert('Your browser does not support sharing.');
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionStorage.getItem('referralURL'));
    enqueueSnackbar('Invite link copied');
  };

  return (
    <Box>
      <Box
        component="img"
        alt="invite"
        src="/assets/illustrations/characters/character_11.png"
        sx={{
          left: 40,
          zIndex: 9,
          width: 130,
          position: 'relative',
          filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.24))',
          mt: 1,
          // p:2
        }}
      />

      <Box
        sx={{
          mt: -15,
          color: 'common.white',
          borderRadius: 2,
          p: theme.spacing(16, 7, 6, 6),
          ...bgGradient({
            direction: '135deg',
            // startColor: theme.palette.primary.main,
            // endColor: theme.palette.primary.dark,
            startColor: 'white',
            endColor: '#0001',
          }),
          boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Box sx={{ whiteSpace: 'pre-line', typography: 'h4', width: '120px', color: 'black' }}>
            Invite friends and earn
          </Box>
          <Box sx={{ typography: 'h2', color: '#ffab00' }}>₹10.</Box>
        </Stack>

        {/* <Box sx={{ mt: 2, mb: 3, typography: 'body2' }}>{description}</Box> */}

        <InputBase
          fullWidth
          placeholder="Invite Link"
          value={sessionStorage.getItem('referralURL')}
          endAdornment={
            <Button
              color="warning"
              variant="contained"
              size="small"
              sx={{ mr: 0.5, ml: 2 }}
              onClick={sessionStorage.getItem('referralURL') ? handleCopy : handleShare}
            >
              {sessionStorage.getItem('referralURL') ? 'Copy' : 'Invite'}
            </Button>
          }
          sx={{
            pl: 1.5,
            mt: 3,
            height: 40,
            borderRadius: 1,
            bgcolor: 'common.white',
            textOverflow: 'ellipsis',
            boxShadow: '0 0 5px #0005',
            // flex: 1,
            // minWidth: 0,
          }}
        />

            <Button
              color="warning"
              variant="contained"
              size="small"
              sx={{ mr: 0.5, ml: 2 }}
              // onClick={}
            >
              Share
            </Button>
      </Box>
    </Box>
  );
}

BankingInviteFriends.propTypes = {
  // description: PropTypes.string,
  // img: PropTypes.string,
  // price: PropTypes.string,
  // sx: PropTypes.object,
  // title: PropTypes.string,
};
