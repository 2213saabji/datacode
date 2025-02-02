import { useRef } from 'react';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { formatDistanceToNowStrict } from 'date-fns';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';

import { deleteFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { ATTPL_CHAT_SOCKET_URL } from 'src/config-global';

import Iconify from 'src/components/iconify';

import { useGetMessage } from './hooks';

const SOCKET_URL = `${ATTPL_CHAT_SOCKET_URL}`;

export default function ChatMessageItem({ message, onOpenLightbox, userId, lastMessageRead }) {
  // for name of doc
  const lastIndex = message.content?.lastIndexOf('-');

  const nameOfDoc = message.content?.substring(lastIndex + 1);

  const { content, created_at, senderId } = message;

  const me = senderId === userId;
  const socketRef = useRef(null);
  const handleDelete = async () => {
    if (message.type === 'audio' || message.type === 'image' || message.type === 'dock') {
      const dataToSend = { url: message.content };
      await deleteFileFromAWSS3(dataToSend)
        .then((data) => {
          if (!socketRef.current) {
            socketRef.current = io(SOCKET_URL);
          }

          const socket = socketRef.current;

          try {
            if (message.senderId === userId) {
              socket.emit('deleteMessage', {
                messageId: message.messageId,
                conversationId: message.conversationId,
                senderId,
              });
            }
          } catch (err) {
            console.log(err.message);
          }
        })
        .catch((err) => {
          console.error('Error in deleting files:', err);
        });
    } else {
      if (!socketRef.current) {
        socketRef.current = io(SOCKET_URL);
      }

      const socket = socketRef.current;

      try {
        if (message.senderId === userId) {
          socket.emit('deleteMessage', {
            messageId: message.messageId,
            conversationId: message.conversationId,
            senderId,
          });
        }
      } catch (err) {
        console.log(err.message);
      }
    }
  };

  const { hasImage, hasDock, hasAudio, hasText } = useGetMessage({
    message,
    // participants,
    currentUserId: `${userId}`,
  });

  const renderInfo = (
    <Typography
      noWrap
      variant="caption"
      sx={{
        mb: 1,
        color: 'text.disabled',
        ...(!me && {
          mr: 'auto',
        }),
      }}
    >
      {!me && `${message?.sender?.UserProfile?.first_name || message?.sender?.phone},`} &nbsp;
      {formatDistanceToNowStrict(new Date(created_at), {
        addSuffix: true,
      })}
    </Typography>
  );

  const handleDownload = (url) => {
    window.open(url);
  };

  // const renderBody = (
  //   <Stack
  //     sx={{
  //       p: 1,
  //       minWidth: 48,
  //       maxWidth: 320,
  //       borderRadius: 1,
  //       typography: 'body2',
  //       bgcolor: me ? 'primary.lighter' : 'background.neutral',
  //       color: me ? 'grey.800' : 'inherit',
  //     }}
  //   >
  //     {content}
  //   </Stack>
  // );
  const renderBody = (
    <Stack
      sx={{
        p: 1,
        minWidth: 48,
        maxWidth: 320,
        borderRadius: 1,
        typography: 'body2',
        bgcolor: 'background.neutral',
        ...(me && message.type !== 'audio' && { paddingRight: 5 }),
        ...(me && {
          color: 'grey.800',
          bgcolor: 'primary.lighter',
        }),
        ...(hasImage && {
          p: 0,
          bgcolor: 'transparent',
        }),
        ...(hasDock && {
          maxWidth: 250,
          p: 0,
          bgcolor: 'transparent',
        }),
        ...(hasAudio && {
          p: 0,
          bgcolor: 'transparent',
          ...(me && {
            color: 'grey.800',
            bgcolor: 'primary.lighter',
          }),
        }),
      }}
    >
      {hasImage ? (
        <Box
          component="img"
          alt="attachment"
          src={content}
          onClick={() => onOpenLightbox(content)}
          sx={{
            minHeight: 220,
            borderRadius: 1.5,
            cursor: 'pointer',
            '&:hover': {
              opacity: 0.9,
            },
          }}
        />
      ) : null}

      {hasText ? <>{content}</> : null}

      {hasDock ? (
        <Card sx={{ maxWidth: 250, position: 'relative' }}>
          <Box
            component="img"
            src="https://collections.durham.ac.uk/assets/default-c6018ff301250c55bcc663293e1816c7daece4159cbc93fc03d9b35dbc3db30d.png"
            alt="file"
          />

          <CardActions
            style={{
              position: 'absolute',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              bottom: 0,
              width: '100%',
              backgroundColor: '#233142bb',
              borderRadius: '1px 1px 1px gray',
            }}
          >
            <Typography variant="paragraph" sx={{ color: '#fff' }}>
              {nameOfDoc}
            </Typography>
            <Button
              variant="contained"
              size="large"
              style={{ width: '20%' }}
              onClick={() => handleDownload(message.content)}
            >
              <Iconify width={16} icon="bi:download" />
            </Button>
          </CardActions>
        </Card>
      ) : //     <Card sx={{ maxWidth: 250 }}>
      //     {/* <CardMedia
      //       sx={{ height: 140 }}
      //       image={content}
      //       title="green iguana"
      //       type="application/pdf"
      //     /> */}
      //     <iframe
      //   src={content}
      //   title="Document Preview"
      //   width="70%"
      //   height="200px"
      // />
      //     <CardActions>
      //       <Button size="small">Open</Button>
      //       <Button size="small">Save</Button>
      //     </CardActions>
      //   </Card>
      // // <embed src={content} type="application/pdf" width="100%" height="400px" />
      // // <DocumentPreview   fileUrl={content}/>
      // <Box>
      //  <img src={content} type="application/pdf"   />
      // </Box>
      null}
      {hasAudio ? (
        <Paper
          elevation={0}
          sx={{ width: '248px', bgcolor: me ? 'primary.lighter' : 'background.neutral' }}
        >
          <Box m={1}>
            <audio controls style={{ width: '100%' }}>
              <source src={content} type="audio/mp3" />
              <track kind="captions" label="English" />
              Your browser does not support the audio element.
            </audio>
          </Box>
        </Paper>
      ) : // <></>
      //   <audio controls>
      //  <source src={content} type="audio/mpeg" />
      // <track kind="captions" src="hi this is caption" label="English captions" />
      //    Your browser does not support the audio element.
      //   </audio>
      null}
      {/* {hasAudio ? (
            <audio controls>
              <source src={content} type="audio/mpeg" />
              <track kind="captions" src="hi this is caption" label="English captions" />
              Your browser does not support the audio element.
            </audio>
          ) : null} */}
      {me && (
        <Iconify
          icon="solar:check-read-linear"
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            color: lastMessageRead ? 'blue' : '#7d7d7daa',
          }}
        />
      )}
    </Stack>
  );

  const renderActions = (
    <Stack
      direction="row"
      className="message-actions"
      sx={{
        pt: 0.5,
        opacity: 0,
        top: '100%',
        left: 0,
        position: 'absolute',
        transition: (theme) =>
          theme.transitions.create(['opacity'], {
            duration: theme.transitions.duration.shorter,
          }),
        ...(me && {
          left: 'unset',
          right: 0,
        }),
      }}
    >
      {/* <IconButton size="small">
        <Iconify icon="solar:reply-bold" width={16} />
      </IconButton>
      <IconButton size="small">
        <Iconify icon="eva:smiling-face-fill" width={16} />
      </IconButton> */}
      {me && (
        <IconButton size="small" onClick={handleDelete}>
          <Iconify icon="solar:trash-bin-trash-bold" width={16} />
        </IconButton>
      )}
    </Stack>
  );

  return (
    <Stack direction="row" justifyContent={me ? 'flex-end' : 'unset'} sx={{ mb: 5 }}>
      <Stack alignItems={me ? 'flex-end' : 'unset'}>
        {renderInfo}
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            position: 'relative',
            '&:hover': {
              '& .message-actions': {
                opacity: 1,
              },
            },
          }}
        >
          {renderBody}
          {renderActions}
        </Stack>
      </Stack>
    </Stack>
  );
}

ChatMessageItem.propTypes = {
  userId: PropTypes.number.isRequired,
  message: PropTypes.object,
  onOpenLightbox: PropTypes.func,
  lastMessageRead: PropTypes.bool,
};
