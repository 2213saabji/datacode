import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import BasicFeaturesHero from '../basic_features-hero';
import BasicFeaturesList from '../basic_features-list';

// ----------------------------------------------------------------------

export default function BasicFeaturesView() {
  return (
    <>
      <BasicFeaturesHero />

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
          <BasicFeaturesList />
        </Box>
      </Container>
    </>
  );
}
