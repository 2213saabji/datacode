/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { useTheme } from '@mui/material';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-ums';

import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import { useGetUserBySeller } from '../../../../api/interestedConsumer';
import {
  RenderCellInstituteName,
  RenderCellStudentNumber,
  RenderCellStudentQualifiation,
} from '../InterestedFarmers-table-row';
import PartyTableFiltersResult from '../../../Student-career/party-table-filters-result';

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

export default function InterestedFarmersListView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const { user } = useAuthContext();
  // console.log('user------->', user)

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // Fetch data of all schools

  const { usersBySeller, usersBySellerError, usersBySellerLoading } = useGetUserBySeller(user?.accessToken)

  const filteredArr = [];

  usersBySeller?.data?.forEach((obj) => {
    // Check if the current object's InterestedConsumerId is already in filteredArr
    if (!filteredArr.some(item => item.interestedConsumerId === obj.interestedConsumerId)) {
      // If not, push the object into filteredArr
      filteredArr.push(obj);
    }
  });
  
  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const [productSelected, setProductSelected] = useState(() => {
    const data = localStorage.getItem('currProduct');
    if (data) return data;
    return 'school';
  });

  useEffect(() => {
    const updatedTableData = usersBySeller?.data?.map((item) => ({
      ...item,
      id: item.consumerId,
    }));
    if (updatedTableData) {
      setTableData(updatedTableData);
    }
  }, [usersBySeller]);

  // useEffect(() => {
  //   if (schools && schools.data) {
  //     // Map the schools data and add the WardId as the id property for each row
  //     const updatedTableData = schools.data.map((school) => ({
  //       ...school,
  //       id: school.schoolDetailId,
  //     }));
  //     setTableData(updatedTableData);
  //   }
  // }, [schools]);

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

  const handleFilterStatus = useCallback((event, newValue) => {
    setProductSelected(newValue);
    localStorage.setItem('currProduct', newValue);
  }, []);

  const InstType = useCallback(() => {
    if (productSelected === 'school') {
      return 'schoolDetails';
    }
    if (productSelected === 'college') {
      return 'collegeDetails';
    }
    if (productSelected === 'coachingCenter') {
      return 'coachingCenterDetails';
    }
    return [];
  }, [productSelected]);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const url = `/interestedConsumer/delete/${id}`;

        // Use the DELETE HTTP method
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
          const updatedTableData = tableData.filter((row) => row.interestedConsumerId !== id);
          setTableData(updatedTableData);
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
    [enqueueSnackbar, tableData, user.accessToken]
  );


  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `interestedConsumer/delete`;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, headers);

          if (response.success !== true) {
            throw new Error(response.message);
          }

          console.info('API Response:', response);
        })
      );

      // Filter out deleted rows from tableData
      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id, studentCareerOption) => {
      router.push(paths.dashboard.StudentCareer.edit(id, studentCareerOption));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      if (productSelected === 'school') {
        router.push(paths.dashboard.StudentCareer.instituteDetails(id));
      } else if (productSelected === 'college') {
        router.push(paths.dashboard.StudentCareer.collegeDetails(id));
      } else if (productSelected === 'coachingCenter') {
        router.push(paths.dashboard.StudentCareer.coachingCenterDetails(id));
      } else if (productSelected === 'myAppointments') {
        router.push(paths.dashboard.StudentCareer.appointmnetDetails(id));
      } else {
        router.push(paths.dashboard.StudentCareer.instituteDetails(id));
      }
    },
    [productSelected, router]
  );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },

    {
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellInstituteName params={params} />,
    },
    {
      field: 'contact',
      headerName: 'Contact Number',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellStudentNumber params={params} />,
    },
    {
      field: 'qualification',
      headerName: 'Qualification',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellStudentQualifiation params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {
        const actions = [
          // <GridActionsCellItem
          //   showInMenu
          //   icon={<Iconify icon="solar:eye-bold" />}
          //   label="View"
          //   onClick={() => handleViewRow(params.row.id)}
          // />,
          // <GridActionsCellItem
          //       showInMenu
          //       icon={<Iconify icon="solar:pen-bold" />}
          //       label="Edit"
          //       onClick={() => handleEditRow(params.row.id, 'school')}
          //     />,
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Delete"
            onClick={() => handleDeleteRow(params?.row?.interestedConsumerId)}
            sx={{ color: 'error.main' }}
          />
        ];

        return actions;
      },
    },
  ];

  const { open, openPaymentModal } = useAuthContext();

  const handleClick = (url) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(url);
    }
  };

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
        {/* <Button
          component={RouterLink}
          to="/dashboard"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
        >
          Back
        </Button> */}

        <CustomBreadcrumbs
          heading="INTERESTED FARMERS"
          links={[
            {
              name: 'FARMERS',
              href: paths.dashboard,
            },
            { name: 'List' },
          ]}
          action={
            <>
              {user.userRoleId === 9 && (
                <Button
                  onClick={() => {
                    localStorage.setItem("profileViewTab", "updateaccount");
                    handleClick(paths.dashboard.user.profile);
                  }}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  UPGRADE TO REGISTER INSTITUTE
                </Button>
              )}

              {/* {user.userRoleId === 44 && (
                <Button
                  onClick={() => handleClick(paths.dashboard.StudentCareer.instituteNew)}
                  variant="contained"
                  startIcon={<Iconify icon="mingcute:add-line" />}
                >
                  Register Your Institution
                </Button>
              )} */}
            </>
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
            // height: { xs: 800, md: 2 },
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
            loading={usersBySellerLoading}
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
                      {/* {!!selectedRowIds?.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds?.length})
                        </Button>
                      )} */}

                      {/* <GridToolbarColumnsButton /> */}
                      {/* <GridToolbarFilterButton /> */}
                      {/* <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <PartyTableFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered?.length}
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

      {/* <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={
          <>
            Are you sure want to delete <strong> {selectedRowIds?.length} </strong> items?
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
      /> */}
    </>
  );
}

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock?.length) {
    inputData = inputData.filter((product) => stock?.includes(product.inventoryType));
  }

  if (publish?.length) {
    inputData = inputData.filter((product) => publish?.includes(product.publish));
  }

  return inputData;
}
