import { useNavigate } from 'react-router';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function LetsChat() {
  const navigate = useNavigate();

  return (
    // Chat button

    <Stack
      sx={{
        px: 2,
        py: 5,
        textAlign: 'center',
      }}
    >
      <Stack alignItems="center">
        <Button
          sx={{ minHeight: '48px' }}
          variant="contained"
          onClick={(e) => {
            e.preventDefault();
            navigate(paths.dashboard.chat);
          }}
        >
          CHAT WITH FRIEND
        </Button>
      </Stack>
    </Stack>
  );
}
