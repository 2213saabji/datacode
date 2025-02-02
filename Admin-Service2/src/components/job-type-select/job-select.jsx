import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

// ----------------------------------------------------------------------

export default function JobTypeSelect({
  label,
  error,
  helperText,
  placeholder,
  options,
  value,
  onChange,
  ...other
}) {
  const multiple = other?.multiple;

  return (
    <Autocomplete
      multiple={multiple}
      options={options}
      value={value}
      onChange={(event, newValue) => onChange(event, newValue)}
      disableCloseOnSelect={multiple}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={placeholder}
          error={!!error}
          helperText={helperText}
          sx={{
            '& label': {
              color: '#000', // Default label color
            },
            '& label.Mui-focused': {
              color: '#000', // Focused label color
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: '#000', // Color of underline when focused
            },
            '& .MuiInputBase-input::placeholder': {
              color: '#000', // Placeholder color
              opacity: 1, // Ensure the placeholder color is fully opaque
            },
          }}
        />
      )}
      {...other}
    />
  );
}

JobTypeSelect.propTypes = {
  label: PropTypes.string,
  error: PropTypes.bool,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.string),
  value: PropTypes.oneOfType([
    PropTypes.string, // for single selection
    PropTypes.arrayOf(PropTypes.string), // for multiple selection
  ]),
  onChange: PropTypes.func,
};

JobTypeSelect.defaultProps = {
  options: [],
  value: [],
  onChange: () => {},
};
