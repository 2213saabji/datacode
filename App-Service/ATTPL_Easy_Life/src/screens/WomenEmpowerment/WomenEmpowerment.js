import React, {useState} from 'react';
import { StyleSheet, View,  Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {TabView, TabBar} from 'react-native-tab-view';

import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

const WomenEmpowerment = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'education', title: 'Education & Training'},
    {key: 'financial', title: 'Financial & Economic'},
    {key: 'healthCare', title: 'Healthcare & Reproductive Rights'},
    {key: 'legalAid', title: 'Legal Aid & Advocacy'},
    {key: 'leaderShip', title: 'Leadership & Mentorship'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'education':
        return (
          <SubRouteCardsView popUp={true} subRoute="Education & Training" />
        );
      case 'financial':
        return (
          <SubRouteCardsView popUp={true} subRoute="Financial & Economic" />
        );
      case 'healthCare':
        return (
          <SubRouteCardsView
            popUp={true}
            subRoute="Heathcare & Reproductive Rights"
          />
        );
      case 'legalAid':
        return (
          <SubRouteCardsView popUp={true} subRoute="Legal Aid & Advocacy" />
        );
      case 'leaderShip':
        return (
          <SubRouteCardsView popUp={true} subRoute="Ledership & Mentorship" />
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
        source={require('../../assets/WomenEmpowerment/images/Women_2Empowerment.webp')}
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

export default WomenEmpowerment;
