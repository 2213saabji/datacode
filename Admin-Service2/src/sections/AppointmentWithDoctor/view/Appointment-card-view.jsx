/* eslint-disable no-unused-vars */

import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import Container from '@mui/material/Container';
import { Tab, Tabs, Stack, Button, useTheme, tabsClasses } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import { useSettingsContext } from 'src/components/settings';

import DoctorRequestListView from 'src/sections/request_license_acceptence/doctor-request-list-table';

import AppointmentListView from '../Appointment-list-view';
import AppointmentwithdoctorHero from '../Appointment-hero';

const icon = (name) => <SvgColor src={`/assets/images/FarmerLabour/${name}.svg`} />;

const TABS = [
  {
    value: 'yourBookedAppointment',
    label: 'YOUR BOOKED APPOINTMENTS',
    icon: icon('Farmerseeds'),
  },
  {
    value: 'docterList',
    label: 'DOCTOR LIST',
    icon: icon('FarmerMarket'),
  },
];
export default function AppointmentwithdoctorCard({ currentappointment }) {
  const settings = useSettingsContext();
  const theme = useTheme();

  const router = useRouter();

  const cardStyles = {
    padding: 2,
    borderRadius: 2,
    boxShadow: 3,
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'scale(1.05)',
      boxShadow: 6,
    },
  };

  const [currentTab, setCurrentTab] = useState(() => {
    const localData = localStorage.getItem('yourBookedAppointment');
    if (localData) return localData;

    return 'yourBookedAppointment';
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem('DocterViewTab', newValue);
  }, []);

  const { open, openPaymentModal } = useAuthContext();

  const handleClick = (url) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(url);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <AppointmentwithdoctorHero />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mb: 2 }}
      >
        Back
      </Button>

      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="space-between"
        gap={{ xs: 2 }}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
          mt: 3,
          // border: '1px solid red'
        }}
      >
        <Stack>
          {/* <Typography sx={{ whiteSpace: 'nowrap', fontweight: '700' }}>
          YOUR BOOKED APPOINTMENTS
        </Typography> */}

          {/* <Container
            sx={{
              pl: 2,
              // pb: 2,
              // pt: { xs: 4, md: 5 },
              position: 'relative',
            }}
          > */}
          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              pl: { xs: 0, md: 3 },
              pb: 1,
              borderRadius: 1,
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
              '& .MuiTabs-scrollButtons': {
                color: theme.palette.primary.dark,
                '& svg': {
                  width: '30px',
                  height: '30px',
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                sx={{
                  color: theme.palette.primary.main,
                }}
                label={tab.label}
              />
            ))}
          </Tabs>

          {/* <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              minHeight: '100%',
            }}
          >
            {currentTab === 'farmermarket' && <FarmerMarketPlace />}
            {currentTab === 'farmerseeds' && <FarmerSeeds />}
            {currentTab === 'farmermachines' && <FarmerMachines />}
            {currentTab === 'farmerProduct' && <RegisterYourCompany />}
            {currentTab === 'farmerAppointment' && <FarmerAppointmentListView />}
          </Box> */}
          {/* </Container> */}
        </Stack>
        <Stack>
          {currentTab === 'yourBookedAppointment' && (
            <Button
              // component={RouterLink}
              // href={paths.dashboard.Appointmenttodoctor.new}
              onClick={() => handleClick(paths.dashboard.Appointmenttodoctor.new)}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ whiteSpace: 'nowrap', mr: 2 }}
            >
              BOOK DOCTOR APPOINTMENT
            </Button>
          )}

          {currentTab === 'docterList' && (
            <Button
              // component={RouterLink}
              // href={paths.dashboard.Appointmenttodoctor.new}
              onClick={() => handleClick(paths.dashboard.user.profile)}
              variant="contained"
              // startIcon={<Iconify icon="mingcute:add-line" />}
              sx={{ whiteSpace: 'nowrap', mr: 2 }}
            >
              UPGRADE TO DOCTOR
            </Button>
          )}
        </Stack>
      </Stack>
      {/* <CustomBreadcrumbs
        heading="BOOK APPOINTMENTS"
        links={[
          {
            // name: 'Appointment with doctor',
          },
          // { name: 'Booking' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.Appointmenttodoctor.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Book Appointment
          </Button>
        }
        sx={{
          mb: {
            xs: 2,
            md: 5,
          },
        }}
      /> */}

      {currentTab === 'yourBookedAppointment' && <AppointmentListView />}
      {currentTab === 'docterList' && <DoctorRequestListView />}

      {/* <Box sx={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <Link
          component={RouterLink}
          to="/dashboard/Appointmenttodoctor/list/?status=open"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <AccessTimeIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />
              <Label variant="soft">Pending Appointments </Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Appointmenttodoctor/list/?status=in-progress"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <EventAvailableIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />
              <Label variant="soft">Active Appointments</Label>
            </Box>
          </Card>
        </Link>

        <Link
          component={RouterLink}
          to="/dashboard/Appointmenttodoctor/list/?status=close"
          variant="body2"
          style={{ textDecoration: 'none' }}
        >
          <Card sx={cardStyles}>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: 6,
                textAlign: 'center',
              }}
            >
              <CheckCircleIcon sx={{ fontSize: 80, color: 'inherit', mb: 1 }} />

              <Label variant="soft">Closed Appointments</Label>
            </Box>
          </Card>
        </Link>
      </Box> */}
    </Container>
  );
}

AppointmentwithdoctorCard.propTypes = {
  currentappointment: PropTypes.object,
};
