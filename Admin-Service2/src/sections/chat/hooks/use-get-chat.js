// import { useState, useEffect } from 'react';
// import { useGetChat } from 'src/api/chatt'; // Assuming getChatData is a custom hook

// const usegetChat = (conversationId) => {
//     const [schat, setSchat] = useState(null);

//     useEffect(() => {
//         const fetchData = async () => {
//             const data = await  useGetChat(conversationId);
//             setSchat(data);
//         };

//         fetchData();

//         // Cleanup function
//         return () => {
//             // cleanup logic if needed
//         };
//     }, [conversationId]);

//     return schat;
// };

// export default usegetChat;
