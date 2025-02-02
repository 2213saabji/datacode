import { Helmet } from 'react-helmet-async';

import DeliveryTripListView from 'src/sections/delivery-service/view/delivery-trip-list-view';
// ----------------------------------------------------------------------

export default function AmbulanceTripManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Delivery List</title>
      </Helmet>

      <DeliveryTripListView />
    </>
  );
}
