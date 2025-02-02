import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
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

import { useAuthContext } from 'src/auth/hooks';
import { useGetTrips } from 'src/api/ambulance';
import { useGetTripsManaged } from 'src/api/trip';
import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
import { ATTPL_TMS_HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import TripAnalytic from '../ambulance-analytic';
import TripTableFiltersResult from '../ambulance-table-filters-result';
import {
  RenderCell,
  RenderCellPrice,
  RenderCellStock,
  RenderCellTripId,
  RenderCellPublish,
  RenderCellCreatedAt,
  // RenderCellTripDestination
} from '../ambulance-table-row';

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

export default function AmbulanceListView() {
  // Changed to TripListView
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetCandidates to fetch data
  const { user } = useAuthContext();
  // eslint-disable-next-line no-unused-vars
  const { trips, tripsLoading } = useGetTripsManaged(user.accessToken); // Changed to useGetTrips

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);
  // eslint-disable-next-line no-unused-vars
  const [triplists, setTripList] = useState([]);
  useEffect(() => {
    if (trips && trips.data) {
      // Changed to trips
      const updatedTableData = trips.data.map((trip) => ({
        // Changed to trips
        ...trip, // Changed to trip
        id: trip.tripId, // Changed to tripId
      }));
      setTableData(updatedTableData);
    }
  }, [trips]); // Changed to trips

  const dataFiltered = applyFilter(
    {
      inputData: tableData,
      filters,
    },
    [triplists]
  );

  const data = useGetTrips();

  console.log(data);

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

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const apiUrl = `${ATTPL_TMS_HOST_API}/trip/delete/${id}`; // Changed to trip

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';

        // Make the API request
        const response = await fetch(apiUrl, {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
          },
        });

        // Parse the response JSON
        const responseData = await response.json();

        if (response.ok) {
          // Handle success
          enqueueSnackbar('Trip Rejected!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = tableData.filter((row) => row.id !== id);
          setTableData(updatedTableData);
        } else {
          // Handle error
          enqueueSnackbar(responseData.message, { variant: 'error' });
        }

        console.info('API Response:', responseData);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to reject', { variant: 'error' });
      }
    },
    [enqueueSnackbar, tableData]
  );

  // Delete all rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `${ATTPL_TMS_HOST_API}/trip/delete`; // Changed to trip

      const httpMethod = 'DELETE';

      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const response = await fetch(`${apiUrl}/${id}`, {
            method: httpMethod,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          // Parse the response JSON
          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message);
          }

          console.info('API Response:', responseData);
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
      router.push(paths.dashboard.assigndriver.edit(id)); // Changed to trip
      // enqueueSnackbar('Trip Accepted', { variant: 'success' });
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.trip.tripManagement(id)); // Changed to trip
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
      field: 'tripId',
      headerName: 'Trip ID', // Changed to Trip
      flex: 1,
      minWidth: 140,
      hideable: false,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      field: 'DriverDetail.fullName',
      headerName: 'Driver Name',
      width: 250,
      editable: true,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      field: 'tripSource',
      headerName: 'Source',
      width: 280,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'tripDestination',
      headerName: 'Destination',
      width: 280,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'tripDetails',
      headerName: 'Trip Details',
      width: 280,
      renderCell: (params) => <RenderCell params={params} />,
    },
    {
      field: 'licensePlate',
      headerName: 'Vehicle Number',
      width: 280,
      renderCell: (params) => <RenderCellTripId params={params} />,
    },
    {
      field: 'tripStatus',
      headerName: 'Trip Status',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      // renderCell: (params) => <RenderCellStatus params={params} />,
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
          icon={<Iconify icon="healthicons:truck-driver" />}
          label="Assign Driver"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
          }}
          sx={{ color: 'error.main' }}
        />,
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
        <CustomBreadcrumbs
          heading="AMBULANCE BOOKING LIST" // Changed to Vehicle List
          links={[
            // {
            //   name: 'Ambulance', // Changed to Vehicle
            //   href: paths.dashboard.callAmbulance.managedList, // Changed to paths.dashboard.vehicle.root
            // },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.callAmbulance.new} // Changed to vehicle.new
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              Book a Ambulance
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {/* analytic start here */}
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
              {/* <TripAnalytic
                title="Total Trips"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              /> */}

              {/* <TripAnalytic
                title="Total Candidate"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              /> */}

              {/* <TripAnalytic
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              /> */}
              {/* <TripAnalytic
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              /> */}
            </Stack>
          </Scrollbar>
        </Card>

        {/* analytic ends here */}
        <Card
          sx={{
            height: { xs: 800, md: 2 },
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
            // loading={tripsLoading} // Changed to tripsLoading
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
                    {/* <TripTableToolbar // Changed to trip-table-toolbar
                    filters={filters}
                    onFilters={handleFilters}
                    stockOptions={PRODUCT_STOCK_OPTIONS}
                    publishOptions={PUBLISH_OPTIONS}
                  /> */}

                    <GridToolbarQuickFilter />

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
                    <TripTableFiltersResult // Changed to trip-table-filters-result
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
            Are you sure want to Reject<strong> {selectedRowIds.length} </strong> items?
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
            Reject
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
    inputData = inputData.filter((trip) => stock.includes(trip.inventoryType)); // Changed to trip
  }

  if (publish.length) {
    inputData = inputData.filter((trip) => publish.includes(trip.publish)); // Changed to trip
  }

  return inputData;
}
