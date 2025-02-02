import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import BannerImage from '../../assets/HealthTips/images/health_tips_banner.png';
import TipOneImage from '../../assets/HealthTips/images/tip_one.png';
import TipTwoImage from '../../assets/HealthTips/images/tip_two.png';
import TipThreeImage from '../../assets/HealthTips/images/tip_three.png';

const HealthTipCard = ({title, description, image}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={[styles.card, {backgroundColor: colors.surface}]}>
      <View style={styles.cardHeader}>
        <Icon name="heart" size={20} color={colors.primary} />
        <Text style={[styles.cardTitle, {color: colors.text}]}>{title}</Text>
      </View>
      <Image source={image} style={styles.cardImage} />
      <Text style={[styles.cardDescription, {color: colors.text}]}>
        {description}
      </Text>
    </View>
  );
};

const HealthTipsScreen = () => {
  const {colors} = useSelector(selectTheme);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <Image source={BannerImage} style={styles.bannerImage} />

        <HealthTipCard
          title="STAY HYDRATED"
          description="Drinking plenty of water is essential for maintaining good health. Aim for at least 8 glasses a day."
          image={TipOneImage}
        />

        <HealthTipCard
          title="EAT A BALANCED DIET"
          description="Include a variety of fruits, vegetables, proteins, and whole grains in your diet for overall well-being."
          image={TipTwoImage}
        />

        <HealthTipCard
          title="EXERCISE REGULARLY"
          description="Engage in at least 30 minutes of physical activity most days of the week to keep your body fit."
          image={TipThreeImage}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  scrollViewContent: {
    paddingBottom: 16, // Add space at the bottom for scrolling
  },
  bannerImage: {
    width: '100%',
    height: 150,
    borderRadius: 10,
    marginBottom: 16,
  },
  card: {
    borderRadius: 10,
    marginBottom: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  cardImage: {
    width: '100%',
    height: 300,
    borderRadius: 8,
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
  },
});

export default HealthTipsScreen;
