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

import { deleter } from 'src/utils/axios-lms';

import { useGetClients } from 'src/api/clientLms';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClientAnalytic from '../client-analytic';
import ProductTableFiltersResult from '../client-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../client-table-row';

// Default filter settings
const defaultFilters = {
  publish: [],
  stock: [],
};

// Hidden columns settings
const HIDE_COLUMNS_TOGGLABLE = ['actions'];

export default function ClientListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();

  // Fetch clients
  const { clients, clientsLoading } = useGetClients();

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  // Update table data when clients data changes
  useEffect(() => {
    if (clients?.data) {
      const updatedTableData = clients.data.map((client) => ({
        ...client,
        id: client.clientCompanyId,
      }));
      setTableData(updatedTableData);
    }
  }, [clients]);

  // Apply filters to the data
  const dataFiltered = applyFilter({ inputData: tableData, filters });
  const canReset = !isEqual(defaultFilters, filters);

  // Handle filter changes
  const handleFilters = useCallback((name, value) => {
    setFilters((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  // Handle row deletion
  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const apiUrl = `/clientCompanyDetails/delete/${id}`;
        const response = await deleter(apiUrl, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });
        if (response.success) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          setTableData((prev) => prev.filter((row) => row.id !== id));
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  // Handle bulk row deletion
  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);
      await Promise.all(
        idsToDelete.map((id) => {
          const url = `/clientCompanyDetails/delete/${id}`;
          return deleter(url, {
            method: 'DELETE',
            headers: {
              Authorization: localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
          });
        })
      );
      setTableData((prev) => prev.filter((row) => !idsToDelete.includes(row.id)));
      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete rows', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  // Navigate to edit or view page
  const handleEditRow = useCallback(
    (id) => router.push(paths.dashboard.Lms_client.edit(id)),
    [router]
  );
  const handleViewRow = useCallback(
    (id) => router.push(paths.dashboard.Lms_client.details(id)),
    [router]
  );

  // Define columns for DataGrid
  const columns = [
    {
      field: 'contactPerson',
      headerName: 'Contact Person',
      flex: 1,
      minWidth: 100,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'companyName',
      headerName: 'Company Name',
      flex: 1,
      minWidth: 90,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 260,
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'phone',
      headerName: 'Phone Number',
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellPrice params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      headerAlign: 'right',
      width: 80,
      getActions: (params) => [
        <GridActionsCellItem
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
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
        sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}
      >
        <CustomBreadcrumbs
          heading="CLIENT COMPANY LIST"
          links={[
            { name: 'Client Company', href: paths.dashboard.Lms_client.root },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.Lms_client.create}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Client
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />

        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <ClientAnalytic
                title="Total Clients"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <ClientAnalytic
                title="Active Clients"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />
              <ClientAnalytic
                title="Male Client"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <ClientAnalytic
                title="Legal Case Client"
                total={tableData.length}
                percent={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered || []}
            columns={columns}
            loading={clientsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <GridToolbarQuickFilter
                      sx={{ '& .MuiInputBase-input::placeholder': { color: 'black' } }}
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
        content={`Are you sure you want to delete ${selectedRowIds.length} item(s)?`}
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

// Apply filters to the data
function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;
  if (stock.length) {
    inputData = inputData.filter((client) => stock.includes(client.inventoryType));
  }
  if (publish.length) {
    inputData = inputData.filter((client) => publish.includes(client.publish));
  }
  return inputData;
}
