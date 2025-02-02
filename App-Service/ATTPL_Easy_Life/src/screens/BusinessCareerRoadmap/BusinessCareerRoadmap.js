import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {TabView, TabBar} from 'react-native-tab-view';

import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

const BusinessCareerRoadmap = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'attplServices', title: 'Attpl Services'},
    {key: 'loan', title: 'Loan'},
    {key: 'smallScale', title: 'Small Scale Businesses'},
    {key: 'mediumScale', title: 'Medium Scale Businesses'},
    {key: 'largeScale', title: 'Large Scale Businesses'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'attplServices':
        return <SubRouteCardsView popUp={true} subRoute="ATTPl Services" />;
      case 'loan':
        return <SubRouteCardsView popUp={true} subRoute="Loan" />;
      case 'smallScale':
        return (
          <SubRouteCardsView popUp={true} subRoute="Small Scale Business" />
        );
      case 'mediumScale':
        return (
          <SubRouteCardsView popUp={true} subRoute="Medium Scale Business" />
        );
      case 'largeScale':
        return (
          <SubRouteCardsView popUp={true} subRoute="Large Scale Business" />
        );
      default:
        return null;
    }
  };

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: colors.background}}
      scrollEnabled
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
        source={require('../../assets/BusinessCareerRoadmap/images/Business_Career_banner.webp')}
        style={styles.horizontalImage}
      />
      <TabView
        navigationState={{index, routes}}
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

export default BusinessCareerRoadmap;
