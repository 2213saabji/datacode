import { enqueueSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Tab, Tabs } from '@mui/material';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter, endpoints } from 'src/utils/axios-survey';

import { _jobs } from 'src/_mock';
import { useGetAllSurvey } from 'src/api/survey';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import JobList from '../job-list';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

export default function JobListView() {
  const settings = useSettingsContext();

  const openFilters = useBoolean();
  console.log(openFilters);
  const data = useGetAllSurvey();

  // console.log('data------>', data)
  const { refetch: refetchSurveyResponse } = useGetAllSurvey();

  const [survey, setSurvey] = useState([]);

  useEffect(() => {
    if (data.survey) {
      setSurvey(data.survey);
    }
  }, [data.survey, data]);

  const [sortBy, setSortBy] = useState('latest');

  const [search, setSearch] = useState({
    query: '',
    results: [],
  });

  const [filters, setFilters] = useState({ publish: 'all' });

  const dataFiltered = applyFilter({
    inputData: survey,
    filters,
    sortBy,
  });

  // const canReset = !isEqual(defaultFilters, filters);

  // const notFound = !dataFiltered.length && canReset;

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  function filterdata(tab) {
    if (tab === 'all') {
      setFilters({ publish: 'all' });
    } else if (tab === 'Closed') {
      setFilters({ publish: 'Closed' });
    } else if (tab === 'Open') {
      setFilters({ publish: 'Open' });
    }
  }

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

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
        const results = _jobs.filter(
          (job) => job.title.toLowerCase().indexOf(search.query.toLowerCase()) !== -1
        );

        setSearch((prevState) => ({
          ...prevState,
          results,
        }));
      }
    },
    [search.query]
  );
  console.log(handleSortBy, handleSearch);

  const handleDelete = useCallback(
    async (Id) => {
      const url = `${endpoints.survey.delete}/${Id}`;

      try {
        const httpMethod = 'DELETE';
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        };

        const response = await deleter(url, headers);
        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          refetchSurveyResponse();
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
        setSurvey((prev) => prev.filter((job) => job.surveyId !== Id));
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete survey', { variant: 'error' });
      }
    },
    [refetchSurveyResponse]
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 4 }}
      >
        Back
      </Button>
      <CustomBreadcrumbs
        heading="SURVEY LIST"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          {
            name: 'Survey',
            href: paths.dashboard.survey.root,
          },
          { name: 'Survey List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.survey.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Survey
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
          mt: 2,
        }}
      />

      <Stack
        spacing={2.5}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        <Tabs
          value={filters.publish}
          onChange={handleFilterPublish}
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          {['all', 'Open', 'Closed'].map((tab) => (
            <Tab
              key={tab}
              iconPosition="end"
              value={tab}
              label={tab}
              onClick={() => {
                filterdata(tab);
              }}
              icon={
                <Label
                  variant={((tab === 'all' || tab === filters.publish) && 'filled') || 'soft'}
                  color={(tab === 'Open' && 'info') || 'default'}
                >
                  {tab === 'all' && data?.survey?.length}

                  {tab === 'Open' &&
                    data?.survey?.filter((surv) => surv.surveyStatus === 'Open').length}

                  {tab === 'Closed' &&
                    data?.survey?.filter((surv) => surv.surveyStatus === 'Closed').length}
                </Label>
              }
              sx={{ textTransform: 'capitalize' }}
            />
          ))}
        </Tabs>

        {/* {renderFilters} */}

        {/* {canReset && renderResults} */}
      </Stack>

      {/* {notFound && <EmptyContent filled title="No Data" sx={{ py: 10 }} />} */}

      <JobList jobs={dataFiltered} onDelete={handleDelete} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;

  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.surveyStatus === publish);
  }

  return inputData;
};
