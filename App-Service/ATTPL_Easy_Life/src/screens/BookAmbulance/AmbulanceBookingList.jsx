import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; // Make sure to install this package
import AmbulanceList from '../AmbulanceList/AmbulanceList';

const AmbulanceBookingList = () => {

  const [isChecked, setIsChecked] = useState(false);

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>AMBULANCE BOOKING LIST</Text>
      <Text style={styles.subtitle}>Ambulance Booking • List</Text>
      <View style={styles.card}>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#888" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search..."
          placeholderTextColor="#888"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button}>
          <Icon name="eye-outline" size={20} color="#000" style={styles.boldIcon} />
          <Text style={styles.buttonText}>Columns</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="filter-outline" size={20} color="#000" style={styles.boldIcon} />
          <Text style={styles.buttonText}>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button}>
          <Icon name="download-outline" size={20} color="#000" style={styles.boldIcon} />
          <Text style={styles.buttonText}>Export</Text>
        </TouchableOpacity>

        
      </View>
          <View style={styles.scontainer}>
          <TouchableOpacity onPress={toggleCheckbox}>
            <Icon
              name={isChecked ? "checkbox" : "square-outline"}
              size={18}
              color="#333"
              style={styles.checkbox}
            />
            
          </TouchableOpacity>
          <Text style={styles.actionText}>Actions</Text>
        </View>


        <AmbulanceList/>
{/*       
      <View style={styles.contentContainer}>
        <Icon name="document-text-outline" size={50} color="#ccc" />
        <Text style={styles.noDataText}>No Data</Text>
      </View> */}
      </View>
      
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
    lineHeight:20,
    color:'#000000'
  },
  subtitle: {
    fontSize: 16,
    color: '#6D6D6D',
    marginBottom: 16,
    lineHeight:20
  },
  card: {
    flexDirection: 'column', 
   backgroundColor: '#fff',
    padding: 4,
    flex: 1,
    width:362,
    marginVertical: 5,
  paddingVertical:16,
    borderRadius: 10,
   
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 4 },
    // shadowOpacity: 0.50,
    // shadowRadius: 10,
     elevation: 2,
    marginLeft: 5,
    // alignItems: 'center',
    
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    margin:10
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontWeight:'500',
    fontSize:20,
    lineHeight:22,
    justifyContent:'center',
    
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginBottom: 16,
    width:"100%",
   
    
    
  },
  button: { 
    flexDirection: 'row',
    // alignItems: 'center',
    marginHorizontal:13
    
  },
  buttonText: {
    marginLeft: 4,
    fontSize:16,
    fontWeight:'bold',
    lineHeight:22,
    color:'#000'
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noDataText: {
    marginTop: 8,
    color: '#888',
  },
  scontainer: {
    flexDirection: 'row',
  width:342,
  height:50,
  
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor:'#ECECEC',
    justifyContent: 'space-between',
  },
  checkbox: {
    width: 18,
    height: 18,
    borderWidth: 1,
    borderColor: '#ccc',
    marginRight: 10,
  },
  actionText: {
    fontSize: 16,
    color: '#333'
  },
});

export default AmbulanceBookingList;