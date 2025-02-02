// import PropTypes from 'prop-types';
// import { useState, useCallback } from 'react';

// import Stack from '@mui/material/Stack';

// import { UploadBox, MultiFilePreview } from 'src/components/upload';

// // ----------------------------------------------------------------------

// export default function KanbanDetailsAttachments({ attachments }) {
//   const [files, setFiles] = useState(attachments);

//   const handleDrop = useCallback(
//     (acceptedFiles) => {
//       const newFiles = acceptedFiles.map((file) =>
//         Object.assign(file, {
//           preview: URL.createObjectURL(file),
//         })
//       );

//       setFiles([...files, ...newFiles]);
//     },
//     [files]
//   );

//   const handleRemoveFile = useCallback(
//     (inputFile) => {
//       const filtered = files.filter((file) => file !== inputFile);
//       setFiles(filtered);
//     },
//     [files]
//   );

//   return (
//     <Stack direction="row" flexWrap="wrap">
//       <MultiFilePreview
//         thumbnail
//         files={files}
//         onRemove={(file) => handleRemoveFile(file)}
//         sx={{ width: 64, height: 64 }}
//       />

//       <UploadBox onDrop={handleDrop} />
//     </Stack>
//   );
// }

// KanbanDetailsAttachments.propTypes = {
//   attachments: PropTypes.array,
// };

import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';

import Image from 'src/components/image';
import Lightbox, { useLightBox } from 'src/components/lightbox';

// ----------------------------------------------------------------------

export default function KanbanDetailsAttachments({ attachments }) {
  // const [open, setOpen] = useState(false);
  // const [selectedImage, setSelectedImage] = useState(null);
  const slides = attachments.map((url, idxurl) => ({
    src: url,
    title: 'Receipt',
    description: url?.name,
  }));
  const lightbox = useLightBox(slides);

  return (
    <>
      <Stack direction="row" flexWrap="wrap">
        {attachments.map((url, index) => (
          <Image
            key={index}
            src={url}
            alt={`attachment-${index}`}
            // onClick={() => handleClickImage(url)}
            onClick={() => lightbox.onOpen(`${url}`)}
            style={{ width: 64, height: 64, cursor: 'pointer', margin: 4 }}
          />
        ))}
      </Stack>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
        disabledZoom={false}
        disabledTotal={false}
        disabledVideo={false}
        disabledCaptions={false}
        disabledSlideshow={false}
        disabledThumbnails={false}
        disabledFullscreen={false}
      />
    </>
  );
}

KanbanDetailsAttachments.propTypes = {
  attachments: PropTypes.arrayOf(
    PropTypes.shape({
      preview: PropTypes.string.isRequired,
    })
  ).isRequired,
};
