import isEqual from 'lodash/isEqual';
import React, { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import {
  DataGrid,
  GridActionsCellItem,
  GridToolbarContainer,
  GridToolbarQuickFilter,
} from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
// import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

// import { useBoolean } from 'src/hooks/use-boolean';

// import { deleter } from 'src/utils/axios-cms';

// import { useAuthContext } from 'src/auth/hooks';

import { useRouter } from 'src/routes/hooks';

// import { useGetStatus, UpdateStatusCount, useGetSuggestions } from 'src/api/suggestion';

import { useGetAllProblems } from 'src/api/govtServiceRoadmap';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
// import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
// import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { useAuthContext } from 'src/auth/hooks';

import GovtServiceAnalytic from '../govt-service-analytic';
import GovtServiceFiltersResult from '../govt-service-filters-result';
import {
  RenderName,
  RenderEmail,
  RenderAddress,
  RenderDepartment,
  RenderMobileNumber,
  RenderProblemTitle,
  RenderProblemDescription,
} from '../govt-service-table-row';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function GovtServiceRoadmapList() {
  const theme = useTheme();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const [tableData, setTableData] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  const { user } = useAuthContext()
  const { govtservices, govtservicesLoading } = useGetAllProblems();
      console.log('------>', govtservices)

  const govtserviceListArr = useMemo(
    () => govtservices?.data?.filter((voter) => true),
    [govtservices]
  );

  useEffect(() => {
    if (govtserviceListArr) {
      const updatedTableData = govtserviceListArr.map((item) => ({
        ...item,
        id: item.voterProblemId, // Assign voterProblemId as the id property
      }));
      setTableData(updatedTableData);
    }
  }, [govtservices, filters, govtserviceListArr]);

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
      renderCell: (params) => <RenderName params={params} />,
    },
    {
      field: 'problemTitle',
      headerName: 'Problem Title',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderProblemTitle params={params} />,
    },
    {
      field: 'problemDescription',
      headerName: 'Problem Description',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderProblemDescription params={params} />,
    },

    {
      field: 'department',
      headerName: 'Department',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderDepartment params={params} />,
    },

    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderMobileNumber params={params} />,
    },
    {
      field: 'email',
      headerName: 'email',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderEmail params={params} />,
    },
    {
      field: 'address',
      headerName: 'Address',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderAddress params={params} />,
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
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        //   label="Delete Suggestion"
        //   onClick={() => {
        //     handleDeleteRow(params.row.id);
        //   }}
        //   sx={{ color: 'error.main' }}
        // />,
      ],
    },
  ];

  const canReset = !isEqual(defaultFilters, filters);
  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });

  const router = useRouter();

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.GovtService.details(id));
    },
    [router]
  );

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (
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
        heading="DESIRE DETAILS"
        links={[
          {
            // name: 'COMPLAINT',
            href: paths.dashboard.GovtService.root,
          },
          // { name: 'LIST' },
        ]}
        action={
         user?.userRoleId === 9 && <Button
            component={RouterLink}
            href={paths.dashboard.GovtService.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            Create Your Desire
          </Button>
        }
        sx={{
          mb: {
            xs: 3,
            md: 5,
          },
          mt: 2,
        }}
      />
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
            <GovtServiceAnalytic
              title="Total Desire"
              total={tableData.length}
              icon="solar:bill-list-bold-duotone"
              color={theme.palette.info.main}
            />

            <GovtServiceAnalytic
              title="Total Unread  Desire"
              total={tableData.length}
              percent={100}
              // price={100}
              icon="mdi:eye-off"
              color={theme.palette.warning.main}
            />
            <GovtServiceAnalytic
              title="Total Read  Desire"
              total={tableData.length}
              percent={100}
              // price={100}
              icon="mdi:eye"
              color={theme.palette.success.main}
            />
          </Stack>
        </Scrollbar>
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
          loading={govtservicesLoading}
          getRowHeight={() => 'auto'}
          pageSizeOptions={[5, 10, 25]}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 },
            },
          }}
          // onRowSelectionModelChange={(newSelectionModel) => {
          //   setSelectedRowIds(newSelectionModel);
          // }}
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
                  <GovtServiceFiltersResult
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
  );
}

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
