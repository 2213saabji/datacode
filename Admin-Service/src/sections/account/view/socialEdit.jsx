import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';


import { paths } from 'src/routes/paths';

import { _userAbout } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

// import AccountGeneral from '../account-general';
import { useAuthContext } from 'src/auth/hooks';
import { useGetSocialDetail } from 'src/api/user';
import AccountSocialLinks from '../account-social-links';
// import AccountChangePassword from '../account-change-password';
// import AccountBilling from '../account-billing';

// ----------------------------------------------------------------------

const TABS = [
  // {
  //   value: 'general',
  //   label: 'General',
  //   icon: <Iconify icon="solar:user-id-bold" width={24} />,
  // },
  // {
  //   value: 'billing',
  //   label: 'Billing',
  //   icon: <Iconify icon="solar:bill-list-bold" width={24} />,
  // },
  // {
  //   value: 'notifications',
  //   label: 'Notifications',
  //   icon: <Iconify icon="solar:bell-bing-bold" width={24} />,
  // },
  {
    value: 'socialMedia',
    label: 'Social links',
    icon: <Iconify icon="solar:share-bold" width={24} />,
  },
  {
    value: 'security',
    label: 'Security',
    icon: <Iconify icon="ic:round-vpn-key" width={24} />,
  },
];

// ----------------------------------------------------------------------

export default function SocialEdit({id}) {

  const {user} = useAuthContext()

  const settings = useSettingsContext();

  const {socialMedia : currentSocial} = useGetSocialDetail(id, user?.accessToken)


  const [currentTab, setCurrentTab] = useState(()=>{
    const localData = localStorage.getItem('accountSettingView');
    if(localData) return localData;

    return 'socialMedia';
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem('accountSettingView', newValue)
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="Account"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'User', href: paths.dashboard.user.root },
          { name: 'Account' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Tabs
        value={currentTab}
        onChange={handleChangeTab}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      >
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {currentTab === 'socialMedia' && <AccountSocialLinks currentSocial={currentSocial}/>}

    </Container>
  );
}

SocialEdit.propTypes = {
  id: PropTypes.string,
};
