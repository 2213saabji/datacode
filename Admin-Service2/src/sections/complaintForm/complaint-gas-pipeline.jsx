import PropTypes from 'prop-types';
import React, { useState, useCallback } from 'react';

import { Box } from '@mui/system';
import { Container } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import { useGetCompalintsState, useGetCompalintsCenter } from 'src/api/blog';

import SvgColor from 'src/components/svg-color';

import ComplaintCard from './complaint-card';
import ComplaintTabs from './complaint-tabs';

export default function ComplaintGasPipeline({ id }) {
  const { user } = useAuthContext();
  const { complaintsAllCards } = useGetCompalintsCenter(id);
  const { complaintsAllStateCards } = useGetCompalintsState(
    id,
    user?.UserAddressesses?.[0]?.userState
  );
  console.log('complaintsCenterCards', complaintsAllCards);

  const [currentTab, setCurrentTab] = useState('central');

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const icon = (name) => <SvgColor src={`/assets/icons/menuicons/${name}.svg`} />;

  const TABS = [
    {
      value: 'central',
      label: 'Central Complaint',
      icon: icon('Profile'),
    },
    {
      value: 'state',
      label: 'State Complaint',
      icon: icon('Profile'),
    },
  ];

  return (
    <Container
      sx={{
        pl: 2,
        pb: 10,
        pt: { xs: 1, md: 2 },
        position: 'relative',
      }}
    >
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
        }}
      >
        <ComplaintTabs activeTab={currentTab} handleChangeTab={handleChangeTab} tabs={TABS} />

        {currentTab === 'state' && <ComplaintCard cards={complaintsAllStateCards} />}

        {currentTab === 'central' && <ComplaintCard cards={complaintsAllCards} />}
      </Box>
    </Container>
  );
}

ComplaintGasPipeline.propTypes = {
  id: PropTypes.string.isRequired,
};
