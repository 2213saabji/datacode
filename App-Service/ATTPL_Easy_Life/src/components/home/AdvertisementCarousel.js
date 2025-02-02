import React from 'react';
import {View, Image, StyleSheet} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import ShimmerPlaceHolder from '../../hooks/useShimmer';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const AdvertisementCarousel = ({advertisementItems = [], loading = false}) => {
  const {colors} = useSelector(selectTheme);

  // If there are no advertisement items and not loading, display a fallback view
  if (!loading && advertisementItems.length === 0) {
    return (
      <View
        style={[styles.carouselContainer, {backgroundColor: colors.surface}]}>
        <Image
          source={{uri: 'fallback_image_url'}} // Replace with a fallback image URL
          style={styles.advertisingImage}
          resizeMode="cover"
        />
      </View>
    );
  }

  return (
    <>
      {loading ? (
        <ShimmerPlaceHolder
          style={[
            styles.carouselContainer,
            styles.advertisingImageSkeleton,
            {backgroundColor: colors.placeholder},
          ]}
        />
      ) : (
        <View
          style={[styles.carouselContainer, {backgroundColor: colors.surface}]}>
          <Carousel
            data={advertisementItems}
            renderItem={({item}) => (
              <Image
                source={item.image}
                style={styles.advertisingImage}
                resizeMode="cover"
              />
            )}
            width={300}
            height={300}
            loop
            autoPlay
            autoPlayInterval={3000} // Adjust timing as necessary
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    width: 300,
    height: 300,
    marginHorizontal: 30,
    marginVertical: 12,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
    overflow: 'hidden',
  },
  advertisingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  advertisingImageSkeleton: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default AdvertisementCarousel;
