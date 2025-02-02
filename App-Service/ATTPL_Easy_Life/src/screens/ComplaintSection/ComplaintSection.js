import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

import ComplaintCardsView from '../../components/ComplaintSection/complaint-cards-view';

const ComplaintSectionView = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Complaint_Section.webp')}
        style={styles.horizontalImage}
      />
      <ComplaintCardsView
        screenName="ComplaintSectionInner"
        navigation={navigation}
      />
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

export default ComplaintSectionView;
