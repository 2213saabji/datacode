import React from 'react';
import {
  TouchableOpacity,
  Text,
  Image,
  StyleSheet,
  View,
  Animated,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ContactItem = ({contact, toggleSelectedContact, isSelected}) => {
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleValue, {
      toValue: 0.95,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleValue, {
      toValue: 1,
      friction: 3,
      tension: 40,
      useNativeDriver: true,
    }).start();
  };

  return (
    <TouchableOpacity
      onPress={() => toggleSelectedContact(contact)}
      onLongPress={() => toggleSelectedContact(contact)}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={0.7}>
      <Animated.View
        style={[
          styles.container,
          isSelected && styles.selected,
          {transform: [{scale: scaleValue}]},
        ]}>
        <LinearGradient
          colors={isSelected ? ['#4fc3f7', '#29b6f6'] : ['#ffffff', '#f5f5f5']}
          style={styles.gradient}>
          <View style={styles.content}>
            {contact.image ? (
              <Image source={{uri: contact.image}} style={styles.avatar} />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarInitial}>
                  {contact.name[0].toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.textContainer}>
              <Text style={styles.name}>{contact.name}</Text>
              {contact.phone && (
                <Text style={styles.phone}>
                  <Icon name="phone" size={14} color="#757575" />{' '}
                  {contact.phone}
                </Text>
              )}
            </View>
            {isSelected && (
              <Icon
                name="check-circle"
                size={24}
                color="#4caf50"
                style={styles.checkIcon}
              />
            )}
          </View>
        </LinearGradient>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    marginVertical: 5,
    borderRadius: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  selected: {
    elevation: 5,
    shadowOpacity: 0.2,
  },
  gradient: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#bdbdbd',
    marginRight: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInitial: {
    fontSize: 24,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212121',
  },
  phone: {
    fontSize: 14,
    color: '#757575',
    marginTop: 4,
  },
  checkIcon: {
    marginLeft: 10,
  },
});

export default ContactItem;
