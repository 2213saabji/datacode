// import React, { useState } from 'react';
//   import { StyleSheet, Text, View } from 'react-native';
//   import { Dropdown } from 'react-native-element-dropdown';
//   import {useSelector} from 'react-redux';
//   import {selectTheme} from '../../redux/selectors';
 
//   const SingleDropdownComponent = ({options, value, setValue}) => {
 
//     const [isFocus, setIsFocus] = useState(false);
 
//     const {colors, fonts} = useSelector(selectTheme);
 
//     // const renderLabel = () => {
//     //   if (value || isFocus) {
//     //     return (
//     //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
//     //         Dropdown label
//     //       </Text>
//     //     );
//     //   }
//     //   return null;
//     // };
 
//     return (
//       <View style={styles.container}>
//         <Dropdown
//           style={[styles.dropdown, isFocus && { borderColor: colors.text }, {borderColor: colors.text}]}
//           containerStyle={{backgroundColor: "#9e97a4"}}
//           placeholderStyle={[styles.placeholderStyle,{color: colors.placeholder }]}
//           selectedTextStyle={[styles.selectedTextStyle,{color: colors.text}]}
//           activeColor={colors.backdrop}
//           itemTextStyle={{color: "black"}}
//           inputSearchStyle={styles.inputSearchStyle}
//           iconStyle={styles.iconStyle}
//           data={options}
//           search
//           maxHeight={300}
//           labelField="label"
//           valueField="value"
//           placeholder={!isFocus ? 'Select item' : '...'}
//           searchPlaceholder="Search..."
//           value={value}
//           onFocus={() => setIsFocus(true)}
//           onBlur={() => setIsFocus(false)}
//           onChange={item => {
//             setValue(item.value);
//             setIsFocus(false);
//           }}
//         />
//       </View>
//     );
//   };
 
//   export default SingleDropdownComponent;
 
//   const styles = StyleSheet.create({
//     container: {
//       backgroundColor: 'transparent',
//       padding: 0,
//     },
//     dropdown: {
//       height: 50,
//       marginBottom: 10,
//       borderWidth: 1,
//       borderRadius: 8,
//       paddingHorizontal: 8,
//     },
//     icon: {
//       marginRight: 5,
//     },
//     label: {
//       position: 'absolute',
//       backgroundColor: 'white',
//       left: 22,
//       top: 8,
//       zIndex: 999,
//       paddingHorizontal: 8,
//       fontSize: 14,
//     },
//     placeholderStyle: {
//       fontSize: 16,
//     },
//     selectedTextStyle: {
//       fontSize: 16,
//     },
//     iconStyle: {
//       width: 20,
//       height: 20,
//     },
//     inputSearchStyle: {
//       height: 40,
//       fontSize: 16,
//     },
//   });





  import React, { useState } from 'react';
  import { StyleSheet, Text, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import {useSelector} from 'react-redux';
  import {selectTheme} from '../../redux/selectors';

  const SingleDropdownComponent = ({label, options, value, setValue, containerColor, inputBorderWidth, inputBorderRadius}) => {

    const [isFocus, setIsFocus] = useState(false);

    const {colors, fonts} = useSelector(selectTheme);

    // const renderLabel = () => {
    //   if (value || isFocus) {
    //     return (
    //       <Text style={[styles.label, isFocus && { color: 'blue' }]}>
    //         Dropdown label
    //       </Text>
    //     );
    //   }
    //   return null;
    // };

    return (
      <View style={[styles.container, {backgroundColor: containerColor}]}>
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: colors.text }, {borderColor: colors.text, borderWidth: inputBorderWidth, borderRadius: inputBorderRadius}]}
          containerStyle={{backgroundColor: "#9e97a4",borderRadius: inputBorderRadius}}
          placeholderStyle={[styles.placeholderStyle,{color: colors.placeholder }]}
          selectedTextStyle={[styles.selectedTextStyle,{color: colors.text}]}
          activeColor={colors.backdrop}
          itemTextStyle={{color: "black"}}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={options}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={label?label:!isFocus ? 'Select item' : '...'}
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        />
      </View>
    );
  };

  export default SingleDropdownComponent;

  const styles = StyleSheet.create({
    container: {
      // backgroundColor: '#333333',
      marginBottom:16,
      padding: 0,
    },
    dropdown: {
      height: 50,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
      borderRadius:5
    },
  });