import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const Header = () => {
  return (
    <View style={headerStyles.header}>
      <Text style={headerStyles.headerText}>Your Election</Text>
    </View>
  );
};

export default Header;

const headerStyles = StyleSheet.create({
  header: {
    margin: 20,
    height: 139,
    backgroundColor: 'rgba(255, 255, 255, 1)',
    padding: 21,
    alignItems: 'flex-start',
    justifyContent: 'center',
    borderRadius: 16,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowOffset: {width: 5, height: 5},
    shadowRadius: 10,
    elevation: 20,
    zIndex: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    padding: 26,
  },
});
