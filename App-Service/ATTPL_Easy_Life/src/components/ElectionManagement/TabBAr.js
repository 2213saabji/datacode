import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import Animated from 'react-native-reanimated'; // Import Animated

// Define StatItem as a separate component
const StatItem = ({
  icon,
  title,
  value,
  backgroundColor,
  iconColor,
  valueColor,
}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <Animated.View style={[styles.statItem, {backgroundColor}]}>
      <View style={[styles.statIcon, {backgroundColor: colors.primaryLight}]}>
        <Icon name={icon} size={20} color={iconColor} />
      </View>
      <View>
        <Text style={[styles.statTitle, {color: colors.text}]}>{title}</Text>
        <Text style={[styles.statValue, {color: valueColor}]}>{value}</Text>
      </View>
    </Animated.View>
  );
};

const TabBar = ({tabs, activeTab, onTabPress}) => {
  const {colors} = useSelector(selectTheme);

  return (
    <FlatList
      data={tabs}
      horizontal
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.title}
      renderItem={({item}) => (
        <TouchableOpacity
          style={[
            styles.tab,
            {
              backgroundColor:
                activeTab === item.title ? colors.primary : colors.surface,
            },
          ]}
          onPress={() => onTabPress(item.title)}>
          <StatItem
            icon={item.icon}
            title={item.title}
            value={item.value}
            backgroundColor={
              activeTab === item.title ? colors.primary : colors.surface
            }
            iconColor={activeTab === item.title ? colors.surface : colors.text}
            valueColor={activeTab === item.title ? colors.surface : colors.text}
          />
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginRight: 10,
    borderRadius: 8,
  },
  tabText: {
    marginLeft: 8,
    fontSize: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  statTitle: {
    fontSize: 14,
  },
  statValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default TabBar;
