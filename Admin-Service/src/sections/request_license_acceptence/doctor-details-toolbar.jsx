/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
// import LoadingButton from '@mui/lab/LoadingButton';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function DoctorDetailsToolbar({ backLink, editLink, sx, ...other }) {
  const popover = usePopover();
  return (
    <Stack
      spacing={1.5}
      direction="row"
      sx={{
        mb: { xs: 3, md: 5 },
        ...sx,
      }}
      {...other}
    >
      <Button
        component={RouterLink}
        href={backLink}
        startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
      >
        Back
      </Button>

      <Box sx={{ flexGrow: 1 }} />

      <Tooltip title="Edit">
        <IconButton component={RouterLink} href={editLink}>
          <Iconify icon="solar:pen-bold" />
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

DoctorDetailsToolbar.propTypes = {
  backLink: PropTypes.string,
  editLink: PropTypes.string,
  sx: PropTypes.object,
};
