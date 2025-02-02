import React, { useEffect, useState } from 'react';
import { View, Modal, Button } from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const DatePickerInput = ({ label, value, onChangeText, colors, fonts }) => {
  const [open, setOpen] = useState(false);

  const formatDateToString = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        mode="outlined"
        label={label}
        value={value}
        style={[
          styles.input,
          { backgroundColor: colors.surface, ...fonts.bodyMedium },
        ]}
        textColor={colors.text}
        theme={{
          colors: {
            primary: colors.primary,
            placeholder: colors.placeholder,
            text: colors.text,
          },
        }}
        onPress={() => { setOpen(true) }}
        right={
          <TextInput.Affix
            text={<Ionicons name="calendar-clear-outline" size={24} color={colors.primary} onPress={() => { setOpen(true) }} />}
          />
        }
      />
      <DatePicker
        modal
        open={open}
        mode='date'
        date={value ? new Date(value) : new Date()}
        onConfirm={(date) => {
          setOpen(false)
          onChangeText(formatDateToString(date))
        }}
        onCancel={() => {
          setOpen(false)
        }}
      />

    </View>
  )
};

const styles = {
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
  },
};

export default DatePickerInput;
