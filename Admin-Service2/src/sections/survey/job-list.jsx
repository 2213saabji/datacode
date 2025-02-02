import PropTypes from 'prop-types';
import { useCallback } from 'react';

// import { enqueueSnackbar } from 'notistack';
import Box from '@mui/material/Box';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import EmptyContent from 'src/components/empty-content';

import JobItem from './job-item';

// ----------------------------------------------------------------------

export default function JobList({ jobs, onDelete }) {
  const router = useRouter();

  const handleView = useCallback(
    (id) => {
      router.push(paths.dashboard.survey.details(id));
    },
    [router]
  );

  const handleEdit = useCallback(
    (id) => {
      router.push(paths.dashboard.survey.edit(id));
    },
    [router]
  );

  return (
    <>
      {jobs.length > 0 ? (
        <Box
          gap={3}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          }}
        >
          {jobs.map((survey) => (
            <JobItem
              key={survey.surveyId}
              survey={survey}
              onView={() => handleView(survey.surveyId)}
              onEdit={() => handleEdit(survey.surveyId)}
              onDelete={() => onDelete(survey.surveyId)}
            />
          ))}
        </Box>
      ) : (
        <EmptyContent
          title="No Data"
          description="There are no surveys available at the moment."
          sx={{ py: 0 }}
        />
      )}

      {/* {jobs.length > 8 && (
        <Pagination
          count={8}
          sx={{
            mt: 8,
            [`& .${paginationClasses.ul}`]: {
              justifyContent: 'center',
            },
          }}
        />
      )} */}
    </>
  );
}

JobList.propTypes = {
  jobs: PropTypes.array,
  onDelete: PropTypes.func.isRequired,
};
