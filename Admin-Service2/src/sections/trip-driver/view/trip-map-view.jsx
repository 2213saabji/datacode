import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

// Changed to useGetTrip

import { Stack } from '@mui/system';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// Changed to TripNewEditForm
// import MapRoute from '../trip-route-map';

// ----------------------------------------------------------------------

export default function TripRouteMapView() {
  // Changed function name to TripEditView
  const settings = useSettingsContext();

  //   const { trip: currentTrip } = useGetTrip(id); // Changed to useGetTrip
  //  console.log(currentTrip);
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="TRIP ROUTE " // Changed heading
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Trip', // Changed to Trip
            href: paths.dashboard.tripdriver.root, // Changed to paths.dashboard.trip.root
          },
          //   { name: currentTrip?.data.tripId }, // Changed to currentTrip
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack sx={{ height: '500px' }}>{/* <MapRoute /> */}</Stack>
    </Container>
  );
}
