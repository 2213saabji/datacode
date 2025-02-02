import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { _pricingPlans } from 'src/_mock';

import PricingHero from './pricing-hero';
import PricingCard from './pricing-card';

// ----------------------------------------------------------------------

export default function PricingView() {
  return (
    <>
      <PricingHero />

      <Container sx={{ py: 10 }}>
        <Box
          gap={{ xs: 3, md: 0 }}
          display="grid"
          alignItems={{ md: 'center' }}
          gridTemplateColumns={{ md: 'repeat(3, 1fr)' }}
        >
          {_pricingPlans.map((card, index) => (
            <PricingCard key={card.subscription} card={card} index={index} />
          ))}
        </Box>
      </Container>
    </>
  );
}
