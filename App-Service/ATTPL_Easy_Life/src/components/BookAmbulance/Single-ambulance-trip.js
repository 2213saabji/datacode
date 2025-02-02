import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const AmbulanceSingleTrip = ({item, index, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState('');
  const [data, setData] = useState();
   console.log("item",item)
  const handleNavigate = (screen) => {
    
    navigation.navigate(screen, {
      // screen: screen,
      params: item,
    });
  };

  return (
    // <MenuProvider>
      <TouchableOpacity
        onPress={() => handleNavigate('AmbulanceDetails')}
        style={[styles.container, { backgroundColor: colors.background, shadowColor: colors.shadow }]}
       
      >
        {/* Menu Trigger */}
        {/* <View style={styles.menuContainer}>
          <Menu>
            <MenuTrigger>
              <View style={styles.menuTrigger}>
                <Icon
                  name='dots-vertical'
                  type='material-community'
                  color='#ff6f00'
                  size={24}
                />
              </View>
            </MenuTrigger>
            <MenuOptions style={styles.menuOptions}>
              <MenuOption onSelect={() => handleNavigate('CabDetails')}>
                <Text style={styles.menuOption}>View</Text>
              </MenuOption>
              {/* <MenuOption onSelect={() => handleNavigate('CabFormEdit')}>
                <Text style={styles.menuOption}>Edit</Text>
              </MenuOption> */}
      {/* </MenuOptions>
          </Menu>
        </View> */}

      <View style={styles.table}>
        <View style={styles.tableRow}>
          <View style={styles.leftAlign}>
            <Text
              style={[
                styles.tableCell,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              Trip ID
            </Text>
            <Text
              style={[
                styles.tableCell,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              {item?.tripId}
            </Text>
          </View>
          {/* <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Driver Name</Text> */}
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Driver Name : {item?.driver?.driverDetails?.driverName}
          </Text>
          {/* <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Status</Text>
            <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.status}</Text> */}
        </View>
        <View style={styles.tableRow}>
          <View style={styles.rightAlign}>
            <Text
              style={[
                styles.tableCell,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              Status
            </Text>
            <Text
              style={[
                styles.tableCell,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              {item.tripStatus}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
    // </MenuProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 6,
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white', // Set a more standard background color
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // For Android shadow
    borderWidth: 1,
    borderColor: '#ddd',
  },
  table: {
    flex: 1,
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee', // Subtle line between rows
  },
  leftAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  rightAlign: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '40%',
  },
  tableCell: {
    fontSize: 16,
    color: '#333', // Darker text color for better readability
    flex: 1, // Allow cells to expand and fill space
  },
  menuTrigger: {
    backgroundColor: '#ffeb3b', // Yellow background for the hamburger icon
    padding: 8,
    borderRadius: 50,
    alignSelf: 'flex-end',
    marginBottom: 10,
  },
  menuOptions: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#000',
  },
  menuContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
});

export default AmbulanceSingleTrip;
