import PropTypes from 'prop-types';

import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import InputAdornment from '@mui/material/InputAdornment';

import { JOB_DISTANCE_OPTIONS } from 'src/_mock';

// ----------------------------------------------------------------------

export default function JobDistanceSelect({ label, error, helperText, placeholder, ...other }) {
  const multiple = other?.multiple;

  return (
    <Autocomplete
      autoHighlight={!multiple}
      disableCloseOnSelect={multiple}
      renderOption={(props, option) => {
        const jobDistance = getDistance(option);

        if (!jobDistance.label) {
          return null;
        }

        return (
          <li {...props} key={jobDistance.label}>
            {jobDistance.label}
          </li>
        );
      }}
      renderInput={(params) => {
        const jobDistance = getDistance(params.inputProps.value);

        const baseField = {
          ...params,
          label,
          placeholder,
          error: !!error,
          helperText,
          inputProps: {
            ...params.inputProps,
            autoComplete: 'new-password',
          },
        };

        if (multiple) {
          return (
            <TextField
              {...baseField}
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
          );
        }

        return (
          <TextField
            {...baseField}
            InputProps={{
              ...params.InputProps,
              startAdornment: (
                <InputAdornment
                  position="start"
                  sx={{
                    ...(!jobDistance.label && {
                      display: 'none',
                    }),
                  }}
                />
              ),
            }}
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
        );
      }}
      {...other}
    />
  );
}

JobDistanceSelect.propTypes = {
  error: PropTypes.bool,
  label: PropTypes.string,
  helperText: PropTypes.node,
  placeholder: PropTypes.string,
};

// ----------------------------------------------------------------------

export function getDistance(inputValue) {
  const option = JOB_DISTANCE_OPTIONS.filter((distance) => distance.label === inputValue)[0];

  return {
    ...option,
  };
}
