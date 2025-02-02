import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const BoothItem = ({item, onMorePress}) => {
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
    <Animated.View
      style={[styles.boothItem, {backgroundColor: colors.surface}]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.boothItemContent}>
        <View style={styles.boothItemRow}>
          <BoothItemField
            icon="map-marker"
            label="Booth Name"
            value={item.name}
          />
          <BoothItemField icon="calendar" label="Date" value={item.date} />
        </View>
        <Animated.View
          style={{
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
            overflow: 'hidden',
          }}>
          <View style={styles.boothItemRow}>
            <BoothItemField icon="clock" label="Time" value={item.time} />
            <BoothItemField icon="map" label="Location" value={item.location} />
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

const BoothItemField = ({icon, label, value}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={styles.boothItemColumn}>
      <Text style={[styles.boothItemLabel, {color: colors.text}]}>{label}</Text>
      <View style={styles.iconTextContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={[styles.boothItemValue, {color: colors.text}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default BoothItem;

const styles = StyleSheet.create({
  boothItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  boothItemContent: {
    flex: 1,
  },
  boothItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  boothItemColumn: {
    flex: 1,
  },
  boothItemLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  boothItemValue: {
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
