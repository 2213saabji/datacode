import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import Icon from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Avatar} from 'react-native-paper';

const DrawerContent = ({closeDrawer, contacts}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredContacts, setFilteredContacts] = useState(contacts);

  const renderItem = ({item}) => (
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
  );

  const handleSearch = text => {
    setSearchQuery(text);
    const filteredData = contacts.filter(item =>
      item.name.toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredContacts(filteredData);
  };

  return (
    <View style={[styles.container, {backgroundColor: colors.surface}]}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <TouchableOpacity onPress={() => {}}>
            <Avatar.Image
              source={require('../../assets/AppBarAssets/Img_Avatar25.png')}
              size={50}
            />
            <View style={styles.onlineIndicator} />
          </TouchableOpacity>
        </View>
        <View style={styles.iconGroup}>
          <Ionicons
            name="chevron-back-sharp"
            size={24}
            color={colors.text}
            style={styles.icon}
            onPress={closeDrawer}
          />
          <Icon
            name="user-plus"
            size={24}
            color={colors.text}
            style={styles.icon}
          />
        </View>
      </View>
      <TextInput
        style={[
          styles.searchInput,
          {
            borderColor: colors.border,
            color: colors.onSurface,
            backgroundColor: colors.surface,
          },
        ]}
        placeholder="Search contacts..."
        placeholderTextColor={colors.placeholder}
        onChangeText={handleSearch}
        value={searchQuery}
      />
      <FlatList
        data={filteredContacts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  icon: {
    padding: 8,
  },
  iconGroup: {
    flexDirection: 'row',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 8,
  },
  avatar: {
    height: 50,
    width: 50,
    marginRight: 10,
  },

  onlineIndicator: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    height: 14,
    width: 14,
    borderRadius: 7,
    backgroundColor: 'rgba(34, 197, 94, 1)',
    borderWidth: 2,
    borderColor: '#fff',
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontWeight: 'bold',
  },
  contactMessage: {
    color: '#999',
  },
  contactTime: {
    color: '#999',
  },
});

export default DrawerContent;
