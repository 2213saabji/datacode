import React, { useRef, useState } from 'react';
import { View, Text, Modal, TextInput, Button, StyleSheet, Alert, TouchableOpacity } from 'react-native';

const OtpModal = ({ open, onClose, onSubmit, otpRef }) => {
    console.log("otpmodal", otpRef )
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  const handleChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < 5) {
        inputRefs[index + 1].current.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.nativeEvent.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current.focus();
    }
  };

  const handleSubmit = () => {
    const otpString = otp.join('');
    if (otpString.length === 6) {
      onSubmit(otpString);
    } else {
      Alert.alert('Error', 'Please enter a valid OTP');
    }
  };

  return (
    <Modal
      transparent
      visible={open}
      onRequestClose={onClose}
      animationType="slide"
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>Enter OTP To Start Trip</Text>
          <Text style={styles.otpRef}>Ref For OTP: {otpRef}</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={inputRefs[index]}
                value={digit}
                onChangeText={(value) => handleChange(index, value)}
                onKeyPress={(e) => handleKeyDown(index, e)}
                keyboardType="numeric"
                maxLength={1}
                style={styles.otpInput}
              />
            ))}
          </View>
          <TouchableOpacity
            style={[styles.button, otp.join('').length === 6 && styles.buttonActive]}
            onPress={handleSubmit}
            disabled={otp.join('').length !== 6}
          >
            <Text style={styles.buttonText}>Start Trip</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 300,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  otpRef: {
    fontSize: 14,
    color: 'rgba(0, 0, 0, 0.6)',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    width: 40,
    height: 40,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    width: '100%',
    padding: 10,
    backgroundColor: '#007BFF',
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonActive: {
    backgroundColor: '#0056b3',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
  },
  closeButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});

export default OtpModal;
