import React from 'react';
import {View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';

import {selectTheme} from '../../redux/selectors';

import Header from '../../components/InviteFriendScreen/Header';
import Content from '../../components/InviteFriendScreen/Content';


const InviteFriendScreen = () => {
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  return (
    <View style={styles.container}>
      <Header navigation={navigation} colors={colors} fonts={fonts} />
      <Content colors={colors} fonts={fonts} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default InviteFriendScreen;
