import { m } from 'framer-motion';
import PropTypes from 'prop-types';
 
import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import { varFade } from 'src/components/animate';
 
import BussinessCard from "./bussiness-card-component"
 
// ----------------------------------------------------------------------
 
export default function BussinessForSmall({ stateName }) {
  const { user } = useAuthContext();
  const { cards } = useGetCards('Small Scale Business', stateName || user?.UserAddressesses[0]?.userState);
 
  return (
    <Box>
       <BussinessCard cards={cards} />
  </Box>
  );
}
 
BussinessForSmall.propTypes = {
  stateName: PropTypes.string
};
 
// ----------------------------------------------------------------------
 
function TextAnimate({ text, variants, sx, ...other }) {
  return (
    <Box
      component={m.div}
      sx={{
        typography: 'h2',
        overflow: 'hidden',
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      {text.split('').map((letter, index) => (
        <m.span key={index} variants={variants || varFade().inUp}>
          {letter}
        </m.span>
      ))}
    </Box>
  );
}
 
TextAnimate.propTypes = {
  sx: PropTypes.object,
  text: PropTypes.string,
  variants: PropTypes.object,
  currentTab: PropTypes.string,
};
 
 