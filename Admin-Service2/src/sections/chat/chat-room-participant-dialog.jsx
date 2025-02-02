import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Dialog from '@mui/material/Dialog';
// import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import DialogContent from '@mui/material/DialogContent';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function ChatRoomParticipantDialog({ participant, open, onClose }) {
  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={onClose}>
      <IconButton onClick={onClose} sx={{ position: 'absolute', right: 8, top: 8 }}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>

      <DialogContent sx={{ py: 5, px: 3, display: 'flex' }}>
        <Avatar
          alt={participant.name}
          src={participant.User?.UserProfile?.user_profile_image_details?.preview}
          sx={{ width: 96, height: 96, mr: 3 }}
        />

        <Stack spacing={1}>
          <Typography variant="caption" sx={{ color: 'primary.main' }}>
            {participant?.User?.userRoleType}
          </Typography>

          <Typography variant="subtitle1">{`${participant?.User?.UserProfile?.first_name || participant?.User?.phone} ${(participant?.User?.UserProfile?.first_name && participant?.User?.UserProfile?.last_name) || ''}`}</Typography>

          <Stack direction="row" sx={{ typography: 'caption', color: 'text.disabled' }}>
            <Iconify
              icon="solar:phone-bold"
              width={16}
              sx={{ flexShrink: 0, mr: 0.5, mt: '2px' }}
            />
            {participant?.User?.phone}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
}

ChatRoomParticipantDialog.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool,
  participant: PropTypes.object,
};
