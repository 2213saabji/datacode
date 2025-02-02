import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo, useEffect, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { deleteFileFromAWSS3, uploadclaimFileInAWSS3 } from 'src/utils/aws-s3-file-handler';

import { Party_Name } from 'src/_mock';
import { useGetElections } from 'src/api/election';
import { useGetPartyAlliances } from 'src/api/party_alliance';
import { createPartyProfile, UpdatePartyProfile } from 'src/api/party';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFUpload, RHFTextField, RHFAutocomplete } from 'src/components/hook-form';

// ----------------------------------------------------------------------

export default function PartyNewEditForm({ currentParty }) {
  // Required Variablesgthdtxtrrsedsr
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const partyId = currentParty?.data.partyId;

  // fetching the election List

  const { elections: electionsList } = useGetElections();

  const ElectionListArr = electionsList?.data || [];

  const ElectionData = ElectionListArr.map((list) => ({
    value: list.electionId,
    label: list.electionTitle,
  }));

  const ElectionListDataForOptions = ElectionData.map((option) => option.value);

  // fetching the Party Alliacne List

  const { PartyAlliances: PartyAlliacneList } = useGetPartyAlliances();

  const AllianceListArr = PartyAlliacneList?.data || [];

  const AllianceData = AllianceListArr.map((list) => ({
    value: list.partyAllianceId,
    label: list.partyAllianceName,
  }));

  const AllianceListDataForOptions = AllianceData.map((option) => option.value);

  // Form Validation Schema
  const PartySchema = Yup.object().shape({
    electionId: Yup.number().required('Election is required'),
    partyAllianceId: Yup.number().required('Party Alliance is required'),
    partyName: Yup.string().required('Party Name is required'),
    partyLeader: Yup.string().required('Party Leader is required'),
    partySymbolImageDetails: Yup.object().required('Party Symbol is required'),
    partyFoundationYear: Yup.mixed().required('Foundation Year is required'),
    partyManifesto: Yup.string().required('Party Manifesto is required'),
    partyMembershipCount: Yup.number().required('Party Membership Count is required'),
  });

  // Form Values
  const defaultValues = useMemo(
    () => ({
      electionId: currentParty?.data.electionId || null,
      partyAllianceId: currentParty?.data.partyAllianceId || null,
      partyName: currentParty?.data.partyName || '',
      partyLeader: currentParty?.data.partyLeader || '',
      partySymbolImageDetails: currentParty?.data.partySymbolImageDetails || null,
      partyFoundationYear: currentParty?.data.partyFoundationYear || null,
      partyManifesto: currentParty?.data.partyManifesto || '',
      partyMembershipCount: currentParty?.data.partyMembershipCount || null,
    }),
    [currentParty]
  );

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

  useEffect(() => {
    if (currentParty) {
      reset(defaultValues);
    }
  }, [currentParty, defaultValues, reset]);

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

        const response = await uploadclaimFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response.data.data : {};

        if (imageUrl) {
          setValue('partySymbolImageDetails', imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
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

  const handleDropUserPicture = useCallback(
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
      url: values.partySymbolImageDetails.preview,
    };
    await deleteFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('partySymbolImageDetails', null);
        // console.log(data);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  }, [setValue, enqueueSnackbar, values.partySymbolImageDetails]);

  // Function Call for New Ward Profile
  const onSubmit = handleSubmit(async (data) => {
    try {
      const response = await createPartyProfile(data);
      if (response) {
        enqueueSnackbar('Party created successfully', { variant: 'success' });
        navigate('/dashboard/party');
      } else {
        enqueueSnackbar('Failed to create party', { variant: 'error' });
      }
    } catch (error) {
      console.error('Error submitting party:', error);
      enqueueSnackbar('An error occurred while creating party', { variant: 'error' });
    }
  });

  // Function Call for Updating Ward Profile
  const onSubmitUpdate = handleSubmit(async (data) => {
    try {
      const response = await UpdatePartyProfile(partyId, data);

      if (response) {
        enqueueSnackbar('Party updated successfully', { variant: 'success' });
        navigate(`/dashboard/party/${partyId}`);
      } else {
        enqueueSnackbar('Failed to update party', { variant: 'error' });
      }
    } catch (error) {
      // Handle errors here if necessary
      console.error('Error updating party :', error);
      enqueueSnackbar('An error occurred while updating party ', { variant: 'error' });
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={currentParty ? onSubmitUpdate : onSubmit}>
      <Grid container spacing={3}>
        <Grid xs={12} md={8}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={3} sx={{ p: 3 }}>
              <RHFAutocomplete
                name="electionId"
                label="Choose Election"
                options={ElectionListDataForOptions}
                getOptionLabel={(value) => {
                  const Election = ElectionData.find((option) => option.value === value);
                  return Election ? Election.label : '';
                }}
              />

              <RHFAutocomplete
                name="partyAllianceId"
                label="Party Alliance Name"
                options={AllianceListDataForOptions}
                getOptionLabel={(value) => {
                  const Alliacne = AllianceData.find((option) => option.value === value);
                  return Alliacne ? Alliacne.label : '';
                }}
              />

              <RHFTextField name="partyLeader" label="Party Leader" />

              <RHFAutocomplete
                name="partyName"
                label="Party Name"
                placeholder="Choose a Party Name"
                fullWidth
                options={Party_Name.map((option) => option)}
                getOptionLabel={(option) => option}
              />
              <Stack spacing={1.5}>
                <Typography variant="subtitle2">Party Symbol</Typography>
                <RHFUpload
                  name="partySymbolImageDetails"
                  maxSize={8388608}
                  onDrop={handleDropUserPicture}
                  onDelete={handleRemoveFile}
                />
              </Stack>

              <DatePicker
                views={['year']}
                label="Party Foundation Year"
                value={values.partyFoundationYear}
                onChange={(newValue) => {
                  setValue('partyFoundationYear', newValue);
                }}
                slotProps={{
                  textField: {
                    fullWidth: true,
                    margin: 'normal',
                  },
                }}
              />

              <RHFTextField
                name="partyMembershipCount"
                label="Party Membership Count"
                type="number"
              />

              <Stack spacing={1.5}>
                <RHFTextField
                  name="partyManifesto"
                  fullWidth
                  label="Party Manifesto"
                  multiline
                  rows={4}
                />
              </Stack>
            </Stack>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" size="large" loading={isSubmitting}>
                {!currentParty ? 'Create Party' : 'Save Party'}
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </FormProvider>
  );
}

PartyNewEditForm.propTypes = {
  currentParty: PropTypes.object,
};
