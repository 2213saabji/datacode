import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const PollItem = ({item, onMorePress}) => {
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
    <Animated.View style={[styles.pollItem, {backgroundColor: colors.surface}]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.pollItemContent}>
        <View style={styles.pollItemRow}>
          <PollItemField icon="vote" label="Poll Name" value={item.name} />
          <PollItemField icon="calendar" label="Date" value={item.date} />
        </View>
        <Animated.View
          style={{
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
            overflow: 'hidden',
          }}>
          <View style={styles.pollItemRow}>
            <PollItemField icon="clock" label="Time" value={item.time} />
            <PollItemField icon="map" label="Location" value={item.location} />
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

const PollItemField = ({icon, label, value}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={styles.pollItemColumn}>
      <Text style={[styles.pollItemLabel, {color: colors.text}]}>{label}</Text>
      <View style={styles.iconTextContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={[styles.pollItemValue, {color: colors.text}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default PollItem;

const styles = StyleSheet.create({
  pollItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  pollItemContent: {
    flex: 1,
  },
  pollItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pollItemColumn: {
    flex: 1,
  },
  pollItemLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  pollItemValue: {
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
