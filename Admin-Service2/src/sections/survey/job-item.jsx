import PropTypes from 'prop-types';

// import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
// import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { fDate } from 'src/utils/format-time';
// import { fCurrency } from 'src/utils/format-number';

import { useState } from 'react';
import { enqueueSnackbar } from 'notistack';

import { Switch, FormControlLabel } from '@mui/material';

import { UpdateStatus, useGetAllSurvey } from 'src/api/survey';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function JobItem({ survey, onView, onEdit, onDelete }) {
  const popover = usePopover();

  const {
    surveyId,
    surveyTitle,
    // surveyDescription,
    // created_at,
    surveyStatus,
    // surveyQuestionBanks,
    startTime,
    endTime,
  } = survey;

  const { refetch: refetchSurveyResponse } = useGetAllSurvey();

  const [toggle, settoggle] = useState(surveyStatus === 'Open');

  const handleChange = async (event) => {
    const newStatus = event.target.checked ? 'activate' : 'deactivate';
    settoggle(event.target.checked);

    const data = {
      action: newStatus,
      surveyId,
    };
    try {
      const responseStatus = await UpdateStatus(data);
      if (responseStatus) {
        enqueueSnackbar('Survey Status Updated Successfully');
        refetchSurveyResponse();
      } else {
        enqueueSnackbar('Survey cannot be activated outside its time window.', {
          variant: 'error',
        });
      }
    } catch (error) {
      console.error('Error updating survey status:', error);
    }
  };

  return (
    <>
      <Card sx={{ height: 200, position: 'relative' }}>
        <IconButton onClick={popover.onOpen} sx={{ position: 'absolute', top: 8, right: 8 }}>
          <Iconify icon="eva:more-vertical-fill" />
        </IconButton>

        <Stack sx={{ p: 3, pb: 2, height: '100%', boxSizing: 'border-box' }}>
          <Stack direction="row" sx={{ mb: 2 }}>
            {surveyStatus === 'Open' && <Label color="success">{surveyStatus}</Label>}
            {surveyStatus === 'Closed' && <Label color="error">{surveyStatus}</Label>}
          </Stack>

          <ListItemText
            sx={{ mb: 1 }}
            primary={
              <Link
                component={RouterLink}
                href={paths.dashboard.survey.details(surveyId)}
                color="inherit"
              >
                {surveyTitle}
              </Link>
            }
            secondary={`Posted date: ${fDate(startTime)} | Expiry date: ${fDate(endTime)}`}
            primaryTypographyProps={{
              typography: 'subtitle1',
            }}
            secondaryTypographyProps={{
              mt: 1,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
          <Stack direction="row" alignItems="center" sx={{ typography: 'caption' }}>
            <FormControlLabel
              control={<Switch checked={toggle} onChange={handleChange} />}
              sx={{}}
            />
          </Stack>
        </Stack>
      </Card>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
            onView();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
            onEdit();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <MenuItem
          onClick={() => {
            onDelete(survey.surveyId);
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>
    </>
  );
}

JobItem.propTypes = {
  survey: PropTypes.object,
  onDelete: PropTypes.func,
  onEdit: PropTypes.func,
  onView: PropTypes.func,
};
