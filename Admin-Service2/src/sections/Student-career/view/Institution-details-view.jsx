import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { Box, Typography } from '@mui/material';
// import { Link } from 'react-router-dom';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetSchoolDetail } from 'src/api/Institution/schoolDetails';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Lightbox, { useLightBox } from 'src/components/lightbox';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import StudentDetailsHero from '../party-details-hero';

// ----------------------------------------------------------------------

export default function InstitutionDetailsView({ id }) {
  const { school, schoolError } = useGetSchoolDetail(id);
  const [schoolData, setSchoolData] = useState({});

  useEffect(() => {
    if (school && school.data) {
      setSchoolData(school.data);
    }
  }, [school]);

  const imgArr = Object.entries(schoolData?.imageUrl ? schoolData?.imageUrl : {}).map(
    ([key, value]) => ({ key, value })
  );

  const slides = imgArr.map((image, idx) => ({
    src: image.value,
    title: image.key,
  }));

  const lightbox = useLightBox(slides);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${schoolError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.ward}
            startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
            sx={{ mt: 3 }}
          >
            Back to List
          </Button>
        }
        sx={{ py: 10 }}
      />
    </Container>
  );

  const renderPost = (
    <>
      <StudentDetailsHero title="SCHOOL DETAILS" />

      <Container
        maxWidth={false}
        sx={{
          py: 3,
          mb: 5,
          borderBottom: (theme) => `solid 1px ${theme.palette.divider}`,
        }}
      >
        <CustomBreadcrumbs
          links={[
            {
              name: 'School',
              href: paths.dashboard.StudentCareer.root,
            },
            {
              name: 'Details',
              href: paths.school,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Name of Board:</Typography>
              <Typography sx={{ ml: 1 }}> {schoolData?.board}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Grades Offered:</Typography>
              <Typography sx={{ ml: 1 }}> {schoolData?.gradesOffered}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Hostel Facility:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {schoolData?.hostelFacility === true ? 'Yes' : 'No'}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Fee Category:</Typography>
              <Typography sx={{ ml: 1 }}> {schoolData?.feeCategory}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Fee Structure:</Typography>
              <Typography sx={{ ml: 1 }}> {schoolData?.feeStructure}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}> Extracurricular Activities:</Typography>
              <Typography sx={{ ml: 1 }}> {schoolData?.extracurricularActivities}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
            <Typography sx={{ mr: 1, minWidth: 180 }}>Image:</Typography>
            {imgArr.length === 0 ? <Typography sx={{ ml: 1 }}>not provided</Typography> : null}
          </Stack>
        </Stack>

        {imgArr.length !== 0 ? (
          <Card sx={{ p: 3, maxWidth: 720, mt: 2, mx: 'auto' }}>
            <Grid spacing={3}>
              <Grid xs={12} md={9}>
                <Box
                  gap={3}
                  display="grid"
                  gridTemplateColumns={{
                    xs: 'repeat(2, 1fr)',
                    sm: 'repeat(3, 1fr)',
                    md: 'repeat(4, 1fr)',
                  }}
                >
                  {slides.map((slide) => {
                    const thumbnail = slide.src;

                    return (
                      <Image
                        key={thumbnail}
                        alt={thumbnail}
                        src={thumbnail}
                        ratio="1/1"
                        onClick={() => lightbox.onOpen(`${thumbnail}`)}
                        sx={{
                          borderRadius: 1,
                          boxShadow: '0 0 8px gray',
                          cursor: 'pointer',
                        }}
                      />
                    );
                  })}
                </Box>
              </Grid>
            </Grid>
          </Card>
        ) : null}
      </Container>

      <Lightbox
        open={lightbox.open}
        close={lightbox.onClose}
        slides={slides}
        index={lightbox.selected}
        disabledZoom={false}
        disabledTotal={false}
        disabledVideo={false}
        disabledCaptions={false}
        disabledSlideshow={false}
        disabledThumbnails={false}
        disabledFullscreen={false}
      />
    </>
  );
  return (
    <>
      {/* {postLoading && renderSkeleton} */}

      {schoolError && renderError}

      {school && renderPost}
    </>
  );
}
InstitutionDetailsView.propTypes = {
  id: PropTypes.string,
};
