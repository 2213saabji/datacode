import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import CardHeader from '@mui/material/CardHeader';
import { CardContent, InputAdornment } from '@mui/material';
import { useTheme } from '@mui/material/styles';

import { useAuthContext } from 'src/auth/hooks';
import { useResponsive } from 'src/hooks/use-responsive';
import { createEquipmentType, createEquipmentDetails, UpdateEquipmentType, UpdateEquipmentDetails } from 'src/api/agriculture/equipment'
import { combineHarvesterConditions, modernAgricultureTools } from 'src/_mock/_farmer';
import { INDIAN_CITIES } from 'src/_mock/map/city';
import { statesOfIndia } from 'src/_mock/map/states';

import { sellerType } from 'src/_mock';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';
import { deleteUserFileFromAWSS3, deleteUserFilesFromAWSS3, uploadUserFilesInAWSS3 } from 'src/utils/aws-s3-file-handler';


// ----------------------------------------------------------------------

export default function FarmerDetailsForm({ currentEquipment, currentEquipmentDetail }) {

    const theme = useTheme();

    const [uploadBtn, setUploadBtn] = useState(false);

    const [toggle, setToggle] = useState(false)

    const { user } = useAuthContext()

    const navigate = useNavigate();
    const mdUp = useResponsive('up', 'md');
    const { enqueueSnackbar } = useSnackbar();

    const [isHidden, setIsHidden] = useState(true);
    const [equipmentType, setEquipmentType] = useState();
    const equipmentTypeId = currentEquipment?.data?.equipmentTypeId;
    const equipmentDetailId = currentEquipmentDetail?.data?.equipmentId;

    let imageUrlSchema = Yup.array().notRequired(); // Default schema when isHidden is true

    if (!isHidden) {
        imageUrlSchema = Yup.array().min(1, 'Image is required');
    }

    // Form Validation Schema

    const EquipmentTypeSchema = Yup.object().shape({
        type: Yup.string().required('Type is required'),
        description: Yup.string().required('Description is required'),
        imageUrl: imageUrlSchema,
    });

    const EquipmentDetailsSchema = Yup.object().shape({
        condition: Yup.string().required('Condition is required'),
        brand: Yup.string().required('Brand is required'),
        model: Yup.string().required('Model is required'),
        yearOfPurchase: Yup.date().required('Year of Purchase is required'),
        price: Yup.string().required('Price is required'),
        state: Yup.string().required('State is required'),
        city: Yup.string().required('City is required'),
        district: Yup.string().required('District is required'),
        tehsil: Yup.string().required('Tehsil is required'),
        zipCode: Yup.string().required('Zip Code is required'),
        dateListed: Yup.date().required('Listing Date is required'),
        imageUrl: imageUrlSchema,
    });

    // Form Values
    const defaultValues = useMemo(
        () => ({
            type: currentEquipment?.data.type || '',
            description: currentEquipment?.data.description || '',
            imageUrl: currentEquipment?.data.imageUrl || [],
        }), [currentEquipment]
    );

    const defaultDetailsValues = useMemo(
        () => ({
            condition: currentEquipmentDetail?.data?.condition || '',
            brand: currentEquipmentDetail?.data?.brand || '',
            model: currentEquipmentDetail?.data?.model || '',
            yearOfPurchase: currentEquipmentDetail?.data?.yearOfPurchase || '',
            price: currentEquipmentDetail?.data?.price || '',
            state: currentEquipmentDetail?.data?.state || '',
            city: currentEquipmentDetail?.data?.city || '',
            district: currentEquipmentDetail?.data?.district || '',
            tehsil: currentEquipmentDetail?.data?.tehsil || '',
            zipCode: currentEquipmentDetail?.data?.zipCode || '',
            dateListed: currentEquipmentDetail?.data?.dateListed || '',
        }), [currentEquipmentDetail]
    )

    // const combinedDefaultValues = useMemo(() => ({
    //     ...defaultValues,
    //     ...defaultDetailsValues,
    // }), [defaultValues, defaultDetailsValues]);

    // const combinedSchema = Yup.object().shape({
    //     ...EquipmentTypeSchema.fields,
    //     ...EquipmentDetailsSchema.fields,
    // })

    // Form Method
    const methods = useForm({
        resolver: yupResolver(EquipmentTypeSchema),
        defaultValues,
    });
    const {
        reset,
        setValue,
        handleSubmit,
        watch,
        // formState: { isSubmitting },
    } = methods;

    useEffect(() => {
        if (currentEquipment) {
            reset(defaultValues);
        }
    }, [currentEquipment, defaultValues, reset]);

    const detailsMethod = useForm({
        resolver: yupResolver(EquipmentDetailsSchema),
        defaultDetailsValues,
    });

    const {
        reset: resetDetails,
        setValue: setDetailsValue,
        handleSubmit: handleSubmitDetails,
        watch: detailsWatch,
        // formState: { isSubmitting },
    } = detailsMethod;

    const value = detailsWatch();

    useEffect(() => {
        if (currentEquipmentDetail) {
            resetDetails(defaultDetailsValues);
        }
    }, [currentEquipmentDetail, defaultDetailsValues, resetDetails]);

    const values = watch();

    // Handle Multiple Image Upload
    const handleDropMultiFile = useCallback(
        (acceptedFiles) => {
            const files = values.imageUrl || [];

            const newFiles = acceptedFiles.map((file) =>
                Object.assign(file, {
                    preview: URL.createObjectURL(file),
                })
            );

            setValue('imageUrl', [...files, ...newFiles], {
                shouldValidate: true,
            });
        },
        [setValue, values.imageUrl]
    );

    // Function Call for Image Upload in BackEnd
    //   const onSubmit = handleSubmit(async () => {
    //     if (values.imageUrl.length === 0) {
    //       enqueueSnackbar('Need to upload image', { variant: 'error' });
    //       return;
    //     }

    //     try {
    //       const cattleImageDetails = values.imageUrl.map((item) => ({
    //         imageUrlDetails: item,
    //         cattleId,
    //       }));

    //       const response = await createImageClaim({ cattleImageDetails });

    //       if (response) {
    //         enqueueSnackbar('Image uploaded successfully', { variant: 'success' });
    //         navigate('/dashboard/cattle');
    //       } else {
    //         enqueueSnackbar('Failed to upload Image', { variant: 'error' });
    //       }
    //     } catch (error) {
    //       console.error('Error submitting cattle:', error);
    //       enqueueSnackbar('An error occurred while uploading Image', { variant: 'error' });
    //     }
    //   });

    // Function Call for Creating cattle
    //   const onSubmitFirst = handleSubmit(async (data) => {
    //     try {
    //       const response = await createClaim(data);

    //       if (response) {
    //         setCattleId(response.data.cattleId);
    //         enqueueSnackbar('Cattle created successfully', { variant: 'success' });
    //         setIsHidden(false);
    //       } else {
    //         enqueueSnackbar('Failed to create cattle', { variant: 'error' });
    //       }
    //     } catch (error) {
    //       console.error('Error submitting cattle:', error);
    //       enqueueSnackbar('An error occurred while creating cattle', { variant: 'error' });
    //     }
    //   });

    const uploadImages = async (files) => {
        try {
            const compressedFilesPromises = files.map(async (file) => {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 0.5, // Adjust maximum size to 500KB
                    maxWidthOrHeight: 800, // Adjust maximum width or height as needed
                });

                return compressedFile;
            });

            const compressedFiles = await Promise.all(compressedFilesPromises);

            const formData = new FormData();
            compressedFiles.forEach((compressedFile, index) => {
                const blob = new Blob([compressedFile], { type: compressedFile.type });
                const newFile = new File([blob], compressedFile.name, { type: compressedFile.type });
                formData.append('images', newFile);
            });

            const response = await uploadUserFilesInAWSS3(formData);
            const imageUrls = response.data && response.data.data && response.data.data.length ? response?.data?.data : [];

            if (imageUrls.length > 0) {
                setValue('imageUrl', imageUrls);
                setUploadBtn(true);
                enqueueSnackbar('Uploaded successfully', { variant: 'success' });
            } else {
                console.error('Error in uploading files:', response);
                enqueueSnackbar('Error while uploading', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error compressing/uploading images:', error);
            enqueueSnackbar('Error while compressing/uploading images', { variant: 'error' });
        }
    };

    const deleteImage = async (removedFile) => {
        const removedFileIndex = values.imageUrl.findIndex(
            (file) =>
                file.name === removedFile.name && file.preview === removedFile.preview
        );

        if (values.imageUrl.length > 0) {
            const selectedImage = values.imageUrl.filter((item) => removedFile.name === item.name);

            const dataToSend = { 'url': selectedImage[0].preview };
            await deleteUserFilesFromAWSS3(dataToSend)
                .then((data) => {
                    const updatedImageUrl = values.imageUrl.filter((item) => removedFile.name !== item.name);
                    setValue('imageUrl', updatedImageUrl);
                    setValue(
                        'imageUrl',
                        values.imageUrl.filter((_, index) => index !== removedFileIndex),
                        { shouldValidate: true }
                    );

                    enqueueSnackbar('Deleted successfully', { variant: 'success' });
                })
                .catch((err) => {
                    console.error('Error in deleting files:', err);
                    enqueueSnackbar('Error while deleting', { variant: 'error' });
                });
        } else {
            setValue(
                'imageUrl',
                values.imageUrl && values.imageUrl?.filter((file) => file !== removedFile),
                { shouldValidate: true }
            );
        }

        if (values.imageUrl.length === 1) {
            setUploadBtn(false); // Set uploadBtn to false when there are no more images to remove
        }
    };

    const deleteImages = async () => {
        const urlArr = [];
        values.imageUrl.forEach((file) => {
            const urlPreview = file.preview;
            urlArr.push(urlPreview);
        });

        const dataToSend = { 'urls': urlArr };
        await deleteUserFileFromAWSS3(dataToSend)
            .then((data) => {
                setValue('imageUrl', [], { shouldValidate: true });
                setUploadBtn(false);
                setValue('imageUrl', []);
                enqueueSnackbar('Deleted successfully', { variant: 'success' });
            })
            .catch((err) => {
                console.error('Error in deleting files:', err);
                enqueueSnackbar('Error while deleting', { variant: 'error' });
            });
    };

    const onSubmit = handleSubmit(async (data) => {
        try {
            const response = await createEquipmentType(data);
            localStorage.setItem('equipmentOwnerUserId', response.data.equipmentTypeId)
            setEquipmentType(response)
            if (response) {
                enqueueSnackbar('Equipment Type created successfully', { variant: 'success' });
                setToggle(true)
            } else {
                enqueueSnackbar('Failed to create Equipment Type', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error submitting Equipment Type:', error);
            enqueueSnackbar('An error occurred while creating Equipment Type', { variant: 'error' });
        }
    });

    const onSubmitDetails = handleSubmitDetails(async (data) => {
        try {
            const updatedData = {
                ...data,
                equipmentTypeId: equipmentType?.data?.equipmentTypeId,
                userId: user?.userId
            }
            const response = await createEquipmentDetails(updatedData);
            if (response) {
                enqueueSnackbar('Equipment Details created successfully', { variant: 'success' });
                localStorage.setItem('equipmentOwnerUserId', response.data.userId)
                localStorage.setItem('currEquipmentTab', 'myList')
                navigate('/dashboard/FarmerService');
            } else {
                enqueueSnackbar('Failed to create Equipment Details', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error submitting Equipment Details:', error);
            enqueueSnackbar('An error occurred while creating Equipment Details', { variant: 'error' });
        }
    });

    const onSubmitUpdate = handleSubmit(async (data) => {
        try {

            const response = await UpdateEquipmentType(equipmentTypeId, data);

            if (response) {
                enqueueSnackbar('Equipment Type updated successfully', { variant: 'success' });
                setToggle(true)
            } else {
                enqueueSnackbar('Failed to update Equipment Type', { variant: 'error' });
            }
        } catch (error) {
            // Handle errors here if necessary
            console.error('Error updating Equipment Type :', error);
            enqueueSnackbar('An error occurred while updating Equipment Type ', { variant: 'error' });
        }
    });

    const onSubmitUpdateDetails = handleSubmitDetails(async (data) => {
        try {
            const response = await UpdateEquipmentDetails(equipmentDetailId, data);

            if (response) {
                enqueueSnackbar('Equipment Details updated successfully', { variant: 'success' });
                navigate('/dashboard/FarmerService');
            } else {
                enqueueSnackbar('Failed to update Equipment Details', { variant: 'error' });
            }
        } catch (error) {
            // Handle errors here if necessary
            console.error('Error updating Equipment Type :', error);
            enqueueSnackbar('An error occurred while updating Equipment Type ', { variant: 'error' });
        }
    });

    return (
        <>
            {
                !toggle &&
                <FormProvider methods={methods} onSubmit={currentEquipment ? onSubmitUpdate : onSubmit}>
                    <Grid container spacing={3}>
                        <Grid xs={12} md={8}>
                            <Card>
                                {!mdUp && <CardHeader title="Details" />}

                                <Stack spacing={3} sx={{ p: 3 }}>
                                    <RHFAutocomplete
                                        name="type"
                                        label="Select Type"
                                        options={sellerType}
                                        getOptionLabel={(option) => option}
                                    />

                                    <Stack spacing={1.5}>
                                        <RHFTextField name="description" fullWidth label="Description" multiline rows={4}
                                            InputLabelProps={{
                                                style: {
                                                    color: theme.palette.mode === 'light' ? 'black' : 'white',
                                                },
                                            }}
                                        />
                                    </Stack>

                                    <Card sx={{}}>
                                        <CardHeader title="Images" />
                                        <CardContent>
                                            <RHFUpload
                                                multiple
                                                thumbnail
                                                disabled={uploadBtn}
                                                name="imageUrl"
                                                maxSize={8388608}
                                                onDrop={handleDropMultiFile}
                                                onRemove={(removedFile) => {
                                                    deleteImage(removedFile);
                                                }}
                                                onRemoveAll={() => {
                                                    deleteImages();
                                                }}
                                                onUpload={() => { uploadImages(values.imageUrl) }}
                                            />
                                        </CardContent>
                                    </Card>
                                </Stack>
                            </Card>
                        </Grid>

                        {mdUp && <Grid md={4} />}
                        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
                            <LoadingButton type="submit" variant="contained" size="large">
                                {currentEquipment ? 'Update' : 'Next'}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </FormProvider>
            }
            {
                toggle &&
                <FormProvider methods={detailsMethod} onSubmit={currentEquipment ? onSubmitUpdateDetails : onSubmitDetails}>
                    <Grid container spacing={3}>
                        <Grid xs={12} md={8}>
                            <Card>
                                {!mdUp && <CardHeader title="Details" />}

                                <Stack spacing={3} sx={{ p: 3 }}>
                                    <RHFAutocomplete
                                        name="condition"
                                        label="Select Condition"
                                        options={combineHarvesterConditions}
                                        getOptionLabel={(option) => option}
                                    />

                                    <RHFAutocomplete
                                        name="brand"
                                        label="Select Brand"
                                        options={modernAgricultureTools}
                                        getOptionLabel={(option) => option}
                                    />

                                    <RHFAutocomplete
                                        name="model"
                                        label="Select Model"
                                        options={sellerType}
                                        getOptionLabel={(option) => option}
                                    />

                                    <DatePicker
                                        views={['year']}
                                        label="Year of Purchase"
                                        value={value.yearOfPurchase}
                                        onChange={(newValue) => {
                                            setDetailsValue('yearOfPurchase', newValue);
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                margin: 'normal',
                                            },
                                        }}
                                    />

                                    <RHFTextField
                                        name="price"
                                        label="Price"
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.mode === 'light' ? 'black' : 'white',
                                            },
                                        }}
                                    />

                                    <RHFAutocomplete
                                        name="state"
                                        label="Select State"
                                        options={statesOfIndia}
                                        getOptionLabel={(option) => option}
                                    />

                                    <RHFTextField
                                        name="district"
                                        label="District"
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.mode === 'light' ? 'black' : 'white',
                                            },
                                        }}
                                    />

                                    <RHFTextField
                                        name="city"
                                        label="City"
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.mode === 'light' ? 'black' : 'white',
                                            },
                                        }}
                                    />

                                    <RHFTextField
                                        name="tehsil"
                                        label="Tehsil"
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.mode === 'light' ? 'black' : 'white',
                                            },
                                        }}
                                    />

                                    <RHFTextField
                                        name="zipCode"
                                        label="Zip Code"
                                        InputLabelProps={{
                                            style: {
                                                color: theme.palette.mode === 'light' ? 'black' : 'white',
                                            },
                                        }}
                                    />

                                    <DatePicker
                                        label="Listing Date"

                                        onChange={(newValue) => {
                                            setDetailsValue('dateListed', newValue);
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                margin: 'normal',
                                            },
                                        }}
                                    />

                                </Stack>
                            </Card>
                        </Grid>

                        {mdUp && <Grid md={4} />}
                        <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
                            <LoadingButton type="submit" variant="contained" size="large">
                                {
                                    currentEquipment ? 'Update Equipment' : 'Create Equipment'
                                }
                            </LoadingButton>
                        </Grid>
                    </Grid>
                </FormProvider>
            }
        </>
    );
}

FarmerDetailsForm.propTypes = {
    currentEquipment: PropTypes.object,
    currentEquipmentDetail: PropTypes.object
};
