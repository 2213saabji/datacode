import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link } from 'react-router-dom';

function RouteTab(href) {
  if (href === 'https://affidavit.eci.gov.in/') return true;
  if (href === 'https://attplconsultancy.com/') return true;
  if (href === 'https://attplfinance.com/') return true;
  if (href === 'https://attplsolar.com/') return true;
  if (href === 'https://attplit.com/') return true;
  if (href === 'https://attplinfra.com/') return true;
  if (href === 'https://attplstone.com/') return true;
  return false;
}

// ----------------------------------------------------------------------
const RouterLink = forwardRef(({ href, ...other }, ref) => {
  const targetAttribute = RouteTab(href) ? '_blank' : '_self';
  return <Link ref={ref} to={href} target={targetAttribute} {...other} />;
});

RouterLink.propTypes = {
  href: PropTypes.string,
};

export default RouterLink;
