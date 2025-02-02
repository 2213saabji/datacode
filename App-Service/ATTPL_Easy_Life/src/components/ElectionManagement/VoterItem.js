import React, {useState} from 'react';
import {View, Text, TouchableOpacity, Animated, StyleSheet} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const VoterItem = ({item, onMorePress}) => {
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
      style={[styles.voterItem, {backgroundColor: colors.surface}]}>
      <TouchableOpacity onPress={toggleExpand} style={styles.voterItemContent}>
        <View style={styles.voterItemRow}>
          <VoterItemField icon="account" label="Voter Name" value={item.name} />
          <VoterItemField icon="email" label="Email" value={item.email} />
        </View>
        <Animated.View
          style={{
            maxHeight: animatedHeight.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 100],
            }),
            overflow: 'hidden',
          }}>
          <View style={styles.voterItemRow}>
            <VoterItemField icon="phone" label="Phone" value={item.phone} />
            <VoterItemField icon="calendar" label="DOB" value={item.dob} />
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

const VoterItemField = ({icon, label, value}) => {
  const {colors} = useSelector(selectTheme);
  return (
    <View style={styles.voterItemColumn}>
      <Text style={[styles.voterItemLabel, {color: colors.text}]}>{label}</Text>
      <View style={styles.iconTextContainer}>
        <MaterialCommunityIcons
          name={icon}
          size={16}
          color={colors.text}
          style={styles.icon}
        />
        <Text style={[styles.voterItemValue, {color: colors.text}]}>
          {value}
        </Text>
      </View>
    </View>
  );
};

export default VoterItem;

const styles = StyleSheet.create({
  voterItem: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    flexDirection: 'row',
  },
  voterItemContent: {
    flex: 1,
  },
  voterItemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  voterItemColumn: {
    flex: 1,
  },
  voterItemLabel: {
    color: '#666',
    fontSize: 12,
    marginBottom: 4,
  },
  voterItemValue: {
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
