import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

export default function VehicleTableToolbar({
  filters,
  onFilters,
  //
  vehicleOptions,
}) {
  const popover = usePopover();

  // const [stock, setStock] = useState(filters.vehicleType);

  // const [publish, setPublish] = useState(filters.publish);

  // const handleChangeStock = useCallback((event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setStock(typeof value === 'string' ? value.split(',') : value);
  // }, []);

  // const handleChangePublish = useCallback((event) => {
  //   const {
  //     target: { value },
  //   } = event;
  //   setPublish(typeof value === 'string' ? value.split(',') : value);
  // }, []);

  // const handleCloseStock = useCallback(() => {
  //   onFilters('stock', stock);
  // }, [onFilters, stock]);

  // const handleClosePublish = useCallback(() => {
  //   onFilters('publish', publish);
  // }, [onFilters, publish]);

  const handleFilterRole = useCallback(
    (event) => {
      onFilters(
        'vehicleType',
        typeof event.target.value === 'string' ? event.target.value.split(',') : event.target.value
      );
    },
    [onFilters]
  );

  // Later in your code where you populate filters or use filters.vehicleType

  return (
    <>
      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        {/* <InputLabel>Stock</InputLabel> */}
      </FormControl>

      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>Vehicle Type</InputLabel>

        <Select
          multiple
          value={filters.vehicleType}
          onChange={handleFilterRole}
          input={<OutlinedInput label="Vehicle Type" />}
          renderValue={(selected) => selected.map((value) => value).join(', ')}
          MenuProps={{
            PaperProps: {
              sx: { maxHeight: 240 },
            },
          }}
        >
          {console.log(vehicleOptions)}
          {/* {vehicleOptions.map((option) => (
            <MenuItem key={option} value={option}>
              <Checkbox
                disableRipple
                size="small"
                checked={Array.isArray(filters.vehicleType) && filters.vehicleType.includes(option)}
              />
              {option}
            </MenuItem>
          ))} */}
        </Select>
      </FormControl>

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 140 }}
      >
        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:printer-minimalistic-bold" />
          Print
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:import-bold" />
          Import
        </MenuItem>

        <MenuItem
          onClick={() => {
            popover.onClose();
          }}
        >
          <Iconify icon="solar:export-bold" />
          Export
        </MenuItem>
      </CustomPopover>
    </>
  );
}

VehicleTableToolbar.propTypes = {
  vehicleOptions: PropTypes.array,
  filters: PropTypes.object,
  onFilters: PropTypes.func,
};
