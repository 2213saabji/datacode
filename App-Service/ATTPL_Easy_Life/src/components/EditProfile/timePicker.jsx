import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput } from 'react-native-paper';
import DatePicker from 'react-native-date-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

const TimePickerInput = ({ label, value, onChangeText, colors, fonts }) => {
  const [open, setOpen] = useState(false);

  const formatTimeToString = (date) => {
    const hours = String(date.getHours()).padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${hours%12}:${minutes} ${ampm}`;
  };
  const formatStringToTime = (val) => {
    const timeOnly = val.slice(0, 5);
    const ampm = val.slice(-2);
    let [hours, minutes] = timeOnly.split(':').map(Number);
    if (ampm === "PM" && hours !== 12) {
      hours += 12;
    } else if (ampm === "AM" && hours === 12) {
      hours = 0;
    }
    const timeString = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
    const time = new Date(`1970-01-01T${timeString}:00`);
    return time;
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
            text={<Ionicons name="time-outline" size={24} color={colors.primary} onPress={() => { setOpen(true) }} />}
          />
        }
      />
      <DatePicker
        modal
        open={open}
        mode='time'
        date={value ? formatStringToTime(value) : new Date()}
        onConfirm={(date) => {
          setOpen(false);
          onChangeText(formatTimeToString(date));
        }}
        onCancel={() => {
          setOpen(false);
        }}
      />
    </View>
  );
};

const styles = {
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    fontSize: 16,
  },
};

export default TimePickerInput;
