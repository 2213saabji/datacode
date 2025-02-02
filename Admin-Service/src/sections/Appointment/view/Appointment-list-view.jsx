import isEqual from 'lodash/isEqual';
import { useLocation } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { Divider, useTheme } from '@mui/material';
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

import { useAuthContext } from 'src/auth/hooks';
import {
  useGetAppointments,
} from 'src/api/appointment';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import AppointmentTableFiltersResult from '../Appointment-table-filters-result';
import AppointmentManagementAnalytics from '../Appointment_management-analytics';
import {
  RenderCellFoundationYear,
  RenderCellFoundationDate,
  RenderCellAppointmentName,
  RenderCellAppointmentLeader
} from '../Appointment-table-row';

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

export default function AppointmentListView() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const status = searchParams.get('status');

  const { enqueueSnackbar } = useSnackbar();

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const confirmRows = useBoolean();

  const router = useRouter();
  const settings = useSettingsContext();
  const theme = useTheme();

  const { user } = useAuthContext();

  const { appointments, appointmentsLoading } = useGetAppointments();


  const sortedData = appointments?.data?.sort((a, b) => {

    const dateA = new Date(a?.created_at);
    const dateB = new Date(b?.created_at);


    return dateB - dateA;
  });


  // this code need to be edited from admin to Candidate 6/7/2024
  const p = user.userRoleType === 'Admin';

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {

    if (sortedData) {
      if (user.userRoleType === 'Voter') {
        const filteredAppointments = sortedData?.filter(
          (appointmen) => appointmen.voterId === user.userId
        );

        const filter = filteredAppointments.filter((i) => i.appointmentStatus === status);
        setTableData(filter);
        // in else if block need to edit the code from Admin to Candidate 6/7/2024
      } else if (user.userRoleType === 'Admin') {
        const filteredAppointments = sortedData?.filter(
          (appointmen) => appointmen.candidateId === user.userId
        );
        setTableData(filteredAppointments);
      } else if (user.userRoleType === 'Candidate') {
        const filteredAppointments = sortedData?.filter(
          (appointmen) => appointmen.candidateId === user.userId
        );
        setTableData(filteredAppointments);
      }
    }
  }, [sortedData, user.userId, user.userRoleType, status]);

  const open = tableData.filter((i) => i.appointmentStatus === 'open');
  const inProgress = tableData.filter((i) => i.appointmentStatus === 'in-progres');
  const close = tableData.filter((i) => i.appointmentStatus === 'closed');

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

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.Appointment.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.Appointment.details(id));
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
      headerName: 'Email',
      flex: 1,
      width: 80,
      hideable: false,
      renderCell: (params) => <RenderCellAppointmentName params={params} />,
    },
    {
      field: 'problemDescription',
      headerName: 'Number',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellAppointmentLeader params={params} />,
    },
    {
      field: 'appointment_status',
      headerName: 'problem Status',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellFoundationYear params={params} />,
    },
    {
      field: 'created_at',
      headerName: 'CREATED DATE',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderCellFoundationDate params={params} />,
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
        const actions = [
          <GridActionsCellItem
            showInMenu
            icon={<Iconify icon="solar:eye-bold" />}
            label="View"
            onClick={() => handleViewRow(params.row.appointmentId)}
          />,
        ];

        if (p) {
          actions.push(
            <GridActionsCellItem
              showInMenu
              icon={<Iconify icon="solar:pen-bold" />}
              label="Edit"
              onClick={() => handleEditRow(params.row.appointmentId)}
            />
          );
        }
        return actions;
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

        {!p && (
          <Button
            component={RouterLink}
            to="/dashboard/Appointment/card"
            variant="outlined"
            color="primary"
            style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
          >
            Back
          </Button>
        )}

        <CustomBreadcrumbs
          heading="APPOINTMENT LIST"
          links={[
            {
              name: 'Appointments',
              href: paths.dashboard.root,
            },
            { name: 'Booking' },
          ]}
          sx={{
            mb: {
              xs: 3,
              md: 5,
            },
          }}
        />

        {p && (
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
                <AppointmentManagementAnalytics
                  title="Total Request "
                  total={tableData?.length}
                  icon="solar:bill-list-bold-duotone"
                  color={theme.palette.info.main}
                />

                <AppointmentManagementAnalytics
                  title="Total Open Request "
                  total={open?.length}
                  percent={100}
                  icon="solar:file-check-bold-duotone"
                  color={theme.palette.success.main}
                />

                <AppointmentManagementAnalytics
                  title="Total Pending Request "
                  total={inProgress?.length}
                  percent={100}
                  // price={100}
                  icon="solar:sort-by-time-bold-duotone"
                  color={theme.palette.warning.main}
                />
                <AppointmentManagementAnalytics
                  title="Total Close Request "
                  total={close?.length}
                  percent={100}
                  icon="solar:file-corrupted-bold-duotone"
                  color={theme.palette.text.secondary}
                />
              </Stack>
            </Scrollbar>
          </Card>
        )}

        <DataGrid
          checkboxSelection
          disableRowSelectionOnClick
          rows={dataFiltered}
          columns={columns}
          getRowId={(row) => row.appointmentId}
          loading={appointmentsLoading}
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
                  {/* {!p && (
                    <Button
                      component={RouterLink}
                      to="/dashboard/Appointment/card"
                      variant="outlined"
                      color="primary"
                      style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
                    >
                      Back
                    </Button>
                  )} */}
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
                  </Stack>
                </GridToolbarContainer>

                {canReset && (
                  <AppointmentTableFiltersResult
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
          // onClick={() => {
          //   handleDeleteRows();
          //   confirmRows.onFalse();
          // }}
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
