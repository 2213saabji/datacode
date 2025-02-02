import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
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

import { deleter } from 'src/utils/axios-tms';
import { useAuthContext } from 'src/auth/hooks';

import { useGetVehicles } from 'src/api/vehicle';
import { VEHICLE_OPTIONS } from 'src/_mock/_vehicle';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import VehicleAnalytic from '../vehicle-analytic';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../vehicle-table-row'; // Changed to vehicle-table-row
import VehicleTableToolbar from '../vehicle-table-toolbar';
import VehicleTableFiltersResult from '../vehicle-table-filters-result';

// ----------------------------------------------------------------------

// const PUBLISH_OPTIONS = [
//   { value: 'published', label: 'Published' },
//   { value: 'draft', label: 'Draft' },
// ];

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function VehicleListView() {
  // Changed to VehicleListView

  const { user } = useAuthContext();

  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetCandidates to fetch data

  const { vehicles, vehiclesLoading, mutate: mutateVehicle } = useGetVehicles(); // Changed to useGetVehicles

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (vehicles && vehicles.data) {
      // Changed to vehicles
      const updatedTableData = vehicles.data.map((vehicle) => ({
        // Changed to vehicles
        ...vehicle, // Changed to vehicle
        id: vehicle.vehicleId, // Changed to vehicleId
      }));
      setTableData(updatedTableData);
    }
  }, [vehicles]); // Changed to vehicles

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
  //       // Use the correct API endpoint URL
  //       const apiUrl = `/vehicle/delete/${id}`;

  //       // Use the DELETE HTTP method
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

  //       // Parse the response JSON

  //       if (response.success === response) {
  //         // Handle success
  //         enqueueSnackbar('Delete success!', { variant: 'success' });
  //         // Update table data after successful deletion
  //         vehicleMutate();
  //         // const updatedTableData = tableData.filter((row) => row.id !== id);
  //         // setTableData(updatedTableData);
  //       } else {
  //         // Handle error
  //         enqueueSnackbar(response.message, { variant: 'error' });
  //       }

  //       console.info('API Response:', response);
  //     } catch (error) {
  //       console.error('API Error:', error);
  //       enqueueSnackbar('Failed to delete row', { variant: 'error' });
  //     }
  //   },
  //   [enqueueSnackbar, mutate]
  // );

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const apiUrl = `/vehicle/delete/${id}`;

        const httpMethod = 'DELETE';

        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`
          },
        };

        // Make the API request
        const response = await deleter(apiUrl, headers);

        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          mutateVehicle();
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user?.accessToken, mutateVehicle]
  );

  // Delete all rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/vehicle/delete`; // Changed to vehicle

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      };

      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, headers);

          // Parse the response JSON
          // const responseData = await response.json();

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
    (id) => {
      router.push(paths.dashboard.vehicle.edit(id)); // Changed to vehicle
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.vehicle.details(id)); // Changed to vehicle
    },
    [router]
  );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'vehicleName',
      headerName: 'Vehicle Name', // Changed to Vehicle
      flex: 1,
      minWidth: 360,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    // {
    //   field: 'ownerInfo',
    //   headerName: 'Owner Info',
    //   width: 160,
    //   renderCell: (params) => <RenderCellCreatedAt params={params} />,
    // },
    // {
    //   field: 'licensePlate',
    //   headerName: 'License Plate',
    //   width: 160,
    //   type: 'singleSelect',
    //   renderCell: (params) => <RenderCellStock params={params} />,
    // },
    {
      field: 'model',
      headerName: 'Model',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        //   label="Delete"
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
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 4 }}
        >
          Back
        </Button>

        <CustomBreadcrumbs
          heading="VEHICLE LIST" // Changed to Vehicle List
          links={[
            {
              name: 'Vehicle', // Changed to Vehicle
              href: paths.dashboard.vehicle.root, // Changed to paths.dashboard.vehicle.root
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.vehicle.new} // Changed to vehicle.new
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Vehicle
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            mt: '20px'
          }}
        />
        {/* added component starts */}
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
              <VehicleAnalytic
                title="Total Vehicles"
                total={tableData.length}
                // total={20}
                // percent={100}
                // price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <VehicleAnalytic
                title="Total Booths"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <VehicleAnalytic
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <VehicleAnalytic
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>
        {/* added component endss */}

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
            loading={vehiclesLoading} // Changed to vehiclesLoading
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
                    {/* <FormControl style={{ width: '10%' }}>
                      <InputLabel variant="standard" htmlFor="uncontrolled-native">
                        Vehicle
                      </InputLabel>
                      <NativeSelect name="vehicleType">
                        <option value={10}>SUV</option>
                        <option value={20}>Bike</option>
                        <option value={30}>Tempoo</option>
                      </NativeSelect>
                    </FormControl> */}
                    <VehicleTableToolbar
                      filters={filters}
                      onFilters={handleFilters}
                      //
                      vehicleOptions={VEHICLE_OPTIONS}
                    />
                    {/* {console.log(vehicleOptions)} */}
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
                    <VehicleTableFiltersResult // Changed to vehicle-table-filters-result
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered.length}
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
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((vehicle) => stock.includes(vehicle.inventoryType)); // Changed to vehicle
  }

  if (publish.length) {
    inputData = inputData.filter((vehicle) => publish.includes(vehicle.publish)); // Changed to vehicle
  }

  return inputData;
}
