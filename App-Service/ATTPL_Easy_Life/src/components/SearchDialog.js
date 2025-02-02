import React, {useState, useEffect, memo} from 'react';
import {View, StyleSheet, FlatList, Text, Dimensions} from 'react-native';
import {Dialog, Portal, IconButton, TextInput, List} from 'react-native-paper';
import {useSelector} from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {selectTheme} from '../redux/selectors';
import searchScreens from '../data/searchData';

const MemoizedListItem = memo(({item, colors, fonts, onPress}) => (
  <List.Item
    title={item.name}
    description={item.path}
    onPress={onPress}
    titleStyle={{color: colors.text, fontFamily: fonts.bodyMedium.fontFamily}}
    descriptionStyle={{color: colors.placeholder}}
    style={{
      backgroundColor: colors.background,
      borderBottomColor: colors.border,
    }}
    left={() => <Ionicons name={item.icon} size={24} color={colors.primary} />}
  />
));

const SearchDialog = ({visible, onDismiss, onSearchSelect}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [query, setQuery] = useState('');
  const [filteredScreens, setFilteredScreens] = useState([]);
  const screenHeight = Dimensions.get('window').height;
  const dialogHeight = screenHeight * 0.59;

  useEffect(() => {
    if (query) {
      const results = searchScreens.filter(screen =>
        screen.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredScreens(results);
    } else {
      setFilteredScreens(searchScreens);
    }
  }, [query]);

  const renderItem = ({item}) => (
    <MemoizedListItem
      item={item}
      colors={colors}
      fonts={fonts}
      onPress={() => onSearchSelect(item.name)} // Trigger screen selection
    />
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
          {filteredScreens.length > 0 ? (
            <FlatList
              data={filteredScreens}
              keyExtractor={item => item.name}
              renderItem={renderItem}
              contentContainerStyle={styles.flatListContent}
              windowSize={10} // Adjust based on performance needs
              getItemLayout={(data, index) => ({
                length: 60,
                offset: 60 * index,
                index,
              })}
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
});

export default SearchDialog;
