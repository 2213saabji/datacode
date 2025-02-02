import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetContact } from 'src/api/contact';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import BannerBlurImg from './assets/overlay_2.jpg';
import ContactDetailsHero from '../contact-details-hero';

// ----------------------------------------------------------------------

export default function ContactDetailsView({ id }) {
  const { contact, ContactError } = useGetContact(id);
  const [contactData, setContactData] = useState({});

  useEffect(() => {
    if (contact) {
      setContactData(contact.data);
    }
  }, [contact]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${ContactError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.contact}
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

  const renderPost = contact && (
    <>
      <ContactDetailsHero title="Contact Details" coverUrl={BannerBlurImg} />

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
              name: 'Contact',
              href: paths.dashboard.contact.root,
            },
            {
              name: 'Details',
              href: paths.contact,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Name:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.name}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.email}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Email Verified:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.emailVerified ? 'Yes' : 'No'}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone No.:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.mobileNumber}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Phone No. Verified:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {contactData?.mobileNumberVerified ? 'Yes' : 'No'}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Subject:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.subject}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Message:</Typography>
              <Typography sx={{ ml: 1 }}> {contactData?.description}</Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Status:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {contactData?.status === null ? 'No status' : contactData?.status}
              </Typography>
            </Stack>

            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Remark:</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {contactData?.remark === null ? 'No remark' : contactData?.remark}
              </Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {ContactError && renderError}

      {contact && renderPost}
    </>
  );
}
ContactDetailsView.propTypes = {
  id: PropTypes.string,
};
