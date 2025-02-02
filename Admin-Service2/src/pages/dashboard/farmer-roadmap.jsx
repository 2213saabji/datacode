/* eslint-disable no-unused-vars */
import axios from 'axios';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useTheme } from '@mui/material/styles';
import {
  Box,
  Grid,
  Table,
  Paper,
  Button,
  MenuItem,
  TableRow,
  TextField,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { ATTPL_BMS_HOST_API } from 'src/config-global';
import { useGetSoilType, useGetSeasonType } from 'src/api/farmer';

import FormProvider from 'src/components/hook-form';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

export default function FarmerRoadMap() {
  const navigate = useNavigate();
  const theme = useTheme();
  const soil = useGetSoilType();
  const season = useGetSeasonType();
  const [farmerData, setFarmerData] = useState([]);
  const [crop, setCrop] = useState([]);
  const [fetchedData, setFetchedData] = useState(null); // State to hold fetched data
  const methods = useForm({
    defaultValues: {
      seasonTypes: '',
      soilTypes: '',
      cropTypes: '',
    },
  });
  console.log({ farmerData });
  // const crop = useGetCropType();

  const { handleSubmit, setValue, watch } = methods;
  const { seasonTypes, soilTypes, cropTypes } = watch();
  const [checkData, setCheckData] = useState(false);
  const onSubmit = (data) => {
    // Implement API call based on selected values
    setCheckData(true);
  };

  const fetchCropTypes = async (selectedSeason, selectedSoil) => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log('first', selectedSeason, selectedSoil);
      const encodedSoil = encodeURIComponent(selectedSoil);

      console.log(encodedSoil);
      const response = await axios.get(
        `${ATTPL_BMS_HOST_API}/farmer/fetch/croptypesbysoilseason/${encodedSoil}/${selectedSeason}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log({ response });
      // Assuming the API returns an array of crop types
      setCrop(response.data.data);
      console.log(crop);
      // setValue('cropTypes', crop);
    } catch (error) {
      console.error('Error fetching crop types:', error);
      // Handle error if needed
    }
  };
  const fetchFarmerData = async (selectedSeason, selectedSoil, selectedCrop) => {
    try {
      // Replace with your actual API endpoint and proper API call logic
      const accessToken = localStorage.getItem('accessToken');
      const encodedSoil = encodeURIComponent(selectedSoil);
      console.log({ encodedSoil });
      const response = await axios.get(
        `${ATTPL_BMS_HOST_API}/farmer/fetchfarmerConditions/${selectedCrop}/${selectedSeason}/${encodedSoil}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      console.log({ response });
      setFarmerData(response.data.data);
      const data = await response.json;
      setFetchedData(data); // Update state with fetched data
    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error if needed
    }
  };

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard/FarmerService/new"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', marginBottom: '30px' }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="FARMER ROADMAP"
        links={[
          {
            name: 'Farmer',
          },
          { name: 'Lists' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
          color: '#078DEE',
        }}
      />

      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item xs={4} md={4}>
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              rowGap={1}
              columnGap={2}
              sx={{ padding: '16px' }}
            >
              <Typography
                component="label"
                htmlFor="farmer-season"
                sx={{
                  color: '#078DEE',
                  marginBottom: '8px',
                  display: 'block',
                  fontSize: '16px',
                }}
              >
                Farmer Season
              </Typography>
              <TextField
                select
                id="farmer-season"
                name="seasonTypes"
                value={seasonTypes}
                onChange={(e) => {
                  setValue('seasonTypes', e.target.value);
                  if (soilTypes) {
                    fetchCropTypes(e.target.value, soilTypes);
                  }
                }}
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => value || 'Select a season',
                }}
                fullWidth
                placeholder="Select a season"
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                    fontSize: '16px',
                  },
                }}
              >
                {season?.posts?.map((sea) => (
                  <MenuItem key={sea.id} value={sea.seasonType}>
                    {sea.seasonType}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              rowGap={1}
              columnGap={2}
              sx={{ padding: '16px' }}
            >
              <Typography
                component="label"
                htmlFor="farmer-soil"
                sx={{
                  color: '#078DEE',
                  marginBottom: '8px',
                  display: 'block',
                  fontSize: '16px',
                }}
              >
                Farmer Soil
              </Typography>
              <TextField
                select
                id="farmer-soil"
                name="soilTypes"
                value={soilTypes}
                onChange={(e) => {
                  setValue('soilTypes', e.target.value);
                  if (seasonTypes) {
                    fetchCropTypes(seasonTypes, e.target.value);
                  }
                }}
                fullWidth
                placeholder="Select soil type"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => value || 'Select a soil',
                }}
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                    fontSize: '16px',
                  },
                }}
              >
                {soil?.posts?.map((item) => (
                  <MenuItem key={item.id} value={item.soilType}>
                    {item?.soilType}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
          <Grid item xs={4} md={4}>
            <Box
              display="grid"
              gridTemplateColumns="1fr"
              rowGap={1}
              columnGap={2}
              sx={{ padding: '16px' }}
            >
              <Typography
                component="label"
                htmlFor="crop-type"
                sx={{
                  color: '#078DEE',
                  marginBottom: '8px',
                  display: 'block',
                  fontSize: '16px',
                }}
              >
                Crop Type
              </Typography>
              <TextField
                select
                id="crop-type"
                name="cropTypes"
                value={cropTypes}
                onChange={(e) => {
                  setValue('cropTypes', e.target.value);
                  fetchFarmerData(watch('seasonTypes'), watch('soilTypes'), watch('cropTypes'));
                }}
                fullWidth
                placeholder="Select crop type"
                SelectProps={{
                  displayEmpty: true,
                  renderValue: (value) => value || 'Select a crop',
                }}
                InputProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                    fontSize: '16px',
                  },
                }}
              >
                {crop?.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </TextField>
            </Box>
          </Grid>
        </Grid>
        {watch('cropTypes') && (
          <Grid container>
            {/* Farmer Conditions */}
            {farmerData && (
              <Grid item container xs={12} spacing={4} sx={{ padding: '24px' }}>
                {/* <Paper sx={{ p: 3, mt: 3 }}> */}
                <Grid item xs={12} md={6} sx={{ width: '500px' }}>
                  <Typography
                    variant="h5"
                    gutterBottom
                    style={{ marginLeft: '15px', marginBottom: '10px', color: '#078DEE' }}
                  >
                    Farmer Conditions General Information
                  </Typography>

                  {/* General Information */}
                  <section>
                    <Paper variant="outlined" sx={{ p: 2, marginRight: '15px' }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            <TableRow>
                              <TableCell>Soil Type:</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>
                                {farmerData?.soilType}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Season Type:</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>
                                {farmerData?.seasonType}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Crop Type:</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>
                                {farmerData?.cropType}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Moisture Level:</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>
                                {farmerData?.moistureLevel}
                              </TableCell>
                            </TableRow>
                            <TableRow>
                              <TableCell>Climate:</TableCell>
                              <TableCell sx={{ fontWeight: 'bold' }}>
                                {farmerData?.climate}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </section>
                </Grid>

                {/* Soil Tests */}
                <Grid item xs={12} md={6} sx={{ width: '500px' }}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Soil Tests
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      <TableContainer>
                        <Table>
                          <TableBody>
                            {farmerData?.SoilTests?.map((test) => {
                              // Parse the nutrients string to an object
                              const nutrients = JSON.parse(test.nutrients.replace(/'/g, '"'));

                              return (
                                <React.Fragment key={test?.testId}>
                                  <TableRow>
                                    <TableCell>pH Level</TableCell>
                                    <TableCell>{test?.pHLevel}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Nutrients - K, N, P</TableCell>
                                    <TableCell>{`${nutrients.K}, ${nutrients.N}, ${nutrients.P}`}</TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>Organic Matter</TableCell>
                                    <TableCell>{test?.organicMatter}</TableCell>
                                  </TableRow>
                                  {/* Add a divider row if it's not the last test */}
                                  {test !==
                                    farmerData?.SoilTests[farmerData.SoilTests.length - 1] && (
                                    <TableRow>
                                      <TableCell
                                        colSpan={2}
                                        sx={{ height: '16px', bgcolor: 'rgba(0, 0, 0, 0.06)' }}
                                      />
                                    </TableRow>
                                  )}
                                </React.Fragment>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </TableContainer>
                    </Paper>
                  </section>
                </Grid>

                {/* Soil Preparations */}
                <Grid item xs={12} md={6} gap={9}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Soil Preparations
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.SoilPreparations?.map((prep) => (
                        <div key={prep?.preparationId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {prep?.preparationType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Details: {prep?.details}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* Sowing Methods */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Sowing Methods
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.SowingMethods?.map((method) => (
                        <div key={method?.methodId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {method?.sowingType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {method?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* Irrigation Methods */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Irrigation Methods
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.IrrigationMethods?.map((method) => (
                        <div key={method?.methodId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {method?.irrigationType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {method?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* Fertilization and Pest Management */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Fertilization and Pest Management
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.FertilizationPestMgmts?.map((mgmt) => (
                        <div key={mgmt?.managementId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {mgmt?.type}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {mgmt?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* Harvesting Methods */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Harvesting Methods
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.HarvestingMethods?.map((method) => (
                        <div key={method?.methodId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {method?.harvestingType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {method?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* Marketing Options */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Marketing Options
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.MarketingOptions?.map((option) => (
                        <div key={option?.optionId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {option?.marketType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {option?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>
                {/* Post-Harvest Handling */}
                <Grid item xs={12} md={6}>
                  <section>
                    <Typography variant="h6" gutterBottom sx={{ color: '#078DEE' }}>
                      Post-Harvest Handling
                    </Typography>
                    <Paper variant="outlined" sx={{ p: 2 }}>
                      {farmerData?.PostHarvestHandlings?.map((handling) => (
                        <div key={handling?.handlingId}>
                          <Typography variant="subtitle1" gutterBottom>
                            Type: {handling?.handlingType}
                          </Typography>
                          <Typography variant="body2" gutterBottom>
                            Description: {handling?.description}
                          </Typography>
                        </div>
                      ))}
                    </Paper>
                  </section>
                </Grid>

                {/* </Paper> */}
              </Grid>
            )}

            {!fetchedData && !farmerData && (
              <Grid item xs={12} md={6} sx={{ border: '1px solid red' }}>
                <Typography variant="body1">No data available.</Typography>
              </Grid>
            )}
          </Grid>
        )}
      </FormProvider>
      {/* <Card sx={{ position: 'absolute', top: '80px', right: '50px', width: '600px' }}> */}

      {/* </Card> */}
    </>
  );
}

FarmerRoadMap.propTypes = {
  // Add propTypes if necessary
};
