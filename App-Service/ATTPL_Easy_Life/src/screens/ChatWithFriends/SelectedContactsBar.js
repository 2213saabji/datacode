import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const SelectedContactsBar = ({selectedContacts, onRemove}) => {
  const {colors} = useSelector(selectTheme);

  if (selectedContacts.length === 0) return null;

  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {selectedContacts.map(contact => (
          <View
            key={contact.id}
            style={[styles.chip, {backgroundColor: colors.primaryLight}]}>
            <Text style={[styles.chipText, {color: colors.primary}]}>
              {contact.name}
            </Text>
            <TouchableOpacity onPress={() => onRemove(contact)}>
              <Icon name="close" size={16} color={colors.primary} />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
  },
  chipText: {
    marginRight: 4,
  },
});

export default SelectedContactsBar;
