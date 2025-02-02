// import Stack from '@mui/material/Stack';
import PropTypes from 'prop-types';
// import { Link } from 'react-router-dom';

// import { Box } from '@mui/system';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material';
// import Button from '@mui/material/Button';
// import { Card, CardMedia, Typography, CardContent } from '@mui/material';
// all get functions are kept here
import { RouterLink } from 'src/routes/components';

import { useTranslate } from 'src/locales';

import {
  useGetOtps,
  useGetUsers,
  useGetWards,
  useGetTrips,
  useGetVoters,
  useGetBooths,
  useGetClaims,
  useGetPolling,
  useGetDrivers,
  useGetVehicles,
  useGetProjects,
  useGetElections,
  useGetEmailOtps,
  useGetCandidates,
  useGetMaleVoters,
  useGetComplaints,
  useGetYouthVoters,
  useGetFemaleVoters,
  useGetElderlyVoters,
  useGetActiveSurveys,
  useGetClosedSurveys,
  useGetVoterJobCounts,
  useGetComplaintsClosed,
  useGetComplaintsActive,
  useGetYouthGenderCounts,
  useGetVoterReligionCounts,
  useGetComplaintsInprogress,
} from 'src/api/analytic';
// get functions ends

// import { paths } from 'src/routes/paths';

// import { _appFeatured } from 'src/_mock';
// import { useAuthContext } from 'src/auth/hooks';
// import { SeoIllustration } from 'src/assets/illustrations';

import { useSettingsContext } from 'src/components/settings';

// import AppWelcome from '../app-welcome';
// import { useNavigate } from 'react-router-dom';
import { paths } from 'src/routes/paths';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import AppFeatured from '../app-featured';
import AppAreaInstalled from '../app-area-installed';
import AppWidgetSummary from '../app-widget-summary';
import AppCurrentDownload from '../app-current-download';
// ----------------------------------------------------------------------

export default function OverviewAppList({ id }) {
  const { t } = useTranslate();
  //   const { user } = useAuthContext();
  // all data are destructed here
  const { users, usersLoading } = useGetUsers();
  const { candidates, candidatesLoading } = useGetCandidates();
  const { voters, votersLoading } = useGetVoters();
  const { maleVoters, maleVotersLoading } = useGetMaleVoters();
  const { femaleVoters, femaleVotersLoading } = useGetFemaleVoters();
  const { youthVoters, youthVotersLoading } = useGetYouthVoters();
  const { elderlyVoters, elderlyVotersLoading } = useGetElderlyVoters();
  const { elections, electionsLoading } = useGetElections();
  const { wards, wardsLoading } = useGetWards();
  const { booths, boothsLoading } = useGetBooths();
  const { pollingStations, pollingStationsLoading } = useGetPolling();
  const { drivers, driversLoading } = useGetDrivers();
  const { trips, tripsLoading } = useGetTrips();
  const { vehicles, vehiclesLoading } = useGetVehicles();
  const { otps, otpsLoading } = useGetOtps();
  const { emailOtps, emailOtpsLoading } = useGetEmailOtps();
  const { claims, claimsLoading } = useGetClaims();
  const { activeSurvey, activeSurveyLoading } = useGetActiveSurveys();
  const { closedSurvey, closedSurveyLoading } = useGetClosedSurveys();
  const { projects, projectsLoading } = useGetProjects();
  const { complaints, complaintsLoading } = useGetComplaints();
  const { complaintsInprogress, complaintsInprogressLoading } = useGetComplaintsInprogress();
  const { complaintsActive, complaintsActiveLoading } = useGetComplaintsActive();
  const { complaintsClosed, complaintsClosedLoading } = useGetComplaintsClosed();
  const { male, female, maleLoading, femaleLoading } = useGetYouthGenderCounts();
  const {
    businessman,
    labour,
    farmer,
    government,
    businessmanLoading,
    labourLoading,
    farmerLoading,
    governmentLoading,
  } = useGetVoterJobCounts();
  const {
    sikh,
    hindu,
    muslim,
    christian,
    sikhLoading,
    hinduLoading,
    muslimLoading,
    christianLoading,
  } = useGetVoterReligionCounts();
  const theme = useTheme();

  const settings = useSettingsContext();

  //   const welcomeMessage = t('Welcome');

  const renderGridItems = () => {
    switch (id) {
      case '1':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">ELECTION MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Users')}
                percent={2.6}
                total={users.data || '0'}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
                loading={usersLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Candidates')}
                percent={0.2}
                total={candidates.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={candidatesLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Elections')}
                percent={-0.1}
                total={elections.data || '0'}
                loading={electionsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Wards')}
                percent={-0.1}
                total={wards.data || '0'}
                loading={wardsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Booths')}
                percent={-0.1}
                total={booths.data || '0'}
                loading={boothsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Polling Stations')}
                percent={2.6}
                total={pollingStations.data || '0'}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
                loading={pollingStationsLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Otp Sent "
                percent={-0.1}
                total={otps.data || '0'}
                loading={otpsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Email Otp"
                percent={0.2}
                total={emailOtps?.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={emailOtpsLoading}
              />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
              <AppCurrentDownload
                title="Current Download"
                chart={{
                  series: [
                    { label: 'Mac', value: 12244 },
                    { label: 'Window', value: 53345 },
                    { label: 'iOS', value: 44313 },
                    { label: 'Android', value: 78343 },
                  ],
                }}
              />
            </Grid>
            <Grid xs={12} md={6} lg={8}>
              <AppAreaInstalled
                title="Area Installed"
                subheader="(+43%) than last year"
                chart={{
                  categories: [
                    'Jan',
                    'Feb',
                    'Mar',
                    'Apr',
                    'May',
                    'Jun',
                    'Jul',
                    'Aug',
                    'Sep',
                    'Oct',
                    'Nov',
                    'Dec',
                  ],
                  series: [
                    {
                      year: '2023',
                      data: [
                        {
                          name: 'Rajasthan',
                          data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                        },
                        {
                          name: 'Maharashtra',
                          data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                        },
                      ],
                    },
                    {
                      year: '2024',
                      data: [
                        {
                          name: 'Rajasthan',
                          data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                        },
                        {
                          name: 'Gujrat',
                          data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                        },
                      ],
                    },
                  ],
                }}
              />
            </Grid>{' '}
          </>
        );
      case '2':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">VOTER BEHAVIOUR OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Voters')}
                percent={0.1}
                total={voters?.data || '0'}
                loading={votersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Male Voters')}
                percent={0.1}
                total={maleVoters?.data || '0'}
                loading={maleVotersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Female Voters')}
                percent={0.1}
                total={femaleVoters?.data || '0'}
                loading={femaleVotersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Youth Voters')}
                percent={0.1}
                total={youthVoters?.data || '0'}
                loading={youthVotersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Elderly Voters')}
                percent={0.1}
                total={elderlyVoters?.data || '0'}
                loading={elderlyVotersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Male Youth Voters')}
                percent={0.1}
                total={male || '0'}
                loading={maleLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
              {console.log('male', male)}
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Female Youth Voters')}
                percent={0.1}
                total={female || '0'}
                loading={femaleLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Hindu Voters')}
                percent={0.1}
                total={hindu?.data || '0'}
                loading={hinduLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Muslim Voters')}
                percent={0.1}
                total={muslim?.data || '0'}
                loading={muslimLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Sikh Voters')}
                percent={0.1}
                total={sikh?.data || '0'}
                loading={sikhLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Cristian Voters')}
                percent={0.1}
                total={christian?.data || '0'}
                loading={christianLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Businessman Voters')}
                percent={0.1}
                total={businessman?.data || '0'}
                loading={businessmanLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Labour Voters')}
                percent={0.1}
                total={labour?.data || '0'}
                loading={labourLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Government Employees Voters')}
                percent={0.1}
                total={government?.data || '0'}
                loading={governmentLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Farmer Voters')}
                percent={0.1}
                total={farmer?.data || '0'}
                loading={farmerLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '3':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">OTHER FEATURES OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}

              <AppWidgetSummary
                title={t('Hey We Are Currently Working On This Analytics !! , Come Back Soon')}
                //   percent={-0.1}
                //   total={voters.data || '0'}
                //   loading={votersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '4':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">PROJECT MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}

              <AppWidgetSummary
                title={t('Total Running Projects')}
                percent={0.1}
                total={projects?.data || '0'}
                loading={projectsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '5':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">SURVEY MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total Active Surveys')}
                percent={0.1}
                total={activeSurvey?.data || '0'}
                loading={activeSurveyLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total closed surveys')}
                percent={0.1}
                total={closedSurvey?.data || '0'}
                loading={closedSurveyLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '6':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">COMPLAINT MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}

              <AppWidgetSummary
                title={t('Hey We Are Currently Working On This Analytics !! , Come Back Soon')}
                //   percent={-0.1}
                //   total={voters.data || '0'}
                //   loading={votersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total complaint raised through Appointment')}
                percent={0.1}
                total={complaints?.data || '0'}
                loading={complaintsLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total (in progress) complaint raised through Appointment')}
                percent={0.1}
                total={complaintsInprogress?.data || '0'}
                loading={complaintsInprogressLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total (Active) complaint raised through Appointment')}
                percent={0.1}
                total={complaintsActive?.data || '0'}
                loading={complaintsActiveLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>

            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}
              <AppWidgetSummary
                title={t('Total (Closed) complaint raised through Appointment')}
                percent={0.1}
                total={complaintsClosed?.data || '0'}
                loading={complaintsClosedLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '7':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">EXPENSE MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              {/* Render component for ID 2 */}

              <AppWidgetSummary
                title={t('Hey We Are Currently Working On This Analytics !! , Come Back Soon')}
                //   percent={-0.1}
                //   total={voters.data || '0'}
                //   loading={votersLoading}
                chart={{
                  colors: [theme.palette.warning.light, theme.palette.warning.main],
                  series: [8, 9, 31, 8, 16, 37, 8, 33, 46, 31],
                }}
              />
            </Grid>
          </>
        );
      case '8':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">EXPENSE MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Claims"
                percent={0.2}
                total={claims.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={claimsLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Claims Completed"
                percent={0.2}
                total={claims.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={claimsLoading}
              />
            </Grid>
          </>
        );
      case '9':
        return (
          <>
            <Grid item xs={12}>
              <Typography variant="h5">TRANSPORT MANAGEMENT OVERVIEW</Typography>
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Active Drivers')}
                percent={2.6}
                total={drivers.data || '0'}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
                loading={driversLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title={t('Total Trip Assigned')}
                percent={0.2}
                total={trips.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={tripsLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Trip Completed"
                percent={0.2}
                total={trips.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={tripsLoading}
              />
            </Grid>
            <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Active Vehicles"
                percent={2.6}
                total={vehicles.data || '0'}
                chart={{
                  series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
                }}
                loading={vehiclesLoading}
              />
            </Grid>
            {/* <Grid xs={12} md={4}>
              <AppWidgetSummary
                title="Total Claims"
                percent={0.2}
                total={claims.data || '0'}
                chart={{
                  colors: [theme.palette.info.light, theme.palette.info.main],
                  series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
                }}
                loading={claimsLoading}
              />
            </Grid> */}
          </>
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="ANALYTIC DETAILS"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          { name: 'Details' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <Grid container spacing={3}>
        {/* <Grid xs={12} md={8}>
          <AppWelcome
            title={`${welcomeMessage} 👋 \n ${user?.UserProfile?.firstName === null ? user?.phone : user?.UserProfile?.firstName}`}
            description={t(
              'ATTPLGroup is a renowned provider of Seven essential services, namely construction services, finance services, consultancy, solar energy solutions, and IT solutions. Our team of professionals has extensive expertise and experience in delivering innovative solutions that cater to your diverse business needs. Our company operates on a client-centric approach to ensure our clients’ satisfaction, and we are committed to providing high-quality services that meet your expectations.'
            )}
            img={<SeoIllustration />}
            // action={
            //   <Button variant="contained" color="primary">
            //     Go Now
            //   </Button>
            // }
          />
        </Grid> */}
        {/* <Grid xs={12} md={4}>
          <AppFeatured list={_appFeatured} />
        </Grid> */}

        {/* 
        
        
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title={t('Total Active Drivers')}
            percent={2.6}
            total={drivers.data || '0'}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            loading={driversLoading}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title={t('Total Trip Assigned')}
            percent={0.2}
            total={trips.data || '0'}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            loading={tripsLoading}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Trip Completed"
            percent={0.2}
            total={trips.data || '0'}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            loading={tripsLoading}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Active Vehicles"
            percent={2.6}
            total={vehicles.data || '0'}
            chart={{
              series: [5, 18, 12, 51, 68, 11, 39, 37, 27, 20],
            }}
            loading={vehiclesLoading}
          />
        </Grid>
        
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Claims"
            percent={0.2}
            total={claims.data || '0'}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            loading={claimsLoading}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <AppWidgetSummary
            title="Total Claims Completed"
            percent={0.2}
            total={claims.data || '0'}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: [20, 41, 63, 33, 28, 35, 50, 46, 11, 26],
            }}
            loading={claimsLoading}
          />
        </Grid>
       
        <Grid xs={12} md={6} lg={4}>
          <AppCurrentDownload
            title="Current Download"
            chart={{
              series: [
                { label: 'Mac', value: 12244 },
                { label: 'Window', value: 53345 },
                { label: 'iOS', value: 44313 },
                { label: 'Android', value: 78343 },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6} lg={8}>
          <AppAreaInstalled
            title="Area Installed"
            subheader="(+43%) than last year"
            chart={{
              categories: [
                'Jan',
                'Feb',
                'Mar',
                'Apr',
                'May',
                'Jun',
                'Jul',
                'Aug',
                'Sep',
                'Oct',
                'Nov',
                'Dec',
              ],
              series: [
                {
                  year: '2023',
                  data: [
                    {
                      name: 'Rajasthan',
                      data: [10, 41, 35, 51, 49, 62, 69, 91, 148, 35, 51, 49],
                    },
                    {
                      name: 'Maharashtra',
                      data: [10, 34, 13, 56, 77, 88, 99, 77, 45, 13, 56, 77],
                    },
                  ],
                },
                {
                  year: '2024',
                  data: [
                    {
                      name: 'Rajasthan',
                      data: [51, 35, 41, 10, 91, 69, 62, 148, 91, 69, 62, 49],
                    },
                    {
                      name: 'Gujrat',
                      data: [56, 13, 34, 10, 77, 99, 88, 45, 77, 99, 88, 77],
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>{' '} */}

        {renderGridItems(id)}
      </Grid>
    </Container>
  );
}

OverviewAppList.propTypes = {
  id: PropTypes.string,
};
