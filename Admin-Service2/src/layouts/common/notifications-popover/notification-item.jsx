import PropTypes from 'prop-types';
// import {Link} from '@material-ui/core';
import { Link as RouterLink } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { ListItem } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';

import { fToNow } from 'src/utils/format-time';

import Label from 'src/components/label';
import FileThumbnail from 'src/components/file-thumbnail';

// ----------------------------------------------------------------------

export default function NotificationItem({ notification, handleViewForm }) {
  console.log('notification------->', notification);

  const renderText = (
    <ListItem button component={RouterLink} to={notification.serviceUrl}>
      <ListItemText
        disableTypography
        primary={
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{ typography: 'caption' }}
          >
            {notification.serviceName}
            {/* Remove CountdownTimer if you don't have startTime and endTime */}
          </Stack>
        }
        secondary={
          <Stack
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', color: 'text.disabled' }}
            divider={
              <Box
                sx={{
                  width: 2,
                  height: 2,
                  bgcolor: 'currentColor',
                  mx: 0.5,
                  borderRadius: '50%',
                }}
              />
            }
          >
            <Box component="span" sx={{ whiteSpace: 'nowrap' }}>
              {fToNow(notification.created_at)}
            </Box>
            <Box
              component="span"
              sx={{
                width: 120,
                flexGrow: 1,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {notification.notificationMessage}
            </Box>
          </Stack>
        }
      />
    </ListItem>
  );


  const renderUnReadBadge = notification.isUnRead && (
    <Box
      sx={{
        top: 26,
        width: 8,
        height: 8,
        right: 20,
        borderRadius: '50%',
        bgcolor: 'info.main',
        position: 'absolute',
      }}
    />
  );

  const friendAction = (
    <Stack spacing={1} direction="row" sx={{ mt: 1.5 }}>
      <Button
        size="small"
        variant="contained"
        onClick={() => handleViewForm(notification.surveyId)}
      >
        Open
      </Button>
    </Stack>
  );

  const projectAction = (
    <Stack alignItems="flex-start">
      <Button size="small" variant="contained" disabled sx={{ bgcolor: 'red', mt: 1.5 }}>
        Closed
      </Button>
    </Stack>
  );

  const fileAction = (
    <Stack
      spacing={1}
      direction="row"
      sx={{
        pl: 1,
        p: 1.5,
        mt: 1.5,
        borderRadius: 1.5,
        bgcolor: 'background.neutral',
      }}
    >
      <FileThumbnail
        file="http://localhost:8080/httpsdesign-suriname-2015.mp3"
        sx={{ width: 40, height: 40 }}
      />

      <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} flexGrow={1} sx={{ minWidth: 0 }}>
        <ListItemText
          disableTypography
          primary={
            <Typography variant="subtitle2" component="div" sx={{ color: 'text.secondary' }} noWrap>
              design-suriname-2015.mp3
            </Typography>
          }
          secondary={
            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'caption', color: 'text.disabled' }}
              divider={
                <Box
                  sx={{
                    mx: 0.5,
                    width: 2,
                    height: 2,
                    borderRadius: '50%',
                    bgcolor: 'currentColor',
                  }}
                />
              }
            >
              <span>2.3 GB</span>
              <span>30 min ago</span>
            </Stack>
          }
        />

        <Button size="small" variant="outlined">
          Download
        </Button>
      </Stack>
    </Stack>
  );

  const tagsAction = (
    <Stack direction="row" spacing={0.75} flexWrap="wrap" sx={{ mt: 1.5 }}>
      <Label variant="outlined" color="info">
        Design
      </Label>
      <Label variant="outlined" color="warning">
        Dashboard
      </Label>
      <Label variant="outlined">Design system</Label>
    </Stack>
  );

  const paymentAction = (
    <Stack direction="row" spacing={1} sx={{ mt: 1.5 }}>
      <Button size="small" variant="contained">
        Pay
      </Button>
      <Button size="small" variant="outlined">
        Decline
      </Button>
    </Stack>
  );
  console.log(paymentAction, tagsAction, fileAction, projectAction, friendAction);

  return (
    <ListItemButton
      disableRipple
      sx={{
        p: 2.5,
        alignItems: 'flex-start',
        borderBottom: (theme) => `dashed 1px ${theme.palette.divider}`,
      }}
    >
      {renderUnReadBadge}

      {/* {renderAvatar} */}

      <Stack
        sx={{ flexGrow: 1 }}
        onClick={() =>
          notification.status === 'unread' && handleViewForm(notification.notificationId)
        }
      >
        {renderText}
      </Stack>
    </ListItemButton>
  );
}

NotificationItem.propTypes = {
  notification: PropTypes.object,
  handleViewForm: PropTypes.func,
};