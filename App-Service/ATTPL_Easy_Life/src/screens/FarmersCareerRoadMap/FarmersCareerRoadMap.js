import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {TabView, TabBar} from 'react-native-tab-view';
import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';
import FarmerMyAppointmentList from '../../components/FarmersCareerRoadMap/AppointmentBooking/farmer-myAppointment';
import AgriEquipmentTopList from '../../components/FarmersCareerRoadMap/Agri-equipment-top-list';
import CattleList from '../../components/FarmersCareerRoadMap/CattleTradeHub/cattle_list';
/**
 * FarmersCareerRoadMap Component
 *
 * This component provides a view for farmers to explore farming tips and marketplaces through a tabbed interface.
 * It uses `react-native-tab-view` to switch between two tabs: "Farming Tips" and "Marketplaces". Each tab displays
 * relevant information using job cards, which include a title, description, and image. The component is styled
 * dynamically based on the current theme and includes a banner image at the top.
 *
 * - **Tabs**: Two tabs are provided: "Farming Tips" and "Marketplaces". Each tab displays a different set of content.
 * - **Farming Tips Tab**: Shows a list of tips and techniques to improve crop yields and manage crops through seasons.
 * - **Marketplaces Tab**: Displays information about local farmer markets and online agricultural platforms for selling produce.
 *
 * @component
 * @example
 * <FarmersCareerRoadMap />
 *
 * @returns {JSX.Element} The rendered FarmersCareerRoadMap component with dynamic styling based on the current theme.
 *
 * @author PRATHAMESH GHORPADE
 */

const FarmersCareerRoadMap = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'farmingGuide', title: 'Guide'},
    {key: 'marketplace', title: 'Marketplace'},
    {key: 'agriculturalEquipments', title: 'agricultural Equipments'},
    {key: 'cattleTradeHub', title: 'Cattle Trade Hub'},
    {key: 'agriculturalEquipmentsList', title: 'agricultural Equipments List'},
    {key: 'myAppointment', title: 'my appointment'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'farmingGuide':
        return (
          <SubRouteCardsView
            popUp={true}
            subRoute="Farmer Guide"
            screenName="FarmerCardInnerScreen"
            navigation={navigation}
          />
        );
      case 'marketplace':
        return (
          <SubRouteCardsView
            popUp={true}
            subRoute="Farmer MarketPlace"
            screenName="FarmerCardInnerScreen"
            navigation={navigation}
          />
        );
      case 'agriculturalEquipments':
        return (
          <SubRouteCardsView
            popUp={true}
            subRoute="Agriculture Equipment"
            screenName="FarmerCardInnerScreen"
            navigation={navigation}
          />
        );
      case 'cattleTradeHub':
        return <CattleList navigation={navigation} />;
      case 'agriculturalEquipmentsList':
        return <AgriEquipmentTopList navigation={navigation} />;
      case 'myAppointment':
        return <FarmerMyAppointmentList navigation={navigation} />;
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
        source={require('../../assets/FarmersCareerRoadMap/images/Farmer_Career_Roadmap.png')}
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

export default FarmersCareerRoadMap;
