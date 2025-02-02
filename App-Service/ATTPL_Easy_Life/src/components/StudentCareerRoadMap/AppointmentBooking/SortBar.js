import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Button} from 'react-native';
import {TextInput} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/AntDesign';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../../redux/selectors';

const SortBar = ({
  searchQuery,
  setSearchQuery,
  sortOrder,
  filterType,
  setVisibleSort,
  setVisibleFilter,
  navigation,
}) => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={styles.columnContainer}>
      <View style={styles.filterContainer}>
        <TouchableOpacity onPress={() => setVisibleSort(true)}>
          <View style={styles.sortContainer}>
            <Text
              style={[
                styles.sortText,
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

        <TouchableOpacity onPress={() => setVisibleFilter(true)}>
          <View style={styles.sortContainer}>
            <Text
              style={[
                styles.sortText,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              Filter By Type:
            </Text>
            <Text
              style={[
                styles.sortText,
                {color: colors.text, ...fonts.bodySmall},
              ]}>
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </Text>
            <Icon name="down" size={14} color={colors.text} />
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
