import * as Yup from 'yup';
import PropTypes from 'prop-types'; // Import PropTypes
import { useForm } from 'react-hook-form';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

// import { useAuthContext } from 'src/auth/hooks';
import {
  UpdateQuestion,
  // AddSurveyQuestion,
  useGetSurveyResponse,
} from 'src/api/survey';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

function JobAddQuestions({
  setOpen,
  setValueParent,
  parentValue,
  surveyQuestions,
  surveyyId,
  id,
  updateQue,
}) {
  const [selected, setSelected] = useState([]);

  // console.log('surveyId------->', surveyId)
  // console.log('parentValue----->', parentValue)

  const theme = useTheme();

  const {
    // data: surveyResponse,
    refetch: refetchSurveyResponse,
  } = useGetSurveyResponse(surveyyId);

  // const {user} = useAuthContext()

  const QuestionSchema = Yup.object().shape({
    questionDescription: Yup.string().required('surveyName is required'),
    options: Yup.array().max(5, 'Max we can add 5 options'),
  });

  const defaultValuesQuestions = useMemo(
    () => ({
      questionDescription: (updateQue && updateQue.questionDescription) || '',
      options: (updateQue && updateQue.questionDescription) || [],
    }),
    [updateQue]
  );

  const methodsQuestion = useForm({
    resolver: yupResolver(QuestionSchema),
    defaultValuesQuestions,
  });

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methodsQuestion;

  const value = watch();

  // console.log('value---->', value)

  useEffect(() => {
    setValue('options', selected);
  }, [selected, setValue]);

  useEffect(() => {
    if (updateQue && updateQue.questionDescription && updateQue.options) {
      setSelected(updateQue.options);
      setValue('questionDescription', updateQue.questionDescription);
    }
  }, [updateQue, setValue]);

  const onSubmitQuestion = handleSubmit(() => {
    setValueParent('surveyQuestions', [...parentValue.surveyQuestions, value]);
    setOpen(false);
  });

  // const onSubmitQuestionDel = handleSubmit(() => {
  //   setValueParent('surveyQuestions', [...parentValue.surveyQuestions, value])
  //   setOpen(false);
  // });

  // const onSubmitQuestionAdd = handleSubmit(async (data) => {

  //   const numberOfQuestionOption = data.options.length;
  //   const newData = {
  //     userId: user.userId,
  //     questionDescription: data.questionDescription,
  //     numberOfQuestionOption,
  //     options: data.options
  //   }
  //   console.log('data----------->', data)
  //   try {
  //     const response = await AddSurveyQuestion(surveyyId, newData);
  //     if (response) {
  //       enqueueSnackbar('Question added successfully', { variant: 'success' });
  //       refetchSurveyResponse()
  //       setOpen(false);
  //     }
  //   } catch (error) {
  //     // Handle errors here if necessary
  //     console.error('Error updating Question:', error);
  //     enqueueSnackbar('An error occurred while adding Question', { variant: 'error' });
  //   }
  // });

  const onSubmitQuestionUpdate = handleSubmit(async (data) => {
    const numberOfQuestionOption = data.options.length;
    const newData = {
      surveyId: surveyyId,
      questionDescription: data.questionDescription,
      numberOfQuestionOption,
      options: data.options,
    };
    // console.log('data----------->', data)
    try {
      const response = await UpdateQuestion(updateQue.questionId, newData);
      if (response) {
        enqueueSnackbar('Question updated successfully', { variant: 'success' });
        refetchSurveyResponse();
        setOpen(false);
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Question:', error);
      enqueueSnackbar('An error occurred while Updating Question', { variant: 'error' });
    }
  });

  // const onAddOptions = (val) => {
  //   setValue('options', (prev) => [...prev, value.val]);
  // };

  // added by Pankaj
  // function handleAddOption(tags) {
  //   setSelected(tags);
  //   // setValue('options', (prev) => tags)
  // }

  const handleAddOption = useCallback((even, newValue) => {
    // console.log('event-->', even, newValue)
    setSelected(newValue);
  }, []);

  return (
    <Box
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        borderRadius: '18px',
        boxShadow: 24,
        p: 4,
      }}
    >
      <FormProvider methods={methodsQuestion}>
        <Typography variant="h6" sx={{ textAlign: 'center' }}>
          Add your question here
        </Typography>
        <RHFTextField
          sx={{ mt: 2, mb: 2 }}
          name="questionDescription"
          label="Enter Question..."
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
        {/* <RHFTextField sx={{ mt: 2 }} name="options" label="Enter Options here..." /> */}
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        {/* <TagsInput
          value={selected}
          onChange={(tag) => handleAddOption(tag)}
          name="options"
          placeHolder="Enter Options..."
        // style={{ color: theme.palette.mode === 'light' ? 'black' : 'white' }}
        // inputStyle={{ color: theme.palette.mode === 'light' ? 'black' : 'white' }}
        /> */}

        <Autocomplete
          multiple
          freeSolo
          name="options"
          value={selected}
          options={[]}
          onChange={handleAddOption}
          renderTags={(val, getTagProps) =>
            val.map((option, index) => (
              <Chip
                variant="outlined"
                label={option}
                {...getTagProps({ index })}
                style={{ margin: 2 }}
              />
            ))
          }
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              label="Options..."
              InputLabelProps={{
                style: {
                  color: theme.palette.mode === 'light' ? 'black' : 'white',
                },
              }}
            />
          )}
          // sx={{ width: 500 }}
        />

        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          onClick={updateQue ? onSubmitQuestionUpdate : onSubmitQuestion}
          sx={{ float: 'right', mt: 2, backgroundColor: theme.palette.primary.main }}
        >
          Done
        </LoadingButton>
      </FormProvider>
    </Box>
  );
}

export default JobAddQuestions;

JobAddQuestions.propTypes = {
  setOpen: PropTypes.func.isRequired,
  setValueParent: PropTypes.func.isRequired,
  parentValue: PropTypes.object.isRequired,
  surveyQuestions: PropTypes.object.isRequired,
  id: PropTypes.string.isRequired,
  surveyyId: PropTypes.string,
  updateQue: PropTypes.object,
};
