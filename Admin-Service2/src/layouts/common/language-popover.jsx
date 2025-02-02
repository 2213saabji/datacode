import { m } from 'framer-motion';
import { useCallback } from 'react';

import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { useLocales, useTranslate } from 'src/locales';

import { varHover } from 'src/components/animate';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function LanguagePopover() {
  const popover = usePopover();

  const { onChangeLang } = useTranslate();

  const { allLangs, currentLang } = useLocales();

  const handleChangeLang = useCallback(
    (newLang) => {
      onChangeLang(newLang);
      popover.onClose();
    },
    [onChangeLang, popover]
  );
  return (
    <>
      <IconButton
        component={m.button}
        whileTap="tap"
        whileHover="hover"
        variants={varHover(1.05)}
        onClick={popover.onOpen}
        sx={{
          width: 0,
          height: 0,
          mr: 4,
          ...(popover.open && {
            bgcolor: 'action.selected',
          }),
        }}
      >
        <Typography
          sx={{
            display: 'flex',
            direction: 'row',
            gap: 1,
            boxShadow: '0 0 5px #0005',
            pl: 2,
            pr: 1,
            py: 0.5,
            mr: 4,
            background: '#75b4fc',
            borderRadius: 1,
            color: 'white',
          }}
        >
          {currentLang.label}
          <ArrowDropDownIcon />
        </Typography>
        {/* <Iconify icon={currentLang.icon} sx={{ borderRadius: 0.65, width: 28 }} /> */}
      </IconButton>

      <CustomPopover open={popover.open} onClose={popover.onClose} sx={{ width: 160 }}>
        {allLangs.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === currentLang.value}
            onClick={() => handleChangeLang(option.value)}
          >
            {/* <Iconify icon={option.icon} sx={{ borderRadius: 0.65, width: 28 }} /> */}

            {option.label}
          </MenuItem>
        ))}
      </CustomPopover>
    </>
  );
}
