import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const SummarySection = ({totalWards, totalBooths}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View
      style={[
        styles.summarySection,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, {backgroundColor: colors.backdrop}]}>
          <Icon name="file-text" size={24} color={colors.primary} />
        </View>
        <View>
          <Text style={[styles.summaryTitle, {color: colors.text}]}>
            Total Wards
          </Text>
          <Text style={[styles.summaryValue, {color: colors.placeholder}]}>
            {totalWards} Wards
          </Text>
        </View>
      </View>
      <View style={styles.summaryItem}>
        <View style={[styles.summaryIcon, {backgroundColor: colors.backdrop}]}>
          <Icon name="check-square" size={24} color={colors.accent} />
        </View>
        <View>
          <Text style={[styles.summaryTitle, {color: colors.text}]}>
            Total Booths
          </Text>
          <Text style={[styles.summaryValue, {color: colors.placeholder}]}>
            {totalBooths} Booths
          </Text>
        </View>
      </View>
      <Icon name="chevron-right" size={24} color={colors.text} />
    </View>
  );
};

const SearchBar = ({searchQuery, setSearchQuery}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={[styles.searchBar, {backgroundColor: colors.backdrop}]}>
      <Icon
        name="search"
        size={20}
        color={colors.placeholder}
        style={styles.searchIcon}
      />
      <TextInput
        style={[styles.searchInput, {color: colors.text}]}
        placeholder="Search..."
        placeholderTextColor={colors.placeholder}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
    </View>
  );
};

const DesireItem = ({
  name,
  problemTitle,
  mobileNumber,
  problemDescription,
  email,
  address,
}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View
      style={[
        styles.desireItem,
        {backgroundColor: colors.surface, borderColor: colors.border},
      ]}>
      <View style={styles.desireRow}>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Name
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>{name}</Text>
        </View>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Problem Title
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>
            {problemTitle}
          </Text>
        </View>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Mobile number
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>
            {mobileNumber}
          </Text>
        </View>
        <TouchableOpacity style={styles.moreIcon}>
          <Icon name="more-vertical" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>
      <View style={styles.desireRow}>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Problem Description
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>
            {problemDescription}
          </Text>
        </View>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Email
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>
            {email}
          </Text>
        </View>
        <View style={styles.desireColumn}>
          <Text style={[styles.desireLabel, {color: colors.placeholder}]}>
            Address
          </Text>
          <Text style={[styles.desireValue, {color: colors.text}]}>
            {address}
          </Text>
        </View>
      </View>
    </View>
  );
};

const Footer = ({currentPage, totalItems, itemsPerPage, onPageChange}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={[styles.footer, {borderTopColor: colors.border}]}>
      <Text style={[styles.footerText, {color: colors.placeholder}]}>
        Rows per page: {itemsPerPage}
      </Text>
      <Text style={[styles.footerText, {color: colors.placeholder}]}>
        {(currentPage - 1) * itemsPerPage + 1}-
        {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}
      </Text>
      <View style={styles.footerIcons}>
        <TouchableOpacity
          onPress={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}>
          <Icon
            name="chevron-left"
            size={24}
            color={currentPage === 1 ? colors.placeholder : colors.text}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onPageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= totalItems}>
          <Icon
            name="chevron-right"
            size={24}
            color={
              currentPage * itemsPerPage >= totalItems
                ? colors.placeholder
                : colors.text
            }
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const DesireDetailsScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const {colors} = useSelector(selectTheme);

  const desireData = [
    {
      name: 'Ravi kumar',
      problemTitle: 'Job transfer request',
      mobileNumber: '5894102345',
      problemDescription: 'This is testing...',
      email: 'ABCD@gmail.com',
      address: 'Gujarat',
    },
    // ... (other data items)
  ];

  const filteredData = desireData.filter(
    item =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.problemTitle.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = newPage => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle="dark-content" />
      <Text style={[styles.title, {color: colors.text}]}>DESIRE DETAILS</Text>
      <SummarySection totalWards={1} totalBooths={1} />
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <ScrollView style={styles.scrollView}>
        {paginatedData.map((item, index) => (
          <DesireItem key={index} {...item} />
        ))}
      </ScrollView>
      <Footer
        currentPage={currentPage}
        totalItems={totalItems}
        itemsPerPage={itemsPerPage}
        onPageChange={handlePageChange}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  summarySection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  summaryItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  summaryIcon: {
    borderRadius: 20,
    padding: 8,
    marginRight: 12,
  },
  summaryTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  summaryValue: {
    fontSize: 14,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  desireItem: {
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  desireRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  desireColumn: {
    flex: 1,
  },
  desireLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  desireValue: {
    fontSize: 14,
  },
  moreIcon: {
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
  },
  footerText: {
    fontSize: 14,
  },
  footerIcons: {
    flexDirection: 'row',
  },
});

export default DesireDetailsScreen;
