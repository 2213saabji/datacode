import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';



import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

const FarmerCardInnerComponent = ({ route }) => {

  const innerRoute = route.params.innerRoute;

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/FarmersCareerRoadMap/images/Farmer_Career_Roadmap.png')}
        style={styles.horizontalImage}
      />
      <SubRouteCardsView popUp={false} subRoute={innerRoute} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    padding: 16,
  },
  horizontalImage: {
    width: '100%',
    height: 140,
    marginBottom: 16,
    borderRadius: 8,
  },
});

export default FarmerCardInnerComponent;
