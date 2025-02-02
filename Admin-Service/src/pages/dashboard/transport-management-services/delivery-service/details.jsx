import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import DeliveryTripDetailsView from 'src/sections/delivery-service/view/delivery-trip-details-view';

// ----------------------------------------------------------------------

export default function DeliveryTripDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Delivery Details</title>
      </Helmet>

      <DeliveryTripDetailsView id={`${id}`} />
    </>
  );
}
