import React from 'react';
import {TouchableOpacity, Text} from 'react-native';

const SaveButton = ({onPress, colors, fonts,marginBottom,text}) => (
  <TouchableOpacity
    style={[styles.button, {backgroundColor: colors.primary,marginBottom:marginBottom}]}
    onPress={onPress}>
    <Text style={[styles.buttonText, {color: colors.surface, ...fonts.button}]}>
      {text?text:"Save Changes"}
    </Text>
  </TouchableOpacity>
);

const styles = {
  button: {
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
};

export default SaveButton;
