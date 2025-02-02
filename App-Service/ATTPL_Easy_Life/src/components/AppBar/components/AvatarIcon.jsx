import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Avatar} from 'react-native-paper';
import defaultAvatar from '../../../assets/images/Avatar_placeholder.png';

const AvatarIcon = ({source}) => {
  // Determine the source of the avatar image
  const avatarSource = source ? {uri: source} : defaultAvatar;

  return (
    <>
      <View style={avatarIconStyles.avatar}>
        <Avatar.Image source={avatarSource} size={30} />
      </View>
    </>
  );
};

export default AvatarIcon;

const avatarIconStyles = StyleSheet.create({
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    overflow: 'hidden',
    marginLeft: 5,
  },
});
