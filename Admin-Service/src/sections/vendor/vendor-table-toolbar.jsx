/* eslint-disable react-hooks/exhaustive-deps */

import axios from 'axios';
import PropTypes from 'prop-types';
import { useState , useEffect,  useCallback} from 'react';

import Select from '@mui/material/Select';
import { TextField } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';

import Iconify from 'src/components/iconify';
import CustomPopover, { usePopover } from 'src/components/custom-popover';

// ----------------------------------------------------------------------

const fetchPinCodeData = async (pinCode) => {
  try {
    const response = await axios.get(`https://api.postalpincode.in/pincode/${pinCode}`);   
    const data = response.data[0];

    if (data.Status === "Success" && data.PostOffice.length > 0) {
      const postOffices = data.PostOffice;
      const states = [...new Set(postOffices.map(po => po.State))];
      const districts = [...new Set(postOffices.map(po => po.District))];
      const cities = [...new Set(postOffices.map(po => po.Name))];

      return { states, districts, cities };
    }
    return { states: [], districts: [], cities: [] };
  } catch (error) {
    console.error('Error fetching pin code details:', error);
    return { states: [], districts: [], cities: [] };
  }
};

export default function VendorTableToolbar({
  filters,
  onFilters,
}) {
  const popover = usePopover();
  const [pinCode, setPinCode] = useState(filters.pinCode || '');
  const [stateOptions, setStateOptions] = useState([]);
  const [districtOptions, setDistrictOptions] = useState([]);
  const [cityOptions, setCityOptions] = useState([]);
  const [selectedState, setSelectedState] = useState(filters.state || '');
  const [selectedDistrict, setSelectedDistrict] = useState(filters.district || '');
  const [selectedCity, setSelectedCity] = useState(filters.city || '');

  

  const fetchAndSetData = useCallback(async () => {
    if (pinCode.length === 6) {
      const { states, districts, cities } = await fetchPinCodeData(pinCode);
      setStateOptions(states);
      setDistrictOptions(districts);
      setCityOptions(cities);

      if (!selectedState) setSelectedState(states[0] || '');
      if (!selectedDistrict) setSelectedDistrict(districts[0] || '');
      if (!selectedCity) setSelectedCity(cities[0] || '');
    }
  });
  useEffect(() => {
    fetchAndSetData();
  }, [fetchAndSetData, pinCode]);

  const handlePinCodeChange = useCallback((event) => {
    setPinCode(event.target.value);
  }, []);


  const handlePinCodeBlur = useCallback(() => {
        onFilters('pinCode', pinCode); // Update the filter with entered Pin Code
      }, [onFilters, pinCode]);
    
  
      

  const handleStateChange = useCallback((event) => {
    const state = event.target.value;
    setSelectedState(state);
    onFilters('state', state);
  }, [onFilters]);

  const handleDistrictChange = useCallback((event) => {
    const district = event.target.value;
    setSelectedDistrict(district);
    onFilters('district', district);
  }, [onFilters]);

  const handleCityChange = useCallback((event) => {
    const city = event.target.value;
    setSelectedCity(city);
    onFilters('city', city);
  }, [onFilters]);
  
  

  

  return (
    <>
     <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>State</InputLabel>
        <Select
          value={selectedState}
          onChange={handleStateChange}
          input={<OutlinedInput label="State" />}
          sx={{ textTransform: 'capitalize' }}
        >
          {stateOptions.length > 0 ? (
            stateOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>District</InputLabel>
        <Select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          input={<OutlinedInput label="District" />}
          sx={{ textTransform: 'capitalize' }}
        >
          {districtOptions.length > 0 ? (
            districtOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <InputLabel>City</InputLabel>
        <Select
          value={selectedCity}
          onChange={handleCityChange}
          input={<OutlinedInput label="City" />}
          sx={{ textTransform: 'capitalize' }}
        >
         
          {cityOptions.length > 0 ? (
            cityOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))
          ) : (
            <MenuItem disabled>No options available</MenuItem>
          )}
        </Select>
      </FormControl>

      <FormControl
        sx={{
          flexShrink: 0,
          width: { xs: 1, md: 200 },
        }}
      >
        <TextField
          label="Pin Code"
          value={pinCode}
          onChange={handlePinCodeChange}
          onBlur={handlePinCodeBlur}
          variant="outlined"
          sx={{ textTransform: 'capitalize' }}
        />
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

VendorTableToolbar.propTypes = {
  filters: PropTypes.object.isRequired,
  onFilters: PropTypes.func.isRequired,
 
};


