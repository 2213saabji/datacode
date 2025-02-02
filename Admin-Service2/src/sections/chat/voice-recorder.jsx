import PropTypes from 'prop-types';
import AudioPlayer from 'material-ui-audio-player';
import { Box, Grid, Paper } from '@material-ui/core';

export default function RegisPlayer({ size = 'default', color = '', src, ...rest }) {
  const minWidth = {
    small: 220,
    default: 250,
    large: 320,
  }[size];

  const paperStyle = {
    minWidth,
  };

  return (
    <Paper elevation={4} style={paperStyle}>
      <Box>
        <Grid container alignItems="center">
          <Grid item xs>
            <AudioPlayer src={src} variation="primary" elevation={0} spacing={1} />
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

RegisPlayer.propTypes = {
  size: PropTypes.oneOf(['small', 'default', 'large', 'inherit']),
  src: PropTypes.string.isRequired,
  elevation: PropTypes.number,
  color: PropTypes.string,
};
