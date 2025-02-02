import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import AllFeaturesHero from '../all_features-hero';
import AllFeaturesList from '../all_features-list';

// ----------------------------------------------------------------------

export default function AllFeaturesView() {
  return (
    <>
      <AllFeaturesHero />

      <Container
        sx={{
          pb: 10,
          pt: { xs: 10, md: 15 },
          position: 'relative',
        }}
      >
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(2, 1fr)',
          }}
        >
          <AllFeaturesList />
        </Box>
      </Container>
    </>
  );
}
