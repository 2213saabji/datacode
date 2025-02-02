import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import { Card, Stack, Button, Divider, useTheme, Container } from '@mui/material';
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

import { useGetVendors } from 'src/api/vendor';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../vendor-analytic';
import VendorTableToolbar from '../vendor-table-toolbar';
import ProductTableFiltersResult from '../vendor-table-filters-result';
import {
  RenderCellStock,
  RenderCellPrice,
  RenderCellProduct,
  RenderCellPublish,
  RenderCellCreatedAt,
} from '../vendor-table-row';

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function VendorListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();

  const { vendors, vendorsLoading } = useGetVendors();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({});

  // const vendorData = useMemo(() => vendors?.data.filter(vendor => vendor.User.userRoleId === 32), [vendors]);
  const vendorData = useMemo(() => {
    if (vendors && vendors.data) {
      return vendors.data.filter((vendor) => vendor.User.userRoleId === 32);
    }
    return [];
  }, [vendors]);

  useEffect(() => {
    if (vendorData) {
      const updatedTableData = vendorData.map((vendor) => ({
        ...vendor,
        id: vendor.providerId,
      }));
      setTableData(updatedTableData);
    }
  }, [vendorData]);

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
          setTableData((prevData) => prevData.filter((row) => row.id !== id));
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);
      await Promise.all(
        idsToDelete.map(async (id) => {
          const response = await deleter(`/serviceProvider/delete/${id}`, {
            method: 'DELETE',
            headers: {
              Authorization: localStorage.getItem('accessToken'),
              'Content-Type': 'application/json',
            },
          });
          if (!response.success) {
            throw new Error(response.message);
          }
        })
      );
      setTableData((prevData) => prevData.filter((row) => !idsToDelete.includes(row.id)));
      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete rows', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.lms_vendor.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.lms_vendor.details(id));
    },
    [router]
  );

  const columns = [
    // {
    //   field: 'category',
    //   headerName: 'Category',
    //   filterable: false,
    //   hide: columnVisibilityModel.category === false,
    // },
    {
      field: 'providerName',
      headerName: 'Vendor FullName',
      flex: 1,
      minWidth: 260,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'serviceArea',
      headerName: 'Service Area',
      width: 250,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'experienceLevel',
      headerName: 'Experience Level',
      width: 200,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      field: 'rating',
      headerName: 'Vendor Ratings',
      width: 180,
      renderCell: (params) => <RenderCellPublish params={params} />,
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
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="VENDOR LIST"
          links={[
            {
              name: 'Vendor',
              href: paths.dashboard.lms_vendor.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.lms_vendor.create}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Vendor
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
              <DriverAnalytic
                title="Total Vendors"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <DriverAnalytic
                title="Active Vendors"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />
              <DriverAnalytic
                title="5 Stars Vendors"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <DriverAnalytic
                title="Experienced Vendors"
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
            flexGrow: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={vendorsLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
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
                      sx={{ '& .MuiInputBase-input::placeholder': { color: 'black' } }}
                    />
                    <VendorTableToolbar filters={filters} onFilters={handleFilters} />
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
        title="Delete Confirmation"
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

// ----------------------------------------------------------------------

function applyFilter({ inputData, filters }) {
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((vendor) => stock.includes(vendor.experienceLevel));
  }

  if (publish.length) {
    inputData = inputData.filter((vendor) => publish.includes(vendor.serviceArea));
  }

  return inputData;
}
