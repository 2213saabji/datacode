import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { CategoryCreateView } from 'src/sections/categoriesmanagement/view';

// ----------------------------------------------------------------------

export default function CategoryCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Create a new category</title>
      </Helmet>

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <CategoryCreateView />
    </>
  );
}
