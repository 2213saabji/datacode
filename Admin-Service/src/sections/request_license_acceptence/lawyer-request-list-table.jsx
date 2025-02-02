import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

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
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';

import { puter, deleter, endpoints } from 'src/utils/axios-ums';

import { useAuthContext } from 'src/auth/hooks';
import {
  SendAcceptRequest,
  SendVerificationTokenRequest,
  updateUserRoleAfterVerification,
  useGetLawyerRequestList,
} from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';

import RequestTableFiltersResult from './request-table-filters-result';
import {
  RenderCellPhoneNumber,
  RenderCellVerificationButton,
  RenderCellAcceptRequestButton,
  RenderCellLawyerId,
  RenderCellLawyerName,
  RenderCellBarMembershipStatus,
  RenderCellLawyerCertificate,
} from './request-table-row';

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

export default function LawyerRequestListView({ currentTab }) {
  const { user } = useAuthContext();
  const { enqueueSnackbar } = useSnackbar();
  const confirmRows = useBoolean();
  const router = useRouter();
  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  // ----------Lawyer List details-----------
  const { users: lawyerListData, usersLoading: lawyerUsersLoading } = useGetLawyerRequestList(
    user.accessToken
  );

  const customRoleType = useMemo(
    () => (lawyerListData && lawyerListData.data ? lawyerListData.data.filter((role) => true) : []),
    [lawyerListData]
  );
  const [dataFiltered, setDataFiltered] = useState([]);

  useEffect(() => {
    if (customRoleType) {
      const updatedTableData = customRoleType.map((userItem) => ({
        ...userItem,
        id: userItem.lawyerId,
      }));
      setDataFiltered(updatedTableData);
    }
  }, [customRoleType, lawyerListData]);


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

  const handleVerifyLawyerDetails = useCallback(
    async (lawyerCertificate) => {
      try {
        const filteredlawyers = dataFiltered.filter(
          (lawyer) => lawyer?.lawyerCertificate === lawyerCertificate
        );
        const DataToSend = {
          lawyerName: filteredlawyers[0]?.lawyerName,
          barAssociationMembership: filteredlawyers[0]?.barAssociationMembership,
          phone: filteredlawyers[0]?.User?.phone,
          email: filteredlawyers[0]?.User?.email,
          lawyerCertificate: filteredlawyers[0]?.lawyerCertificate,
          lawyerCertificateImageUrl: filteredlawyers[0]?.lawyerCertificateImageUrl?.url,
          registrationDate: filteredlawyers[0]?.registrationDate,
          barMembershipStatus: filteredlawyers[0]?.barMembershipStatus,
          serviceDescription: filteredlawyers[0]?.serviceDescription,
        };
        const response = await SendVerificationTokenRequest(DataToSend, user.accessToken);
        if (response.success) {
          enqueueSnackbar(response.message, { variant: 'success' });
        }
      } catch (error) {
        console.error('API Error:Failed to Send Verification Request', error);
        enqueueSnackbar('Failed to Send Verification Request', { variant: 'error' });
      }
    },
    [dataFiltered, enqueueSnackbar, user.accessToken]
  );

  const handleAcceptLawyerDetails = useCallback(
    async (userId, lawyerCertificate, Token) => {
      try {
        const DataToSend = {
          verificationToken: Token,
          lawyerCertificate,
        };
        const response = await SendAcceptRequest(DataToSend, user.accessToken, 'lawyerDetails');
        if (response.success) {
          const newData = {
            userRoleId: 31,
          };

          const res = await updateUserRoleAfterVerification(userId, newData, user.accessToken);
          if (res) {
            enqueueSnackbar('UserRole Updated Successfully', { variant: 'success' });
          }
        }
      } catch (error) {
        console.error('API Error:Failed to Verification Request', error);
        enqueueSnackbar('Failed to Verification Request', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user.accessToken]
  );

  const handleRejectLawyerRequest = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const apiUrl = `${endpoints.requestLicenseAcceptance.LawyerRejectRequest}/${id}`;

        // Use the DELETE HTTP method

        const headers = {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        };
        const dataToSend = {
          approvalStatus: -1,
        };
        // Make the API request
        const response = await puter(apiUrl, dataToSend, headers);
        // Parse the response JSON

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Requeset Rejected success!', { variant: 'success' });
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed while Reject Request', { variant: 'error' });
      }
    },
    [enqueueSnackbar, user.accessToken]
  );

  // Delete rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = dataFiltered
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = endpoints.requestLicenseAcceptance.DoctorRowDelete;

      const httpMethod = 'DELETE';

      const headers = {
        method: httpMethod,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user.accessToken}`,
        },
      };
      // Make the API request for each id
      await Promise.all(
        idsToDelete.map(async (id) => {
          const url = `${apiUrl}/${id}`;
          const response = await deleter(url, headers);

          // Parse the response JSON

          if (response.success !== true) {
            throw new Error(response.message);
          }

          console.info('API Response:', response);
        })
      );

      // // Filter out deleted rows from tableData
      const updatedTableData = dataFiltered.filter((row) => !idsToDelete.includes(row.id));
      setDataFiltered(updatedTableData);

      enqueueSnackbar('Delete success!', { variant: 'success' });
    } catch (error) {
      console.error('API Error:', error);
      enqueueSnackbar('Failed to delete row', { variant: 'error' });
    }
  }, [dataFiltered, enqueueSnackbar, selectedRowIds, user.accessToken]);

  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.request_license_acceptence.lawyer_details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'lawyerId',
      headerName: 'Lawyer Id',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellLawyerId params={params} />,
    },
    {
      field: 'lawyerName',
      headerName: 'Lawyer Name',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellLawyerName params={params} />,
    },
    {
      field: 'barMembershipStatus',
      headerName: 'Bar Member Status',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellBarMembershipStatus params={params} />,
    },
    {
      field: 'contactNumber',
      headerName: 'Contact Number',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellPhoneNumber params={params} />,
    },
    {
      field: 'lawyerCertificate',
      headerName: 'Lawyer Certificate',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellLawyerCertificate params={params} />,
    },
    {
      field: 'verificationbutton',
      headerName: 'Verification Process',
      flex: 1,
      minWidth: 120,
      renderCell: (params) => (
        <RenderCellVerificationButton
          params={params}
          currentTab={currentTab}
          handleVerifyLawyerDetails={handleVerifyLawyerDetails}
        />
      ),
    },
    {
      field: 'acceptrequest',
      headerName: 'Accept Request',
      flex: 1,
      minWidth: 170,
      renderCell: (params) => (
        <RenderCellAcceptRequestButton
          params={params}
          currentTab={currentTab}
          handleAcceptLawyerDetails={handleAcceptLawyerDetails}
          handleRejectLawyerRequest={handleRejectLawyerRequest}
        />
      ),
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
          label="View Details"
          onClick={() => handleViewRow(params.row.lawyerId)}
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
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
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
            loading={lawyerUsersLoading}
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

                      {/* <GridToolbarColumnsButton /> */}
                      {/* <GridToolbarFilterButton /> */}
                      {/* <GridToolbarExport /> */}
                    </Stack>
                  </GridToolbarContainer>

                  {canReset && (
                    <RequestTableFiltersResult
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

LawyerRequestListView.propTypes = {
  currentTab: PropTypes.string,
};

// ----------------------------------------------------------------------
