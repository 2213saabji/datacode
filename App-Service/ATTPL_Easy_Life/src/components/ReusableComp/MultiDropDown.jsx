import React, { useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
  import { MultiSelect } from 'react-native-element-dropdown';
  import {useSelector} from 'react-redux';
  import {selectTheme} from '../../redux/selectors';

  // import AntDesign from '@expo/vector-icons/AntDesign'

 

  const MultiSelectComponent = ({
    options,
    setValue,
    value,
  }) => {

    const {colors, fonts} = useSelector(selectTheme);

    const renderItem = item => {
      return (
        <View style={styles.item}>
          <Text style={styles.selectedTextStyle}>{item.label}</Text>
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <MultiSelect
          style={styles.dropdown}
          containerStyle={{backgroundColor: colors.onBackground}}
          placeholderStyle={{
            fontSize: 16,
            color: colors.placeholder
          }}
          selectedTextStyle={styles.selectedTextStyle}
          itemTextStyle={{color: 'black'}}
          activeColor={colors.backdrop}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          labelField="label"
          valueField="value"
          placeholder="Select item"
          value={value}
          search
          searchPlaceholder="Search..."
          onChange={item => {
            setValue(item);
          }}
          renderItem={renderItem}
          renderSelectedItem={(item, unSelect) => (
            <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
              <View style={styles.selectedStyle}>
                <Text style={styles.textSelectedStyle}>{item.label}</Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  };

  export default MultiSelectComponent;

  const styles = StyleSheet.create({
    container: { padding: 16 },
    dropdown: {
      height: 50,
      // backgroundColor: 'gray',
      borderRadius: 4,
      padding: 12,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 1,
    },
    selectedTextStyle: {
      fontSize: 14,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
    icon: {
      marginRight: 5,
    },
    item: {
      padding: 17,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    selectedStyle: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 14,
      backgroundColor: 'gray',
      shadowColor: '#000',
      marginTop: 8,
      marginRight: 12,
      paddingHorizontal: 12,
      paddingVertical: 8,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,

      elevation: 2,
    },
    textSelectedStyle: {
      marginRight: 5,
      fontSize: 16,
    },
  });