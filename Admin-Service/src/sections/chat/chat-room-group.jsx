import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

// import { useSearchParams } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import ChatRoomParticipantDialog from './chat-room-participant-dialog';

// ----------------------------------------------------------------------

export default function ChatRoomGroup({ participants, conversationCreatedBy }) {
  const { user } = useAuthContext();

  // const searchParams = useSearchParams();

  // const selectedGroupId = searchParams.get('id') || '';

  const [selected, setSelected] = useState(null);

  const collapse = useBoolean(true);

  const handleOpen = useCallback((participant) => {
    setSelected(participant);
  }, []);

  const handleClose = () => {
    setSelected(null);
  };

  const totalParticipants = participants.length;

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
        In room ({totalParticipants})
      </Box>
      <Iconify
        width={16}
        icon={collapse.value ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
      />
    </ListItemButton>
  );

  const renderContent = (
    <Scrollbar sx={{ height: 56 * 4 }}>
      {participants.map((participant) => (
        <ListItemButton key={participant.userId} onClick={() => handleOpen(participant)}>
          <Badge
            variant={participant.status}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
          >
            <Avatar
              alt={participant?.User?.phone}
              src={participant?.User?.UserProfile?.user_profile_image_details?.preview}
            />
          </Badge>

          <ListItemText
            sx={{ ml: 2 }}
            primary={
              user.userId === participant?.userId
                ? 'You'
                : `${participant?.User?.UserProfile?.first_name || participant?.User?.phone} ${(participant?.User?.UserProfile?.first_name && participant?.User?.UserProfile?.last_name) || ''}`
            }
            secondary={
              conversationCreatedBy === participant?.userId ? (
                <Label color="success">Group Admin</Label>
              ) : (
                ''
              )
            }
            primaryTypographyProps={{
              noWrap: true,
              typography: 'subtitle2',
            }}
            secondaryTypographyProps={{
              noWrap: true,
              component: 'span',
              typography: 'caption',
            }}
          />
        </ListItemButton>
      ))}
    </Scrollbar>
  );

  return (
    <>
      {renderBtn}

      <div>
        <Collapse in={collapse.value}>{renderContent}</Collapse>
      </div>

      {selected && (
        <ChatRoomParticipantDialog participant={selected} open={!!selected} onClose={handleClose} />
      )}
    </>
  );
}

ChatRoomGroup.propTypes = {
  participants: PropTypes.array,
  conversationCreatedBy: PropTypes.number,
};
