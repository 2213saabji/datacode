import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridToolbarExport,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
  GridToolbarFilterButton,
  GridToolbarColumnsButton,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-ums';

import { useGetUsers } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import UserProfileAnalytic from '../user-profile-analytic';
import RoleTableFiltersResult from '../user-profile-table-filters-result';
import {
  RenderCellName,
  RenderCellEmail,
  RenderCellNumber,
  RenderCellToggle,
  RenderSurveyCellToggle,
  RenderCellEmailVerified,
  RenderCellNumberVerified,
} from '../user-profile-table-row';
// import { FormControlLabel, Switch } from '@mui/material';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function UserProfileListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { user: userData } = useAuthContext();
  // console.log('userData---------------->', userData)

  const { users, usersLoading } = useGetUsers(userData.accessToken);

  const usersListArr = useMemo(
    () =>
      users?.users?.filter((user) => user.createdBy === userData.userId || user.createdBy === null),
    [users, userData?.userId]
  );

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (usersListArr) {
      const updatedTableData = usersListArr.map((user) => ({
        ...user,
        id: user.userId, // Assign userProfileId as the id property
      }));
      setTableData(updatedTableData);
    }
  }, [users, filters, usersListArr]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });
  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // const handleDeleteRow = useCallback(
  //   async (id) => {
  //     try {
  //       const apiUrl = `/user/delete/${id}`;

  //       const httpMethod = 'DELETE';

  //       const headers = {
  //         method: httpMethod,
  //         headers: {
  //           Authorization: localStorage.getItem('accessToken'),
  //           'Content-Type': 'application/json',
  //         },
  //       };

  //       // Make the API request
  //       const response = await deleter(apiUrl, headers);

  //       if (response.success === true) {
  //         enqueueSnackbar('Delete success!', { variant: 'success' });
  //         const updatedTableData = tableData.filter((row) => row.id !== id);
  //         setTableData(updatedTableData);
  //       } else {
  //         enqueueSnackbar(response.message, { variant: 'error' });
  //       }

  //       console.info('API Response:', response);
  //     } catch (error) {
  //       console.error('API Error:', error);
  //       enqueueSnackbar('Failed to delete row', { variant: 'error' });
  //     }
  //   },
  //   [enqueueSnackbar, tableData]
  // );

  // Delete rows

  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/user/delete`;
      const httpMethod = 'DELETE';
      const hearders = {
        method: httpMethod,
        hearders: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      };
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, hearders);

          if (!response.success !== true) {
            throw new Error(response.message);
          }

          console.info('API Response:', response);
        })
      );
      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  // const handleEditRow = useCallback(
  //   (id) => {
  //     localStorage.setItem('userProfileEditId', id);
  //     router.push(paths.dashboard.userProfileManagement.edit(id));
  //   },
  //   [router]
  // );

  // const handleEditProfileRow = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.userProfileManagement.userEdit(id));
  //     localStorage.setItem('userProfileEditId', id);
  //   },
  //   [router]
  // );
  // const handleEditUserOwner = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.userProfileManagement.userOwnerEdit(id));
  //     localStorage.setItem('userProfileEditId', id);
  //   },
  //   [router]
  // );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'userName',
      headerName: 'Role Type',
      flex: 1,
      minWidth: 150,
      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },

    {
      field: 'email',
      headerName: 'Email Id',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellEmail params={params} />,
    },
    {
      field: 'isEmailVerified',
      headerName: 'Verified Email',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellEmailVerified params={params} />,
    },
    {
      field: 'phone',
      headerName: 'Mobile No.',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellNumber params={params} />,
    },
    {
      field: 'isMobileVerified',
      headerName: 'Verified Mobile No.',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellNumberVerified params={params} />,
    },
    {
      field: 'popUpProfileForm',
      headerName: 'Login Popup',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderCellToggle params={params} />,
    },
    {
      field: 'SurveypopUpProfileForm',
      headerName: 'Survey Popup',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderSurveyCellToggle params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 30,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:pen-bold" />}
        //   label="Edit Profile"
        //   onClick={() => handleEditRow(params.row.id)}
        // />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:pen-bold" />}
        //   label="Edit user role"
        //   onClick={() => handleEditProfileRow(params.row.id)}
        // />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:pen-bold" />}
        //   label="Edit User Owner"
        //   onClick={() => {
        //     handleEditUserOwner(params.row.id);
        //   }}
          // sx={{ color: 'error.main' }}
        // />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        //   label="Delete User"
        //   onClick={() => {
        //     handleDeleteRow(params.row.id);
        //   }}
        //   sx={{ color: 'error.main' }}
        // />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
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
        <CustomBreadcrumbs
          heading="MEMBER LIST"
          links={[
            {
              name: 'Member',
              href: paths.dashboard.userProfileManagement.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.userProfileManagement.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Add New Member
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            mt: 3,
          }}
        />
        <Card
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <UserProfileAnalytic
                title="Total Members"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <UserProfileAnalytic
                title="Total Active Members"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <UserProfileAnalytic
                title="Total Male Members"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <UserProfileAnalytic
                title="Others Gender Members"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card
          sx={{
            flexGrow: { md: 1 },
            display: { md: 'flex' },
            flexDirection: { md: 'column' },
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={usersLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => {
              setSelectedRowIds(newSelectionModel);
            }}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <GridToolbarQuickFilter
                      sx={{
                        '& .MuiInputBase-input::placeholder': {
                          color: 'black',
                        },
                      }}
                    />
                    <Stack
                      spacing={1}
                      flexGrow={1}
                      direction="row"
                      alignItems="center"
                      justifyContent="flex-end"
                    >
                      {!!selectedRowIds.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds.length})
                        </Button>
                      )}

                      <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarExport />
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <RoleTableFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered}
                      sx={{ p: 2.5, pt: 0 }}
                    />
                  )}
                </>
              ),
              noRowsOverlay: () => <EmptyContent title="No Data" />,
              noResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            slotProps={{
              columnsPanel: {
                getTogglableColumns,
              },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
          </>
        }
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              handleDeleteRows();
              confirmRows.onFalse();
            }}
          >
            Delete
          </Button>
        }
      />
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { Name, JobTitle, Country, State } = filters;

  let filteredData = inputData;

  if (Name && Name.length) {
    filteredData = filteredData.filter((user) =>
      user.name.toLowerCase().includes(Name.toLowerCase())
    );
  }

  if (JobTitle && JobTitle.length) {
    filteredData = filteredData.filter((user) =>
      user.job.toLowerCase().includes(JobTitle.toLowerCase())
    );
  }

  if (Country && Country.length) {
    filteredData = filteredData.filter((user) =>
      user.country.toLowerCase().includes(Country.toLowerCase())
    );
  }

  if (State && State.length) {
    filteredData = filteredData.filter((user) =>
      user.state.toLowerCase().includes(State.toLowerCase())
    );
  }

  return filteredData;
}
