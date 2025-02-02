 import io from 'socket.io-client';
import { ATTPL_TMS_SOCKET_HOST_API } from '../../../config/config';

let socket;  // Define socket globally

export const initializeSocket = (data) => {
  try {
    if (socket) {
      socket.disconnect();
      console.log('Socket disconnected');
    }

    console.log('Attempting to connect to', ATTPL_TMS_SOCKET_HOST_API);

    socket = io.connect(ATTPL_TMS_SOCKET_HOST_API, data);

    socket.on('connect', () => {
      console.log('TMS User connected', data);
    });

    socket.on('disconnect', () => {
      console.log('TMS user disconnected');
    });
console.log(socket)
    socket.on('connect_error', (err) => {
      console.error('Socket connection error:', err.message);
    });

    return socket;
  } catch (e) {
    console.error('Error initializing socket:', e);
  }
};



// import io from 'socket.io-client';
// import {ATTPL_TMS_SOCKET_HOST_API} from '../../../config/config';


// // Thunk to initialize socket connection

// export const initializeSocket =  (data) => {
//   try{
//       if (socket) socket.disconnect();
//       console.log('calledddddddddd',ATTPL_TMS_SOCKET_HOST_API);
//       // const socket = io.connect(ATTPL_TMS_SOCKET_HOST_API, data);
    
//       const socket = io.connect(ATTPL_TMS_SOCKET_HOST_API, data);
  
//       socket.on('connect', () => {
//         console.log('TMS User connected ',data);
//       });
  
//       socket.on('disconnect', () => {
//         console.log("TMS user disconnected");
        
//       });
  
//       return socket;
//     }
//     catch(e){
//       console.log("error")
//     }
//   // }