import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const InstitutionSortBar = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  setVisible,
  buttonName,
  screenName,
  navigation,
}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const user = useSelector(selectUser);
  const userRole = user?.userRoleType;

  return (
    <View style={styles.columnContainer}>
      <View style={styles.searchContainer}>
        <TextInput
          style={[
            styles.searchInput,
            {
              ...fonts.bodySmall,
              backgroundColor: colors.surface,
            },
          ]}
          left={<TextInput.Icon icon="magnify" size={24} color={colors.text} />}
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search ..."
          placeholderTextColor={colors.placeholder}
          textColor={colors.text}
          activeOutlineColor={colors.primary}
          activeUnderlineColor={colors.primary}
        />
        {userRole === 'Institution Owner' ? (
          <Button
            title={`Add ${buttonName}`}
            onPress={() => navigation.navigate(screenName)}
          />
        ) : (
          <Button
            title={`Upgrade Account`}
            onPress={() =>
              navigation.navigate('AppScreens', {
                screen: 'InstitutionOwnerUpgradeAccountForm',
              })
            }
          />
        )}
      </View>
    </View>
  );
};

export default InstitutionSortBar;

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  searchContainer: {
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  searchInput: {
    width: '50%',
    height: 40,
  },
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    marginVertical: 8,
  },
  filterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  sortText: {
    fontSize: 14,
    marginRight: 5,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
