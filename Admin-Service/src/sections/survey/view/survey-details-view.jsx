import PropTypes from 'prop-types';

import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
// import { Link } from 'react-router-dom';

import { Radio, useTheme, RadioGroup, Typography, FormControlLabel } from '@mui/material';

import { paths } from 'src/routes/paths';

import Label from 'src/components/label';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// ----------------------------------------------------------------------

export default function SurveyView({ surveyDetails }) {
  const theme = useTheme();

  const renderPost = (
    <>
      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (them) => `solid 1px ${them.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'All Survey',
              href: paths.dashboard.survey.root,
            },
            {
              name: 'Details',
              href: paths.survey,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'start', sm: 'center' }}
              sx={{ mt: 2, width: '100%' }}
            >
              <Typography sx={{ mr: { sm: 1 }, mb: { xs: 1, sm: 0 }, minWidth: 180 }}>
                Title:
              </Typography>
              <Typography sx={{ ml: { sm: 1 } }}> {surveyDetails?.surveyTitle}</Typography>
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'start', sm: 'center' }}
              sx={{ mt: 2, width: '100%' }}
            >
              <Typography sx={{ mr: { sm: 1 }, mb: { xs: 1, sm: 0 }, minWidth: 180 }}>
                Status:
              </Typography>
              {surveyDetails?.surveyStatus === 'Open' ? (
                <Label color="success" sx={{ ml: { sm: 1 } }}>
                  Open
                </Label>
              ) : (
                <Label sx={{ ml: { sm: 1 } }} color="error">
                  Closed
                </Label>
              )}
            </Stack>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              alignItems={{ xs: 'start', sm: 'center' }}
              sx={{ mt: 2, width: '100%' }}
            >
              <Typography sx={{ mr: { sm: 1 }, mb: { xs: 1, sm: 0 }, minWidth: 180 }}>
                Description:
              </Typography>
              <Typography sx={{ ml: { sm: 1 } }}>{surveyDetails?.surveyDescription}</Typography>
            </Stack>

            <Stack direction="column" alignItems="start" sx={{ mt: 2, width: '100%' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Questions:</Typography>
              <Stack
                direction="column"
                alignItems="start"
                sx={{
                  pl: 2,
                  pr: 1,
                  py: 1,
                  '&:not(:last-of-type)': {
                    borderBottom: (them) => `dashed 1px ${them.palette.divider}`,
                  },
                  // bgcolor: theme.palette.divider,
                  mt: 2,
                  width: '100%',
                  borderRadius: 2,
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                {surveyDetails?.surveyQuestionBanks?.map((que, index) => (
                  <Stack key={index} sx={{ flexGrow: 1, mb: 2, width: '100%' }}>
                    <Typography variant="subtitle2" mb={1}>
                      Q.{index + 1} : {que.questionDescription}
                    </Typography>

                    <RadioGroup
                      sx={{
                        pl: 1,
                        mb: 2,
                        width: '100%',
                        bgcolor: theme.palette.primary.light,
                        borderRadius: 1,
                      }}
                    >
                      {que?.options?.map((option, i) => (
                        <FormControlLabel
                          key={i}
                          value={option}
                          control={<Radio disabled sx={{ color: 'black' }} />}
                          label={<Typography sx={{ ml: 1 }}>{option}</Typography>}
                        />
                      ))}
                    </RadioGroup>
                  </Stack>
                ))}
              </Stack>
            </Stack>
          </Stack>
          {/* <Divider sx={{ mt: 5, mb: 2 }} /> */}
        </Stack>
      </Container>
    </>
  );
  return <>{surveyDetails && renderPost}</>;
}

SurveyView.propTypes = {
  surveyDetails: PropTypes.object,
};
