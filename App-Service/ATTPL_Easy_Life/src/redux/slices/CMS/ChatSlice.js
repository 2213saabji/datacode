// chatSlice.js
import {createSlice, createAsyncThunk, createSelector} from '@reduxjs/toolkit';
import io from 'socket.io-client';
import {ATTPL_CHAT_SOCKET_HOST_API} from '../../../config/config';
import ApiCaller from '../../../services/ApiCaller';

const initialState = {
  conversations: [],
  messages: {},
  connectedUsers: [],
  selectedConversationId: null,
  conversationParticipants: {},
  loading: false,
  error: null,
  socket: null,
  isConnected: false,
  newConversation: null,
  createConversationStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  createConversationError: null,
  phoneContacts: [],
  apiContacts: [],
  selectedContacts: [],
  userSearchTotalPages: 1,
  userSearchStatus: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  userSearchError: null,
  isLoadingPhoneContacts: false,
  isLoadingApiContacts: false,
  phoneContactsError: null,
  apiContactsError: null,
};

// Thunk to fetch conversation participants
export const getConversationParticipants = createAsyncThunk(
  'chat/getConversationParticipants',
  async (conversationId, {getState}) => {
    try {
      const response = await ApiCaller.get(
        `/conversations/details/fetch/${conversationId}`,
        'chat',
      );

      return {conversationId, participants: response.data};
    } catch (error) {
      console.error('Error fetching conversation participants:', error);
      throw error;
    }
  },
);
export const searchUsers = createAsyncThunk(
  'chat/searchUsers',
  async ({searchQuery, page = 1, limit = 10}, {getState, rejectWithValue}) => {
    try {
      const {auth} = getState();
      const response = await ApiCaller.get(
        `/user/search?name=${searchQuery}&page=${page}&limit=${limit}`,
        'ums',
      );
      return response.data.data;
    } catch (error) {
      console.error('Error searching users:', error);
      return rejectWithValue(
        error.response?.data || 'An error occurred while searching users',
      );
    }
  },
);
export const createNewConversation = createAsyncThunk(
  'chat/createNewConversation',
  async (conversationData, {rejectWithValue}) => {
    try {
      const response = await ApiCaller.post(
        '/conversations/create',
        conversationData,
        'chat',
      );

      if (response.data && response.data.data) {
        return response.data.data; // Return the full response
      } else {
        return rejectWithValue('Invalid response format');
      } // Make sure this is what your frontend expects
    } catch (error) {
      return rejectWithValue(
        error.response?.data ||
          'An error occurred while creating the conversation',
      );
    }
  },
);

// Thunk to initialize socket connection
export const initializeSocket = createAsyncThunk(
  'chat/initializeSocket',
  async (token, {dispatch, getState}) => {
    if (socket) socket.disconnect();
    const {auth} = getState();
    const socket = io.connect(ATTPL_CHAT_SOCKET_HOST_API, {
      auth: {token},
    });

    socket.on('connect', () => {
      console.log('User connected ');
      try {
        socket.emit('userJoined', auth.user.userId);

        dispatch(setIsConnected(true));
      } catch (error) {
        console.log(error);
      }
    });

    socket.on('disconnect', () => {
      dispatch(setIsConnected(false));
    });

    socket.on('connectedUsers', ({users}) => {
      console.log('mmmmmm');

      dispatch(setConnectedUsers(users));
    });

    socket.on('addConversationSuccess', conversation => {
      dispatch(addConversation(conversation));
    });

    socket.on('getConversationSuccess', conversation => {
      dispatch(setConversation(conversation));
    });

    socket.on('deleteMessageSuccess', ({messageId}) => {
      dispatch(deleteMessage(messageId));
    });

    socket.on('markMessageAsReadSuccess', result => {
      dispatch(updateMessageReadStatus(result));
    });

    socket.on('getRecentConversationSuccess', conversations => {
      // console.log(conversations[0].conversationDetail.messageDetails[0]);

      dispatch(setConversations(conversations));
    });

    socket.on('messageSent', data => {
      dispatch(updateMessageSentStatus(data));
    });

    return socket;
  },
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('sendMessage', messageData);
    }
    return messageData; // Optimistic update
  },
);

export const addConversation = createAsyncThunk(
  'chat/addConversation',
  async (conversationData, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('addConversation', conversationData);
    }
  },
);

export const getConversation = createAsyncThunk(
  'chat/getConversation',
  async (conversationId, {getState}) => {
    const {socket} = getState().chat;

    if (socket) {
      socket.emit('getConversation', {conversationId});
    }
  },
);

export const deleteMessage = createAsyncThunk(
  'chat/deleteMessage',
  async (messageData, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('deleteMessage', messageData);
    }
  },
);

export const markMessageAsRead = createAsyncThunk(
  'chat/markMessageAsRead',
  async (messageData, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('markMessageAsRead', messageData);
    }
  },
);

export const getRecentConversations = createAsyncThunk(
  'chat/getRecentConversations',
  async (userId, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('getRecentConversation', userId);
    }
  },
);

export const joinGroup = createAsyncThunk(
  'chat/joinGroup',
  async (conversationId, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('joinGroup', conversationId);
    }
  },
);

export const sendMessageToGroup = createAsyncThunk(
  'chat/sendMessageToGroup',
  async (messageData, {getState}) => {
    const {socket} = getState().chat;
    if (socket) {
      socket.emit('sendMessageToGroup', messageData);
    }
  },
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    setPhoneContacts: (state, action) => {
      state.phoneContacts = action.payload;
      state.isLoadingPhoneContacts = false;
    },
    setApiContacts: (state, action) => {
      state.apiContacts = action.payload;
      state.isLoadingApiContacts = false;
    },
    clearSelectedContacts: state => {
      state.selectedContacts = [];
    },
    toggleContactSelection: (state, action) => {
      const contact = action.payload;
      const index = state.selectedContacts.findIndex(
        c => (c.userId || c.id) === (contact.userId || contact.id),
      );
      if (index !== -1) {
        state.selectedContacts.splice(index, 1);
      } else {
        state.selectedContacts.push(contact);
      }
    },
    setLoadingPhoneContacts: (state, action) => {
      state.isLoadingPhoneContacts = action.payload;
    },
    setLoadingApiContacts: (state, action) => {
      state.isLoadingApiContacts = action.payload;
    },
    setPhoneContactsError: (state, action) => {
      state.phoneContactsError = action.payload;
    },
    setApiContactsError: (state, action) => {
      state.apiContactsError = action.payload;
    },
    setConversations: (state, action) => {
      state.conversations = action.payload;
      action.payload.forEach(item => {
        state.messages[item.conversationId] =
          item.conversationDetail.messageDetails;
      });
    },

    addMessage: (state, action) => {
      const {conversationId, content} = action.payload;
      if (!state.messages[conversationId]) {
        state.messages[conversationId] = [];
      }

      state.messages[conversationId].push(content);
    },
    setConnectedUsers: (state, action) => {
      state.connectedUsers = action.payload;
    },
    setSelectedConversationId: (state, action) => {
      state.selectedConversationId = action.payload;
    },
    setIsConnected: (state, action) => {
      state.isConnected = action.payload;
    },
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    setConversation: (state, action) => {
      const index = state.conversations.findIndex(
        c => c.conversationId === action.payload.conversationId,
      );
      if (index !== -1) {
        state.conversations[index] = action.payload;
      } else {
        state.conversations.push(action.payload);
      }
    },
    deleteMessage: (state, action) => {
      const messageId = action.payload;
      for (let conversationId in state.messages) {
        state.messages[conversationId] = state.messages[conversationId].filter(
          m => m.id !== messageId,
        );
      }
    },
    updateMessageReadStatus: (state, action) => {
      const {conversationId, messageId, readStatus} = action.payload;
      if (state.messages[conversationId]) {
        const message = state.messages[conversationId].find(
          m => m.id === messageId,
        );
        if (message) {
          message.read = readStatus;
        }
      }
    },
    updateMessageSentStatus: (state, action) => {
      const {conversationId, messageId, sentStatus} = action.payload;
      if (state.messages[conversationId]) {
        const message = state.messages[conversationId].find(
          m => m.id === messageId,
        );
        if (message) {
          message.sent = sentStatus;
        }
      }
    },
    resetChat: state => {
      return {...initialState, socket: state.socket};
    },
    setConversationParticipants: (state, action) => {
      const {conversationId, participants} = action.payload;
      state.conversationParticipants[conversationId] = participants;
    },
  },

  extraReducers: builder => {
    builder
      .addCase(getConversationParticipants.fulfilled, (state, action) => {
        const {conversationId, participants} = action.payload;
        state.conversationParticipants[conversationId] = participants;
      })
      .addCase(getConversationParticipants.rejected, (state, action) => {
        console.error(
          'Error fetching conversation participants:',
          action.error,
        );
      });
    builder
      .addCase(initializeSocket.fulfilled, (state, action) => {
        state.socket = action.payload;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        // Optimistic update handled in addMessage reducer
      })
      // Add other cases as needed
      .addCase(addConversation.fulfilled, (state, action) => {
        // Handle the result of addConversation if needed
      })
      .addCase(getConversation.fulfilled, (state, action) => {
        // Handle the result of getConversation if needed
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        // Handle the result of deleteMessage if needed
      })
      .addCase(markMessageAsRead.fulfilled, (state, action) => {
        // Handle the result of markMessageAsRead if needed
      })
      .addCase(getRecentConversations.fulfilled, (state, action) => {
        // Handle the result of getRecentConversations if needed
      })
      .addCase(joinGroup.fulfilled, (state, action) => {
        // Handle the result of joinGroup if needed
      })
      .addCase(sendMessageToGroup.fulfilled, (state, action) => {
        // Handle the result of sendMessageToGroup if needed
      })
      .addCase(createNewConversation.pending, state => {
        state.createConversationStatus = 'loading';
      })
      .addCase(createNewConversation.fulfilled, (state, action) => {
        state.createConversationStatus = 'succeeded';

        state.newConversation = action.payload;
        const transformedPayload = {
          conversationDetail: action.payload,
          // Include any other keys/values you might need here
        };

        // Push the transformed payload into the conversations array
        state.conversations.push(transformedPayload);
      })
      .addCase(createNewConversation.rejected, (state, action) => {
        state.createConversationStatus = 'failed';
        state.createConversationError = action.payload;
      })
      .addCase(searchUsers.pending, state => {
        state.userSearchStatus = 'loading';
        state.isLoadingApiContacts = true;
      })
      .addCase(searchUsers.fulfilled, (state, action) => {
        state.userSearchStatus = 'succeeded';
        state.apiContacts = action.payload.users;
        state.userSearchTotalPages = action.payload.pagination.totalPages;
        state.isLoadingApiContacts = false;
      })
      .addCase(searchUsers.rejected, (state, action) => {
        state.userSearchStatus = 'failed';
        state.userSearchError = action.payload;
        state.apiContactsError = action.payload;
        state.isLoadingApiContacts = false;
      });
  },
});

export const {
  setConversations,
  addMessage,
  clearSelectedContacts,
  setConnectedUsers,
  setSelectedConversationId,
  setIsConnected,
  setConversation,
  updateMessageReadStatus,
  updateMessageSentStatus,
  resetChat,
  setPhoneContacts,
  setApiContacts,
  toggleContactSelection,
  setLoadingPhoneContacts,
  setLoadingApiContacts,
  setPhoneContactsError,
  setApiContactsError,
} = chatSlice.actions;

export default chatSlice.reducer;
