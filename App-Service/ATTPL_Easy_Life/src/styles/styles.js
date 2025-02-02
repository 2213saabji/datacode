// src/styles/styles.js

import {StyleSheet} from 'react-native';

const colors = {
  primary: '#6200EE',
  secondary: '#03DAC5',
  background: '#F6F6F6',
  text: '#000000',
  textSecondary: '#757575',
  border: '#E0E0E0',
};

const fonts = {
  regular: 'PublicSans-Regular',
  bold: 'PublicSans-Bold',
  medium: 'PublicSans-Medium',
  light: 'PublicSans-Light',
};

const globalStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    fontFamily: fonts.bold,
    color: colors.text,
    marginBottom: 16,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.regular,
    color: colors.text,
    marginBottom: 8,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginBottom: 16,
    fontFamily: fonts.regular,
  },
});

export {colors, fonts, globalStyles};
