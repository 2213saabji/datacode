import React, {useState, useCallback, useEffect} from 'react';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
} from '@react-navigation/drawer';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Platform,
  UIManager,
  BackHandler,
  PermissionsAndroid,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../components/layout/Layout';
import getDrawerScreens from '../data/drawerScreens';
import Logo from '../assets/AppBarAssets/ATTPL_Logo.gif';
import {useSelector} from 'react-redux';
import {selectTheme} from '../redux/selectors';
import {selectUser} from '../redux/selectors/UMS/authSelectors';
import AppStack from './AppStack';

import {useFocusEffect} from '@react-navigation/native';
import LazyScreen from './LazyScreen';
import DeliveryStackNavigator from './DeliveryStack';

const Drawer = createDrawerNavigator();

const categoryIcons = {
  HOME: 'home-outline',
  'GOVT IN YOUR HAND': 'briefcase-outline',
  Devlivery: 'bicycle-outline',
  'CAREER ROADMAP': 'map-outline',
  'ATTPL BUSINESS': 'business-outline',
  'POLITICAL INFORMATION': 'newspaper-outline',
  'BOOK YOUR CAB': 'car-outline',
  'SEE ALL FEATURES': 'apps-outline',
  'HEALTH SERVICES': 'medical-outline',
  'Emergency Services': 'alert-circle-outline',
  'CHAT WITH FRIENDS': 'chatbubbles-outline',
};

const animationConfig = {
  duration: 300,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {type: LayoutAnimation.Types.easeInEaseOut},
  delete: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
};

const CustomDrawerContent = React.memo(props => {
  const {colors, fonts} = useSelector(selectTheme);
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [drawerScreens, setDrawerScreens] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  useEffect(() => {
    if (
      Platform.OS === 'android' &&
      UIManager.setLayoutAnimationEnabledExperimental
    ) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  useEffect(() => {
    const loadDrawerScreens = async () => {
      if (userRole) {
        try {
          const screens = await getDrawerScreens(userRole);
          setDrawerScreens(screens);
        } catch (error) {
          console.error('Failed to load drawer screens:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDrawerScreens();
  }, [userRole]);

  const toggleCategory = useCallback(
    (categoryTitle, screens) => {
      if (screens.length === 1) {
        props.navigation.navigate(screens[0].name);
      } else {
        LayoutAnimation.configureNext(animationConfig);
        setExpandedCategory(prevCategory =>
          prevCategory === categoryTitle ? null : categoryTitle,
        );
      }
    },
    [props.navigation],
  );

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, {backgroundColor: colors.surface}]}>
        <Text style={{color: colors.text}}>Loading...</Text>
      </View>
    );
  }

  const categories = drawerScreens.reduce((acc, screen) => {
    if (!acc[screen.category]) {
      acc[screen.category] = [];
    }
    acc[screen.category].push(screen);
    return acc;
  }, {});

  return (
    <DrawerContentScrollView
      {...props}
      style={[styles.drawerScrollView, {backgroundColor: colors.surface}]}>
      <View style={styles.drawerHeader}>
        <Image source={Logo} style={styles.logo} />
      </View>
      <View style={styles.drawerContent}>
        {Object.entries(categories).map(([categoryTitle, screens]) => (
          <View key={categoryTitle} style={styles.categoryContainer}>
            <TouchableOpacity
              style={styles.categoryHeader}
              onPress={() => toggleCategory(categoryTitle, screens)}>
              <View style={styles.categoryTitleContainer}>
                <Ionicons
                  name={categoryIcons[categoryTitle] || 'folder-outline'}
                  size={24}
                  color={colors.primary}
                  style={styles.categoryIcon}
                />
                <Text
                  style={[
                    styles.categoryTitle,
                    {color: colors.primary, ...fonts.titleMedium},
                  ]}>
                  {categoryTitle}
                </Text>
              </View>
              {screens.length > 1 && (
                <Ionicons
                  name={
                    expandedCategory === categoryTitle
                      ? 'chevron-up'
                      : 'chevron-down'
                  }
                  size={20}
                  color={colors.primary}
                />
              )}
            </TouchableOpacity>
            {expandedCategory === categoryTitle && screens.length > 1 && (
              <View style={styles.expandedCategory}>
                {screens.map(item => (
                  <TouchableOpacity
                    key={item.name}
                    style={styles.drawerItem}
                    onPress={() => {
                      console.log(item.name);

                      props.navigation.navigate(item.name);
                    }}>
                    <Ionicons
                      name={item.icon}
                      size={20}
                      color={colors.text}
                      style={styles.drawerItemIcon}
                    />
                    <Text
                      style={[
                        styles.drawerLabel,
                        {color: colors.text, ...fonts.bodyMedium},
                      ]}>
                      {item.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </View>
    </DrawerContentScrollView>
  );
});

const CustomNavigator = React.memo(({route, navigation}) => {
  const {name, ...params} = route.params;
  console.log('nnnnnn', route.params);

  return (
    <Layout navigation={navigation}>
      <LazyScreen name={name} {...params} navigation={navigation} />
    </Layout>
  );
});

const DrawerNavigator = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const [isLoading, setIsLoading] = useState(true);
  const [drawerScreens, setDrawerScreens] = useState([]);

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  useEffect(() => {
    const requestNotificationPermission = async () => {
      try {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
        );
      } catch (error) {
        console.error('Failed to request notification permission:', error);
      }
    };

    requestNotificationPermission();
  }, []);

  useEffect(() => {
    const loadDrawerScreens = async () => {
      if (userRole) {
        try {
          const screens = await getDrawerScreens(userRole);
          setDrawerScreens(screens);
        } catch (error) {
          console.error('Failed to load drawer screens:', error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    loadDrawerScreens();
  }, [userRole]);

  if (isLoading) {
    return (
      <View
        style={[styles.loadingContainer, {backgroundColor: colors.surface}]}>
        <Text style={{color: colors.text}}>Loading...</Text>
      </View>
    );
  }

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}
      drawerStyle={{width: '80%', backgroundColor: colors.surface}}>
      {drawerScreens.map(({name, icon, path, stack, category, params}) => (
        <Drawer.Screen
          key={name}
          name={name}
          options={{
            drawerIcon: ({color, size}) => (
              <Ionicons name={icon} size={size} color={color} />
            ),
            headerShown: false,
            drawerLabel: ({color}) => (
              <Text style={[styles.drawerLabel, {color, ...fonts.labelMedium}]}>
                {name}
              </Text>
            ),
          }}
          initialParams={{...params, name, path, stack, category}}>
          {props => <CustomNavigator {...props} />}
        </Drawer.Screen>
      ))}
      <Drawer.Screen
        name="AppScreens"
        component={AppStack}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />
      <Drawer.Screen
        name="DeliveryScreens"
        component={DeliveryStackNavigator}
        options={{
          headerShown: false,
          drawerLabel: () => null,
          title: null,
          drawerIcon: () => null,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerScrollView: {
    flex: 1,
  },
  drawerHeader: {
    justifyContent: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 0, 0, 0.1)',
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  drawerContent: {
    flex: 1,
    paddingTop: 15,
  },
  categoryContainer: {
    marginBottom: 5,
  },
  categoryHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  categoryTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryIcon: {
    marginRight: 10,
  },
  categoryTitle: {
    fontSize: 14,
    fontWeight: '600',
  },
  expandedCategory: {
    overflow: 'hidden',
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  drawerItemIcon: {
    marginRight: 15,
  },
  drawerLabel: {
    fontSize: 14,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default DrawerNavigator;
