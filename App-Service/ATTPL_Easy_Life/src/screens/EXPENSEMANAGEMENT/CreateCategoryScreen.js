import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const CreateCategoryScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Header Title */}
      <Text style={styles.title}>CREATE A NEW CATEGORY</Text>

      {/* Breadcrumb Navigation */}
      <View style={styles.breadcrumbContainer}>
        <Text style={styles.breadcrumbText}>Category management</Text>
        <Text style={styles.breadcrumbSeparator}> • </Text>
        <Text style={styles.breadcrumbText}>New category</Text>
      </View>

      {/* Category Name Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Category name</Text>
        <TextInput
          placeholder="Ex. Customer Satisfaction survey..."
          style={styles.input}
        />
      </View>

      {/* Create Category Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Create Category</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  breadcrumbContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  breadcrumbText: {
    fontSize: 14,
    color: '#999',
  },
  breadcrumbSeparator: {
    fontSize: 14,
    color: '#999',
    marginHorizontal: 4,
  },
  inputContainer: {
    marginBottom: 32,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f9f9f9',
  },
  button: {
    height: 48,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateCategoryScreen;
