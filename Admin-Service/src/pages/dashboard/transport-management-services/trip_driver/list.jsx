/* eslint-disable no-unused-vars */
import { useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';

import { TripDriverListView } from 'src/sections/trip-driver/view';
// ----------------------------------------------------------------------

export default function TripDriverManagementListPage() {
  const param = useParams();

  // console.log(param);
  return (
    <>
      <Helmet>
        <title> Dashboard: TripDriver Management</title>
      </Helmet>

      <TripDriverListView />
    </>
  );
}
