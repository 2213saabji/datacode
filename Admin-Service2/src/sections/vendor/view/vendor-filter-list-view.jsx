/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

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

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-lms';

import { useGetVendors } from 'src/api/vendor';
import { createNotifications } from 'src/api/notifications';

// import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import { RouterLink } from 'src/routes/components';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../vendor-analytic';
// import ProductTableToolbar from '../driver-table-toolbar';
import ProductTableFiltersResult from '../vendor-table-filters-result';
import {
  RenderCellStock,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../vendor-table-row';

// ----------------------------------------------------------------------

// const PUBLISH_OPTIONS = [
//   { value: 'published', label: 'Published' },
//   { value: 'draft', label: 'Draft' },
// ];

const defaultFilters = {
  serviceId: [],
  issueId:[],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function VendorFilterListView() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();
  // const userIdToSet = 'some-unique-user-id';
  // localStorage.setItem('userId', userIdToSet);

  // // Retrieve the userId from localStorage
  // const userId = localStorage.getItem('userId');

  // // Check if userId exists
  // if (!userId) {
  //   console.error('User ID not found in localStorage');
  //   // Handle the missing userId case, such as redirecting the user or showing an error
  //   // router.push('/login'); // Example of redirecting to the login page
  // } else {
  //   console.log('User ID found:', userId); // Confirming the userId is retrieved

  // }

  // useGetCandidates to fetch data

  const { vendors, vendorsLoading } = useGetVendors();
  console.log('filter', vendors);

  const [tableData, setTableData] = useState([]);

  console.log("tableData",tableData);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  // Set userId in localStorage
  useEffect(() => {
    const userIdToSet = '976556';

    console.log('About to set userId in localStorage:', userIdToSet);

    localStorage.setItem('userId', userIdToSet);

    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      console.log('userId successfully set in localStorage:', storedUserId);
    } else {
      console.error('Failed to set userId in localStorage');
    }
  }, []);
  const vendorData = useMemo(
    () => vendors?.data?.filter((vendor) => vendor.User.userRoleId === 32),
    [vendors]
  );
  useEffect(() => {
    if (vendorData) {
      const updatedTableData = vendorData.map((vendor) => ({
        ...vendor,
        id: vendor.providerId,
      }));
      setTableData(updatedTableData);
    }
  }, [vendorData]);
  //   useEffect(() => {
  //     if (lawyers && lawyers.data) {
  //     console.log(lawyers.data);
  //     const updatedTableData = lawyers.data.map((lawyer) => ({
  //       ...lawyer,
  //       id: lawyer.providerId,
  //     }));
  //     setTableData(updatedTableData);
  //   }
  // }, [lawyers]);

  // const handleBookLawyer = (id) => {
  //   // Logic to handle the booking process
  //   console.log(`Book lawyer with ID: ${id}`);
  //   // Example: Navigate to a booking page, open a modal, etc.
  //   // router.push(`/book-lawyer/${id}`);
  // };

  const handleBookVendor = async (id, userId, providerId) => {
    try {
      console.log(`Book Vendor with ID: ${userId}`);
      console.log(id)
      // Define the parameters for createNotifications
      const userIds = [userId];
      const messageInfo = 'A new booking request from a client has been made.Please respond';
      const service = 'LMS Vendor Booking';
      const Url = `/LMS_case/vendor_list`;
      const status = 'unread';
      
      // Call the createNotifications function
      const response = await createNotifications(userIds, messageInfo, service, Url, status);
     console.log(response);
     
      // Check the response status (assuming response has a status or success property)
      if (response?.success) {
        console.log('Notification created:', response);
        enqueueSnackbar('Booking successful!', { variant: 'success' });
        router.push(`/dashboard/lms_vendor/${providerId}`);
      } else {
        console.error('Failed to create notification:', response);
        enqueueSnackbar('Failed to create notification', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error while booking vendor:', error);
      enqueueSnackbar('Please try again.', { variant: 'error' });
    }
  };
  console.log(handleBookVendor);
  
  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  console.log(filters);
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
        const apiUrl = `/driver/delete/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';

        const headers = {
          method: httpMethod,
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        };

        // Make the API request
        const response = await deleter(apiUrl, headers);

        // Parse the response JSON

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = tableData.filter((row) => row.id !== id);
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
    [enqueueSnackbar, tableData]
  );

  // Delete all rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/lawyer/delete`;

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
      router.push(paths.dashboard.vendor.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.vendor.details(id));
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
      field: 'serviceArea',
      headerName: 'Service Area',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt  params={params} />,
    },
    {
      field: 'providerName',
      headerName: 'Vendor Name',
      flex: 1,
      minWidth: 140,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },

    {
      field: 'rating',
      headerName: 'Vendor Ratings',
      width: 160,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      field: 'experienceLevel',
      headerName: 'Experience Level',
      width: 160,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    // {
    //   field: 'registrationNumber',
    //   headerName: 'Registration Number',
    //   width: 140,
    //   editable: true,
    //   renderCell: (params) => <RenderCellPrice params={params} />,
    // },
    // New column for the button
    {
      field: 'book',
      headerName: 'Action',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) => (
        <Button
          variant="contained"
          color="primary"
          sx={{
            fontSize: '0.875rem',
            padding: '4px 15px',
            minWidth: '120px',
          }}
          onClick={() => handleBookVendor(params.row.id, params.row.userId, params.row.providerId)}
        >
          Book Vendor
        </Button>
      ),
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
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:pen-bold" />}
        //   label="Edit"
        //   onClick={() => handleEditRow(params.row.id)}
        // />,
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
    <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="AVAILABLE LEGEL ASSISTANTS "
          links={[
            {
              name: 'Assistants',
              //   href: paths.dashboard.lawyer.root,
            },
            { name: 'List' },
          ]}
          //   action={
          //     <Button
          //       component={RouterLink}
          //       href={paths.dashboard.lawyer.create}
          //       variant="contained"
          //       startIcon={<Iconify icon="mingcute:add-line" />}
          //     >
          //       New Lawyer
          //     </Button>
          //   }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
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
              <DriverAnalytic
                title="Total Vendor"
                total={tableData.length}
                // total={20}
                // percent={100}
                // price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <DriverAnalytic
                title="Active Vendors"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <DriverAnalytic
                title="5 Stars Vendors"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <DriverAnalytic
                title="Experienced Vendors"
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
          {console.log(dataFiltered)}
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={vendorsLoading}
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
                    <ProductTableFiltersResult
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




function applyFilter({ inputData }) {
  console.log('input', inputData);

  // Get the values from session storage
  const serviceId = sessionStorage.getItem('lms-service');
  const issueId = sessionStorage.getItem('lms-sub-service');

  if (!serviceId || !issueId) {
    return inputData;
  }

  // Convert session storage values to strings if they are not null
  const serviceIdStr = serviceId ? serviceId.toString() : null;
  const issueIdStr = issueId ? issueId.toString() : null;

  const value = inputData.filter((item) => {
    const itemServiceId = item?.serviceId ? item.serviceId.toString() : null;
    const itemIssueId = item?.issueId ? item.issueId.toString() : null;

    return itemServiceId === serviceIdStr || itemIssueId === issueIdStr;
  });

  console.log('value', value);
  return value;
}


