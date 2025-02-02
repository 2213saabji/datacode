import { useState, useCallback } from 'react';

import { Box } from '@mui/system';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Button } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DoctorRequestListView from '../doctor-request-list-table';
import DriverRequestListView from '../driver-request-list-table';
import EmployerRequestListView from '../employer-request-list-table';
import BusinessmanRequestListView from '../businessman-request-list-table';
import SellerOwnerRequestListView from '../seller-owner-request-list-table';
import InstituteOwnerRequestListView from '../institute-owner-request-list-table';
import LawyerRequestListView from '../lawyer-request-list-table';


const TABS = [
  {
    value: 'doctor',
    label: 'Doctor Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'employer',
    label: 'Employer Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'businessman',
    label: 'Businessman Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'instituteOwner',
    label: 'Institute Owner Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'agricultureSellerOwner',
    label: 'Agriculture Seller Owner Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  {
    value: 'driver',
    label: 'Driver Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
  // {
  //   value: 'serviceProvider',
  //   label: 'Service Provider',
  //   icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  // },
  {
    value: 'lawyer',
    label: 'Lawyer Request',
    icon: <Box component="img" src="/assets/icons/menuicons/Profile.svg" />,
  },
];

export default function RequestListView() {
  const [currentTab, setCurrentTab] = useState('doctor');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <CustomBreadcrumbs
        heading="REQUEST LIST"
        links={[
          // { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Request',
            href: paths.dashboard.userRoleManagement.root,
          },
          { name: 'List' },
        ]}
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
          mt: 3,
        }}
      />
      <Box sx={{ mb: 2 }}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          sx={{
            width: 1,
            zIndex: 9,
            bgcolor: 'background.paper',
            // [`& .${tabsClasses.flexContainer}`]: {
            //   pr: { md: 3 },
            //   justifyContent: {
            //     xs: 'center',
            //     sm: 'center',
            //     md: 'center',
            //   },
            // },
          }}
        >
          {TABS.map((tab) => (
            <Tab key={tab.value} value={tab.value} icon={tab.icon} label={tab.label} />
          ))}
        </Tabs>
      </Box>
      {currentTab === 'doctor' && <DoctorRequestListView currentTab={currentTab} />}
      {currentTab === 'employer' && <EmployerRequestListView currentTab={currentTab} />}
      {currentTab === 'businessman' && <BusinessmanRequestListView currentTab={currentTab} />}
      {currentTab === 'instituteOwner' && <InstituteOwnerRequestListView currentTab={currentTab} />}
      {currentTab === 'agricultureSellerOwner' && (
        <SellerOwnerRequestListView currentTab={currentTab} />
      )}
      {currentTab === 'driver' && <DriverRequestListView currentTab={currentTab} />}
      {currentTab === 'lawyer' && <LawyerRequestListView currentTab={currentTab} />}
     
    </>
  );
}
