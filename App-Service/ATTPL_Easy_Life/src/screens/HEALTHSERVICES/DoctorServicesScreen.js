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

import BannerImage from '../../assets/DoctorServices/images/doctor_services_banner.png';
import OrthoClinicImage from '../../assets/DoctorServices/images/ortho_clinic.png';
import EsthevaImage from '../../assets/DoctorServices/images/estheva.png';

const ServiceCard = ({title, description, image}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={[styles.card, {backgroundColor: colors.surface}]}>
      <View style={styles.cardHeader}>
        <Icon name="activity" size={20} color={colors.primary} />
        <Text style={[styles.cardTitle, {color: colors.text}]}>{title}</Text>
      </View>
      <Image source={image} style={styles.cardImage} />
      <Text style={[styles.cardDescription, {color: colors.text}]}>
        {description}
      </Text>
    </View>
  );
};

const DoctorServicesScreen = () => {
  const {colors} = useSelector(selectTheme);

  return (
    <SafeAreaView
      style={[styles.container, {backgroundColor: colors.background}]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}>
        <Image source={BannerImage} style={styles.bannerImage} />

        <ServiceCard
          title="Ortho & Spine Clinic"
          description="Dr Pankaj Ortho Centre is an Orthopedics Clinic in Sector 77, Noida. The clinic is visited by orthopedic surgeon Dr. Pankaj Kumar."
          image={OrthoClinicImage}
        />

        <ServiceCard
          title="Estheva"
          description="Estheva is committed to providing a holistic solution for skin, hair, and overall well-being. Utilizing cutting-edge technology, Estheva offers a combination of advanced treatments and personalized care."
          image={EsthevaImage}
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

export default DoctorServicesScreen;
