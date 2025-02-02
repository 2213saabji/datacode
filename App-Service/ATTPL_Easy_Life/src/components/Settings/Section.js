import React from 'react';
import {Text} from 'react-native';

const Section = ({title, colors, fonts}) => (
  <Text
    style={[styles.sectionTitle, {color: colors.text, ...fonts.titleMedium}]}>
    {title}
  </Text>
);

const styles = {
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
  },
};

export default Section;
