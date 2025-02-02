/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
// import { Droppable } from '@hello-pangea/dnd';
import { useState, useEffect, useCallback } from 'react';

import { Grid } from '@mui/material';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { RouterLink } from 'src/routes/components';

import { moveTask, useGetBoard, changeWorkType } from 'src/api/kanban';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import KanbanColumn from '../kanban-column';
import { KanbanColumnSkeleton } from '../kanban-skeleton';

// ----------------------------------------------------------------------

export default function UserKanbanView({ projectId }) {
  const [allTypes, setAllTypes] = useState([]);
  const [workTitle, setWorkTitle] = useState('');
  // Set the initial work title once types are fetched

  // Effect to update typeId based on workTitle

  useEffect(() => {
    if (allTypes.length > 0) {
      const selectedTypeIndex = allTypes.findIndex((type) => type === workTitle);
      if (selectedTypeIndex !== -1) {
        localStorage.setItem('selectedWorkIndex', selectedTypeIndex);
      }
    }
  }, [allTypes, workTitle]);

  useEffect(() => {
    // Retrieve workTitle from local storage when component mounts
    const savedWorkTitle = localStorage.getItem('workTitle');
    if (savedWorkTitle) {
      setWorkTitle(savedWorkTitle);
    }
  }, [allTypes]);

  const handleChangeWorkTitle = useCallback(
    (newValue) => {
      setWorkTitle(newValue);
      localStorage.setItem('workTitle', newValue);
      changeWorkType(projectId);
      window.location.reload();
    },
    [projectId]
  );

  const { board, boardLoading, boardEmpty } = useGetBoard(projectId);

  // console.log('kanban view board', board);

  useEffect(() => {
    if (board?.config?.types) {
      setAllTypes(board?.config?.types);
      setWorkTitle(board?.config?.types[0]);
    }
  }, [board?.config?.types]);

  const popover = usePopover();
  const onDragEnd = useCallback(
    async ({ destination, source, draggableId, type }) => {
      try {
        if (!destination) {
          return;
        }

        if (destination.droppableId === source.droppableId && destination.index === source.index) {
          return;
        }

        const sourceColumn = board?.columns[source.droppableId];

        const destinationColumn = board?.columns[destination.droppableId];

        // Moving task to different list
        const sourceTaskIds = [...sourceColumn.taskIds];

        const destinationTaskIds = [...destinationColumn.taskIds];

        // Remove from source
        sourceTaskIds.splice(source.index, 1);

        // Insert into destination
        destinationTaskIds.splice(destination.index, 0, draggableId);

        moveTask(
          draggableId,
          { projectId: projectId.id, columnId: destination.droppableId },
          {
            ...board?.columns,
            [sourceColumn.id]: {
              ...sourceColumn,
              taskIds: sourceTaskIds,
            },
            [destinationColumn.id]: {
              ...destinationColumn,
              taskIds: destinationTaskIds,
            },
          }
        );

        console.info('Moving to different list!');
      } catch (error) {
        console.error(error);
      }
    },
    [board?.columns, projectId]
  );

  const renderSkeleton = (
    <Stack direction="row" alignItems="flex-start" spacing={3}>
      {[...Array(4)].map((_, index) => (
        <KanbanColumnSkeleton key={index} index={index} />
      ))}
    </Stack>
  );

  return (
    <Container
      maxWidth={false}
      sx={{
        height: 1,
      }}
    >
      <Grid container>
        <Grid item sx={12} md={4}>
          <Button
            component={RouterLink}
            to="/dashboard/user-project"
            variant="outlined"
            color="primary"
            style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', height: '32px' }}
          >
            Back To Projects
          </Button>
        </Grid>
        <Grid item sx={12} md={4}>
          <Typography
            variant="h4"
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          >
            {board?.projectDetails?.name}
          </Typography>
        </Grid>
        <Grid item sx={12} md={4}>
          <Button
            size="small"
            variant="soft"
            endIcon={<Iconify icon="eva:arrow-ios-downward-fill" width={16} sx={{ ml: -0.5 }} />}
            onClick={popover.onOpen}
          >
            {workTitle}
          </Button>
        </Grid>
      </Grid>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="top-right"
        // sx={{ width: 140 }}
      >
        {allTypes?.map((option) => (
          <MenuItem
            key={option}
            selected={workTitle === option}
            onClick={() => {
              popover.onClose();
              handleChangeWorkTitle(option);
            }}
          >
            {option}
          </MenuItem>
        ))}
      </CustomPopover>

      {boardLoading && renderSkeleton}

      {boardEmpty && (
        <EmptyContent
          filled
          title="No Data"
          sx={{
            py: 10,
            maxHeight: { md: 480 },
          }}
        />
      )}

      {!!board?.ordered?.length && (
        <Scrollbar
          sx={{
            height: 1,
            minHeight: {
              xs: '80vh',
              md: 'unset',
            },
          }}
        >
          <Stack
            spacing={3}
            direction="row"
            alignItems="flex-start"
            sx={{
              p: 0.25,
              height: 1,
            }}
          >
            {board?.ordered.map((columnId, index) => (
              <KanbanColumn
                index={index}
                key={columnId}
                column={board?.columns[columnId]}
                tasks={board?.tasks}
                config={board?.config}
              />
            ))}
          </Stack>
        </Scrollbar>
      )}
    </Container>
  );
}

UserKanbanView.propTypes = {
  projectId: PropTypes.shape({
    id: PropTypes.string.isRequired,
  }).isRequired,
};
