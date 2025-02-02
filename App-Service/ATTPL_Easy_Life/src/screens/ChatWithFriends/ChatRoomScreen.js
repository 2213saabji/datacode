import React, {useState, useRef, useCallback, useMemo, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions,
  Animated,
  PanResponder,
  Alert,
  ScrollView,
} from 'react-native';
import {
  Appbar,
  Text,
  Avatar,
  IconButton,
  Portal,
  Dialog,
  Button,
} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useSelector, useDispatch} from 'react-redux';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {FlashList} from '@shopify/flash-list';
import LinearGradient from 'react-native-linear-gradient';
import Geolocation from '@react-native-community/geolocation';
import {
  sendMessage,
  addMessage,
  deleteMessage,
} from '../../redux/slices/CMS/ChatSlice';
import {
  selectMessagesByConversationId,
  selectSocket,
} from '../../redux/selectors/CMS/ChatSelectors';
import UUID from 'react-native-uuid';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import TypingIndicator from '../../components/ChatWithFriends/TypingIndicator';
import {playReceiveSound, playSendSound} from '../../utilities/sounds/message';
import MemoizedCustomChatInput from '../../components/ChatWithFriends/ChatInput';
import ConversationName from '../../utilities/chat/getConversationName';
import AvatarImage from '../../components/ChatWithFriends/AvatarImage';
import {MessageItem} from '../../components/ChatWithFriends/MessageItem';
import {GroupMessageItem} from '../../components/ChatWithFriends/GroupMessageItem';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {useNavigation} from '@react-navigation/native';

const {width: SCREEN_WIDTH} = Dimensions.get('window');

const ChatRoomScreen = React.memo(({route}) => {
  const navigation = useNavigation();
  const {
    conversationId,
    conversation = 'Chat',
    participants = [],
  } = route.params;

  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme) || {colors: {}, fonts: {}};

  const reduxMessages =
    useSelector(state =>
      selectMessagesByConversationId(state, conversationId),
    ) || [];

  const {userId} = useSelector(selectUser) || {};
  const socket = useSelector(selectSocket);

  const [localMessages, setLocalMessages] = useState(reduxMessages);
  const [isTyping, setIsTyping] = useState(false);
  const replyingToRef = useRef(null);
  const [isListReady, setIsListReady] = useState(false);
  const [inputText, setInputText] = useState('');
  const flashListRef = useRef(null);
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [headerHeight] = useState(new Animated.Value(80));
  const {showAlert} = useCustomAlert();
  const [infoDialogVisible, setInfoDialogVisible] = useState(false);
  useEffect(() => {
    const updatedMessages = reduxMessages.map(message => ({
      ...message,
      id: UUID.v4(),
    }));
    if (JSON.stringify(updatedMessages) !== JSON.stringify(localMessages)) {
      setLocalMessages(updatedMessages);
    }
  }, [reduxMessages]);
  const showInfoDialog = () => {
    setInfoDialogVisible(true);
  };

  const hideInfoDialog = () => {
    setInfoDialogVisible(false);
  };
  const scrollToEnd = useCallback(() => {
    if (flashListRef.current && isListReady && localMessages.length > 0) {
      flashListRef.current.scrollToEnd({animated: true});
    }
  }, [isListReady]);

  useEffect(() => {
    if (localMessages.length > 0) {
      scrollToEnd();
    }
  }, [localMessages, scrollToEnd]);

  useEffect(() => {
    if (localMessages.length > 0) {
      scrollToEnd();
    }
  }, [localMessages, scrollToEnd]);

  const handleDeleteMessage = useCallback(
    message => {
      showAlert(
        'Are you sure you want to delete this message?',
        'confirm',
        () => {
          setLocalMessages(prevMessages =>
            prevMessages.filter(msg => msg.id !== message.id),
          );
          dispatch(deleteMessage(message));
        },
      );
    },
    [dispatch],
  );
  const handleSendMessage = useCallback(
    async (content, type = 'text') => {
      if (content) {
        const newMessage = {
          conversationId,
          content,
          senderId: userId,
          type,
          created_at: new Date().toISOString(),
          isUnread: false,
          replyTo: replyingToRef.current ? replyingToRef.current.id : null,
          id: UUID.v4(),
        };

        setInputText('');
        replyingToRef.current = null;

        setLocalMessages(prevMessages => [...prevMessages, newMessage]);
        await dispatch(sendMessage(newMessage));

        playSendSound();
        scrollToEnd();
      }
    },
    [conversationId, userId, dispatch, scrollToEnd],
  );

  const handleReply = useCallback(message => {
    replyingToRef.current = message;
    setInputText(`Replying to: "${message.content?.substring(0, 30)}..."\n`);
  }, []);

  const renderMessage = useCallback(
    ({item, index}) => {
      const isGroupMessage = participants.length > 2;
      const showSenderInfo = isGroupMessage && item.senderId !== userId;
      const prevMessage = index > 0 ? localMessages[index - 1] : null;
      const showAvatar =
        showSenderInfo &&
        (!prevMessage || prevMessage.senderId !== item.senderId);
      const senderName = showSenderInfo
        ? participants.find(p => p.id === item.senderId)?.name
        : null;

      return (
        <>
          {isGroupMessage ? (
            <GroupMessageItem
              item={item}
              userId={userId}
              colors={colors}
              fonts={fonts}
              handleReply={handleReply}
              participants={participants}
              onDeleteMessage={handleDeleteMessage}
            />
          ) : (
            <MessageItem
              item={item}
              userId={userId}
              colors={colors}
              fonts={fonts}
              handleReply={handleReply}
              showAvatar={showAvatar}
              senderName={senderName}
              onDeleteMessage={handleDeleteMessage}
            />
          )}
        </>
      );
    },
    [userId, participants, localMessages],
  );

  const keyExtractor = useCallback(item => item.id.toString(), []);

  const otherParticipant = useMemo(
    () => participants.find(p => p.id !== userId) || {},
    [participants, userId],
  );

  const isGroupChat = participants.length > 2;

  useEffect(() => {
    if (socket) {
      const handleNewMessage = message => {
        if (message.conversationId === conversationId) {
          dispatch(addMessage({...message, id: UUID.v4()}));
          setLocalMessages(prevMessages => [
            ...prevMessages,
            {...message, id: UUID.v4()},
          ]);
          playReceiveSound();
          scrollToEnd();
        }
      };

      socket.on('sendMessageSuccess', handleNewMessage);

      return () => {
        socket.off('sendMessageSuccess', handleNewMessage);
      };
    }
  }, [socket, conversationId, scrollToEnd]);

  const handleScroll = event => {
    const {contentOffset, layoutMeasurement, contentSize} = event.nativeEvent;
    const paddingToBottom = 20;
    const isCloseToBottom =
      layoutMeasurement.height + contentOffset.y >=
      contentSize.height - paddingToBottom;
    setShowScrollButton(!isCloseToBottom);

    // Animate header height
    Animated.timing(headerHeight, {
      toValue: contentOffset.y > 50 ? 50 : 80,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <Appbar.Header style={styles.header}>
          <Appbar.BackAction
            onPress={() => navigation.goBack()}
            color={colors.primary}
          />
          <View style={styles.headerContent}>
            <AvatarImage
              isGroupChat={isGroupChat}
              otherParticipant={otherParticipant}
              size={40}
              icon="account-group"
              backgroundColor={colors.primary}
            />
            <View style={styles.headerTextContainer}>
              <Text style={[styles.headerTitle, {color: colors.primary}]}>
                <ConversationName conversation={conversation} userId={userId} />
              </Text>
              {isTyping && <TypingIndicator colors={colors} fonts={fonts} />}
            </View>
          </View>
          <Appbar.Action
            icon="information"
            onPress={showInfoDialog}
            color={colors.primary}
          />
        </Appbar.Header>

        <FlashList
          ref={flashListRef}
          data={localMessages}
          renderItem={renderMessage}
          keyExtractor={keyExtractor}
          contentContainerStyle={styles.messagesContainer}
          onLayout={() => setIsListReady(true)}
          estimatedItemSize={100}
          onScroll={handleScroll}
          scrollEventThrottle={16}
        />

        {showScrollButton && (
          <TouchableOpacity style={styles.scrollButton} onPress={scrollToEnd}>
            <IconButton icon="chevron-down" size={24} color={colors.primary} />
          </TouchableOpacity>
        )}

        <MemoizedCustomChatInput
          colors={colors}
          fonts={fonts}
          inputText={inputText}
          onInputChange={setInputText}
          onSendMessage={handleSendMessage}
          replyingTo={replyingToRef.current}
          onCancelReply={() => {
            replyingToRef.current = null;
            setInputText('');
          }}
        />
        <Portal>
          <Dialog
            visible={infoDialogVisible}
            onDismiss={hideInfoDialog}
            style={{backgroundColor: colors.surface}}>
            <Dialog.Title style={{color: colors.primary}}>
              Chat Information
            </Dialog.Title>
            <Dialog.ScrollArea>
              <ScrollView
                contentContainerStyle={{
                  paddingHorizontal: 24,
                  paddingVertical: 20,
                }}>
                <Text style={[styles.infoText, {color: colors.primary}]}>
                  Privacy and Security:
                </Text>
                <Text style={[styles.infoContent, {color: colors.text}]}>
                  {/* • Your messages are end-to-end encrypted. */}
                  {/* {'\n'}• We do not store your messages on our servers once they
                  are delivered. */}
                  {'\n'}• You can delete messages for everyone within 1 hour of
                  sending.
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {color: colors.primary, marginTop: 16},
                  ]}>
                  Features:
                </Text>
                <Text style={[styles.infoContent, {color: colors.text}]}>
                  • Send text, images, and audio messages.
                  {'\n'}• Reply to specific messages.
                  {'\n'}• Group chats supported.
                  {'\n'}• Real-time typing indicators.
                </Text>

                <Text
                  style={[
                    styles.infoText,
                    {color: colors.primary, marginTop: 16},
                  ]}>
                  Tips:
                </Text>
                <Text style={[styles.infoContent, {color: colors.text}]}>
                  • Long-press a message to reply or delete.
                  {'\n'}• Scroll to bottom quickly using the scroll button.
                  {'\n'}• Check the online status of participants in the header.
                </Text>
              </ScrollView>
            </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={hideInfoDialog} textColor={colors.primary}>
                Close
              </Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: 'transparent',
    elevation: 0,
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerTextContainer: {
    marginLeft: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  messagesContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  messageWrapper: {
    flexDirection: 'row',
    marginVertical: 2,
    maxWidth: SCREEN_WIDTH * 0.8,
  },
  sentMessageWrapper: {
    alignSelf: 'flex-end',
  },
  receivedMessageWrapper: {
    alignSelf: 'flex-start',
  },
  avatar: {
    marginRight: 8,
    alignSelf: 'flex-end',
  },
  messageItem: {
    borderRadius: 20,
    padding: 10,
    maxWidth: '100%',
  },
  sentMessage: {
    borderBottomRightRadius: 5,
  },
  receivedMessage: {
    borderBottomLeftRadius: 5,
  },
  senderName: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  messageText: {
    fontSize: 16,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  audioContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 150,
  },
  audioProgressBar: {
    flex: 1,
    height: 3,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    marginHorizontal: 5,
  },
  audioText: {
    fontSize: 12,
    marginLeft: 5,
  },
  messageFooter: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 2,
  },
  messageTime: {
    fontSize: 10,
    marginRight: 2,
  },
  scrollButton: {
    position: 'absolute',
    right: 20,
    bottom: 80,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 25,
    elevation: 5,
  },
});

export default ChatRoomScreen;
