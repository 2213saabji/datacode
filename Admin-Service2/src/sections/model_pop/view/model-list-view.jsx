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

import { deleter } from 'src/utils/axios-model';

import { useGetModel, createactivate } from 'src/api/model';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import CategoryTableFiltersResult from '../model-table-filters-result';
import { RenderCellClaimDate, RenderCellClaimAmount } from '../model-table-row';

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

export default function ModelListView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const { models, modelsLoading } = useGetModel();
  // console.log(models);
  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const [isActivated, setIsActivated] = useState(false);
  const [activateButtonLabel, setActivateButtonLabel] = useState({ status: 'Active' });

  const STORAGE_KEY = 'accessToken';
  const accessToken = localStorage.getItem(STORAGE_KEY);

  useEffect(() => {
    if (models && models.data) {
      // Map the works data and add the WardId as the id property for each row
      const updatedTableData = models.data.map((claim) => ({
        ...claim,
        id: claim.ourWorkId,
      }));
      setTableData(updatedTableData);
    }
    // console.log(tableData);
  }, [models]);

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
        const url = `/mock-data/our-work/delete/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';
        // Use the DELETE HTTP method
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        };

        const response = await deleter(url, headers);

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
    [enqueueSnackbar, tableData, accessToken]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/mock-data/our-work/delete`;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${accessToken}`,
        },
      };

      // Make the API request for each id
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
      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.ourWorkId));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData, accessToken]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.model.edit(id));
      // console.log(id);
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.model.details(id));
    },
    [router]
  );

  const handleToggleActivation = async () => {
    setIsActivated(!isActivated);

    if (!isActivated) {
      // console.log('Show Activate popup');
      setActivateButtonLabel({ status: 'Inactive' });
      await createactivate(activateButtonLabel);
    } else {
      // console.log('Show Deactivate popup');
      setActivateButtonLabel({ status: 'Active' });
      await createactivate(activateButtonLabel);
    }
  };

  const columns = [
    {
      field: 'title',
      headerName: 'Title Name',
      filterable: false,
      flex: 1,
      width: 100,
      height: 30,
    },

    {
      field: ' description',
      headerName: 'Description',
      flex: 1,
      width: 180,
      renderCell: (params) => <RenderCellClaimAmount params={params} />,
    },
    {
      field: 'image_details',
      headerName: 'Cover Image',
      flex: 1,
      width: 40,
      renderCell: (params) => <RenderCellClaimDate params={params} />,
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
          onClick={() => handleViewRow(params.row.ourWorkId)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.ourWorkId)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.ourWorkId);
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
          heading="MODAL LIST"
          links={[
            {
              name: 'Model',
              href: paths.dashboard.model.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.model.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Model
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
            loading={modelsLoading}
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

                      <Button
                        variant="contained"
                        color={isActivated ? 'secondary' : 'primary'}
                        onClick={handleToggleActivation}
                      >
                        {isActivated ? 'Deactivate' : 'Activate'}
                      </Button>

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
