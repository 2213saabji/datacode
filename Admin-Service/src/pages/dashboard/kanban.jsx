import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { KanbanProjectView } from 'src/sections/kanban/view';
// ----------------------------------------------------------------------

export default function KanbanPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Kanban</title>
      </Helmet>

      <KanbanProjectView id={id} />
    </>
  );
}
