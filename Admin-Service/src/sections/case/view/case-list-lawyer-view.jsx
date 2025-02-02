/* eslint-disable no-unused-vars */
/* eslint-disable import/no-unresolved */
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

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-tms';

import { useGetServices } from 'src/api/case';
// import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import { useAuthContext } from 'src/auth/hooks';
import { createNotifications } from 'src/api/notifications';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../case-analytic';
// import ProductTableToolbar from '../driver-table-toolbar';
import ProductTableFiltersResult from '../case-table-filters-result';
import { RenderCellStock, RenderCellPublish, RenderCellCreatedAt } from '../case-table-row';
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

export default function CaseListView() {
  const { user } = useAuthContext();
  console.log('LMSuser', user);
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetCandidates to fetch data

  const { services, servicesLoading } = useGetServices();
  console.log('cases', services);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (
      // services &&
      services?.data
      // && user.userRoleType === "Lawyer"
    ) {
      console.log('allllll', services.data);

      const filteredData = services.data.filter(
        (service) =>
          //   service.ServiceProviderDetail.providerType === "Lawyer"
          // &&
          service?.ServiceProviderDetail?.userId === user.userId
      );
      const updatedTableData = filteredData?.map((service) => ({
        // const updatedTableData = filteredData.data.map((service) => ({
        ...service,
        id: service.caseId,
      }));
      console.log("filteredData", filteredData)
      setTableData(updatedTableData);
    }
  }, [services, user.userId]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });
  console.log(dataFiltered);
  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  const handleAcceptNotification = async (id) => {
    try {
      // Define parameters for the notification
      const userIds = id;
      const messageInfo = 'The Lawyer has accepted the case. Please sign the contract.';
      const service = 'LMS Lawyer Booking';
      const Url = `/LMS_case/`;
      const status = 'unread';
  
      // Create the notification
      const notificationResponse = await createNotifications(userIds, messageInfo, service, Url, status);
  
      if (notificationResponse?.success) {
        enqueueSnackbar('Booking Accepted!', { variant: 'success' });
  
        // API call to update the case status
        // const updateResponse = await fetch(`/api/cases/${id}/status`, {
          const updateResponse = await fetch(`https://lmsdevapi.attplems.com/api/v1/caseDetails/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({ caseStatus: 'open' }),
        });
  
        const updateResult = await updateResponse.json();
  
        if (updateResult.success) {
          // Update local table data
          const updatedTableData = tableData.map((item) => {
                    if (item.caseId === id) {
                      return { ...item, caseStatus: 'open' };
                    }
                    return item;
                  });
    
          
          setTableData(updatedTableData);
        } else {
          enqueueSnackbar('Failed to Update Case Status', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Failed to Accept Case', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error while handling acceptance:', error);
      enqueueSnackbar('Error while accepting the case', { variant: 'error' });
    }
  };
  
      
  const handleRejectNotification = async (id) => {
    try {
      // Define parameters for the notification
      const userIds = id;
      const messageInfo = 'The Lawyer has rejected the case. Please check other lawyers.';
      const service = 'LMS Lawyer Booking';
      const Url = `/LMS_case/`;
      const status = 'unread';
  
      // Create the notification
      const notificationResponse = await createNotifications(userIds, messageInfo, service, Url, status);
  
      if (notificationResponse?.success) {
        enqueueSnackbar('Booking Rejected!', { variant: 'success' });
  
        // API call to update the case status
        const updateResponse = await fetch(`https://lmsdevapi.attplems.com/api/v1/caseDetails/update/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
          body: JSON.stringify({ caseStatus: 'close' }),
        });
  
        const updateResult = await updateResponse.json();
  
        if (updateResult.success) {
          // Update local table data
          const updatedTableData = tableData?.map((item) => {
            if (item.caseId === id) {
              return { ...item, caseStatus: 'close' };
            }
            return item;
          });
          setTableData(updatedTableData);
        } else {
          enqueueSnackbar('Failed to Update Case Status', { variant: 'error' });
        }
      } else {
        enqueueSnackbar('Failed to Reject Case', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error while handling rejection:', error);
      enqueueSnackbar('Error while rejecting the case', { variant: 'error' });
    }
  };
  
  
  
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
      router.push(paths.dashboard.LMS_case.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.LMS_case.details(id));
    },
    [router]
  );

  // const handleAccept = useCallback((id) => {
  //   console.log(`Accept lawyer with ID: ${id}`);
  //   handleAcceptNotification();
  // }, [handleAcceptNotification]);

  // const handleReject = useCallback((id) => {
  //   console.log(`Reject lawyer with ID: ${id}`);
  //   handleRejectNotification()
  // }, [handleRejectNotification]);

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'clientsId',
      headerName: 'Client Names',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    // {
    //   field: 'caseStatus',
    //   headerName: 'Case Status',
    //   flex: 1,
    //   minWidth: 360,
    //   hideable: false,
    //   renderCell: (params) => <RenderCellProduct params={params} />,
    // },

    {
      field: 'caseNotes',
      headerName: 'Case Notes',
      width: 260,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      field: 'urgency',
      headerName: 'Urgency',
      width: 160,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    // {
    //   field: 'feedback',
    //   headerName: 'Feedback',
    //   width: 140,
    //   editable: true,
    //   renderCell: (params) => <RenderCellPrice params={params} />,
    // },
    {
      field: 'accept',
      headerName: 'Action',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.row.caseStatus === 'upcoming' || params.row.caseStatus === 'open' ? (
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: '0.875rem',
              padding: '4px 15px',
              minWidth: '120px',
            }}
            onClick={() => handleAcceptNotification(params.row.id)}
            disabled={params.row.caseStatus === 'open' && true}
          >
            {params.row.caseStatus === 'open' ? 'Accepted' : 'Accept'}
          </Button>
        ) : null,
    },
    {
      field: 'reject',
      headerName: 'Action',
      width: 130,
      sortable: false,
      filterable: false,
      renderCell: (params) =>
        params.row.caseStatus === 'upcoming' || params.row.caseStatus === 'close'  ?  (
          <Button
            variant="contained"
            color="primary"
            sx={{
              fontSize: '0.875rem',
              padding: '4px 15px',
              minWidth: '120px',
            }}
            disabled={params.row.caseStatus === 'close' && true}
            onClick={() => handleRejectNotification(params.row.id)}
          >
            {params.row.caseStatus === 'close' ? 'Rejected' : 'Reject'}
          </Button>
        ) : null,
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
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="CASE LIST"
          links={[
            {
              name: 'Case',
              href: paths.dashboard.LMS_case.root,
            },
            { name: 'List' },
          ]}
          // action={
          //   <Button
          //     component={RouterLink}
          //     href={paths.dashboard.LMS_case.create}
          //     variant="contained"
          //     startIcon={<Iconify icon="mingcute:add-line" />}
          //   >
          //     New Case
          //   </Button>
          // }
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
                title="Total Cases"
                total={tableData?.length}
                // total={20}
                // percent={100}
                // price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <DriverAnalytic
                title="Total Accepted cases"
                total={tableData?.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <DriverAnalytic
                title="Total Rejected cases"
                total={tableData?.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <DriverAnalytic
                title="Total pending cases"
                total={tableData?.length}
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
            loading={servicesLoading}
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
                      {!!selectedRowIds?.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds?.length})
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

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}

