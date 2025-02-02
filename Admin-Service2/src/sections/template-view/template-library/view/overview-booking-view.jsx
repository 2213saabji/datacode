import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, TextField } from '@mui/material';

import Label from 'src/components/label';

// import {
//    _bookings,
//    _bookingNew,
import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

//   } from 'src/_mock';
import { useGetTemplatePosts } from 'src/api/templatesManagement';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import BookingDetails from '../booking-details';
// ----------------------------------------------------------------------

const SPACING = 3;
const defaultFilters = {
  publish: 'all',
};

export default function OverviewBookingView({ templatedata }) {
  const settings = useSettingsContext();
  const { posts } = useGetTemplatePosts();
  const [filters, setFilters] = useState(defaultFilters);

  const [PostData, setPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    setPostData(templatedata || posts);
  }, [posts, templatedata]);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  const filteredPosts = PostData.filter((file) =>
    file?.templateImageDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container spacing={SPACING} disableEqualOverflow>
        <Grid xs={12}>
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
            heading="TEMPLATES LIST"
            links={[
              {
                name: 'Dashboard',
                href: paths.dashboard.root,
              },
              {
                name: 'All Templates',
                href: paths.dashboard.templateLibrary,
              },
              {
                name: 'List',
              },
            ]}
          />

          <Tabs
            value={filters.publish}
            onChange={handleFilterPublish}
            sx={{
              mb: { xs: 3, md: 5 },
              mt: 5,
            }}
          >
            {['all', 'published', 'draft'].map((tab) => (
              <Tab
                key={tab}
                iconPosition="end"
                value={tab}
                label={tab}
                icon={
                  <Label
                    variant={((tab === 'all' || tab === filters.publish) && 'filled') || 'soft'}
                    color={(tab === 'published' && 'info') || 'default'}
                  >
                    {tab === 'all' && posts.length}

                    {tab === 'published' &&
                      posts.filter((post) => post.publish === 'published').length}

                    {tab === 'draft' && posts.filter((post) => post.publish === 'draft').length}
                  </Label>
                }
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Tabs>
          <TextField
            fullWidth
            label="Search Templates"
            variant="outlined"
            value={searchQuery}
            onChange={handleSearch}
            sx={{
              marginBottom: '20px',
              '& label': {
                color: '#000', // Default label color
              },
              '& label.Mui-focused': {
                color: '#000', // Focused label color
              },
              '& .MuiInput-underline:after': {
                borderBottomColor: '#000', // Color of underline when focused
              },
              '& .MuiInputBase-input::placeholder': {
                color: '#000', // Placeholder color
                opacity: 1, // Ensure the placeholder color is fully opaque
              },
            }}
          />
          <BookingDetails
            title="Templates Lists"
            tableData={filteredPosts}
            tableLabels={[
              { id: 'TemplateName', label: 'Template Name' },
              { id: 'TemplateSize', label: 'Template Size' },
              { id: 'CreatedAt', label: 'Created At' },
              { id: 'UpdatedAt', label: 'Updated At' },
              { id: 'status', label: 'Status' },
              { id: '' },
            ]}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
OverviewBookingView.propTypes = {
  templatedata: PropTypes.array,
};
