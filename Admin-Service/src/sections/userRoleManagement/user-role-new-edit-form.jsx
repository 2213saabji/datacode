import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';

import { useAuthContext } from 'src/auth/hooks';
import { useGetProductRolesList } from 'src/api/product_roles';
import {
  createUserRole,
  updateUserRole,
  // useGetRolesList
} from 'src/api/userRole';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function RoleNewEditForm({ currentRole }) {
  const navigate = useNavigate();

  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const { users } = useGetProductRolesList(user.accessToken);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueProducts = useMemo(
    () =>
      users?.data?.map((item) => ({
        label: item?.productName,
        value: item?.productId,
      })) || [],
    [users]
  );
  const UserRoleTypeSchema = Yup.object().shape(
    currentRole
      ? {
          userRoleType: Yup.string().required('User Role Type is required'),
        }
      : {
          productId: Yup.number().required('Product Number is required'),
          userRoleType: Yup.string().required('User Role Type is required'),
        }
  );

  // const { users: UserRoleList } = useGetRolesList(user.accessToken);

  // const currentUserRoleId = user.userRoleId;

  // const UserRoleListArr = UserRoleList?.data.filter((role) => role.userRoleId > currentUserRoleId) || [];

  // const UserRoleData = UserRoleListArr.map((list) => ({
  //     value: list.userRoleId,
  //     label: list.userRoleType,
  // }));

  // const UserRoleDataForOptions = UserRoleData.map((option) => option.value);

  const defaultUserRoleTypeValues = useMemo(
    () => ({
      productId: '',
      userRoleType: currentRole?.userRoleType,
    }),
    [currentRole]
  );
  const methodsuserRoleType = useForm({
    resolver: yupResolver(UserRoleTypeSchema),
    defaultUserRoleTypeValues,
  });

  const { handleSubmit: handleSubmitRole, reset: resetProfile, setValue } = methodsuserRoleType;

  useEffect(() => {
    if (currentRole) {
      resetProfile(defaultUserRoleTypeValues);
    }
  }, [currentRole, defaultUserRoleTypeValues, resetProfile]);

  const onSubmitRoleType = handleSubmitRole(async (data) => {
    try {
      const newdata = {
        createdBy: 1,
        ...data,
      };
      const response = await createUserRole(newdata, user.accessToken);
      if (response) {
        enqueueSnackbar('UserRoleType created successfully', { variant: 'success' });
        navigate(`/dashboard/userRoleManagement/list`);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while creating userRoleType', { variant: 'error' });
    }
  });

  const onSubmitUpdateRoleType = handleSubmitRole(async (data) => {
    try {
      const response = await updateUserRole(data, user.accessToken, currentRole?.userRoleId);
      if (response) {
        enqueueSnackbar('User RoleType Updated successfully', { variant: 'success' });
        navigate(`/dashboard/userRoleManagement/list`);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while creating User Role Type', { variant: 'error' });
    }
  });

  function roleShowFunction(e) {
    const selectedProduct = uniqueProducts.find((product) => product.label === e.target.innerHTML);
    const productId = selectedProduct ? selectedProduct.value : 1;
    setValue('productId', productId);
  }

  return (
    <div>
      <FormProvider
        methods={methodsuserRoleType}
        onSubmit={currentRole ? onSubmitUpdateRoleType : onSubmitRoleType}
      >
        <Grid container spacing={3}>
          <Grid xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Box
                rowGap={3}
                columnGap={2}
                display="grid"
                gridTemplateColumns={{
                  xs: 'repeat(1, 1fr)',
                  sm: 'repeat(1, 1fr)',
                }}
              >
                {currentRole ? (
                  <>
                    {/* <RHFTextField name="userRoleType" label="Current Role Type" disabled /> */}
                    <RHFTextField name="userRoleType" label="Update Role Type" />
                  </>
                ) : (
                  // <RHFAutocomplete
                  //   name="userRoleType"
                  //   label="Update Role Type"
                  //   options={UserRoleDataForOptions}
                  //   getOptionLabel={(value) => {
                  //     const roletype = UserRoleData.find((option) => option.value === value);
                  //     return roletype ? roletype.label : '';
                  //   }}
                  // />
                  <>
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
                    <RHFTextField name="userRoleType" label="Add Role Type" />
                  </>
                )}

                <Stack alignItems="flex-end" sx={{ mt: 1 }}>
                  <LoadingButton
                    sx={{ width: '100%', height: '60px' }}
                    type="submit"
                    variant="contained"
                  >
                    {!currentRole ? 'Add New Role Type' : 'Save Role Type Changes'}
                  </LoadingButton>
                </Stack>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </FormProvider>
    </div>
  );
}

RoleNewEditForm.propTypes = {
  currentRole: PropTypes.object,
};
