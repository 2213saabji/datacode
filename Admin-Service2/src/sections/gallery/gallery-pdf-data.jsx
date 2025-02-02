/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';

import ListItemText from '@mui/material/ListItemText';
import { Box, Stack, Paper, Divider, MenuItem, Checkbox, IconButton } from '@mui/material';

import { useBoolean } from 'src/hooks/use-boolean';
import { useCopyToClipboard } from 'src/hooks/use-copy-to-clipboard';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

import FileManagerDocDetails from './gallery-pdfs-details';

export default function GalleryPdfData({ doc, deleter }) {
  const popover = usePopover();
  const confirm = useBoolean();
  const editFolder = useBoolean();
  const share = useBoolean();
  const details = useBoolean();
  const onDelete = useBoolean();
  const checkbox = useBoolean();
  const favorite = useBoolean(doc.isFavorited);

  const { copy } = useCopyToClipboard();

  const handleCopy = useCallback(() => {
    enqueueSnackbar('Copied!');
    copy(doc.icon);
  }, [copy, doc.icon]);

  const handlePopoverOpen = (event) => {
    popover.onOpen(event.currentTarget);
  };

  const handlePopoverClose = () => {
    popover.onClose();
  };

  const handleDownload = useCallback((fileUrl) => {
    const link = document.createElement('a');
    link.href = fileUrl;
    link.setAttribute('download', fileUrl.split('/').pop());
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    enqueueSnackbar('Download started!');
  }, []);

  const renderAction = (
    <Stack
      direction="row"
      alignItems="center"
      sx={{
        top: 8,
        right: 8,
        position: 'absolute',
      }}
    >
      <Checkbox
        color="warning"
        icon={<Iconify icon="eva:star-outline" />}
        checkedIcon={<Iconify icon="eva:star-fill" />}
        checked={favorite.value}
        onChange={favorite.onToggle}
      />

      <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
        <Iconify icon="eva:more-vertical-fill" />
      </IconButton>
    </Stack>
  );

  // const convertKbToMb = (kb) => (kb / 1024).toFixed(0);
  const convertKbToMb = (sizeInKb) => {
    const sizeInMb = sizeInKb / 1024 / 1024;
    // console.log('sizeInMb', sizeInMb)
    return sizeInMb.toFixed(2);
  };

  const typefile = doc.pdf.preview.slice(doc.pdf.preview.lastIndexOf('.') + 1);

  const pdficon = (
    <>
      {(typefile === 'html' || typefile === 'htm') && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/html1.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'css' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/css.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'pdf' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/pdf.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'png' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/png.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'js' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/js.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {(typefile === 'doc' || typefile === 'docx') && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/docx.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'ppt' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/ppt.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'pptx' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/pptx-file.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'xls' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/xls.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'xlsx' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/xlsx.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'txt' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/txt.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'rtf' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/rtf-file.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'ods' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/ods.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'csv' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/csv.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'odp' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/odp.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'mdb' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/mdb.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'accdb' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/accdb.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'sqlite' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/sqlite.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'zip' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/zip.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'rar' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/rar.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === '7z' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/7z.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'epub' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/epub.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'mobi' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/mobi.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'c' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/c.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'cpp' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/cpp.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'py' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/py.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'java' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/java.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'json' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/json.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'xml' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/xml.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'jpg' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/jpg.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'jpeg' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/jpeg.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'gif' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/gif.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'bmp' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/bmp.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'svg' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/svg.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
      {typefile === 'mkv' && (
        <Box
          component="img"
          src="/assets/icons/documentExtensions/mkv.png"
          sx={{ width: 36, height: 36 }}
        />
      )}
    </>
  );

  return (
    <>
      <Stack
        component={Paper}
        variant="outlined"
        spacing={1}
        alignItems="flex-start"
        sx={{
          p: 2.5,
          width: 200,
          borderRadius: 2,
          bgcolor: 'unset',
          cursor: 'pointer',
          position: 'relative',
          ...(checkbox.value && {
            bgcolor: 'background.paper',
            boxShadow: (theme) => theme.customShadows.z20,
          }),
          // ...sx,
        }}
        // {...other}
      >
        <Box>{pdficon}</Box>

        <ListItemText
          onClick={details.onTrue}
          primary={doc.pdf.name}
          secondary={<>{convertKbToMb(doc.pdf.size)} Mb</>}
          primaryTypographyProps={{
            noWrap: true,
            typography: 'subtitle1',
            sx: { fontSize: '0.875rem', textWrap: 'wrap' },
          }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            alignItems: 'center',
            typography: 'caption',
            color: 'text.disabled',
            display: 'inline-flex',
          }}
        />

        {renderAction}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            handleCopy();
          }}
        >
          <Iconify icon="eva:link-2-fill" />
          Copy Link
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            share.onTrue();
          }}
        >
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>
        <MenuItem
          onClick={() => {
            popover.onClose();
            editFolder.onTrue();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />
        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <FileManagerDocDetails
        item={doc}
        id={doc.galleryId}
        deleter={deleter}
        convertKbToMb={convertKbToMb}
        favorited={favorite.value}
        onFavorite={favorite.onToggle}
        onCopyLink={handleCopy}
        open={details.value}
        onClose={details.onFalse}
        onDelete={() => {
          details.onFalse();
          onDelete();
        }}
      />
    </>
  );
}

GalleryPdfData.propTypes = {
  doc: PropTypes.object,
  deleter: PropTypes.func,
};
