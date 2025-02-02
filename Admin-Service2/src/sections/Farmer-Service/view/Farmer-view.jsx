/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Tab, Tabs, Modal, Button, useTheme, Typography, tabsClasses } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import SvgColor from 'src/components/svg-color';

import FarmerHero from '../farmer-hero';
import FarmerSeeds from '../farmer-seeds-view';
import { CattleListView } from '../cattle/view';
import FarmerMachines from '../farmer-machines-view';
import FarmerMarketPlace from '../farmer-market-place';
import { FarmerAppointmentListView } from '../register/view';
import RegisterYourCompany from '../register/register-your-company';
import { FarmerListView } from '../equipment/view';

const icon = (name) => <SvgColor src={`/assets/images/FarmerLabour/${name}.svg`} />;

const TABS = [
  {
    value: 'farmerseeds',
    label: 'FARMER GUIDE',
    icon: icon('Farmerseeds'),
  },
  {
    value: 'farmermarket',
    label: 'FARMER MARKETPLACE',
    icon: icon('FarmerMarket'),
  },
  {
    value: 'farmermachines',
    label: 'AGRICULTURAL EQUIPMENTS',
    icon: icon('Tools'),
  },
  {
    value: 'cattle',
    label: 'CATTLE TRADE HUB',
    icon: icon("Tools")
  },
  {
    value: 'equipment',
    label: 'USED EQUIPMENT',
    icon: icon("Tools")
  },
  {
    value: 'farmerProduct',
    label: 'AGRICULTURE EQUIPMENT LIST',
    icon: icon('Tools'),
  },
  {
    value: 'farmerAppointment',
    label: 'MY APPOINTMENT',
    icon: icon('Tools'),
  },
];

export default function FarmerServiceView() {
  const theme = useTheme();

  const [currentTab, setCurrentTab] = useState(() => {
    const localData = localStorage.getItem('FarmerViewTab');
    if (localData) return localData;

    return 'farmerseeds';
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem('FarmerViewTab', newValue);
  }, []);

  return (
    <>
      <Container
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FarmerHero currentTab={currentTab} />

        <Button
          component={RouterLink}
          to="/dashboard"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
        >
          Back
        </Button>

        <Container
          sx={{
            pl: 2,
            pb: 10,
            pt: { xs: 4, md: 5 },
            position: 'relative',
          }}
        >
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

          <Box
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
            {currentTab === 'cattle' && <CattleListView />}
            {currentTab === 'equipment' && <FarmerListView />}
          </Box>
        </Container>
      </Container>

    </>
  );
}
