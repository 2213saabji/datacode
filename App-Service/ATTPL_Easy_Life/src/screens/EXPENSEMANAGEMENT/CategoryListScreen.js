import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const dummyData = Array(50)
  .fill()
  .map((_, index) => ({
    id: index + 1,
    name: `Category ${index + 1}`,
  }));

const CategoryListScreen = ({navigation}) => {
  const {colors} = useSelector(selectTheme);
  const [categories, setCategories] = useState(dummyData);
  const [searchText, setSearchText] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchText.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredCategories.length / rowsPerPage);
  const paginatedCategories = filteredCategories.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  const handleSearch = text => {
    setSearchText(text);
    setCurrentPage(1); // Reset to first page when search text changes
  };

  const handleRowsPerPageChange = newRowsPerPage => {
    setRowsPerPage(newRowsPerPage);
    setCurrentPage(1); // Reset to first page when rows per page changes
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderItem = ({item}) => (
    <View style={[styles.card, {backgroundColor: colors.surface}]}>
      <View style={styles.row}>
        <View style={styles.categoryInfo}>
          <View>
            <Text style={[styles.categoryLabel, {color: colors.text}]}>
              Category ID
            </Text>
            <Text style={[styles.categoryValue, {color: colors.text}]}>
              {item.id}
            </Text>
          </View>
          <View style={styles.categoryNameContainer}>
            <Text style={[styles.categoryLabel, {color: colors.text}]}>
              Category name
            </Text>
            <Text style={[styles.categoryValue, {color: colors.text}]}>
              {item.name}
            </Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.moreButton, {backgroundColor: colors.accent}]}>
          <Icon name="more-vertical" size={20} color={colors.text} />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle="dark-content" />

      <Text style={[styles.title, {color: colors.text}]}>Category list</Text>
      <Text style={[styles.subtitle, {color: colors.text}]}>
        Manage your categories
      </Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.newCategoryButton, {backgroundColor: colors.text}]}
          onPress={() => {
            navigation.navigate('ADD CATEGORY');
          }}>
          <Text style={[styles.newCategoryButtonText, {color: colors.surface}]}>
            + New category
          </Text>
        </TouchableOpacity>
      </View>

      <View style={[styles.searchContainer, {borderColor: colors.text}]}>
        <Icon
          name="search"
          size={20}
          color={colors.text}
          style={styles.searchIcon}
        />
        <TextInput
          style={[styles.searchInput, {color: colors.text}]}
          placeholder="Search categories..."
          placeholderTextColor={colors.text}
          value={searchText}
          onChangeText={handleSearch}
        />
      </View>

      <View style={styles.optionsRow}>
        {['Columns', 'Filters', 'Export'].map((option, index) => (
          <TouchableOpacity
            key={option}
            style={[
              styles.optionButton,
              {backgroundColor: index === 0 ? colors.secondary : 'transparent'},
            ]}>
            <Icon
              name={['eye', 'filter', 'download'][index]}
              size={20}
              color={index === 0 ? colors.surface : colors.text}
            />
            <Text
              style={[
                styles.optionText,
                {color: index === 0 ? colors.surface : colors.text},
              ]}>
              {option}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={paginatedCategories}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
        style={styles.list}
      />

      <View style={styles.pagination}>
        <Text style={{color: colors.text}}>Rows per page: </Text>
        <TouchableOpacity
          style={styles.rowsPerPageButton}
          onPress={() => handleRowsPerPageChange(rowsPerPage === 10 ? 20 : 10)}>
          <Text style={{color: colors.text}}>{rowsPerPage}</Text>
          <Icon
            name="chevron-down"
            size={20}
            color={colors.text}
            style={styles.dropdownIcon}
          />
        </TouchableOpacity>
        <Text style={{color: colors.text}}>{`${
          (currentPage - 1) * rowsPerPage + 1
        }-${Math.min(
          currentPage * rowsPerPage,
          filteredCategories.length,
        )} of ${filteredCategories.length}`}</Text>
        <TouchableOpacity
          onPress={handlePreviousPage}
          disabled={currentPage === 1}>
          <Icon
            name="chevron-left"
            size={24}
            color={currentPage === 1 ? colors.disabled : colors.primary}
            style={styles.paginationIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleNextPage}
          disabled={currentPage === totalPages}>
          <Icon
            name="chevron-right"
            size={24}
            color={
              currentPage === totalPages ? colors.disabled : colors.primary
            }
            style={styles.paginationIcon}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    paddingHorizontal: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    alignItems: 'flex-end',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  newCategoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  newCategoryButtonText: {
    fontWeight: 'bold',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
  },
  optionsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  optionText: {
    marginLeft: 4,
    fontWeight: '500',
  },
  list: {
    flex: 1,
  },
  card: {
    borderRadius: 12,
    padding: 16,
    margin: 8,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryInfo: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  categoryNameContainer: {
    flex: 1,
    marginLeft: 16,
  },
  categoryLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  moreButton: {
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    padding: 16,
  },
  rowsPerPageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  dropdownIcon: {
    marginLeft: 4,
  },
  paginationIcon: {
    marginHorizontal: 8,
  },
});

export default CategoryListScreen;
