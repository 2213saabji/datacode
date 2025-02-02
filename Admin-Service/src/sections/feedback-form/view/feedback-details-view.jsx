import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';
import { useGetSuggestionByFeedbackId } from 'src/api/suggestion';

import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import PostDetailsHero from 'src/sections/electionmanagement/election-details-hero';
import BannerBlurImg from 'src/sections/electionmanagement/view/assets/overlay_2.jpg';

export default function FeedbackDetailsView({ id }) {
  const { user: userData } = useAuthContext();
  const { suggestion, suggestionError } = useGetSuggestionByFeedbackId(id, userData.accessToken);
  const [suggestionData, setSuggestionData] = useState({});

  useEffect(() => {
    if (suggestion && suggestion.data) {
      setSuggestionData(suggestion.data);
    }
  }, [suggestion]);

  const renderError = (
    <Container sx={{ my: 10 }}>
      <EmptyContent
        filled
        title={`${suggestionError?.message}`}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.FeedbackPage.list}
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
      <PostDetailsHero title="SUGGESTION LIST" coverUrl={BannerBlurImg} />

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
              name: 'Suggestion List',
              href: paths.dashboard.FeedbackPage.list,
            },
            {
              name: 'Details',
              href: paths.FeedbackPage,
            },
          ]}
          sx={{ maxWidth: 720, mx: 'auto' }}
        />
      </Container>

      <Container maxWidth={false}>
        <Stack sx={{ maxWidth: 720, mx: 'auto' }}>
          <Stack direction="column" alignItems="start">
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Full Name :</Typography>
              <Typography sx={{ ml: 1 }}>
                {' '}
                {suggestionData?.User?.UserProfile?.firstName}{' '}
                {suggestionData?.User?.UserProfile?.middleName}{' '}
                {suggestionData?.User?.UserProfile?.lastName}
              </Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Mobile Number :</Typography>
              <Typography sx={{ ml: 1 }}> {suggestionData?.User?.phone}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>User Role Type :</Typography>
              <Typography sx={{ ml: 1 }}> {suggestionData?.User?.userRoleType}</Typography>
            </Stack>
            <Stack direction="row" alignItems="start" sx={{ marginTop: '10px' }}>
              <Typography sx={{ mr: 1, minWidth: 180 }}>Suggesion Message :</Typography>
              <Typography sx={{ ml: 1 }}> {suggestionData?.feedbackMessage}</Typography>
            </Stack>
          </Stack>
          <Divider sx={{ mt: 5, mb: 2 }} />
        </Stack>
      </Container>
    </>
  );
  return (
    <>
      {suggestion && renderPost}
      {suggestionError && renderError}
    </>
  );
}
FeedbackDetailsView.propTypes = {
  id: PropTypes.string,
};
