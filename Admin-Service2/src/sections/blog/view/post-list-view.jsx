import orderBy from 'lodash/orderBy';
import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { useDebounce } from 'src/hooks/use-debounce';

import { useGetPosts } from 'src/api/blog';
import { POST_SORT_OPTIONS } from 'src/_mock';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostSort from '../post-sort';
// import PostSearch from '../post-search';
import PostListHorizontal from '../post-list-horizontal';

// ----------------------------------------------------------------------

export default function PostListView() {
  const settings = useSettingsContext();

  const [sortBy, setSortBy] = useState('latest');

  const [filters, setFilters] = useState({ publish: 'all' });

  // const [searchQuery, setSearchQuery] = useState('');

  // const debouncedQuery = useDebounce(searchQuery);

  const { posts, postsLoading, mutate: blogMutate } = useGetPosts();

  // const { searchResults, searchLoading } = useSearchPosts(debouncedQuery);
  const handleSortBy = useCallback((newValue) => {
    setSortBy(newValue);
  }, []);
  // console.log("inputData",posts)

  const dataFiltered = applyFilter({
    inputData: posts,
    filters,
    sortBy,
  });

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  // const handleSearch = useCallback((inputValue) => {
  //   setSearchQuery(inputValue);
  // }, []);

  const handleFilterPublish = useCallback(
    (event, newValue) => {
      handleFilters('publish', newValue);
    },
    [handleFilters]
  );

  function filterdata(tab) {
    if (tab === 'all') {
      setFilters({ publish: 'all' });
    } else if (tab === 'published') {
      setFilters({ publish: 'published' });
    } else if (tab === 'draft') {
      setFilters({ publish: 'draft' });
    }
  }
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
        heading="LIST"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Blog',
            href: paths.dashboard.blog.root,
          },
          {
            name: 'List',
          },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.blog.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Post
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
          mt: 3,
        }}
      />

      <Stack
        spacing={3}
        justifyContent="space-between"
        alignItems={{ xs: 'flex-end', sm: 'center' }}
        direction={{ xs: 'column', sm: 'row' }}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {/* <PostSearch
          query={debouncedQuery}
          results={searchResults}
          onSearch={handleSearch}
          loading={searchLoading}
          hrefItem={(title) => paths.dashboard.post.details(title)}
        /> */}
        <PostSort sort={sortBy} onSort={handleSortBy} sortOptions={POST_SORT_OPTIONS} />
      </Stack>

      <Tabs
        value={filters.publish}
        onChange={handleFilterPublish}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {['all', 'published', 'draft'].map((tab) => (
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
                color={(tab === 'published' && 'info') || 'default'}
              >
                {tab === 'all' && posts.length}

                {tab === 'published' && posts.filter((post) => post.status === 'published').length}

                {tab === 'draft' && posts.filter((post) => post.status === 'draft').length}
              </Label>
            }
            sx={{ textTransform: 'capitalize' }}
          />
        ))}
      </Tabs>

      <PostListHorizontal posts={dataFiltered} loading={postsLoading} blogMutate={blogMutate} />
    </Container>
  );
}

// ----------------------------------------------------------------------

const applyFilter = ({ inputData, filters, sortBy }) => {
  const { publish } = filters;
  if (publish !== 'all') {
    inputData = inputData.filter((post) => post.status === publish);
  }

  if (sortBy === 'latest') {
    // inputData = inputData.sort((a, b) => a.created_at - b.created_at);
    inputData = orderBy(inputData, ['createdAt'], ['desc']);
  }

  if (sortBy === 'oldest') {
    // inputData = inputData.sort((a, b) => b.created_at - a.created_at);
    inputData = orderBy(inputData, ['createdAt'], ['asc']);
  }

  if (sortBy === 'popular') {
    // inputData = inputData.sort((a, b) => b.createdAt - a.createdAt);
    // inputData = orderBy(inputData, ['totalViews'], ['desc']);
  }
  // console.log("inputData",inputData);
  return inputData;
};
