import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const EmergencyService = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const data = []; 

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Icon name="file-document-outline" size={60} color="#c4c4c4" />
      <Text style={styles.noDataText}>No Data</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>EMERGENCY SERVICE</Text>
      <View style={styles.card}>
      <View style={styles.searchContainer}>
        <Icon name="magnify" size={24} color="#888" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

<View style={styles.tableHeader}>
        <View style={styles.checkboxColumn}>
          <Icon name="checkbox-blank-outline" size={24} />
        </View>
        <Text style={styles.headerText}>Department</Text>
        <Text style={styles.headerText}>Contact Person Name</Text>
        <Text style={styles.headerText}>Mo. Number</Text>
      </View>

      <FlatList
        data={data}
        ListEmptyComponent={renderEmptyComponent}
        renderItem={({ item }) => (
          <View style={styles.tableRow}>
            <View style={styles.checkboxColumn}>
              <Icon name="checkbox-blank-outline" size={24} />
            </View>
            <Text style={styles.cellText}>{item.department}</Text>
            <Text style={styles.cellText}>{item.contactName}</Text>
            <Text style={styles.cellText}>{item.mobileNumber}</Text>
          </View>
        )}
        keyExtractor={(item, index) => index.toString()}
      />
</View>
    

      <View style={styles.paginationContainer}>
        <Text style={styles.paginationText}>0 - 0 of 0</Text>
        <Icon name="chevron-left" size={24} color="#888" />
        <Icon name="chevron-right" size={24} color="#888" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 20,
    lineHeight:20,
    fontWeight: '600',
    marginBottom: 10,
    color:'#000000'
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
   
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontSize: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'column', 
    backgroundColor: '#fff',
       padding: 15,
       flex: 1,
       width:342,
       marginVertical: 5,
   marginTop:20,
   
       borderRadius: 10,
      
       shadowColor: '#000',
       shadowOffset: { width: 0, height: 4 },
       shadowOpacity: 0.50,
       shadowRadius: 10,
       elevation: 5,
       marginLeft: 5,
    alignSelf: 'center', 
  },


  tableHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',

    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  headerText: {
    flex: 1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  tableRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  cellText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    textAlign: 'left',
    paddingHorizontal: 5,
  },
  checkboxColumn: {
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  noDataText: {
    fontSize: 16,
    color: '#c4c4c4',
    marginTop: 10,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingVertical: 10,
  },
  paginationText: {
    fontSize: 14,
    color: '#888',
    marginRight: 10,
  },
});

export default EmergencyService;
