import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { VictoryPie } from 'victory-native';
import * as Progress from 'react-native-progress';


// ----------------------------------------------------------------------

export default function UserProfilePercentage(
{user,colors,fonts}
) {
  const navigation = useNavigation();
  
  const identityTypeCheckpoint = (identity) => {
    if (user?.UserIdentityDetails) {
      return user.UserIdentityDetails?.some(detail => detail.identityType === identity);
    }
    return false;
  };

  const [profilePercentage, setProfilePercentage] = useState(0);
  function profileCompletionChecker() {
    if (user?.phone) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.isMobileVerified) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.userProfileImageDetails) {
      setProfilePercentage((prev) => prev + 8);
    }
    if (user?.UserProfile && user?.UserProfile?.firstName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.dateOfBirth) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.fatherName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.motherName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.gender) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.religion) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.tehsilName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.whatsappNumber) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.politicalPartyAffiliation) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.currentJobTitle) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.highestQualification) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      identityTypeCheckpoint("AADHAAR")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      identityTypeCheckpoint("VOTER")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      identityTypeCheckpoint("PASSPORT")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.streetAddress
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.userCity
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.userState
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.postalCode
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserAddressesses && user?.UserAddressesses[0] && user?.UserAddressesses[0]?.country) {
      setProfilePercentage((prev) => prev + 4);
    } 
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.wardNo
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.addressType
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
  }

  useEffect(() => {
    profileCompletionChecker();
  }, [user]);

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
navigation.navigate('ProfileDetails');
}}
    >
      <View style={[{display:"flex",flexDirection:"row",gap:20,border:"2px solid black"}]}>
<Progress.Circle size={80} progress={profilePercentage/100} showsText={true} color={colors.primary} indeterminate={false} />

        <View style={styles.textContainer}>
          {profilePercentage === 100 ? (
            <Text style={[
                styles.sectionTitle,
                {color: colors.text, ...fonts.titleMedium},
              ]}>Profile Completed</Text>
          ) : (
            <Text style={[
                styles.sectionTitle,
                {color: colors.text, ...fonts.titleMedium},
              ]}>
              Profile
              {"\n"}
              Completion
            </Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    maxWidth: 300,
    backgroundColor: 'transparent',
    elevation: 3,
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  textContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  labelText: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.72,
  },
  completedText: {
    fontSize: 18,
    textAlign: 'center',
    opacity: 0.72,
    color: '#4caf50',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
});
