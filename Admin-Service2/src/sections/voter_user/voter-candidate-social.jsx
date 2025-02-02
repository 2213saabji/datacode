// import PropTypes from 'prop-types';
// import { useState } from 'react';

import { Stack, alpha } from '@mui/system';
import Grid from '@mui/material/Unstable_Grid2';
import { CardHeader, IconButton } from '@mui/material';

import { _socials } from 'src/_mock';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function VoterCandidateSocial() {
  const handleButtonClick = (event, path) => {
    event.preventDefault();
    window.open(path, '_blank');
  };

  const renderProfile = (
    <Grid container spacing={3} sx={{ maxWidth: 300 }}>
      <Stack sx={{ width: '100%' }}>
        <CardHeader title="Social" />
        {/* <CardHeader title="Description" /> */}
      </Stack>
      <Stack
        direction="row"
        justifyContent={{ xs: 'center', md: 'center' }}
        sx={{
          mt: 2,
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
            <Iconify color={social.color} icon={social.icon} />
          </IconButton>
        ))}
      </Stack>
      {/* <Stack spacing={2} sx={{ p: 3 }}>
            <Stack direction="row" sx={{ typography: 'body2' }}>
              <Iconify icon="eva:facebook-fill" width={24} sx={{ mr: 3 }} />
               https://www.facebook.com/attplgroup
            </Stack>
            <Stack direction="row" sx={{ typography: 'body2' }}>
              <Iconify icon="ant-design:instagram-filled" width={24} sx={{ mr: 3 }} />
             https://www.instagram.com/attplgroup/
            </Stack>
            <Stack direction="row" sx={{ typography: 'body2' }}>
              <Iconify icon="eva:linkedin-fill" width={24} sx={{ mr: 3 }} />
             https://www.linkedin.com/company/attplgroup/
            </Stack>
            <Stack direction="row" sx={{ typography: 'body2' }}>
              <Iconify icon="eva:twitter-fill" width={24} sx={{ mr: 3 }} />
              https://twitter.com/attplgroup
            </Stack>
      </Stack> */}
    </Grid>
  );

  return (
    <Grid
      container
      spacing={3}
      p={2}
      gap={6}
      display="grid"
      borderRadius="none"
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
      }}
    >
      <Stack spacing={2} gridColumn="span 2">
        {renderProfile}
      </Stack>
    </Grid>
  );
}
VoterCandidateSocial.propTypes = {
  // voter: PropTypes.object,
  // candidates: PropTypes.object,
};
