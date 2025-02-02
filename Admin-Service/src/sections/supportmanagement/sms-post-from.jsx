import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';

import { useParams } from 'src/routes/hooks';

import { createRemark } from 'src/api/sms';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
// ----------------------------------------------------------------------

export default function SmsCommentForm() {
  const params = useParams();

  const { id } = params;
  // console.log(id)
  const { enqueueSnackbar } = useSnackbar();
  const CommentSchema = Yup.object().shape({
    remark_description: Yup.string().required('Comment is required'),
    remark_updated_by: Yup.string().required('Name is required'),
  });

  const defaultValues = {
    remark_description: '',
    remark_updated_by: '',
    issue_id: id,
  };

  const methods = useForm({
    resolver: yupResolver(CommentSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createRemark(data);

      if (response) {
        enqueueSnackbar('We will update you soon', { variant: 'success' });
        //   navigate(`/dashboard/sms`);
        reset();
      } else {
        enqueueSnackbar('Failed to create Remark', { variant: 'error' });
      }
    } catch (error) {
      console.error(error);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={3}>
        <RHFTextField
          name="remark_description"
          placeholder="Write some of your comments..."
          multiline
          rows={4}
        />
        {/* <RHFTextField
          name="remark_updated_by"
          placeholder="Write some of your comments..."
         
        /> */}

        <Stack spacing={3} direction="row" alignItems="center">
          <RHFTextField name="remark_updated_by" placeholder="Write your name..." />
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            Post comment
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
}
