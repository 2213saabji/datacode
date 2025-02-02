import React from 'react';

import { Box } from '@mui/system';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

export default function WomanEmpowerment() {
  const theme = useTheme();

  return (
    <Box
      sx={{
        ...bgGradient({
          color: alpha(theme.palette.grey[900], 0),
          imgUrl: '/assets/images/womanEmpowerment/Women_2Empowerment.webp',
        }),
        boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
        height: { md: 260 },
        py: { xs: 10, md: 0 },
        overflow: 'hidden',
        position: 'relative',
        borderRadius: 2,
        mb: 3,
      }}
    />
  );
}
