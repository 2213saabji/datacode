import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import DateTimePicker from '@react-native-community/datetimepicker';

const SurveyCreationScreen = () => {
  const [surveyName, setSurveyName] = useState('');
  const [surveyTitle, setSurveyTitle] = useState('');
  const [surveyDescription, setSurveyDescription] = useState('');
  const [selectedUsers, setSelectedUsers] = useState('');
  const [duration, setDuration] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [surveyStatus, setSurveyStatus] = useState('open');
  const [questions, setQuestions] = useState([]);

  const handleCreateSurvey = () => {
    // Implement survey creation logic here
    console.log('Survey created:', {
      name: surveyName,
      title: surveyTitle,
      description: surveyDescription,
      users: selectedUsers,
      duration,
      status: surveyStatus,
      questions,
    });
  };

  const handleAddQuestion = () => {
    // Implement add question logic here
    console.log('Add question clicked');
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>CREATE A NEW SURVEY</Text>
      <Text style={styles.breadcrumb}>Dashboard • Survey • New survey</Text>

      <Text style={styles.label}>Survey Unique Name</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. Customer Satisfaction survey..."
        value={surveyName}
        onChangeText={setSurveyName}
      />

      <Text style={styles.label}>Survey Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Ex. Product feedback survey..."
        value={surveyTitle}
        onChangeText={setSurveyTitle}
      />

      <Text style={styles.label}>Survey Description</Text>
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Ex. Survey description"
        multiline
        numberOfLines={4}
        value={surveyDescription}
        onChangeText={setSurveyDescription}
      />

      <Text style={styles.label}>Select Users...</Text>
      <Picker
        selectedValue={selectedUsers}
        onValueChange={itemValue => setSelectedUsers(itemValue)}
        style={styles.picker}>
        <Picker.Item label="Select Users..." value="" />
        <Picker.Item label="All Users" value="all" />
        {/* Add more user options here */}
      </Picker>

      <TouchableOpacity style={styles.selectAllButton}>
        <Text style={styles.selectAllButtonText}>Select All Users</Text>
      </TouchableOpacity>

      <Text style={styles.label}>Set duration</Text>
      <TouchableOpacity
        style={styles.durationButton}
        onPress={() => setShowDatePicker(true)}>
        <Text style={styles.durationButtonText}>Add Duration</Text>
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={duration}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) {
              setDuration(selectedDate);
            }
          }}
        />
      )}

      <Text style={styles.label}>Survey Status</Text>
      <View style={styles.statusContainer}>
        <TouchableOpacity
          style={[
            styles.statusButton,
            surveyStatus === 'open' && styles.statusButtonActive,
          ]}
          onPress={() => setSurveyStatus('open')}>
          <Text style={styles.statusButtonText}>Open</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusButton,
            surveyStatus === 'closed' && styles.statusButtonActive,
          ]}
          onPress={() => setSurveyStatus('closed')}>
          <Text style={styles.statusButtonText}>Closed</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.label}>Survey Questions</Text>
      {questions.length === 0 ? (
        <Text style={styles.noQuestionsText}>No question added yet !!</Text>
      ) : // Render questions here
      null}

      <TouchableOpacity
        style={styles.addQuestionButton}
        onPress={handleAddQuestion}>
        <Text style={styles.addQuestionButtonText}>+ add question</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.createButton}
        onPress={handleCreateSurvey}>
        <Text style={styles.createButtonText}>Create Survey</Text>
      </TouchableOpacity>
    </ScrollView>
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
    marginBottom: 10,
  },
  breadcrumb: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  selectAllButton: {
    backgroundColor: '#FFD700',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  selectAllButtonText: {
    fontWeight: 'bold',
  },
  durationButton: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  durationButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  statusButton: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
  },
  statusButtonActive: {
    backgroundColor: '#FFD700',
  },
  statusButtonText: {
    fontWeight: 'bold',
  },
  noQuestionsText: {
    fontStyle: 'italic',
    color: '#666',
    marginBottom: 10,
  },
  addQuestionButton: {
    backgroundColor: '#2c3e50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 10,
  },
  addQuestionButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  createButton: {
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  createButtonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export default SurveyCreationScreen;
