import React, {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {getConversationParticipants} from '../../redux/slices/CMS/ChatSlice';

const ConversationName = ({conversation, userId}) => {
  const dispatch = useDispatch();
  const [localParticipants, setLocalParticipants] = useState([]);
  const {conversationId, conversationDetail} = conversation;

  useEffect(() => {
    const fetchParticipants = async () => {
      if (conversationId) {
        try {
          // Dispatch the action and wait for the result
          const resultAction = await dispatch(
            getConversationParticipants(conversationId),
          );

          if (resultAction.meta.requestStatus === 'fulfilled') {
            setLocalParticipants(
              resultAction.payload.participants.data
                .ConversationUserConversations,
            );
          } else {
            console.error('Failed to fetch participants:', resultAction.error);
          }
        } catch (error) {
          console.error('Error fetching participants:', error);
        }
      }
    };

    fetchParticipants();
  }, [conversationId, dispatch]);

  const getConversationName = () => {
    if (localParticipants.length === 0) {
      return 'Loading...';
    }
    if (!conversationDetail) {
      return 'Error';
    }

    if (conversationDetail.type === 'group') {
      return `Group ${conversationId?.slice(0, 5)}`;
    } else {
      const otherParticipant = localParticipants.find(
        p => p.userId !== userId,
      )?.User;

      if (otherParticipant) {
        return `${otherParticipant?.UserProfile?.first_name} ${otherParticipant?.UserProfile?.last_name}`.trim();
      } else {
        return `User ${conversationId?.slice(0, 5)}`;
      }
    }
  };

  return <>{getConversationName()}</>;
};

export default ConversationName;
