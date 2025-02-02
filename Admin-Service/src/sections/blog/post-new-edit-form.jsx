import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import imageCompression from 'browser-image-compression';
import { useMemo, useState, useEffect, useCallback } from 'react';

import Chip from '@mui/material/Chip';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Switch from '@mui/material/Switch';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/use-boolean';
import { useResponsive } from 'src/hooks/use-responsive';

import {
  uploadBlogFileInAWSS3,
  uploadblogFilesInAWSS3,
  deleteBlogFileFromAWSS3,
} from 'src/utils/aws-s3-file-handler';

import { _tags } from 'src/_mock';

import { useSnackbar } from 'src/components/snackbar';
import FormProvider, {
  RHFEditor,
  RHFUpload,
  RHFTextField,
  RHFAutocomplete,
} from 'src/components/hook-form';

import { createBlog, updateBlog } from '../../api/blog';
import PostDetailsPreview from './post-details-preview';

// ----------------------------------------------------------------------

export default function PostNewEditForm({ currentPost }) {
  const router = useRouter();
  const [check, setcheck] = useState(true);
  const mdUp = useResponsive('up', 'md');
  const { enqueueSnackbar } = useSnackbar();

  const preview = useBoolean();

  const NewBlogSchema = Yup.object().shape({
    postTitle: Yup.string().required('Title is required'),
    description: Yup.string().required('Description is required'),
    content: Yup.string().required('Content is required'),
    coverImageDetails: Yup.mixed().nullable().required('Cover is required'),
    tag: Yup.array().min(2, 'Must have at least 2 tag'),
    metaKeyword: Yup.array().min(1, 'Meta keywords is required'),
    // not required
    metaTitle: Yup.string(),
    metaDescription: Yup.string(),
  });

  const defaultValues = useMemo(
    () => ({
      status: currentPost?.data[0]?.status || check ? 'published' : 'draft',
      postTitle: currentPost?.data[0]?.postTitle || '',
      description: currentPost?.data[0]?.description || '',
      content: currentPost?.data[0]?.content || '',
      contentImageDetails: currentPost?.data[0]?.contentImageDetails || [],
      coverImageDetails: currentPost?.data[0]?.coverImageDetails?.preview || null,
      tag: currentPost?.data[0]?.tag || [],
      metaKeyword: currentPost?.data[0]?.metaKeyword || [],
      metaTitle: currentPost?.data[0]?.metaTitle || '',
      metaDescription: currentPost?.data[0]?.metaDescription || '',
    }),
    [currentPost, check]
  );

  const methods = useForm({
    resolver: yupResolver(NewBlogSchema),
    defaultValues,
  });

  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;

  const values = watch();

  useEffect(() => {
    if (currentPost) {
      reset(defaultValues);
      constructImgUrl(currentPost.data[0]?.contentImageDetails);
    }
  }, [currentPost, defaultValues, reset]);
  const [imageUrlsState, setImageUrlsState] = useState({});

  const constructImgUrl = (data) => {
    const constructed = data
      ? data.reduce((acc, image, index) => {
          const fileName = `image_${Date.now()}_${index}.${image.type.split('/')[1]}`;
          acc[fileName] = image;
          return acc;
        }, {})
      : {};
    setImageUrlsState(constructed);
  };

  const base64ToFile = (base64String, filename) => {
    const arr = base64String.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    const n = bstr.length;
    const u8arr = new Uint8Array(n);

    for (let i = 0; i < n; i += 1) {
      u8arr[i] = bstr.charCodeAt(i);
    }

    return new File([u8arr], filename, { type: mime });
  };

  const processImagesInHtml = async (htmlString) => {
    const imgTagRegex = /<img.*?src=["'](data:image\/(.*?);base64,.*?)["'].*?>/g;
    const matches = [...htmlString.matchAll(imgTagRegex)];

    if (matches.length === 0) {
      return htmlString; // Return the original HTML if no images are found
    }

    let updatedContent = htmlString;
    const newImageUrls = { ...imageUrlsState }; // Store full results of uploadImage/uploadImages

    // Gather files to upload
    const filesToUpload = [];
    const fileNameToBase64Map = {};

    matches.forEach((match, index) => {
      const base64Data = match[1];
      const fileType = base64Data.match(/data:image\/(.*?);base64/)[1];
      const fileName = `image_${Date.now()}_${index}.${fileType}`; // Generate a unique filename

      // Check if the filename already exists in newImageUrls
      const existingEntry = newImageUrls[fileName];

      if (existingEntry) {
        // If the image has already been converted, use the stored S3 URL
        updatedContent = updatedContent.replace(base64Data, existingEntry.preview);
      } else {
        const file = base64ToFile(base64Data, fileName);

        filesToUpload.push(file);
        fileNameToBase64Map[fileName] = base64Data; // Map filename to base64 data for later replacement
      }
    });

    if (filesToUpload.length > 0) {
      let uploadResults;

      if (filesToUpload.length === 1) {
        const result = await uploadImage(filesToUpload[0]);
        uploadResults = [result];
      } else {
        uploadResults = await uploadImages(filesToUpload);
      }

      uploadResults.forEach((result, index) => {
        const fileName = filesToUpload[index].name;
        const base64Data = fileNameToBase64Map[fileName];

        // Replace base64 with S3 URL in HTML content
        updatedContent = updatedContent.replace(base64Data, result.preview);

        // Store all returned values except base64Data in newImageUrls
        newImageUrls[fileName] = result;
      });
    }

    // Identify deleted images
    const currentImageUrls = Object.values(newImageUrls).map((image) => image.preview);
    const initialImageUrls = values.contentImageDetails.map((image) => image.preview);

    const deletedImages = initialImageUrls.filter((url) => !currentImageUrls.includes(url));

    // Delete removed images from S3
    await Promise.all(deletedImages.map((url) => deleteImage({ preview: url })));

    // Update state with the new image URLs
    setImageUrlsState(newImageUrls);

    // Store all values from newImageUrls in contentImageDetails, removing base64Data key
    const contentImageDetails = Object.values(newImageUrls).map(({ base64Data, ...rest }) => rest);

    setValue('contentImageDetails', contentImageDetails);

    return updatedContent;
  };

  const deleteImage = async ({ url }) => {
    try {
      const dataToSend = { url };
      await deleteBlogFileFromAWSS3(dataToSend);
    } catch (error) {
      console.error('Error deleting image:', error);
      enqueueSnackbar('Error while deleting image', { variant: 'error' });
    }
  };
  let bool = true;
  const onSubmit = handleSubmit(async (data) => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 2000);

        const updatedContent = await processImagesInHtml(values.content);
        await setValue('content', updatedContent);
        const formdata = { ...data, status: check ? 'published' : 'draft' };
        const response = createBlog(formdata);
        response.then((dataa) => {
          reset();
          preview.onFalse();
          if (dataa.statusText === 'OK' && dataa.status === 200) {
            enqueueSnackbar(currentPost ? 'Update success!' : 'Create success!');
            router.push(paths.dashboard.blog.root);
          }
        });
      }
    } catch (error) {
      console.error(error);
    }
  });

  const onUpdate = handleSubmit(async (data) => {
    try {
      const updatedContent = await processImagesInHtml(values.content);
      await setValue('content', updatedContent);
      const formdata = { ...data, status: check ? 'published' : 'draft' };
      const response = updateBlog(formdata, currentPost?.data[0]?.blogId);
      response.then((dataa) => {
        reset();
        preview.onFalse();
        if (dataa.statusText === 'OK' && dataa.status === 200) {
          enqueueSnackbar(currentPost ? 'Update success!' : 'Create success!');
          router.push(paths.dashboard.blog.root);
        }
      });
    } catch (error) {
      console.error(error);
    }
  });

  const uploadImage = useMemo(
    () => async (file) => {
      try {
        const compressedFile = await imageCompression(file, {
          maxSizeMB: 0.5, // Adjust maximum size as needed
          maxWidthOrHeight: 800, // Adjust maximum width or height as needed
        });

        const formData = new FormData();
        formData.append('image', compressedFile);

        const response = await uploadBlogFileInAWSS3(formData);
        const imageUrl = response.data && response.data.data ? response?.data?.data : {};
        return imageUrl;
      } catch (error) {
        console.error('Error compressing image:', error);
        enqueueSnackbar('Error while compressing image', { variant: 'error' });
        return error;
      }
    },
    [enqueueSnackbar]
  );

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
        // Create a new Blob object with the compressed file content and type
        const blob = new Blob([compressedFile], { type: compressedFile.type });
        // Create a new File object with the Blob and original filename
        const newFile = new File([blob], compressedFile.name, { type: compressedFile.type });
        formData.append('images', newFile);
      });

      const response = await uploadblogFilesInAWSS3(formData);
      const imageUrls =
        response.data && response.data.data && response.data.data.length
          ? response?.data?.data
          : [];

      return imageUrls;
    } catch (error) {
      console.error('Error compressing/uploading images:', error);
      enqueueSnackbar('Error while compressing/uploading images', { variant: 'error' });
      return error;
    }
  };

  const handleDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[0];

      const newFile = Object.assign(file, {
        preview: URL.createObjectURL(file),
      });

      if (file) {
        const imageUrl = await uploadImage(newFile);
        if (Object.keys(imageUrl).length > 0) {
          setValue('coverImageDetails', imageUrl);
          enqueueSnackbar('Uploaded successfully', { variant: 'success' });
        } else {
          console.error('Error in uploading file:', imageUrl);
          enqueueSnackbar('Error while uploading', { variant: 'error' });
        }
      }
    },
    [uploadImage, setValue, enqueueSnackbar]
  );

  const handleRemoveFile = useCallback(async () => {
    const dataToSend = { url: values.coverImageDetails.preview };
    await deleteBlogFileFromAWSS3(dataToSend)
      .then((data) => {
        setValue('coverImageDetails', null);
        enqueueSnackbar('Deleted successfully', { variant: 'success' });
      })
      .catch((err) => {
        console.error('Error in deleting files:', err);
        enqueueSnackbar('Error while deleting', { variant: 'error' });
      });
  }, [setValue, enqueueSnackbar, values]);

  function handlePublishToggleChange(e) {
    const status = e.target.checked;
    setcheck(status);
  }

  const renderDetails = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Details
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Title, short description, image...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Details" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFTextField name="postTitle" label="Post Title" />

            <RHFTextField name="description" label="Description" multiline rows={3} />

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Content</Typography>
              <RHFEditor simple name="content" />
            </Stack>

            <Stack spacing={1.5}>
              <Typography variant="subtitle2">Cover</Typography>
              <RHFUpload
                name="coverImageDetails"
                maxSize={8388608}
                onDrop={handleDrop}
                onDelete={handleRemoveFile}
              />
            </Stack>
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderProperties = (
    <>
      {mdUp && (
        <Grid md={4}>
          <Typography variant="h6" sx={{ mb: 0.5 }}>
            Properties
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional functions and attributes...
          </Typography>
        </Grid>
      )}

      <Grid xs={12} md={8}>
        <Card>
          {!mdUp && <CardHeader title="Properties" />}

          <Stack spacing={3} sx={{ p: 3 }}>
            <RHFAutocomplete
              name="tag"
              label="Tags"
              placeholder="+ Tags"
              multiple
              freeSolo
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            <RHFTextField name="metaTitle" label="Meta title" />

            <RHFTextField
              name="metaDescription"
              label="Meta description"
              fullWidth
              multiline
              rows={3}
            />

            <RHFAutocomplete
              name="metaKeyword"
              label="Meta keywords"
              placeholder="+ Keywords"
              multiple
              freeSolo
              disableCloseOnSelect
              options={_tags.map((option) => option)}
              getOptionLabel={(option) => option}
              renderOption={(props, option) => (
                <li {...props} key={option}>
                  {option}
                </li>
              )}
              renderTags={(selected, getTagProps) =>
                selected.map((option, index) => (
                  <Chip
                    {...getTagProps({ index })}
                    key={option}
                    label={option}
                    size="small"
                    color="info"
                    variant="soft"
                  />
                ))
              }
            />

            {/* <FormControlLabel control={<Switch defaultChecked />} label="Enable comments" /> */}
          </Stack>
        </Card>
      </Grid>
    </>
  );

  const renderActions = (
    <>
      {mdUp && <Grid md={4} />}
      <Grid xs={12} md={8} sx={{ display: 'flex', alignItems: 'center' }}>
        <FormControlLabel
          onChange={(e) => {
            handlePublishToggleChange(e);
          }}
          control={<Switch defaultChecked />}
          label="Published"
          sx={{ flexGrow: 1, pl: 3 }}
        />

        <Button
          color="inherit"
          variant="outlined"
          size="large"
          onClick={async () => {
            const converted = await processImagesInHtml(values.content);
            await setValue('content', converted);
            preview.onTrue();
          }}
        >
          Preview
        </Button>

        <LoadingButton
          type="submit"
          variant="contained"
          size="large"
          loading={isSubmitting}
          sx={{ ml: 2 }}
        >
          {!currentPost ? 'Create Post' : 'Save Changes'}
        </LoadingButton>
      </Grid>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={currentPost ? onUpdate : onSubmit}>
      <Grid container spacing={3}>
        {renderDetails}

        {renderProperties}

        {renderActions}
      </Grid>

      <PostDetailsPreview
        postTitle={values.postTitle}
        content={values.content}
        description={values.description}
        coverImageDetails={
          typeof values.coverImageDetails === 'string'
            ? values.coverImageDetails
            : `${values.coverImageDetails?.preview}`
        }
        //
        open={preview.value}
        isValid={isValid}
        isSubmitting={isSubmitting}
        onClose={preview.onFalse}
        onSubmit={currentPost ? onUpdate : onSubmit}
      />
    </FormProvider>
  );
}

PostNewEditForm.propTypes = {
  currentPost: PropTypes.object,
};
