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
import { useCallback } from 'react';

import Stack from '@mui/material/Stack';

import { UploadBox, MultiFilePreview } from '../../components/upload';

export default function KanbanDetailsAttachments({ setFiles, files }) {
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles((prevFiles) => ({
        ...prevFiles,
        new: [...prevFiles.new, ...newFiles],
      }));
    },
    [setFiles]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      setFiles((prevFiles) => {
        const isPreFile = prevFiles.pre.some((file) => file === inputFile);
        if (isPreFile) {
          return {
            ...prevFiles,
            pre: prevFiles.pre.filter((file) => file !== inputFile),
            delete: [...prevFiles.delete, inputFile],
          };
        }

        return {
          ...prevFiles,
          new: prevFiles.new.filter((file) => file !== inputFile),
        };
      });
    },
    [setFiles]
  );

  return (
    <Stack direction="row" flexWrap="wrap">
      <MultiFilePreview
        thumbnail
        files={[...files.pre, ...files.new]}
        onRemove={(file) => handleRemoveFile(file)}
        sx={{ width: 64, height: 64 }}
      />
      <UploadBox onDrop={handleDrop} />
    </Stack>
  );
}

KanbanDetailsAttachments.propTypes = {
  // attachments: PropTypes.array,
  setFiles: PropTypes.func,
  files: PropTypes.object,
};
