import React from 'react';
import PropTypes from 'prop-types';

import { Card, Grid, Stack } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Label from 'src/components/label';
import TextMaxLine from 'src/components/text-max-line';

const ProjectItem = ({ project, onDelete, index, updateValues }) => {
  const router = useRouter();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack component={Card} direction="row" justifyContent="space-between" sx={{ maxWidth: 300 }}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
            cursor: 'pointer',
          }}
          onClick={() => {
            router.push(paths.dashboard.user_project.details(project?.projectId));
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft">{project.name}</Label>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <TextMaxLine variant="subtitle2" line={2}>
              {project.name}
            </TextMaxLine>

            <TextMaxLine variant="subtitle2" sx={{ color: 'text.secondary' }}>
              {project.description}
            </TextMaxLine>
          </Stack>
        </Stack>
      </Stack>
    </Grid>
  );
};

ProjectItem.propTypes = {
  project: PropTypes.object,
  onDelete: PropTypes.func,
  updateValues: PropTypes.func,
  index: PropTypes.number,
};

export default ProjectItem;
