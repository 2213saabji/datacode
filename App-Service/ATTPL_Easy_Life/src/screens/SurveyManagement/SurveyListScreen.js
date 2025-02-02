import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
  SafeAreaView,
} from 'react-native';

const SurveyListScreen = ({navigation}) => {
  const [filter, setFilter] = useState('All');
  const [surveys, setSurveys] = useState([
    {
      id: '1',
      title: 'Customer Satisfaction',
      status: 'Open',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
    {
      id: '2',
      title: 'Product Feedback',
      status: 'Closed',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
    {
      id: '3',
      title: 'Employee Engagement',
      status: 'Open',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
    {
      id: '4',
      title: 'Market Research',
      status: 'Closed',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
    {
      id: '5',
      title: 'User Experience',
      status: 'Open',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
    {
      id: '6',
      title: 'Brand Awareness',
      status: 'Closed',
      postedDate: '24 jun 2024',
      expiryDate: '27 jul 2024',
    },
  ]);

  const filteredSurveys = surveys.filter(survey => {
    if (filter === 'All') return true;
    return survey.status === filter;
  });

  const toggleSurveyStatus = id => {
    setSurveys(
      surveys.map(survey =>
        survey.id === id
          ? {...survey, status: survey.status === 'Open' ? 'Closed' : 'Open'}
          : survey,
      ),
    );
  };

  const renderSurveyItem = ({item}) => (
    <View style={styles.surveyItem}>
      <View
        style={[
          styles.statusBadge,
          {backgroundColor: item.status === 'Open' ? '#e6ffe6' : '#ffcccb'},
        ]}>
        <Text
          style={[
            styles.statusText,
            {color: item.status === 'Open' ? 'green' : 'red'},
          ]}>
          {item.status}
        </Text>
      </View>
      <Text style={styles.surveyTitle}>{item.title}</Text>
      <Text style={styles.surveyDates}>Posted: {item.postedDate}</Text>
      <Text style={styles.surveyDates}>Expiry: {item.expiryDate}</Text>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={item.status === 'Open' ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={() => toggleSurveyStatus(item.id)}
        value={item.status === 'Open'}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>SURVEY LIST</Text>
      <Text style={styles.breadcrumb}>Dashboard • Survey • Survey List</Text>

      <View style={styles.topBar}>
        <TouchableOpacity
          style={styles.newSurveyButton}
          onPress={() => navigation.navigate('CreateSurvey')}>
          <Text style={styles.newSurveyButtonText}>+ New Survey</Text>
        </TouchableOpacity>
        <View style={styles.filterContainer}>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'All' && styles.activeFilter,
            ]}
            onPress={() => setFilter('All')}>
            <Text style={styles.filterText}>All</Text>
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>{surveys.length}</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'Open' && styles.activeFilter,
            ]}
            onPress={() => setFilter('Open')}>
            <Text style={styles.filterText}>Open</Text>
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {surveys.filter(s => s.status === 'Open').length}
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.filterButton,
              filter === 'Closed' && styles.activeFilter,
            ]}
            onPress={() => setFilter('Closed')}>
            <Text style={styles.filterText}>Closed</Text>
            <View style={styles.filterBadge}>
              <Text style={styles.filterBadgeText}>
                {surveys.filter(s => s.status === 'Closed').length}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={filteredSurveys}
        renderItem={renderSurveyItem}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  breadcrumb: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  topBar: {
    // flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  filterContainer: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    overflow: 'hidden',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  activeFilter: {
    backgroundColor: '#FFD700',
  },
  filterText: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  filterBadge: {
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  filterBadgeText: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  newSurveyButton: {
    backgroundColor: '#2c3e50',
    alignSelf: 'flex-end',
    paddingVertical: 10,
    marginBottom: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  newSurveyButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  row: {
    justifyContent: 'space-between',
  },
  surveyItem: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    width: '48%',
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  statusText: {
    fontWeight: 'bold',
  },
  surveyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  surveyDates: {
    fontSize: 12,
    color: '#666',
    marginBottom: 5,
  },
});

export default SurveyListScreen;
