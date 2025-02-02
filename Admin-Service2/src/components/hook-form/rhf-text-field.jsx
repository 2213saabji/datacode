import PropTypes from 'prop-types';
import { Controller, useFormContext } from 'react-hook-form';

import TextField from '@mui/material/TextField';

// ----------------------------------------------------------------------

export default function RHFTextField({ name, helperText, type, ...other }) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          type={type}
          value={type === 'number' && field.value === 0 ? '' : field.value}
          onChange={(event) => {
            if (type === 'number') {
              field.onChange(Number(event.target.value));
            } else {
              field.onChange(event.target.value);
            }
          }}
          error={!!error}
          helperText={error ? error?.message : helperText}
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
          {...other}
        />
      )}
    />
  );
}

RHFTextField.propTypes = {
  helperText: PropTypes.object,
  name: PropTypes.string,
  type: PropTypes.string,
};
