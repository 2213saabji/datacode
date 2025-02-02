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
import { createUserProductRole, updateUserProductRole } from 'src/api/product_roles';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';

export default function ProductNewEditForm({ currentRole }) {
  const navigate = useNavigate();
  // console.log("aa",currentRole)
  const { user } = useAuthContext();

  const { enqueueSnackbar } = useSnackbar();

  const UserRoleTypeSchema = Yup.object().shape({
    productName: Yup.string().required('productName Type is required'),
    productDescription: Yup.string().required('productDescription Type is required'),
  });

  // const { users: UserRoleList } = useGetRolesList(user.accessToken);

  // const currentUserRoleId = user.userRoleId;

  // const UserRoleListArr = UserRoleList?.data.filter((role) => role.userRoleId > currentUserRoleId) || [];

  // const UserRoleData = UserRoleListArr.map((list) => ({
  //     value: list.userRoleId,
  //     label: list.userProductType,
  // }));

  // const UserRoleDataForOptions = UserRoleData.map((option) => option.value);

  const defaultUserRoleTypeValues = useMemo(
    () => ({
      productName: currentRole?.productName || '',
      productDescription: currentRole?.productDescription || '',
    }),
    [currentRole]
  );
  const methodsuserRoleType = useForm({
    resolver: yupResolver(UserRoleTypeSchema),
    defaultUserRoleTypeValues,
  });

  const { handleSubmit: handleSubmitRole, reset: resetProfile } = methodsuserRoleType;

  useEffect(() => {
    if (currentRole) {
      resetProfile(defaultUserRoleTypeValues);
    }
  }, [currentRole, defaultUserRoleTypeValues, resetProfile]);

  const onSubmitRoleType = handleSubmitRole(async (data) => {
    try {
      const response = await createUserProductRole(data, user.accessToken);
      if (response.success) {
        enqueueSnackbar(response?.message, { variant: 'success' });
        navigate(`/dashboard/productManagement/list`);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while creating ProductType', { variant: 'error' });
    }
  });

  const onSubmitUpdateRoleType = handleSubmitRole(async (data) => {
    try {
      const response = await updateUserProductRole(data, user.accessToken, currentRole?.productId);
      if (response) {
        enqueueSnackbar('User RoleType Updated successfully', { variant: 'success' });
        navigate(`/dashboard/productManagement/list`);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while creating User Role Type', { variant: 'error' });
    }
  });

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
                <RHFTextField name="productName" label="Add Product Name" />
                <RHFTextField name="productDescription" label="Add Product Description" />

                <Stack alignItems="flex-end" sx={{ mt: 1 }}>
                  <LoadingButton
                    sx={{ width: '100%', height: '60px' }}
                    type="submit"
                    variant="contained"
                  >
                    {!currentRole ? 'Add New Product' : 'Modify Product Type'}
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

ProductNewEditForm.propTypes = {
  currentRole: PropTypes.object,
};
