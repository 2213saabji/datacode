/* eslint-disable no-unused-vars */
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
import {
  useGetRolesList,
  // useGetRolesList
} from 'src/api/userRole';
import { useGetProductRolesList, updateUserProductRoleMapping } from 'src/api/product_roles';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFAutocomplete } from 'src/components/hook-form';

export default function ProductMappingNewEditForm({ currentRole }) {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  // const { users:userdata, usersLoading } = useGetProductMappingRolesList(user.accessToken);
  const { users: userdata, usersLoading } = useGetRolesList(user.accessToken);
  const { users } = useGetProductRolesList(user.accessToken);

  const { enqueueSnackbar } = useSnackbar();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueProducts = useMemo(
    () =>
      users?.data?.map((item) => ({
        label: item?.productName,
        value: item?.productId,
      })) || [],
    [users]
  );

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const uniqueUserRoleNames = new Set();

  const uniqueUserRole = useMemo(
    () =>
      userdata?.data?.map((item) => ({
        label: item?.userRoleType,
        value: item?.userRoleId,
      })) || [],
    [userdata?.data]
  );
  // console.log(uniqueUserRole);
  const MappingRoleTypeSchema = Yup.object().shape({
    productId: Yup.number()
      .required('productName Type is required')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        const selectedProduct = uniqueProducts.find((item) => item.label === originalValue);
        return selectedProduct ? selectedProduct.value : null;
      }),
    userRoleId: Yup.number()
      .required('productDescription Type is required')
      .transform((value, originalValue) => {
        if (originalValue === '') {
          return null;
        }
        // console.log(originalValue)
        const selectedProduct = uniqueUserRole.find((item) => item.label === originalValue);
        return selectedProduct ? selectedProduct.value : null;
      }),
  });

  const defaultMappingRoleTypeValues = useMemo(
    () => ({
      userRoleId: '',
      productId: '',
    }),
    []
  );
  const methodsMappingRoleType = useForm({
    resolver: yupResolver(MappingRoleTypeSchema),
    defaultMappingRoleTypeValues,
  });

  const { handleSubmit: handleSubmitRole, reset: resetMappingRoles } = methodsMappingRoleType;

  useEffect(() => {
    if (currentRole) {
      resetMappingRoles(defaultMappingRoleTypeValues);
    }
  }, [currentRole, defaultMappingRoleTypeValues, resetMappingRoles]);

  const onSubmitMappingRoleType = handleSubmitRole(async (data) => {
    try {
      const response = await updateUserProductRoleMapping(data, user.accessToken);
      if (response) {
        enqueueSnackbar('User Role Mapping Updated successfully', { variant: 'success' });
        navigate(`/dashboard/productRoleMapping/list`);
      }
    } catch (error) {
      enqueueSnackbar('An error occurred while Mapping User Role', { variant: 'error' });
    }
  });

  return (
    <div>
      <FormProvider methods={methodsMappingRoleType} onSubmit={onSubmitMappingRoleType}>
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
                <RHFAutocomplete
                  name="productId"
                  label="Choose Product Name"
                  fullWidth
                  options={uniqueProducts.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />
                <RHFAutocomplete
                  name="userRoleId"
                  label="Choose User Role Name"
                  fullWidth
                  options={uniqueUserRole.map((option) => option.label)}
                  getOptionLabel={(option) => option}
                />

                <Stack alignItems="flex-end" sx={{ mt: 1 }}>
                  <LoadingButton
                    sx={{ width: '100%', height: '60px' }}
                    type="submit"
                    variant="contained"
                  >
                    Modify Roles
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

ProductMappingNewEditForm.propTypes = {
  currentRole: PropTypes.object,
};
