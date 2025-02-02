import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const StopFakeVotingScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Text style={styles.title}>CREATE POST</Text>
      <Text style={styles.subtitle}>• List</Text>
      <View style={styles.contentContainer}>
        <View style={styles.placeholderImage}>
          <Text style={styles.comingSoonText}>Coming Soon...</Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconSpacing: {
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 16,
    marginTop: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'gray',
    marginLeft: 16,
    marginTop: 4,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  placeholderImage: {
    width: '100%',
    aspectRatio: 1,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 18,
    color: '#888',
  },
});

export default StopFakeVotingScreen;
