import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Chip} from 'react-native-elements';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {useNavigation} from '@react-navigation/native';
import {fDate} from '../../utilities/formatData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Layout from '../../components/layout/Layout';
import ImageView from 'react-native-image-viewing';

import {fetchTractorTool} from '../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/TractorSlice';

export default function TractorToolDetailsView({route}) {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const {colors, fonts} = useSelector(selectTheme);
  const [currImage, setCurrImage] = useState('');
  const [otherImage, setOtherImage] = useState('');

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;
  const navigation = useNavigation();

  const images = [
    {
      uri: currImage,
    },
    {
      uri: otherImage,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const tractorId = route?.params?.tractorId;

  const openImage = (img, other) => {
    setCurrImage(img);
    setOtherImage(other);
    setIsVisible(true);
  };

  const getData = async () => {
    try {
      const result = await dispatch(fetchTractorTool(tractorId));
      if (fetchTractorTool.fulfilled.match(result)) {
        if (result.payload) {
          setJobData(result.payload);
        } else {
          setJobData({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch tractor tool.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  const renderContent = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {jobData?.model?.toUpperCase()}
      </Text>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Brand</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.brand}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Condition</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.condition}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Engine Power
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.horsepower} hp
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Engine Type</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.engineType}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Weight</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.weightKg} Kg
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Fule Capacity
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.fuelCapacityLitres} lt
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Transmission Type
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.transmissionType}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Tyre Type</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.tireType}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Price</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          ₹ {jobData?.price}
        </Text>
      </View>
    </Card>
  );

  const renderOverview = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <View style={styles.section}>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          Tool Images
        </Text>
        <TouchableOpacity
          onPress={() =>
            openImage(
              jobData?.imageUrl?.frontImageUrl,
              jobData?.imageUrl?.sideImageUrl,
            )
          }>
          <Image
            source={{
              uri:
                jobData?.imageUrl?.frontImageUrl ||
                'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            openImage(
              jobData?.imageUrl?.sideImageUrl,
              jobData?.imageUrl?.frontImageUrl,
            )
          }>
          <Image
            source={{
              uri:
                jobData?.imageUrl?.sideImageUrl ||
                'https://images.unsplash.com/photo-1569569970363-df7b6160d111',
            }}
            style={styles.cardImage}
          />
        </TouchableOpacity>
        <ImageView
          images={images}
          imageIndex={0}
          visible={visible}
          onRequestClose={() => setIsVisible(false)}
        />
      </View>
    </Card>
  );

  const renderBooking = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* <Text style={[styles.subtitle, { color: colors.text }]}>COMPANY DETAILS</Text> */}
      <Button
        title="Book Appointment"
        onPress={() =>
          navigation.navigate('FarmerAppointmentCreate', {
            sellerOwnerId: jobData?.sellerOwnerId,
          })
        }
      />
    </Card>
  );

  return (
    <>
      <ScrollView
        contentContainerStyle={[
          styles.container,
          {backgroundColor: colors.background},
        ]}>
        <View style={styles.grid}>
          <View style={styles.column}>
            {renderContent}
            {renderOverview}
            {renderBooking}
          </View>
        </View>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 2,
  },
  card: {
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  cardImage: {
    height: 220, // Adjust the height as per your design
    width: '100%',
    borderRadius: 14,
    marginTop: 14,
    objectFit: 'fill',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 16,
  },
  subtitle: {
    marginBottom: 8,
  },
  listItemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginVertical: 4,
  },
  bullet: {
    fontSize: 20,
    marginRight: 5,
  },
  listItem: {
    fontSize: 16,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    margin: 4,
  },
  overviewItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  overviewText: {
    marginLeft: 8,
  },
  overviewLabel: {
    fontSize: 14,
    color: '#888',
  },
  overviewValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  companyName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  companyLocation: {
    fontSize: 16,
    marginBottom: 14,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  column: {
    flex: 1,
    minWidth: '48%',
    marginHorizontal: '1%',
  },
});
