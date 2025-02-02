import useSWR from 'swr'; //  mutate
import { useMemo } from 'react';

import axios, { fetcher, endpoints } from 'src/utils/axios-chat-call';

import { ATTPL_CHAT_HOST_API } from 'src/config-global';

// chat notification sound

export const newMsgSound = () => {
  try {
    const sound = new Audio('/assets/sounds/light.mp3');
    sound.play();
  } catch (error) {
    console.error('Error playing sound:', error);
  }
};

export function useGetChat(id) {
  // const URL = endpoints.our_work.list;
  const URL = `${endpoints.conversation.details}/${id}`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      schat: data || [],
      schatLoading: isLoading,
      schatError: error,
      schatValidating: isValidating,
      schatEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function createConversation(formData) {
  const URL = ATTPL_CHAT_HOST_API + endpoints.conversation.create;
  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error.massage);
    throw error;
  }
}

export async function createGroup(formData) {
  const URL = ATTPL_CHAT_HOST_API + endpoints.group.create;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error creating candidate profile:', error);
    throw error;
  }
}
export async function UpdateGroup(groupId, formData) {
  const URL = `${ATTPL_CHAT_HOST_API + endpoints.group.edit}/${groupId}`;

  try {
    const response = await axios.put(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error updating Election:', error);
    throw error;
  }
}
export function useGetGroup() {
  // const URL = endpoints.our_work.list;
  const URL = `${endpoints.group.details}/${1}`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      group: data || [],
      groupLoading: isLoading,
      groupError: error,
      groupValidating: isValidating,
      groupEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetGroups() {
  // const URL = endpoints.our_work.list;
  const URL = `${endpoints.group.list}/${1}`;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      group: data || [],
      groupLoading: isLoading,
      groupError: error,
      groupValidating: isValidating,
      groupEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetConversation(userId) {
  const URL = `${endpoints.recent.list}/${userId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      conversation: data || [],
      conversationLoading: isLoading,
      conversationError: error,
      conversationValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
export async function createMassage(formData) {
  const URL = ATTPL_CHAT_HOST_API + endpoints.massage.creat;

  try {
    const response = await axios.post(URL, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Optimistically update the local data
    // mutate(URL, async (data) => {
    //   return [response.data, ...data]; // Assuming response contains the newly created message
    // }, false);

    return response;
  } catch (error) {
    console.error('Error creating message:', error);
    throw error;
  }
}
// export async function createMassage(formData) {
//   const URL = ATTPL_CHAT_HOST_API + endpoints.massage.creat;

//   try {
//     const response = await axios.post(URL, formData, {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     });

//     return response;
//   } catch (error) {
//     console.error('Error creating candidate profile:', error);
//     throw error;
//   }
// }

export async function DeleteChat(messageId, senderId) {
  const URL = `${ATTPL_CHAT_HOST_API + endpoints.massage.delete}/${messageId}/${senderId}`;

  try {
    const response = await axios.delete(URL, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
  } catch (error) {
    console.error('Error deleting voter profile:', error);
    throw error;
  }
}

// export function useGetGroups() {
//   // const URL = endpoints.our_work.list;
//   const URL =`${endpoints.group.list}/${1}`;
//   const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
//   // console.log(data);

//   const memoizedValue = useMemo(
//     () => ({
//       group: data || [],
//       groupLoading: isLoading,
//       groupError: error,
//       groupValidating: isValidating,
//       groupEmpty: !isLoading && !data?.length,
//     }), [data, error, isLoading, isValidating]);

//   return memoizedValue;
// }

export function useGetUserList(userId) {
  const URL = `${endpoints.conversation.user_list}/${userId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      contactUser: data || [],
      contactUserLoading: isLoading,
      contactUserError: error,
      contactUserValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetParticipants(conversationId) {
  const URL = `${endpoints.conversation.participants}/${conversationId}`;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      participants: data || [],
      participantsLoading: isLoading,
      participantsError: error,
      participantsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export async function getParticipants(conversationId) {
  const URL = `${endpoints.conversation.participants}/${conversationId}`;

  try {
    const response = await axios.get(URL);

    return response.data;
  } catch (err) {
    return err;
  }
}

export async function getConversationMember(conversationId) {
  const URL = `${endpoints.conversation.get_member}/${conversationId}`;

  try {
    const response = await axios.get(URL);

    return response.data.data;
  } catch (error) {
    console.log(error);
    return error;
  }
}
