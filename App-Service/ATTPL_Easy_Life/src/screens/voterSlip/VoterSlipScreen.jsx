import React from 'react';
import {View, Text, StyleSheet, Image, ScrollView, Alert} from 'react-native';
import {Button, useTheme} from 'react-native-paper';
import Share from 'react-native-share';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import DetailRow from '../../components/VoterSlip/DetailRow';


const VoterSlipScreen = () => {
  const {colors, fonts} = useSelector(selectTheme);
  const {
    container,
    title,
    card,
    subtitle,
    image,
    infoContainer,
    buttonContainer,
    button,
  } = styles;

  const handleDownload = () => {
    Alert.alert('Download button pressed');
  };

  const handleShare = async () => {
    const shareOptions = {
      message: 'Here is my voter slip',
    };
    try {
      await Share.open(shareOptions);
    } catch (error) {
      console.log('Error =>', error);
    }
  };

  // Data for the DetailRows
  const detailRows = [
    {label: 'Name', value: 'Abhishek Singh'},
    {label: 'Age', value: '25'},
    {label: 'S/O/CO', value: 'Abhishek Singh'},
    {label: 'Gender', value: 'Male'},
    {label: 'EPIC no. / Voter no.', value: '1234567'},
    {label: 'Polling Station', value: 'LKO'},
    {label: 'Parliament Constituency no.', value: '123456'},
    {label: 'Part Serial no.', value: '123456'},
    {label: 'Part no.', value: '123456'},
    {label: 'Aadhaar no.', value: '45653657'},
    {label: 'Polling Date', value: '25/04/2024'},
  ];

  return (
    <ScrollView
      contentContainerStyle={[container, {backgroundColor: colors.background}]}>
      <Text style={[title, fonts.titleLarge, {color: colors.text}]}>
        Voter Slip
      </Text>
      <View style={[card, {backgroundColor: colors.surface}]}>
        <Text style={[subtitle, fonts.subtitle, {color: colors.text}]}>
          Voter Slip Picture
        </Text>
        <Image
          source={require('../../assets/Home/images/pic.png')}
          style={image}
        />
        <View style={infoContainer}>
          {detailRows.map((item, index) => (
            <DetailRow key={index} label={item.label} value={item.value} />
          ))}
        </View>
        <View style={buttonContainer}>
          <Button
            icon="download"
            mode="contained"
            onPress={handleDownload}
            style={[button, {backgroundColor: colors.primary}]}>
            DOWNLOAD
          </Button>
          <Button
            icon="share"
            mode="contained"
            onPress={handleShare}
            style={[button, {backgroundColor: colors.accent}]}>
            SHARE
          </Button>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  card: {
    borderRadius: 8,
    padding: 16,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 8,
  },
  image: {
    borderRadius: 13.2,
    marginBottom: 16,
    width: 137,
    height: 137,
  },
  infoContainer: {
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 16,
  },
  button: {
    flex: 1,
    marginHorizontal: 4,
  },
});

export default VoterSlipScreen;
