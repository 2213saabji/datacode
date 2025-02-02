import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import StatItem from '../../components/ElectionManagement/StatItem';
import ActionButton from '../../components/ElectionManagement/ActionButton';
import WardItem from '../../components/ElectionManagement/WardItem';
import BoothItem from '../../components/ElectionManagement/BoothItem';
import PollItem from '../../components/ElectionManagement/PollItem';
import VoterItem from '../../components/ElectionManagement/VoterItem';
import {LinearGradient} from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';

const {width} = Dimensions.get('window');

const WardListScreen = ({route}) => {
  const {colors, fonts} = useSelector(selectTheme);
  const [searchQuery, setSearchQuery] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedItemType, setSelectedItemType] = useState(
    route.params.screenName,
  );
  const statListRef = useRef(null);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(slideAnim, {
        toValue: 0,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const scrollToSelectedItem = index => {
    if (statListRef.current) {
      statListRef.current.scrollToIndex({
        index,
        animated: true,
        viewPosition: 0,
      });
    }
  };

  const setSelectedItemTypeAndScroll = itemType => {
    setSelectedItemType(itemType);
    const index = statItems.findIndex(item => item.title === itemType);
    if (index !== -1) {
      scrollToSelectedItem(index);
    }
  };

  useEffect(() => {
    const initialIndex = statItems.findIndex(
      item => item.title === selectedItemType,
    );
    if (initialIndex !== -1) {
      setTimeout(() => scrollToSelectedItem(initialIndex), 100);
    }
  }, []);

  // Placeholder function implementations
  const onWardMorePress = item => {
    console.log('More pressed for item:', item);
    // Implement your logic here
  };

  const onNewWard = () => {
    console.log('New Ward button pressed');
    // Implement your logic here
  };

  const onColumnChange = () => {
    console.log('Column change button pressed');
    // Implement your logic here
  };

  const onFilterChange = () => {
    console.log('Filter change button pressed');
    // Implement your logic here
  };

  const onExport = () => {
    console.log('Export button pressed');
    // Implement your logic here
  };

  const handleRowsPerPageChange = num => {
    setRowsPerPage(num);
    console.log(`Rows per page changed to: ${num}`);
  };

  const data = {
    'Total Wards': [
      {
        id: '1',
        name: 'Jaipur',
        capacity: 4000,
        address: 'Greater Noida',
        city: 'Delhi',
        state: 'Bihar',
      },
      {
        id: '2',
        name: 'Jaipur',
        capacity: 4000,
        address: 'Greater Noida',
        city: 'Delhi',
        state: 'Bihar',
      },
    ],
    'Total Booths': [
      {
        id: '1',
        name: 'Booth 1',
        dimensions: '10x10',
        capacity: 100,
        state: 'Delhi',
        city: 'Delhi',
      },
      {
        id: '2',
        name: 'Booth 2',
        dimensions: '12x12',
        capacity: 150,
        state: 'Delhi',
        city: 'Delhi',
      },
    ],
    'Total Polls': [
      {id: '1', name: 'Poll 1', capacity: 500, numberOfBooths: 5},
      {id: '2', name: 'Poll 2', capacity: 300, numberOfBooths: 3},
    ],
    'Total Voters': [
      {
        id: '1',
        name: 'John Doe',
        phone: '9876543210',
        upiId: 'john.doe@upi',
        email: 'john.doe@example.com',
      },
      {
        id: '2',
        name: 'Jane Smith',
        phone: '9876543211',
        upiId: 'jane.smith@upi',
        email: 'jane.smith@example.com',
      },
    ],
  };

  const filterWardData = () => data[selectedItemType] || data['Total Wards'];

  const getTitleAndSubtitle = () => {
    switch (selectedItemType) {
      case 'Total Wards':
        return {title: 'Ward List', subtitle: 'List . wards'};
      case 'Total Booths':
        return {title: 'Booth List', subtitle: 'List . booths'};
      case 'Total Polls':
        return {title: 'Poll List', subtitle: 'List . polls'};
      case 'Total Voters':
        return {title: 'Voter List', subtitle: 'List . voters'};
      default:
        return {title: 'Data List', subtitle: 'List . data'};
    }
  };

  const getStatItems = () => [
    {
      id: '1',
      icon: 'document-text',
      title: 'Total Wards',
      value: '1 Wards',
      backgroundColor: colors.surface,
      iconColor:
        selectedItemType === 'Total Wards' ? colors.primary : colors.accent,
      valueColor:
        selectedItemType === 'Total Wards' ? colors.primary : colors.accent,
    },
    {
      id: '2',
      icon: 'analytics',
      title: 'Total Booths',
      value: '1 Wards',
      backgroundColor: colors.surface,
      iconColor:
        selectedItemType === 'Total Booths' ? colors.primary : colors.accent,
      valueColor:
        selectedItemType === 'Total Booths' ? colors.primary : colors.accent,
    },
    {
      id: '3',
      icon: 'analytics',
      title: 'Total Polls',
      value: '5 Polls',
      backgroundColor: colors.surface,
      iconColor:
        selectedItemType === 'Total Polls' ? colors.primary : colors.accent,
      valueColor:
        selectedItemType === 'Total Polls' ? colors.primary : colors.accent,
    },
    {
      id: '4',
      icon: 'people',
      title: 'Total Voters',
      value: '100 Voters',
      backgroundColor: colors.surface,
      iconColor:
        selectedItemType === 'Total Voters' ? colors.primary : colors.accent,
      valueColor:
        selectedItemType === 'Total Voters' ? colors.primary : colors.accent,
    },
  ];

  const renderItem = ({item}) => {
    switch (selectedItemType) {
      case 'Total Wards':
        return (
          <WardItem item={item} onMorePress={() => onWardMorePress(item)} />
        );
      case 'Total Booths':
        return (
          <BoothItem item={item} onMorePress={() => onWardMorePress(item)} />
        );
      case 'Total Polls':
        return (
          <PollItem item={item} onMorePress={() => onWardMorePress(item)} />
        );
      case 'Total Voters':
        return (
          <VoterItem item={item} onMorePress={() => onWardMorePress(item)} />
        );
      default:
        return null;
    }
  };

  const {title, subtitle} = getTitleAndSubtitle();
  const statItems = getStatItems();
  const filteredWardData = filterWardData();

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}>
      <Animated.View
        style={{opacity: fadeAnim, transform: [{translateY: slideAnim}]}}>
        <Text style={[styles.title, {color: colors.text, ...fonts.heading}]}>
          {title}
        </Text>
        <Text
          style={[styles.subtitle, {color: colors.text, ...fonts.bodyMedium}]}>
          {subtitle}
        </Text>
      </Animated.View>

      <View style={styles.newWardButtonContainer}>
        <TouchableOpacity
          onPress={onNewWard}
          style={[styles.newWardButton, {backgroundColor: colors.primary}]}>
          <Text style={styles.newWardButtonText}>+ New Ward</Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          ref={statListRef}
          data={statItems}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={item => item.id}
          renderItem={({item, index}) => (
            <Animated.View
              style={{
                opacity: fadeAnim,
                transform: [
                  {
                    translateX: slideAnim.interpolate({
                      inputRange: [0, 1],
                      outputRange: [0, 50 * (index + 1)],
                    }),
                  },
                ],
              }}>
              <StatItem
                {...item}
                onPress={() => setSelectedItemTypeAndScroll(item.title)}
              />
            </Animated.View>
          )}
          contentContainerStyle={styles.statItemsContainer}
          getItemLayout={(data, index) => ({
            length: 120,
            offset: 120 * index,
            index,
          })}
        />
      </View>

      <View style={styles.actionsContainer}>
        <ActionButton
          title="Column"
          onPress={onColumnChange}
          icon="add-outline"
        />
        <ActionButton
          title="Filter"
          onPress={onFilterChange}
          icon="filter-outline"
        />
        <ActionButton
          title="Export"
          onPress={onExport}
          icon="cloud-download-outline"
        />
      </View>

      <FlatList
        data={filteredWardData}
        keyExtractor={item => item.id}
        renderItem={({item, index}) => (
          <Animated.View
            style={{
              opacity: fadeAnim,
              transform: [
                {
                  translateY: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 50 * (index + 1)],
                  }),
                },
              ],
            }}>
            {renderItem({item})}
          </Animated.View>
        )}
        style={styles.listContainer}
        ListEmptyComponent={() => (
          <View style={styles.emptyStateContainer}>
            <LottieView
              source={require('../../assets/no_data.json')}
              autoPlay
              loop
              style={styles.emptyStateAnimation}
            />
            <Text style={[styles.emptyStateText, {color: colors.text}]}>
              No data available
            </Text>
          </View>
        )}
      />

      <Animated.View
        style={[
          styles.paginationContainer,
          {
            opacity: fadeAnim,
            transform: [{translateY: slideAnim}],
          },
        ]}>
        <Text style={[styles.paginationText, {color: colors.text}]}>
          Rows per page:
        </Text>
        {[10, 20, 30].map(num => (
          <TouchableOpacity
            key={num}
            onPress={() => handleRowsPerPageChange(num)}
            style={styles.paginationButton}>
            <Text
              style={[
                styles.paginationButtonText,
                {color: rowsPerPage === num ? colors.primary : colors.text},
              ]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </Animated.View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 16,
    opacity: 0.7,
  },
  newWardButtonContainer: {
    alignItems: 'flex-end',
    marginBottom: 16,
  },
  newWardButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    elevation: 3,
  },
  newWardButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  statItemsContainer: {
    paddingVertical: 8,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContainer: {
    flex: 1,
  },
  emptyStateContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyStateAnimation: {
    width: 200,
    height: 200,
  },
  emptyStateText: {
    fontSize: 18,
    marginTop: 16,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 16,
  },
  paginationText: {
    marginRight: 8,
  },
  paginationButton: {
    marginHorizontal: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  paginationButtonText: {
    fontSize: 14,
  },
});

export default WardListScreen;
