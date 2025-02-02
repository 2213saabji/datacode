import PropTypes from 'prop-types';
import { useCallback } from 'react';
// import { Droppable, Draggable } from '@hello-pangea/dnd';

import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import { alpha } from '@mui/material/styles';

import { useParams } from 'src/routes/hooks';

// import { useBoolean } from 'src/hooks/use-boolean';

import {
  // createTask,
  updateTask,
  deleteTask,
  // clearColumn,
  // updateColumn,
  // deleteColumn,
} from 'src/api/kanban';

// import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';

// import KanbanTaskAdd from './kanban-task-add';
import KanbanTaskItem from './kanban-task-item';
import KanbanColumnToolBar from './kanban-column-tool-bar';

// ----------------------------------------------------------------------

export default function KanbanColumn({ column, tasks, index, config }) {
  const params = useParams();

  const { id: projectId } = params;

  const { enqueueSnackbar } = useSnackbar();

  // const openAddTask = useBoolean();

  // const handleAddTask = useCallback(
  //   async (taskData) => {
  //     try {
  //       createTask(column.id, taskData);

  //       openAddTask.onFalse();
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   },
  //   [column.id, openAddTask]
  // );

  const handleUpdateTask = useCallback(async (taskId, taskData) => {
    try {
      updateTask(taskId, taskData);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const handleDeleteTask = useCallback(
    async (taskId) => {
      try {
        deleteTask(column.id, taskId, projectId);

        enqueueSnackbar('Delete success!', {
          anchorOrigin: { vertical: 'top', horizontal: 'center' },
        });
      } catch (error) {
        console.error(error);
      }
    },
    [column.id, enqueueSnackbar, projectId]
  );

  // const renderAddTask = (
  //   <Stack
  //     spacing={2}
  //     sx={{
  //       pb: 3,
  //     }}
  //   >
  //     {openAddTask.value && (
  //       <KanbanTaskAdd
  //         status={column.name}
  //         onAddTask={handleAddTask}
  //         onCloseAddTask={openAddTask.onFalse}
  //       />
  //     )}

  //     <Button
  //       fullWidth
  //       size="large"
  //       color="inherit"
  //       startIcon={
  //         <Iconify
  //           icon={openAddTask.value ? 'solar:close-circle-broken' : 'mingcute:add-line'}
  //           width={18}
  //           sx={{ mr: -0.5 }}
  //         />
  //       }
  //       onClick={openAddTask.onToggle}
  //       sx={{ fontSize: 14 }}
  //     >
  //       {openAddTask.value ? 'Close' : 'Add Task'}
  //     </Button>
  //   </Stack>
  // );

  return (
    <Paper
      sx={{
        px: 2,
        borderRadius: 2,
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
      // {...provided.dragHandleProps}
      >
        <KanbanColumnToolBar columnName={column.name} />

        {/* {column.id === '0' && renderAddTask} */}

        <Stack
          spacing={2}
          sx={{
            py: 3,
            width: 280,
          }}
        >
          {column.taskIds
            .slice()
            .reverse()
            .map((taskId, taskIndex) => (
              <KanbanTaskItem
                key={taskId}
                index={taskIndex}
                task={tasks[taskId]}
                onUpdateTask={handleUpdateTask}
                onDeleteTask={() => handleDeleteTask(taskId)}
                config={config}
              />
            ))}
        </Stack>
      </Stack>
    </Paper>
  );
}

KanbanColumn.propTypes = {
  column: PropTypes.object,
  index: PropTypes.number,
  tasks: PropTypes.object,
  config: PropTypes.object,
};
