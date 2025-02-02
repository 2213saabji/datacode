import LottieView from 'lottie-react-native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TextInput,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const SearchBar = () => (
  <View style={styles.searchBar}>
    <Icon name="search" size={20} color="gray" style={styles.searchIcon} />
    <TextInput
      style={styles.searchInput}
      placeholder="Search Templates"
      placeholderTextColor="gray"
    />
  </View>
);

const DesireItem = () => (
  <View style={styles.desireItem}>
    <View style={styles.desireRow}>
      <Text style={styles.desireLabel}>Email</Text>
      <Text style={styles.desireValue}>Number</Text>
      <Icon name="more-vertical" size={24} color="#FFD700" />
    </View>
    <View style={styles.desireRow}>
      <Text style={styles.desireValue}>-</Text>
      <Text style={styles.desireValue}>-</Text>
    </View>
    <View style={styles.desireRow}>
      <Text style={styles.desireLabel}>Problem status</Text>
      <Text style={styles.desireLabel}>Created date</Text>
    </View>
    <View style={styles.desireRow}>
      <Text style={styles.desireValue}>-</Text>
      <Text style={styles.desireValue}>-</Text>
    </View>
  </View>
);

const NoDataView = () => (
  <View style={styles.noDataContainer}>
    <LottieView
      source={require('../../assets/no_data.json')}
      autoPlay
      loop
      style={styles.emptyStateAnimation}
    />
    <Text style={styles.noDataText}>No Data</Text>
  </View>
);

const Footer = () => (
  <View style={styles.footer}>
    <Text style={styles.footerText}>Rows per page: 10</Text>
    <Text style={styles.footerText}>1-1 of 1</Text>
    <View style={styles.footerIcons}>
      <Icon name="chevron-left" size={24} color="black" />
      <Icon name="chevron-right" size={24} color="black" />
    </View>
  </View>
);

const DesireProgressScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Text style={styles.title}>DESIRE LIST</Text>
      <Text style={styles.subtitle}>Desires • Booking</Text>
      <SearchBar />
      <DesireItem />
      <NoDataView />
      <Footer />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 16,
    marginTop: 4,
    marginBottom: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F0F0',
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
  desireItem: {
    backgroundColor: 'white',
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
  desireLabel: {
    color: 'gray',
    fontSize: 14,
  },
  desireValue: {
    fontSize: 14,
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataImage: {
    width: 100,
    height: 100,
    marginBottom: 16,
  },
  noDataText: {
    fontSize: 18,
    color: 'gray',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  footerText: {
    fontSize: 14,
    color: 'gray',
  },
  footerIcons: {
    flexDirection: 'row',
  },
});

export default DesireProgressScreen;
