import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { UserKanbanProjectView } from 'src/sections/user-kanban/view';
// ----------------------------------------------------------------------

export default function UserKanbanPage() {
  const params = useParams();

  const { id } = params;
  return (
    <>
      <Helmet>
        <title> Dashboard: Kanban</title>
      </Helmet>

      <UserKanbanProjectView id={id} />
    </>
  );
}
