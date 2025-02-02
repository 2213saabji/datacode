// import * as Yup from 'yup';
import { debounce } from 'lodash';
import PropTypes from 'prop-types';
// import { useForm  } from 'react-hook-form';
// import { enqueueSnackbar } from 'notistack';
// import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import { alpha } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { getUserNameSearch } from 'src/api/user';
// import { useAuthContext } from 'src/auth/hooks';
// import { createConversation } from 'src/api/chatt';

import Iconify from 'src/components/iconify';
import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function ChatHeaderCompose({ onAddRecipients }) {
  const [searchRecipients, setSearchRecipients] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);
  const [currUserPage, setCurrUserPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const UserListArr = userSuggestions ?? [];
  const limitForUser = 10;

  const fetchUserSuggestions = useMemo(
    () =>
      debounce(async (value) => {
        try {
          const response = await getUserNameSearch(value, currUserPage, limitForUser);
          if (response) {
            setLoading(false);
            setUserSuggestions(response.users); // Set suggestions or an empty array if no response
            setTotalPages(response.pagination?.totalPages);
          } else {
            setUserSuggestions([]);
            setTotalPages(1);
          }
        } catch (error) {
          console.error('Error fetching suggestions:', error);
        }
      }, 300), // Debounce delay
    [currUserPage]
  );
  const memoizedFetchUserSuggestions = useCallback(
    (value) => {
      fetchUserSuggestions(value);
      setSearchRecipients(value);
    },
    [fetchUserSuggestions] // Explicitly include fetchUserSuggestions as a dependency
  );

  const handleAddRecipients = useCallback(
    (selected) => {
      // setSearchRecipients('');
      onAddRecipients(selected);
    },
    [onAddRecipients]
  );

  const handleLoadMore = (e) => {
    setLoading(true);
    setCurrUserPage((prev) => prev + 1);
    fetchUserSuggestions(searchRecipients);
  };

  // const handelcreat=async()=>{
  //   if(data.userIds.length>=2){

  //   }

  // }

  return (
    <>
      <Typography variant="subtitle2" sx={{ color: 'text.primary', mr: 2 }}>
        To:
      </Typography>

      <Autocomplete
        sx={{ minWidth: { xs: 180, md: 320 } }}
        multiple
        freeSolo
        limitTags={1}
        popupIcon={null}
        defaultValue={[]} // Change to null for single selection
        disableCloseOnSelect
        noOptionsText={<SearchNotFound query={searchRecipients} />}
        onChange={(event, newValue) => handleAddRecipients(newValue)}
        onInputChange={(event, newValue) => {
          if (newValue.length === 0) {
            setTotalPages(1);
            setCurrUserPage(1);
          }
          memoizedFetchUserSuggestions(newValue);
        }}
        options={UserListArr}
        getOptionLabel={(recipient) => recipient?.UserProfile?.firstName || recipient?.phone}
        isOptionEqualToValue={(option, value) => option.userId === value.userId}
        renderInput={(params) => <TextField {...params} placeholder="+ Recipients" />}
        renderOption={(props, recipient, { selected }) => (
          <li {...props} key={recipient.userId}>
            <Box
              key={recipient.userId}
              sx={{
                mr: 1,
                width: 32,
                height: 32,
                overflow: 'hidden',
                borderRadius: '50%',
                position: 'relative',
              }}
            >
              {/* {recipient?.userId}
              {selected?.length} */}
              <Avatar
                alt={recipient?.UserProfile?.firstName}
                src={recipient?.UserProfile?.userProfileImageDetails?.preview}
                sx={{ width: 1, height: 1 }}
              />
              <Stack
                alignItems="center"
                justifyContent="center"
                sx={{
                  top: 0,
                  left: 0,
                  width: 1,
                  height: 1,
                  opacity: 0,
                  position: 'absolute',
                  bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
                  transition: (theme) =>
                    theme.transitions.create(['opacity'], {
                      easing: theme.transitions.easing.easeInOut,
                      duration: theme.transitions.duration.shorter,
                    }),
                  ...(selected && {
                    opacity: 1,
                    color: 'primary.main',
                  }),
                }}
              >
                <Iconify icon="eva:checkmark-fill" />
              </Stack>
            </Box>
            {recipient?.UserProfile?.firstName || recipient?.phone}{' '}
            {(recipient?.UserProfile?.firstName && recipient?.UserProfile?.lastName) || ''}
          </li>
        )}
        renderTags={(selected, getTagProps) =>
          selected.map((recipient, index) => (
            <Chip
              {...getTagProps({ index })}
              key={recipient.userId}
              label={recipient?.UserProfile?.firstName || recipient?.phone}
              avatar={
                <Avatar
                  alt={recipient?.userName}
                  src={recipient?.UserProfile?.userProfileImageDetails?.preview}
                />
              }
              size="small"
              variant="soft"
            />
          ))
        }
      />

      {totalPages !== 1 ? (
        <LoadingButton
          onClick={(e) => handleLoadMore(e)}
          loading={loading}
          disabled={totalPages < currUserPage}
          loadingIndicator="Loading…"
          variant="contained"
        >
          {totalPages >= currUserPage ? 'Load More' : 'The End'}
        </LoadingButton>
      ) : null}
    </>
  );
}

ChatHeaderCompose.propTypes = {
  onAddRecipients: PropTypes.func,
};
