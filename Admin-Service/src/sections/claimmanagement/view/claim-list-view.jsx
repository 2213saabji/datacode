import isEqual from 'lodash/isEqual';
// import { useNavigate } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { alpha, useTheme } from '@mui/material/styles';
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

import { UpdateClaim, useGetClaims, useGetMyClaims } from 'src/api/exp_claim';
// import { useGetCategories } from 'src/api/exp_category';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ClaimAnalytic from '../claim-analytic';
import CategoryTableFiltersResult from '../claim-table-filters-result';
import {
  RenderCellClaimId,
  RenderCellClaimDate,
  RenderCellClaimAmount,
  // RenderCellClaimName,
  RenderCellClaimStatus,
} from '../claim-table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  { value: 'requestedClaim', label: 'Requested Claim List' },
  { value: 'myClaim', label: 'My ClaimList' },
];

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function ClaimListView() {
  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  // const navigate = useNavigate();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetClaims to fetch data of all claims

  // const { categories, categoriesLoading } = useGetCategories();
  const { claims, claimsLoading } = useGetClaims();

  const { myclaims, myclaimsLoading } = useGetMyClaims();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [myClaimList, setMyClaimList] = useState(() => {
    const data = localStorage.getItem('myClaimList');
    if (data) return data;
    return 'requestedClaim';
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (myClaimList === 'myClaim') {
      if (myclaims && myclaims.data) {
        // Map the myclaims data and add the claimId as the id property for each row

        const updatedTableData = myclaims.data.map((claim) => ({
          ...claim,
          id: claim.expenseClaimId,
        }));
        setTableData(updatedTableData);
      }
    } else if (claims && claims.data) {
      // Map the claims data and add the claimId as the id property for each row

      const updatedTableData = claims.data.map((claim) => ({
        ...claim,
        id: claim.expenseClaimId,
      }));
      setTableData(updatedTableData);
    } else {
      setTableData([]);
    }
  }, [claims, myclaims, myClaimList]);

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
        const apiUrl = `/expense/claims/delete/${id}`;

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

      const apiUrl = `/expense/claims/delete`;

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
      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.expenseClaimId));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  // commented this edit button for calim

  // const handleEditRow = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.claim.edit(id));
  //   },
  //   [router]
  // );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.claim.details(id));
    },
    [router]
  );

  const claimStatusRow = async (id, status) => {
    const data = { claimStatus: status };

    try {
      const response = await UpdateClaim(id, data);

      if (response.status_code === 200) {
        enqueueSnackbar(`Claim ${status} successfully`, { variant: 'success' });
        router.push(paths.dashboard.claim.details(id));
      } else {
        enqueueSnackbar(`Failed to ${status} Claim`, { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating Claim :', error);
      enqueueSnackbar('An error occurred while updating Claim ', { variant: 'error' });
    }
  };

  const handleFilterStatus = useCallback((event, newValue) => {
    setMyClaimList(newValue);
    localStorage.setItem('myClaimList', newValue);
  }, []);

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'id',
      headerName: 'Claim Id',
      flex: 1,
      minWidth: 140,
      hideable: false,
      renderCell: (params) => <RenderCellClaimId params={params} />,
    },
    // {
    //   field: 'name',
    //   headerName: 'User Name',
    //   flex: 1,
    //   width: 80,
    //   renderCell: (params) => <RenderCellClaimName params={params} />,
    // },
    {
      field: 'amount',
      headerName: 'Amount',
      flex: 1,
      minWidth: 140,
      renderCell: (params) => <RenderCellClaimAmount params={params} />,
    },
    {
      field: 'purchaseDate',
      headerName: 'Purches Date',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellClaimDate params={params} />,
    },
    {
      field: 'claimStatus',
      headerName: 'Status',
      flex: 1,
      minWidth: 140,
      renderCell: (params) => <RenderCellClaimStatus params={params} />,
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
      getActions: (params) => {
        const { claimStatus } = params.row;
        const action = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewRow(params.row.expenseClaimId)}
          />,
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Delete"
            onClick={() => {
              handleDeleteRow(params.row.expenseClaimId);
            }}
            sx={{ color: 'error.main' }}
          />,
        ];
        if (claimStatus === 'Open' && myClaimList === 'requestedClaim') {
          action.push(
            <GridActionsCellItem
              showInMenu
              icon={<Iconify icon="mingcute:check-2-line" />}
              label="Approve"
              onClick={() => {
                claimStatusRow(params.row.expenseClaimId, 'Approved');
              }}
            />,
            <GridActionsCellItem
              showInMenu
              icon={<Iconify icon="basil:cancel-outline" />}
              label="Reject"
              onClick={() => {
                claimStatusRow(params.row.expenseClaimId, 'Rejected');
              }}
            />
          );
        }
        return action;
      },
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
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
        >
          Back
        </Button>

        <CustomBreadcrumbs
          heading={myClaimList === 'requestedClaim' ? 'REQUESTED CLAIM LIST' : 'MY CLAIM LIST'}
          links={[
            {
              name: 'Claim',
              href: paths.dashboard.claim.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.claim.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Claim
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
              <ClaimAnalytic
                title="Total Claims"
                total={tableData.length}
                // total={20}
                // percent={100}
                // price={100}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <ClaimAnalytic
                title="Total Booths"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <ClaimAnalytic
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              {/* <ClaimAnalytic
                title="Overdue"
                total={tableData.length}
                percent={100}
                price={100}
                icon="solar:bell-bing-bold-duotone"
                color={theme.palette.error.main}
              /> */}

              <ClaimAnalytic
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
          <Tabs
            value={myClaimList}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme2) => `inset 0 -2px 0 0 ${alpha(theme2.palette.grey[500], 0.08)}`,
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab
                key={tab.value}
                iconPosition="start"
                value={tab.value}
                label={tab.label}
                sx={{ color: tab.value === myClaimList && theme.palette.primary.main }}
                icon={
                  <Iconify
                    icon="simple-icons:googledocs"
                    variant={(tab.value === myClaimList && 'primary') || 'soft'}
                    color={tab.value === myClaimList && theme.palette.primary.main}
                  />
                }
              />
            ))}
          </Tabs>

          {myClaimList === 'myClaim' ? (
            <DataGrid
              checkboxSelection
              disableRowSelectionOnClick
              rows={dataFiltered}
              columns={columns}
              loading={myclaimsLoading}
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
          ) : (
            <DataGrid
              checkboxSelection
              disableRowSelectionOnClick
              rows={dataFiltered}
              columns={columns}
              loading={claimsLoading}
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
          )}
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
