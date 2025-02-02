import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function FileInput({
  data,
  subTitle,
  link,
  onOpen,
  collapse,
  onCollapse,
  sx,
  ...other
}) {
  return (
    <Card sx={{ border: '1px solid #0002' }}>
      <Stack spacing={3} sx={{ p: 2 }}>
        {data.map((category) => (
          <Stack key={category.name} spacing={2} direction="row" alignItems="center">
            <Box sx={{ width: 40, height: 40 }}>{category.icon}</Box>

            <ListItemText
              primary={category.name}
              secondary={`${category.filesCount} files`}
              secondaryTypographyProps={{
                mt: 0.5,
                component: 'span',
                typography: 'caption',
                color: 'text.disabled',
              }}
            />

            <IconButton
              size="small"
              color="primary"
              onClick={onOpen}
              sx={{
                width: 24,
                height: 24,
                transform: 'scale(1.5)',
                bgcolor: 'primary.main',
                color: 'primary.contrastText',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              <Iconify icon="mingcute:add-line" />
            </IconButton>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
}

FileInput.propTypes = {
  data: PropTypes.array,
  collapse: PropTypes.bool,
  link: PropTypes.string,
  onCollapse: PropTypes.func,
  onOpen: PropTypes.func,
  subTitle: PropTypes.string,
  sx: PropTypes.object,
};
