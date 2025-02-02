import React from 'react';
import {View, Text, StyleSheet, Linking, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import {useSelector} from 'react-redux';
import ShimmerPlaceHolder from '../../hooks/useShimmer';
import {selectTheme} from '../../redux/selectors';

const Footer = ({loading}) => {
  const {colors} = useSelector(selectTheme);

  // Social media URL handlers
  const handlePress = url => {
    Linking.openURL(url).catch(err =>
      console.error('Failed to open URL:', err),
    );
  };

  return (
    <View style={[styles.footer, {backgroundColor: colors.background}]}>
      {loading ? (
        <>
          <ShimmerPlaceHolder style={styles.footerTextSkeleton} />
          <View style={styles.socialIcons}>
            <ShimmerPlaceHolder style={styles.iconSkeleton} />
            <ShimmerPlaceHolder style={styles.iconSkeleton} />
            <ShimmerPlaceHolder style={styles.iconSkeleton} />
            <ShimmerPlaceHolder style={styles.iconSkeleton} />
          </View>
        </>
      ) : (
        <>
          <Text style={[styles.footerText, {color: colors.text}]}>
            You can Follow Us on -
          </Text>
          <View style={styles.socialIcons}>
            {/* Facebook */}
            <TouchableOpacity
              onPress={() =>
                handlePress('https://www.facebook.com/attplgroup')
              }>
              <Icon
                name="facebook"
                type="font-awesome"
                color="#3b5998"
                size={35}
                iconStyle={styles.socialIcon}
              />
            </TouchableOpacity>

            {/* LinkedIn */}
            <TouchableOpacity
              onPress={() =>
                handlePress('https://www.linkedin.com/company/attplgroup/')
              }>
              <Icon
                name="linkedin"
                type="font-awesome"
                color="#0077b5"
                size={35}
                iconStyle={styles.socialIcon}
              />
            </TouchableOpacity>

            {/* Twitter */}
            <TouchableOpacity
              onPress={() => handlePress('https://x.com/attplgroup')}>
              <Icon
                name="twitter"
                type="font-awesome"
                color="#1da1f2"
                size={35}
                iconStyle={styles.socialIcon}
              />
            </TouchableOpacity>

            {/* Instagram */}
            <TouchableOpacity
              onPress={() =>
                handlePress('https://www.instagram.com/attpleasylife/')
              }>
              <Icon
                name="instagram"
                type="font-awesome"
                color="#e4405f"
                size={35}
                iconStyle={styles.socialIcon}
              />
            </TouchableOpacity>

            {/* YouTube */}
            <TouchableOpacity
              onPress={() =>
                handlePress('https://www.youtube.com/@attpleasylifeapp')
              }>
              <Icon
                name="youtube"
                type="font-awesome"
                color="#ff0000"
                size={35}
                iconStyle={styles.socialIcon}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    marginTop: 20,
    alignItems: 'center',
    paddingVertical: 20,
  },
  footerText: {
    fontSize: 22.23,
    marginBottom: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  socialIcons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  socialIcon: {
    marginHorizontal: 10,
  },
  footerTextSkeleton: {
    width: 200,
    height: 25,
    marginBottom: 10,
    borderRadius: 4,
  },
  iconSkeleton: {
    width: 35,
    height: 35,
    marginHorizontal: 10,
    borderRadius: 50,
  },
});

export default Footer;
