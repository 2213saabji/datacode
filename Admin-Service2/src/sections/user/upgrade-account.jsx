import * as Yup from 'yup';
//----
import isEqual from 'lodash/isEqual';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import PropTypes from 'prop-types';

// --
import { useMemo, useState, useEffect, useCallback } from 'react';

import { Box } from '@mui/system';
import Card from '@mui/material/Card';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { DataGrid, GridToolbarContainer } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/use-boolean';

import { deleter, endpoints } from 'src/utils/axios-ums';

import { UserRoleGetter } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import { useGetProductRolesList } from 'src/api/product_roles';
import {
  SendAcceptRequest,
  SendVerificationTokenRequest,
  updateUserRoleAfterVerification,
  useGetServiceHistoryRequestList,
} from 'src/api/requestLicenseAcceptance';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import EmptyContent from 'src/components/empty-content';
import { useSettingsContext } from 'src/components/settings';
import { ConfirmDialog } from 'src/components/custom-dialog';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';

import DoctorLicenseForm from './doctor-license-form';
import SellerLicenseForm from './seller-license-form';
import DriverLicenseForm from './driver-license-form';
import EmployerLicenseForm from './employer-license-form';
import BusinessmanLicenseForm from './businessman-license-form';
import InstituteOwnerLicenseForm from './instituteOwner-license-form';
import RequestTableFiltersResult from './request-table-filters-result';
import {
  RenderCellServiceHistoryId,
  RenderCellServiceHistoryCreatedAt,
  RenderCellServiceHistoryFirstName,
  RenderCellServiceHistoryApprovalStatus,
} from './request-table-row';
import LawyerRegForm from './lawyer-registration-form';
import VendorRegForm from './LMS-Vendor-registration-form';
import ChartedAccountantLicenseForm from './charted-accountant-form';


const defaultFilters = {
  publish: [],
  stock: [],
};

const HIDE_COLUMNS = {
  category: false,
};

const HIDE_COLUMNS_TOGGLABLE = ['category', 'actions'];

export default function UpgradeAccountProfile({ handleChangeTab }) {
  //---------------------------------------------------------------------------------------------------------------------

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const confirmRows = useBoolean();

  const router = useRouter();

  const settings = useSettingsContext();
  const [filters, setFilters] = useState(defaultFilters);
  const [selectedRowIds, setSelectedRowIds] = useState([]);
  const [columnVisibilityModel, setColumnVisibilityModel] = useState(HIDE_COLUMNS);

  // ----------Service History details-----------
  const { users: ServiceHistoryListData, usersLoading: ServiceHistoryusersLoading } =
    useGetServiceHistoryRequestList(user.userId, user.accessToken);
  const [dataFiltered, setDataFiltered] = useState([]);
  useEffect(() => {
    if (ServiceHistoryListData && ServiceHistoryListData?.data) {
      const data = ServiceHistoryListData?.data;
      const updatedTableData = [];
      let count = 1;
      Object.entries(data).forEach(([key, value]) => {
        if (typeof value === 'object' && !Array.isArray(value) && key !== 'UserProfile') {
          // It's an object
          updatedTableData.push({ id: count, ...value });
          count += 1;
        } else if (Array.isArray(value) && key !== 'UserProfile') {
          // It's an array, check if it contains objects
          value.forEach((item) => {
            if (typeof item === 'object') {
              updatedTableData.push({ id: count, ...item });
              count += 1;
            }
          });
        }
      });
      setDataFiltered(updatedTableData);
    }
  }, [ServiceHistoryListData, filters]);

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
  const handleVerifyBusinessmanDetails = useCallback(
    async (licenseNo) => {
      try {
        const filteredDoctors = dataFiltered.filter(
          (employer) => employer.licenseNumber === licenseNo
        );
        const DataToSend = {
          businessmanName: filteredDoctors[0]?.businessmanName,
          phoneNumber: filteredDoctors[0]?.phoneNumber,
          emailId: filteredDoctors[0]?.emailId,
          businessName: filteredDoctors[0]?.businessName,
          businessAddress: filteredDoctors[0]?.businessAddress,

          businessPhoneNumber: filteredDoctors[0]?.businessPhoneNumber,
          licenseNumber: filteredDoctors[0]?.licenseNumber,
          licenseFrontImageUrl: filteredDoctors[0]?.licenseImageUrl?.front?.preview,
          licenseBackImageUrl: filteredDoctors[0]?.licenseImageUrl?.back?.preview,
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

  const handleAcceptBusinessmanDetails = useCallback(
    async (userId, licenseNo, Token) => {
      try {
        const DataToSend = {
          verificationToken: Token,
          licenseNumber: licenseNo,
        };
        const response = await SendAcceptRequest(DataToSend, user.accessToken, 'businessman');
        if (response.success) {
          const newData = {
            userRoleId: 42,
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

  const handleBusinessmanDeleteRow = useCallback(
    async (id) => {
      try {
        // Use the correct API endpoint URL
        const apiUrl = `${endpoints.requestLicenseAcceptance.BusinessmanRowDelete}/${id}`;

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
          const updatedTableData = dataFiltered.filter((row) => row.businessmanId !== id);
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
  // console.log(
  //   handleVerifyBusinessmanDetails,
  //   handleAcceptBusinessmanDetails,
  //   handleBusinessmanDeleteRow
  // );

  // Delete rows

  const handleDeleteRows = useCallback(async () => {
    try {
      // Create an array of ids to be deleted
      const idsToDelete = dataFiltered
        .filter((row) => selectedRowIds.includes(row.id))
        .map((row) => row.id);

      const apiUrl = endpoints.requestLicenseAcceptance.EmployerRowDelete;

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

      // Filter out deleted rows from tableData
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
      router.push(paths.dashboard.request_license_acceptence.employer_details(id));
    },
    [router]
  );

  // console.log(handleEditRow, handleViewRow);

  const columns = [
    {
      field: 'Id',
      headerName: 'Id',
      flex: 1,
      minWidth: 50,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => <RenderCellServiceHistoryId params={params} />,
    },
    {
      field: 'Name',
      headerName: 'Name',
      flex: 1,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => <RenderCellServiceHistoryFirstName params={params} />,
    },
    {
      field: 'ApprovalStatus',
      headerName: 'Approval Status',
      flex: 1,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => <RenderCellServiceHistoryApprovalStatus params={params} />,
    },
    {
      field: 'CreatedAt',
      headerName: 'Created At',
      flex: 1,
      minWidth: 100,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params) => <RenderCellServiceHistoryCreatedAt params={params} />,
    },
  ];

  const getTogglableColumns = () =>
    columns
      .filter((column) => !HIDE_COLUMNS_TOGGLABLE.includes(column.field))
      .map((column) => column.field);

  //---------------------------------------------------------------------------------------------------------------------

  const [upgradeAccount, setupgradeAccount] = useState({ formNo: -1 });
  const [userRoleId, setUserRoleId] = useState([]);

  const { users } = useGetProductRolesList(user.accessToken);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueProducts = useMemo(
    () =>
      users?.data?.slice(1, 7).map((item) => ({
        label: `${item?.productName} (${item?.productDescription})`,
        value: item?.productId,
      })) || [],
    [users]
  );

  const UserDetailsSchemaPhase0 = Yup.object().shape({
    productId: Yup.number().required('Product Number is required'),
    // .transform((value, originalValue) => {
    //   const selectedProduct = Product_Name.find(product => product.label === originalValue);
    //   return selectedProduct ? selectedProduct.value : 9;
    // })
    RoleId: Yup.number()
      .required('Role Number is required')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return '';
        }
        const selectedProduct = userRoleId.find(
          (product) => product.UserRoleType.userRoleType === originalValue
        );
        return selectedProduct ? selectedProduct.UserRoleType.userRoleId : 9;
      }),
  });

  const defaultValuesUserDetailsPhase0 = {
    productId: '',
    RoleId: '',
  };

  const userDetailsMethodsPhase0 = useForm({
    resolver: yupResolver(UserDetailsSchemaPhase0),
    defaultValuesUserDetailsPhase0,
  });

  // eslint-disable-next-line no-unused-vars
  const {
    handleSubmit: handleSubmitUserUpgardeFun,
    // reset: handleSubmitUserUpgardeReset,
    // watch: handleSubmitUserUpgardeWatch,
    setValue: handleSubmitUserUpgardeYupUpdater,
  } = userDetailsMethodsPhase0;

  let bool = true;

  const onSubmitUserUpgradeChecker = handleSubmitUserUpgardeFun(async (data) => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 3000);
        setupgradeAccount({ formNo: data.RoleId });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  });

  const roleGetter = async (ProductId) => {
    try {
      const response = await UserRoleGetter(ProductId);
      if (response?.success) {
        const filteroptions = response?.data.filter(
          (options) =>
            options?.UserRoleType?.userRoleType === 'Doctor' ||
            options?.UserRoleType?.userRoleType === 'Employer' ||
            options?.UserRoleType?.userRoleType === 'Institution Owner' ||
            options?.UserRoleType?.userRoleType === 'Agriculture Equipment Seller' ||
            options?.UserRoleType?.userRoleType === 'Businessman' ||
            options?.UserRoleType?.userRoleType === 'Driver' ||
            options?.UserRoleType?.userRoleType === 'Chartered Accountant' ||
            options?.UserRoleType?.userRoleType === 'LMS Vendor' ||
            options?.UserRoleType?.userRoleType === 'Lawyer'
        );

        setUserRoleId(filteroptions);
      }
    } catch (error) {
      console.error('', error);
      enqueueSnackbar('', { variant: 'error' });
    }
  };

  function roleShowFunction(e) {
    const selectedProduct = uniqueProducts.find((product) => product.label === e.target.innerHTML);
    const productId = selectedProduct ? selectedProduct.value : 9;
    handleSubmitUserUpgardeYupUpdater('productId', productId);
    handleSubmitUserUpgardeYupUpdater('RoleId', '');
    setUserRoleId([]);
    roleGetter(productId);
  }

  return (
    <>
      {upgradeAccount.formNo === -1 && (
        <>
          <CustomBreadcrumbs
            heading="UPGRADE ACCOUNT HISTORY"
            links={[
              {
                name: 'PROFILE',
              },
              {
                name: 'UPGRADE ACCOUNT',
              },
              {
                name: 'HISTORY',
              },
            ]}
            action={
              <Button
                component={RouterLink}
                // href={paths.dashboard.blog.new}
                onClick={() => {
                  setupgradeAccount({ formNo: 0 });
                }}
                variant="contained"
                startIcon={<Iconify icon="mingcute:add-line" />}
              >
                New Request
              </Button>
            }
            sx={{
              mb: { xs: 3, md: 5 },
              mt: 3,
            }}
          />
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
                // checkboxSelection
                disableRowSelectionOnClick
                rows={dataFiltered}
                columns={columns}
                loading={ServiceHistoryusersLoading}
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
      )}
      {upgradeAccount.formNo === 0 && (
        <Grid xs={12} md={8}>
          <Card
            sx={{
              p: { xs: 3, md: 5 },
              minWidth: { md: '600px' },
              maxWidth: { md: '600px' },
              mt: { xs: 5, md: 10 },
              mr: { md: 5 },
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              '@media (max-width:900px)': {
                // width:380,
              },
            }}
          >
            <FormProvider methods={userDetailsMethodsPhase0} onSubmit={onSubmitUserUpgradeChecker}>
              <RHFAutocomplete
                name="productId"
                label={
                  <span>
                    Choose your Product<span style={{ color: 'red' }}> *</span>
                  </span>
                }
                onChange={(e) => roleShowFunction(e)}
                placeholder="Choose your Product"
                fullWidth
                options={uniqueProducts.map((option) => option.label)}
                getOptionLabel={(option) => option}
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
              />

              <RHFAutocomplete
                name="RoleId"
                label={
                  <span>
                    Choose your Role<span style={{ color: 'red' }}> *</span>
                  </span>
                }
                placeholder="Choose your Role"
                fullWidth
                options={userRoleId.map((option) => option?.UserRoleType?.userRoleType)}
                getOptionLabel={(option) => option}
                sx={{
                  mt: 2,
                }}
                InputProps={{
                  style: { color: 'black' },
                }}
                InputLabelProps={{
                  style: { color: 'black' },
                }}
                disabled={userRoleId.length === 0}
              />

              <Button
                variant="contained"
                size="large"
                type="submit"
                sx={{
                  mt: 2,
                  fontWeight: 1,
                  // ...bgGradient({
                  //   direction: '135deg',
                  //   startColor: theme.palette.primary.main,
                  //   endColor: theme.palette.primary.dark,
                  // }),
                  width: '100%',
                  fontSize: 20,
                }}
                disabled={userRoleId.length === 0}
              >
                Next
              </Button>
            </FormProvider>
          </Card>
        </Grid>
      )}
      <Box
        rowGap={3}
        columnGap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          sm: 'repeat(2, 1fr)',
        }}
        sx={{ mb: 5 }}
      >
        {upgradeAccount.formNo === 34 && <DoctorLicenseForm />}
        {upgradeAccount.formNo === 30 && <EmployerLicenseForm />}
        {upgradeAccount.formNo === 42 && <BusinessmanLicenseForm />}
        {upgradeAccount.formNo === 44 && <InstituteOwnerLicenseForm />}
        {upgradeAccount.formNo === 46 && <SellerLicenseForm />}
        {upgradeAccount.formNo === 8 && <DriverLicenseForm />}
        {upgradeAccount.formNo === 31 && <LawyerRegForm handleEditChange={handleChangeTab} />}
        {upgradeAccount.formNo === 32 && <VendorRegForm handleEditChange={handleChangeTab} />}
        {upgradeAccount.formNo === 49 && <ChartedAccountantLicenseForm />}
      </Box>
    </>
  );
}

UpgradeAccountProfile.propTypes = {
  handleChangeTab: PropTypes.object,
};
