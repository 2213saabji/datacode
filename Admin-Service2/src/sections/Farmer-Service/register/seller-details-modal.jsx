import PropTypes from 'prop-types';
import { useMemo, useState, useEffect, useCallback } from 'react';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Tab, Tabs, Modal, Button, useTheme, Typography, tabsClasses } from '@mui/material';


import { uploadUserFileInAWSS3, deleteUserFileFromAWSS3 } from 'src/utils/aws-s3-file-handler';

import { sellerType } from 'src/_mock';
import { INDIAN_CITIES } from 'src/_mock/map/city';
import { statesOfIndia } from 'src/_mock/map/states';
import { useGetSeller, createSellerDetails } from 'src/api/agriculture/sellerDetails';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

export default function SellerDetailsModal({ approvedSellerOwner}) {

    const [isModalOpen, setIsModalOpen] = useState(true);

    const handleModalClose = () => {
        setIsModalOpen(true);
    };

    const PartySchema = Yup.object().shape({
        companyName: Yup.string().required('Company name is required'),
        contactPerson: Yup.string().required('contact Person name is required'),
        contactNumber: Yup.number().required('Contact Number is required'),
        establishedYear: Yup.mixed().required('Year of Manufacture is required'),
        sellerType: Yup.string().required('Seller type is required'),
        address: Yup.string().required('Address is required'),
        city: Yup.string().required('City is required'),
        state: Yup.string().required('State is required'),
        postalCode: Yup.number().required('Postal code is required'),
        email: Yup.string().required('Email is required'),
        website: Yup.string().required('Website is required'),
        aboutUs: Yup.string().required('AboutUs is required'),
        logo: Yup.string().required('Image is required'),
    });

    // Form Values
    const defaultValues = {
        sellerOwnerId: null,
        companyName: '',
        contactPerson: '',
        contactNumber: null,
        establishedYear: null,
        sellerType: '',
        postalCode: null,
        email: '',
        website: '',
        aboutUs: '',
        logo: '',
    };

    const { enqueueSnackbar } = useSnackbar();

    // const userLocation = user?.UserAddressesses?.[0]

    // Form Method
    const methods = useForm({
        resolver: yupResolver(PartySchema),
        defaultValues,
    });
    const {
        reset,
        handleSubmit,
        setValue,
        watch,
        formState: { isSubmitting },
    } = methods;

    const values = watch();

    // for user profile image
    const uploadImage = useMemo(
        () => async (file) => {
            try {
                const compressedFile = await imageCompression(file, {
                    maxSizeMB: 0.5, // Adjust maximum size as needed
                    maxWidthOrHeight: 800, // Adjust maximum width or height as needed
                });

                const formData = new FormData();
                formData.append('image', compressedFile);

                const response = await uploadUserFileInAWSS3(formData);
                const imageUrl = response?.data?.data?.preview || '';

                if (imageUrl) {
                    setValue('logo', imageUrl);
                    enqueueSnackbar(' Image Upload Successfully', { variant: 'success' });
                } else {
                    console.error('Error in uploading file:', response);
                    enqueueSnackbar('Error while uploading', { variant: 'error' });
                }
            } catch (error) {
                console.error('Error compressing image:', error);
                enqueueSnackbar('Error while compressing image', { variant: 'error' });
            }
        },
        [setValue, enqueueSnackbar]
    );

    const handleDropTractorPicture = useCallback(
        (acceptedFiles) => {
            const file = acceptedFiles[0];

            const newFile = Object.assign(file, {
                preview: URL.createObjectURL(file),
            });
            if (file) {
                uploadImage(newFile);
            }
        },
        [uploadImage]
    );

    const handleRemoveFile = useCallback(async () => {
        const dataToSend = {
            url: values.logo,
        };
        await deleteUserFileFromAWSS3(dataToSend)
            .then((data) => {
                setValue('logo', null);
                // console.log(data);
                enqueueSnackbar('Deleted successfully', { variant: 'success' });
            })
            .catch((err) => {
                console.error('Error in deleting files:', err);
                enqueueSnackbar('Error while deleting', { variant: 'error' });
            });
    }, [setValue, enqueueSnackbar, values.logo]);

    // Function Call for New Ward Profile
    const onSubmit = handleSubmit(async (data) => {
        try {
            const updatedData = {
                ...data,
                sellerOwnerId: approvedSellerOwner?.userId,
                imageUrl: {
                    logo: data.logo,
                },
                // state: userLocation?.userState || 'NA',
                // city: userLocation?.userCity || 'NA',
                // postalCode: userLocation?.postalCode || 'NA',
                // contactNumber: user?.phone || 'NA',
            };
            const response = await createSellerDetails(updatedData);
            if (response) {
                enqueueSnackbar('Seller details added successfully', { variant: 'success' });
                localStorage.setItem('sellerDetails', JSON.stringify(response?.data));
                localStorage.setItem('sellerDetails', JSON.stringify(response?.data));
                setIsModalOpen(false);
            } else {
                enqueueSnackbar('Failed to add Seller details', { variant: 'error' });
            }
        } catch (error) {
            console.error('Error submitting Seller details:', error);
            enqueueSnackbar('An error occurred while adding Seller details', { variant: 'error' });
        }
    });

    return (
        <Modal
            open={isModalOpen}
            onClose={handleModalClose}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 500,
                    height: 600,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    borderRadius: 2,
                    overflow: 'auto',
                    '&::-webkit-scrollbar': {
                        width: '0px',
                    },
                }}
            >
                <FormProvider methods={methods} onSubmit={onSubmit}>
                    <Grid xs={12} md={8}>
                        <Card sx={{ p: 3 }}>
                            <Stack spacing={3} sx={{ p: 3 }}>
                                <RHFTextField name="companyName" label="Company Name" />
                                <RHFTextField name="contactPerson" label="Contact Person" />
                                <RHFTextField name="contactNumber" label="Contact Number" />
                                <RHFTextField name="email" label="Email" />
                                <RHFTextField name="postalCode" label="Postal Code" />
                                <RHFTextField name="address" label="Address" />
                                <RHFAutocomplete
                                    name="state"
                                    label="State"
                                    fullWidth
                                    options={statesOfIndia.map((option) => option)}
                                    getOptionLabel={(option) => option}
                                />

                                <RHFAutocomplete
                                    name="city"
                                    label="City"
                                    fullWidth
                                    options={INDIAN_CITIES.map((option) => option)}
                                    getOptionLabel={(option) => option}
                                />

                                <RHFAutocomplete
                                    name="sellerType"
                                    label="Seller Type"
                                    fullWidth
                                    options={sellerType.map((option) => option)}
                                    getOptionLabel={(option) => option}
                                />

                                <DatePicker
                                    views={['year']}
                                    label="establishedYear"
                                    value={values.establishedYear}
                                    onChange={(newValue) => {
                                        setValue('establishedYear', newValue);
                                    }}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            margin: 'normal',
                                        },
                                    }}
                                />

                                <RHFTextField name="website" label="Website" />

                                <RHFTextField name="aboutUs" fullWidth label="About Us" multiline rows={4} />

                                <Stack spacing={1.5}>
                                    <Typography variant="subtitle2">Company Logo</Typography>
                                    <RHFUpload
                                        name="logo"
                                        maxSize={8388608}
                                        onDrop={handleDropTractorPicture}
                                        onDelete={handleRemoveFile}
                                    />
                                </Stack>
                            </Stack>

                            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
                                <LoadingButton
                                    type="submit"
                                    variant="contained"
                                    size="large"
                                    loading={isSubmitting}
                                >
                                    Add Seller Details
                                </LoadingButton>
                            </Stack>
                        </Card>
                    </Grid>
                </FormProvider>
            </Box>
        </Modal>
    )
}

SellerDetailsModal.propTypes = {
    approvedSellerOwner: PropTypes.object,
  };