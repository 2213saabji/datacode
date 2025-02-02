// import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { status } from 'nprogress';

// import { useBoolean } from 'src/hooks/use-boolean';
import { useGetAllSurvey } from 'src/api/survey';

// import { CreateSurvey } from 'src/api/survey';
// import { countries } from 'src/assets/data';
// import { _surveyNew, _pastSurvey } from 'src/_mock';
// import { SURVEY_FORM_OPTIONS } from 'src/_mock/_blog';
// ----------------------------------------------------------------------

// import Iconify from 'src/components/iconify';
// import { useSnackbar } from 'src/components/snackbar';
// import FormProvider, {
//   // RHFEditor,
//   // RHFSwitch,
//   // RHFTextField,
//   RHFRadioGroup,
//   // RHFMultiCheckbox,
//   // RHFAutocomplete,
// } from 'src/components/hook-form';

import { useAuthContext } from 'src/auth/hooks';

import BookingPast from './booking-past';
import BookingNewest from './booking-newest';

export default function JobNewEditForm() {
  const resData = useGetAllSurvey();

  const { user } = useAuthContext();

  const filteredData = resData.survey.filter((item) =>
    item?.userIdsForSurvey?.includes(user.userId)
  );
  // console.log('filteredData------->', filteredData)
  // console.log('resData------->', resData)

  // const mdUp = useResponsive('up', 'md');

  const renderCarausal = (
    <>
      <Grid xs={12}>
        <BookingNewest title="Newest Surveys" res_list={filteredData} />
      </Grid>

      <Grid xs={12}>
        <BookingPast title="Past Surveys" res_list={filteredData} />
      </Grid>
    </>
  );

  return <Stack spacing={3}>{renderCarausal}</Stack>;
}

JobNewEditForm.propTypes = {};
