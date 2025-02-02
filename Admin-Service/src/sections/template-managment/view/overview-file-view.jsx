import { useState, useEffect, useCallback } from 'react';

import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-templateManagemet';

import { useAuthContext } from 'src/auth/hooks';
import { useGetTemplatePosts } from 'src/api/templatesManagement';

import { useSnackbar } from 'src/components/snackbar';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import FileRecentItem from '../file-recent-item';
import FileManagerPanel from '../file-manager-panel';
import FileManagerNewFolderDialog from '../file-manager-new-folder-dialog';

// ----------------------------------------------------------------------

export default function OverviewFileView() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const settings = useSettingsContext();

  const upload = useBoolean();

  const { posts } = useGetTemplatePosts();

  const [PostData, setPostData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { user } = useAuthContext();

  useEffect(() => {
    setPostData(posts);
  }, [posts]);

  const handleDelete = useCallback(
    async (id) => {
      try {
        const url = `/template/delete/${id}`;

        const httpMethod = 'DELETE';

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
          setPostData((prevData) => prevData.filter((file) => file.template_id !== id));
        } else {
          // Handle error
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user.accessToken]
  );

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredPosts = PostData.filter((file) =>
    file?.templateImageDetails?.name?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          <Grid xs={12} md={6} lg={12}>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="outlined"
              color="primary"
              style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
            >
              Back
            </Button>
            <div>
              <CustomBreadcrumbs
                heading="List"
                links={[
                  {
                    name: 'Dashboard',
                    href: paths.dashboard.root,
                  },
                  {
                    name: 'Template Management',
                    href: paths.dashboard.templateManagement,
                  },
                  {
                    name: 'Templates',
                  },
                ]}
                sx={{
                  mt: 3,
                }}
              />
              <FileManagerPanel
                title="Upload New Template"
                link={paths.dashboard.fileManager}
                onOpen={upload.onTrue}
                sx={{ mt: 2 }}
              />
              <Typography variant="h6" sx={{ marginBottom: '20px' }}>
                Template Lists
              </Typography>
              <TextField
                fullWidth
                label="Search Templates"
                variant="outlined"
                value={searchQuery}
                onChange={handleSearch}
                sx={{ marginBottom: '20px' }}
                InputLabelProps={{
                  style: {
                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                  },
                }}
              />
              <Stack spacing={2}>
                {filteredPosts?.map((file) => (
                  <FileRecentItem
                    key={file.template_id}
                    file={file}
                    onDelete={() => {
                      handleDelete(file.template_id);
                    }}
                  />
                ))}
              </Stack>
            </div>
          </Grid>
        </Grid>
      </Container>
      <FileManagerNewFolderDialog open={upload.value} onClose={upload.onFalse} />
    </>
  );
}
