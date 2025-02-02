/* eslint-disable no-unused-vars */
import axios from 'axios';
import PropTypes from 'prop-types';
import { useSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box, Button } from '@mui/material';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';

import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetAllGallery } from 'src/api/gallery';
import { ATTPL_EMS_HOST_API } from 'src/config-global';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/custom-breadcrumbs';

import GalleryPdfs from '../gallery-pdfs';
import GalleryAudio from '../gallery-audio';
import GalleryImages from '../gallery-Images';
import GalleryVideos from '../gallery-videos';

const SPACING = 3;

const TABS = [
  {
    value: 'images',
    label: 'Images',
    icon: <Box width={30} component="img" src="/assets/icons/files/ic_img.svg" />,
    count: 12,
  },
  {
    value: 'media',
    label: 'Media',
    icon: <Box width={30} component="img" src="/assets/icons/files/ic_video.svg" />,
    count: 20,
  },
  {
    value: 'docs',
    label: 'Docs',
    icon: <Box width={30} component="img" src="/assets/icons/files/ic_document.svg" />,
    count: 30,
  },
  {
    value: 'audio',
    label: 'Audio',
    icon: <Box width={30} component="img" src="/assets/icons/files/ic_document.svg" />,
    count: 30,
  },
  // {
  //   value: 'storage',
  //   label: 'Storage',
  //   icon: <Box width={30} component="img" src="/assets/icons/files/ic_document.svg" />,
  //   count: 30,
  // },
];

export default function OverviewGalleryView({ templatedata }) {
  const { user } = useAuthContext();
  const settings = useSettingsContext();
  const [currentTab, setCurrentTab] = useState('images');
  const { enqueueSnackbar } = useSnackbar();

  const { refetch, galleryData } = useGetAllGallery(user?.accessToken);

  const [galleryDataPhotos, setGalleryDataPhotos] = useState([]);
  const [galleryDataVideos, setGalleryDataVideos] = useState([]);
  const [galleryDataPdfs, setGalleryDataPdfs] = useState([]);
  const [galleryDataAudio, setGalleryDataAudio] = useState([]);

  useEffect(() => {
    if (Object.keys(galleryData).length > 0) {
      const filterPhotos = galleryData?.data.filter((item) => item.photo != null);
      const filterVideos = galleryData?.data.filter((item) => item.video != null);
      const filterPdfs = galleryData?.data.filter((item) => item.pdf != null);
      const filterAudio = galleryData?.data.filter((item) => item.audio != null);
      setGalleryDataPhotos(filterPhotos);
      setGalleryDataVideos(filterVideos);
      setGalleryDataPdfs(filterPdfs);
      setGalleryDataAudio(filterAudio);
    }
  }, [galleryData]);

  const handleChangeTab = useCallback(
    (_event, newValue) => {
      setCurrentTab(newValue);
    },
    [setCurrentTab]
  );

  const deleter = async (galleryId) => {
    const url = `${ATTPL_EMS_HOST_API}/gallery/delete/${galleryId}`;
    const headers = {
      headers: {
        Authorization: `Bearer ${user.accessToken}`,
      },
    };
    const res = await axios.delete(url, headers);
    if (res) {
      enqueueSnackbar('Deleted successfully', { variant: 'success' });
      refetch();
    }
    // console.log('res----->', res)
  };

  // Helper function to get breadcrumb name
  const getBreadcrumbName = (tab) => {
    switch (tab) {
      case 'images':
        return 'IMAGES';
      case 'media':
        return 'MEDIA';
      case 'docs':
        return 'DOCS';
      case 'audio':
        return 'AUDIO';
      default:
        return 'GALLERY';
    }
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <Grid container spacing={SPACING} disableEqualOverflow mt={2}>
        <Grid xs={12}>
          <CustomBreadcrumbs
            heading="GALLERY"
            links={[
              {
                name: 'GALLERY',
                // href: paths.dashboard.root,
              },
              {
                name: getBreadcrumbName(currentTab), // Use the helper function here
              },
            ]}
          />

          <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              mb: { xs: 3, md: 5 },
              mt: 5,
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                // icon={<Label icon={tab.icon} />}
                // icon=
                // {
                //   <Label
                //   variant={((tab === 'images' || tab === currentTab) && 'filled') || 'soft'}
                //     color={(tab === 'published' && 'info') || 'default'}
                //   >
                //     {tab.icon}
                //     {/* {tab === 'photo' && posts.filter((post) => post.publish === 'Photo').length} */}
                //     {/* {tab === 'media' && posts.filter((post) => post.publish === 'Media').length} */}
                //     {/* {tab === 'pdf' && posts.filter((post) => post.publish === 'Pdf').length} */}
                //   </Label>
                // }
                label={tab.label}
                sx={{ textTransform: 'capitalize' }}
              />
            ))}
          </Tabs>

          {currentTab === 'images' && (
            <GalleryImages galleryDataPhotos={galleryDataPhotos} deleter={deleter} />
          )}
          {currentTab === 'media' && (
            <GalleryVideos galleryDataVideos={galleryDataVideos} deleter={deleter} />
          )}
          {currentTab === 'docs' && (
            <GalleryPdfs galleryDataPdfs={galleryDataPdfs} deleter={deleter} />
          )}
          {currentTab === 'audio' && (
            <GalleryAudio galleryDataAudio={galleryDataVideos} deleter={deleter} />
          )}
          {/* {currentTab === "storage" && <StorageOverView />} */}
        </Grid>
      </Grid>
    </Container>
  );
}

OverviewGalleryView.propTypes = {
  templatedata: PropTypes.array,
};
