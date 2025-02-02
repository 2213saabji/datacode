import { Box, Button, Container } from '@mui/material';
 
import { RouterLink } from 'src/routes/components';
 
import DocterServiceCards from '../docter-service-card';
import DocterServicesBanner from '../docter-service-banner';
 
export default function DocterServices() {
  return (
    <>
      <DocterServicesBanner />
 
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
 
      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 4, md: 5 },
          position: 'relative',
        }}
      >
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
          <DocterServiceCards />
        </Box>
      </Container>
    </>
  );
}
 
 