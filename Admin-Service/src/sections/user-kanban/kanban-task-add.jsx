import PropTypes from 'prop-types';
import { useMemo, useState, useCallback } from 'react';

import Paper from '@mui/material/Paper';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import InputBase, { inputBaseClasses } from '@mui/material/InputBase';

import { useParams } from 'src/routes/hooks';

import { useAuthContext } from 'src/auth/hooks';

// import { UseMockedUser } from 'src/hooks/use-mocked-user';

import uuidv4 from 'src/utils/uuidv4';

// import { _mock } from 'src/_mock';
// ----------------------------------------------------------------------

export default function KanbanTaskAdd({ status, onAddTask, onCloseAddTask }) {
  const params = useParams();

  const { id } = params;
  const { user } = useAuthContext();
  const userData = {
    userName: user?.UserProfile?.firstName,
    email: user?.email,
    userId: user?.userId,
  };
  // const [userData, setUserData] = useState(null);
  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       const { userName, email,userId } = await UseMockedUser();
  //       setUserData({ userName, email ,userId});
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUserData();
  // }, []);

  const [name, setName] = useState('');

  const selectedWorkIndex = localStorage.getItem('selectedWorkIndex');

  const defaultTask = useMemo(
    () => ({
      id: uuidv4(),
      name: name.trim(),
      priority: 'medium',
      attachments: [],
      labels: [],
      comments: [],
      assignee: [],
      due: [null, null],
      reporterId: userData?.userId,
      columnId: 0,
      typeId: selectedWorkIndex,
      projectId: id,
    }),
    [id, name, selectedWorkIndex, userData?.userId]
  );

  const handleKeyUpAddTask = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (name) {
          onAddTask(defaultTask);
        }
      }
    },
    [defaultTask, name, onAddTask]
  );

  const handleClickAddTask = useCallback(() => {
    if (name) {
      onAddTask(defaultTask);
    } else {
      onCloseAddTask();
    }
  }, [defaultTask, name, onAddTask, onCloseAddTask]);

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  return (
    <ClickAwayListener onClickAway={handleClickAddTask}>
      <Paper
        sx={{
          borderRadius: 1.5,
          bgcolor: 'background.default',
          boxShadow: (theme) => theme.customShadows.z1,
        }}
      >
        <InputBase
          autoFocus
          multiline
          fullWidth
          placeholder="Task name"
          value={name}
          onChange={handleChangeName}
          onKeyUp={handleKeyUpAddTask}
          sx={{
            px: 2,
            height: 56,
            [`& .${inputBaseClasses.input}`]: {
              typography: 'subtitle2',
            },
          }}
        />
      </Paper>
    </ClickAwayListener>
  );
}

KanbanTaskAdd.propTypes = {
  onAddTask: PropTypes.func,
  onCloseAddTask: PropTypes.func,
  status: PropTypes.string,
};
