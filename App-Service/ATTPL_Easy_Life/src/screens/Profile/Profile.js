import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

import {useNavigation} from '@react-navigation/native';
import Header from '../../components/Header';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import {fetchPartyList} from '../../redux/slices/UMS/authSlice';

/**
 * ProfileScreen component.
 *
 * This screen displays the user's profile information including personal details and bio.
 * It provides an option to navigate to the EditProfile screen.
 *
 * @returns {React.Element} - The ProfileScreen element.
 *
 * @author PRATHAMESH GHORPADE
 */
const ProfileScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {colors, fonts} = useSelector(selectTheme);
  const [partyList, setPartyList] = useState();
  const user = useSelector(selectUser);
  console.log(user);
  const profileData = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1234567890',
    address: '123 Main St, City, Country',
    bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec vel velit ac tortor fermentum rhoncus.',
  };

  const useGetParties = async () => {
    try {
      const response = await dispatch(fetchPartyList());
      if (fetchPartyList.fulfilled.match(response)) {
        const PartyData = response?.payload?.data.map(list => ({
          value: list.partyId,
          label: list.partyName,
        }));
        setPartyList(PartyData);
      }
    } catch (error) {
      Alert.alert('Error', 'An Unexpected error occurred');
    }
  };
  useEffect(() => {
    useGetParties();
  }, []);

  return (
    <>
      <Header
        navigation={navigation}
        title=" Profile"
        colors={colors}
        fonts={fonts}
      />
      <ScrollView
        style={[styles.container, {backgroundColor: colors.background}]}>
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium},
            ]}>
            PROFILE DETAILS
          </Text>
          <View style={styles.infoItem}>
            {/* <Ionicons
              name="person-circle-outline"
              size={24}
              color={colors.primary}
            /> */}
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Name:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.firstName} ${user?.UserProfile?.middleName} ${user?.UserProfile?.lastName}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              DOB:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.dateOfBirth}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Gender:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.gender}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Father Name:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.fatherName}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Mother Name:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.motherName}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Qualification:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {`${user?.UserProfile?.highestQualification}`}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Your Political Party:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {partyList
                ? partyList[
                    Number(user?.UserProfile?.politicalPartyAffiliation) - 1
                  ]?.label
                : ''}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Current Job:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserProfile?.currentJobTitle}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Religion:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserProfile?.religion}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Tehsil:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserProfile?.tehsilName}
            </Text>
          </View>

          <TouchableOpacity
            style={[
              styles.editProfileButton,
              {backgroundColor: colors.primary},
            ]}
            onPress={() =>
              navigation.navigate('EditProfile', {profileForm: 'profile'})
            }>
            <Text
              style={[
                styles.buttonText,
                {color: colors.surface, ...fonts.bodyMedium},
              ]}>
              Edit Profile
            </Text>
          </TouchableOpacity>

          <Text
            style={[
              styles.sectionTitle,
              {color: colors.text, ...fonts.titleMedium, marginTop: 20},
            ]}>
            ADDRESS DETAILS
          </Text>

          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Home Address :
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses &&
                user?.UserAddressesses[0]?.streetAddress}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              District:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.userCity}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              State:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.userState}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Panchayat:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses &&
                user?.UserAddressesses[0]?.panchayatName}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              WardNo:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.wardNo}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Pincode:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.postalCode}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              country:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.country}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text
              style={[
                styles.infoText,
                {color: colors.primary, ...fonts.bodyMedium},
              ]}>
              Address Type:
            </Text>
            <Text
              style={[
                styles.infoText,
                {color: colors.text, ...fonts.bodyMedium},
              ]}>
              {user?.UserAddressesses && user?.UserAddressesses[0]?.addressType}
            </Text>
          </View>
          <TouchableOpacity
            style={[
              styles.editProfileButton,
              {backgroundColor: colors.primary},
            ]}
            onPress={() =>
              navigation.navigate('EditProfile', {profileForm: 'address'})
            }>
            <Text
              style={[
                styles.buttonText,
                {color: colors.surface, ...fonts.bodyMedium},
              ]}>
              Edit Address
            </Text>
          </TouchableOpacity>
          {/* <View style={styles.infoItem}>
            <Ionicons name="mail-outline" size={24} color={colors.primary} />
            <Text
              style={[
                styles.infoText,
                { color: colors.text, ...fonts.bodyMedium },
              ]}>
              {user?.email}
            </Text>
          </View> */}
          {/* <View style={styles.infoItem}>
            <Ionicons name="call-outline" size={24} color={colors.primary} />
            <Text
              style={[
                styles.infoText,
                { color: colors.text, ...fonts.bodyMedium },
              ]}>
              {user.phone}
            </Text>
          </View> */}
          {/* <View style={styles.infoItem}>
            <Ionicons
              name="location-outline"
              size={24}
              color={colors.primary}
            />
            <Text
              style={[
                styles.infoText,
                { color: colors.text, ...fonts.bodyMedium },
              ]}>
              {user?.UserAddressesses[0]?.streetAddress}
            </Text>
          </View> */}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 12,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 12,
    fontSize: 16,
  },
  bioText: {
    marginTop: 12,
    fontSize: 14,
  },
  editProfileButton: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen;
