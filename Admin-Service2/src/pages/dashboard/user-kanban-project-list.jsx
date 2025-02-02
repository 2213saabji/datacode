import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { Helmet } from 'react-helmet-async';
import { enqueueSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
// import { TagsInput } from 'react-tag-input-component';
import {
  useState,
  useEffect,
  useCallback,
  //  useMemo
} from 'react';

import Chip from '@mui/material/Chip';
import Button from '@mui/material/Button';
import {
  Grid,
  Dialog,
  Container,
  // TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';

import { RouterLink } from 'src/routes/components';

import { deleter, endpoints } from 'src/utils/axios-kanban';

// import { _tags } from 'src/_mock/assets';
import { createProject, updateProject, useGetAllProjects } from 'src/api/kanban';

// import Iconify from 'src/components/iconify';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

import UserProjectItem from './user-kanban-project-item';

const types = ['Epic', 'Feature', 'User Stories', 'Task', 'Test Plan', 'Bug'];

const columns = ['Active', 'In Progress', 'Done'];

export default function KanbanPage() {
  const { projects } = useGetAllProjects();
  const [allProjects, setAllProjects] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [editingProject, setEditingProject] = useState(null);
  const [editProjectIndex, setEditProjectIndex] = useState(null);
  // const [newProject, setNewProject] = useState({ name: '', description: '' });

  useEffect(() => {
    // Clear the local storage item for 'worktitle' one time on loading
    localStorage.removeItem('workTitle');
  }, []); // Empty dependency array ensures this runs once on mount

  useEffect(() => {
    setAllProjects(projects);
  }, [projects]);

  // const handleOpenCreate = () => {
  //   setOpenCreate(true);
  // };

  const handleCloseCreate = () => {
    setOpenCreate(false);
  };

  // const handleOpenEdit = (project) => {
  //   setEditingProject(project);
  // };

  const handleCloseEdit = () => {
    setOpenEdit(false);
    setEditingProject(null);
  };

  const ProjectCreateSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('description is required'),
    types: Yup.array().min(1, 'Must have at least 1 tag'),
    columns: Yup.array().min(1, 'Must have at least 1 tag'),
  });

  const defaultValues = {
    name: '',
    description: '',
    types: types || [],
    columns: columns || [],
  };
  const methods = useForm({
    resolver: yupResolver(ProjectCreateSchema),
    defaultValues,
  });

  const { handleSubmit: handleCreateProject } = methods;

  const ProjectUpdateSchema = Yup.object().shape({
    name: Yup.string().required('name is required'),
    description: Yup.string().required('description is required'),
    types: Yup.array().min(2, 'Must have at least 2 tag'),
    columns: Yup.array().min(2, 'Must have at least 2 tag'),
  });

  const defaultUpdateValues = {
    name: '',
    description: '',
    types: [],
    columns: [],
  };
  const Updatemethods = useForm({
    resolver: yupResolver(ProjectUpdateSchema),
    defaultUpdateValues,
  });

  const { handleSubmit: handleUpdateProject, setValue } = Updatemethods;

  const onSubmitCreateProject = handleCreateProject(async (data) => {
    try {
      const response = await createProject(data);
      setAllProjects([...allProjects, response?.data?.data]);
      handleCloseCreate();
      enqueueSnackbar('project created!', { variant: 'success' });
    } catch (error) {
      console.error('There was a problem creating the project:', error);
      enqueueSnackbar('Failed to create project', { variant: 'error' });
    }
  });

  const updateValues = (performa, index, project) => {
    if (performa === 'Update') {
      setValue('name', project?.name);
      setValue('description', project?.description);
      setValue('types', project?.config?.types);
      setValue('columns', project?.config?.columns);
      setEditProjectIndex(project?.projectId);
      setOpenEdit(true);
    }
  };

  const onSubmitUpdateProject = handleUpdateProject(async (data) => {
    try {
      const response = await updateProject(editProjectIndex, data);
      setAllProjects(
        allProjects.map((project) =>
          project.projectId === response.projectId ? response : project
        )
      );
      handleCloseEdit();
      enqueueSnackbar('Project updated!', { variant: 'success' });
    } catch (error) {
      console.error('There was a problem updating the project:', error);
      enqueueSnackbar('Failed to update project', { variant: 'error' });
    }
  });

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewProject((prevProject) => ({
  //     ...prevProject,
  //     [name]: value,
  //   }));
  // };

  const deleteProject = useCallback(async (Id) => {
    const url = `${endpoints.project.delete}/${Id}`;

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
        setAllProjects((prevProjects) =>
          prevProjects.filter((project) => project.projectId !== Id)
        );
      } else {
        enqueueSnackbar(response.message, { variant: 'error' });
      }

      console.info('API Response:', response);
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete project', { variant: 'error' });
    }
  }, []);

  return (
    <>
      <Helmet>
        <title>Dashboard: Kanban</title>
      </Helmet>
      <Container>
        <Grid
          container
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          spacing={1}
          sx={{
            p: 0.25,
            // height: 1,
          }}
        >
          <Button
            component={RouterLink}
            to="/dashboard"
            variant="outlined"
            color="primary"
            style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
          >
            Back
          </Button>

          <Grid item>
            <Typography variant="h4" gutterBottom>
              NATIONAL PROJECTS UPDATES
            </Typography>
          </Grid>

          <Grid item>
            {/* <Button
              size="large"
              color="inherit"
              variant="outlined"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={handleOpenCreate}
            >
              Create Project
            </Button> */}
          </Grid>
        </Grid>
        <Grid
          container
          spacing={3}
          sx={{
            p: 0.25,
            mt: 2,
          }}
        >
          {allProjects?.map((project, index) => (
            <UserProjectItem
              key={index}
              project={project}
              onDelete={deleteProject}
              index={index}
              updateValues={updateValues}
            />
          ))}
        </Grid>

        <Dialog open={openCreate} onClose={handleCloseCreate}>
          <DialogTitle>Create New Project</DialogTitle>
          <FormProvider methods={methods} onSubmit={onSubmitCreateProject}>
            <DialogContent>
              <RHFTextField
                name="name"
                label="Project Title"
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />

              <RHFTextField
                name="description"
                label="Project Description"
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />

              <RHFAutocomplete
                name="types"
                label="Types"
                placeholder="+ Tags"
                multiple
                freeSolo
                sx={{
                  mt: 2,
                }}
                options={types.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
              <RHFAutocomplete
                name="columns"
                label="Columns"
                placeholder="+ Tags"
                multiple
                freeSolo
                sx={{
                  mt: 2,
                }}
                options={columns.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseCreate}>Cancel</Button>
              <Button type="submit">Create</Button>
            </DialogActions>
          </FormProvider>
        </Dialog>

        <Dialog open={openEdit} onClose={handleCloseEdit}>
          <DialogTitle>Edit Project</DialogTitle>
          <FormProvider methods={Updatemethods} onSubmit={onSubmitUpdateProject}>
            <DialogContent>
              <RHFTextField
                name="name"
                label="Project Title"
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />

              <RHFTextField
                name="description"
                label="Project Description"
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />

              <RHFAutocomplete
                name="types"
                label="Types"
                placeholder="+ Tags"
                multiple
                freeSolo
                sx={{
                  mt: 2,
                }}
                options={types.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
              <RHFAutocomplete
                name="columns"
                label="Columns"
                placeholder="+ Tags"
                multiple
                freeSolo
                sx={{
                  mt: 2,
                }}
                options={columns.map((option) => option)}
                getOptionLabel={(option) => option}
                renderOption={(props, option) => (
                  <li {...props} key={option}>
                    {option}
                  </li>
                )}
                renderTags={(selected, getTagProps) =>
                  selected.map((option, index) => (
                    <Chip
                      {...getTagProps({ index })}
                      key={option}
                      label={option}
                      size="small"
                      color="info"
                      variant="soft"
                    />
                  ))
                }
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEdit}>Cancel</Button>
              <Button type="submit">Edit</Button>
            </DialogActions>
          </FormProvider>
        </Dialog>
      </Container>
    </>
  );
}
