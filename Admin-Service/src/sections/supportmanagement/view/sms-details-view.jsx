import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetRemark, useGetSmsById } from 'src/api/sms';

import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import { useLightBox } from 'src/components/lightbox';
import EmptyContent from 'src/components/empty-content';
// import { TextareaAutosize } from '@mui/material';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import SmsCommentForm from '../sms-post-from';
import SmsCommentList from '../sms-comment-list';
import SmsDetailsHero from '../sms-details-hero';
import BannerBlurImg from './assets/overlay_2.jpg';

// ----------------------------------------------------------------------

export default function SmsDetailsView({ id }) {
  const { remark } = useGetRemark();
  const { sms, smsError } = useGetSmsById(id);
  const [smsData, setSmsData] = useState({});
  const [remarkData, setremarkData] = useState([]);

  useEffect(() => {
    if (sms && sms.data) {
      setSmsData(sms.data);
    }
  }, [sms]);

  useEffect(() => {
    if (remark && remark.data) {
      setremarkData(remark.data);
    }
  }, [remark]);

  // const imgArr = smsData.issue_image_url?.split(',').filter(Boolean) || [];

  // const slides = imgArr.map((url, idx) => ({
  //   src: url,
  //   title: 'Receipt',
  //   description: `Receipt Image: ${parseInt(idx, 10) + 1}`,
  // }));
  const lightbox = useLightBox();
  // const lightbox = useLightBox(slides);

  const renderError = (
    <EmptyContent
      filled
      title={`${smsError?.message}`}
      action={
        <Button
          component={RouterLink}
          href={paths.sms}
          startIcon={<Iconify icon="eva:arrow-ios-back-fill" width={16} />}
          sx={{ mt: 3 }}
        >
          Back to List
        </Button>
      }
      sx={{ py: 10 }}
    />
  );

  const renderSms = sms && (
    <>
      <SmsDetailsHero title="SUPPORT TICKET DETAILS" coverUrl={BannerBlurImg} />
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
              name: 'Support ticket',
              href: paths.dashboard.sms.root,
            },
            {
              name: 'Details',
              href: paths.sms,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Service Name</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.service_name}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Custmer:</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.customer_id}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Title:</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.issue_title}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Description:</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.issue_description}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.issue_status}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Priority:</Typography>
              <Typography sx={{ ml: 1 }}> {smsData?.priority}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Assign To:</Typography>
              <Typography sx={{ ml: 1 }}>hhj</Typography>
              {/* smsData?.assignee_id  */}
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
          <Divider sx={{ mt: 3, mb: 3 }} />
          <Typography sx={{ mr: 1, minWidth: 180 }}>Images:</Typography>
        </Stack>

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
                {/* {slides.map((slide) => {
                  const thumbnail = slide.src; */}

                {/* return ( */}
                <Image
                  // key={i}
                  alt="image"
                  src={smsData?.issue_image_url?.preview}
                  ratio="1/1"
                  onClick={() => lightbox.onOpen()}
                  sx={{
                    borderRadius: 1,
                    boxShadow: '0 0 8px gray',
                    cursor: 'pointer',
                  }}
                />
                {/* ); */}
                {/* // })} */}
              </Box>
            </Grid>
          </Grid>
        </Card>

        <Divider sx={{ mt: 4, mb: 2 }} />

        <Box spacing={3.5} sx={{ p: 3, maxWidth: 750, mt: 1, mx: 'auto' }}>
          <Stack direction="row" sx={{ mb: 2, mt: 5 }}>
            <Typography variant="h4">Remark</Typography>

            {/* <Typography variant="subtitle2" sx={{ color: 'text.disabled' }}>
            {/* ({post?.comments.length})555 */}
            {/* </Typography> */}
          </Stack>

          <SmsCommentForm />

          <Divider sx={{ mt: 5, mb: 2 }} />
          <SmsCommentList comments={remarkData} />
        </Box>
      </Container>
    </>
  );

  return (
    <>
      {smsError && renderError}

      {sms && renderSms}
    </>
  );
}

SmsDetailsView.propTypes = {
  id: PropTypes.string,
};
