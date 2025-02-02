import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import GovtServiceRoadmapDetails from 'src/sections/govt-service/view/govt-service-roadmap-details';

// ----------------------------------------------------------------------

export default function GovtServiceRoadmapDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Complaint Details</title>
      </Helmet>

      <GovtServiceRoadmapDetails id={`${id}`} />
    </>
  );
}
