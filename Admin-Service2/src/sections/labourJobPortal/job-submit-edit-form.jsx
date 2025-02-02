// import PropTypes from 'prop-types';
// import { useForm } from 'react-hook-form';

// import Chip from '@mui/material/Chip';

// import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
// import Grid from '@mui/material/Unstable_Grid2';

// import { useResponsive } from 'src/hooks/use-responsive';

// import { status } from 'nprogress';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { CreateSurvey } from 'src/api/survey';
// import { SURVEY_FORM_OPTIONS } from 'src/_mock/_blog';
import {
  _surveyNew,
  //  _pastSurvey
} from 'src/_mock';
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

import BookingSubmit from './booking-submit';

export default function JobSubmitEditForm() {
  // const mdUp = useResponsive('up', 'md');

  const renderCarausal = (
    <Grid xs={12}>
      <BookingSubmit title="Submited Surveys" list={_surveyNew} />
    </Grid>
  );

  return <Stack spacing={3}>{renderCarausal}</Stack>;
}

JobSubmitEditForm.propTypes = {};
