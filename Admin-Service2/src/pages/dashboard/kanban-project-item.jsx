import React from 'react';
import PropTypes from 'prop-types';

import MenuItem from '@mui/material/MenuItem';
import { Card, Grid, Stack, IconButton } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

const ProjectItem = ({ project, onDelete, index, updateValues }) => {
  const popover = usePopover();
  const router = useRouter();
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Stack component={Card} direction="row" justifyContent="space-between" sx={{ maxWidth: 300 }}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
            width: '100%',
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft">{project.name}</Label>
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>
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

      {/* CustomPopover */}
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.project.details(project?.projectId));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>
        <MenuItem
          onClick={() => {
            onDelete(project?.projectId);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
        <MenuItem
          onClick={() => {
            updateValues('Update', index, project);
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
      </CustomPopover>
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
