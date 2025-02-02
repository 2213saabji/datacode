import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
// import { useTheme } from '@mui/material/styles';
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

import { useGetSms } from 'src/api/sms';
import { ATTPL_SMS_HOST_API } from 'src/config-global';
// import { PRODUCT_STOCK_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import SmsAnalytic from '../sms-analytic';
// import SmsTableToolbar from '../sms-table-toolbar';
import SmsTableFiltersResult from '../sms-table-filters-result';
import {
  RenderCellStock,
  // RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../sms-table-row';

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

export default function SmsListView() {
  const STORAGE_KEY = 'accessToken';
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // const theme = useTheme();

  // useGetCandidates to fetch data

  const { sms, smsLoading } = useGetSms();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (sms && sms?.data) {
      // Map the sms data and add the boothId as the id property for each row
      const updatedTableData = sms.data.map((booth) => ({
        ...booth,
        id: booth.issue_id,
      }));
      setTableData(updatedTableData);
    }
  }, [sms]);

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

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const accessToken = localStorage.getItem(STORAGE_KEY);
        // Use the correct API endpoint URL
        const apiUrl = `${ATTPL_SMS_HOST_API}/support/delete/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';

        // Make the API request
        const response = await fetch(apiUrl, {
          method: httpMethod,
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        });

        // Parse the response JSON
        const responseData = await response.json();

        if (response.ok) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });
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
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, tableData]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);
      const apiUrl = `${ATTPL_SMS_HOST_API}/support/delete`;
      const httpMethod = 'DELETE';

      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const response = await fetch(`${apiUrl}/${id}`, {
            method: httpMethod,
            headers: {
              Authorization: `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

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
      router.push(paths.dashboard.sms.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.sms.details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'issue_title',
      headerName: 'Title',
      flex: 1,
      minWidth: 160,
      filterable: false,
      hideable: false,
    },
    {
      field: 'support_ticket_by_Id',
      headerName: 'Support Ticket ID',
      filterable: false,
      minWidth: 180,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },

    {
      field: 'assignee_id',
      headerName: 'Assign_To',
      width: 160,
      flex: 1,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'priority',
      headerName: 'Priority',
      width: 80,
      flex: 1,
      renderCell: (params) => <RenderCellStock params={params} />,
    },

    {
      field: 'issue_status',
      headerName: 'Status',
      width: 80,
      type: 'singleSelect',
      editable: true,
      // valueOptions: PUBLISH_OPTIONS,
      renderCell: (params) => <RenderCellPublish params={params} />,
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
          key={params.row.id}
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.issue_id)}
        />,
        <GridActionsCellItem
          key={`${params.row.id}-edit`}
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.issue_id)}
        />,
        <GridActionsCellItem
          key={`${params.row.id}-delete`}
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.issue_id);
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
          heading="SUPPORT TICKET LIST"
          links={[
            {
              name: 'Support Ticket',
              href: paths.dashboard.sms,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.sms.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Support Ticket
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

        {/* added component starts */}
        {/* <Card
          sx={{
            mb: { xs: 3, md: 5 },
          }}
        >
        
        </Card> */}
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
            loading={smsLoading}
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
                    <SmsTableFiltersResult
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
