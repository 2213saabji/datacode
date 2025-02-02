import React from 'react';
import {ScrollView, View} from 'react-native';

import {StyleSheet} from 'react-native';
import Header from '../../components/Mydetails/Header';
import TabBar from '../../components/Mydetails/TabBar';
import Details from '../../components/Mydetails/Details';
const MyDetails = () => {
  return (
    <ScrollView style={myDetailsStyles.container}>
      <Header />
      <View>
        <TabBar />
        <View style={myDetailsStyles.infoContainer}>
          <Details />
        </View>
      </View>
    </ScrollView>
  );
};

export default MyDetails;
const myDetailsStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: 'column',
  },

  infoContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    backgroundColor: 'white',
    // margin: 20,
  },
});
