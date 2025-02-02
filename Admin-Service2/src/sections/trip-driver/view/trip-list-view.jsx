import isEqual from 'lodash/isEqual';
import { initializeApp } from 'firebase/app';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';
import { ref, push, child, getDatabase } from 'firebase/database';
// import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
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
// import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';
// import { useGetTripsDriver } from 'src/api/trip'; // Changed to useGetTrips
import { useGetTrips, updateTripProfile } from 'src/api/trip_driver';
import {
  ATTPL_TMS_HOST_API,
  ATTPL_TMS_FIREBASE_APP_ID,
  ATTPL_TMS_FIREBASE_API_KEY,
  ATTPL_TMS_FIREBASE_PROJECT_ID,
  ATTPL_TMS_FIREBASE_AUTH_DOMAIN,
  ATTPL_TMS_FIREBASE_DATABASE_URL,
  ATTPL_TMS_FIREBASE_MESUREMENT_ID,
  ATTPL_TMS_FIREBASE_STORAGE_BUCKET,
  ATTPL_TMS_FIREBASE_MESSAGING_SENDER_ID,
} from 'src/config-global';

import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import MapRoute from '../trip-route-map';
// import TripDriverAnalytics from '../trip-driver-analytics';
// import TripDriverAnalytics from '../trip-driver-analytics';
import TripDriverTableFiltersResult from '../trip-table-filters-result';
import {
  RenderCellStatus,
  RenderCellTripSource,
  RenderCellTripDetails,
  RenderCellVehicleNumber,
  RenderCellTripDestination,
} from '../trip-table-row';

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
const MOVEMENT_THRESHOLD = 2;
export default function TripDriverListView() {
  // Changed to TripListView

  let watchId;
  let interval;

  const { enqueueSnackbar } = useSnackbar();

  // const theme = useTheme();

  const confirmRows = useBoolean();

  const settings = useSettingsContext();
  const [tableData, setTableData] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [userLocation, setUserLocation] = useState({ lat: 0.0, lng: 0.0 });

  const { trips } = useGetTrips();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (trips && trips.data) {
      const updatedTableData = trips.data.map((trip) => ({
        ...trip,
        id: trip.tripId,
      }));
      setTableData(updatedTableData);
    }
  }, [trips]);

  useEffect(() => {
    const firebaseConfig = {
      apiKey: ATTPL_TMS_FIREBASE_API_KEY,
      authDomain: ATTPL_TMS_FIREBASE_AUTH_DOMAIN,
      databaseURL: ATTPL_TMS_FIREBASE_DATABASE_URL,
      projectId: ATTPL_TMS_FIREBASE_PROJECT_ID,
      storageBucket: ATTPL_TMS_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: ATTPL_TMS_FIREBASE_MESSAGING_SENDER_ID,
      appId: ATTPL_TMS_FIREBASE_APP_ID,
      measurementId: ATTPL_TMS_FIREBASE_MESUREMENT_ID,
    };
    initializeApp(firebaseConfig);
    // if(localStorage.getItem('currentTripId')){
    //   startGeolocationTracking(localStorage.getItem('currentTripId'))
    // }
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const handleAcceptTrip = async (data1, tripId, tripManagedBy) => {
    try {
      const formData = {};
      if (data1 === 'Accepted') {
        formData.tripStatus = 'Accepted';
        formData.tripDetails = 'Driver Accepted Trip';
        formData.tripManagedBy = tripManagedBy;
        localStorage.setItem('currentTripId', tripId);
        startGeolocationTracking(tripId);
      } else if (data1 === 'Rejected') {
        formData.tripStatus = 'Rejected';
        formData.tripDetails = 'Driver Rejected Trip';
        formData.tripManagedBy = tripManagedBy;
      } else if (data1 === 'Finished') {
        formData.tripStatus = 'Finished';
        formData.tripDetails = 'Driver Finished Trip';
        formData.tripManagedBy = tripManagedBy;
        clearInterval(interval);
        navigator.geolocation.clearWatch(watchId);
        localStorage.removeItem('currentTripId');
      }

      const response = await updateTripProfile(tripId, formData);

      if (response) {
        enqueueSnackbar('Trip Status Changed successfully', { variant: 'success' });

        localStorage.removeItem('triplastUpdatedBy');
        // window.location.reload()
        const update = tableData.map((row) => {
          if (row.tripId === tripId) {
            row.tripStatus = formData.tripStatus;
          }
          return row;
        });
        setTableData(update);
      } else {
        enqueueSnackbar('Failed to Accept or Reject', { variant: 'error' });
        localStorage.removeItem('triplastUpdatedBy');
      }
    } catch (error) {
      console.error('Error submitting Trip Edited:', error);
      enqueueSnackbar('An error occurred while creating Trip Edited', { variant: 'error' });
    }
  };

  const pushUserLocation = (userId, location) => {
    const db = getDatabase();
    const locationRef = ref(db, `locations`);
    const userLocationRef = child(locationRef, `${userId}`);
    push(userLocationRef, location);
  };

  function startGeolocationTracking(tripId) {
    if (navigator.geolocation) {
      interval = setInterval(() => {
        watchId = navigator.geolocation.watchPosition(
          (position) => {
            const newPosition = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };

            setUserLocation((prevLocation) => {
              const smoothedLocation = applyKalmanFilter(prevLocation, newPosition);
              const distance = calculateDistance(prevLocation, smoothedLocation);
              if (distance >= MOVEMENT_THRESHOLD) {
                pushUserLocation(tripId, newPosition);
                // console.log('locationpush', tripId, newPosition);
                return newPosition;
              }
              return prevLocation;
            });
          },
          (error) => {
            console.error('Error getting user location:', error);
          }
        );
      }, 3000);
    } else {
      enqueueSnackbar('Geolocation is not supported by this browser.', { variant: 'error' });
    }
  }

  const calculateDistance = (pos1, pos2) => {
    if (!pos1 || !pos2) return 0;

    const rad = (x) => (x * Math.PI) / 180;
    const R = 6378137;
    const dLat = rad(pos2.lat - pos1.lat);
    const dLong = rad(pos2.lng - pos1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(pos1.lat)) * Math.cos(rad(pos2.lat)) * Math.sin(dLong / 2) * Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const applyKalmanFilter = (prevLocation, newPosition) => {
    const dt = 1;
    const processNoise = 0.1;
    const measurementNoise = 10;
    const predictedLocation = {
      lat: prevLocation.lat + dt * (newPosition.lat - prevLocation.lat),
      lng: prevLocation.lng + dt * (newPosition.lng - prevLocation.lng),
    };

    const kalmanGain = processNoise / (processNoise + measurementNoise);
    const updatedLocation = {
      lat: predictedLocation.lat + kalmanGain * (newPosition.lat - predictedLocation.lat),
      lng: predictedLocation.lng + kalmanGain * (newPosition.lng - predictedLocation.lng),
    };

    return updatedLocation;
  };

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
  //       const apiUrl = `${ATTPL_TMS_HOST_API}/trip/delete/${id}`; // Changed to trip

  //       // Use the DELETE HTTP method
  //       const httpMethod = 'DELETE';

  //       // Make the API request
  //       const response = await fetch(apiUrl, {
  //         method: httpMethod,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       // Parse the response JSON
  //       const responseData = await response.json();

  //       if (response.ok) {
  //         // Handle success
  //         enqueueSnackbar('Trip Rejected!', { variant: 'success' });
  //         // Update table data after successful deletion
  //         const updatedTableData = tableData.filter((row) => row.id !== id);
  //         setTableData(updatedTableData);
  //       } else {
  //         // Handle error
  //         enqueueSnackbar(responseData.message, { variant: 'error' });
  //       }

  //       console.info('API Response:', responseData);
  //     } catch (error) {
  //       console.error('API Error:', error);
  //       enqueueSnackbar('Failed to reject', { variant: 'error' });
  //     }
  //   },
  //   [enqueueSnackbar, tableData]
  // );

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

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'tripSource',
      headerName: 'Source',
      width: 280,
      renderCell: (params) => <RenderCellTripSource params={params} />,
    },
    {
      field: 'tripDestination',
      headerName: 'Destination',
      width: 280,
      renderCell: (params) => <RenderCellTripDestination params={params} />,
    },
    {
      field: 'tripDetails',
      headerName: 'Trip Details',
      width: 280,
      renderCell: (params) => <RenderCellTripDetails params={params} />,
    },
    {
      field: 'licensePlate',
      headerName: 'Vehicle Number',
      width: 280,
      renderCell: (params) => <RenderCellVehicleNumber params={params} />,
    },
    {
      field: 'tripStatus',
      headerName: 'Trip Status',
      width: 160,
      type: 'singleSelect',
      valueOptions: PRODUCT_STOCK_OPTIONS,
      renderCell: (params) => <RenderCellStatus params={params} />,
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
      getActions: (params) => {
        const { tripStatus } = params.row;
        const actions = [];
        if (tripStatus === 'Assigned') {
          actions.push(
            <GridActionsCellItem
              key="accept"
              showInMenu
              icon={<Iconify icon="mingcute:check-2-line" />}
              label="Accept"
              onClick={() => handleAcceptTrip('Accepted', params.row.id, params.row.tripManagedBy)}
            />
          );
        }
        if (tripStatus === 'Accepted') {
          actions.push(
            <GridActionsCellItem
              key="finish"
              showInMenu
              icon={<Iconify icon="mingcute:check-2-line" />}
              label="Finish"
              onClick={() => handleAcceptTrip('Finished', params.row.id, params.row.tripManagedBy)}
            />
          );
        }
        if (tripStatus === 'Assigned') {
          actions.push(
            <GridActionsCellItem
              key="reject"
              showInMenu
              icon={<Iconify icon="solar:trash-bin-trash-bold" />}
              label="Reject"
              onClick={() => handleAcceptTrip('Rejected', params.row.id, params.row.tripManagedBy)}
              sx={{ color: 'error.main' }}
            />
          );
        }
        return actions;
      },
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
          heading="TRIP DRIVER LIST"
          links={[
            {
              name: 'Trip Driver',
              href: paths.dashboard.tripdriver.root,
            },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={paths.dashboard.driver.new}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New List
          //   </Button>
          // }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {/* analytic start here */}
        {/* <Card
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
              <TripDriverAnalytics
                title="Total Trip Driver"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <TripDriverAnalytics
                title="Total Trip Driver"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <TripDriverAnalytics
                title="Male Ward Leader"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <TripDriverAnalytics
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card> */}

        {/* <Stack sx={{ height: '500px' }}>
          <MapRoute />
        </Stack> */}
        {/* analytic ends here */}

        <Card
        // sx={{
        //   height: { xs: 800, md: 2 },
        //   flexGrow: { md: 1 },
        //   display: { md: 'flex' },
        //   flexDirection: { md: 'column' },
        // }}
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
                    <TripDriverTableFiltersResult // Changed to trip-table-filters-result
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
