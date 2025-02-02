import { Helmet } from 'react-helmet-async';

import { DeliveryCreateView } from 'src/sections/delivery-service/view';
// ----------------------------------------------------------------------

export default function DeliveryTripCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new Delivery Request</title>
      </Helmet>

      <DeliveryCreateView />
    </>
  );
}
