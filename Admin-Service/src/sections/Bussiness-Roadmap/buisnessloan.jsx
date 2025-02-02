import { m } from 'framer-motion';
import PropTypes from 'prop-types';

import { Box } from '@mui/material';
 
import { useGetCards } from 'src/api/blog';
import { useAuthContext } from 'src/auth/hooks';
 
import { varFade } from 'src/components/animate';
 
import BussinessCard from "./bussiness-card-component"
 
// ----------------------------------------------------------------------
 
export default function BussinessLoan({ stateName }) {
  const { user } = useAuthContext();
   const { cards } = useGetCards('Loan', stateName || user?.UserAddressesses[0]?.userState);
 
 
  console.log(cards);
 
  return (
    <Box>
       <BussinessCard cards={cards} />
  </Box>
  );
}
 
BussinessLoan.propTypes = {
  stateName: PropTypes.string, 
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
 
 
 