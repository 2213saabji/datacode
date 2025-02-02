/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { useGetJobTypes, fetchLabourJobs, getJobTypeCategory } from 'src/api/labour_job';
import { JOB_SORT_OPTIONS, JOB_DISTANCE_OPTIONS, JOB_EMPLOYMENT_TYPE_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobList from '../job-list';
import JobSort from '../job-sort';
import JobSearch from '../job-search';
import JobFilters from '../job-filters';
import JobFiltersResult from '../job-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  locations: [],
  employmentTypes: [],
  jobTypes: [],
};

// ----------------------------------------------------------------------

export default function JobListView({ selfCoordinates, jobType }) {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const openFilters = useBoolean();

  const [sortBy, setSortBy] = useState('latest');

  const [jobs, setJobs] = useState([]);

  const [seletedJobCategory, setSelectedJobCategory] = useState([]);

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const { jobTypes } = useGetJobTypes();

  const jobTypesArr =
    jobTypes?.data?.map(
      (type) => type.jobType.charAt(0).toUpperCase() + type.jobType.slice(1).toLowerCase()
    ) || [];

  // calculate Diatance
  const getDistanceFromLatLonInKm = useCallback((lat1, lon1, lat2, lon2) => {
    const earthRadius = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c; // Distance in km
    return parseFloat(distance.toFixed(0));
  }, []);

  // Helper function to convert degrees to radians
  const deg2rad = (deg) => deg * (Math.PI / 180);

  const [filters, setFilters] = useState(defaultFilters);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchLabourJobs();
      if (data) {
        if (Array.isArray(data)) {
          const updatedData = data
            .map((job) => {
              const jobCoords = { lat: job.latitude, lng: job.longitude };
              if (jobCoords.lat && jobCoords.lng && selfCoordinates.lat && selfCoordinates.lng) {
                const distance = getDistanceFromLatLonInKm(
                  jobCoords.lat,
                  jobCoords.lng,
                  selfCoordinates.lat,
                  selfCoordinates.lng
                );
                return { ...job, distance };
              }
              return job;
            })
            .filter((job) => job.jobType === jobType);
          setJobs(updatedData);
        }
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something Went Wrong While Fetching Labour Jobs.', { variant: 'error' });
    }
  }, [selfCoordinates, getDistanceFromLatLonInKm, jobType]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const dataFiltered = applyFilter({
    inputData: jobs,
    filters,
    sortBy,
  });

  useEffect(() => {
    async function getCategory() {
      const res = await getJobTypeCategory(jobType);
      setSelectedJobCategory(res);
    }

    getCategory();
  }, [jobType]);

  const canReset = !isEqual(defaultFilters, filters);

  const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);

  const handleSearch = useCallback(
    (inputValue) => {
      setSearch((prevState) => ({
        ...prevState,
        query: inputValue,
      }));

      if (inputValue) {
        const results = jobs?.filter(
          (job) => job?.jobTitle?.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query, jobs]
  );

  const renderFilters = (
    <Stack
      spacing={3}
      justifyContent="space-between"
      alignItems={{ xs: 'flex-end', sm: 'center' }}
      direction={{ xs: 'column', sm: 'row' }}
    >
      <JobSearch
        query={search.query}
        results={search.results}
        onSearch={handleSearch}
        hrefItem={(id) => paths.dashboard.labour_job_portal.details(id)}
      />

      <Stack direction="row" spacing={1} flexShrink={0}>
        <JobFilters
          open={openFilters.value}
          onOpen={openFilters.onTrue}
          onClose={openFilters.onFalse}
          //
          filters={filters}
          onFilters={handleFilters}
          //
          canReset={canReset}
          onResetFilters={handleResetFilters}
          //
          locationOptions={JOB_DISTANCE_OPTIONS.map((option) => option.label)}
          selfCoordinates={selfCoordinates}
          employmentTypeOptions={JOB_EMPLOYMENT_TYPE_OPTIONS.map((option) => option.label)}
          jobTypeOptions={seletedJobCategory.map((option) => option.label)}
        />

        <JobSort sort={sortBy} onSort={handleSortBy} sortOptions={JOB_SORT_OPTIONS} />
      </Stack>
    </Stack>
  );

  const renderResults = (
    <JobFiltersResult
      filters={filters}
      onResetFilters={handleResetFilters}
      //
      canReset={canReset}
      onFilters={handleFilters}
      //
      results={dataFiltered.length}
    />
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <CustomBreadcrumbs
        heading="LABOUR JOB LIST"
        links={[
          { name: 'Job List', href: paths.dashboard.labour_job_portal.root },
          { name: `${jobType} Job List` },
        ]}
        action={
          user?.userRoleId === 1 || user?.userRoleId === 30 ? (
            <Button
              component={RouterLink}
              href={paths.dashboard.labour_job_portal.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Job Post
            </Button>
          ) : null
        }
        sx={{
          mb: { xs: 3, md: 5 },
          mt: 3,
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {renderFilters}

        {canReset && renderResults}
      </Stack>

      {notFound || (jobs.length === 0 && <EmptyContent filled title="No Data" sx={{ py: 10 }} />)}

      {!notFound && <JobList jobs={dataFiltered} />}
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { employmentTypes, locations, jobTypes } = filters;

  // SORT BY
  if (sortBy === 'latest') {
    inputData = orderBy(inputData, ['created_at'], ['desc']);
  }

  if (sortBy === 'oldest') {
    inputData = orderBy(inputData, ['created_at'], ['asc']);
  }

  // FILTERS
  if (employmentTypes.length) {
    inputData = inputData.filter((job) => employmentTypes.includes(job.employmentType));
  }

  if (locations.length) {
    inputData = inputData.filter((job) =>
      locations.some((value) => job.distance <= parseInt(value.split(' ')[0], 10))
    );
  }

  if (jobTypes.length) {
    inputData = inputData.filter((job) => jobTypes.includes(job.jobTitle));
  }

  return inputData;
};

JobListView.propTypes = {
  selfCoordinates: PropTypes.object,
  jobType: PropTypes.string,
};
