import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
// import Box from '@mui/material/Box';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

// import { useGetWard } from 'src/api/ward';
import { useGetCategory } from 'src/api/exp_category';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import CategoryDetailsHero from '../category-details-hero';
// import { CandidateDetailsSkeleton } from '../candidate-skeleton';

// ----------------------------------------------------------------------

export default function CategoryDetailsView({ id }) {
  const { category, categoryError } = useGetCategory(id);

  const [categoryData, setCategoryData] = useState({});

  useEffect(() => {
    if (category && category.data) {
      setCategoryData(category.data);
    }
  }, [category]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${categoryError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.category}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = category && (
    <>
      <CategoryDetailsHero title="CATEGORY DETAILS" coverUrl={BannerBlurImg} />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'Category',
              href: paths.dashboard.category.root,
            },
            {
              name: 'Details',
              href: paths.category,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Category Id:</Typography>
              <Typography sx={{ ml: 1 }}> {categoryData.expenseCategoryId}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Category Name:</Typography>
              <Typography sx={{ ml: 1 }}> {categoryData.expenseCategoryName}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {categoryError && renderError}

      {category && renderPost}
    </>
  );
}
CategoryDetailsView.propTypes = {
  id: PropTypes.string,
};
