import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import {
  Card,
  Stack,
  Button,
  Divider,
  useTheme,
  Container,
  Typography,
  IconButton,
} from '@mui/material';
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

import { useGetLawyers } from 'src/api/lawyer';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../lawyer-analytic';
import LawyerTableToolbar from '../lawyer-table-toolbar';
import ProductTableFiltersResult from '../lawyer-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../lawyer-table-row';

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function LawyerListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { lawyers, lawyersLoading } = useGetLawyers();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ category: false });

  const lawyerData = useMemo(
    () => lawyers?.data?.filter((lawyer) => lawyer.User.userRoleId === 31),
    [lawyers]
  );

  useEffect(() => {
    if (lawyerData) {
      const updatedTableData = lawyerData.map((lawyer) => ({
        ...lawyer,
        id: lawyer.providerId,
      }));
      setTableData(updatedTableData);
    }
  }, [lawyerData]);

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
        const apiUrl = `/serviceProvider/delete/${id}`;
        const response = await deleter(apiUrl, {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        });

        if (response.success) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          const updatedTableData = tableData.filter((row) => row.id !== id);
          setTableData(updatedTableData);
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
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

      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `/serviceProvider/delete/${id}`;
          const response = await deleter(url, {
            method: 'DELETE',
            headers: {
              Authorization: localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
          });

          if (response.success !== true) {
            throw new Error(response.message);
          }
        })
      );

      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete row(s)', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.lawyer.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.lawyer.details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
      renderCell: (params) => (
        <Typography variant="body2" color="textSecondary">
          {params.value}
        </Typography>
      ),
    },
    {
      field: 'providerName',
      headerName: 'Lawyer Name',
      width: 200,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'issueId',
      headerName: 'Services Offered',
      minWidth: 160,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'rating',
      headerName: 'Lawyers Ratings',
      width: 180,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      field: 'experienceLevel',
      headerName: 'Experience Level',
      width: 160,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'registrationNumber',
      headerName: 'Registration Number',
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
        <Stack direction="row" spacing={1}>
          <IconButton color="primary" onClick={() => handleViewRow(params.row.id)} title="View">
            <Iconify icon="solar:eye-bold" />
          </IconButton>
          <IconButton color="secondary" onClick={() => handleEditRow(params.row.id)} title="Edit">
            <Iconify icon="solar:pen-bold" />
          </IconButton>
          <IconButton color="error" onClick={() => handleDeleteRow(params.row.id)} title="Delete">
            <Iconify icon="solar:trash-bin-trash-bold" />
          </IconButton>
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
          heading="LAWYER LIST"
          links={[{ name: 'Lawyer', href: paths.dashboard.lawyer.root }, { name: 'List' }]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.lawyer.create}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Lawyer
            </Button>
          }
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card sx={{ mb: { xs: 3, md: 5 } }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem />}
              sx={{ py: 2 }}
            >
              <DriverAnalytic
                title="Total Lawyers"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <DriverAnalytic
                title="Active Lawyers"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />
              <DriverAnalytic
                title="5 Stars Lawyers"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <DriverAnalytic
                title="Experienced Lawyers"
                total={tableData.length}
                percent={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <Card
          sx={{
            height: { xs: 800, md: 'auto' },
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={lawyersLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: {
                paginationModel: { pageSize: 10 },
              },
            }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            slots={{
              toolbar: () => (
                <>
                  <GridToolbarContainer>
                    <GridToolbarQuickFilter
                      sx={{
                        '& .MuiInputBase-input::placeholder': { color: 'black' },
                      }}
                    />
                    <LawyerTableToolbar filters={filters} onFilters={handleFilters} />
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
              columnsPanel: { getTogglableColumns },
            }}
          />
        </Card>
      </Container>

      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={`Are you sure you want to delete ${selectedRowIds.length} items?`}
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
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }
  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }
  return inputData;
}
