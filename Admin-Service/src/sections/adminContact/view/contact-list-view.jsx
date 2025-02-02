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

import { useGetContacts } from 'src/api/contact';
import { ATTPL_EMS_HOST_API } from 'src/config-global';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import ContactTableFiltersResult from '../contact-table-filters-result';
import {
  RenderCellName,
  RenderCellEmail,
  RenderCellNumber,
  RenderCellStatus,
  RenderCellEmailVerified,
  RenderCellNumberVerified,
} from '../contact-table-row';

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

export default function ContactListView() {
  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const { contacts, contactsLoading } = useGetContacts();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (contacts && contacts.data) {
      const updatedTableData = contacts.data.map((contact) => ({
        ...contact,
        id: contact.contactId,
      }));
      setTableData(updatedTableData);
    }
  }, [contacts]);

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

  // const handleDeleteRow = useCallback(
  //   async (id) => {
  //     try {
  //       // Use the correct API endpoint URL
  //       const apiUrl = `${ATTPL_EMS_HOST_API}/contact/delete/${id}`;

  //       // Use the DELETE HTTP method
  //       const httpMethod = 'DELETE';

  //       // Make the API request
  //       const response = await fetch(apiUrl, {
  //         method: httpMethod,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       });

  //       // Parse the response JSON
  //       const responseData = await response.json();

  //       if (response.ok) {
  //         enqueueSnackbar('Delete success!', { variant: 'success' });
  //         const updatedTableData = tableData.filter((row) => row.id !== id);
  //         setTableData(updatedTableData);
  //       } else {
  //         enqueueSnackbar(responseData.message, { variant: 'error' });
  //       }

  //       console.info('API Response:', responseData);
  //     } catch (error) {
  //       console.error('API Error:', error);
  //       enqueueSnackbar('Failed to delete row', { variant: 'error' });
  //     }
  //   },
  //   [enqueueSnackbar, tableData]
  // );

  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = `${ATTPL_EMS_HOST_API}/contact/delete`;

      const httpMethod = 'DELETE';

      await Promise.all(
        idsToDelete.map(async (id) => {
          const response = await fetch(`${apiUrl}/${id}`, {
            method: httpMethod,
            headers: {
              'Content-Type': 'application/json',
            },
          });

          const responseData = await response.json();

          if (!response.ok) {
            throw new Error(responseData.message);
          }

          console.info('API Response:', responseData);
        })
      );

      const updatedTableData = tableData.filter((row) => !idsToDelete.includes(row.id));
      setTableData(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.contact.details(id));
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
      field: 'name',
      headerName: 'Name',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderCellName params={params} />,
    },

    {
      field: 'email',
      headerName: 'Email Id',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellEmail params={params} />,
    },
    {
      field: 'emailVerified',
      headerName: 'Verified Email',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellEmailVerified params={params} />,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile No.',
      flex: 1,
      width: 60,
      renderCell: (params) => <RenderCellNumber params={params} />,
    },
    {
      field: 'mobileNumberVerified',
      headerName: 'Verified Mobile No.',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellNumberVerified params={params} />,
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 110,
      type: 'singleSelect',
      editable: true,
      renderCell: (params) => <RenderCellStatus params={params} />,
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
          key={`more-details-${params.row.id}`}
          showInMenu
          icon={<Iconify icon="solar:eye-bold" />}
          label="More Details"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          key={`edit-${params.row.id}`}
          showInMenu
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
      ],
    },
  ];
  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.contact.edit(id));
    },
    [router]
  );
  // console.log(params)
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
          heading="CONTACT LIST"
          links={[
            {
              name: 'Contact',
              href: paths.dashboard.contact.root,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard?.contact.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Contact
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />
        {/* <CustomBreadcrumbs
          heading="BOOTH LIST"
          links={[
            {
              name: 'Booth Management',
              href: paths.dashboard.boothmanagement,
            },
            { name: 'List' },
          ]}
          action={
            <Button
              component={RouterLink}
              href={paths.dashboard.boothmanagement.new}
              variant="contained"
              startIcon={<Iconify icon="mingcute:add-line" />}
            >
              New Booth
            </Button>
          }
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
            mt:3
          }}
        /> */}

        {/* added component starts */}
        {/* <Card
          sx={{
            mb: { xs: 3, md: 5 }, mt:3
          }}
        >
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <ContactAnalytics
                title="Total Contact"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />

              <ContactAnalytics
                title="Total Contacts"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />

              <ContactAnalytics
                title="Male Candidate"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />

              <ContactAnalytics
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
        {/* added component endss */}

        <Card
          sx={{
            height: { xs: 800, md: 700 },
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
            loading={contactsLoading}
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
                    <ContactTableFiltersResult
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
