import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import { keyframes } from '@mui/system';
import Typography from '@mui/material/Typography';

// Define keyframes for the rotation animation
const rotateX = keyframes`
  0% {
    transform: rotateX(0deg);
  }
  100% {
    transform: rotateX(360deg);
  }
`;

const TooltipContent = ({ name, title }) => (
  <Box sx={{}}>
    <Box
      className="icon"
      sx={{
        p: 1,
        mb: 2,
        textAlign: 'center',
        color: '#ca7a1c',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.6), 0 4px 8px rgba(222, 122, 28, 0.6)',
        borderRadius: '0 15px 15px 15px',
        animation: `${rotateX} 1s linear`, // Apply the rotation animation
      }}
    >
      {name}
    </Box>
    <Typography sx={{ fontWeight: 700 }} variant="body2">
      {title}
    </Typography>
  </Box>
);

TooltipContent.propTypes = {
  name: PropTypes.string,
  title: PropTypes.string,
};

export default TooltipContent;
