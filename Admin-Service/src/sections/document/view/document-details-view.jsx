/* eslint-disable no-shadow */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import { Box, Stack, Button, useTheme, Container, Typography, useMediaQuery } from '@mui/material';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useGetDocument } from 'src/api/document';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

export default function ContractDetailsView({ id }) {
  const { document, documentError } = useGetDocument(id);
  const [documentData, setDocumentData] = useState({});
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (document && document.data) {
      setDocumentData(document.data);
    }
  }, [document]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={documentError?.message}
        action={
          <Button
            component={RouterLink}
            href={paths.driver}
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

  const renderPost = document && (
    <>
      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px' }}
      >
        Back
      </Button>

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
              name: 'Document',
              href: paths.dashboard.LMS_document.root,
            },
            {
              name: 'Details',
              href: paths.LMS_document,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack
          spacing={3}
          sx={{
            maxWidth: 720,
            mx: 'auto',
            p: 3,
            borderRadius: 2,
            boxShadow: 1,
            bgcolor: 'background.paper',
          }}
        >
          <Stack
            spacing={2}
            sx={{
              border: '1px solid #ddd',
              borderRadius: 2,
              p: 3,
            }}
          >
            <Typography variant={isMobile ? 'h6' : 'h5'}>Document Information</Typography>

            <Stack spacing={2}>
              {documentData.documentType && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Document Type:</Typography>
                  <Typography>{documentData.documentType}</Typography>
                </Stack>
              )}

              {documentData.documentPdf && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Document PDF:</Typography>
                  <Typography>
                    <a
                      href={documentData.documentPdf.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {documentData.documentPdf.name}
                    </a>
                  </Typography>
                </Stack>
              )}

              {documentData.image && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Image:</Typography>
                  <Box
                    component="img"
                    src={documentData.image.preview}
                    alt={documentData.image.name}
                    sx={{
                      maxWidth: isMobile ? '100%' : 200,
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  />
                </Stack>
              )}

              {documentData.video && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Video:</Typography>
                  <Box
                    component="video"
                    src={documentData.video.url}
                    controls
                    sx={{
                      maxWidth: isMobile ? '100%' : 300,
                      borderRadius: 1,
                      boxShadow: 1,
                    }}
                  />
                </Stack>
              )}

              {documentData.uploadDate && (
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Typography sx={{ minWidth: 180, fontWeight: 'bold' }}>Uploaded Date:</Typography>
                  <Typography>{new Date(documentData.uploadDate).toLocaleDateString()}</Typography>
                </Stack>
              )}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </>
  );

  return (
    <>
      {documentError && renderError}
      {document && renderPost}
    </>
  );
}

ContractDetailsView.propTypes = {
  id: PropTypes.string.isRequired,
};
