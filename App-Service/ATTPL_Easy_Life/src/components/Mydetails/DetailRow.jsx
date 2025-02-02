import React from 'react';
import {Text, View} from 'react-native';
import {StyleSheet} from 'react-native';

const DetailRow = ({title, description}) => {
  return (
    <View style={detailRowStyles.detailRow}>
      <Text style={detailRowStyles.detailTitle}>{title}</Text>
      <Text style={detailRowStyles.detailDescription}>{description}</Text>
    </View>
  );
};

export default DetailRow;

const detailRowStyles = StyleSheet.create({
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  detailTitle: {
    fontSize: 8,
    lineHeight: 12,
    fontFamily: 'PublicSans-Regular',
    fontWeight: '400',
    color: 'rgba(33, 43, 54, 1)',
  },
  detailDescription: {
    width: '50%',
    fontSize: 8,
    lineHeight: 12,
    fontFamily: 'PublicSans-Regular',
    fontWeight: '400',
    color: 'rgba(33, 43, 54, 1)',
  },
});
