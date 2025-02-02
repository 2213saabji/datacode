import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { enqueueSnackbar } from 'notistack';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDate } from 'src/utils/format-time';
import { deleter, endpoints } from 'src/utils/axios-blog';

import Label from 'src/components/label';
import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import TextMaxLine from 'src/components/text-max-line';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function PostItemHorizontal({ post, blogMutate }) {
  const popover = usePopover();
  const router = useRouter();
  const smUp = useResponsive('up', 'sm');
  const {
    postTitle,
    status,
    created_at,
    coverImageDetails,
    blogId,
    // coverUrl,
    // author,
    // totalViews,
    // totalShares,
    // totalComments,
    description,
  } = post;

  const del = useCallback(
    async (Id) => {
      const url = `${endpoints.blog.delete}/${Id}`;
      try {
        // console.log(url);
        const httpMethod = 'DELETE';
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };

        const response = await deleter(url, headers);
        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          blogMutate();
          // window.location.reload();
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [blogMutate]
  );

  return (
    <>
      <Stack component={Card} direction="row" justifyContent="space-between" sx={{ maxWidth: 470 }}>
        <Stack
          sx={{
            p: (theme) => theme.spacing(3, 3, 2, 3),
          }}
        >
          <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ mb: 2 }}>
            <Label variant="soft" color={(status === 'published' && 'info') || 'default'}>
              {status}
            </Label>
          </Stack>

          <Stack spacing={1} flexGrow={1}>
            <Link
              color="inherit"
              component={RouterLink}
              href={paths.dashboard.blog.details(blogId)}
            >
              <TextMaxLine variant="subtitle2" line={2}>
                {postTitle}
              </TextMaxLine>
            </Link>

            <TextMaxLine variant="body2" sx={{ color: 'text.secondary' }}>
              {description}
            </TextMaxLine>
          </Stack>

          <Stack direction="row" alignItems="center">
            <IconButton color={popover.open ? 'inherit' : 'default'} onClick={popover.onOpen}>
              <Iconify icon="eva:more-horizontal-fill" />
            </IconButton>

            <Stack
              spacing={1.5}
              flexGrow={1}
              direction="row"
              flexWrap="wrap"
              justifyContent="flex-end"
              sx={{
                typography: 'caption',
                color: 'text.disabled',
              }}
            >
              {/* <Stack direction="row" alignItems="center">
                <Iconify icon="eva:message-circle-fill" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalComments)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:eye-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalViews)}
              </Stack>

              <Stack direction="row" alignItems="center">
                <Iconify icon="solar:share-bold" width={16} sx={{ mr: 0.5 }} />
                {fShortenNumber(totalShares)}
              </Stack> */}
            </Stack>
          </Stack>
        </Stack>
        <Box component="span" sx={{ typography: 'caption', color: 'text.disabled', mt: 3 }}>
          {fDate(created_at)}
        </Box>

        {smUp && (
          <Box
            sx={{
              width: 180,
              height: 240,
              position: 'relative',
              flexShrink: 0,
              p: 1,
              mr: 2,
            }}
          >
            <Avatar
              alt="image"
              src={coverImageDetails?.preview}
              sx={{ position: 'absolute', top: 16, right: 16, zIndex: 9 }}
            />
            <Image
              alt={postTitle}
              src={coverImageDetails?.preview}
              sx={{ height: 1, borderRadius: 1.5 }}
            />
          </Box>
        )}
      </Stack>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="bottom-center"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.blog.details(blogId));
          }}
        >
          <Iconify icon="solar:eye-bold" />
          Open
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            router.push(paths.dashboard.blog.edit(blogId));
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            del(blogId);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

PostItemHorizontal.propTypes = {
  post: PropTypes.shape({
    blogId: PropTypes.number,
    created_at: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    description: PropTypes.string,
    status: PropTypes.string,
    postTitle: PropTypes.string,
    coverImageDetails: PropTypes.object,
    // author: PropTypes.object,
    // coverUrl: PropTypes.string,
    // totalComments: PropTypes.number,
    // totalShares: PropTypes.number,
    // totalViews: PropTypes.number,
  }),
  blogMutate: PropTypes.func,
};
