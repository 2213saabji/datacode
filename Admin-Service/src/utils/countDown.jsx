import PropTypes from 'prop-types';
import React, { useState, useEffect, useCallback } from 'react';

import { Stack } from '@mui/system';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';

export const CountdownTimer = ({ startTime, endTime }) => {
  const calculateTimeLeft = useCallback(() => {
    const timeLeft = endTime - Date.now();
    return timeLeft > 0 ? timeLeft : 0;
  }, [endTime]);

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(interval);
  }, [calculateTimeLeft]);

  if (timeLeft <= 0) {
    return (
      <Label color="warning" sx={{ p: 1, width: 100 }}>
        Expired
      </Label>
    );
  }

  const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
  const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  const formatTimePart = (value, unit) => (value > 0 ? `${value}${unit} ` : '');

  const timeString =
    `${formatTimePart(days, 'd')}${formatTimePart(hours, 'h')}${formatTimePart(minutes, 'm')}${formatTimePart(seconds, 's')}`.trim();

  const isError = days === 0 && hours < 1;

  return (
    <Stack direction="row" alignItems="center" gap={0.5} variant="subtitle3" component="div">
      <Iconify
        color={isError ? '#c44642' : '#4dac81'}
        icon={isError ? 'svg-spinners:clock' : 'icon-park:alarm-clock'}
      />
      <Label color={isError ? 'error' : 'primary'} sx={{ p: 1 }}>
        {timeString}
      </Label>
    </Stack>
  );
};

CountdownTimer.propTypes = {
  startTime: PropTypes.instanceOf(Date).isRequired,
  endTime: PropTypes.instanceOf(Date).isRequired,
};
