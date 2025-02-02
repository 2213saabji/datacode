/* eslint-disable no-unused-vars */
// import { sub } from 'date-fns';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import EmojiPicker from 'emoji-picker-react';
// import { useLocation } from 'react-router-dom';
import imageCompression from 'browser-image-compression';
import { useRef, useMemo, useState, useEffect, useCallback } from 'react';

// import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
// import CardMedia from '@mui/material/CardMedia';
import IconButton from '@mui/material/IconButton';
// import CardContent from '@mui/material/CardContent';
import {
  Box,
  Stack,
  // CardActionArea
} from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { ATTPL_CHAT_SOCKET_URL } from 'src/config-global';

// import { UseMockedUser } from 'src/hooks/use-mocked-user';
// import uuidv4 from 'src/utils/uuidv4';

import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

// import { sendMessage, createConversation } from 'src/api/chat';

import axios from 'axios';

import { poster } from 'src/utils/axios-call';

import { useAuthContext } from 'src/auth/hooks';
import { createNotifications } from 'src/api/notifications';
import { createConversation, getConversationMember } from 'src/api/chatt';

import Iconify from 'src/components/iconify';

import Recorder from 'src/sections/chat/chat-voice-recorder';

// import Send from './view/assets/Send.svg';
// import Send from "./view/assets/Send.svg";

// Create a new Socket.IO instance
const socket = io(`${ATTPL_CHAT_SOCKET_URL}`);
const audioExtensions = ['mp3', 'wav', 'aac'];
const videoExtensions = ['mp4', 'avi', 'mkv'];
const photoExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg', 'mkv'];
const documentExtensions = [
  'html',
  'htm',
  'css',
  'js',
  'doc',
  'docx',
  'ppt',
  'pptx',
  'xls',
  'xlsx',
  'txt',
  'rtf',
  'pdf',
  'ods',
  'csv',
  'odp',
  'mdb',
  'accdb',
  'sqlite',
  'db',
  'zip',
  'rar',
  '7z',
  'epub',
  'mobi',
  'c',
  'cpp',
  'py',
  'java',
  'md',
  'json',
  'xml',
  'css',
  'jpg',
  'jpeg',
  'png',
  'gif',
  'bmp',
  'svg',
  'mkv',
];
//  ----------------------------------------------------------------------

export default function ChatMessageInput({
  onAddRecipients,
  userId,
  recipients,
  disabled,
  currChatType,
  selectedConversationId,
}) {
  const router = useRouter();
  console.log({ recipients });
  const [activerecord, setactioverecord] = useState(false);
  const { user } = useAuthContext();
  const [image, setImage] = useState(null);
  const [dock, setDock] = useState(null);
  const [objectImage, setObjectImage] = useState(null);
  const [objectDock, setObjectDock] = useState(null);
  const fileRef = useRef(null);
  const sfileRef = useRef(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState('');
  const [groupMembers, setGroupMembers] = useState([]);

  const [audio, setAudio] = useState(null);
  const [conversationId, setConversationId] = useState(selectedConversationId);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [receiverUserId, setReceiverUserId] = useState([]);

  useEffect(() => {
    const handleFetch = async () => {
      try {
        const response = await axios.get(
          `https://csdevapi.attplems.com/api/v1/conversations/details/fetch/${selectedConversationId}`
        );
        const connUsers = response.data.data;
        setConnectedUsers(connUsers);
        const getReceiverUserId = (conversation) => {
          const userIds = conversation?.sortedUserIds?.split(',')?.map(Number); // Split the string and convert to numbers
          const receiverId = userIds?.find((id) => id !== userId); // Find the ID that is not the current userId
          return receiverId;
        };

        const receiverId = getReceiverUserId(connUsers, userId);
        setReceiverUserId(receiverId);
        console.log({ receiverId }); // Outputs: 177
      } catch (error) {
        console.error('Error fetching conversation details:', error);
      }
    };

    if (selectedConversationId) {
      handleFetch();
    }
  }, [selectedConversationId, userId]);
  useEffect(() => {
    // setImage(null)
    // Update conversationId whenever selectedConversationId changes
    setConversationId(selectedConversationId);
    setImage(null);
    setDock(null);
    setShow(false);
    setactioverecord(false);
    setMessage('');
    getGroupMembers(selectedConversationId);
  }, [selectedConversationId]);

  const updateData = (newData) => {
    setAudio(newData);
    setactioverecord(false);
  };

  const getGroupMembers = async (conversationIdForGetGroupMembers) => {
    try {
      const response = await getConversationMember(conversationIdForGetGroupMembers);

      setGroupMembers(response);
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = useMemo(
    () => async (file) => {
      try {
        const formData = new FormData();
        formData.append('image', file);

        const response = await uploadclaimFileInAWSS3(formData);
        const fileUrl = response?.data?.data || {};

        if (fileUrl) {
          setDock(fileUrl.preview);
          setObjectDock(fileUrl);
        } else {
          console.error('Error in uploading file:', response);
        }
      } catch (error) {
        console.error('Error in uploading file:', error);
      }
    },
    []
  );

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadclaimFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response.data.data : {};
        if (imageUrl) {
          setImage(imageUrl.preview);
          setObjectImage(imageUrl);
        } else {
          console.error('Error in uploading file:', response);
        }
      } catch (error) {
        console.error('Error compressing image:', error);
      }
    },
    []
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
      e.target.value = '';
    }
  };

  // Delete image from AWS S3
  const handleCancleImage = useCallback(async () => {
    const dataToSend = { url: image };
    await deleteFileFromAWSS3(dataToSend)
      .then((data) => {
        setImage(null);
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
      });
  }, [setImage, image]);

  const handleDockChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadFile(file);
      e.target.value = '';
    }
  };

  // Delete file from AWS S3
  const handleCancleDoc = useCallback(async () => {
    const dataToSend = { url: dock };
    await deleteFileFromAWSS3(dataToSend)
      .then((data) => {
        setDock(null);
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
      });
  }, [setDock, dock]);

  const conversationData = useMemo(
    () => ({
      userIds: [...recipients.map((recipient) => recipient.userId), userId],
      type: recipients.length > 1 ? 'group' : 'private',
    }),
    [recipients, userId]
  );

  const handelemoji = () => {
    setShow(!show);
  };
  const handleAttachh = useCallback(() => {
    if (fileRef.current) {
      fileRef.current.click();
    }
  }, []);
  const handleAttach = useCallback(() => {
    if (sfileRef.current) {
      sfileRef.current.click();
    }
  }, []);
  const handelmicrophone = () => {
    setactioverecord(!activerecord);
  };

  const handleChangeMessage = useCallback((event) => {
    setMessage(event.target.value);
  }, []);

  const handleEmojiSelect = (emojiObject) => {
    setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    setShow(false);
  };

  const emojiPickerStyle = {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '10px',
    color: '#212b36',
    backgroundColor: '#212b36',
  };

  const handleSendMessage = useCallback(
    async (event) => {
      let contentType;
      if (message) {
        contentType = 'text';
      } else if (image) {
        contentType = 'image';
      } else if (dock) {
        contentType = 'dock';
      } else {
        contentType = 'audio';
      }
      try {
        if (message || image || audio || dock) {
          if (selectedConversationId) {
            if (groupMembers.length > 2) {
              const messageData = {
                content: message || image || audio || dock,
                type: contentType,
                groupMembers,
                senderId: userId,
                conversationId: selectedConversationId,
              };

              if (messageData.content) {
                const userIds = recipients.map((recipient) => recipient.userId);
                console.log('useridss', userIds);
                const messageInfo = `You received a message from ${userId}`;
                const service = 'Chat Service';
                const Url='/dashboard/chat'
                createNotifications(receiverUserId, messageInfo, service,Url);
                socket.emit('sendMessageToGroup', messageData);
                setMessage('');
              }
            } else {
              const messageData = {
                content: message || image || audio || dock,
                type: contentType,
                senderId: userId,
                conversationId,
              };

              if (messageData.content) {
                const userIds = recipients.map((recipient) => recipient.userId);
                console.log('useridss', userIds);
                const messageInfo = `You received a message from ${userId}`;
                const service = 'Chat Service';
                const Url='/dashboard/chat'
                // const data=  createNotifications(userIds,messageInfo,service)
                // console.log({data})
                createNotifications(receiverUserId, messageInfo, service,Url);
                socket.emit('sendMessage', messageData);
                setMessage('');
              }
            }
          } else {
            conversationData.groupName = 'Test Group';
            conversationData.createdBy = userId;

            const res = await createConversation(conversationData);

            if (res) {
              if (groupMembers.length > 2) {
                const messageData = {
                  content: message || image || audio || dock,
                  type: contentType,
                  groupMembers,
                  senderId: userId,
                  conversationId: res?.data?.data?.conversationId,
                };

                if (messageData.content) {
                  const userIds = recipients.map((recipient) => recipient.userId);
                  console.log('useridss', userIds);
                  const messageInfo = `You received a message from ${userId}`;
                  const service = 'Chat Service';
                  const Url='/dashboard/chat'
                  receiverUserId?.forEach((id) => {
                    createNotifications(id, messageInfo, service,Url);
                  });
                  socket.emit('sendMessageToGroup', messageData);
                  setMessage('');
                }
              } else {
                const messageData = {
                  content: message || image || audio || dock,
                  type: contentType,
                  senderId: userId,
                  conversationId: res?.data?.data?.conversationId,
                };

                if (messageData.content) {
                  let userIds;
                  recipients.forEach((recipient) => {
                    userIds = recipient.userId;
                  });

                  console.log('useridss', userIds);
                  const messageInfo = `You received a message from ${userId}`;
                  const service = 'Chat Service';
                  const Url='/dashboard/chat'
                  createNotifications(receiverUserId, messageInfo, service,Url);
                  // console.log(data)
                  createNotifications(2, messageInfo, service,Url);
                  socket.emit('sendMessage', messageData);
                  setMessage('');
                }
              }
              router.push(`${paths.dashboard.chat}?id=${res?.data?.data?.conversationId}`);
              onAddRecipients([]);
            }
          }
          setMessage('');
          setImage(null);
          setAudio(null);
          setDock(null);

          let galleryData;

          if (objectImage) {
            // image upload for gallery
            galleryData = {
              userId: user.userId,
              photo: objectImage,
            };
          } else if (objectDock) {
            const typeFile = objectDock.preview.slice(objectDock.preview.lastIndexOf('.') + 1);
            if (videoExtensions.includes(typeFile)) {
              galleryData = {
                userId: user.userId,
                video: objectDock,
              };
            } else if (documentExtensions.includes(typeFile)) {
              galleryData = {
                userId: user.userId,
                pdf: objectDock,
              };
            }
          }
          const headers = {
            Authorization: `Bearer ${user.accessToken}`,
            'Content-Type': 'application/json',
          };
          if (image) {
            await poster('/gallery/create', galleryData, headers);
          }
        }
        setObjectImage(null);
        setObjectDock(null);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    },
    [
      message,
      image,
      dock,
      audio,
      selectedConversationId,
      groupMembers,
      userId,
      conversationId,
      conversationData,
      router,
      onAddRecipients,
      objectImage,
      objectDock,
      user.userId,
      user.accessToken,
      recipients,
      receiverUserId,
    ]
  );
  const handleSendMessageCallback = useCallback(() => {
    if (audio) handleSendMessage();
  }, [audio, handleSendMessage]);

  useEffect(() => {
    handleSendMessageCallback();
  }, [audio, handleSendMessageCallback]);

  let placeholder;

  if (disabled && !selectedConversationId) {
    placeholder = 'First Select Recipients';
  } else if (selectedConversationId) {
    placeholder = 'Type a message';
  } else {
    placeholder = 'Send a message to start conversation';
  }

  return (
    <>
      {show ? (
        <Stack sx={{ width: '63%', height: '80%' }}>
          <EmojiPicker style={emojiPickerStyle} onEmojiClick={handleEmojiSelect} />
        </Stack>
      ) : (
        // eslint-disable-next-line react/jsx-no-useless-fragment
        <></>
      )}
      {image && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',

            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
          }}
        >
          <Paper elevation={3}>
            <img
              src={image}
              alt="loading"
              style={{ width: '98%', height: '83px', borderRadius: '10px' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box onClick={handleCancleImage}>
                <IconButton>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </Box>

              <Box onClick={handleSendMessage}>
                <IconButton>
                  <Iconify icon="eva:paper-plane-fill" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}
      {dock && (
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',

            '& > :not(style)': {
              m: 1,
              width: 128,
              height: 128,
            },
          }}
        >
          <Paper elevation={3}>
            <img
              src="https://collections.durham.ac.uk/assets/default-c6018ff301250c55bcc663293e1816c7daece4159cbc93fc03d9b35dbc3db30d.png"
              alt="file"
              style={{ width: '100%', height: '83px', borderRadius: '10px', objectFit: 'contain' }}
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box onClick={handleCancleDoc}>
                <IconButton>
                  <Iconify icon="material-symbols:close" />
                </IconButton>
              </Box>

              <Box onClick={handleSendMessage}>
                <IconButton>
                  <Iconify icon="eva:paper-plane-fill" />
                </IconButton>
              </Box>
            </Box>
          </Paper>
        </Box>
      )}

      <InputBase
        value={message}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            handleSendMessage();
          }
        }}
        onChange={handleChangeMessage}
        placeholder={placeholder}
        disabled={disabled}
        startAdornment={
          <>
            {!disabled && (
              <IconButton onClick={handelemoji}>
                <Iconify icon="eva:smiling-face-fill" />
              </IconButton>
            )}
          </>
        }
        endAdornment={
          !disabled && activerecord ? (
            <>
              <Recorder
                updateData={updateData}
                setAudio={setAudio}
                handleSendMessage={handleSendMessage}
              />
              <IconButton onClick={handelmicrophone}>
                <Iconify icon="mingcute:close-line" />
              </IconButton>
            </>
          ) : (
            <Stack direction="row" sx={{ flexShrink: 0, display: disabled ? 'none' : 'flex' }}>
              {message === '' ? (
                <>
                  <IconButton onClick={handleAttachh}>
                    <Iconify icon="solar:gallery-add-bold" />
                  </IconButton>
                  <IconButton onClick={handleAttach}>
                    <Iconify icon="eva:attach-2-fill" />
                  </IconButton>
                  <IconButton onClick={handelmicrophone}>
                    <Iconify icon="solar:microphone-bold" />
                  </IconButton>
                </>
              ) : (
                <IconButton onClick={handleSendMessage}>
                  <Iconify icon="eva:paper-plane-fill" sx={{ color: 'primary.main' }} />
                </IconButton>
              )}
            </Stack>
          )
        }
        sx={{
          px: 1,
          height: 56,
          flexShrink: 0,
          borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      />
      <input
        type="file"
        ref={fileRef}
        style={{ display: 'none' }}
        onChange={handleImageChange}
        accept="image/*"
      />
      <input type="file" ref={sfileRef} style={{ display: 'none' }} onChange={handleDockChange} />
    </>
  );
}

ChatMessageInput.propTypes = {
  userId: PropTypes.number,
  disabled: PropTypes.bool,
  onAddRecipients: PropTypes.func,
  recipients: PropTypes.array,
  selectedConversationId: PropTypes.string,
  currChatType: PropTypes.string,
};
