import React, {useState, useEffect} from 'react';
import {Appbar, Badge} from 'react-native-paper';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';
import SearchDialog from '../../SearchDialog';
import searchScreens from '../../../data/searchData';
import HamburgerIcon from './HamburgerIcon';
import AvatarIcon from './AvatarIcon';
import {useNavigation} from '../../../navigation/NavigationContext';
import {
  CommonActions,
  DrawerActions,
  useNavigationState,
} from '@react-navigation/native';
import {selectUser} from '../../../redux/selectors/UMS/authSelectors';

const MyAppBar = ({isExpanded, setIsExpanded}) => {
  const [isVisibleBadge, setIsVisibleBadge] = useState(true);
  const [isDialogVisible, setIsDialogVisible] = useState(false);
  const {colors} = useSelector(selectTheme);
  const navigation = useNavigation();
  const user = useSelector(selectUser);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const showDialog = () => {
    setIsDialogVisible(true);
  };

  const hideDialog = () => {
    setIsDialogVisible(false);
  };

  const handleNavigation = (stack, screenName) => {
    navigation.dispatch(
      CommonActions.navigate({
        name: stack,
        params: {screen: screenName},
      }),
    );
  };
  const navigationState = useNavigationState(state => state);

  useEffect(() => {
    // console.log('Current navigation state:', navigationState);
  }, [navigationState]);

  const handleToggleDrawer = () => {
    if (navigation.openDrawer && typeof navigation.openDrawer === 'function') {
      navigation.openDrawer();
    } else if (
      navigation.dispatch &&
      typeof navigation.dispatch === 'function'
    ) {
      navigation.dispatch(DrawerActions.toggleDrawer());
    } else {
      console.error(
        'Unable to toggle drawer: navigation methods not available',
      );
    }
  };

  const handleSearchSelect = screenName => {
    const selectedScreen = searchScreens.find(
      screen => screen.name === screenName,
    );
    if (selectedScreen) {
      hideDialog();
      handleNavigation(selectedScreen.stack, selectedScreen.name);
    }
  };

  return (
    <View style={styles.container}>
      <Appbar.Header
        style={[styles.header, {backgroundColor: colors.background}]}>
        <View style={styles.leftSection}>
          <TouchableOpacity onPress={handleToggleDrawer}>
            <HamburgerIcon />
          </TouchableOpacity>
          <Appbar.Action
            icon="magnify"
            onPress={showDialog}
            color={colors.primary}
          />
        </View>
        <View style={styles.rightSection}>
          <View style={styles.notificationIconContainer}>
            {isVisibleBadge && (
              <Badge size={17} style={styles.badge}>
                4
              </Badge>
            )}
            <TouchableOpacity
              onPress={() => handleNavigation('AppScreens', 'Notifications')}>
              <Ionicons
                name="notifications-outline"
                size={28}
                color={colors.primary}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleNavigation('AppScreens', 'Settings')}>
              <Ionicons
                name="settings-outline"
                size={28}
                color={colors.primary}
                style={styles.iconMargin}
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => handleNavigation('AppScreens', 'Profile')}>
            <AvatarIcon
              source={user.UserProfile?.userProfileImageDetails?.preview}
            />
          </TouchableOpacity>
        </View>
      </Appbar.Header>
      <SearchDialog
        visible={isDialogVisible}
        onDismiss={hideDialog}
        onSearchSelect={handleSearchSelect}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 7,
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  notificationIconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    marginRight: 10,
  },
  badge: {
    position: 'absolute',
    top: -10, // Adjust to position the badge above the avatar
    right: 35,
    backgroundColor: 'rgba(255, 86, 48, 1)',
  },
  iconMargin: {
    marginLeft: 10,
  },
});

export default MyAppBar;
