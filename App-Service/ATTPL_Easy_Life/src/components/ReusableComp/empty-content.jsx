import React from 'react';
import PropTypes from 'prop-types';
import { View, Image, Text, StyleSheet } from 'react-native';

// ----------------------------------------------------------------------

export default function EmptyContent({ title, imgUrl, action, filled, description, style, ...other }) {
  return (
    <View
      style={[
        styles.container,
        filled && styles.filledContainer,
        style,
      ]}
      {...other}
    >
      <Image
        source={{ uri: imgUrl || 'https://example.com/assets/icons/empty/ic_content.svg' }}
        style={styles.image}
      />

      {title && (
        <Text style={styles.title}>
          {title}
        </Text>
      )}

      {description && (
        <Text style={styles.description}>
          {description}
        </Text>
      )}

      {action && action}
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
    height: '100%',
  },
  filledContainer: {
    borderRadius: 8,
    backgroundColor: 'rgba(128, 128, 128, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(128, 128, 128, 0.08)',
  },
  image: {
    width: '100%',
    maxWidth: 160,
    resizeMode: 'contain',
  },
  title: {
    marginTop: 8,
    color: '#9e9e9e',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    marginTop: 8,
    color: '#9e9e9e',
    textAlign: 'center',
    fontSize: 12,
  },
});
