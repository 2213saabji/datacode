import * as Yup from 'yup';
import PropTypes from 'prop-types'; // Import PropTypes
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { TagsInput } from 'react-tag-input-component';

import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

function JobAddQuestions({ setOpen, setValueParent, parentValue }) {
  const [selected, setSelected] = useState([]);

  const QuestionSchema = Yup.object().shape({
    questionDescription: Yup.string().required('surveyName is required'),
    options: Yup.array().max(5, 'Max we can add 5 options'),
  });

  const defaultValuesQuestions = useMemo(
    () => ({
      questionDescription: '',
      options: [],
    }),
    []
  );

  const methodsQuestion = useForm({
    resolver: yupResolver(QuestionSchema),
    defaultValuesQuestions,
  });

  const {
    handleSubmit: handleSubmitQuestion,
    setValue,
    watch,
    formState: { isSubmitting },
  } = methodsQuestion;

  const value = watch();

  useEffect(() => {
    setValue('options', selected);
  }, [selected, setValue]);

  const onSubmitQuestion = handleSubmitQuestion(() => {
    setValueParent('surveyQuestions', [...parentValue.surveyQuestions, value]);
    setOpen(false);
  });
  // const onAddOptions = (val) => {
  //   setValue('options', (prev) => [...prev, value.val]);
  // };

  // added by Pankaj
  function handleAddOption(tags) {
    setSelected(tags);
    // setValue('options', (prev) => tags)
  }

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
        <RHFTextField sx={{ mt: 2, mb: 2 }} name="questionDescription" label="Enter Question..." />
        {/* <RHFTextField sx={{ mt: 2 }} name="options" label="Enter Options here..." /> */}
        {/* <pre>{JSON.stringify(selected)}</pre> */}
        <TagsInput
          value={selected}
          onChange={(tag) => handleAddOption(tag)}
          name="options"
          placeHolder="Enter Options..."
          style={{ '::placeholder': { fontSize: '10px' } }}
        />

        <LoadingButton
          variant="contained"
          loading={isSubmitting}
          onClick={onSubmitQuestion}
          sx={{ float: 'right', mt: 2 }}
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
};
