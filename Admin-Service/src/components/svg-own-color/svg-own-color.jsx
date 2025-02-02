import PropTypes from 'prop-types';
import { forwardRef } from 'react';

// ----------------------------------------------------------------------

const SvgOwnColor = forwardRef(({ src, sx, ...other }, ref) => (
  <span
    ref={ref}
    className="svg-color"
    style={{
      display: 'inline-block',
      width: 24,
      height: 24,
      color: 'currentColor',
      ...sx,
    }}
    {...other}
  >
    <img src={src} alt="" style={{ width: '100%', height: '100%' }} />
  </span>
));

SvgOwnColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgOwnColor;
