import React from 'react';
import { StyleSheet, View, Image } from 'react-native';

import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

const HealthTips = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/HealthTips.jpg')}
        style={styles.horizontalImage}
      />
      <SubRouteCardsView popUp={true} subRoute="Health Tips" />
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

export default HealthTips;
