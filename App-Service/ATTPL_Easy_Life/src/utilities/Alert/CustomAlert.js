import React, {useRef, useEffect} from 'react';
import {View, Text, StyleSheet, Animated, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const CustomAlert = ({message, type = 'info', onClose, onConfirm}) => {
  const translateY = useRef(new Animated.Value(-100)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    if (type !== 'confirm') {
      const timer = setTimeout(() => {
        hideAlert();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const hideAlert = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => onClose());
  };

  const getAlertStyle = () => {
    switch (type) {
      case 'success':
        return {backgroundColor: '#4CAF50', icon: 'check-circle'};
      case 'error':
        return {backgroundColor: '#F44336', icon: 'alert-circle'};
      case 'warning':
        return {backgroundColor: '#FFC107', icon: 'alert'};
      case 'confirm':
        return {backgroundColor: '#9C27B0', icon: 'help-circle'};
      default:
        return {backgroundColor: '#2196F3', icon: 'information'};
    }
  };

  const {backgroundColor, icon} = getAlertStyle();

  return (
    <Animated.View
      style={[
        styles.container,
        {backgroundColor, transform: [{translateY}], opacity},
      ]}>
      <View style={styles.content}>
        <Icon name={icon} size={24} color="white" style={styles.icon} />
        <Text style={styles.message}>{message}</Text>
      </View>
      {type === 'confirm' ? (
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => {
              onConfirm();
              onClose();
            }}
            style={styles.confirmButton}>
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={hideAlert} style={styles.cancelButton}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <TouchableOpacity onPress={hideAlert} style={styles.closeButton}>
          <Icon name="close" size={20} color="white" />
        </TouchableOpacity>
      )}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: 8,
  },
  message: {
    color: 'white',
    fontSize: 16,
    flex: 1,
  },
  closeButton: {
    padding: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  confirmButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    padding: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  cancelButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomAlert;
