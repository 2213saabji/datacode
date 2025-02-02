import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';

import { paths } from 'src/routes/paths';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';
import { _userAbout, _userPlans, _userPayment, _userInvoices, _userAddressBook } from 'src/_mock';

// import AccountGeneral from '../account-general';
import { useGetSocialMedia } from 'src/api/user';
import { useAuthContext } from 'src/auth/hooks';
import AccountSocialLinks from '../account-social-links';
import AccountChangePassword from '../account-change-password';
import AccountBilling from '../account-billing';
import AccountPricing from '../account-pricing';

export default function AccountView({ id }) {
  const settings = useSettingsContext();

  const { user } = useAuthContext();
  const { users } = useGetSocialMedia(user.accessToken);
  // ----------------------------------------------------------------------

  const TABS = [
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
      value: 'pricing',
      label: 'pricing',
      icon: <Iconify icon="solar:bill-list-bold" width={24} />,
    },

    ...(!users
      ? [
          {
            value: 'socialMedia',
            label: 'Social links',
            icon: <Iconify icon="solar:share-bold" width={24} />,
          },
        ]
      : []),

    {
      value: 'security',
      label: 'Security',
      icon: <Iconify icon="ic:round-vpn-key" width={24} />,
    },
  ];

  // ----------------------------------------------------------------------

  const [currentTab, setCurrentTab] = useState(() => {
    const localData = localStorage.getItem('accountSettingView');
    if (localData) return localData;

    return 'socialMedia';
  });

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
    localStorage.setItem('accountSettingView', newValue);
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

      {/* {currentTab === 'general' && <AccountGeneral />} */}

      {/* {currentTab === 'billing' && (
        <AccountBilling
          plans={_userPlans}
          cards={_userPayment}
          invoices={_userInvoices}
          addressBook={_userAddressBook}
        />
      )} */}

      {currentTab === 'pricing' && <AccountPricing />}

      {/* {currentTab === 'notifications' && <AccountNotifications />} */}

      {currentTab === 'socialMedia' && !users && <AccountSocialLinks />}

      {currentTab === 'security' && <AccountChangePassword />}
    </Container>
  );
}

AccountView.propTypes = {
  id: PropTypes.string,
};
