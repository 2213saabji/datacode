import { Grid, Button } from '@mui/material';
import Container from '@mui/material/Container';

// import { paths } from 'src/routes/paths';

// import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { RouterLink } from 'src/routes/components';

import { useAuthContext } from 'src/auth/hooks';

import { useSettingsContext } from 'src/components/settings';

import VoterReferralBanner from 'src/sections/VoterReferal/Voter-referral-hero';
import BankingInviteFriends from 'src/sections/VoterReferal/view/banking-invite-friends';

import VoterNewEditForm from '../voter-new-edit-form';

// import VoterReferalNewEditForm from 'src/sections/VoterReferal/voter-referal-edit-form';

// ----------------------------------------------------------------------

export default function VoterCreateView() {
  const settings = useSettingsContext();
  // eslint-disable-next-line no-unused-vars
  const { user } = useAuthContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      {/* {user.userRoleId !== 9 &&
        <>
          <CustomBreadcrumbs
            heading="Add New Voter"
            links={[
              // {
              //   name: 'Dashboard',
              //   href: paths.dashboard.root,
              // },
              {
                name: 'voter',
                href: paths.dashboard.voter.root,
              },
              { name: 'New voter' },
            ]}
            sx={{
              mb: { xs: 3, md: 5 },
            }}
          />

          <VoterNewEditForm />
        </>
      } */}

      <>
        <VoterReferralBanner />
        <Button
          component={RouterLink}
          to="/dashboard"
          variant="outlined"
          color="primary"
          style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mb: 2 }}
        >
          Back
        </Button>
        <Grid
          xs={12}
          md={8}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            '@media (max-width:900px)': {
              flexDirection: 'column',
            },
          }}
        >
          <VoterNewEditForm />
          {/* <VoterReferalNewEditForm /> */}
          <BankingInviteFriends />
        </Grid>
      </>
    </Container>
  );
}
