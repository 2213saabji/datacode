import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Animated,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const WardItem = ({item, onMorePress}) => {
  const {colors} = useSelector(selectTheme);
  const [expanded, setExpanded] = useState(false);
  const animatedHeight = new Animated.Value(expanded ? 1 : 0);

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: expanded ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
    setExpanded(!expanded);
  };

  return (
    <Animated.View style={[styles.wardItem, {backgroundColor: colors.surface}]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.wardItemContent}>
        <View style={styles.wardItemRow}>
          <WardItemField icon="home-city" label="Ward Name" value={item.name} />
          <WardItemField
            icon="account-group"
            label="Capacity"
            value={item.capacity}
          />
          <WardItemField
            icon="map-marker"
            label="Address"
            value={item.address}
          />
        </View>
        <Animated.View
          style={{
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
            overflow: 'hidden',
          }}>
          <View style={styles.wardItemRow}>
            <WardItemField icon="city" label="City" value={item.city} />
            <WardItemField icon="flag" label="State" value={item.state} />
          </View>
        </Animated.View>
      </TouchableOpacity>
      <TouchableOpacity style={styles.moreButton} onPress={onMorePress}>
        <MaterialCommunityIcons
          name="dots-vertical"
          size={24}
          color={colors.primary}
        />
      </TouchableOpacity>
    </Animated.View>
  );
};

const WardItemField = ({icon, label, value}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={styles.wardItemColumn}>
      <Text style={[styles.wardItemLabel, {color: colors.text}]}>{label}</Text>
      <View style={styles.iconTextContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={[styles.wardItemValue, {color: colors.text}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default WardItem;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerRight: {
    flexDirection: 'row',
  },
  iconButton: {
    marginLeft: 16,
  },
  menuIcon: {
    fontSize: 24,
  },
  wardItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  wardItemContent: {
    flex: 1,
  },
  wardItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  wardItemColumn: {
    flex: 1,
  },
  wardItemLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  wardItemValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  moreButton: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  newWardButton: {
    padding: 10,
    borderRadius: 4,
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  newWardButtonText: {
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtonText: {
    marginLeft: 4,
    fontSize: 16,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  wardItem: {
    padding: 16,
    borderRadius: 4,
    marginBottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2, // Adding shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  },
  wardItemContent: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  wardItemField: {
    flex: 1,
    margin: 4,
    minWidth: '48%',
  },
  wardItemLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  wardItemValue: {
    fontSize: 14,
  },
  moreButton: {
    marginLeft: 8,
  },
  wardItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  wardItemContent: {
    flex: 1,
  },
  wardItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  wardItemColumn: {
    flex: 1,
  },
  wardItemLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  wardItemValue: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  moreButton: {
    justifyContent: 'center',
    marginLeft: 16,
  },
  iconTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 4,
  },
});
