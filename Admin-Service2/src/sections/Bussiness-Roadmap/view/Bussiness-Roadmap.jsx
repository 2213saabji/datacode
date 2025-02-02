import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Tab, Tabs, Button, useTheme, tabsClasses } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import SvgColor from 'src/components/svg-color';

import BussinessLoan from '../buisnessloan';
import Attplfeatures from '../attpl-feature';
import BusinessForLarge from '../bussiness-for-larg';
import BussinessForSmall from '../bussiness-for-small';
import BusinessCareerHero from '../businessCareer-hero';
import BussinessForMedium from '../bussiness-for-meduim';

export default function BussinessRoadmap() {
  const theme = useTheme();
  const [currentTab, setCurrentTab] = useState('attplfeature');

  const icon = (name) => <SvgColor src={`/assets/images/business/${name}.svg`} />;

  const TABS = [
    {
      value: 'attplfeature',
      label: ' ATTPL SERVICES',
      icon: icon('ATTPL-Services'),
    },
    {
      value: 'loan',
      label: 'LOAN',
      icon: icon('Loan'),
    },
    {
      value: 'small-scale-businesses',
      label: 'SMALL SCALE BUSINESSES',
      icon: icon('small-Business'),
    },
    {
      value: 'medium-scale-businesses',
      label: 'MEDIUM SCALE BUSINESSES',
      icon: icon('Medium-Business'),
    },
    {
      value: 'large-scale-businesses',
      label: 'LARGE SCALE BUSINESSES',
      icon: icon('Big-Business'),
    },
    // {
    //   value: 'loan',
    //   label: 'LOAN',
    //   icon:icon('Big-Business')
    // },
  ];
  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <>
      <BusinessCareerHero currentTab={currentTab} />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2 }}
      >
        Back
      </Button>

      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 10, md: 10 },
          position: 'relative',
        }}
      >
        <Box
          gap={10}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
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
              // position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                // pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
              '& .MuiTabs-scrollButtons': {
                // Styles for scroll buttons
                color: theme.palette.primary.main, // Change color of scroll buttons
              },
            }}
          >
            {TABS.map((tab) =>
              (tab.value !== 'candidate' && tab.value !== 'editcandidate') ||
              tab.value === 'candidate' ||
              tab.value === 'editcandidate' ? (
                <Tab
                  key={tab.value}
                  value={tab.value}
                  sx={{
                    color: theme.palette.primary.main, // Change the text color to red (you can use any valid CSS color here)
                  }}
                  icon={tab.icon}
                  label={tab.label}
                />
              ) : null
            )}
          </Tabs>
          {currentTab === 'small-scale-businesses' && <BussinessForSmall />}

          {currentTab === 'medium-scale-businesses' && <BussinessForMedium />}

          {currentTab === 'large-scale-businesses' && <BusinessForLarge />}
          {currentTab === 'loan' && <BussinessLoan />}
          {currentTab === 'attplfeature' && <Attplfeatures />}
        </Box>
      </Container>
    </>
  );
}
