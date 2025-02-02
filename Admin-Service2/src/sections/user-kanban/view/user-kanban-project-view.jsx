import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserKanbanView from './user-kanban-view';

// ----------------------------------------------------------------------

export default function UserKanbanProjectView(projectId) {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <CustomBreadcrumbs
        heading="Project Progress"
        links={[
          {
            name: 'All Projects',
            href: paths.dashboard.user_project.list,
          },
          { name: 'Project Board' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Stack
        spacing={3}
        direction="row"
        alignItems="flex-start"
        sx={{
          p: 0.25,
          height: 1,
        }}
      >
        <UserKanbanView projectId={projectId} />
      </Stack>
    </Container>
  );
}
