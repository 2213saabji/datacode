import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { useForm } from 'react-hook-form';

import { yupResolver } from '@hookform/resolvers/yup';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from 'src/components/iconify';
import { useSnackbar } from 'src/components/snackbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import { createUserSocialLink, UpdateUserSocialMedia } from 'src/api/user';
import { useMemo, useState, useEffect } from 'react';
import { useAuthContext } from 'src/auth/hooks';
import { Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';


// ----------------------------------------------------------------------

export default function AccountSocialLinks({currentSocial}) {
  console.log("currentSocial", currentSocial)

  const { enqueueSnackbar } = useSnackbar();
  const { user } = useAuthContext();
  const navigate = useNavigate();



  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const SocialMediaSchema = Yup.object().shape({
    facebokLink: Yup.string(),
    instagramLink: Yup.string(),
    xLink: Yup.string(),
    linkedinLink: Yup.string(),
    youtubeLink: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      facebokLink: currentSocial?.data?.facebokLink || '' ,
      instagramLink: currentSocial?.data?.instagramLink || '',
      xLink: currentSocial?.data?.xLink || '',
      linkedinLink: currentSocial?.data?.linkedinLink || '',
      youtubeLink: currentSocial?.data?.youtubeLink || '',
    }),
    [currentSocial]
  );

  const methodsSocialMedia = useForm({
    resolver: yupResolver(SocialMediaSchema),
    defaultValues,
  });

  const {
    handleSubmit: handleSubmitSocialMedia,
    reset: resetProfile,
    setValue,
    formState: { errors },
  } = methodsSocialMedia;

  useEffect(() => {
    // Check if the user already has social media links
    if (currentSocial && currentSocial?.data) {
      setIsUpdateMode(true);
      resetProfile(currentSocial?.data); // Assuming `user.socialMediaLinks` has the existing social links
    } else {
      resetProfile(defaultValues);
    }
  }, [defaultValues, currentSocial, resetProfile]);

  const onSubmit = async (data) => {
    try {
      let response;
      if (isUpdateMode) {
        response = await UpdateUserSocialMedia(currentSocial?.data?.socialMediaLinksId, data, user?.accessToken);
        if (response) {
          enqueueSnackbar('Social Media Profile updated successfully', { variant: 'success' });
          navigate(`/dashboard/user/profile`);
        }
      } else {
        response = await createUserSocialLink(data, user?.userId, user?.accessToken);
        if (response) {
          enqueueSnackbar('Social Media Profile created successfully', { variant: 'success' });
          navigate(`/dashboard/user/profile`);
        }
      }
    } catch (error) {
      console.error('Error submitting social profile:', error);
      enqueueSnackbar('An error occurred while saving Social Media Profile', { variant: 'error' });
    }
  };

  return (
    <FormProvider methods={methodsSocialMedia} onSubmit={handleSubmitSocialMedia(onSubmit)}>
      <Stack component={Card} spacing={3} sx={{ p: 3 }}>
        <RHFTextField
          name="facebokLink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start"  >
                <Iconify icon="mdi:facebook" width={24} height={24} />
                <Typography sx={{ ml: 1 }}>https://</Typography>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="instagramLink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start" >
                <Iconify icon="mdi:instagram" width={24} height={24} />
                <Typography sx={{ ml: 1 }}>https://</Typography>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="xLink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="mdi:twitter" width={24} height={24} />
                <Typography sx={{ ml: 1 }}>https://</Typography>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="linkedinLink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="mdi:linkedin" width={24} height={24} />
                <Typography sx={{ ml: 1 }}>https://</Typography>
              </InputAdornment>
            ),
          }}
        />

        <RHFTextField
          name="youtubeLink"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Iconify icon="mdi:youtube" width={24} height={24} />
                <Typography sx={{ ml: 1 }}>https://</Typography>
              </InputAdornment>
            ),
          }}
        />

        <LoadingButton type="submit" variant="contained" sx={{ ml: 'auto' }}>
          {currentSocial ? "Save Social Profile" : "Add Social Profile"}
        </LoadingButton>
      </Stack>
    </FormProvider>
  );
}

AccountSocialLinks.propTypes = {
  currentSocial: PropTypes.object,
};