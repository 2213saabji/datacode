// import { Box, Button, Card, CardActionArea, CardContent, CardMedia, Grid, Modal, Typography } from '@mui/material';

import { Box } from '@mui/material';

import FileStorageOverview from './file-storage-overview';
// ----------------------------------------------------------------------

export default function StorageOverView() {
  const GB = 1000000000 * 24;

  const renderStorageOverview = (
    <FileStorageOverview
      total={GB}
      chart={{
        series: 76,
      }}
      data={[
        {
          name: 'Images',
          usedStorage: GB / 2,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_img.svg" />,
        },
        {
          name: 'Media',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_video.svg" />,
        },
        {
          name: 'Documents',
          usedStorage: GB / 5,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_document.svg" />,
        },
        {
          name: 'Other',
          usedStorage: GB / 10,
          filesCount: 223,
          icon: <Box component="img" src="/assets/icons/files/ic_file.svg" />,
        },
      ]}
    />
  );

  return (
    <Box>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>{renderStorageOverview}</Box>
    </Box>
  );
}

StorageOverView.propTypes = {};
