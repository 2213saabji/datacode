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
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetStatus, UpdateStatusCount, useGetSuggestions } from 'src/api/suggestion';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import FeedbackAnalytic from '../feedback-analytic';
import FeedbackFiltersResult from '../feedback-filters-result';
import {
  RenderFullName,
  RenderMobileNumber,
  RenderUserRoleType,
  RenderFeedbackStatus,
  RenderFeedbackMessage,
} from '../feedback-table-row';

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

export default function FeebackFormListView() {
  const theme = useTheme();
  const router = useRouter();
  const settings = useSettingsContext();
  const { user: userData } = useAuthContext();

  const { suggestions, suggestionsLoading } = useGetSuggestions(userData.accessToken);

  const { suggestionstatus } = useGetStatus(userData.accessToken);

  // useGetSuggestions

  const suggestionsListArr = useMemo(
    () => suggestions?.data?.filter((user) => true),
    [suggestions]
  );

  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  // eslint-disable-next-line no-unused-vars
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (suggestionsListArr) {
      const updatedTableData = suggestionsListArr.map((item) => ({
        ...item,
        id: item.feedbackID, // Assign userProfileId as the id property
      }));
      setTableData(updatedTableData);
    }
  }, [suggestions, filters, suggestionsListArr]);

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

  const handleViewRow = useCallback(
    (id) => {
      UpdateStatusCount(id, { feedbackStatus: true });
      router.push(paths.dashboard.FeedbackPage.details(id));
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
      field: 'fullName',
      headerName: 'Full Name',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderFullName params={params} />,
    },
    {
      field: 'mobileNumber',
      headerName: 'Mobile Number',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderMobileNumber params={params} />,
    },
    {
      field: 'userRoleType',
      headerName: 'User Role Type',
      flex: 1,
      minWidth: 60,
      hideable: false,
      renderCell: (params) => <RenderUserRoleType params={params} />,
    },

    {
      field: 'suggestionDescription',
      headerName: 'Description',
      flex: 1,
      width: 80,
      renderCell: (params) => <RenderFeedbackMessage params={params} />,
    },
    {
      field: 'suggestionStatus',
      headerName: 'Suggestion Status',
      flex: 1,
      minWidth: 150,
      renderCell: (params) => <RenderFeedbackStatus params={params} />,
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
      ],
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
        heading="SUGGESTION BOX"
        links={[
          {
            name: 'Suggestion',
            href: paths.dashboard.FeedbackPage.root,
          },
          { name: 'List' },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.FeedbackPage.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Suggestion
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
          mb: { xs: 3, md: 5 },
        }}
      >
        <Scrollbar>
          <Stack
            direction="row"
            divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
            sx={{ py: 2 }}
          >
            <FeedbackAnalytic
              title="Total Suggestion"
              total={tableData.length}
              icon="solar:bill-list-bold-duotone"
              color={theme.palette.info.main}
            />

            <FeedbackAnalytic
              title="Total Unread Suggestion"
              total={suggestionstatus?.data?.unread}
              percent={100}
              // price={100}
              icon="mdi:eye-off"
              color={theme.palette.warning.main}
            />
            <FeedbackAnalytic
              title="Total Read Suggestion"
              total={suggestionstatus?.data?.read}
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
          loading={suggestionsLoading}
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
                  />
                </GridToolbarContainer>

                {canReset && (
                  <FeedbackFiltersResult
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
