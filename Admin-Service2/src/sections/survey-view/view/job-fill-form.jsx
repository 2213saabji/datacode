import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  useMemo,
  // useState,
  useEffect,
} from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Switch from '@mui/material/Switch';
import { CardContent } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import CardHeader from '@mui/material/CardHeader';
// import Grid from '@mui/material/Unstable_Grid2';
// import Grid from '@mui/material/Unstable_Grid2';
// import ButtonBase from '@mui/material/ButtonBase';
// import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';
import {
  // UpdateStatus,
  AddSurveyResponse,
  useGetSurveyResponse,
} from 'src/api/survey';

import Markdown from 'src/components/markdown';
import { useSettingsContext } from 'src/components/settings';

// import { status } from 'nprogress';

// import { useBoolean } from 'src/hooks/use-boolean';
// import Container from '@mui/material/Container';

// import { CreateSurvey } from 'src/api/survey';
// import { countries } from 'src/assets/data';
// import { _pastSurvey,_surveyNew } from 'src/_mock';
// import { SURVEY_FORM_OPTIONS } from 'src/_mock/_blog';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
// ----------------------------------------------------------------------

// import {
//   _pastSurvey,
//   _surveyNew,
//   _roles,
//   _analyticTasks,
// } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  // RHFEditor,
  // RHFSwitch,
  // RHFTextField,
  RHFRadioGroup,
} from 'src/components/hook-form';

export default function JobFillForm({ currentJob, id }) {
  const { user } = useAuthContext();

  const settings = useSettingsContext();
  const { survey } = useGetSurveyResponse(id);

  const survayDetails = useMemo(() => survey || [], [survey]);

  const router = useRouter();

  const mdUp = useResponsive('up', 'md');

  const { enqueueSnackbar } = useSnackbar();

  // schema
  const NewJobSchema = useMemo(() => {
    const schemaShape = {};
    survayDetails?.surveyQuestionBanks?.forEach((question) => {
      schemaShape[`response-${question.questionId}`] =
        Yup.string().required('This field is required');
    });
    return Yup.object().shape(schemaShape);
  }, [survayDetails]);

  // default value
  const defaultValues = useMemo(
    () => ({
      userId: user.userId,
      responses: [],
    }),
    [user]
  );

  const methods = useForm({
    resolver: yupResolver(NewJobSchema),
    defaultValues,
  });

  const {
    reset,
    control,
    handleSubmit,
    // watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  // const value = watch();

  useEffect(() => {
    if (currentJob) {
      reset(defaultValues);
    }
  }, [currentJob, defaultValues, reset]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await AddSurveyResponse(id, data);
      // console.log('response------>', response)
      if (response) {
        if (response.message === 'Survey Response Created Successfully!') {
          enqueueSnackbar('Successfully Submitted');
          router.push(paths.dashboard.fill_survey.new);
        } else if (response.message === 'User has already submitted a response for this survey') {
          enqueueSnackbar('Survey already submitted', { variant: 'error' });
        }

        // // const responseStatus = await UpdateStatus(id, { surveyId : id, status : 'closed' } );
      } else if (user.userId === 1) {
        enqueueSnackbar('Admin cannot fill surveys');
      } else {
        enqueueSnackbar('some error occured', { variant: 'error' });
      }
    } catch (error) {
      console.error(error.response.data.message);
      //  if (error.AxiosError.response.data.message === 'Unauthorized: Admin cannot fill surveys') {
      //   enqueueSnackbar("Admin cannot fill surveys");
      // }
    }
  });

  const handleRadioChange = (questionId, val) => {
    const currentResponses = methods.getValues('responses') || [];
    const updatedResponses = currentResponses.filter(
      (resp) => resp.surveyQuestionId !== questionId
    );
    updatedResponses.push({ surveyQuestionId: questionId, response: val });
    setValue('responses', updatedResponses);
  };

  const renderDetails = (
    <Grid xs={12} md={8}>
      <Card>
        {!mdUp && <CardHeader title="Details" />}

        <Stack spacing={3} sx={{ p: 3 }}>
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, fontWeight: 'bold' }}>Survey Name :</Typography>
            <Typography sx={{ ml: 1 }}>{survayDetails?.surveyName}</Typography>
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, fontWeight: 'bold' }}>Survey Title :</Typography>
            <Typography sx={{ ml: 1 }}>{survayDetails?.surveyTitle}</Typography>
          </Stack>

          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, fontWeight: 'bold' }}>Survey Description :</Typography>
            <Markdown sx={{ ml: 1 }}>{survayDetails?.surveyDescription}</Markdown>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Fill the Survey"
        links={[
          {
            name: 'All Survey',
            href: paths.dashboard.fill_survey.new,
          },
          {
            name: `${survayDetails?.surveyName}`,
            href: paths.dashboard.fill_survey,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stack spacing={3}>
        {renderDetails}
        <FormProvider methods={methods} onSubmit={onSubmit}>
          <Grid container spacing={3}>
            <Grid xs={12} md={8}>
              <Card sx={{ p: 3 }}>
                <CardHeader sx={{ p: 0 }} title="Survey Questions" />
                <CardContent sx={{ p: 0 }}>
                  {survayDetails?.surveyQuestionBanks?.map((question, idx) => {
                    const options = question.options.map((option) => ({
                      value: option,
                      label: option,
                    }));

                    return (
                      <Stack spacing={2} sx={{ p: 3 }} key={question.questionId}>
                        <Typography sx={{ fontWeight: 'bold' }}>
                          {idx + 1}. {question.questionDescription}
                        </Typography>
                        <Controller
                          name={`response-${question.questionId}`}
                          control={control}
                          render={({ field }) => (
                            <RHFRadioGroup
                              column
                              // spacing={0}
                              {...field}
                              options={options}
                              onChange={(e) => {
                                field.onChange(e);
                                handleRadioChange(question.questionId, e.target.value);
                              }}
                            />
                          )}
                        />
                      </Stack>
                    );
                  })}
                </CardContent>
                <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    Submit
                  </LoadingButton>
                </Stack>
              </Card>
            </Grid>
          </Grid>
        </FormProvider>
      </Stack>
    </Container>
  );
}

JobFillForm.propTypes = {
  currentJob: PropTypes.object,
  id: PropTypes.string,
};
