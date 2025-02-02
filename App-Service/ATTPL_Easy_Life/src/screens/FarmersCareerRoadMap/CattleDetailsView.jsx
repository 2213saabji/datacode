import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Button,
  TouchableOpacity,
  Image,
  Linking,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {Card, Chip} from 'react-native-elements';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {fDate} from '../../utilities/formatData';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import Layout from '../../components/layout/Layout';
import ImageView from 'react-native-image-viewing';

import {
  fetchCattle,
  fetchCattleUser,
} from '../../redux/slices/CRM/FarmerCareerRoad/FarmerTools/CattleTrade';

export default function CattleDetailsView({route}) {
  const dispatch = useDispatch();
  const [jobData, setJobData] = useState({});
  const [userData, setUserData] = useState({});
  const {colors, fonts} = useSelector(selectTheme);
  const [currImage, setCurrImage] = useState('');
  const {showAlert} = useCustomAlert();

  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  const images = [
    {
      uri: currImage,
    },
  ];

  const [visible, setIsVisible] = useState(false);

  const cattleTypeId = route?.params?.cattleTypeId;
  const cattleId = route?.params?.cattleId;

  const openImage = img => {
    setCurrImage(img);
    setIsVisible(true);
  };

  const getData = async () => {
    try {
      const result = await dispatch(fetchCattle(cattleTypeId));
      const userResult = await dispatch(fetchCattleUser(cattleId));

      if (
        fetchCattle.fulfilled.match(result) &&
        fetchCattleUser.fulfilled.match(userResult)
      ) {
        if (result.payload && userResult.payload) {
          setJobData(result.payload);
          setUserData(userResult.payload);
        } else {
          setJobData({});
          setUserData({});
        }
      } else {
        console.log(result.payload || 'Failed to fetch Cattle list.');
      }
    } catch (error) {
      console.log(error.message || 'An unexpected error occurred');
    }
  };

  useEffect(() => {
    getData();
  }, [route]);

  const handleContactTrader = () => {
    const phoneNumber = userData?.User?.phone;

    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      showAlert('error', 'Contact number is not available');
    }
  };

  const renderContent = (
    <Card
      containerStyle={[
        styles.card,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      <Text style={[styles.title, {color: colors.text}]}>
        {jobData?.type?.toUpperCase()}
      </Text>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Breed</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.breed}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Age</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.age} yr
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Weight</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.weight} Kg
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>
          Health Status
        </Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.healthStatus}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>Description</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {jobData?.description}
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
          Image Gallery
        </Text>
        <TouchableOpacity
          onPress={() => openImage(jobData?.imageUrl?.[0]?.preview)}>
          <Image
            source={{
              uri:
                jobData?.imageUrl?.[0]?.preview ||
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
      <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
        SELLER DETAILS
      </Text>
      {userData?.User?.UserProfile?.firstName ? (
        <View style={styles.section}>
          <Text style={[styles.subtitle, {color: colors.text}]}>Name</Text>
          <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
            {userData?.User?.UserProfile?.firstName}{' '}
            {userData?.User?.UserProfile?.lastName || null}
          </Text>
        </View>
      ) : null}
      {userData?.User?.email ? (
        <View style={styles.section}>
          <Text style={[styles.subtitle, {color: colors.text}]}>Email</Text>
          <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
            {userData?.User?.email}
          </Text>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>State</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {userData?.state || 'not provided'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>City</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {userData?.city || 'not provided'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.subtitle, {color: colors.text}]}>District</Text>
        <Text style={{color: colors.text, fontSize: 18, fontWeight: 'bold'}}>
          {userData?.district || 'not provided'}
        </Text>
      </View>

      <View style={styles.section}>
        <Button title="Contact Seller" onPress={handleContactTrader} />
      </View>
    </Card>
  );

  return (
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
