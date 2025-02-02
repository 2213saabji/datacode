import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import {useSelector} from 'react-redux';
import ShimmerPlaceHolder from '../../hooks/useShimmer';
import {selectTheme} from '../../redux/selectors';
import {Linking} from 'react-native';

const FeatureCard = ({loading}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [activeIndex, setActiveIndex] = useState(0);
  const images = [
    require('../../assets/Home/images/featurecard.png'),
    require('../../assets/Home/images/featurecard.png'),
    require('../../assets/Home/images/featurecard.png'),
  ];

  // Auto-switch between images in the carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1,
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Handle manual indicator press
  const handleIndicatorPress = index => {
    setActiveIndex(index);
  };

  return (
    <View style={[styles.featureCard, {backgroundColor: colors.surface}]}>
      {loading ? (
        <>
          <ShimmerPlaceHolder
            style={[
              styles.titleSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
          <ShimmerPlaceHolder
            style={[
              styles.subtitleSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
          <ShimmerPlaceHolder
            style={[
              styles.buttonSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
          <ShimmerPlaceHolder
            style={[
              styles.graphImageSkeleton,
              {backgroundColor: colors.placeholder},
            ]}
          />
          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <ShimmerPlaceHolder
                key={index}
                style={[
                  styles.indicatorSkeleton,
                  index === activeIndex && styles.activeIndicatorSkeleton,
                  {backgroundColor: colors.placeholder},
                ]}
              />
            ))}
          </View>
        </>
      ) : (
        <>
          <Text
            style={[
              styles.title,
              {color: colors.primary, fontFamily: fonts.titleLarge.fontFamily},
            ]}>
            ATTPL EMS FEATURES
          </Text>
          <Text
            style={[
              styles.subtitle,
              {color: colors.text, fontFamily: fonts.bodyMedium.fontFamily},
            ]}>
            See all our features explained in a short video
          </Text>

          <TouchableOpacity
            style={[styles.button, {backgroundColor: '#078DEE'}]}
            onPress={() => Linking.openURL('https://youtu.be/7PNNLkj9S74')}>
            <Text
              style={[
                styles.buttonText,
                {
                  color: colors.onPrimary,
                  fontFamily: fonts.bodyMedium.fontFamily,
                },
              ]}>
              Watch Now
            </Text>
          </TouchableOpacity>

          <Image
            source={images[activeIndex]}
            style={styles.graphImage}
            resizeMode="contain"
          />
          <View style={styles.indicatorContainer}>
            {images.map((_, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.indicator,
                  index === activeIndex && styles.activeIndicator,
                  {backgroundColor: colors.indicator},
                ]}
                onPress={() => handleIndicatorPress(index)}
              />
            ))}
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  featureCard: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#00000014',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    textAlign: 'center',
  },
  graphImage: {
    width: '100%',
    height: 200,
    marginVertical: 10,
  },
  indicatorContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  indicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeIndicator: {
    backgroundColor: '#00A896',
  },
  titleSkeleton: {
    width: '90%',
    height: 30,
    marginBottom: 10,
    borderRadius: 4,
  },
  subtitleSkeleton: {
    width: '90%',
    height: 20,
    marginBottom: 20,
    borderRadius: 4,
  },
  buttonSkeleton: {
    width: '50%',
    height: 40,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 20,
  },
  graphImageSkeleton: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius: 4,
  },
  indicatorSkeleton: {
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 5,
  },
  activeIndicatorSkeleton: {
    backgroundColor: '#00A896',
  },
});

export default FeatureCard;
