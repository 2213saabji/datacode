import axios from 'axios';

import { ATTPL_PMS_HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({ baseURL: ATTPL_PMS_HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;

// ----------------------------------------------------------------------

// API response converter, to KANBAN API
export const kanbanConvert = (data) => {
  // console.log('data->>>>>>>>', data);
  if (!data) return { board: {} };
  const board = {
    columns: {},
    tasks: {},
    ordered: [],
    config: data?.config || {},
    projectDetails: {
      projectId: data.projectId,
      name: data.name,
      description: data.description,
      configId: data.configId,
      managerId: data.managerId,
    },
  };
  const columns = board.config.columns || [];
  const works = data.works || [];

  columns.forEach((columnName, index) => {
    const columnId = index.toString();
    board.columns[columnId] = {
      id: columnId,
      name: columnName,
      taskIds: [],
    };
    board.ordered.push(columnId);
  });

  works.forEach((work) => {
    const taskId = work.workId.toString();
    const { columnId } = work;

    board.columns[columnId].taskIds.push(taskId);

    board.tasks[taskId] = {
      id: work.workId.toString(),
      due: work.due || [],
      status: columns[work.columnId] || '',
      labels: work.label || '',
      comments: work.comments || [],
      assignee: work.assignee || [],
      priority: work.priority || 'Low',
      attachments: work.attachments || [],
      reporter: work.reporter || {},
      name: work.name || '',
      description: work.description || '',
      dependentId: work.dependentId || null,
      projectId: work.projectId || null,
    };
  });

  // console.log('board->>>>>>>>', board);
  return { board };
};

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];

  const res = await axiosInstance.get(url, { ...config });
  return res.data;
};

// export const fetcherBoard = async (args) => {
//   const [url, config] = Array.isArray(args) ? args : [args];
//   console.log("url-url",url);
//   const res = await axiosInstance.get(url, { ...config });
//   return kanbanConvert(res?.data?.data);
// };

export const fetcherBoard = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args];
  let workIndex = localStorage.getItem('selectedWorkIndex');
  if (workIndex === null) {
    workIndex = '0';
    localStorage.setItem('selectedWorkIndex', workIndex);
  }
  const res = await axiosInstance.get(`${url}?typeId=${workIndex}`, { ...config });
  return kanbanConvert(res?.data?.data);
};

export const deleter = async (url, headers) => {
  const URL = `${ATTPL_PMS_HOST_API}${url}`;
  const res = await axios.delete(URL, { ...headers });
  return res.data;
};

// ----------------------------------------------------------------------

export const endpoints = {
  // kanban: '/api/kanban',
  work: {
    all: '/project/work/fetchAll',
    create: '/project/work/create',
    delete: '/project/work/delete',
    update: '/project/work/update',
    config: '/project/config',
  },
  comment: {
    create: '/project/comment/create',
    delete: '/project/comment/delete',
    update: '/project/comment/update',
  },
  users: {
    all: '/user/fetchAll',
  },
  project: {
    all: '/project/fetchAll',
    create: '/project/create',
    delete: '/project/delete',
    update: '/project/update',
  },
};
