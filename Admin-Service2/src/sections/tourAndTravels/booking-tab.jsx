import React from 'react';
import PropTypes from 'prop-types';

import { Tab, Tabs, useTheme, tabsClasses } from '@mui/material';

function BookingTab({ activeTab, handleChangeTab, tabs }) {
  const theme = useTheme();

  return (
    <Tabs
      value={activeTab}
      onChange={handleChangeTab}
      sx={{
        width: 1,
        bottom: 0,
        zIndex: 9,
        pl: 3,
        pb: 1,
        borderRadius: 1,
        // position: 'absolute',
        bgcolor: 'background.paper',
        [`& .${tabsClasses.flexContainer}`]: {
          pr: { md: 3 },
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
      {tabs.map((tab) => (
        <Tab
          key={tab.value}
          value={tab.value}
          icon={tab.icon}
          sx={{
            color: theme.palette.primary.main, // Change the text color to red (you can use any valid CSS color here)
          }}
          label={tab.label}
        />
      ))}
    </Tabs>
  );
}

// Define prop types for the component
BookingTab.propTypes = {
  activeTab: PropTypes.any.isRequired,
  handleChangeTab: PropTypes.func.isRequired,
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.any.isRequired,
      icon: PropTypes.node.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default BookingTab;
