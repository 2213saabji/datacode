import * as Yup from 'yup';
// import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { createSuggestion } from 'src/api/suggestion';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function FeedbackNewEditForm() {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();

  // Schema

  const Suggestionschema = Yup.object().shape({
    feedbackMessage: Yup.string().required('suggestion is required'),
  });

  const defaultValues = useMemo(
    () => ({
      feedbackMessage: '',
    }),
    []
  );

  const methods = useForm({
    resolver: yupResolver(Suggestionschema),
    defaultValues,
  });

  // for suggesion from

  const { handleSubmit, reset } = methods;

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues, reset]);

  //  Suggesion Creation function

  const onSubmitFeedback = handleSubmit(async (data) => {
    try {
      const response = await createSuggestion(data, user.userId);

      if (response) {
        enqueueSnackbar('Suggestion submitted successfully', { variant: 'success' });

        navigate('/dashboard');
      } else {
        enqueueSnackbar('Failed to create Suggestion', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error submitting Suggestion :', error);
      enqueueSnackbar('An error occurred while creating Suggestion', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmitFeedback}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Card sx={{ pt: 3, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Stack spacing={2}>
                <Typography variant="h5">PLEASE GIVE YOUR SUGGESTION TO IMPROVE OUR APP</Typography>
                <RHFTextField
                  name="feedbackMessage"
                  label="Enter your suggestion here"
                  multiline
                  rows={5}
                  variant="outlined"
                  InputProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                  InputLabelProps={{
                    style: {
                      color: theme.palette.mode === 'light' ? 'black' : 'white',
                    },
                  }}
                />
                <LoadingButton
                  type="submit"
                  variant="contained"
                  sx={{
                    mt: 2,
                    fontWeight: 1,
                    background: '#078dee',
                    fontSize: 15,
                    borderRadius: 50,
                  }}
                >
                  Submit
                </LoadingButton>
              </Stack>
            </Box>
          </Card>
        </Grid>
        <Grid
          item
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            mt: { xs: 5, sm: 5, md: 0 },
          }}
        >
          <Box
            component="img"
            src="/assets/images/Feedback/suggestionImg.jpg"
            alt="Designer"
            sx={{
              width: '100%',
              maxWidth: 250,
              height: 'auto',
              cursor: 'pointer',
              borderRadius: '10px',
              transform: 'scale(1.2)',
              margin: '0 auto',
            }}
          />
        </Grid>
      </Grid>
    </FormProvider>
  );
}

// FeedbackNewEditForm.propTypes = {
//   currentVoter: PropTypes.object,
// };
