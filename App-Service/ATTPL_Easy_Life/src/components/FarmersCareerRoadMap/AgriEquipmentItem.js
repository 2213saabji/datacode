import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const AgriEquipmentItem = ({item, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const images = {
    'Modern Agricultural Tool': require('../../assets/FarmersCareerRoadMap/images/modernAgri.jpg'),
    'Cultivation Equipment': require('../../assets/FarmersCareerRoadMap/images/cultivationTool.webp'),
    'Irrigration System': require('../../assets/FarmersCareerRoadMap/images/irrigation.jpg'),
    'Combine Harvester': require('../../assets/FarmersCareerRoadMap/images/combineHarvester.jpg'),
    Tractor: require('../../assets/FarmersCareerRoadMap/images/tractor.jpg'),
  };

  return (
    <TouchableOpacity
      onPress={() =>
        // Add your navigation or action here
        navigation.navigate(item.value)
      }>
      <ImageBackground
        source={images[item.name]}
        style={[
          styles.AgriEquipmentItem,
          {backgroundColor: colors.surface, shadowColor: colors.shadow},
        ]}
        imageStyle={styles.backgroundImage}>
        <View style={styles.overlay}>
          <Text style={[styles.appointmentTitle, {color: '#fff'}]}>
            {item.name}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default AgriEquipmentItem;

const styles = StyleSheet.create({
  AgriEquipmentItem: {
    marginBottom: 10,
    width: '100%', // Ensures the card takes up the full width of its container
    height: 200, // Fixed height, adjust as necessary
    borderRadius: 8,
    elevation: 3,
    overflow: 'hidden', // To make sure the borderRadius applies to the image
  },
  backgroundImage: {
    borderRadius: 8, // This will apply the border radius to the image
  },
  overlay: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Adjust the opacity for the desired overlay effect
    borderRadius: 8, // Match the border radius of the image
    position: 'absolute',
    top: 0,
    left: 0,
  },
  appointmentTitle: {
    fontSize: 26,
    textAlign: 'center',
    fontWeight: '600',
  },
});
