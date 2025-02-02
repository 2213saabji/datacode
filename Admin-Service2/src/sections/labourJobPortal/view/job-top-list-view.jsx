/* eslint-disable no-unused-vars */
import orderBy from 'lodash/orderBy';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Grid, CardMedia, CardContent, CardActionArea } from '@mui/material';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetJobTypes, fetchLabourJobs } from 'src/api/labour_job';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobFiltersResult from '../job-filters-result';

// ----------------------------------------------------------------------

const defaultFilters = {
  locations: [],
  employmentTypes: [],
  jobTypes: [],
};

// ----------------------------------------------------------------------

export default function JobTopListView() {
  const settings = useSettingsContext();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [sortBy, setSortBy] = useState('latest');

  const [jobs, setJobs] = useState([]);
  const [jobNumb, setJobNumb] = useState({});

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const { jobTypes } = useGetJobTypes();

  const jobTypesArr = useMemo(
    () =>
      jobTypes?.data?.map(
        (type) => type.jobType.charAt(0).toUpperCase() + type.jobType.slice(1).toLowerCase()
      ) || [],
    [jobTypes]
  );

  const [filters, setFilters] = useState(defaultFilters);

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchLabourJobs();
      if (data) {
        setJobs(data);
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something Went Wrong While Fetching Labour Jobs.', { variant: 'error' });
    }
  }, [enqueueSnackbar]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const jobObj = {};
    jobTypesArr.forEach((job) => {
      jobObj[job] = 0;
    });

    jobs.forEach((job) => {
      if (jobObj[job.jobType] !== undefined) {
        jobObj[job.jobType] += 1;
      } else {
        jobObj[job.jobType] = 1; // initialize count if the job type wasn't present
      }
    });

    setJobNumb(jobObj);
  }, [jobTypesArr, jobs]);
  const dataFiltered = applyFilter({
    inputData: jobs,
    filters,
    sortBy,
  });

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

  const router = useRouter();
  const { open, openPaymentModal } = useAuthContext();

  const goTo = (path) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(path);
    }
  };

  const handleButtonClick = (url) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(url);
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="LABOUR JOB LIST"
        links={[{ name: '', href: paths.dashboard.root }, { name: 'Job List' }]}
        action={
          user?.userRoleId === 1 || user?.userRoleId === 30 || user?.userRoleId === 9 ? (
            <Button
              // component={RouterLink}
              // href={user?.userRoleId === 9 ? paths.dashboard.user.profile : paths.dashboard.labour_job_portal.new}
              onClick={() => {
                handleButtonClick(
                  user?.userRoleId === 9
                    ? paths.dashboard.user.profile
                    : paths.dashboard.labour_job_portal.new
                );
              }}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              {user?.userRoleId === 9 ? 'UPGRADE TO EMPLOYER' : 'New Job Post'}
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
        {/* {renderFilters} */}

        {canReset && renderResults}
      </Stack>

      {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />}

      {/* <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {jobTypesArr.map((job) => (
          <Card >
       
            <ListItemText
              sx={{ mb: 1, p: 2 }}
              primary={
                <Stack direction='column' alignItems='center'>
                  <Box component="img" src='/logo/logo_single.svg' alt='No Image' sx={{ width: '150px' }} />
                  <Link
                    component={RouterLink}
                    href={paths.dashboard.labour_job_portal.subList(job)}
                    color="inherit"
                  >
                    {job?.toUpperCase()}
                  </Link>
                  <Typography>
                    Total job available: {jobNumb[job]}
                  </Typography>
                  <Typography>
                  </Typography>
                </Stack>


              }


              primaryTypographyProps={{
                typography: 'subtitle1',
              }}
              secondaryTypographyProps={{
                mt: 1,
                component: 'span',
                typography: 'caption',
                color: 'text.disabled',
              }}
            />
          </Card>
        ))}
      </Box> */}
      <Grid container sx={{ mt: 2, gridGap: 24, justifyContent: 'space-evenly' }}>
        {jobTypesArr.map((card) => (
          <Grid
            item
            key={card.id}
            xs={8}
            sm={4}
            md={4}
            lg={3}
            sx={{
              borderRadius: '20px',
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              padding: '0 !important',
              margin: '0 !important',
              transition: 'transform 0.4s ease-in',
              '&:hover': {
                transform: { xs: 'scale(1)', md: 'scale(1.05)' },
              },
            }}
          >
            <CardActionArea
              onClick={() => goTo(paths.dashboard.labour_job_portal.subList(card))}
              sx={{ textDecoration: 'none', textAlign: 'center', height: '100%', width: '100%' }}
            >
              <Card
                sx={{ height: '100%', width: '100%', borderRadius: '20px', position: 'relative' }}
              >
                <CardMedia sx={{ p: 1 }}>
                  <Box
                    component="img"
                    src="/logo/logo_single.svg"
                    alt="no image"
                    sx={{ width: '170px' }}
                  />
                </CardMedia>
                <Stack
                  direction="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    width: '100%',
                    // position: "absolute",
                    top: 0,
                    left: 0,
                    backgroundColor: '#078dee',
                    color: 'white',
                    padding: '8px 8px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    zIndex: 1,
                  }}
                >
                  <Typography variant="h6">Total jobs available </Typography>
                  <Typography
                    variant="h5"
                    sx={{
                      bgcolor: 'white',
                      color: 'black',
                      padding: '4px 15px',
                      fontWeight: 'bold',
                      borderRadius: '10px',
                    }}
                  >
                    {jobNumb[card]}
                  </Typography>
                </Stack>
                <CardContent>
                  <Typography variant="h5">{card?.toUpperCase()}</Typography>
                </CardContent>
              </Card>
            </CardActionArea>
          </Grid>
        ))}
      </Grid>
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
    inputData = inputData.filter((job) => jobTypes.includes(job.jobType));
  }

  return inputData;
};
