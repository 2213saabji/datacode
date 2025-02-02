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

import { useGetServices } from 'src/api/case';
import { useAuthContext } from 'src/auth/hooks';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../case-analytic';
import ProductTableFiltersResult from '../case-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../case-table-row';

// Constants
const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function CaseListView() {
  const theme = useTheme();
  const { user } = useAuthContext();

  console.log('AuthUser', user);

  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { services, servicesLoading } = useGetServices();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (services && services.data) {
      console.log('caseData', services.data);

      const filteredData = services?.data?.filter(
        (service) =>
          user?.userRoleType === "Admin"
          ||
          service?.ServiceProviderDetail?.userId === user?.userId
      );

      console.log('Filter', filteredData);

      const updatedTableData = filteredData.map((service) => ({
        ...service,
        id: service.caseId,
      }));

      setTableData(updatedTableData);
    }
  }, [services, user.userId, user.userRoleType]);

  const dataFiltered = applyFilter({ inputData: tableData, filters });
  console.log("my data",dataFiltered); 
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
        const apiUrl = `/caseDetails/delete/${id}`;
        const httpMethod = 'DELETE';
        const headers = {
          method: httpMethod,
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        };
        const response = await deleter(apiUrl, headers);

        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          const updatedTableData = tableData?.filter((row) => row.id !== id);
          setTableData(updatedTableData);
        } else {
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

  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);
      const apiUrl = `/caseDetails/delete`;
      const httpMethod = 'DELETE';
      const headers = {
        method: httpMethod,
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      };

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
      const updatedTableData = tableData?.filter((row) => !idsToDelete.includes(row.id));
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

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
      flex: 1,
      headerAlign: 'left',
      renderCell: (params) => <div style={{ padding: '0 10px' }}>{params.value}</div>,
    },
    {
      field: 'serviceProviderName',
      headerName: ' Service Provider Name',
      width: 160,
      // renderCell: (params) => <RenderCellCreatedAt params={params} />,
      renderCell: (params) => <div>{params.row?.ServiceProviderDetail?.providerName }</div>,
    },
   {
    field: 'clientName',
    headerName: 'Client Name',
    width: 160,
    renderCell: (params) => <div>{params.row?.clientDetail?.clientName}</div>, 
   },
    {
      field: 'caseStatus',
      headerName: 'Case Status',
      flex: 1,
      minWidth: 100, 
      maxWidth: 200,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
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
    {
      field: 'feedback',
      headerName: 'Feedback',
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
      width: 120,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <Stack direction="row" spacing={1} alignItems="center">
          <Iconify
            icon="solar:eye-bold"
            onClick={() => handleViewRow(params.row.id)}
            style={{ cursor: 'pointer', color: theme.palette.info.main }}
          />
          <Iconify
            icon="solar:pen-bold"
            onClick={() => handleEditRow(params.row.id)}
            style={{ cursor: 'pointer', color: theme.palette.primary.main }}
          />
          <Iconify
            icon="solar:trash-bin-trash-bold"
            onClick={() => handleDeleteRow(params.row.id)}
            style={{ cursor: 'pointer', color: theme.palette.error.main }}
          />
        </Stack>
      ),
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
          heading="CASE LIST"
          links={[
            {
              name: 'Case',
              href: paths.dashboard.LMS_case.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.LMS_case.create}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Case
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {/* Analytics Card */}
        <Card
          sx={{
            mb: { xs: 3, md: 5 },
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{ py: 2 }}
            >
              <DriverAnalytic
                title="Total Cases"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <DriverAnalytic
                title="Active Cases"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />
              <DriverAnalytic
                title="Closed Cases"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <DriverAnalytic
                title="Pending Cases"
                total={tableData.length}
                percent={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>

        {/* Data Grid Card */}
        <Card
          sx={{
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
            border: `1px solid ${theme.palette.divider}`,
            borderRadius: 2,
          }}
        >
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
                  <GridToolbarContainer
                    sx={{
                      borderBottom: `1px solid ${theme.palette.divider}`,
                      mb: 2,
                    }}
                  >
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
            Are you sure you want to delete <strong>{selectedRowIds.length}</strong> items?
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

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData?.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData?.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
