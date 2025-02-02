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
import { createVehicleOption, UpdateVehicleOption } from 'src/api/vehicle_option_booking';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function VehicleOptionsForm({ currentVehicleOption }) {
    const theme = useTheme();

    const currentVehicleOptionId = currentVehicleOption?.data?.VehicleOptionId;

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

    const VehicleOptionSchema = Yup.object().shape({
        vehicleOptionFor: Yup.string().required('Vehicle Option is required'),
        vehicleType: Yup.string().required('Vehicle Type is required'),
        rentPerKm: Yup.string().required('Rent Per KM is required'),
        baseCharge: Yup.string().required('Base Charge is required'),
         // seatingCapacity: Yup.string().required('Seating Capacity is required'),
        // weightCapacity: Yup.string().required('Weight Capacity is required'),
    });

    // Form Values

    const defaultValues = useMemo(
        () => ({
            vehicleOptionFor: currentVehicleOption?.data?.vehicleOptionFor || '',
            vehicleType: currentVehicleOption?.data?.vehicleType || '',
            rentPerKm: currentVehicleOption?.data?.rentPerKm || '',
            baseCharge: currentVehicleOption?.data?.baseCharge || '',
            seatingCapacity: currentVehicleOption?.data?.seatingCapacity || null,
            weightCapacity: currentVehicleOption?.data?.weightCapacity || null,
        }),
        [currentVehicleOption]
    );

    // Form Method
    const methods = useForm({
        resolver: yupResolver(VehicleOptionSchema),
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
        if (currentVehicleOption) {
            reset(defaultValues);
        }
    }, [currentVehicleOption, defaultValues, reset]);

    const [vehicleTypeOptions, setVehicleTypeOptions] = useState([
        'Bike',
        'Tempo',
        'Truck',
        'Pickup',
        'Mini Prime',
        'Sedan Prime',
        'SUV',
        'Auto'
    ]);

    const vehicleOptionFor = watch('vehicleOptionFor');

    useEffect(() => {
        if (vehicleOptionFor === 'Cab Service') {
            setVehicleTypeOptions(['Bike', 'Mini Prime', 'Sedan Prime', 'SUV', 'Auto']);
        } else {
            setVehicleTypeOptions(['Bike', 'Tempo', 'Truck', 'Pickup']);
        }
    }, [vehicleOptionFor]);

    const onSubmit = handleSubmit(async (data) => {
        try {
            if(data.vehicleOptionFor === "Cab Service" && data.seatingCapacity === null){
                enqueueSnackbar('Please Select Vehicle Seating Capacity', { variant: 'error' });
                return ;
            }
             if(data.vehicleOptionFor === "Delivery Service" && data.weightCapacity === null){
                enqueueSnackbar('Please Select Vehicle Weight Capacity', { variant: 'error' });
                return ;
            }

           if(data.vehicleOptionFor === "Cab Service"){
              delete data.weightCapacity;
           }else if(data.vehicleOptionFor === "Delivery Service"){
            delete data.seatingCapacity;
           }
            const response = await createVehicleOption(data);
            
            if (response.status === 201) {
                enqueueSnackbar('Vehicle Booking Option created successfully', { variant: 'success' });
                navigate('/dashboard/vehicle-booking-option');
            } else if(response.status === 204) {
                enqueueSnackbar('Vehicle Option Type Already Exit.', { variant: 'warning' });
            }else{
                enqueueSnackbar('Failed to Create Vehicle Booking Option', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error Submitting Vehicle Booking Option:', error);
            enqueueSnackbar('An error occurred while Creating Vehicle Booking Option', { variant: 'error' });
        }
    });

    // Function Call for Updating Emergency Service
    const onSubmitUpdate = handleSubmit(async (data) => {
        try {

            const response = await UpdateVehicleOption(currentVehicleOptionId, data);

            if (response) {
                enqueueSnackbar('Vehicle Booking Option updated successfully', { variant: 'success' });
                navigate('/dashboard/vehicle-booking-option');

            } else {
                enqueueSnackbar('Failed to update Vehicle Booking Option', { variant: 'error' });
            }
        } catch (error) {
            // Handle errors here if necessary
            console.error('Error updating Vehicle Booking Option :', error);
            enqueueSnackbar('An error occurred while updating Vehicle Booking Option ', { variant: 'error' });
        }
    });

    return (
        <FormProvider methods={methods} onSubmit={currentVehicleOption ? onSubmitUpdate : onSubmit}>
            <Grid Grid container spacing={3} >
                <Grid xs={12} md={8}>
                    <Card>
                        {!mdUp && <CardHeader title="Details" />}

                        <Stack spacing={3} sx={{ p: 3 }}>

                            <RHFAutocomplete
                                name="vehicleOptionFor"
                                label="Vehicle Option"
                                options={['Cab Service', 'Delivery Service'].map((option) => option)}
                                getOptionLabel={(option) => option}
                            />

                            <RHFAutocomplete
                                name="vehicleType"
                                label="Vehicle Type"
                                options={vehicleTypeOptions}
                                getOptionLabel={(option) => option}
                            />

                            <RHFTextField
                                name="rentPerKm"
                                label="Rent Per KM"
                                InputLabelProps={{
                                    style: {
                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                    },
                                }}
                            />

                            <RHFTextField
                                name="baseCharge"
                                label="Base Charge"
                                InputLabelProps={{
                                    style: {
                                        color: theme.palette.mode === 'light' ? 'black' : 'white',
                                    },
                                }}
                            />

                            {
                                vehicleOptionFor === 'Cab Service' &&
                            <RHFAutocomplete
                                name="seatingCapacity"
                                label="Seating Capacity"
                                options={[1, 3, 4, 5, 6, 7].map((option) => option)}
                                getOptionLabel={(option) => option}
                            />
                            }

                            {
                                vehicleOptionFor === 'Delivery Service' && 
                            < RHFAutocomplete
                                name="weightCapacity"
                                label="Weight Capacity"
                                options={['5 kg', '20 kg', '100 kg', '1 Ton', '3 Ton', '10 Ton', '15 Ton', '20 Ton'].map((option) => option)}
                                getOptionLabel={(option) => option}
                            />
                             }


                        </Stack>
                        <Grid xs={12} md={12} sx={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', p: 2.5, }}>
                            <LoadingButton type="submit" variant="contained" size="large" >
                                {currentVehicleOption ? "Update" : "Create"}
                            </LoadingButton>
                        </Grid>
                    </Card>
                </Grid>

            </Grid >
        </FormProvider >
    );
}

VehicleOptionsForm.propTypes = {
    currentVehicleOption: PropTypes.object
};