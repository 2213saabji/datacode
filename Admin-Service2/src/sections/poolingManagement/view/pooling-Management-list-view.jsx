import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
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

import { deleter } from 'src/utils/axios-call';

import { useAuthContext } from 'src/auth/hooks';
import { useGetPools } from 'src/api/poolManagement';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PoolingAnalytic from '../pooling-analytic';
import RoleTableFiltersResult from '../pooling-Management-table-filters-result';
import { RenderCellJob, RenderCellState, RenderCellCountry } from '../pooling-Management-table-row';

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

export default function PoolingListView() {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { pools, poolsLoading } = useGetPools();

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (pools && pools.data) {
      // Map the pools data and add the userProfileId as the id property for each row
      const updatedTableData = pools.data.map((Pools) => ({
        ...Pools,
        id: Pools.pollingStationId, // Assign userProfileId as the id property
      }));
      setTableData(updatedTableData);
    }
  }, [pools, filters]); // Include `filters` in the dependency array

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
        const url = `/polling-station/delete/${id}`;
        const httpMethod = 'DELETE';
        // Use the DELETE HTTP method
        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
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
    [enqueueSnackbar, tableData, user.accessToken]
  );

  // Delete rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/polling-station/delete`;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
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
      router.push(paths.dashboard.poolmanagement.edit(id));
      localStorage.setItem('userProfileEditId', id);
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.poolmanagement.details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    // {
    //   field: 'boothId',
    //   headerName: 'Booth Id',
    //   hideable: false,
    //   flex: 1,
    //   filterable: true,
    //   renderCell: (params) => <RenderCellName params={params} />,
    // },
    {
      field: 'pollingStationName',
      headerName: 'Polling Station Name',
      flex: 1,
      minWidth: 240,
      filterable: true,
      renderCell: (params) => <RenderCellJob params={params} />,
    },
    {
      field: 'pollingCapacity',
      headerName: 'Capacity',
      flex: 1,
      minWidth: 160,
      renderCell: (params) => <RenderCellCountry params={params} />,
    },
    {
      field: 'numberOfBooth',
      headerName: 'Number Of Booth',
      flex: 1,
      minWidth: 210,
      filterable: true,
      renderCell: (params) => <RenderCellState params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      width: 100,
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
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          showInMenu
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => {
            handleDeleteRow(params.row.id);
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
          heading="POLL LIST"
          links={[
            {
              name: 'Poll',
              href: paths.dashboard.poolmanagement.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.poolmanagement.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Poll
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
              <PoolingAnalytic
                title="Total Polling Stations"
                total={tableData.length}
                // total={20}
                // percent={100}
                // price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <PoolingAnalytic
                title="Total Booths"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <PoolingAnalytic
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              {/*   <PoolingAnalytic
                title="Overdue"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:bell-bing-bold-duotone"
                color={theme.palette.error.main}
              /> */}

              <PoolingAnalytic
                title="Legal Case Candidate"
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
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={poolsLoading}
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
                    <RoleTableFiltersResult
                      filters={filters}
                      onFilters={handleFilters}
                      onResetFilters={handleResetFilters}
                      results={dataFiltered}
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
  const { Name, JobTitle, Country, State } = filters;

  let filteredData = inputData;

  if (Name && Name.length) {
    filteredData = filteredData.filter((user) =>
      user.name.toLowerCase().includes(Name.toLowerCase())
    );
  }

  if (JobTitle && JobTitle.length) {
    filteredData = filteredData.filter((user) =>
      user.job.toLowerCase().includes(JobTitle.toLowerCase())
    );
  }

  if (Country && Country.length) {
    filteredData = filteredData.filter((user) =>
      user.country.toLowerCase().includes(Country.toLowerCase())
    );
  }

  if (State && State.length) {
    filteredData = filteredData.filter((user) =>
      user.state.toLowerCase().includes(State.toLowerCase())
    );
  }

  return filteredData;
}
