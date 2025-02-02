import PropTypes from 'prop-types';
import React, { useRef, useCallback } from 'react';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TableRow from '@mui/material/TableRow';
import { useTheme } from '@mui/material/styles';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';
import TableContainer from '@mui/material/TableContainer';

import { fData } from 'src/utils/format-number';
import { fDate, fTime } from 'src/utils/format-time';
// import { fetcher } from 'src/utils/axios-templateManagemet';

import { useAuthContext } from 'src/auth/hooks';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import { TableHeadCustom } from 'src/components/table';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function BookingDetails({ title, subheader, tableLabels, tableData, ...other }) {
  return (
    <Card {...other}>
      <CardHeader title={title} subheader={subheader} sx={{ mb: 3 }} />

      <TableContainer sx={{ overflow: 'unset' }}>
        <Scrollbar>
          <Table sx={{ minWidth: 960 }}>
            <TableHeadCustom headLabel={tableLabels} />

            <TableBody>
              {tableData.map((row) => (
                <BookingDetailsRow key={row.template_id} row={row} />
              ))}
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <Divider sx={{ borderStyle: 'dashed' }} />

      {/* <Box sx={{ p: 2, textAlign: 'right' }}>
        <Button
          size="small"
          color="inherit"
          endIcon={<Iconify icon="eva:arrow-ios-forward-fill" width={18} sx={{ ml: -0.5 }} />}
        >
          View All
        </Button>
      </Box> */}
    </Card>
  );
}

BookingDetails.propTypes = {
  subheader: PropTypes.string,
  tableData: PropTypes.array,
  tableLabels: PropTypes.array,
  title: PropTypes.string,
};

// ----------------------------------------------------------------------

function BookingDetailsRow({ row }) {
  const theme = useTheme();
  const lightMode = theme.palette.mode === 'light';
  const popover = usePopover();
  const rowRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();

  const { user } = useAuthContext();

  // const handleDownload = () => {
  //   popover.onClose();
  //   console.info('DOWNLOAD', row.template_id);
  // };

  const handleDownload = useCallback(
    async (id) => {
      try {
        const url = `https://emsdevapi.attplems.com/api/v1/template/fetch/${id}`;
        const httpMethod = 'GET';

        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const response = await fetch(url, headers);

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();
        const previewUrl = responseData?.data?.templateImageDetails?.preview;

        // Create a link element and trigger the download
        const a = document.createElement('a');
        a.href = previewUrl;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        window.URL.revokeObjectURL(previewUrl);

        enqueueSnackbar('Download success!', { variant: 'success' });
      } catch (error) {
        console.error('Error downloading file:', error);
        enqueueSnackbar('Failed to download file', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user]
  );

  // const handlePrint = () => {
  //   popover.onClose();
  //   if (rowRef.current) {
  //     const printContents = rowRef.current.innerHTML;
  //     const originalContents = document.body.innerHTML;

  //     document.body.innerHTML = printContents;
  //     window.print();
  //     document.body.innerHTML = originalContents;
  //     window.location.reload();
  //   }
  //   console.info('PRINT', row.template_id);
  // };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: 'Share Example',
          text: 'Check out this link!',
          url: window.location.href,
        });
        // console.log('Shared successfully');
      } else {
        throw new Error('Web Share API not supported');
      }
    } catch (error) {
      console.error('Error sharing:', error.message);
      alert('Your browser does not support sharing.');
    }
  };

  return (
    <>
      <TableRow ref={rowRef}>
        <TableCell sx={{ display: 'flex', alignItems: 'center' }}>
          <Avatar
            variant="rounded"
            alt={row?.templateImageDetails?.name}
            src={row?.templateImageDetails?.preview}
            sx={{ mr: 2, width: 48, height: 48 }}
          />
          {row?.templateImageDetails?.name}
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fData(row?.templateImageDetails?.size)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(new Date(row.created_at))}
            secondary={fTime(new Date(row.created_at))}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(new Date(row.updated_at))}
            secondary={fTime(new Date(row.updated_at))}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>

        <TableCell>
          <Label
            variant={lightMode ? 'soft' : 'filled'}
            color={
              (row.status === 'Paid' && 'success') ||
              (row.status === 'Pending' && 'warning') ||
              'error'
            }
          >
            {row.status}
          </Label>
        </TableCell>

        <TableCell align="right" sx={{ pr: 1 }}>
          <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem onClick={() => handleDownload(row.template_id)}>
          <Iconify icon="eva:cloud-download-fill" />
          Download
        </MenuItem>
        {/* 
        <MenuItem onClick={handlePrint}>
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem> */}

        <MenuItem onClick={handleShare}>
          <Iconify icon="solar:share-bold" />
          Share
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </CustomPopover>
    </>
  );
}

BookingDetailsRow.propTypes = {
  row: PropTypes.object,
};
