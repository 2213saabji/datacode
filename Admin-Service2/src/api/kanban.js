import { useMemo } from 'react';
import useSWR, { mutate } from 'swr';

import axios from 'src/utils/axios';
import { fetcher, endpoints, fetcherBoard } from 'src/utils/axios-kanban';

import { ATTPL_PMS_HOST_API } from 'src/config-global';
// ----------------------------------------------------------------------

const URL = endpoints.work.all;

const options = {
  revalidateIfStale: false,
  revalidateOnFocus: false,
  revalidateOnReconnect: false,
};

export function useGetBoard(projectId) {
  console.log('projectIdprojectIdprojectId', projectId.id);

  const { data, isLoading, error, isValidating } = useSWR(
    `${URL}/${projectId.id}`,
    fetcherBoard,
    options
  );
  const memoizedValue = useMemo(
    () => ({
      board: data?.board,
      boardLoading: isLoading,
      boardError: error,
      boardValidating: isValidating,
      boardEmpty: !isLoading && !data?.board?.ordered?.length,
    }),
    [data?.board, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export async function deleteColumn(columnId) {
  /**
   * Work on server
   */
  // const data = { columnId };
  // await axios.post(endpoints.kanban, data, { params: { endpoint: 'delete-column' } });

  /**
   * Work in local
   */
  mutate(
    URL,
    (currentData) => {
      const { board } = currentData;

      const { columns, tasks } = board;

      // current column
      const column = columns[columnId];

      // delete column in board.columns
      delete columns[columnId];

      // delete tasks in board.tasks
      column.taskIds.forEach((key) => {
        delete tasks[key];
      });

      // delete column in board.ordered
      const ordered = board.ordered.filter((id) => id !== columnId);

      return {
        ...currentData,
        board: {
          ...board,
          columns,
          tasks,
          ordered,
        },
      };
    },
    false
  );
}

// ----------------------------------------------------------------------
// Post Api Calls For Task
// ----------------------------------------------------------------------

export async function createTask(columnId, taskData) {
  try {
    // const data = { columnId, taskData };
    await axios.post(ATTPL_PMS_HOST_API + endpoints.work.create, taskData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate(
      `${URL}/${taskData.projectId}`,
      (currentData) => {
        const { board } = currentData;
        console.log('oyeeeeee=>', currentData);
        // current column
        const column = board.columns[columnId];

        const columns = {
          ...board.columns,
          [columnId]: {
            ...column,
            // add task in column
            taskIds: [...column.taskIds, taskData.id],
          },
        };

        // add task in board.tasks
        const tasks = {
          ...board.tasks,
          [taskData.id]: taskData,
        };

        return {
          ...currentData,
          board: {
            ...board,
            columns,
            tasks,
          },
        };
      },
      true
    );
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------

export async function updateTask(taskId, taskData) {
  /**
   * Work on server
   */
  // const data = { taskData };
  // await axios.post(endpoints.kanban, data, { params: { endpoint: 'update-task' } });

  const url = `${ATTPL_PMS_HOST_API}${endpoints.work.update}/${taskId}`;
  await axios.put(url, taskData, {
    // params: {
    //   taskId,
    // },
  });
  /**
   * Work in local
   */
  mutate(
    `${URL}/${taskData.projectId}`,
    (currentData) => {
      const { board } = currentData;

      const tasks = {
        ...board.tasks,
        // add task in board.tasks
        [taskData.id]: taskData,
      };

      return {
        ...currentData,
        board: {
          ...board,
          tasks,
        },
      };
    },
    true
  );
}

// ----------------------------------------------------------------------

export async function moveTask(taskId, taskData, updateColumns) {
  const projectUrl = `${URL}/${taskData?.projectId}`;
  // Optimistically update the local state
  mutate(
    projectUrl,
    (currentData) => {
      if (!currentData) {
        console.error('No current data found for mutate');
        return currentData;
      }

      const { board } = currentData;
      if (!board) {
        console.error('No board data found in current data');
        return currentData;
      }

      // console.log('Before update:', currentData);
      // console.log('Update columns:', updateColumns);

      // Update board.columns with the new columns
      const columns = updateColumns;

      const newData = {
        ...currentData,
        board: {
          ...board,
          columns,
        },
      };

      // console.log('After update:', newData);
      return newData;
    },
    false // Don't revalidate after the mutation
  );

  try {
    // Send the update to the server
    const url = `${ATTPL_PMS_HOST_API}${endpoints.work.update}/${taskId}`;
    await axios.put(url, taskData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // Revalidate to ensure the local state is in sync with the server
    mutate(projectUrl);
  } catch (error) {
    console.error('Error moving task:', error);
    // Optionally, revalidate the data to revert optimistic update if needed
    mutate(projectUrl);
    throw error;
  }
}

// ---------------------------------------------------------------------------------

// export async function moveTask(updateColumns,projectId) {
//   /**
//    * Work in local
//    */

// mutate(
//   `${URL}/${projectId}`,
//   (currentData) => {
//     const { board } = currentData;

//     // update board.columns
//     const columns = updateColumns;

//     return {
//       ...currentData,
//       board: {
//         ...board,
//         columns,
//       },
//     };
//   },
//   false
// );

//   /**
//    * Work on server
//    */
//   // const data = { updateColumns };
//   // await axios.post(endpoints.kanban, data, { params: { endpoint: 'move-task' } });
// }

// ----------------------------------------------------------------------

// delete tasks in board.tasks

export async function deleteTask(columnId, taskId, projectId) {
  try {
    const url = `${ATTPL_PMS_HOST_API}${endpoints.work.delete}/${taskId}`;
    await axios.delete(url, null, {
      // params: {
      //   taskId,
      // },
    });

    mutate(
      // `${URL}/${projectId}`,
      `${URL}/${projectId}`,
      (currentData) => {
        console.log('CCCCCCCCCCCCCCCCC', currentData);
        const { board } = currentData;

        const { tasks } = board;

        // current column
        const column = board.columns[columnId];

        const columns = {
          ...board.columns,
          [column.id]: {
            ...column,
            // delete tasks in column
            taskIds: column.taskIds.filter((id) => id !== taskId),
          },
        };

        // delete tasks in board.tasks
        delete tasks[taskId];

        return {
          ...currentData,
          board: {
            ...board,
            columns,
            tasks,
          },
        };
      },
      false
    );
  } catch (error) {
    console.error('Error deleting task:', error);
    throw error;
  }
}

// ----------------------------------------------------------------------
//  comment api

export async function createComment(workId, userId, data, projectId) {
  try {
    const dataExport = { workId, userId, ...data };
    console.log('userId===>', userId);
    await axios.post(ATTPL_PMS_HOST_API + endpoints.comment.create, dataExport, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    mutate(
      `${URL}/${projectId}`,
      (currentData) => ({
        ...currentData,
      }),
      true
    );
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

export async function editComment(data, CommentId) {
  try {
    const dataExport = {
      message: data,
    };
    const url = `${ATTPL_PMS_HOST_API}${endpoints.comment.update}/${CommentId}`;
    const response = await axios.put(url, dataExport, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating task:', error);
    throw error;
  }
}

// create a projects

export async function createProject(data) {
  try {
    const { name, description, columns, types } = data;
    const newDataSchema = {
      name,
      description,
      config: {
        types,
        columns,
      },
    };

    const res = await axios.post(ATTPL_PMS_HOST_API + endpoints.project.create, newDataSchema, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
}

// fetch all projects

export function useGetAllProjects() {
  const fetchProjectsUrl = endpoints.project.all;
  const { data, isLoading, error, isValidating } = useSWR(fetchProjectsUrl, fetcher, options);
  const memoizedValue = useMemo(
    () => ({
      projects: data?.data,
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !data?.data?.config?.types?.length,
    }),
    [data?.data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// update project details

export async function updateProject(projectId, data) {
  const { name, description, columns, types } = data;
  const projectData = {
    name,
    description,
    config: {
      types,
      columns,
    },
  };
  const projectUrl = `${ATTPL_PMS_HOST_API}${endpoints.project.update}/${projectId}`;

  try {
    // Send the update to the server
    const response = await axios.put(projectUrl, projectData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response?.data?.data;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
}

export async function changeWorkType(projectId) {
  try {
    mutate(`${URL}/${projectId}`, undefined, true);
  } catch (error) {
    console.error('Error changeing work type:', error);
    throw error;
  }
}
