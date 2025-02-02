import React, {useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import {Appbar, Card, Text} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const SurveyResponseListScreen = () => {
  // Dummy data for survey responses
  const surveyResponses = [
    {
      userName: 'Ravi Kumar',
      responseId: 36,
      surveyId: 70,
      questionId: 22,
      response: 'Hp',
    },
    // Add more dummy data here if needed
  ];

  // State to manage the search input and filtered data
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredResponses, setFilteredResponses] = useState(surveyResponses);

  // Function to handle the search input change
  const handleSearch = query => {
    setSearchQuery(query);
    if (query === '') {
      setFilteredResponses(surveyResponses);
    } else {
      const filteredData = surveyResponses.filter(item =>
        item.userName.toLowerCase().includes(query.toLowerCase()),
      );
      setFilteredResponses(filteredData);
    }
  };

  // Function to render each survey response
  const renderSurveyResponse = ({item}) => (
    <Card style={styles.card}>
      <View style={styles.cardContent}>
        <View style={styles.gridRow}>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>User Name</Text>
            <Text>{item.userName}</Text>
          </View>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Survey response ID</Text>
            <Text>{item.responseId}</Text>
          </View>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Survey ID</Text>
            <Text>{item.surveyId}</Text>
          </View>
        </View>
        <View style={styles.gridRow}>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Survey Question ID</Text>
            <Text>{item.questionId}</Text>
          </View>
          <View style={styles.gridColumn}>
            <Text style={styles.label}>Response</Text>
            <Text>{item.response}</Text>
          </View>
        </View>
      </View>
    </Card>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Appbar.Header>
        <Appbar.Content title="Survey Response List" />
      </Appbar.Header>
      <View style={styles.breadcrumb}>
        <Text style={styles.breadcrumbText}>Survey</Text>
        <Text style={styles.breadcrumbText}> • </Text>
        <Text style={styles.breadcrumbText}>List</Text>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={24} color="#999" />
        <TextInput
          placeholder="Search..."
          style={styles.searchInput}
          value={searchQuery}
          onChangeText={handleSearch}
        />
      </View>
      <FlatList
        data={filteredResponses}
        renderItem={renderSurveyResponse}
        keyExtractor={item => item.responseId.toString()}
        contentContainerStyle={styles.list}
      />
      <View style={styles.pagination}>
        <Text>Rows per page: 10</Text>
        <Text>
          1 - {filteredResponses.length} of {filteredResponses.length}
        </Text>
        <Icon name="chevron-back-outline" size={20} />
        <Icon name="chevron-forward-outline" size={20} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  breadcrumb: {
    flexDirection: 'row',
    padding: 16,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 16,
    paddingHorizontal: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  searchInput: {
    flex: 1,
    height: 40,
    marginLeft: 8,
  },
  list: {
    paddingHorizontal: 16,
  },
  card: {
    marginVertical: 8,
  },
  cardContent: {
    padding: 16,
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  gridColumn: {
    flex: 1,
    padding: 4,
  },
  label: {
    color: '#999',
    fontWeight: 'bold',
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default SurveyResponseListScreen;
