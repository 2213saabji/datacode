import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {useNavigation} from '@react-navigation/native';
import {selectTheme} from '../../redux/selectors';
import {fDate} from '../../utilities/formatData';
import {Icon} from 'react-native-elements';
import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
  MenuProvider,
} from 'react-native-popup-menu';
import Layout from '../layout/Layout';

const DoctorAppointment = ({item, navigation}) => {
  const {colors, fonts} = useSelector(selectTheme);

  const handleNavigate = screen => {
    navigation.navigate(screen, {AppointmentId: item.doctorAppointmentId});
  };

  return (
    <View
      style={[
        styles.container,
        {backgroundColor: colors.surface, shadowColor: colors.shadow},
      ]}>
      {/* Menu Trigger */}
      <View style={styles.menuContainer}>
        <Menu>
          <MenuTrigger>
            <Icon
              name="dots-vertical"
              type="material-community"
              color="#ff6f00"
              size={24}
            />
          </MenuTrigger>
          <MenuOptions style={styles.menuOptions}>
            <MenuOption onSelect={() => handleNavigate('AppointmentDetails')}>
              <Text style={styles.menuOption}>View</Text>
            </MenuOption>
            <MenuOption onSelect={() => handleNavigate('AppointmentFormEdit')}>
              <Text style={styles.menuOption}>Edit</Text>
            </MenuOption>
          </MenuOptions>
        </Menu>
      </View>

      {/* Table Data */}
      <View style={styles.table}>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableHeader,
              {color: colors.text, ...fonts.headlineSmall},
            ]}>
            Details
          </Text>
          <Text
            style={[
              styles.tableHeader,
              {color: colors.text, ...fonts.headlineSmall},
            ]}>
            Value
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Problem Title
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.problemTitle}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Appointment Type
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.appointmentType}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Pass Status
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {item.appointmentPassStatus}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Date Created
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {fDate(item.created_at)}
          </Text>
        </View>
        <View style={styles.tableRow}>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            Appointment Date
          </Text>
          <Text
            style={[
              styles.tableCell,
              {color: colors.text, ...fonts.bodySmall},
            ]}>
            {fDate(item.appointmentDate)}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#ddd',
    position: 'relative', // Ensure relative positioning for absolute child components
  },
  menuContainer: {
    alignItems: 'flex-end',
    marginBottom: 10,
  },
  menuOptions: {
    marginTop: 5, // Ensure menu options are visible below the trigger
    padding: 7,
    borderRadius: 8,
    backgroundColor: '#fff', // Ensure background color contrasts with text
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  menuOption: {
    padding: 7,
    fontSize: 16,
    color: '#000', // Ensure text is visible
  },
  table: {
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  tableCell: {
    fontSize: 14,
  },
});

export default DoctorAppointment;

// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// import { useSelector } from 'react-redux';
// import { useNavigation } from '@react-navigation/native';
// import { selectTheme } from '../../redux/selectors';
// import { fDate } from '../../utilities/formatData';
// import { Icon } from 'react-native-elements';
// import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu';

// const DoctorAppointment = ({ item }) => {
//   const { colors, fonts } = useSelector(selectTheme);
//   const navigation = useNavigation();

//   const handleNavigate = (screen) => {
//     navigation.navigate('DoctorAppointmentScreen', {
//       screen: screen,
//       params: { AppointmentId: item.doctorAppointmentId },
//     });
//   };

//   return (
//     <View style={styles.container}>
//       <MenuProvider>
//         <View style={[styles.table, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
//           <View style={styles.menuContainer}>
//             {/* Three-Dot Menu */}
//             <Menu>
//               <MenuTrigger>
//                 <Icon
//                   name='dots-vertical'
//                   type='material-community'
//                   color='#000'
//                   size={24}
//                 />
//               </MenuTrigger>
//               <MenuOptions style={styles.menuOptions}>
//                 <MenuOption onSelect={() => handleNavigate('AppointmentDetails')}>
//                   <Text style={styles.menuOption}>View</Text>
//                 </MenuOption>
//                 <MenuOption onSelect={() => handleNavigate('EditAppointment')}>
//                   <Text style={styles.menuOption}>Edit</Text>
//                 </MenuOption>
//               </MenuOptions>
//             </Menu>
//           </View>

//           {/* Table Data */}
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Details</Text>
//             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Value</Text>
//           </View>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Problem Title</Text>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.problemTitle}</Text>
//           </View>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Type</Text>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentType}</Text>
//           </View>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Pass Status</Text>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentPassStatus}</Text>
//           </View>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Date Created</Text>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
//               {fDate(item.created_at)}
//             </Text>
//           </View>
//           <View style={styles.tableRow}>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Date</Text>
//             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
//               {fDate(item.appointmentDate)}
//             </Text>
//           </View>
//         </View>
//       </MenuProvider>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     position: 'relative',
//   },
//   table: {
//     marginBottom: 10,
//     padding: 10,
//     borderRadius: 8,
//     elevation: 3,
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   menuContainer: {
//     alignItems: 'flex-end',
//     marginBottom: 10,
//   },
//   menuOptions: {
//     marginTop: 5, // Ensure menu options are visible below the trigger
//     padding: 7,
//     borderRadius: 8,
//     backgroundColor: '#fff', // Ensure background color contrasts with text
//     borderWidth: 1,
//     borderColor: '#ddd',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.3,
//     shadowRadius: 4,
//   },
//   menuOption: {
//     padding: 7,
//     fontSize: 16,
//     color: '#000', // Ensure text is visible
//   },
//   tableRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     paddingVertical: 5,
//   },
//   tableHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   tableCell: {
//     fontSize: 14,
//   },
// });

// export default DoctorAppointment;

// // import React, { useState } from 'react';
// // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // import { useSelector } from 'react-redux';
// // import { useNavigation } from '@react-navigation/native';
// // import { selectTheme } from '../../redux/selectors';
// // import { fDate } from '../../utilities/formatData';
// // import { Icon } from 'react-native-elements';
// // import { Menu, MenuOptions, MenuOption, MenuTrigger, MenuProvider } from 'react-native-popup-menu'; // Import popup menu components

// // const DoctorAppointment = ({ item }) => {
// //   const { colors, fonts } = useSelector(selectTheme);
// //   const navigation = useNavigation();

// //   const handleNavigate = (screen) => {
// //     navigation.navigate('DoctorAppointmentScreen', {
// //       screen: screen,
// //       params: { AppointmentId: item.doctorAppointmentId },
// //     });
// //   };

// //   return (
// //     <View style={styles.container}>
// //       <MenuProvider>
// //         <View style={[styles.table, { backgroundColor: colors.surface, shadowColor: colors.shadow }]}>
// //           <View style={styles.menuContainer}>
// //             {/* Three-Dot Menu */}
// //             <Menu>
// //               <MenuTrigger>
// //                 <Icon
// //                   name='dots-vertical'
// //                   type='material-community'
// //                   color='#fff'
// //                   size={24}
// //                 />
// //               </MenuTrigger>
// //               <MenuOptions>
// //                 <MenuOption onSelect={() => handleNavigate('AppointmentDetails')}>
// //                   <Text style={styles.menuOption}>View</Text>
// //                 </MenuOption>
// //                 <MenuOption onSelect={() => handleNavigate('EditAppointment')}>
// //                   <Text style={styles.menuOption}>Edit</Text>
// //                 </MenuOption>
// //               </MenuOptions>
// //             </Menu>
// //           </View>

// //           {/* Table Data */}
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Details</Text>
// //             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Value</Text>
// //           </View>
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Problem Title</Text>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.problemTitle}</Text>
// //           </View>
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Type</Text>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentType}</Text>
// //           </View>
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Pass Status</Text>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentPassStatus}</Text>
// //           </View>
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Date Created</Text>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
// //               {fDate(item.created_at)}
// //             </Text>
// //           </View>
// //           <View style={styles.tableRow}>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Date</Text>
// //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
// //               {fDate(item.appointmentDate)}
// //             </Text>
// //           </View>
// //         </View>
// //       </MenuProvider>
// //     </View>
// //   );
// // };

// // const styles = StyleSheet.create({
// //   container: {
// //     position: 'relative',
// //   },
// //   table: {
// //     marginBottom: 10,
// //     padding: 10,
// //     borderRadius: 8,
// //     elevation: 3,
// //     borderWidth: 1,
// //     borderColor: '#ddd',
// //   },
// //   menuContainer: {
// //     alignItems: 'flex-end', // Align the menu to the right
// //     marginBottom: 10,
// //   },
// //   menuOption: {
// //     padding: 10,
// //     fontSize: 16,
// //   },
// //   tableRow: {
// //     flexDirection: 'row',
// //     justifyContent: 'space-between',
// //     paddingVertical: 5,
// //   },
// //   tableHeader: {
// //     fontSize: 16,
// //     fontWeight: 'bold',
// //   },
// //   tableCell: {
// //     fontSize: 14,
// //   },
// // });

// // export default DoctorAppointment;

// // // import React, { useState } from 'react';
// // // import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
// // // import { useSelector } from 'react-redux';
// // // import { useNavigation } from '@react-navigation/native';
// // // import { selectTheme } from '../../redux/selectors';
// // // import { fDate } from '../../utilities/formatData';
// // // import { Icon } from 'react-native-elements';
// // // import { Menu, MenuOptions, MenuOption, MenuTrigger,MenuProvider } from 'react-native-popup-menu'; // Import popup menu components

// // // const DoctorAppointment = ({ item }) => {
// // //   const [show,setshow]=useState(false)
// // //   const { colors, fonts } = useSelector(selectTheme);
// // //   const navigation = useNavigation();
// // //   const click=()=>{
// // //     console.log("fnsj")
// // //     setshow(!show)
// // //   }

// // //   const handelnaviagte=()=>{
// // //     navigation.navigate('DoctorAppointmentScreen', {
// // //       screen: 'AppointmentDetails',
// // //       params: { AppointmentId: item.doctorAppointmentId },
// // //     })
// // //   }
// // //   return (
// // //     <View style={styles.container}>
// // //       <MenuProvider>

// // //       {/* <TouchableOpacity
// // //         onPress={() =>
// // //           navigation.navigate('DoctorAppointmentScreen', {
// // //             screen: 'AppointmentDetails',
// // //             params: { AppointmentId: item.doctorAppointmentId },
// // //           })
// // //         }
// // //       > */}

// // //     <View style={[styles.table, { backgroundColor: colors.surface, shadowColor: colors.shadow }]} >
// // //           {/* Table Header */}
// // //           <TouchableOpacity style={{ flexDirection: 'coulmn', justifyContent: 'right', alignItems: 'right' }} onPress={click}>
// // //       <Icon
// // //         name='dot-circle-o'
// // //         type='font-awesome'
// // //         color='#fff'
// // //         size={4}
// // //         containerStyle={{ marginBottom: 5 }}
// // //       />
// // //       <Icon
// // //         name='dot-circle-o'
// // //         type='font-awesome'
// // //         color='#fff'
// // //         size={4}
// // //         containerStyle={{ marginBottom: 5 }}
// // //       />
// // //       <Icon
// // //         name='dot-circle-o'
// // //         type='font-awesome'
// // //         color='#fff'
// // //         size={4}
// // //       />
// // //     </TouchableOpacity>
// // //     {show&&<View>
// // //           <Text style={styles.title} onPress={handelnaviagte}>View</Text>
// // //           <Text style={styles.title} onPress={handelnaviagte}>Edit</Text>
// // //         </View>}
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Details</Text>
// // //             <Text style={[styles.tableHeader, { color: colors.text, ...fonts.headlineSmall }]}>Value</Text>
// // //           </View>

// // //           {/* Table Data */}
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Problem Title</Text>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.problemTitle}</Text>
// // //           </View>
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Type</Text>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentType}</Text>
// // //           </View>
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Pass Status</Text>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>{item.appointmentPassStatus}</Text>
// // //           </View>
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Date Created</Text>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
// // //               {fDate(item.created_at)}
// // //             </Text>
// // //           </View>
// // //           <View style={styles.tableRow}>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>Appointment Date</Text>
// // //             <Text style={[styles.tableCell, { color: colors.text, ...fonts.bodySmall }]}>
// // //               {fDate(item.appointmentDate)}
// // //             </Text>
// // //           </View>

// // //         </View>
// // //         {/* <Menu>
// // //         <MenuTrigger>
// // //           <Text style={styles.menuTrigger}>...gg</Text>
// // //         </MenuTrigger>
// // //         <MenuOptions>
// // //           <MenuOption
// // //             onSelect={() => {
// // //               navigation.navigate('DoctorAppointmentScreen', {
// // //                 screen: 'AppointmentDetails',
// // //                 params: { AppointmentId: item.doctorAppointmentId },
// // //               });
// // //             }}
// // //           >
// // //             <Text style={styles.menuOption}>View</Text>
// // //           </MenuOption>
// // //           <MenuOption
// // //             onSelect={() => {
// // //               navigation.navigate('DoctorAppointmentScreen', {
// // //                 screen: 'EditAppointment',
// // //                 params: { AppointmentId: item.doctorAppointmentId },
// // //               });
// // //             }}
// // //           >
// // //             <Text style={styles.menuOption}>Edit</Text>
// // //           </MenuOption>
// // //         </MenuOptions>
// // //       </Menu> */}
// // //       {/* </TouchableOpacity> */}

// // //       {/* Three-Dot Menu */}

// // //       </MenuProvider>
// // //     </View>
// // //   );
// // // };

// // // const styles = StyleSheet.create({
// // //   container: {
// // //     position: 'relative',
// // //   },
// // //   table: {
// // //     marginBottom: 10,
// // //     padding: 10,
// // //     borderRadius: 8,
// // //     elevation: 3,
// // //     borderWidth: 1,
// // //     borderColor: '#ddd',
// // //   },

// // //   tableRow: {
// // //     flexDirection: 'row',
// // //     justifyContent: 'space-between',
// // //     paddingVertical: 5,
// // //   },
// // //   tableHeader: {
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //   },
// // //   tableCell: {
// // //     fontSize: 14,
// // //   },
// // //   menuTrigger: {
// // //     position: 'absolute',
// // //     top: 10,
// // //     right: 10,
// // //     fontSize: 18,
// // //     color: '#888',
// // //   },
// // //   menuOption: {
// // //     padding: 10,
// // //     fontSize: 16,
// // //   },
// // //   title:{
// // //     fontSize: 16,
// // //     fontWeight: 'bold',
// // //     color:'white',
// // //     padding:10
// // //   }
// // // });

// // // export default DoctorAppointment;
