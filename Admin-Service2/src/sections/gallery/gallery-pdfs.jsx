/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Grid } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import EmptyContent from 'src/components/empty-content';
import { usePopover } from 'src/components/custom-popover';

import GalleryPdfData from './gallery-pdf-data';

export default function GalleryPdfs({ galleryDataPdfs, deleter }) {
  const data = [
    {
      id: 1,
      name: 'Ayaz',
      usedStorage: '5MB',
      type: 'PDF',
      icon: '/assets/icons/files/ic_document.svg',
      url: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719656633101-1719556793698-imageFile.png',
    },
    {
      id: 2,
      name: 'Gurpreet',
      usedStorage: '4MB',
      type: 'DOC',
      icon: '/assets/icons/files/ic_document.svg',
      url: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719656922655-1718020471770-imageFile.png',
    },
    {
      id: 3,
      name: 'Ankit',
      usedStorage: '3MB',
      type: 'DOC',
      icon: '/assets/icons/files/ic_document.svg',
      url: 'https://attplgrouppublic.s3.ap-south-1.amazonaws.com/claim-images/1719657321220-component (2).png',
    },
  ];

  const popover = usePopover();
  const confirm = useBoolean();
  const editFolder = useBoolean();
  const share = useBoolean();
  const details = useBoolean();
  const onDelete = useBoolean();
  const favorite = useBoolean(data.isFavorited);

  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Copied!');
    copy(data.icon);
  }, [copy, data.icon]);

  const handlePopoverOpen = (event) => {
    popover.onOpen(event.currentTarget);
  };

  const handlePopoverClose = () => {
    popover.onClose();
  };

  // const handleDownload = useCallback((fileUrl) => {
  //   const link = document.createElement('a');
  //   link.href = fileUrl;
  //   link.setAttribute('download', fileUrl.split('/').pop());
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   enqueueSnackbar('Download started!');
  // }, []);

  return (
    <>
      {galleryDataPdfs.length > 0 && (
        <Grid container spacing={0} gap={3}>
          {galleryDataPdfs?.map((doc) => (
            <GalleryPdfData doc={doc} deleter={deleter} />
          ))}
        </Grid>
      )}

      {galleryDataPdfs.length === 0 && (
        <EmptyContent title="No Docs" description="There is no data available." sx={{ py: 0 }} />
      )}
    </>
  );
}

GalleryPdfs.propTypes = {
  galleryDataPdfs: PropTypes.object,
  deleter: PropTypes.func,
};
