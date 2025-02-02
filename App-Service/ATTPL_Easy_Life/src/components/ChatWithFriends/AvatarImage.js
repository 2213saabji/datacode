import React, {useEffect, useState, useMemo} from 'react';
import {View, StyleSheet} from 'react-native';
import {Avatar, ActivityIndicator} from 'react-native-paper';
import ApiCaller from '../../services/ApiCaller';
import isEqual from 'lodash/isEqual'; // Utility to perform deep comparison

// Function to fetch user data by ID
const fetchUserData = async userId => {

  try {
    if (userId) {
      const response = await ApiCaller.get(
        `/user/profile/fetch/${userId}`,
        'ums',
      );

      if (response.status !== 200) throw new Error('Failed to fetch user data');
      const userData = await response.data;
      return userData.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};

const AvatarImage = ({
  isGroupChat = false,
  otherParticipant,
  size = 40,
  icon = 'account-group',
  backgroundColor = '#6200ee',
  style,
}) => {
  const [userData, setUserData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [prevParticipants, setPrevParticipants] = useState([]);

  // Memoize participant to avoid unnecessary recalculations
  const participant = useMemo(() => {
    return Array.isArray(otherParticipant)
      ? otherParticipant
      : otherParticipant
      ? [otherParticipant]
      : [];
  }, [otherParticipant]);

  // Compare previous and current participants to avoid unnecessary fetches
  useEffect(() => {
    if (participant.length === 0 || isEqual(participant, prevParticipants)) {
      setLoading(false);
      return;
    }

    const loadUserData = async () => {
      try {
        setLoading(true);
        const users = await Promise.all(
          participant.map(async ({userId}) => {
            if (userId) {
              return await fetchUserData(userId);
            }
            return null;
          }),
        );
        setUserData(users.filter(user => user !== null)); // Filter out null values
        setPrevParticipants(participant); // Store the current participants
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserData();
  }, [participant, prevParticipants]);

  const renderSingleAvatar = participant => {
    const imageUrl = participant?.UserProfile?.userProfileImageDetails?.preview;
    if (imageUrl) {
      return (
        <Avatar.Image size={size} source={{uri: imageUrl}} style={style} />
      );
    } else {
      return (
        <Avatar.Icon
          size={size}
          icon={icon}
          color="#fff"
          style={[style, {backgroundColor}]}
        />
      );
    }
  };

  const renderGroupAvatar = () => (
    <View
      style={[styles.groupAvatarContainer, {width: size, height: size}, style]}>
      {userData.slice(0, 4).map((participant, index) => {
        const imageUrl =
          participant?.UserProfile?.userProfileImageDetails?.preview;
        return (
          <View
            key={index}
            style={[
              styles.groupAvatar,
              {
                top: index < 2 ? 0 : size / 2,
                left: index % 2 === 0 ? 0 : size / 2,
              },
            ]}>
            {imageUrl ? (
              <Avatar.Image
                size={size / 2}
                source={{uri: imageUrl}}
                style={style}
              />
            ) : (
              <Avatar.Icon
                size={size / 2}
                icon={icon}
                color="#fff"
                style={[style, {backgroundColor}]}
              />
            )}
          </View>
        );
      })}
    </View>
  );

  if (loading) {
    return <ActivityIndicator animating={true} size="small" />;
  }

  return userData.length === 1 || isGroupChat
    ? renderSingleAvatar(userData[0])
    : renderGroupAvatar();
};

const styles = StyleSheet.create({
  groupAvatarContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  groupAvatar: {
    position: 'absolute',
  },
});

export default AvatarImage;
