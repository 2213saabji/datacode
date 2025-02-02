import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import KanbanView from './kanban-view';

// ----------------------------------------------------------------------

export default function KanbanProjectView(projectId) {
  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <CustomBreadcrumbs
        heading="PROJECT MANAGEMENT"
        links={[
          {
            name: 'All Projects',
            href: paths.dashboard.project.list,
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
        <KanbanView projectId={projectId} />
      </Stack>
    </Container>
  );
}
