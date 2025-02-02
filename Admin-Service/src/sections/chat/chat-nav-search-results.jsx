import PropTypes from 'prop-types';

import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import AvatarGroup from '@mui/material/AvatarGroup';
import ListItemButton from '@mui/material/ListItemButton';

import SearchNotFound from 'src/components/search-not-found';

// ----------------------------------------------------------------------

export default function ChatNavSearchResults({ query, results, onClickResult }) {
  const totalResults = results.length;

  const notFound = !totalResults && !!query;

  return (
    <>
      <Typography
        variant="h6"
        sx={{
          px: 2.5,
          mb: 2,
        }}
      >
        Contacts ({totalResults})
      </Typography>

      {notFound ? (
        <SearchNotFound
          query={query}
          sx={{
            p: 3,
            mx: 'auto',
            width: `calc(100% - 40px)`,
            bgcolor: 'background.neutral',
          }}
        />
      ) : (
        <>
          {results.map((result, idx) => (
            <ListItemButton
              key={idx}
              onClick={() => onClickResult(result)}
              sx={{
                px: 2.5,
                py: 1.5,
                typography: 'subtitle2',
              }}
            >
              {result.group ? (
                <AvatarGroup variant="compact" sx={{ width: 48, height: 48, mr: 2 }}>
                  {result?.participants?.slice(0, 2).map((participant) => (
                    <Avatar
                      key={participant.userId}
                      alt={participant?.phone}
                      src={participant?.UserProfile?.userProfileImageDetails?.preview}
                    />
                  ))}
                </AvatarGroup>
              ) : (
                <Avatar
                  alt={result.name}
                  src={
                    result.participants &&
                    result?.participants[0]?.UserProfile?.userProfileImageDetails?.preview
                  }
                  sx={{ mr: 2 }}
                />
              )}

              {result?.name}
            </ListItemButton>
          ))}
        </>
      )}
    </>
  );
}

ChatNavSearchResults.propTypes = {
  query: PropTypes.string,
  results: PropTypes.array,
  onClickResult: PropTypes.func,
};
