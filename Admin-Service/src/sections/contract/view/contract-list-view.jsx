/* eslint-disable no-unused-vars */
import isEqual from 'lodash/isEqual';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // chetan

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
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

import { deleter } from 'src/utils/axios-lms';

import { useAuthContext } from 'src/auth/hooks';
import { useGetContracts } from 'src/api/contract';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import DriverAnalytic from '../contract-analytic';
import {
  RenderCellStock,
  RenderCellPublish,
  RenderCellProduct,
  RenderCellCreatedAt,
} from '../contract-table-row';

// ----------------------------------------------------------------------

const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

// ----------------------------------------------------------------------

export default function ContractListView() {
  const theme = useTheme();
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const { services, servicesLoading } = useGetContracts();
  const [tableData, setTableData] = useState([]);
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState({ category: false });
  

  useEffect(() => {
    if (services && services.data) {
      const updatedTableData = services.data.map((service) => ({
        ...service,
        id: service.contractId,
      }));
      setTableData(updatedTableData);
    }
  }, [services]);

  useEffect(() => {
    // Function to fetch case names
    const fetchCaseDetails = async () => {
      try {
        const names = await Promise.all(
          tableData.map(async (row) => {
            if (row.caseId) {
              const response = await axios.get(`/api/v1/contractDetails/fetchAll/${row.caseId}`);
              return { caseId: row.caseId, caseDetails: response.data.caseDetails };
            }
            return { caseId: row.caseId, caseDetails: 'Unknown Case Name' };
          })
        );
       
      } catch (error) {
        enqueueSnackbar('Failed to fetch case names', { variant: 'error' });
      }
    };

    fetchCaseDetails();
  }, [tableData, enqueueSnackbar]);
   
  
  
  const dataFiltered = applyFilter({ inputData: tableData, filters });
  // console.log("contracts data",dataFiltered); 
  const canReset = !isEqual(defaultFilters, filters);

  const handleFilters = useCallback((name, value) => {
    setFilters((prevState) => ({ ...prevState, [name]: value }));
  }, []);

  const handleResetFilters = useCallback(() => {
    setFilters(defaultFilters);
  }, []);

  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        const apiUrl = `/contractDetails/delete/${id}`;
        const headers = {
          method: 'DELETE',
          headers: {
            Authorization: localStorage.getItem('accessToken'),
            'Content-Type': 'application/json',
          },
        };
        const response = await deleter(apiUrl, headers);
        if (response.success === true) {
          enqueueSnackbar('Delete success!', { variant: 'success' });
          setTableData(tableData.filter((row) => row.id !== id));
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [enqueueSnackbar, tableData]
  );

  const handleDeleteRows = useCallback(async () => {
    try {
      const idsToDelete = tableData
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);
      const apiUrl = `/contractDetails/delete`;
      const headers = {
        method: 'DELETE',
        headers: {
          Authorization: localStorage.getItem('accessToken'),
          'Content-Type': 'application/json',
        },
      };
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, headers);
          if (response.success !== true) throw new Error(response.message);
        })
      );
      setTableData(tableData.filter((row) => !idsToDelete.includes(row.id)));
      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      enqueueSnackbar('Failed to delete rows', { variant: 'error' });
    }
  }, [enqueueSnackbar, selectedRowIds, tableData]);

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.LMS_contract.edit(id));
    },
    [router]
  );

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.LMS_contract.details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'caseDetails',
      headerName: 'Case Details',
      width: 200, // Adjust width as needed
      renderCell: (params) => <div>{params.row?.caseDetail?.caseDetails}</div>,
    },
    
    {
      field: 'category',
      headerName: 'Category',
      filterable: false,
      renderCell: (params) => (
        <div style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}>
          {params.value}
        </div>
      ),
    },
    {
      field: 'status',
      headerName: 'Status',
      width: 160,
      renderCell: (params) => <RenderCellCreatedAt params={params} />,
    },
    {
      field: 'paymentAmount',
      headerName: 'Payment Amount',
      flex: 1,
      minWidth: 160,
      hideable: false,
      renderCell: (params) => <RenderCellProduct params={params} />,
    },
    {
      field: 'contractType',
      headerName: 'Contract Type',
      width: 160,
      renderCell: (params) => <RenderCellPublish params={params} />,
    },
    {
      field: 'contractDescription',
      headerName: 'Contract Description',
      width: 460,
      type: 'singleSelect',
      renderCell: (params) => <RenderCellStock params={params} />,
    },
    {
      type: 'actions',
      field: 'actions',
      headerName: 'Actions',
      align: 'right',
      headerAlign: 'right',
      width: 100,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      getActions: (params) => [
        <GridActionsCellItem
          key="view"
          icon={<Iconify icon="solar:eye-bold" />}
          label="View"
          onClick={() => handleViewRow(params.row.id)}
        />,
        <GridActionsCellItem
          key="edit"
          icon={<Iconify icon="solar:pen-bold" />}
          label="Edit"
          onClick={() => handleEditRow(params.row.id)}
        />,
        <GridActionsCellItem
          key="delete"
          icon={<Iconify icon="solar:trash-bin-trash-bold" />}
          label="Delete"
          onClick={() => handleDeleteRow(params.row.id)}
          sx={{ color: 'error.main' }}
        />,
      ],
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  return (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CustomBreadcrumbs
          heading="CONTRACT LIST"
          links={[{ name: 'Contract', href: paths.dashboard.LMS_contract.root }, { name: 'List' }]}
          sx={{ mb: { xs: 3, md: 5 } }}
        />
        <Card sx={{ mb: { xs: 3, md: 5 }, boxShadow: 3 }}>
          <Scrollbar>
            <Stack
              direction="row"
              divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
              sx={{ py: 2 }}
            >
              <DriverAnalytic
                title="Total Contracts"
                total={tableData.length}
                icon="solar:bill-list-bold-duotone"
                color={theme.palette.info.main}
              />
              <DriverAnalytic
                title="Active Contracts"
                total={tableData.length}
                percent={100}
                icon="solar:file-check-bold-duotone"
                color={theme.palette.success.main}
              />
              <DriverAnalytic
                title="Closed Contracts"
                total={tableData.length}
                percent={100}
                icon="solar:sort-by-time-bold-duotone"
                color={theme.palette.warning.main}
              />
              <DriverAnalytic
                title="Pending Contracts"
                total={tableData.length}
                percent={100}
                icon="solar:file-corrupted-bold-duotone"
                color={theme.palette.text.secondary}
              />
            </Stack>
          </Scrollbar>
        </Card>
        <Card sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', boxShadow: 3 }}>
          <DataGrid
            checkboxSelection
            disableRowSelectionOnClick
            rows={dataFiltered}
            columns={columns}
            loading={servicesLoading}
            getRowHeight={() => 'auto'}
            pageSizeOptions={[5, 10, 25]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
            }}
            onRowSelectionModelChange={(newSelectionModel) => setSelectedRowIds(newSelectionModel)}
            columnVisibilityModel={columnVisibilityModel}
            onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
            components={{
              Toolbar: () => (
                <GridToolbarContainer>
                  <GridToolbarQuickFilter
                    sx={{
                      '& .MuiInputBase-input::placeholder': { color: theme.palette.text.primary },
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
              ),
              NoRowsOverlay: () => <EmptyContent title="No Data" />,
              NoResultsOverlay: () => <EmptyContent title="No results found" />,
            }}
            componentsProps={{
              columnsPanel: { getTogglableColumns },
            }}
          />
        </Card>
      </Container>
      <ConfirmDialog
        open={confirmRows.value}
        onClose={confirmRows.onFalse}
        title="Delete"
        content={`Are you sure you want to delete ${selectedRowIds.length} item(s)?`}
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
