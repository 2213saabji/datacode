/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import { DataGrid, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { useAuthContext } from 'src/auth/hooks';
import { useGetAllSurveyResponsenses } from 'src/api/survey';

import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import ElectionTableFiltersResult from '../election-table-filters-result';

import {
  RenderCellResponse,
  RenderCellSurveyId,
  RenderCellUserName,
  RenderCellSurveyQuestionId,
  RenderCellSurveyResponseId,
} from '../survey-table-row';
// import SurveyTableFiltersResult from '../survey-table-filters-result';

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function VoterResponseListView() {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { user } = useAuthContext();

  const { surveyResponse, surveyResponseLoading } = useGetAllSurveyResponsenses(
    user?.accessToken,
    user?.userId
  );

  // console.log('surveyResponse---->', surveyResponse)
  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();

  const [tableData, setTableData] = useState([]);

  const [filters, setFilters] = useState(defaultFilters);

  const [selectedRowIds, setSelectedRowIds] = useState([]);

  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  useEffect(() => {
    if (surveyResponse && surveyResponse?.data) {
      const updatedTableData = surveyResponse?.data.map((surveyVoterRes) => ({
        ...surveyVoterRes,
        id: surveyVoterRes.surveyId,
      }));
      // console.log('survey List View Data', updatedTableData);
      setTableData(updatedTableData);
    }
  }, [surveyResponse]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    filters,
  });
  const canReset = !isEqual(defaultFilters, filters);

  // const handleFilters = useCallback((name, value) => {
  //   setFilters((prevState) => ({
  //     ...prevState,
  //     [name]: value,
  //   }));
  // }, []);

  // const handleResetFilters = useCallback(() => {
  //   setFilters(defaultFilters);
  // }, []);

  // const handleEditRow = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.electionmanagement.edit(id));
  //   },
  //   [router]
  // );

  // const handleViewRow = useCallback(
  //   (id) => {
  //     router.push(paths.dashboard.electionmanagement.details(id));
  //   },
  //   [router]
  // );

  const columns = [
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
    },
    {
      field: 'username',
      headerName: 'USER NAME',
      flex: 1,
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellUserName params={params} />,
    },
    {
      field: 'surveyResponseId',
      headerName: 'SURVEY RESPONSE ID',
      flex: 1,
      minWidth: 160,
      hideable: false,
      renderCell: (params) => <RenderCellSurveyResponseId params={params} />,
    },
    {
      field: 'surveyId',
      headerName: 'SURVEY ID',
      flex: 1,
      width: 160,
      renderCell: (params) => <RenderCellSurveyId params={params} />,
    },
    {
      field: 'surveyQuestionId',
      headerName: 'SURVEY QUESTION ID',
      flex: 1,
      width: 160,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellSurveyQuestionId params={params} />,
    },
    {
      field: 'response',
      headerName: 'RESPONSE',
      flex: 1,
      width: 140,
      editable: true,
      renderCell: (params) => <RenderCellResponse params={params} />,
    },

    // {
    //   type: 'actions',
    //   field: 'actions',
    //   headerName: ' ',
    //   align: 'right',
    //   headerAlign: 'right',
    //   width: 80,
    //   sortable: false,
    //   filterable: false,
    //   disableColumnMenu: true,
    //   getActions: (params) => [
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:eye-bold" />}
    //       label="View"
    //       // onClick={() => handleViewRow(params.row.id)}
    //     />,
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:pen-bold" />}
    //       label="Edit"
    //       // onClick={() => handleEditRow(params.row.id)}
    //     />,
    //     <GridActionsCellItem
    //       showInMenu
    //       icon={<Iconify icon="solar:trash-bin-trash-bold" />}
    //       label="Delete"
    //       onClick={() => {
    //         // handleDeleteRow(params.row.id);
    //       }}
    //       sx={{ color: 'error.main' }}
    //     />,
    //   ],
    // },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

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
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 4 }}
      >
        Back
      </Button>

      <CustomBreadcrumbs
        heading="SURVEY RESPONSE LIST"
        links={[
          {
            name: 'Survey',
            href: paths.dashboard.survey.new,
          },
          { name: 'List' },
        ]}
        // action={
        //   <Button
        //     component={RouterLink}
        //     href={paths.dashboard.survey.responseList}
        //     variant="contained"
        //     startIcon={<Iconify icon="mingcute:add-line" />}
        //   >
        //     New voter Response
        //   </Button>
        // }
        sx={{
          mb: {
            xs: 3,
            md: 2,
          },
          mt: 2,
        }}
      />

      {/* added component starts */}
      <Card
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

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
          loading={surveyResponseLoading}
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
              <GridToolbarContainer>
                <GridToolbarQuickFilter
                  sx={{
                    '& .MuiInputBase-input::placeholder': {
                      color: 'black',
                    },
                  }}
                />

                {/* <Stack
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

                    </Stack> */}
              </GridToolbarContainer>
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
  const { stock, publish } = filters;

  if (stock.length) {
    inputData = inputData.filter((product) => stock.includes(product.inventoryType));
  }

  if (publish.length) {
    inputData = inputData.filter((product) => publish.includes(product.publish));
  }

  return inputData;
}
