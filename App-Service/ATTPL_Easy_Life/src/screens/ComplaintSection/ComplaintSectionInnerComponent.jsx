import React, { useState, useEffect } from 'react';
import { ScrollView, StyleSheet, View, Text, Image } from 'react-native';

import { TabView, TabBar } from 'react-native-tab-view';
import { useSelector } from 'react-redux';
import { selectTheme } from '../../redux/selectors';

import ComplaintInnerCardsView from '../../components/ComplaintSection/complaint-inner-cards-view';

const ComplaintSectionInnerComponent = ({ route, navigation }) => {

  const complainSectionSubRouteId = route.params.complainSectionSubRouteId;

  const { colors, fonts } = useSelector(selectTheme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'central', title: 'Central Complaint' },
    { key: 'state', title: 'State Complaint' },
  ]);

  const renderScene = ({ route }) => {
    switch (route.key) {
      case 'central':
        return (
          <ComplaintInnerCardsView type='central' popUp={true} subRoute={complainSectionSubRouteId} navigation={navigation} />
        );

      case 'state':
        return (
          <ComplaintInnerCardsView type='state' popUp={true} subRoute={complainSectionSubRouteId} navigation={navigation} />
        );

      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.primary }}
      style={{ backgroundColor: colors.background }}
      labelStyle={{
        color: colors.text,
        ...fonts.bodyMedium,
        textAlign: 'center',
      }} // Adjust as per your font styles
    />
  );

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Complaint_Section.webp')}
        style={styles.horizontalImage}
      />

      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        onIndexChange={setIndex}
        renderTabBar={renderTabBar}
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

export default ComplaintSectionInnerComponent;
