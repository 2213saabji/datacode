// import axios from 'axios';
import PropTypes from 'prop-types';
// import { useEffect, useState } from 'react';
// import { useLocation } from 'react-router-dom';

import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import AvatarGroup, { avatarGroupClasses } from '@mui/material/AvatarGroup';

import { fToNow } from 'src/utils/format-time';

// import { useGetChat } from 'src/api/chatt';

// ----------------------------------------------------------------------

export default function ChatHeaderDetail({ participants, userId, conversation }) {
  // const location = useLocation();

  // const conversationid = new URLSearchParams(location.search).get('id');
  // const conversationIdNumber = parseInt(conversationid, 10);
  // const { schat } = useGetChat(conversationid);

  const group = participants.length > 1;

  const singleParticipant = participants[0];

  const renderGroup = (
    <AvatarGroup
      max={3}
      sx={{
        [`& .${avatarGroupClasses.avatar}`]: {
          width: 32,
          height: 32,
        },
      }}
    >
      {participants.map((participant) => (
        <Avatar
          key={participant.userId}
          alt={`${participant?.User?.UserProfile?.first_name || participant?.User?.phone}`}
          src={participant?.User?.UserProfile?.user_profile_image_details?.preview}
        />
      ))}
    </AvatarGroup>
  );

  const renderSingle = (
    <Stack flexGrow={1} direction="row" alignItems="center" spacing={2}>
      <Badge
        variant={singleParticipant?.status}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Avatar
          src={singleParticipant?.User?.UserProfile?.user_profile_image_details?.preview}
          alt={`${singleParticipant?.User?.UserProfile?.first_name || singleParticipant?.User?.phone}`}
        />
      </Badge>

      <ListItemText
        primary={`${singleParticipant?.User?.UserProfile?.first_name || singleParticipant?.User?.phone} ${(singleParticipant?.User?.UserProfile?.first_name && singleParticipant?.User?.UserProfile?.last_name) || ''}`}
        secondary={
          singleParticipant?.status === 'offline'
            ? fToNow(singleParticipant?.lastActivity)
            : singleParticipant?.status
        }
        secondaryTypographyProps={{
          component: 'span',
          ...(singleParticipant?.status !== 'offline' && {
            textTransform: 'capitalize',
          }),
        }}
      />
    </Stack>
  );

  return (
    <>
      {group ? renderGroup : renderSingle}

      <Stack flexGrow={1} />

      {/* <IconButton>
        <Iconify icon="solar:phone-bold" />
      </IconButton>
      <IconButton>
        <Iconify icon="solar:videocamera-record-bold" />
      </IconButton> */}
      {/* <IconButton>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton> */}
    </>
  );
}

ChatHeaderDetail.propTypes = {
  participants: PropTypes.array,
  userId: PropTypes.number.isRequired,
  conversation: PropTypes.object,
};
