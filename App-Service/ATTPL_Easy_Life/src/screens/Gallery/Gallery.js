import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useTheme} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const {width} = Dimensions.get('window');

const GalleryScreen = () => {
  const {colors} = useSelector(selectTheme);
  const [selectedTab, setSelectedTab] = useState('Photo');
  const slideAnim = useRef(new Animated.Value(0)).current;

  const handleTabPress = tab => {
    setSelectedTab(tab);
    Animated.spring(slideAnim, {
      toValue: tab === 'Photo' ? 0 : tab === 'Video' ? 1 : 2,
      useNativeDriver: true,
    }).start();
  };

  const renderGalleryContent = () => {
    switch (selectedTab) {
      case 'Photo':
        return (
          <ScrollView contentContainerStyle={styles.photoGrid}>
            {[...Array(12)].map((_, index) => (
              <View
                key={index}
                style={[styles.photoItem, {backgroundColor: colors.primary}]}
              />
            ))}
          </ScrollView>
        );
      case 'Video':
        return (
          <View style={styles.centeredContent}>
            <Icon name="videocam" size={80} color={colors.primary} />
            <Text style={[styles.contentText, {color: colors.text}]}>
              No videos available
            </Text>
          </View>
        );
      case 'Pdf':
        return (
          <View style={styles.centeredContent}>
            <Icon name="picture-as-pdf" size={80} color={colors.primary} />
            <Text style={[styles.contentText, {color: colors.text}]}>
              No PDFs available
            </Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <LinearGradient
      colors={[colors.background, colors.surface]}
      style={styles.container}>
      <Text style={[styles.headerText, {color: colors.primary}]}>GALLERY</Text>
      <View style={styles.subHeaderContainer}>
        <Text style={[styles.subHeaderText, {color: colors.text}]}>
          GALLERY
        </Text>
        <Text style={[styles.dot, {color: colors.placeholder}]}> • </Text>
        <Text style={[styles.subphototext, {color: colors.placeholder}]}>
          PHOTO
        </Text>
      </View>
      <View style={styles.tabContainer}>
        {['Photo', 'Video', 'Pdf'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={styles.tab}
            onPress={() => handleTabPress(tab)}>
            <View style={styles.tabContent}>
              <Text
                style={[
                  styles.tabText,
                  selectedTab === tab && styles.selectedTabText,
                  {
                    color:
                      selectedTab === tab ? colors.primary : colors.placeholder,
                  },
                ]}>
                {tab}
              </Text>
              <Icon
                name={
                  tab === 'Photo'
                    ? 'photo'
                    : tab === 'Video'
                    ? 'videocam'
                    : 'picture-as-pdf'
                }
                size={20}
                color={
                  selectedTab === tab ? colors.primary : colors.placeholder
                }
              />
            </View>
          </TouchableOpacity>
        ))}
        <Animated.View
          style={[
            styles.slider,
            {
              backgroundColor: colors.primary,
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1, 2],
                    outputRange: [0, width / 3, (width / 3) * 2],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
      <View style={styles.content}>{renderGalleryContent()}</View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    position: 'relative',
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  slider: {
    position: 'absolute',
    bottom: 0,
    width: width / 3,
    height: 3,
  },
  tabText: {
    marginRight: 5,
  },
  selectedTabText: {
    fontWeight: 'bold',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 8,
    lineHeight: 24,
  },
  subHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  subHeaderText: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  subphototext: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 20,
  },
  dot: {
    fontSize: 18,
  },
  content: {
    flex: 1,
  },
  contentText: {
    fontSize: 16,
    fontWeight: '500',
    lineHeight: 20,
    marginTop: 16,
  },
  photoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  photoItem: {
    width: width / 3 - 20,
    height: width / 3 - 20,
    marginBottom: 10,
    borderRadius: 8,
  },
  centeredContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GalleryScreen;
