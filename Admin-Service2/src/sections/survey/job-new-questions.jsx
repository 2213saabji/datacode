import PropTypes from 'prop-types';
import { useParams } from 'react-router';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Radio, useTheme, RadioGroup, FormControlLabel } from '@mui/material';

import {
  // deleter,
  endpoints,
} from 'src/utils/axios-survey';

// import { useGetSurveyResponse } from 'src/api/survey';
import { ATTPL_BMS_HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function QuestionsList({
  handleOpen,
  title,
  subheader,
  list,
  setupdateque,
  ...other
}) {
  const [selected, setSelected] = useState(['2']);

  const [allQuestion, setAlluestions] = useState([]);

  // console.log('allQuestion--->', allQuestion)
  useEffect(() => {
    setAlluestions(list);
  }, [list]);

  const handleClickComplete = (questionId) => {
    const tasksCompleted = selected.includes(questionId)
      ? selected.filter((value) => value !== questionId)
      : [...selected, questionId];

    setSelected(tasksCompleted);
  };

  // Delete Question

  return (
    <Card {...other}>
      {/* <CardHeader title={title} subheader={subheader} /> */}

      {Array.isArray(list) ? (
        allQuestion.map((question, index) => (
          <QuestionItem
            key={question}
            question={question}
            index={index}
            checked={selected.includes(question)}
            onChange={() => handleClickComplete(question)}
            handleOpen={handleOpen}
            selected={selected}
            setupdateque={setupdateque}
            setAlluestions={setAlluestions}
            // id={id}
          />
        ))
      ) : (
        <QuestionItem
          key={allQuestion}
          question={allQuestion}
          checked={selected.includes(allQuestion)}
          onChange={() => handleClickComplete(allQuestion)}
          handleOpen={handleOpen}
          setupdateque={setupdateque}
          // id={id}
        />
      )}
    </Card>
  );
}

QuestionsList.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
  handleOpen: PropTypes.func,
  setupdateque: PropTypes.func,
};

// ----------------------------------------------------------------------

function QuestionItem({
  handleOpen,
  question,
  checked,
  onChange,
  selected,
  setupdateque,
  setAlluestions,
  index,
}) {
  const popover = usePopover();

  const surveyIdd = useParams();
  // console.log('params--->', question.questionId)

  const theme = useTheme();

  const handleDeleteQuestion = useCallback(
    async (Id, surveyId) => {
      const url = `${ATTPL_BMS_HOST_API}${endpoints.survey.deleteQuestion}/${Id}`;
      // console.log('URL------->', url)
      try {
        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        };

        const response = await fetch(url, {
          method: 'DELETE',
          headers,
          body: JSON.stringify({ surveyId }),
        }).then((res) => res.json());

        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // window.location.reload();
          setAlluestions((prevQuestions) => prevQuestions.filter((que) => que.questionId !== Id));
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete question', { variant: 'error' });
      }
    },
    [setAlluestions]
  );

  //   const handleMarkComplete = () => {
  //     popover.onClose();
  //     console.info('MARK COMPLETE', task.id);
  //   };

  //   const handleShare = () => {
  //     popover.onClose();
  //     console.info('SHARE', task.id);
  //   };

  const handleEdit = () => {
    popover.onClose();
    handleOpen();
    setupdateque(question);
    console.info('EDIT', selected);
  };

  const handleDelete = () => {
    popover.onClose();
    handleDeleteQuestion(question?.questionId, surveyIdd.id);
    console.info('DELETE', question.id);
  };

  return (
    <>
      <Stack
        direction="row"
        sx={{
          pl: 2,
          pr: 1,
          py: 1,
          '&:not(:last-of-type)': {
            borderBottom: (them) => `dashed 1px ${them.palette.divider}`,
          },
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <Stack style={{ flexGrow: 1, margin: 0 }}>
          <Typography variant="subtitle2" mb={2}>
            Q {index + 1} : {question.questionDescription}
          </Typography>

          <RadioGroup sx={{ pl: 1, bgcolor: theme.palette.divider, borderRadius: 2 }}>
            {question?.options?.map((option, i) => (
              <FormControlLabel
                key={i}
                value={option}
                control={<Radio disabled />}
                label={<Typography sx={{ ml: 1 }}>{option}</Typography>}
              />
            ))}
          </RadioGroup>
        </Stack>

        {surveyIdd.id && (
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        )}
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

QuestionItem.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  handleOpen: PropTypes.func,
  question: PropTypes.object,
  index: PropTypes.string,
  selected: PropTypes.object,
  setupdateque: PropTypes.func,
  setAlluestions: PropTypes.func,
  // id: PropTypes.string,
};
