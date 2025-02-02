import React, {useCallback, useMemo, useState, useRef, useEffect} from 'react';
import {View, Animated, StyleSheet, Pressable} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {
  FAB,
  Searchbar,
  List,
  Text,
  Badge,
  Appbar,
  Menu,
  Divider,
  Button,
} from 'react-native-paper';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {
  selectConversations,
  selectLastMessageByConversation,
  selectUnreadMessageCountByConversation,
  selectIsUserOnline,
} from '../../redux/selectors/CMS/ChatSelectors';
import {getRecentConversations} from '../../redux/slices/CMS/ChatSlice';
import LottieView from 'lottie-react-native';
import {useFocusEffect} from '@react-navigation/native';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import ConversationName from '../../utilities/chat/getConversationName';
import AvatarImage from '../../components/ChatWithFriends/AvatarImage';
import LinearGradient from 'react-native-linear-gradient';
import OnlineIndicator from '../../components/ChatWithFriends/onlineIndicator';
import {formatDistanceToNow, parseISO} from 'date-fns';

const ChatListScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {colors, fonts} = useSelector(selectTheme) || {};
  const conversations = useSelector(selectConversations);
  const lastMessages = useSelector(selectLastMessageByConversation);
  const unreadCounts = useSelector(selectUnreadMessageCountByConversation);
  const [searchQuery, setSearchQuery] = useState('');
  const [menuVisible, setMenuVisible] = useState(false);
  const {userId} = useSelector(selectUser);
  const isUserOnline = useSelector(selectIsUserOnline);

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const searchBarAnim = useRef(new Animated.Value(0)).current;
  const gradientColors = colors
    ? [colors.background, colors.surface]
    : ['#FFFFFF', '#F0F0F0'];

  useFocusEffect(
    useCallback(() => {
      dispatch(getRecentConversations(userId));
    }, [dispatch, userId]),
  );

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);

  const openMenu = useCallback(() => setMenuVisible(true), []);
  const closeMenu = useCallback(() => setMenuVisible(false), []);

  const ScaleView = ({children}) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
      Animated.spring(scaleAnim, {
        toValue: 0.95,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    };

    return (
      <Animated.View style={{transform: [{scale: scaleAnim}]}}>
        <Pressable onPressIn={onPressIn} onPressOut={onPressOut}>
          {children}
        </Pressable>
      </Animated.View>
    );
  };

  const renderItem = useCallback(
    ({item, index}) => {
      const {conversationDetail, conversationId} = item;
      const lastMessage = lastMessages[conversationId] || {};
      const unreadCount = unreadCounts[conversationId] || 0;

      // Find the other participant's userId
      const otherParticipantId = conversationDetail.sortedUserIds
        .split(',')
        .find(id => id !== userId);

      // Check if the other participant is online
      const isOnline = isUserOnline.find(
        user => user.userId && user.userId.toString() === otherParticipantId,
      );

      const animatedStyle = {
        opacity: fadeAnim,
        transform: [
          {
            translateY: fadeAnim.interpolate({
              inputRange: [0, 1],
              outputRange: [50, 0],
            }),
          },
        ],
      };

      return (
        <Animated.View style={animatedStyle}>
          <ScaleView>
            <List.Item
              titleStyle={{color: colors.text}}
              title={<ConversationName conversation={item} userId={userId} />}
              description={lastMessage.content || 'No messages yet'}
              descriptionStyle={{color: colors.primary}}
              style={{backgroundColor: colors.surface, paddingHorizontal: 14}}
              left={() => (
                <View>
                  <AvatarImage
                    otherParticipant={{userId: otherParticipantId}}
                    size={40}
                  />
                  <OnlineIndicator
                    isOnline={isOnline}
                    style={styles.onlineIndicator}
                  />
                </View>
              )}
              right={() => {
                const lastMessageDate = lastMessage.created_at
                  ? parseISO(lastMessage.created_at)
                  : null;
                const timeDisplay = lastMessageDate
                  ? formatDistanceToNow(lastMessageDate, {addSuffix: true})
                  : '';

                return (
                  <View style={styles.rightContent}>
                    <Text
                      style={[
                        styles.time,
                        fonts.bodySmall,
                        {color: colors.text},
                      ]}>
                      {timeDisplay}
                    </Text>
                    {unreadCount > 0 && (
                      <Badge style={{backgroundColor: colors.notification}}>
                        {unreadCount}
                      </Badge>
                    )}
                  </View>
                );
              }}
              onPress={() => {
                navigation.navigate('ChatRoom', {
                  conversationId,
                  conversation: item,
                  participants: conversationDetail.sortedUserIds
                    .split(',')
                    .map(id => ({userId: id})),
                });
              }}
            />
          </ScaleView>
        </Animated.View>
      );
    },
    [colors, fonts, navigation, lastMessages, unreadCounts, userId, fadeAnim],
  );

  const filteredConversations = useMemo(() => {
    const conversationsWithLastMessages = conversations
      .map(conversation => {
        const lastMessage = lastMessages[conversation.conversationId] || {};
        return {
          ...conversation,
          lastMessage,
        };
      })
      .sort((a, b) => {
        const aDate = a.lastMessage?.created_at
          ? new Date(a.lastMessage.created_at)
          : new Date(0);
        const bDate = b.lastMessage?.created_at
          ? new Date(b.lastMessage.created_at)
          : new Date(0);
        return bDate - aDate;
      });

    return conversationsWithLastMessages;
  }, [conversations, lastMessages]);

  const EmptyConversationState = useCallback(
    () => (
      <View style={styles.emptyStateContainer}>
        <LottieView
          source={require('../../assets/empty-chat.json')}
          autoPlay
          loop
          style={styles.emptyStateAnimation}
        />
        <Text style={[styles.emptyStateTitle, {color: colors.text}]}>
          Oops! It's Ghostly Quiet Here
        </Text>
        <Text style={[styles.emptyStateSubtitle, {color: colors.text}]}>
          Time to break the silence! Start a chat and let the conversations
          flow.
        </Text>
        <Button
          mode="contained"
          onPress={() => navigation.navigate('Contacts')}
          style={styles.startChatButton}>
          Summon a Chat!
        </Button>
      </View>
    ),
    [colors, navigation],
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <LinearGradient colors={gradientColors} style={styles.gradient} />
      <Appbar.Header
        style={{backgroundColor: 'transparent', marginVertical: 10}}>
        <Animated.View
          style={{
            flex: 9,
            transform: [
              {
                scale: searchBarAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.05],
                }),
              },
            ],
          }}>
          <Searchbar
            placeholder="Search chats"
            onChangeText={text => {
              setSearchQuery(text);
              Animated.spring(searchBarAnim, {
                toValue: text.length > 0 ? 1 : 0,
                useNativeDriver: true,
              }).start();
            }}
            value={searchQuery}
            inputStyle={{color: colors.text}}
            placeholderTextColor={colors.text}
            style={[
              styles.searchBar,
              {backgroundColor: colors.surface, color: colors.text},
            ]}
            iconColor={colors.primary}
          />
        </Animated.View>
        <Menu
          visible={menuVisible}
          onDismiss={closeMenu}
          anchor={<Appbar.Action icon="dots-vertical" onPress={openMenu} />}>
          <Menu.Item onPress={() => {}} title="New group" />
          <Menu.Item onPress={() => {}} title="Archived chats" />
          <Menu.Item onPress={() => {}} title="Settings" />
          <Divider />
          <Menu.Item onPress={() => {}} title="Help & Feedback" />
        </Menu>
      </Appbar.Header>

      {filteredConversations.length > 0 ? (
        <Animated.FlatList
          data={filteredConversations}
          renderItem={renderItem}
          keyExtractor={item => item.conversationId}
          contentContainerStyle={styles.listContainer}
          ItemSeparatorComponent={() => <Divider />}
          ListEmptyComponent={() => (
            <Text style={{color: colors.text}}>No conversations found</Text>
          )}
        />
      ) : (
        <EmptyConversationState />
      )}

      <FAB
        style={[styles.fab, {backgroundColor: colors.primary}]}
        icon="message-plus-outline"
        onPress={() => navigation.navigate('Contacts')}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  searchBar: {
    elevation: 0,
  },
  listContainer: {
    paddingBottom: 80,
  },
  rightContent: {
    alignItems: 'flex-end',
  },
  time: {
    marginBottom: 4,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderWidth: 2,
    borderColor: 'white',
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyStateAnimation: {
    width: 200,
    height: 200,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
  startChatButton: {
    marginTop: 20,
  },
});

export default ChatListScreen;
