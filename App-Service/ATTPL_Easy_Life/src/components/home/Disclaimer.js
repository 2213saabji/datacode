import React, {useState} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import ShimmerPlaceHolder from '../../hooks/useShimmer';

const Disclaimer = ({loading}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [expanded, setExpanded] = useState(false);

  const fullText =
    'This app is not affiliated with, endorsed by, or associated with any government entity. The information provided in this app is for general informational purposes only and is not intended to serve as a source of official government information.';
  const shortText = fullText.slice(0, 100) + '...';

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <TouchableOpacity
      onPress={toggleExpand}
      style={[
        styles.container,
        {
          backgroundColor: colors.surface,
          shadowColor: colors.shadow,
        },
      ]}>
      {loading ? (
        <ShimmerPlaceHolder style={styles.textSkeleton} />
      ) : (
        <>
          <Text
            style={[
              styles.text,
              {
                color: colors.text,
                fontFamily: fonts.bodyMedium.fontFamily,
                fontSize: fonts.bodyMedium.fontSize,
                lineHeight: fonts.bodyMedium.lineHeight,
              },
            ]}>
            {expanded ? fullText : shortText}
          </Text>
          <Text
            style={[
              styles.readMore,
              {
                color: colors.primary,
                fontFamily: fonts.bodyMedium.fontFamily,
              },
            ]}>
            {expanded ? 'Read Less' : 'Read More'}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    padding: 16,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSkeleton: {
    width: '100%',
    height: 120,
    borderRadius: 4,
  },
  text: {
    marginBottom: 8,
  },
  readMore: {
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default Disclaimer;
