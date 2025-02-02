/* eslint-disable no-unused-vars */
import * as Yup from 'yup';
import PropTypes, { number } from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack'
import Grid from '@mui/material/Unstable_Grid2';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import LoadingButton from '@mui/lab/LoadingButton';

import { useResponsive } from 'src/hooks/use-responsive';

import { useAuthContext } from 'src/auth/hooks';

import { Department } from 'src/_mock/emergency_service';
import { UpdateCattle } from 'src/api/agriculture/cattle';
import { createEmergencyNumber, UpdateEmergencyNumber } from 'src/api/emergency_service'

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function EmergencyForm({ currentEmergencyNumber }) {
    const theme = useTheme();

    const currentEmergencyContactId = currentEmergencyNumber?.data?.contactId;

    const { user } = useAuthContext();

    const [uploadBtn, setUploadBtn] = useState(false);

    const navigate = useNavigate();
    const mdUp = useResponsive('up', 'md');
    const { enqueueSnackbar } = useSnackbar();

    const [isHidden, setIsHidden] = useState(true);

    let imageUrlSchema = Yup.array().notRequired(); // Default schema when isHidden is true

    if (!isHidden) {
        imageUrlSchema = Yup.array().min(1, 'Image is required');
    }

    // Form Validation Schema

    const EmergencySchema = Yup.object().shape({
        departmentName: Yup.string().required('Department is required'),
        contactName: Yup.string().required('Name is required'),
        phoneNumber: Yup.string().required('Mobile Number is required').matches(/^\d{10}$/, 'Phone Number must be exactly 10 digits')
    });

    // Form Values

    const defaultValues = useMemo(
        () => ({
            departmentName: currentEmergencyNumber?.data.departmentName || '',
            contactName: currentEmergencyNumber?.data.contactName || '',
            phoneNumber: currentEmergencyNumber?.data.phoneNumber || '',
        }),
        [currentEmergencyNumber]
    );

    // Form Method
    const methods = useForm({
        resolver: yupResolver(EmergencySchema),
        defaultValues,
    });
    const {
        reset,
        setValue,
        handleSubmit,
        watch,
        // formState: { isSubmitting },
    } = methods;

    const values = watch();

    useEffect(() => {
        if (currentEmergencyNumber) {
            reset(defaultValues);
        }
    }, [currentEmergencyNumber, defaultValues, reset]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await createEmergencyNumber(data);
            if (response) {
                enqueueSnackbar('Emergency Service created successfully', { variant: 'success' });
                navigate('/dashboard/emergencyServices');
            } else {
                enqueueSnackbar('Failed to create Emergency Service', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error submitting Emergency Service:', error);
            enqueueSnackbar('An error occurred while creating Emergency Service', { variant: 'error' });
        }
    });

    // Function Call for Updating Emergency Service
    const onSubmitUpdate = handleSubmit(async (data) => {
        try {

            // const response = await UpdateCattle(currentCattleTypeId, data);
            const response = await UpdateEmergencyNumber(currentEmergencyContactId, data);

            if (response) {
                enqueueSnackbar('Emergency Contact updated successfully', { variant: 'success' });
                navigate('/dashboard/emergencyServices');

            } else {
                enqueueSnackbar('Failed to update Emergency Contact', { variant: 'error' });
            }
        } catch (error) {
            // Handle errors here if necessary
            console.error('Error updating Emergency Contact :', error);
            enqueueSnackbar('An error occurred while updating Emergency Contact ', { variant: 'error' });
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={currentEmergencyNumber ? onSubmitUpdate : onSubmit}>
            <Grid Grid container spacing={3} >
                <Grid xs={12} md={8}>
                    <Card>
                        {!mdUp && <CardHeader title="Details" />}

                        <Stack spacing={3} sx={{ p: 3 }}>

                            <RHFAutocomplete
                                name="departmentName"
                                label="Select Department"
                                options={Department}
                                getOptionLabel={(option) => option}
                            />

                            <RHFTextField
                                name="contactName"
                                label="Contact Person Name"
                                InputLabelProps={{
                                    style: {
                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                    },
                                }}
                            />

                            {/* <RHFTextField
                                name="phoneNumber"
                                // type={number}
                                label="Mobile Number"
                                InputLabelProps={{
                                    style: {
                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                    },
                                }}
                            /> */}
                            <RHFTextField
                                name="phoneNumber"
                                label="Mobile Number"
                                InputLabelProps={{
                                    style: {
                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                    },
                                }}
                            />

                        </Stack>
                        <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', p: 2.5, }}>
                            <LoadingButton type="submit" variant="contained" size="large" >
                                {currentEmergencyNumber ? "Update" : "Create"}
                            </LoadingButton>
                        </Grid>
                    </Card>
                </Grid>

            </Grid >
        </FormProvider >
    );
}

EmergencyForm.propTypes = {
    currentEmergencyNumber: PropTypes.object,
};