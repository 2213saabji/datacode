import React, {useEffect, useState, useCallback} from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  Alert,
  Platform,
} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Contacts from 'react-native-contacts';
import {setPhoneContacts} from '../../redux/slices/CMS/ChatSlice';
import ContactItem from './ContactItem';

const PhoneContactsTab = ({
  toggleSelectedContact, // Function to toggle contact selection
  selectedContacts, // Array of selected contacts
  searchQuery, // Search query string
}) => {
  const dispatch = useDispatch();
  const phoneContacts = useSelector(state => state.chat.phoneContacts);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);

  const loadPhoneContacts = useCallback(async () => {
    try {
      if (Platform.OS === 'android') {
        const {PermissionsAndroid} = require('react-native');
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          throw new Error('Contacts permission denied');
        }
      }

      const contacts = await Contacts.getAll();
      const formattedContacts = contacts.map((contact, index) => ({
        id: contact.recordID || `phone_contact_${index}`,
        name: `${contact.givenName} ${contact.familyName}`.trim(),
        image: contact.thumbnailPath,
        isPhoneContact: true,
      }));
      dispatch(setPhoneContacts(formattedContacts));
      setError(null);
    } catch (error) {
      console.error('Error loading contacts:', error);
      setError('Failed to load phone contacts. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    loadPhoneContacts();
  }, [loadPhoneContacts]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    loadPhoneContacts().then(() => setRefreshing(false));
  }, [loadPhoneContacts]);

  if (isLoading) {
    return <ActivityIndicator size="large" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  // Filter contacts based on the search query
  const filteredContacts = phoneContacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <FlatList
      data={filteredContacts}
      renderItem={({item}) => (
        <ContactItem
          contact={item}
          toggleSelectedContact={toggleSelectedContact}
          isSelected={selectedContacts.some(c => c.id === item.id)}
        />
      )}
      keyExtractor={item => item.id}
      ListEmptyComponent={
        <Text style={styles.emptyText}>No phone contacts found</Text>
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

export default PhoneContactsTab;
