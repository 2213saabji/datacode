import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-exp_ms';

import { useGetCategories } from 'src/api/exp_category';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CategoryTableFiltersResult from '../category-table-filters-result';
import { RenderCellCategoryId, RenderCellCategoryName } from '../category-table-row';

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

export default function CategoryListView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetWards to fetch data of all categories

  const { categories, categoriesLoading } = useGetCategories();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (categories && categories.data) {
      // Map the categories data and add the WardId as the id property for each row
      const updatedTableData = categories.data.map((category) => ({
        ...category,
        id: category.expenseCategoryId,
      }));
      setTableData(updatedTableData);
    }
  }, [categories]);

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
        // Use the correct API endpoint URL
        const apiUrl = `/expense/category/delete/${id}`;

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
        // const responseData = await response.json();

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

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/expense/category/delete`;

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
      const updatedTableData = tableData.filter(
        (row) => !idsToDelete.includes(row.expenseCategoryId)
      );
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.category.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.category.details(id));
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
      field: 'expenseCategoryId',
      headerName: 'Category Id',
      flex: 1,
      minWidth: 220,
      hideable: false,
      renderCell: (params) => <RenderCellCategoryId params={params} />,
    },
    {
      field: 'expenseCategoryName',
      headerName: 'Category Name',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellCategoryName params={params} />,
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
          onClick={() => handleViewRow(params.row.expenseCategoryId)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.expenseCategoryId)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.expenseCategoryId);
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
          heading="CATEGORY LIST"
          links={[
            {
              name: 'Category',
              href: paths.dashboard.category.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.category.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Category
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {/* added component starts */}
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
              <CategoryAnalytic
                title="Total Category"
                total={tableData.length}
                total={20}
                percent={100}
                price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <CategoryAnalytic
                title="Total Booths"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <CategoryAnalytic
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <CategoryAnalytic
                title="Overdue"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:bell-bing-bold-duotone"
                color={theme.palette.error.main}
              />

              <CategoryAnalytic
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
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
            loading={categoriesLoading}
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
                    <CategoryTableFiltersResult
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
