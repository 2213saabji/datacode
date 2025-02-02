import React, {useCallback, useState, lazy, Suspense} from 'react';
import {StyleSheet, ScrollView, View, SafeAreaView} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import {useFocusEffect} from '@react-navigation/native';

// Lazy load components
const Header = lazy(() => import('../../components/home/Header'));
const FeatureCard = lazy(() => import('../../components/home/FeatureCard'));
const Footer = lazy(() => import('../../components/home/Footer'));
const Disclaimer = lazy(() => import('../../components/home/Disclaimer'));
const SectionWithCarousel = lazy(() =>
  import('../../components/home/SectionWithCarousel'),
);
const NewsCarousel = lazy(() => import('../../components/home/NewsCarousel'));
const AdvertisementCarousel = lazy(() =>
  import('../../components/home/AdvertisementCarousel'),
);

import {selectTheme} from '../../redux/selectors';

import {fetchUserData} from '../../redux/slices/UMS/authSlice';
import {ALLCM, complaint} from '../../assets/Home/images/ImageAssets';

const advertisementImage = require('../../assets/Home/images/advertisement1.png');

const candidatesData = ALLCM;

const localNewsData = [
  {
    image: 'https://i.ytimg.com/vi/2uMjN7kS8DA/hqdefault.jpg',
    text: 'Times of India',
    url: 'https://www.youtube.com/embed/OhLK-T_rYv4?si=dAERlXzHIRwX_8ro',
  },
  {
    image: 'https://i.ytimg.com/vi/7G2txQnK2Lg/hqdefault.jpg',
    text: 'NDTV',
    url: 'https://www.youtube.com/embed/4MTbyWizCUM?si=HylykjjDRYTyZlH5',
  },
  {
    image: 'https://i.ytimg.com/vi/9p3uI1c4w0U/hqdefault.jpg',
    text: 'News18 India',
    url: 'https://www.youtube.com/embed/03ut_kVcDBg?si=S8Xjp829grnbyQqS',
  },
  {
    image: 'https://i.ytimg.com/vi/KpOXl0gk8S8/hqdefault.jpg',
    text: 'India TV',
    url: 'https://www.youtube.com/embed/zkd3I5abSAI?si=xjjhS11wbX4ZzaYF',
  },
  {
    image: 'https://i.ytimg.com/vi/1PHrQ7wWGb4/hqdefault.jpg',
    text: 'Zee News',
    url: 'https://www.youtube.com/embed/c7J26N8Tdp8?si=-WCxR1W4VHET5ddZ',
  },
  // Add more items as needed
];

const nationalNewsData = [
  {
    image: 'https://i.ytimg.com/vi/2uMjN7kS8DA/hqdefault.jpg',
    text: 'Times of India',
    url: 'https://www.youtube.com/embed/OhLK-T_rYv4?si=dAERlXzHIRwX_8ro',
  },
  {
    image: 'https://i.ytimg.com/vi/7G2txQnK2Lg/hqdefault.jpg',
    text: 'NDTV',
    url: 'https://www.youtube.com/embed/4MTbyWizCUM?si=HylykjjDRYTyZlH5',
  },
  {
    image: 'https://i.ytimg.com/vi/9p3uI1c4w0U/hqdefault.jpg',
    text: 'News18 India',
    url: 'https://www.youtube.com/embed/03ut_kVcDBg?si=S8Xjp829grnbyQqS',
  },
  {
    image: 'https://i.ytimg.com/vi/KpOXl0gk8S8/hqdefault.jpg',
    text: 'India TV',
    url: 'https://www.youtube.com/embed/zkd3I5abSAI?si=xjjhS11wbX4ZzaYF',
  },
  {
    image: 'https://i.ytimg.com/vi/1PHrQ7wWGb4/hqdefault.jpg',
    text: 'Zee News',
    url: 'https://www.youtube.com/embed/c7J26N8Tdp8?si=-WCxR1W4VHET5ddZ',
  },

  {
    image: 'https://i.ytimg.com/vi/ubJWxThZKjA/hqdefault.jpg',
    text: 'The Indian Express',
    url: 'https://www.youtube.com/embed/iay7fXjL8Os?si=kRN6B-JFdQJghWV7',
  },
  {
    image: 'https://i.ytimg.com/vi/6fOEFgCV6g8/hqdefault.jpg',
    text: 'Hindustan Times',
    url: 'https://www.youtube.com/embed/qLJfNvLWMAo?si=Ssu5tQtCsTjxQ_RR',
  },
  // Add more items as needed
];

const advertisementItems = [
  {image: advertisementImage},
  {image: advertisementImage},
  {image: advertisementImage},
];

const problemsData = complaint;

const HomeScreen = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      const fetchData = async () => {
        try {
          await dispatch(fetchUserData());
        } catch (error) {
          console.error('Error fetching user data:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, [dispatch]),
  );

  const renderLazyComponent = (Component, props) => (
    <Suspense fallback={<View style={styles.loadingPlaceholder} />}>
      <Component {...props} />
    </Suspense>
  );

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView>
        <View style={[styles.container, {backgroundColor: colors.background}]}>
          {/* Disclaimer Section */}
          <View style={[styles.section, {shadowColor: colors.shadow}]}>
            {renderLazyComponent(Disclaimer, {loading})}
          </View>

          {/* Features Section */}
          <View style={[styles.section, {backgroundColor: colors.surface}]}>
            {renderLazyComponent(Header, {loading})}
            {renderLazyComponent(FeatureCard, {loading})}
          </View>

          {/* Advertising Section */}
          {renderLazyComponent(AdvertisementCarousel, {
            advertisementItems,
            loading,
          })}

          {/* Common Problems in Your Area Section */}
          {renderLazyComponent(SectionWithCarousel, {
            title: 'Common Problems in Your Area',
            items: problemsData,
            loading,
          })}

          {/* Candidates in the Election Section */}
          {renderLazyComponent(SectionWithCarousel, {
            title: 'Candidates in the Election',
            items: candidatesData,
            loading,
          })}

          {/* Local News Section */}
          {renderLazyComponent(NewsCarousel, {
            title: 'Local News',
            items: localNewsData,
            loading,
          })}

          {/* National News Section */}
          {renderLazyComponent(NewsCarousel, {
            title: 'National News',
            items: nationalNewsData,
            loading,
          })}

          {/* Footer Section */}
          {renderLazyComponent(Footer, {loading})}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
  },
  section: {
    marginHorizontal: 24,
    marginVertical: 12,
    borderRadius: 10,
    shadowOffset: {width: 2, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  loadingPlaceholder: {
    height: 100,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
});

export default HomeScreen;
