import PropTypes from 'prop-types';

import Markdown from 'src/components/markdown';

// ----------------------------------------------------------------------

export default function WorkDetailsDescription({ description }) {
  return (
    <Markdown
      children={description}
      sx={{
        p: 3,
        '& p, li, ol': {
          typography: 'body2',
        },
        '& ol': {
          p: 0,
          display: { md: 'flex' },
          listStyleType: 'none',
          '& li': {
            '&:first-of-type': {
              minWidth: 240,
              mb: { xs: 0.5, md: 0 },
            },
          },
        },
      }}
    />
  );
}

WorkDetailsDescription.propTypes = {
  description: PropTypes.string,
};
