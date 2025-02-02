/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import isEqual from 'lodash/isEqual';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';
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
  useGetDoctorRequestList,
  SendVerificationTokenRequest,
  updateUserRoleAfterVerification,
} from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useSettingsContext } from 'src/components/settings';

import RequestTableFiltersResult from './request-table-filters-result';
import {
  RenderCellDoctorName,
  RenderCellHospitalName,
  RenderCellLicenseNumber,
  RenderCellDoctorDetailsId,
  RenderCellVerificationButton,
  RenderCellAcceptRequestButton,
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

export default function DoctorRequestListView({ currentTab }) {
  const { user } = useAuthContext();

  const theme = useTheme();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  // ----------Doctor details-----------
  const { users: doctorListData, usersLoading: doctorusersLoading } = useGetDoctorRequestList(
    user.accessToken
  );
  // const { users: employerListData, usersLoading:employerusersLoading } = useGetEmployerRequestList(user.accessToken);

  const customRoleType = useMemo(
    () => (doctorListData && doctorListData.data ? doctorListData.data.filter((role) => true) : []),
    [doctorListData]
  );
  const [dataFiltered, setDataFiltered] = useState([]);
  useEffect(() => {
    if (customRoleType) {
      const updatedTableData = customRoleType.map((userItem) => ({
        ...userItem,
        id: userItem.doctorDetailsId,
      }));
      setDataFiltered(updatedTableData);
    }
  }, [customRoleType, doctorListData]);

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

  const handleVerifyDoctorDetails = useCallback(
    async (licenseNo) => {
      try {
        const filteredDoctors = dataFiltered.filter((doctor) => doctor.licenseNumber === licenseNo);
        const DataToSend = {
          doctorName: filteredDoctors[0]?.doctorName,
          phoneNumber: filteredDoctors[0]?.phoneNumber,
          hospitalName: filteredDoctors[0]?.hospitalName,
          hospitalPhoneNumber: filteredDoctors[0]?.hospitalPhoneNumber,
          hospitalAddress: filteredDoctors[0]?.hospitalAddress,
          experienceLevel: filteredDoctors[0]?.experienceLevel,
          specialization: filteredDoctors[0]?.specialization,
          workEmailId: filteredDoctors[0]?.workEmailId,
          licenseNumber: filteredDoctors[0]?.licenseNumber,
          licenseImageUrl: filteredDoctors[0]?.licenseImageUrl?.front?.preview,
          degreeCertificate: filteredDoctors[0]?.degreeCertificate?.front?.preview,
        };
        // console.log(filteredDoctors[0]?.licenseNumber)
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

  const handleAcceptDoctorDetails = useCallback(
    async (userId, licenseNo, Token) => {
      try {
        const DataToSend = {
          verificationToken: Token,
          licenseNumber: licenseNo,
        };
        const response = await SendAcceptRequest(DataToSend, user.accessToken, 'doctor');
        if (response.success) {
          const newData = {
            userRoleId: 34,
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

  const handleDoctorRejectRequest = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const apiUrl = `${endpoints.requestLicenseAcceptance.DoctorRejectRequest}/${id}`;

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
  const handleDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const apiUrl = `${endpoints.requestLicenseAcceptance.DoctorRowDelete}/${id}`;

        // Use the DELETE HTTP method
        const httpMethod = 'DELETE';

        const headers = {
          method: httpMethod,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        };

        // Make the API request
        const response = await deleter(apiUrl, headers);
        // Parse the response JSON

        if (response.success === true) {
          // Handle success
          enqueueSnackbar('Delete success!', { variant: 'success' });

          const updatedTableData = dataFiltered.filter((row) => row.doctorDetailsId !== id);

          setDataFiltered(updatedTableData);
        } else {
          enqueueSnackbar(response.message, { variant: 'error' });
        }
      } catch (error) {
        console.error('API Error:', error);
        enqueueSnackbar('Failed to delete row', { variant: 'error' });
      }
    },
    [dataFiltered, enqueueSnackbar, user.accessToken]
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

  const handleEditRow = useCallback(
    (id) => {
      router.push(paths.dashboard.request_license_acceptence.edit(id));
    },
    [router]
  );
  const handleViewRow = useCallback(
    (id) => {
      router.push(paths.dashboard.request_license_acceptence.doctor_details(id));
    },
    [router]
  );

  const columns = [
    {
      field: 'userRoleId',
      headerName: 'Doctor Id',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellDoctorDetailsId params={params} />,
    },
    {
      field: 'doctorName',
      headerName: 'Doctor Name',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellDoctorName params={params} />,
    },
    {
      field: 'hospitalName',
      headerName: 'Hospital Name',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellHospitalName params={params} />,
    },
    {
      field: 'licenseNumber',
      headerName: 'License Number',
      flex: 1,
      width: 500,
      renderCell: (params) => <RenderCellLicenseNumber params={params} />,
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
          handleVerifyDoctorDetails={handleVerifyDoctorDetails}
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
          handleAcceptDoctorDetails={handleAcceptDoctorDetails}
          handleDeleteRow={handleDeleteRow}
          handleDoctorRejectRequest={handleDoctorRejectRequest}
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
          onClick={() => handleViewRow(params.row.doctorDetailsId)}
        />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:pen-bold" />}
        //   label="Edit Role"
        //   onClick={() => handleEditRow(params.row.doctorDetailsId)}
        // />,
        // <GridActionsCellItem
        //   showInMenu
        //   icon={<Iconify icon="solar:trash-bin-trash-bold" />}
        //   label="Delete User"
        //   onClick={() => {
        //     handleDeleteRow(params.row.id);
        //   }}
        //   sx={{ color: 'error.main' }}
        // />,
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
            loading={doctorusersLoading}
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

DoctorRequestListView.propTypes = {
  currentTab: PropTypes.string,
};

// ----------------------------------------------------------------------
