import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import {selectUser} from '../../redux/selectors/UMS/authSelectors';

const SortBar = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  selfCoordinates,
  setModalVisible,
  setVisible,
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
          placeholder="Search..."
          placeholderTextColor={colors.placeholder}
          textColor={colors.text}
          activeOutlineColor={colors.primary}
          activeUnderlineColor={colors.primary}
        />
        {userRole === 'Employer' ? (
          <Button
            title="New Job Post"
            onPress={() =>
              navigation.navigate('JobCreate', {
                selfCoordinates: selfCoordinates,
              })
            }
          />
        ) : (
          <Button
            title="Upgrade Account"
            onPress={() =>
              navigation.navigate('AppScreens', {
                screen: 'EmployerUpgradeAccountForm',
              })
            }
          />
        )}
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setVisible(true)}>
          <View style={styles.sortContainer}>
            <Text
              style={[
                styles?.sortText,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              Sort By:
            </Text>
            <Text
              style={[
                styles.sortText,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              {sortOrder.charAt(0).toUpperCase() + sortOrder.slice(1)}
            </Text>
            <Icon name="down" size={14} color={colors.text} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <View style={styles.filterSection}>
            <Text
              style={[
                styles.sortText,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              Filters
            </Text>
            <Icon name="menu-fold" size={24} color={colors.text} />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SortBar;

const styles = StyleSheet.create({
  columnContainer: {
    flexDirection: 'column',
  },
  searchContainer: {
    marginBottom: 10,
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
