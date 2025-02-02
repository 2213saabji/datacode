// import Stack from '@mui/material/Stack';
import { Stack } from '@mui/system';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { Button, Typography } from '@mui/material';

import { _appFeatured } from 'src/_mock';
// import { _appFeatured } from 'src/_mock';
import { useAuthContext } from 'src/auth/hooks';
import { ATTPL_LS_HOST_API } from 'src/config-global';
import SeoIllustration from 'src/assets/illustrations/seo-illustration';

import { useSettingsContext } from 'src/components/settings';

import Footer from 'src/sections/overview/appVoter/app-voter';

import AppWelcome from '../app-welcome';
import AppFeatured from '../app-featured';
import AppOverviewNews from '../app-voter-news';

// import { Typography } from '@mui/material';

// ----------------------------------------------------------------------

export default function OverviewAppView() {
  const { user } = useAuthContext();

  const handleWatchButtonClick = () => {
    window.open('https://www.youtube.com/results?sp=mAEB&search_query=attpl', '_blank');
  };
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Typography
        sx={{
          p: 3,
          borderRadius: '10px',
          boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
          mb: 2,
          backgroundColor: 'background.paper',
          color: 'text.secondary',
          fontSize: '0.9rem',
          lineHeight: 1.6,
          position: 'relative',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '5px',
            backgroundColor: 'primary.main',
            borderRadius: '10px 10px 0 0',
          },
        }}
      >
        This app is not affiliated with, endorsed by, or associated with any government entity. The
        information provided in this app is for general informational purposes only and is not
        intended to serve as a source of official government information.
        <Button
          variant="outlined"
          color="primary"
          size="small"
          sx={{
            ml: 2,
            mt: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: 'primary.light',
              color: 'common.white',
            },
          }}
          href={`${ATTPL_LS_HOST_API}/disclaimer`}
        >
          For more info, click here
        </Button>
      </Typography>


      <Grid container spacing={4} sx={{ mt: 1 }}>
        <Grid xs={12} md={12} height={450}>
          <Stack direction={{ xs: 'column', md: 'row', sm: 'column' }} gap={{ xs: 2 }} sx={{ width: '100%' }}>
            <AppWelcome
              title={`Welcome back 👋 \n ${user?.UserProfile === null || user?.UserProfile?.firstName === null ? user?.phone : user?.UserProfile?.firstName}`}
              govtTitle="NOW GOVERNMENT IN YOUR HAND"
              headertitle="Help India With Refer"
              // description="https://play.google.com/store/apps/details?id=com.attpl_ems&pcampaignid=web_share"
              description="Share app with your friend and earn 10 to 100000 per week with completing your profile and unlock your all feature with rs 100 one time payment"
              img={<SeoIllustration user={user} />}
              action={
                <Button
                  sx={{ width: '50%', height: '48px', fontSize: '16px', whiteSpace: 'nowrap' }}
                  variant="contained"
                  color="primary"
                  onClick={handleWatchButtonClick}
                >
                  Watch Youtube Video
                </Button>
              }
            />
            <Grid xs={12} md={4}>
              <AppFeatured list={_appFeatured} style={{ height: 'auto', bottom: '13px' }} />
            </Grid>
          </Stack>

          <AppOverviewNews />
          <Footer />
        </Grid>
      </Grid>
    </Container>
  );
}
