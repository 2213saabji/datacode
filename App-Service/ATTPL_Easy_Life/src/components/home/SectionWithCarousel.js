import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import Carousel from 'react-native-reanimated-carousel';
import FastImage from 'react-native-fast-image';
import ShimmerPlaceHolder from '../../hooks/useShimmer';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const SectionWithCarousel = ({title, items, loading, onViewMore}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const renderItem = ({item}) => (
    <View style={styles.carouselItem}>
      <View style={styles.imageContainer}>
        <FastImage
          source={item.image}
          style={styles.image}
          resizeMode={FastImage.resizeMode.stretch}>
          <View
            style={[styles.overlay, {backgroundColor: 'rgba(0, 0, 0, 0.3)'}]}>
            <Text
              style={[
                styles.text,
                {color: colors.surface, ...fonts.titleMedium},
              ]}>
              {item.text}
            </Text>
            {onViewMore && (
              <Button
                mode="contained"
                onPress={onViewMore}
                style={[styles.button, {backgroundColor: colors.primary}]}
                labelStyle={[styles.buttonText, {color: colors.surface}]}>
                View More
              </Button>
            )}
          </View>
        </FastImage>
      </View>
    </View>
  );

  return (
    <View
      style={[
        styles.section,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {loading ? (
        <>
          <ShimmerPlaceHolder style={styles.sectionTitleSkeleton} />
          <ShimmerPlaceHolder style={styles.carouselSkeleton} />
        </>
      ) : (
        <>
          <Text style={[styles.sectionTitle, {color: colors.text}]}>
            {title}
          </Text>
          <Carousel
            data={items}
            renderItem={renderItem}
            width={Dimensions.get('window').width - 60}
            height={200}
            loop
            autoPlay
            autoPlayInterval={3000}
            panGestureHandlerProps={{
              activeOffsetX: [-10, 10],
            }}
          />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    marginHorizontal: 30,
    marginVertical: 12,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
  },
  sectionTitleSkeleton: {
    width: '60%',
    height: 18,
    marginBottom: 10,
    marginTop: 10,
    marginLeft: 16,
    marginRight: 16,
    borderRadius: 4,
  },
  carouselSkeleton: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageContainer: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
  },
  overlay: {
    padding: 10,
    flex: 1,
    alignItems: 'baseline',
    justifyContent: 'flex-end',
  },
  text: {
    fontSize: 24,
    marginBottom: 5,
  },
  button: {
    marginTop: 5,
    borderRadius: 5,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 22,
  },
});

export default SectionWithCarousel;
