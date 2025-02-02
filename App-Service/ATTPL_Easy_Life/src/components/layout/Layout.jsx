import {TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {IndexAppBar} from '../AppBar/index.AppBar';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectAppBarVisibility} from '../../redux/selectors';

const Layout = ({children, navigation}) => {
  const appBarVisible = useSelector(selectAppBarVisibility);
  return (
    <PaperProvider
      settings={{icon: props => <MaterialCommunityIcons {...props} />}}>
      <SafeAreaProvider>
        {appBarVisible && <IndexAppBar navigation={navigation} />}
        <View style={{flex: 1}}>{children}</View>
      </SafeAreaProvider>
    </PaperProvider>
  );
};
const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

export default Layout;
