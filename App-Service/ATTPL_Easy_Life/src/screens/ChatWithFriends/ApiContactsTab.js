import React, {useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import ContactItem from './ContactItem';
import {fetchApiContacts} from '../../redux/slices/CMS/ChatSlice'; // Assuming this action exists

const ApiContactsTab = ({
  toggleSelectedContact,
  selectedContacts,
  searchQuery,
}) => {
  const dispatch = useDispatch();
  const apiContacts = useSelector(state => state.chat.apiContacts);
  const isLoading = useSelector(state => state.chat.isLoadingApiContacts);
  const error = useSelector(state => state.chat.apiContactsError);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    dispatch(fetchApiContacts()).finally(() => setRefreshing(false)); // Fetch contacts from API
  }, [dispatch]);

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Filter contacts based on the search query
  const filteredContacts = apiContacts.filter(contact =>
    `${contact.UserProfile.firstName} ${contact.UserProfile.middleName || ''} ${
      contact.UserProfile.lastName
    }`
      .trim()
      .toLowerCase()
      .includes(searchQuery.toLowerCase()),
  );

  const renderContactItem = ({item}) => {
    const contact = {
      id: item.userId,
      name: `${item.UserProfile.firstName} ${
        item.UserProfile.middleName || ''
      } ${item.UserProfile.lastName}`.trim(),
      image: item.UserProfile.userProfileImageDetails
        ? item.UserProfile.userProfileImageDetails.imageUrl
        : null,
      phone: item.phone,
      email: item.email,
      userRoleType: item.userRoleType,
    };

    return (
      <ContactItem
        contact={contact}
        toggleSelectedContact={toggleSelectedContact}
        isSelected={selectedContacts.some(c => c.id === contact.id)}
      />
    );
  };

  return (
    <FlatList
      data={filteredContacts}
      renderItem={renderContactItem}
      keyExtractor={item => item.userId.toString()}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No API contacts found</Text>
      }
      refreshing={refreshing}
      onRefresh={onRefresh}
    />
  );
};

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
    margin: 16,
  },
  emptyText: {
    textAlign: 'center',
    margin: 16,
  },
});

export default ApiContactsTab;
