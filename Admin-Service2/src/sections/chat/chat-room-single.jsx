import PropTypes from 'prop-types';
// import { useLocation } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import ListItemButton from '@mui/material/ListItemButton';

import { useBoolean } from 'src/hooks/use-boolean';

// import { useGetChat } from 'src/api/chatt';
// import { useGetUserByUserId } from 'src/api/user';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ChatRoomSingle({ participant }) {
  //  const user={}
  const avatarUrl = participant?.User?.UserProfile?.user_profile_image_details?.preview;
  const namee = `${participant?.User?.UserProfile?.first_name || participant?.User?.phone} ${(participant?.User?.UserProfile?.first_name && participant?.User?.UserProfile?.last_name) || ''}`;

  const phone = participant?.User?.phone;
  const email = participant?.User?.email;
  // const address = "abc";
  const userRoleType = participant?.User?.userRoleType;
  // const city = "abc";

  const collapse = useBoolean(true);

  const renderInfo = (
    <Stack alignItems="center" sx={{ py: 5 }}>
      <Avatar alt={namee} src={avatarUrl} sx={{ width: 96, height: 96, mb: 2 }} />
      <Typography variant="subtitle1">{namee}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 0.5 }}>
        {userRoleType}
      </Typography>
    </Stack>
  );

  const renderBtn = (
    <ListItemButton
      onClick={collapse.onToggle}
      sx={{
        pl: 2.5,
        pr: 1.5,
        height: 40,
        flexShrink: 0,
        flexGrow: 'unset',
        typography: 'overline',
        color: 'text.secondary',
        bgcolor: 'background.neutral',
      }}
    >
      <Box component="span" sx={{ flexGrow: 1 }}>
        Information
      </Box>
      <Iconify
        width={16}
        icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </ListItemButton>
  );

  const renderContent = (
    <Stack
      spacing={2}
      sx={{
        px: 2,
        py: 2.5,
        '& svg': {
          mr: 1,
          flexShrink: 0,
          color: 'text.disabled',
        },
      }}
    >
      {/* <Stack direction="row">
        <Iconify icon="mingcute:location-fill" />
        <Typography variant="body2">
          {address}, {city}
        </Typography>
      </Stack> */}

      <Stack direction="row">
        <Iconify icon="solar:phone-bold" />
        <Typography variant="body2">{phone}</Typography>
      </Stack>

      <Stack direction="row">
        <Iconify icon="fluent:mail-24-filled" />
        <Typography variant="body2" noWrap>
          {(email && email) || 'unavailable'}
        </Typography>
      </Stack>
    </Stack>
  );

  return (
    <>
      {renderInfo}

      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>
    </>
  );
}

ChatRoomSingle.propTypes = {
  participant: PropTypes.object,
};
