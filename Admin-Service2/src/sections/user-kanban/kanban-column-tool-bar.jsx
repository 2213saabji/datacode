import PropTypes from 'prop-types';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function KanbanColumnToolBar({
  columnName,

  onUpdateColumn,
}) {
  const renameRef = useRef(null);

  const popover = usePopover();

  // const confirmDialog = useBoolean();

  const [name, setName] = useState(columnName);
  console.log(setName);

  useEffect(() => {
    if (popover.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [popover.open]);

  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pt: 3 }}
    >
      <Typography
        variant="body1"
        // onClick={handleNameClick}
        // sx={{ cursor: 'pointer' }}
        sx={{
          cursor: 'pointer',
          fontWeight: 'bold', // Makes the text bold
          textAlign: 'center', // Aligns the text to the center
        }}
      >
        {name}
      </Typography>
    </Stack>
  );
}

KanbanColumnToolBar.propTypes = {
  columnName: PropTypes.string,

  onUpdateColumn: PropTypes.func,
};
