import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';

const DetailRow = ({label, value}) => {
  const {colors, fonts} = useSelector(selectTheme);

  return (
    <View style={detailRowStyles.detailRow}>
      <Text
        style={{
          fontSize: fonts.labelMedium.fontSize,
          lineHeight: fonts.labelMedium.lineHeight,
          fontFamily: fonts.labelMedium.fontFamily,
          fontWeight: fonts.labelMedium.fontWeight,
          color: colors.text,
          width: '50%',
        }}>
        {label}
      </Text>
      <Text style={[detailRowStyles.detailDescription, {color: colors.text}]}>
        {value}
      </Text>
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
  detailDescription: {
    width: '50%',

    fontFamily: 'PublicSans-Regular',
    fontWeight: '400',
  },
});
