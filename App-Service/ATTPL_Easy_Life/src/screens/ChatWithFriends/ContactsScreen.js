import React, {useState, useCallback, useMemo} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {
  searchUsers,
  createNewConversation,
  getConversationParticipants,
} from '../../redux/slices/CMS/ChatSlice';
import {debounce} from 'lodash';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import PhoneContactsTab from './PhoneContactsTab';
import ApiContactsTab from './ApiContactsTab';
import SelectedContactsBar from './SelectedContactsBar';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';

const ContactsScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('phone');
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const {colors} = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const {showAlert} = useCustomAlert();

  const debouncedSearch = useMemo(
    () =>
      debounce(query => {
        dispatch(searchUsers({searchQuery: query}));
      }, 300),
    [dispatch],
  );

  const handleSearch = useCallback(
    text => {
      setSearchQuery(text);
      if (text !== '') {
        debouncedSearch(text);
      }
    },
    [debouncedSearch],
  );

  const toggleSelectedContact = useCallback(contact => {
    setSelectedContacts(prevContacts => {
      const isSelected = prevContacts.some(c => c.id === contact.id);
      if (isSelected) {
        return prevContacts.filter(c => c.id !== contact.id);
      } else {
        return [...prevContacts, contact];
      }
    });
  }, []);

  const clearSelectedContacts = useCallback(() => {
    setSelectedContacts([]);
  }, []);

  const createChat = useCallback(async () => {
    if (selectedContacts.length === 0) {
      showAlert('Please select at least one contact', 'Error');
      return;
    }

    setLoading(true); // Show loading indicator

    try {
      const conversationData = {
        userIds: [
          ...selectedContacts.map(contact => contact.userId || contact.id),
          user.userId,
        ],
        type: selectedContacts.length > 1 ? 'group' : 'private',
        groupName:
          selectedContacts.length > 1
            ? `Group (${selectedContacts.length})`
            : undefined,
        createdBy: user.userId,
      };

      const res = await dispatch(
        createNewConversation(conversationData),
      ).unwrap();

      if (res) {
        const newConversationId = res.conversationId;
        const conversationParticipants = await dispatch(
          getConversationParticipants(newConversationId),
        ).unwrap();

        const participantsData = conversationParticipants.participants.data;

        if (participantsData) {
          const participants =
            participantsData.ConversationUserConversations || [];
          setLoading(false); // Hide loading indicator before navigating
          navigation.replace( 'ChatRoom',
           {
              conversationId: newConversationId,
              conversation: res,
              participants,
            },
          );

          clearSelectedContacts();
        } else {
          throw new Error(
            'Conversation participants data is missing or invalid',
          );
        }
      } else {
        throw new Error('Invalid response format');
      }
    } catch (error) {
      setLoading(false); // Hide loading indicator in case of error
      console.error('Error creating conversation:', error);
      showAlert('Failed to create conversation. Please try again.', 'Error');
    }
  }, [
    dispatch,
    selectedContacts,
    user.userId,
    clearSelectedContacts,
    showAlert,
  ]);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, {color: colors.text}]}>New Chat</Text>
        <TouchableOpacity
          onPress={createChat}
          disabled={selectedContacts.length === 0 || loading}>
          {loading ? (
            <ActivityIndicator size="small" color={colors.primary} />
          ) : (
            <Text
              style={[
                styles.createButton,
                {
                  color:
                    selectedContacts.length > 0
                      ? colors.primary
                      : colors.disabled,
                },
              ]}>
              Create
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <View
        style={[
          styles.searchContainer,
          {backgroundColor: colors.searchBackground},
        ]}>
        <Icon
          name="search"
          size={20}
          color={colors.icon}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, {color: colors.text}]}
          placeholder="Search Contacts"
          placeholderTextColor={colors.placeholder}
          value={searchQuery}
          onChangeText={handleSearch}
        />
        {searchQuery !== '' && (
          <TouchableOpacity onPress={() => handleSearch('')}>
            <Icon
              name="close"
              size={20}
              color={colors.icon}
              style={styles.clearIcon}
            />
          </TouchableOpacity>
        )}
      </View>

      <SelectedContactsBar
        selectedContacts={selectedContacts}
        onRemove={toggleSelectedContact}
      />

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'phone' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('phone')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'phone' ? colors.primary : colors.text},
            ]}>
            Phone Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tab,
            activeTab === 'api' && {
              borderBottomColor: colors.primary,
              borderBottomWidth: 2,
            },
          ]}
          onPress={() => setActiveTab('api')}>
          <Text
            style={[
              styles.tabText,
              {color: activeTab === 'api' ? colors.primary : colors.text},
            ]}>
            API Contacts
          </Text>
        </TouchableOpacity>
      </View>

      {activeTab === 'phone' ? (
        <PhoneContactsTab
          searchQuery={searchQuery}
          selectedContacts={selectedContacts}
          toggleSelectedContact={toggleSelectedContact}
        />
      ) : (
        <ApiContactsTab
          searchQuery={searchQuery}
          selectedContacts={selectedContacts}
          toggleSelectedContact={toggleSelectedContact}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  createButton: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 12,
    borderRadius: 20,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  clearIcon: {
    marginLeft: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ContactsScreen;
