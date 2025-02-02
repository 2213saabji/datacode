// import React from 'react';
// import { Box, Button, Popover, VStack } from 'native-base';
// import { View } from 'react-native';

// export default function CustomPopover({isOpen, setIsOpen}) {
    
//     return <View w="100%" alignItems="center">
//         <VStack space={6} alignSelf="flex-start" w="100%">
//         <Popover // @ts-ignore
//         placement="auto" 
//         isOpen={isOpen} 
//         onClose={() => setIsOpen(!isOpen)}>
//             <Popover.Content w="56">
//               <Popover.Arrow />
//               <Popover.CloseButton onPress={() => setIsOpen(false)} />
//               <Popover.Header>Delete Customer</Popover.Header>
//               <Popover.Body>
//                 This will remove all data relating to Alex. This action cannot be
//                 reversed. Deleted data can not be recovered.
//               </Popover.Body>
//               <Popover.Footer justifyContent="flex-end">
//                 <Button.Group space={2}>
//                   <Button colorScheme="coolGray" variant="ghost" onPress={() => setIsOpen(false)}>
//                     Cancel
//                   </Button>
//                   <Button colorScheme="danger" onPress={() => setIsOpen(false)}>
//                     Delete
//                   </Button>
//                 </Button.Group>
//               </Popover.Footer>
//             </Popover.Content>
//           </Popover>
//         </VStack>
//       </View>;
//   }