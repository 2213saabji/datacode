import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Box from '@mui/material/Box';
import Pagination, { paginationClasses } from '@mui/material/Pagination';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { deleter } from 'src/utils/axiox-labour-job-portal';

import { useAuthContext } from 'src/auth/hooks';

import { useSnackbar } from 'src/components/snackbar';

import JobItem from './job-item';

// ----------------------------------------------------------------------

export default function JobList({ jobs }) {
  const router = useRouter();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const [jobTableData, setJobTableData] = useState([]);

  useEffect(() => {
    if (jobs && jobs.length > 0) {
      setJobTableData(jobs);
    }
  }, [jobs]);

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.labour_job_portal.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.labour_job_portal.edit(id));
    },
    [router]
  );

  const handleDelete = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const url = `/jobPost/delete/${id}`;
        const httpMethod = 'DELETE';
        // Use the DELETE HTTP method
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        const response = await deleter(url, headers);

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = jobTableData.filter((row) => row.jobPostId !== id);
          setJobTableData(updatedTableData);
        } else {
          // Handle error
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, jobTableData, user.accessToken]
  );

  return (
    <>
      <Box
        gap={3}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)',
        }}
      >
        {jobTableData.map((job) => (
          <JobItem
            key={job.jobPostId}
            job={job}
            onView={() => handleView(job.jobPostId)}
            onEdit={() => handleEdit(job.jobPostId)}
            onDelete={() => handleDelete(job.jobPostId)}
          />
        ))}
      </Box>

      {jobTableData.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )}
    </>
  );
}

JobList.propTypes = {
  jobs: PropTypes.array,
};
