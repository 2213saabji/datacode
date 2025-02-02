import React, {useState} from 'react';
import {ScrollView, StyleSheet, View, Text, Image} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {TabView, TabBar} from 'react-native-tab-view';
import SubRouteCardsView from '../../components/SubRouteCards/subRoute-cards-view';

import InstitutionMyAppointmentList from '../../components/StudentCareerRoadMap/AppointmentBooking/institution-myAppointment';
import InstitutionTopList from '../../components/StudentCareerRoadMap/Institution-top-list';
import AttplScholarshipForm from '../zohoScreens/AttplScholarshipForm';
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

const StudentCareerRoadMap = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    {key: 'studentGuide', title: 'Guide'},
    {key: 'digitalLibrary', title: 'Digital Library'},
    {key: 'techCareer', title: 'Technical Career'},
    {key: 'publicCareer', title: 'Public Service Career'},
    {key: 'medicalCareer', title: 'Medical Career'},
    {key: 'jobPortal', title: 'Job Portal'},
    {key: 'attplScholarship', title: 'Attpl Scholarship'},
    {key: 'institutionList', title: 'Institution List'},
    {key: 'myAppointment', title: 'my appointment'},
  ]);

  const renderScene = ({route}) => {
    switch (route.key) {
      case 'studentGuide':
        return (
          <SubRouteCardsView
            popUp={true}
            subRoute="Student Guide"
            navigation={navigation}
          />
        );
      case 'digitalLibrary':
        return <SubRouteCardsView popUp={true} subRoute="Digital Library" />;
      case 'techCareer':
        return <SubRouteCardsView popUp={true} subRoute="Technical Career" />;
      case 'publicCareer':
        return (
          <SubRouteCardsView popUp={true} subRoute="Public Service Career" />
        );
      case 'medicalCareer':
        return <SubRouteCardsView popUp={true} subRoute="Medical Career" />;
      case 'jobPortal':
        return <SubRouteCardsView subRoute="Job Portal" />;
      case 'attplScholarship':
        return <AttplScholarshipForm navigation={navigation} />;
      case 'institutionList':
        return <InstitutionTopList navigation={navigation} />;
      case 'myAppointment':
        return <InstitutionMyAppointmentList navigation={navigation} />;
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
        source={require('../../assets/StudentCareerRoadMap/images/Student_banner.webp')}
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

export default StudentCareerRoadMap;
