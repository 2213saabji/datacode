import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import CustomFeaturesHero from '../custom_features-hero';
import CustomFeaturesList from '../custom_features-list';

// ----------------------------------------------------------------------

export default function CustomFeaturesView() {
  return (
    <>
      <CustomFeaturesHero />

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
          <CustomFeaturesList />
        </Box>
      </Container>
    </>
  );
}
