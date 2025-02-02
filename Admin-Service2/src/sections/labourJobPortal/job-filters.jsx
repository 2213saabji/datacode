import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Badge from '@mui/material/Badge';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import FormControlLabel from '@mui/material/FormControlLabel';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import JobTypeSelect from 'src/components/job-type-select/job-select';
import JobDistanceSelect from 'src/components/job-location-select copy/distance-select';

// ----------------------------------------------------------------------

export default function JobFilters({
  open,
  onOpen,
  onClose,
  //
  filters,
  onFilters,
  //
  canReset,
  onResetFilters,
  //
  locationOptions,
  selfCoordinates,
  employmentTypeOptions,
  jobTypeOptions,
}) {
  const handleFilterEmploymentTypes = useCallback(
    (newValue) => {
      const checked = filters.employmentTypes.includes(newValue)
        ? filters.employmentTypes.filter((value) => value !== newValue)
        : [...filters.employmentTypes, newValue];
      onFilters('employmentTypes', checked);
    },
    [filters.employmentTypes, onFilters]
  );

  const handleFilterJobTypes = useCallback(
    (newValue) => {
      onFilters('jobTypes', newValue);
    },
    [onFilters]
  );

  const handleFilterLocations = useCallback(
    (newValue) => {
      onFilters('locations', newValue);
    },
    [onFilters]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Filters
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={onResetFilters}>
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="solar:restart-bold" />
          </Badge>
        </IconButton>
      </Tooltip>

      <IconButton onClick={onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderEmploymentTypes = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Employment Types
      </Typography>
      {employmentTypeOptions.map((option) => (
        <FormControlLabel
          key={option}
          control={
            <Checkbox
              checked={filters.employmentTypes.includes(option)}
              onClick={() => handleFilterEmploymentTypes(option)}
            />
          }
          label={option}
        />
      ))}
    </Stack>
  );

  const renderJobTypes = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Job Types
      </Typography>
      <JobTypeSelect
        placeholder={filters.jobTypes.length ? '+ Types' : 'Select Job Types'}
        fullWidth
        multiple
        value={filters.jobTypes}
        onChange={(event, newValue) => handleFilterJobTypes(newValue)}
        options={jobTypeOptions}
        getOptionLabel={(option) => option}
      />
    </Stack>
  );

  const renderLocations = (
    <Stack>
      <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
        Distance
      </Typography>

      {selfCoordinates.lat === null && selfCoordinates.lng === null ? (
        <Typography variant="subtitle2" sx={{ mb: 1.5, display: 'flex', alignItems: 'center' }}>
          Fettching you location{' '}
          <Box component="img" sx={{ width: 80 }} src="/assets/icons/gif/search.gif" />
        </Typography>
      ) : (
        <JobDistanceSelect
          placeholder={filters.locations.length ? '+ Locations' : 'Select Locations'}
          fullWidth
          multiple
          value={filters.locations}
          onChange={(event, newValue) => handleFilterLocations(newValue)}
          options={locationOptions}
          getOptionLabel={(option) => option}
        />
      )}
    </Stack>
  );

  return (
    <>
      <Button
        disableRipple
        color="inherit"
        endIcon={
          <Badge color="error" variant="dot" invisible={!canReset}>
            <Iconify icon="ic:round-filter-list" />
          </Badge>
        }
        onClick={onOpen}
      >
        Filters
      </Button>

      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        slotProps={{
          backdrop: { invisible: true },
        }}
        PaperProps={{
          sx: { width: 280 },
        }}
      >
        {renderHead}

        <Divider />

        <Scrollbar sx={{ px: 2.5, py: 3 }}>
          <Stack spacing={3}>
            {renderEmploymentTypes}

            {renderJobTypes}

            {renderLocations}
          </Stack>
        </Scrollbar>
      </Drawer>
    </>
  );
}

JobFilters.propTypes = {
  open: PropTypes.bool,
  onOpen: PropTypes.func,
  onClose: PropTypes.func,
  canReset: PropTypes.bool,
  filters: PropTypes.object,
  selfCoordinates: PropTypes.object,
  onFilters: PropTypes.func,
  onResetFilters: PropTypes.func,
  locationOptions: PropTypes.array,
  employmentTypeOptions: PropTypes.array,
  jobTypeOptions: PropTypes.array,
};
