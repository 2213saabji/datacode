import PropTypes from 'prop-types';
import { useRef, useState, useEffect, useCallback } from 'react';

// import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import MenuItem from '@mui/material/MenuItem';
// import IconButton from '@mui/material/IconButton';

// import { useBoolean } from 'src/hooks/use-boolean';

// import Iconify from 'src/components/iconify';
// import { ConfirmDialog } from 'src/components/custom-dialog';
import { usePopover } from 'src/components/custom-popover';

import KanbanInputName from './kanban-input-name';

// ----------------------------------------------------------------------

export default function KanbanColumnToolBar({
  columnName,
  onDeleteColumn,
  onClearColumn,
  onUpdateColumn,
}) {
  const renameRef = useRef(null);

  const popover = usePopover();

  // const confirmDialog = useBoolean();

  const [name, setName] = useState(columnName);

  useEffect(() => {
    if (popover.open) {
      if (renameRef.current) {
        renameRef.current.focus();
      }
    }
  }, [popover.open]);

  const handleChangeName = useCallback((event) => {
    setName(event.target.value);
  }, []);

  const handleKeyUpUpdateColumn = useCallback(
    (event) => {
      if (event.key === 'Enter') {
        if (renameRef.current) {
          renameRef.current.blur();
        }
        onUpdateColumn(name);
      }
    },
    [name, onUpdateColumn]
  );

  return (
    <Stack
      spacing={1}
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ pt: 3 }}
    >
      <KanbanInputName
        inputRef={renameRef}
        placeholder="Section name"
        value={name}
        onChange={handleChangeName}
        onKeyUp={handleKeyUpUpdateColumn}
      />
    </Stack>
  );
}

KanbanColumnToolBar.propTypes = {
  columnName: PropTypes.string,
  onClearColumn: PropTypes.func,
  onDeleteColumn: PropTypes.func,
  onUpdateColumn: PropTypes.func,
};
