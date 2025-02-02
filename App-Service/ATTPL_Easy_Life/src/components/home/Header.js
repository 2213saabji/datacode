import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import ShimmerPlaceHolder from '../../hooks/useShimmer';
import {selectTheme} from '../../redux/selectors';

import {selectUser} from '../../redux/selectors/UMS/authSelectors';

const Header = ({loading}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);

  // Safely access user's first and last name with fallback to an empty string
  const firstName = user?.UserProfile?.firstName || '';
  const lastName = user?.UserProfile?.lastName || '';

  return (
    <View style={styles.header}>
      {loading ? (
        <>
          <ShimmerPlaceHolder
            style={[
              styles.welcomeTextSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
          <ShimmerPlaceHolder
            style={[
              styles.nameTextSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
        </>
      ) : (
        <>
          <Text
            style={[
              styles.welcomeText,
              {color: colors.primary, fontFamily: fonts.titleLarge.fontFamily},
            ]}>
            Hi, Welcome Back
          </Text>
          <Text
            style={[
              styles.nameText,
              {color: colors.primary, fontFamily: fonts.titleMedium.fontFamily},
            ]}>
            {firstName + ' ' + lastName}
          </Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    marginTop: 20,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: '500',
    marginBottom: 5,
  },
  nameText: {
    fontSize: 24,
    fontWeight: '700',
  },
  welcomeTextSkeleton: {
    width: 200,
    height: 30,
    marginBottom: 10,
    borderRadius: 10,
  },
  nameTextSkeleton: {
    width: 100,
    height: 30,
    borderRadius: 10,
  },
});

export default Header;
