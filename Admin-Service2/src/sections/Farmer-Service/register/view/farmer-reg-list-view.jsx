/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { alpha, Button, useTheme } from '@mui/material';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter } from 'src/utils/axios-institution-agriculture';

import { useAuthContext } from 'src/auth/hooks';
import { useGetTractors } from 'src/api/agriculture/tractor';
import { useGetIrrigations } from 'src/api/agriculture/irrigation';
import { useGetcultivations } from 'src/api/agriculture/cultivation';
import { useGetModernAgriTools } from 'src/api/agriculture/modernAgri';
import { useGetCombineHarvesters } from 'src/api/agriculture/combineharvesters';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FarmerRegTableFiltersResult from '../farmer-reg-table-filters-result';
import {
  RenderCellYear,
  RenderCellType,
  RenderCellPrice,
  RenderCellModel,
  RenderCellBrandName,
  RenderCellBookingAgriculture,
  RenderCellContactSeller,
} from '../farmer-reg-table-row';

// ----------------------------------------------------------------------

const STATUS_OPTIONS = [
  {
    value: 'modernAgriculturealTools',
    label: 'Modern Agricultural Tool',
    icon: 'carbon:agriculture-analytics',
  },
  { value: 'cultivationEquipment', label: 'Cultivation Equipment', icon: 'hugeicons:tractor' },
  { value: 'irrigrationSystems', label: 'Irrigration System', icon: 'mdi:irrigation' },
  { value: 'combineHarvesters', label: 'Combine Harvester', icon: 'hugeicons:tractor' },
  { value: 'tractors', label: 'Tractor', icon: 'hugeicons:tractor' },
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

export default function FarmerRegListView() {
  const { enqueueSnackbar } = useSnackbar();

  const theme = useTheme();

  const { user } = useAuthContext();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const sellerDetails = useMemo(
    () =>
      localStorage.getItem('sellerDetails') !== 'undefined' &&
      JSON.parse(localStorage.getItem('sellerDetails')),
    []
  );

  const { tractors, tractorsLoading } = useGetTractors();
  const { tools, toolsLoading } = useGetModernAgriTools();
  const { irrigations, irrigationsLoading } = useGetIrrigations();
  const { cultivations, cultivationsLoading } = useGetcultivations();
  const { combineHarvesters, combineHarvestersLoading } = useGetCombineHarvesters();
  const myTractors = useMemo(
    () =>
      tractors?.data?.filter((tractor) =>
        sellerDetails?.sellerOwnerId ? tractor.sellerOwnerId === sellerDetails.sellerOwnerId : []
      ),
    [tractors, sellerDetails]
  );
  const myModernAgriTools = useMemo(
    () =>
      tools?.data?.filter((tool) =>
        sellerDetails?.sellerOwnerId ? tool.sellerOwnerId === sellerDetails.sellerOwnerId : []
      ),
    [tools, sellerDetails]
  );

  const myIrrigation = useMemo(
    () =>
      irrigations?.data?.filter((irrigation) =>
        sellerDetails?.sellerOwnerId ? irrigation.sellerOwnerId === sellerDetails.sellerOwnerId : []
      ),
    [irrigations, sellerDetails]
  );

  const myCultivation = useMemo(
    () =>
      cultivations?.data?.filter((cultivation) =>
        sellerDetails?.sellerOwnerId
          ? cultivation.sellerOwnerId === sellerDetails.sellerOwnerId
          : []
      ),
    [cultivations, sellerDetails]
  );

  const myHarverter = useMemo(
    () =>
      combineHarvesters?.data?.filter((harverter) =>
        sellerDetails?.sellerOwnerId ? harverter.sellerOwnerId === sellerDetails.sellerOwnerId : []
      ),
    [combineHarvesters, sellerDetails]
  );

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [productSelected, setProductSelected] = useState(() => {
    const data = localStorage.getItem('currAgriProduct');
    if (data) return data;
    return 'modernAgriculturealTools';
  });

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const listTabs = useMemo(() => {
    if (user.userRoleId === 46) {
      return [
        { value: 'myProducts', label: 'My Products', icon: 'icon-park-outline:ad-product' },
        ...STATUS_OPTIONS,
      ];
    }
    return STATUS_OPTIONS;
  }, [user.userRoleId]);

  useEffect(() => {
    let updatedTableData = [];

    switch (productSelected) {
      case 'tractors':
        if (tractors && tractors.data) {
          updatedTableData = tractors.data.map((tractor) => ({
            ...tractor,
            id: tractor.tractorId,
          }));
        }
        break;
      case 'modernAgriculturealTools':
        if (tools && tools.data) {
          updatedTableData = tools.data.map((tool) => ({
            ...tool,
            id: tool.modernAgriToolId,
          }));
        }
        break;
      case 'irrigrationSystems':
        if (irrigations && irrigations.data) {
          updatedTableData = irrigations.data.map((tool) => ({
            ...tool,
            id: tool.irrigationSystemId,
          }));
        }
        break;
      case 'cultivationEquipment':
        if (cultivations && cultivations.data) {
          updatedTableData = cultivations.data.map((tool) => ({
            ...tool,
            id: tool.cultivationEquipmentId,
          }));
        }
        break;
      case 'combineHarvesters':
        if (combineHarvesters && combineHarvesters.data) {
          updatedTableData = combineHarvesters.data.map((tool) => ({
            ...tool,
            id: tool.combineHarvesterId,
          }));
        }
        break;
      case 'myProducts':
        switch (sellerDetails.sellerType) {
          case 'Tractor':
            if (myTractors) {
              updatedTableData = myTractors.map((tractor) => ({
                ...tractor,
                id: tractor.tractorId,
              }));
            }
            break;
          case 'Combine Harvester':
            if (myHarverter) {
              updatedTableData = myHarverter.map((tool) => ({
                ...tool,
                id: tool.combineHarvesterId,
              }));
            }
            break;
          case 'Irrigration System':
            if (myIrrigation) {
              updatedTableData = myIrrigation.map((tool) => ({
                ...tool,
                id: tool.irrigationSystemId,
              }));
            }
            break;
          case 'Cultivation Equipment':
            if (myCultivation) {
              updatedTableData = myCultivation.map((tool) => ({
                ...tool,
                id: tool.cultivationEquipmentId,
              }));
            }
            break;
          case 'Modern Agricultural Tool':
            if (myModernAgriTools) {
              updatedTableData = myModernAgriTools.map((tool) => ({
                ...tool,
                id: tool.modernAgriToolId,
              }));
            }
            break;
          default:
            updatedTableData = [];
            break;
        }
        break;
      default:
        updatedTableData = [];
        break;
    }

    setTableData(updatedTableData);
  }, [
    tractors,
    tools,
    irrigations,
    cultivations,
    combineHarvesters,
    myCultivation,
    myHarverter,
    myIrrigation,
    myModernAgriTools,
    myTractors,
    sellerDetails,
    productSelected,
  ]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const handleFilterStatus = useCallback((event, newValue) => {
    setProductSelected(newValue);
    localStorage.setItem('currAgriProduct', newValue);
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

  // console.log('------->', sellerDetails.sellerType)

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const url = (() => {
          if (sellerDetails.sellerType === 'Tractor') {
            return `/tractorDetails/delete/${id}`;
          }
          if (sellerDetails.sellerType === 'Combine Harvester') {
            return `/combineHarvester/delete/${id}`;
          }
          if (sellerDetails.sellerType === 'Irrigration System') {
            return `/irrigationSystemDetails/delete/${id}`;
          }
          if (sellerDetails.sellerType === 'Cultivation Equipment') {
            return `/cultivationEquipment/delete/${id}`;
          }
          if (sellerDetails.sellerType === 'Modern Agricultural Tool') {
            return `/modernAgriTools/delete/${id}`;
          }
          return '';
        })();

        // Use the DELETE HTTP method
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
    [enqueueSnackbar, tableData, sellerDetails, user.accessToken]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = (() => {
        if (sellerDetails.sellerType === 'Tractor') {
          return `/tractor-details/delete`;
        }
        if (sellerDetails.sellerType === 'Combine Harvester') {
          return `/combine-harvester/delete`;
        }
        if (sellerDetails.sellerType === 'Irrigration System') {
          return `/irrigation-system-details/delete`;
        }
        if (sellerDetails.sellerType === 'Cultivation Equipment') {
          return `/cultivation-equipment/delete`;
        }
        if (sellerDetails.sellerType === 'Modern Agricultural Tool') {
          return `/modern-agri-tools/delete`;
        }
        return '';
      })();

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
  }, [enqueueSnackbar, selectedRowIds, sellerDetails, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.FarmerCompanyRegister.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      const pushToRouter = (path) => {
        router.push(path(id));
      };

      switch (productSelected) {
        case 'tractors':
          pushToRouter(paths.dashboard.FarmerCompanyRegister.tractor_details);
          break;
        case 'combineHarvesters':
          pushToRouter(paths.dashboard.FarmerCompanyRegister.combine_harvester_details);
          break;
        case 'irrigrationSystems':
          pushToRouter(paths.dashboard.FarmerCompanyRegister.irrigation_tool_details);
          break;
        case 'cultivationEquipment':
          pushToRouter(paths.dashboard.FarmerCompanyRegister.cultivation_tool_details);
          break;
        case 'modernAgriculturealTools':
          pushToRouter(paths.dashboard.FarmerCompanyRegister.modern_agriculture_tool_details);
          break;
        case 'myProducts':
          switch (sellerDetails.sellerType) {
            case 'Tractor':
              pushToRouter(paths.dashboard.FarmerCompanyRegister.tractor_details);
              break;
            case 'Combine Harvester':
              pushToRouter(paths.dashboard.FarmerCompanyRegister.combine_harvester_details);
              break;
            case 'Irrigration System':
              pushToRouter(paths.dashboard.FarmerCompanyRegister.irrigation_tool_details);
              break;
            case 'Cultivation Equipment':
              pushToRouter(paths.dashboard.FarmerCompanyRegister.cultivation_tool_details);
              break;
            case 'Modern Agricultural Tool':
              pushToRouter(paths.dashboard.FarmerCompanyRegister.modern_agriculture_tool_details);
              break;
            default:
              break;
          }
          break;
        default:
          break;
      }
    },
    [productSelected, sellerDetails, router]
  );

  const handleBookAppointmentRow = useCallback(() => {
    router.push(paths.dashboard.FarmerCompanyRegister.appointment);
  }, [router]);

  const initialColumns = useMemo(
    () => [
      {
        field: 'category',
        headerName: 'Category',
        filterable: false,
      },

      {
        field: 'brand',
        headerName: 'Brand Name',
        flex: 1,
        minWidth: 180,
        // maxWidth: 130,
        hideable: true,
        renderCell: (params) => <RenderCellBrandName params={params} />,
      },
      {
        field: 'price',
        headerName: 'Price',
        type: 'singleSelect',
        flex: 1,
        minWidth: 180,
        // maxWidth: 130,
        editable: true,
        renderCell: (params) => <RenderCellPrice params={params} />,
      },
      {
        field: 'bookAppointment',
        headerName: 'Book Appointment',
        flex: 1,
        minWidth: 180,
        // maxWidth: 130,
        type: 'singleSelect',
        renderCell: (params) => sellerDetails?.sellerOwnerId !== params?.row?.sellerOwnerId && <RenderCellBookingAgriculture params={params} />,
      },
      user?.userRoleId !== 46 && {
        field: 'contactSeller',
        headerName: 'Contact Seller',
        flex: 1,
        minWidth: 180,
        renderCell: (params) => <RenderCellContactSeller params={params} />,
      },
      {
        field: 'yearManufactured',
        headerName: 'Year Manufactured',
        flex: 1,
        minWidth: 180,
        // maxWidth: 130,
        renderCell: (params) => <RenderCellYear params={params} />,
      },
      {
        field: 'offers',
        headerName: 'Offers',
        flex: 1,
        minWidth: 180,
        // maxWidth: 130,
        // renderCell: (params) => <RenderCellYear params={params} />,
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
          const { sellerOwnerId } = params.row;
          const action = [
            // <GridActionsCellItem
            //   showInMenu
            //   icon={<Iconify icon="solar:eye-bold" />}
            //   label="View"
            //   onClick={() => handleViewRow(params.row.id)}
            // />,

          ];
          if (user.userRoleId === 46) {
            if (sellerDetails?.sellerOwnerId === sellerOwnerId) {
              action.push(
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
              );
            }
            // else {
            //   action.push(
            //     <GridActionsCellItem
            //       showInMenu
            //       icon={<Iconify icon="icon-park-outline:appointment" />}
            //       label={
            //         <Label color='success' variant="filled">
            //           Book Appointment
            //         </Label>
            //       }
            //       onClick={() => handleBookAppointmentRow(params.row.id)}
            //     />
            //   )
            // }
          }
          // else {
          //   action.push(
          //     <GridActionsCellItem
          //       showInMenu
          //       icon={<Iconify icon="icon-park-outline:appointment" />}
          //       label={
          //         <Label color='success' variant="filled">
          //           Book Appointment
          //         </Label>
          //       }
          //       onClick={() => handleBookAppointmentRow(params.row.id)}
          //     />,
          //   )
          // }

          return action;
        },
      },
    ],
    [handleDeleteRow, handleEditRow, user, sellerDetails]
  );

  const [columns, setColumns] = useState(initialColumns);

  useEffect(() => {
    const newColumns = [...initialColumns];

    const addModelColumn = () => {
      newColumns.unshift({
        field: 'model',
        headerName: 'Model',
        flex: 1,
        minWidth: 180,
        editable: true,
        renderCell: (params) => <RenderCellModel params={params} handleViewRow={handleViewRow} />,
      });
    };

    const addTypeColumn = () => {
      newColumns.unshift({
        field: 'type',
        headerName: 'Type',
        flex: 1,
        minWidth: 250,
        // maxWidth: 130,
        editable: true,
        renderCell: (params) => <RenderCellType params={params} handleViewRow={handleViewRow} />,
      });
    };

    switch (productSelected) {
      case 'tractors':
      case 'combineHarvesters':
        addModelColumn();
        break;
      case 'myProducts':
        switch (sellerDetails.sellerType) {
          case 'Tractor':
          case 'Combine Harvester':
            addModelColumn();
            break;
          default:
            addTypeColumn();
            break;
        }
        break;
      default:
        addTypeColumn();
        break;
    }

    setColumns(newColumns);

    // if (user?.userRoleId === 46) {
    //   if (sellerDetails?.sellerOwnerId !== user?.userId) {
    //     initialColumns.push({
    //       field: 'bookAppointment',
    //       headerName: 'Book Appointment',
    //       flex: 1,
    //       minWidth: 180,
    //       // maxWidth: 130,
    //       type: 'singleSelect',
    //       renderCell: (params) => <RenderCellBookingAgriculture params={params} />,
    //     })
    //   }
    // }
  }, [initialColumns, productSelected, sellerDetails, handleViewRow,]);

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const { open, openPaymentModal } = useAuthContext();

  const handleClick = (url) => {
    if (open) {
      openPaymentModal();
    } else {
      router.push(url);
    }
  };

  return (
    <>
      <Box
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading=""
          links={[{}]}
          action={
            // user.userRoleId === 46 ? (
            //   <Button
            //     // component={RouterLink}
            //     // href={paths.dashboard.FarmerCompanyRegister.new}
            //     onClick={() => handleClick(paths.dashboard.FarmerCompanyRegister.new)}
            //     variant="contained"
            //     startIcon={<Iconify icon="mingcute:add-line" />}
            //   >
            //     ADD PRODUCT DETAILS
            //   </Button>
            // ) : (
              user.userRoleId !== 46 && <Button
                onClick={() => handleClick(paths.dashboard.user.profile)}
                // component={RouterLink}
                // href={paths.dashboard.user.profile}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                UPGRADE TO LIST YOUR BUSINESS
              </Button>
            // )
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            mt: 0,
          }}
        />

        {/* analytic start here */}
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
              <FarmerRegAnalytics
                title="Total"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <FarmerRegAnalytics
                title="Total Candidate"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <FarmerRegAnalytics
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <FarmerRegAnalytics
                title="Legal Case Candidate"
                total={tableData.length}
                percent={100}
                // price={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card> */}

        {/* analytic ends here */}

        <Card>
          <Tabs
            value={productSelected}
            onChange={handleFilterStatus}
            sx={{
              px: 2.5,
              boxShadow: (theme2) => `inset 0 -2px 0 0 ${alpha(theme2.palette.grey[500], 0.08)}`,
            }}
          >
            {listTabs.map((tab) => (
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
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={toolsLoading}
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
                      {/* {!!selectedRowIds.length && (
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
                      <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <FarmerRegTableFiltersResult
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
      </Box>

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
