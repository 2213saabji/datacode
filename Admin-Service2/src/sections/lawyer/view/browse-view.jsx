/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState,useEffect,useCallback } from 'react';
 
import { Image } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { Box, Button, Container, TextField, Autocomplete } from '@mui/material';
 
import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';
import { useGetServices } from 'src/api/service';
import { useGetSubServices } from 'src/api/sub-service';
 
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
 
export default function BrowseView() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettingsContext();
  const { services: serviceList } = useGetServices();
  const { subservices: subserviceList } = useGetSubServices();
  const [selectedService, setSelectedService] = useState(null);
  const [selectedSubService, setSelectedSubService] = useState(null);
 
  useEffect(() => {
    if (selectedService !== null) {
      sessionStorage.setItem('lms-service', selectedService);
    }
  }, [selectedService]);
 
  console.log("selectedService",selectedService)
 
  useEffect(() => {
    if (selectedService !== null) {
      sessionStorage.setItem('lms-sub-service', selectedSubService);
      console.log(selectedSubService)
    }
  }, [selectedService, selectedSubService]);
 
  const ServiceListArr = serviceList?.data || [];
  const ServiceData = ServiceListArr.filter((list) => list.userRoleId === 31).map((list) => ({
    value: list.serviceId,
    label: list.serviceName,
  }));
 
 
  console.log(ServiceData);
 
  const ServiceDataForOptions = ServiceData.map((option) => option.value);
  const SubServiceListArr = subserviceList?.data || [];
  const SubServiceData = SubServiceListArr.map((list) => ({
    value: list.issueId,
    label: list.issueType,
    serviceId: list.serviceId,
  }));
 
  console.log("sssssss",SubServiceData)
 
 
 
  const handleViewNext = useCallback(
    () => {
      router.push(paths.dashboard.lawyer.filter);
    },
    [router]
  );
 
 
  // Filter subservices based on the selected service
  const SubServiceDataForOptions = SubServiceData.filter(
    (option) => option.serviceId === selectedService
  ).map((option) => option.value);
  const gridStyle = {
    display: 'block',
    width: '100%',
    overflow: 'hidden',
  };
 
 
 
  const imageStyle = {
    display: 'block',
    width: '100%',
    height: '30vh',
    objectFit: 'cover',
    borderRadius: '15px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  };
 
  const isButtonDisabled = !selectedService || !selectedSubService;
 
  return (
    <>
    {/* <Box sx={gridStyle}>
      <img
        src="/assets/images/Description of Image/Lawyer View.png"
        alt="Description of Image"
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </Box> */}
    <Button
            component={RouterLink}
            to="/dashboard"
            variant="outlined"
            color="primary"
            style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
          >
            Back
          </Button>
         <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ py: 4 }}>
      <CustomBreadcrumbs
        heading="SELECT YOUR SERVICE"
        links={[
          {
            name: 'FOR WHICH YOU ARE LOOKLING A LAWYER!',
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
   
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 4,
          mb: 3,
        }}
      >
       
        <Box sx={{ flex: 1 }}>
          <Autocomplete
            name="serviceId"
            options={ServiceDataForOptions}
            getOptionLabel={(value) => {
              const service = ServiceData.find((option) => option.value === value);
              return service ? service.label : '';
            }}
            onChange={(event, newValue) => {
              setSelectedService(newValue);
 
             
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Service Name"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  style: {
                    color: theme.palette.text.primary,
                    fontSize: '16px',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            )}
          />
        </Box>
 
        <Box sx={{ flex: 1 }}>
          <Autocomplete
            name="issueType"
            options={SubServiceDataForOptions}
            getOptionLabel={(value) => {
              const subservice = SubServiceData.find((option) => option.value === value);
              return subservice ? subservice.label : '';
            }}
            onChange={(event, newValue) => {
              setSelectedSubService(newValue);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Sub Service Name"
                variant="outlined"
                InputProps={{
                  ...params.InputProps,
                  style: {
                    color: theme.palette.text.primary,
                    fontSize: '16px',
                  },
                }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.text.primary,
                  },
                }}
                sx={{
                  borderRadius: 2,
                  backgroundColor: theme.palette.background.paper,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    '& fieldset': {
                      borderColor: theme.palette.divider,
                    },
                    '&:hover fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            )}
          />
        </Box>
      </Box>
 
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ borderRadius: 2 }}
          onClick={handleViewNext}
          disabled={isButtonDisabled}
        >
          Next
        </Button>
      </Box>
    </Container>
    </>
  );
}
 
 
