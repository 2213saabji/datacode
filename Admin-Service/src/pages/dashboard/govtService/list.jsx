import { Helmet } from 'react-helmet-async';

import GovtServiceRoadmapList from 'src/sections/govt-service/view/govt-service-roadmap-list';

// ----------------------------------------------------------------------

export default function GovtServiceRoadmapListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Complaint Box</title>
      </Helmet>
      <GovtServiceRoadmapList />
    </>
  );
}
