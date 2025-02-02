import { useState } from 'react';
import PropTypes from 'prop-types';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function QuestionsList({ title, subheader, list, ...other }) {
  const [selected, setSelected] = useState(['2']);

  const handleClickComplete = (questionId) => {
    const tasksCompleted = selected.includes(questionId)
      ? selected.filter((value) => value !== questionId)
      : [...selected, questionId];

    setSelected(tasksCompleted);
  };

  return (
    <Card {...other}>
      {/* <CardHeader title={title} subheader={subheader} /> */}

      {list.map((question) => (
        <QuestionItem
          key={question}
          question={question}
          checked={selected.includes(question)}
          onChange={() => handleClickComplete(question)}
        />
      ))}
    </Card>
  );
}

QuestionsList.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function QuestionItem({ question, checked, onChange }) {
  const popover = usePopover();

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
    console.info('EDIT', question.id);
  };

  const handleDelete = () => {
    popover.onClose();
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
            borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
          },
          ...(checked && {
            color: 'text.disabled',
            textDecoration: 'line-through',
          }),
        }}
      >
        <stack style={{ flexGrow: 1, margin: 0 }}>
          <Typography variant="subtitle2">{question.questionDescription}</Typography>
        </stack>

        <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>
      </Stack>

      <CustomPopover open={popover.open} onClose={popover.onClose} arrow="right-top">
        {/* <MenuItem onClick={handleMarkComplete}>
          <Iconify icon="eva:checkmark-circle-2-fill" />
          Mark Complete
        </MenuItem> */}

        <MenuItem onClick={handleEdit}>
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        {/* <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem> */}

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
  question: PropTypes.object,
};
