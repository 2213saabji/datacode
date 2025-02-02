import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { useGetSurveyResponse } from 'src/api/survey';
// import {
//   _jobs,
//   // JOB_DETAILS_TABS,
//   JOB_PUBLISH_OPTIONS,
//   SURVEY_DETAILS_TABS
// } from 'src/_mock';

// import Label from 'src/components/label';
import { useSettingsContext } from 'src/components/settings';

// import BannerBlurImg from 'src/sections/electionmanagement/view/assets/overlay_2.jpg';
// import PostDetailsHero from 'src/sections/electionmanagement/election-details-hero';
import PostDetailsHero from 'src/sections/electionmanagement/election-details-hero';
import BannerBlurImg from 'src/sections/electionmanagement/view/assets/overlay_2.jpg';

import SurveyView from './survey-details-view';

// ----------------------------------------------------------------------

export default function JobDetailsView({ id }) {
  const settings = useSettingsContext();

  const { survey } = useGetSurveyResponse(id);
  const surveyData = survey || {};

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <PostDetailsHero title="SURVEY DETAILS" coverUrl={BannerBlurImg} />

      <SurveyView surveyDetails={surveyData} />
    </Container>
  );
}

JobDetailsView.propTypes = {
  id: PropTypes.string,
};
