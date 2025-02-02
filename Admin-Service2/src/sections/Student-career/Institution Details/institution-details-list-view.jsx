// import isEqual from 'lodash/isEqual';
// import { useState, useEffect, useCallback } from 'react';

// import Card from '@mui/material/Card';
// import Stack from '@mui/material/Stack';
// import Button from '@mui/material/Button';
// import Container from '@mui/material/Container';
// import { Divider, useTheme } from '@mui/material';
// import {
//   DataGrid,
//   GridToolbarExport,
//   GridActionsCellItem,
//   GridToolbarContainer,
//   GridToolbarQuickFilter,
//   GridToolbarFilterButton,
//   GridToolbarColumnsButton,
// } from '@mui/x-data-grid';

// import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
// import { RouterLink } from 'src/routes/components';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { deleter } from 'src/utils/axios-call';

// import { useGetParties } from 'src/api/party';
// import { useAuthContext } from 'src/auth/hooks';

// import Iconify from 'src/components/iconify';
// import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
// import EmptyContent from 'src/components/empty-content';
// import { ConfirmDialog } from 'src/components/custom-dialog';
// import { useSettingsContext } from 'src/components/settings';
// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import PartyTableFiltersResult from '../party-table-filters-result';
// import PartyManagementAnalytics from '../party_management-analytics';
// import {
//   RenderCellPartyName,
//   RenderCellPartyLeader,
//   RenderCellPartySymbol,
//   RenderCellFoundationYear,
// } from '../party-table-row';

// // ----------------------------------------------------------------------

// const defaultFilters = {
//   publish: [],
//   stock: [],
// };

// const HIDE_COLUMNS = {
//   category: false,
// };

// const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// // ----------------------------------------------------------------------

// export default function PartyListView() {
//   const { enqueueSnackbar } = useSnackbar();

//   const theme = useTheme();

//   const { user } = useAuthContext();

//   const confirmRows = useBoolean();

//   const router = useRouter();

//   const settings = useSettingsContext();

//   // useGetParties to fetch data of all parties

//   const { parties, partiesLoading } = useGetParties();

//   const [tableData, setTableData] = useState([]);

//   const [filters, setFilters] = useState(defaultFilters);

//   const [selectedRowIds, setSelectedRowIds] = useState([]);

//   const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

//   useEffect(() => {
//     if (parties && parties.data) {
//       // Map the parties data and add the WardId as the id property for each row
//       const updatedTableData = parties.data.map((party) => ({
//         ...party,
//         id: party.partyId,
//       }));
//       setTableData(updatedTableData);
//     }
//   }, [parties]);

//   const dataFiltered = applyFilter({
//     inputData: tableData,
//     filters,
//   });

//   const canReset = !isEqual(defaultFilters, filters);

//   const handleFilters = useCallback((name, value) => {
//     setFilters((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   }, []);

//   const handleResetFilters = useCallback(() => {
//     setFilters(defaultFilters);
//   }, []);

//   const handleDeleteRow = useCallback(
//     async (id) => {
//       try {
//         // Use the correct API endpoint URL
//         const url = `/party/delete/${id}`;

//         // Use the DELETE HTTP method
//         const httpMethod = 'DELETE';
//         // Use the DELETE HTTP method
//         const headers = {
//           method: httpMethod,
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${user.accessToken}`,
//           },
//         }

//         const response = await deleter(url, headers);

//         if (response.success === true) {
//           // Handle success
//           enqueueSnackbar('Delete success!', { variant: 'success' });
//           // Update table data after successful deletion
//           const updatedTableData = tableData.filter((row) => row.id !== id);
//           setTableData(updatedTableData);
//         } else {
//           // Handle error
//           enqueueSnackbar(response.message, { variant: 'error' });
//         }

//         console.info('API Response:', response);
//       } catch (error) {
//         console.error('API Error:', error);
//         enqueueSnackbar('Failed to delete row', { variant: 'error' });
//       }
//     },
//     [enqueueSnackbar, tableData, user.accessToken]
//   );

//   const handleDeleteRows = useCallback(async () => {
//     try {
//       // Create an array of ids to be deleted
//       const idsToDelete = tableData
//         .filter((row) => selectedRowIds.includes(row.id))
//         .map((row) => row.id);

//       const apiUrl = `/party/delete`;

//       const httpMethod = 'DELETE';

//       const headers = {
//         method: httpMethod,
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       }

//       // Make the API request for each id
//       await Promise.all(
//         idsToDelete.map(async (id) => {
//           const url = `${apiUrl}/${id}`
//           const response = await deleter(url, headers);

//           if (response.success !== true) {
//             throw new Error(response.message);
//           }

//           console.info('API Response:', response);
//         })
//       );

//       // Filter out deleted rows from tableData
//       const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
//       setTableData(updatedTableData);

//       enqueueSnackbar('Delete success!', { variant: 'success' });
//     } catch (error) {
//       console.error('API Error:', error);
//       enqueueSnackbar('Failed to delete row', { variant: 'error' });
//     }
//   }, [enqueueSnackbar, selectedRowIds, tableData]);

//   const handleEditRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.party.edit(id));
//     },
//     [router]
//   );

//   const handleViewRow = useCallback(
//     (id) => {
//       router.push(paths.dashboard.party.details(id));
//     },
//     [router]
//   );

//   const columns = [
//     {
//       field: 'category',
//       headerName: 'Category',
//       filterable: false,
//     },
//     {
//       field: 'partyName',
//       headerName: 'Party Name',
//       flex: 1,
//       minWidth: 180,
//       hideable: false,
//       renderCell: (params) => <RenderCellPartyName params={params} />,
//     },
//     {
//       field: 'partyLeader',
//       headerName: 'Party Leader',
//       flex: 1,
//       minWidth: 180,
//       renderCell: (params) => <RenderCellPartyLeader params={params} />,
//     },
//     {
//       field: 'partySymbol',
//       headerName: 'Symbol',
//       flex: 1,
//       minWidth: 180,
//       type: 'singleSelect',
//       renderCell: (params) => <RenderCellPartySymbol params={params} />,
//     },
//     {
//       field: 'partyFoundationYear',
//       headerName: 'Foundation Year',
//       type: 'singleSelect',
//       flex: 1,
//       minWidth: 180,
//       editable: true,
//       renderCell: (params) => <RenderCellFoundationYear params={params} />,
//     },
//     {
//       type: 'actions',
//       field: 'actions',
//       headerName: ' ',
//       align: 'right',
//       headerAlign: 'right',
//       minWidth: 80,
//       sortable: false,
//       filterable: false,
//       disableColumnMenu: true,
//       getActions: (params) => [
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:eye-bold" />}
//           label="View"
//           onClick={() => handleViewRow(params.row.id)}
//         />,
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:pen-bold" />}
//           label="Edit"
//           onClick={() => handleEditRow(params.row.id)}
//         />,
//         <GridActionsCellItem
//           showInMenu
//           icon={<Iconify icon="solar:trash-bin-trash-bold" />}
//           label="Delete"
//           onClick={() => {
//             handleDeleteRow(params.row.id);
//           }}
//           sx={{ color: 'error.main' }}
//         />,
//       ],
//     },
//   ];

//   const getTogglableColumns = () =>
//     columns
//       .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
//       .map((column) => column.field);

//   return (
//     <>
//       <Container
//         maxWidth={settings.themeStretch ? false : 'lg'}
//         sx={{
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//         }}
//       >

//         <Button
//           component={RouterLink}
//           to="/dashboard"
//           variant="outlined"
//           color="primary"
//           style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
//         >
//           Back
//         </Button>

//         <CustomBreadcrumbs
//           heading="PARTY LIST"
//           links={[
//             {
//               name: 'Party',
//               href: paths.dashboard.party.root,
//             },
//             { name: 'List' },
//           ]}
//           action={
//             <Button
//               component={RouterLink}
//               href={paths.dashboard.party.new}
//               variant="contained"
//               startIcon={<Iconify icon="mingcute:add-line" />}
//             >
//               New Party
//             </Button>
//           }
//           sx={{
//             mb: {
//               xs: 3,
//               md: 5,
//             },
//             mt:3
//           }}
//         />

//         {/* analytic start here */}
//         <Card
//           sx={{
//             mb: { xs: 3, md: 5 },
//           }}
//         >
//           <Scrollbar>
//             <Stack
//               direction="row"
//               divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
//               sx={{ py: 2 }}
//             >
//               <PartyManagementAnalytics
//                 title="Total Parties"
//                 total={tableData.length}
//                 icon="solar:bill-list-bold-duotone"
//                 color={theme.palette.info.main}
//               />

//               <PartyManagementAnalytics
//                 title="Total Candidate"
//                 total={tableData.length}
//                 percent={100}
//                 icon="solar:file-check-bold-duotone"
//                 color={theme.palette.success.main}
//               />

//               <PartyManagementAnalytics
//                 title="Male Candidate"
//                 total={tableData.length}
//                 percent={100}
//                 // price={100}
//                 icon="solar:sort-by-time-bold-duotone"
//                 color={theme.palette.warning.main}
//               />
//               <PartyManagementAnalytics
//                 title="Legal Case Candidate"
//                 total={tableData.length}
//                 percent={100}
//                 // price={100}
//                 icon="solar:file-corrupted-bold-duotone"
//                 color={theme.palette.text.secondary}
//               />
//             </Stack>
//           </Scrollbar>
//         </Card>

//         {/* analytic ends here */}

//         <Card
//         // sx={{
//         //   height: { xs: 800, md: 2 },
//         //   flexGrow: { md: 1 },
//         //   display: { md: 'flex' },
//         //   flexDirection: { md: 'column' },
//         // }}
//         >
//           <DataGrid
//             checkboxSelection
//             disableRowSelectionOnClick
//             rows={dataFiltered}
//             columns={columns}
//             loading={partiesLoading}
//             getRowHeight={() => 'auto'}
//             pageSizeOptions={[5, 10, 25]}
//             initialState={{
//               pagination: {
//                 paginationModel: { pageSize: 10 },
//               },
//             }}
//             onRowSelectionModelChange={(newSelectionModel) => {
//               setSelectedRowIds(newSelectionModel);
//             }}
//             columnVisibilityModel={columnVisibilityModel}
//             onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
//             slots={{
//               toolbar: () => (
//                 <>
//                   <GridToolbarContainer>

//                     <GridToolbarQuickFilter
//                       sx={{
//                         '& .MuiInputBase-input::placeholder': {
//                           color: 'black',
//                         },
//                       }}
//                     />

//                     <Stack
//                       spacing={1}
//                       flexGrow={1}
//                       direction="row"
//                       alignItems="center"
//                       justifyContent="flex-end"
//                     >
//                       {!!selectedRowIds.length && (
//                         <Button
//                           size="small"
//                           color="error"
//                           startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
//                           onClick={confirmRows.onTrue}
//                         >
//                           Delete ({selectedRowIds.length})
//                         </Button>
//                       )}

//                       <GridToolbarColumnsButton />
//                       <GridToolbarFilterButton />
//                       <GridToolbarExport />
//                     </Stack>
//                   </GridToolbarContainer>

//                   {canReset && (
//                     <PartyTableFiltersResult
//                       filters={filters}
//                       onFilters={handleFilters}
//                       onResetFilters={handleResetFilters}
//                       results={dataFiltered.length}
//                       sx={{ p: 2.5, pt: 0 }}
//                     />
//                   )}
//                 </>
//               ),
//               noRowsOverlay: () => <EmptyContent title="No Data" />,
//               noResultsOverlay: () => <EmptyContent title="No results found" />,
//             }}
//             slotProps={{
//               columnsPanel: {
//                 getTogglableColumns,
//               },
//             }}
//           />
//         </Card>
//       </Container>

//       <ConfirmDialog
//         open={confirmRows.value}
//         onClose={confirmRows.onFalse}
//         title="Delete"
//         content={
//           <>
//             Are you sure want to delete <strong> {selectedRowIds.length} </strong> items?
//           </>
//         }
//         action={
//           <Button
//             variant="contained"
//             color="error"
//             onClick={() => {
//               handleDeleteRows();
//               confirmRows.onFalse();
//             }}
//           >
//             Delete
//           </Button>
//         }
//       />
//     </>
//   );
// }

// // ----------------------------------------------------------------------

// function applyFilter({ inputData, filters }) {
//   const { stock, publish } = filters;

//   if (stock.length) {
//     inputData = inputData.filter((product) => stock.includes(product.inventoryType));
//   }

//   if (publish.length) {
//     inputData = inputData.filter((product) => publish.includes(product.publish));
//   }

//   return inputData;
// }
