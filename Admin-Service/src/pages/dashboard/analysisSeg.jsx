import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { OverviewAppList } from 'src/sections/overview/app/view';

// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import {paths} from 'src/routes/paths';
// ----------------------------------------------------------------------

export default function AnalysisList() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Analysis</title>
      </Helmet>

      {/* <CustomBreadcrumbs
        heading="Analytics Management"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          { name: 'Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      /> */}

      {/* <KanbanProjectView id={id} /> */}
      <OverviewAppList id={id} />
    </>
  );
}
