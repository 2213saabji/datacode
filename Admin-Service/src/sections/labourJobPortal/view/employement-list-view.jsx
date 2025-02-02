/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import isEqual from 'lodash/isEqual';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { deleter } from 'src/utils/axios-ums'

import { useAuthContext } from 'src/auth/hooks';

import { useGetUserBySeller } from 'src/api/interestedConsumer';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import EmployementTableFiltersResult from '../employement-table-filters-result';
import {
  RenderCellEmail,
  RenderCellNumber,
  RenderCellConsumerName
} from '../employement-table-row';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ------------------------------------------------------------------------

export default function EmployementListView() {
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();

  const { usersBySeller, usersBySellerLoading, mutate: mutateInterestedConsumer } = useGetUserBySeller(user?.accessToken);

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  // eslint-disable-next-line no-unused-vars
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (usersBySeller && usersBySeller?.data) {
      const updatedTableData = usersBySeller?.data?.map((seller) => ({
        ...seller,
        id: seller.sellerId,
      }));
      setTableData(updatedTableData);
    }
  }, [usersBySeller]);

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
        const apiUrl = `/interestedConsumer/delete/${id}`;

        const httpMethod = 'DELETE';

        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`
          },
        };

        // Make the API request
        const response = await deleter(apiUrl, headers);

        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          mutateInterestedConsumer();
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }

        console.info('API Response:', response);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user?.accessToken, mutateInterestedConsumer]
  );

  // Delete rows

  // const handleDeleteRows = useCallback(async () => {
  //   try {
  //     const idsToDelete = tableData
  //       .filter((row) => selectedRowIds.includes(row.id))
  //       .map((row) => row.id);

  //     const apiUrl = `feedback/delete/`;
  //     const httpMethod = 'DELETE';
  //     const hearders = {
  //       method: httpMethod,
  //       hearders: {
  //         Authorization: localStorage.getItem('accessToken'),
  //         'Content-Type': 'application/json',
  //       },
  //     };
  //     await Promise.all(
  //       idsToDelete.map(async (id) => {
  //         const url = `${apiUrl}/${id}`;
  //         const response = await deleter(url, hearders);

  //         if (!response.success !== true) {
  //           throw new Error(response.message);
  //         }

  //         console.info('API Response:', response);
  //       })
  //     );
  //     const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
  //     setTableData(updatedTableData);

  //     enqueueSnackbar('Delete success!', { variant: 'success' });
  //   } catch (error) {
  //     console.error('API Error:', error);
  //     enqueueSnackbar('Failed to delete row', { variant: 'error' });
  //   }
  // }, [enqueueSnackbar, selectedRowIds, tableData]);

  const columns = [
    {
      field: 'firstName',
      headerName: 'Name',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellConsumerName params={params} />,
    },
    {
      field: 'email',
      headerName: 'Email',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderCellEmail params={params} />,
    },
    {
      field: 'phone',
      headerName: 'Contact Number',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderCellNumber params={params} />,
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
      getActions: (params) => {
        // Define actions available to all users
        const actions = [
          <GridActionsCellItem
            key="delete"
            showInMenu
            icon={<Iconify icon="solar:trash-bin-trash-bold" />}
            label="Delete"
            onClick={() => handleDeleteRow(params?.row?.interestedConsumerId)}
            sx={{ color: 'error.main' }}
          />,
        ];

        return actions;
      },
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });


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
          heading="EMPLOYEMENT LIST"
          links={[
            {
              // name: 'EMERGENCY SERVICE',
              href: paths.dashboard.FeedbackPage.root,
            },

            // { name: 'List' },
          ]}
          action={
            user.userRoleId === 1 && (
              <Button
                component={RouterLink}
                href={paths.dashboard.emergencyServices.new}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                Add Emergency Contact
              </Button>
            )
          }
          sx={{
            mb: {
              xs: 3,
              md: 2,
            },
            mt: '30px'
          }}
        />
        <Card
          sx={{
            mb: { xs: 3, md: 0 },
          }}
        >
          {/* <Scrollbar>
            <Stack
            direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
            <EmergencyAnalytics
            title="Total Suggestion"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
                />
                
              <EmergencyAnalytics
                title="Total Unread Suggestion"
                total={suggestionstatus?.data?.unread}
                percent={100}
                // price={100}
                icon="mdi:eye-off"
                color={theme.palette.warning.main}
              />
              <EmergencyAnalytics
              title="Total Read Suggestion"
                total={suggestionstatus?.data?.read}
                percent={100}
                // price={100}
                icon="mdi:eye"
                color={theme.palette.success.main}
                />
                </Stack>
                </Scrollbar> */}
        </Card>

        <Card
          sx={{
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
            loading={usersBySellerLoading}
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
                      {/* <Button
                        component={RouterLink}
                        variant="contained"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={handleOpen}
                      >
                        Emergency
                      </Button> */}
                      {/* {!!selectedRowIds.length && (
                        <Button
                          size="small"
                          color="error"
                          startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                          onClick={confirmRows.onTrue}
                        >
                          Delete ({selectedRowIds.length})
                        </Button>
                      )} */}
                      {/* <GridToolbarColumnsButton />
                      <GridToolbarFilterButton />
                      <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <EmployementTableFiltersResult
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

      {/* <ConfirmDialog
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
      /> */}
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