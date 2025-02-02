import React from 'react';
import {View} from 'react-native';
import {TextInput} from 'react-native-paper';

const InputField = ({label, value, onChangeText, colors, fonts,keyboardType}) => (
  <View style={styles.inputContainer}>
    <TextInput
      mode="outlined"
      label={label}
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      style={[
        styles.input,
        {backgroundColor: colors.surface, ...fonts.bodyMedium},
      ]}
      theme={{
        colors: {
          primary: colors.primary,
          placeholder: colors.placeholder,
          text: colors.text,
        },
      }}
    />
  </View>
);

const styles = {
  inputContainer: {
    marginBottom: 16,
    
  },
  input: {
    fontSize: 16,
    
  },
};

export default InputField;
