import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  Dialog,
  Portal,
  IconButton,
  TextInput,
  Avatar,
} from 'react-native-paper';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const SearchDialog = ({visible, onDismiss, onSearchSelect, contacts}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [query, setQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState([]);
  const screenHeight = Dimensions.get('window').height;
  const dialogHeight = screenHeight * 0.59;

  useEffect(() => {
    if (query) {
      const results = contacts.filter(contact =>
        contact.name.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredContacts(results);
    } else {
      setFilteredContacts(contacts);
    }
  }, [query, contacts]);

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => onSearchSelect(item)}>
      <View style={styles.contactItem}>
        <Avatar.Image
          source={{uri: item.avatar}}
          style={styles.avatar}
          size={50}
        />
        <View style={styles.contactInfo}>
          <Text
            style={[styles.contactName, {color: colors.text}, fonts.bodyLarge]}>
            {item.name}
          </Text>
          <Text
            style={[
              styles.contactMessage,
              {color: colors.onSurfaceVariant},
              fonts.bodySmall,
            ]}>
            {item.message}
          </Text>
        </View>
        <Text
          style={[
            styles.contactTime,
            {color: colors.onSurfaceVariant},
            fonts.bodySmall,
          ]}>
          {item.time}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <Portal>
      <Dialog
        visible={visible}
        onDismiss={onDismiss}
        style={[
          styles.dialog,
          {backgroundColor: colors.background, maxHeight: dialogHeight},
        ]}>
        <Dialog.Content
          style={[styles.dialogContent, {maxHeight: dialogHeight - 20}]}>
          <View
            style={[styles.searchContainer, {borderColor: colors.backdrop}]}>
            <IconButton icon="magnify" size={24} iconColor={colors.text} />
            <TextInput
              mode="flat"
              placeholder="Search..."
              value={query}
              onChangeText={setQuery}
              textColor={colors.onSurface}
              style={[
                styles.input,
                {
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderBottomColor: 'transparent',
                },
                fonts.bodyMedium,
              ]}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              placeholderTextColor={colors.placeholder}
            />
            <IconButton
              icon="close"
              size={24}
              iconColor={colors.text}
              onPress={() => {
                if (query !== '') {
                  setQuery('');
                } else {
                  onDismiss();
                }
              }}
            />
          </View>
          {filteredContacts.length > 0 ? (
            <FlatList
              data={filteredContacts}
              keyExtractor={item => item.id}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContent}
            />
          ) : (
            <View style={styles.noResultsContainer}>
              <Text style={{color: colors.text}}>No results found.</Text>
            </View>
          )}
        </Dialog.Content>
      </Dialog>
    </Portal>
  );
};

const styles = StyleSheet.create({
  dialog: {
    borderRadius: 8,
  },
  dialogContent: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderBottomWidth: 1,
  },
  input: {
    flex: 1,
    fontSize: 14,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  flatListContent: {
    paddingHorizontal: 10,
  },
  noResultsContainer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
  },
  avatar: {
    marginRight: 10,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
  },
  contactMessage: {
    fontSize: 14,
  },
  contactTime: {
    fontSize: 12,
  },
});

export default SearchDialog;
