import React from 'react';
import {View, Dimensions, StyleSheet} from 'react-native';
import {TabView, SceneMap, TabBar} from 'react-native-tab-view';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import AllRoute from '../../components/Notifications/AllRoute';
import UnreadRoute from '../../components/Notifications/UnreadRoute';
import ArchivedRoute from '../../components/Notifications/ArchivedRoute';
import {Badge, Text} from 'react-native-paper';
import Header from '../../components/Notifications/header';
import Footer from '../../components/Notifications/footer';

/**
 * NotificationsScreen component.
 *
 * This screen displays notifications categorized into All, Unread, and Archived tabs.
 * It utilizes a tab view for navigation between categories and includes a header and footer.
 *
 * @param {object} navigation - The navigation object from React Navigation.
 * @returns {React.Element} - The NotificationsScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const NotificationsScreen = ({navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    {key: 'all', title: 'All'},
    {key: 'unread', title: 'Unread'},
    {key: 'archived', title: 'Archived'},
  ]);

  const renderScene = SceneMap({
    all: AllRoute,
    unread: UnreadRoute,
    archived: ArchivedRoute,
  });

  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{backgroundColor: colors.primary}}
      style={{backgroundColor: colors.surface}}
      renderLabel={({route, focused, color}) => (
        <View style={styles.tab}>
          <Text
            style={[
              fonts.bodyMedium,
              {
                color: focused ? colors.primary : colors.text,
              },
            ]}>
            {route.title}
          </Text>
          <Badge style={[styles.badge, {backgroundColor: colors.primary}]}>
            22
          </Badge>
        </View>
      )}
    />
  );

  return (
    <View style={{flex: 1}}>
      <Header navigation={navigation} />
      <TabView
        navigationState={{index, routes}}
        renderScene={renderScene}
        onIndexChange={setIndex}
        initialLayout={{width: Dimensions.get('window').width}}
        renderTabBar={renderTabBar}
      />
      <Footer navigation={navigation} />
    </View>
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  badge: {
    marginLeft: 8,
  },
});

export default NotificationsScreen;
