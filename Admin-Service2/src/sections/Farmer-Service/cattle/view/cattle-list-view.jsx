/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback, useMemo } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Tab, Tabs, alpha, useTheme } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-institution-agriculture';
import { createNotifications } from 'src/api/notifications'

import { useAuthContext } from 'src/auth/hooks';
// import { useGetParties } from 'src/api/party';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import PartyTableFiltersResult from '../party-table-filters-result';
// import PartyManagementAnalytics from '../party_management-analytics';

import { useGetCattles, useGetCattleDetails } from 'src/api/agriculture/cattle';

import CattleTableFiltersResult from '../cattle-table-filters-result';
import {
  RenderCellCattleType,
  RenderCellCattleBreed,
  RenderCellCattlePrice,
  RenderCellCattleLocation,
  RenderCellContactSeller
} from '../cattle-table-row';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const STATUS_OPTIONS = [
  { value: 'cattleList', label: 'Cattle List', icon: 'icon-park-outline:cattle' },
  { value: 'myList', label: 'My List', icon: 'line-md:list-3-filled' },

];

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function CattleListView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const { user } = useAuthContext();
  // console.log('user', user)

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  // useGetAppointments to fetch data of all appointments
  const cattleOwnerId = localStorage.getItem('cattleOwnerUserId') && localStorage.getItem('cattleOwnerUserId')

  const { open, openPaymentModal } = useAuthContext();

  const goTo = () => {
    if (open) {
      openPaymentModal();
    } else {
      localStorage.setItem('FarmerViewTab', 'farmerProduct');

      router.push('/dashboard/FarmerService/new');
      window.location.reload(); // Force a reload to get the value from localStorage
    }
  };

  const { cattles, cattlesLoading, mutate: mutateCattleType } = useGetCattles();
  const {
    cattlesDetails,
    cattleDetailsLoading,
    mutate: mutateCattleDetails,
  } = useGetCattleDetails();

  // const mergedData = cattles?.data?.map((info) => {
  //   const matchingDetail = cattlesDetails?.data?.find(
  //     (detail) => detail.cattleTypeId === info.cattleTypeId
  //   );
  //   return matchingDetail ? { ...info, ...matchingDetail } : info;
  // });
  // console.log("mergedData---->", mergedData);
  // console.log("user---->", user);

  const userCity = user?.UserAddressesses?.[0]?.userCity;
  const userState = user?.UserAddressesses?.[0]?.userState;

  const mergedData = cattles?.data?.map((info) => {
    const matchingDetail = cattlesDetails?.data?.find(
      (detail) => detail.cattleTypeId === info.cattleTypeId
    );
    return matchingDetail ? { ...info, ...matchingDetail } : info;
  })?.sort((a, b) => {
    const isCityMatchA = userCity ? a.city === userCity : false;
    const isCityMatchB = userCity ? b.city === userCity : false;
    const isStateMatchA = userState ? a.state === userState : false;
    const isStateMatchB = userState ? b.state === userState : false;

    if (isCityMatchA && !isCityMatchB) return -1;
    if (!isCityMatchA && isCityMatchB) return 1;

    if (isStateMatchA && !isStateMatchB) return -1;
    if (!isStateMatchA && isStateMatchB) return 1;

    if (a.city < b.city) return -1;
    if (a.city > b.city) return 1;

    return 0;
  });

  const filteredData = useMemo(() =>
    mergedData?.filter((data) => user?.userId !== data.userId)
    , [mergedData, user]);

  const myData = useMemo(() => {
    if (user?.userId !== null) {
      return mergedData?.filter((data) => user?.userId === data.userId) || [];
    }
    return [];
  }, [mergedData, user]);
  // console.log("filteredData---->", filteredData);

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const [productSelected, setProductSelected] = useState(() => {
    const data = localStorage.getItem("currCattleTab")
    if (data) return data;
    return 'cattleList';
  });

  useEffect(() => {
    let updatedTableData = [];

    switch (productSelected) {
      case 'cattleList':
        if (filteredData) {
          updatedTableData = filteredData.map((mrgData) => ({
            ...mrgData,
            id: mrgData.cattleTypeId,
          }));
        }
        break;
      case 'myList':
        if (myData) {
          updatedTableData = myData.map((data) => ({
            ...data,
            id: data.cattleTypeId,
          }));
        }
        break;

      default:
        updatedTableData = [];
        break;
    }

    setTableData(updatedTableData);
  }, [myData, mergedData, filteredData, productSelected]);

  // useEffect(() => {
  //   const updatedTableData = mergedData?.map((catt) => ({
  //     ...catt,
  //     id: catt.cattleTypeId,
  //   })) || [];

  //   setTableData(updatedTableData);
  // }, [mergedData]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const handleFilterStatus = useCallback((event, newValue) => {
    setProductSelected(newValue);
    localStorage.setItem('currCattleTab', newValue);
  }, []);

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
    async (id, cattleId) => {
      try {
        // Define the URLs for both API endpoints
        const url1 = `/cattleTypeDetails/delete/${id}`;
        const url2 = `/cattleDetails/delete/${cattleId}`;

        // Define the headers for both requests
        const headers = {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user?.accessToken}`,
          },
        };

        // Make both API calls concurrently
        const [response1, response2] = await Promise.all([
          deleter(url1, headers),
          deleter(url2, headers),
        ]);

        // Check the response for the first API call
        if (response1.success === true && response2.success === true) {
          // Handle success for both deletions
          enqueueSnackbar('Delete success!', { variant: 'success' });
          // Update table data after successful deletion
          mutateCattleType();
          mutateCattleDetails();
        } else {
          // Handle errors for the failed API calls
          const errorMessage = response1.message || response2.message || 'Unknown error';
          enqueueSnackbar(errorMessage, { variant: 'error' });
        }

        console.info('API Responses:', response1, response2);
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user?.accessToken, mutateCattleDetails, mutateCattleType]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds?.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `/cattleTypeDetails/delete`;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          // Authorization:`Bearer ${user?.accessToken}`
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
      mutateCattleType();
      mutateCattleDetails();
      // const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      // setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData, mutateCattleType, mutateCattleDetails]);

  const handleEditRow = useCallback(
    (id, cattleId) => {
      router.push(paths.dashboard.Cattle.edit(id, cattleId));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id, cattleId) => {
      router.push(paths.dashboard.Cattle.details(id, cattleId));
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
    //   field: 'description',
    //   headerName: 'Description',
    //   flex: 1,
    //   minWidth: 180,
    //   hideable: false,
    //   renderCell: (params) => <RenderCellDescription params={params} />,
    // },
    {
      field: 'type',
      headerName: 'Cattle Type',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => (
        <RenderCellCattleType params={params} handleViewRow={handleViewRow} />
      ),
    },
    {
      field: 'breed',
      headerName: 'Cattle Breed',
      flex: 1,
      minWidth: 180,
      hideable: false,
      renderCell: (params) => <RenderCellCattleBreed params={params} />,
    },
    {
      field: 'price',
      headerName: 'Price',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellCattlePrice params={params} />,
    },
    {
      field: 'city',
      headerName: 'Location',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellCattleLocation params={params} />,
    },
    {
      field: 'contactSeller',
      headerName: 'Contact Seller',
      flex: 1,
      minWidth: 180,
      renderCell: (params) => <RenderCellContactSeller params={params} />,
    },

    {
      type: 'actions',
      field: 'actions',
      headerName: ' ',
      align: 'right',
      headerAlign: 'right',
      minWidth: 80,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => {

        const action = [
          // <GridActionsCellItem
          //   showInMenu
          //   icon={<Iconify icon="solar:eye-bold" />}
          //   label="View"
          //   onClick={() => handleViewRow(params.row.id)}
          // />,
        ]
        if (user?.userId === params?.row?.user_id) {
          action.push(
            <GridActionsCellItem
              showInMenu
              icon={<Iconify icon="solar:trash-bin-trash-bold" />}
              label="Delete"
              onClick={() => {
                handleDeleteRow(params.row.cattleTypeId, params.row.cattleId);
              }}
              sx={{ color: 'error.main' }}
            />,
            <GridActionsCellItem
              showInMenu
              icon={<Iconify icon="solar:pen-bold" />}
              label="Update"
              onClick={() => handleEditRow(params.row.cattleTypeId, params.row.cattleId)}
            />,
          )
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
        <CustomBreadcrumbs
          heading="Livestock LIST"
          links={[
            {
              name: 'Livestock',
              href: paths.dashboard.party.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.Cattle.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              ADD NEW CATTLE
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
        // sx={{
        //   height: { xs: 800, md: 2 },
        //   flexGrow: { md: 1 },
        //   display: { md: 'flex' },
        //   flexDirection: { md: 'column' },
        // }}
        >
          <Tabs
            value={productSelected}
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
                sx={{ color: tab.value === productSelected && theme.palette.primary.main }}
                icon={
                  <Iconify
                    icon={tab.icon}
                    variant={(tab.value === productSelected && 'primary') || 'soft'}
                    color={tab.value === productSelected && theme.palette.primary.main}
                  />
                }
              />
            ))}
          </Tabs>

          <DataGrid
            // checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={cattlesLoading}
            getRowHeight={() => '10px'}
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
                      <GridToolbarFilterButton /> */}
                      {/* <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <CattleTableFiltersResult
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