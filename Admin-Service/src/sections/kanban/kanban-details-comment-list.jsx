import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import { useLightBox } from 'src/components/lightbox';

import KanbanDetailsCommentListMessage from './kanban-details-comment-list-message';

// ----------------------------------------------------------------------

export default function KanbanDetailsCommentList({ comments, onDeleteComment }) {
  const slides = comments
    .filter((comment) => comment.messageType === 'image')
    .map((slide) => ({ src: slide.message }));
  const lightbox = useLightBox(slides);

  return (
    <Stack
      spacing={3}
      flexGrow={1}
      sx={{
        py: 3,
        px: 2.5,
        bgcolor: 'background.neutral',
      }}
    >
      {comments.map((comment) => (
        <KanbanDetailsCommentListMessage
          key={comment.commentId}
          comment={comment}
          onDeleteComment={onDeleteComment}
          lightbox={lightbox}
          slides={slides}
        />
      ))}

      {/* CustomPopover */}
    </Stack>
  );
}

KanbanDetailsCommentList.propTypes = {
  comments: PropTypes.array,
  onDeleteComment: PropTypes.func,
};
