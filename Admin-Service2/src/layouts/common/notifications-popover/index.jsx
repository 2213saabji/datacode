import { m } from 'framer-motion';
import { useState, useEffect, useCallback, useRef } from 'react';
import { io } from 'socket.io-client';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import List from '@mui/material/List';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import { _notifications } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import { useGetNotifications, useGetArchiveNotifications } from 'src/api/notifications';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { varHover } from 'src/components/animate';
import EmptyContent from 'src/components/empty-content';

import NotificationItem from './notification-item';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'all',
    label: 'All',
    count: 0,
  },
  {
    value: 'unread',
    label: 'Unread',
    count: 0,
  },
  {
    value: 'archived',
    label: 'Archived',
    count: 0,
  },
];

// ----------------------------------------------------------------------

export default function NotificationsPopover() {
  const drawer = useBoolean();

  const smUp = useResponsive('up', 'sm');
  const { user } = useAuthContext();
  const [currentTab, setCurrentTab] = useState('all');
  const [notifications, setNotifications] = useState(_notifications);
  const [archiveNotifications, setArchiveNotifications] = useState([]);
  const [counts, setCounts] = useState({ all: 0, unread: 0, archived: 0 });

  const audioRef = useRef(null);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const router = useRouter();
  const handleViewForm = useCallback(
    (notificationId) => {
      drawer.onFalse();
      router.push(paths.dashboard.notifications.details(notificationId));
    },
    [router, drawer]
  );

  const { users: resdata } = useGetNotifications(user.userId);
  const { users: archiveNotificationData } = useGetArchiveNotifications(user.userId);

  const filteredData = resdata?.data?.notifications || [];
  const archiveData = archiveNotificationData?.data?.notifications || [];

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const handleMarkAllAsRead = () => {
    setNotifications(
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
    );
  };

  const renderHead = (
    <Stack direction="row" alignItems="center" sx={{ py: 2, pl: 2.5, pr: 1, minHeight: 68 }}>
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Notifications
      </Typography>

      {!!totalUnRead && (
        <Tooltip title="Mark all as read">
          <IconButton color="primary" onClick={handleMarkAllAsRead}>
            <Iconify icon="eva:done-all-fill" />
          </IconButton>
        </Tooltip>
      )}

      {!smUp && (
        <IconButton onClick={drawer.onFalse}>
          <Iconify icon="mingcute:close-line" />
        </IconButton>
      )}
    </Stack>
  );

  const getCount = (tabb, archiveNotificationDataa, filteredDataa) => {
    if (tabb.value === 'archived') {
      return archiveNotificationDataa?.data?.count || 0;
    }
    if (filteredDataa) {
      return filteredDataa.length;
    }
    return tabb.count;
  };

  const renderTabs = (
    <Tabs value={currentTab} onChange={handleChangeTab}>
      {TABS.map((tab) => (
        <Tab
          key={tab.value}
          iconPosition="end"
          value={tab.value}
          label={tab.label}
          icon={
            <Label
              variant={((tab.value === 'all' || tab.value === currentTab) && 'filled') || 'soft'}
              color={
                (tab.value === 'unread' && 'info') ||
                (tab.value === 'archived' && 'success') ||
                'default'
              }
            >
              {getCount(tab, archiveNotificationData, filteredData)}
            </Label>
          }
          sx={{
            '&:not(:last-of-type)': {
              mr: 3,
            },
          }}
        />
      ))}
    </Tabs>
  );

  const renderList = (
    <Scrollbar>
      <List disablePadding>
        {filteredData?.map((notification) => (
          <Box
            key={notification.notificationId}
            onClick={() => {
              handleViewForm(notification.notificationId);
            }}
          >
            <NotificationItem
              key={notification.notificationId}
              notification={notification}
              handleViewForm={handleViewForm}
            />
          </Box>
        ))}
      </List>
    </Scrollbar>
  );

  const archivedRenderList = (
    <Scrollbar>
      <List disablePadding>
        {archiveData?.map((notification) => (
          <Box
            key={notification.archivedNotificationId}
            onClick={() => handleViewForm(notification.archivedNotificationId)}
          >
            <NotificationItem
              key={notification.archivedNotificationId}
              notification={notification}
              handleViewForm={handleViewForm}
            />
          </Box>
        ))}
      </List>
    </Scrollbar>
  );

  // WebSocket setup
  useEffect(() => {
    const socket = io("https://cmsdevapi.attplems.com/api/v1", {
      transports: ["websocket"],
      query: {
        userId: user.userId,
      },
      autoConnect: false,
      reconnection: false,
      rejectUnauthorized: false,
      secure: true,
    });

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("error", (error) => {
      console.log("Error:", error);
    });

    socket.on("reconnect", () => {
      console.log("Reconnected to server");
    });

    socket.emit("subscribeToNotifications", user.userId);

    socket.on("unsubscribeToNotifications", () => {
      console.log("Unsubscribed from notifications");
    });

    socket.on("notification", (notification) => {
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setCounts((prevCounts) => ({
        ...prevCounts,
        all: prevCounts.all + 1,
        unread: prevCounts.unread + 1,
      }));

      // Play sound notification
      if (audioRef.current) {
        console.log("Playing sound notification");
        audioRef.current.play().catch((error) => {
          console.error("Error playing sound:", error);
        });
      }
    });

    socket.on("updateNotification", (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((item) =>
          item.notificationId === notification.notificationId ? notification : item
        )
      );
    });

    socket.on("archiveNotification", (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((item) => item.notificationId !== notification.notificationId)
      );
      setArchiveNotifications((prevArchiveNotifications) => [notification, ...prevArchiveNotifications]);
    });

    socket.on("readNotification", (notification) => {
      setNotifications((prevNotifications) =>
        prevNotifications.map((item) =>
          item.notificationId === notification.notificationId ? notification : item
        )
      );
    });

    socket.on("countUpdate", (count) => {
      setCounts((prevCounts) => ({
        ...prevCounts,
        all: count,
        unread: count - prevCounts.archived,
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, [user.userId]);

  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        color={drawer.value ? 'primary' : 'default'}
        onClick={drawer.onTrue}
      >
        <Badge badgeContent={filteredData?.length} color="error">
          <Iconify icon="solar:bell-bing-bold-duotone" width={30} />
        </Badge>
      </IconButton>

      <audio
        ref={audioRef}
        src="/assets/notificationSound/notification-9-158194.mp3"
      >
        <track kind="captions" />
      </audio>

      <Drawer
        open={drawer.value}
        onClose={drawer.onFalse}
        anchor="right"
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 1, maxWidth: 420 },
        }}
      >
        {renderHead}

        <Divider />

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ pl: 2.5, pr: 1 }}
        >
          {renderTabs}
          <IconButton onClick={handleMarkAllAsRead}>
            <Iconify icon="solar:settings-bold-duotone" />
          </IconButton>
        </Stack>

        <Divider />

        {(() => {
          let content;
          if (filteredData.length || archiveData.length) {
            content = currentTab === 'archived' ? archivedRenderList : renderList;
          } else {
            content = (
              <EmptyContent
                title="No Notification"
                description="There are no Notification available at the moment."
                sx={{ py: 10 }}
              />
            );
          }
          return content;
        })()}

        <Box sx={{ p: 1 }}>
          <Button fullWidth size="large">
            View All
          </Button>
        </Box>
      </Drawer>
    </>
  );
}
