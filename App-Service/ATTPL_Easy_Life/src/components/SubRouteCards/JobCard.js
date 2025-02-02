import React, {useState} from 'react';
import {Card, Text, useTheme, TouchableRipple} from 'react-native-paper';
import {StyleSheet, Image, Linking} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
// Adjust the path as per your project structure

const JobCard = ({
  title,
  description,
  imageSource,
  cardUrl,
  popUp,
  setModalVisible,
  setSelectedCard,
  navigation,
  applyUrl,
  routeTypeName,
}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const handlePress = () => {
    const formattedTitle = title.trim().replace(/\s+/g, '').toLowerCase();
    switch (formattedTitle) {
      case 'farmerguide':
        return navigation.navigate('FarmerGuideViewScreen');
      case 'attplbuyandsellcrops':
        return navigation.navigate('FarmerBuySellCropsScreen');
      case 'studentguide':
        return navigation.navigate('studentGuideScreen');
      default: {
        if (cardUrl) {
          Linking.openURL(cardUrl).catch(err =>
            console.error(
              'An error occurred while trying to open the URL:',
              err,
            ),
          );
        }
      }
    }
  };

  const handleModal = () => {
    const formattedTitle = title.trim().replace(/\s+/g, '').toLowerCase();
    switch (formattedTitle) {
      case 'farmerguide':
        return navigation.navigate('studentGuideScreen');
      case 'attplbuyandsellcrops':
        return navigation.navigate('FarmerBuySellCropsScreen');
      case 'studentguide':
        return navigation.navigate('studentGuideScreen');
      default: {
        setModalVisible(true);
        setSelectedCard(() => ({
          title: title,
          cardUrl: cardUrl,
          applyUrl: applyUrl,
        }));
      }
    }
  };

  const popUpOpen = () => {
    if (popUp) {
      if (applyUrl !== null) {
        return true;
      } else if (routeTypeName === 'Government Scheme') {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <TouchableRipple
      onPress={popUpOpen() ? handleModal : handlePress}
      rippleColor={colors.primary}
      borderless>
      <Card style={[styles.card, {backgroundColor: colors.surface}]}>
        <Image source={{uri: imageSource}} style={styles.cardImage} />
        <Card.Content>
          <Text
            style={[
              styles.cardTitle,
              {color: colors.text, fontFamily: fonts.labelMedium.fontFamily},
            ]}>
            {title}
          </Text>
          <Text
            style={[
              styles.cardDescription,
              {color: colors.text, fontFamily: fonts.bodySmall.fontFamily},
            ]}>
            {description}
          </Text>
        </Card.Content>
      </Card>
    </TouchableRipple>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    borderRadius: 8,
    padding: 16,
    elevation: 4, // Add elevation for shadow (Android)
  },
  cardImage: {
    height: 320, // Adjust the height as per your design
    width: '100%',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default JobCard;
