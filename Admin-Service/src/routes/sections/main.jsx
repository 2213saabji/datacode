import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import MainLayout from 'src/layouts/main';

import { SplashScreen } from 'src/components/loading-screen';

const Page404 = lazy(() => import('src/pages/404'));
const PricingTable = lazy(() => import('src/sections/payment/admin_pricing/pricing-table'));
const BillingSummary = lazy(() => import('src/sections/payment/view/payment-view'));
const PricingCard = lazy(() => import('src/sections/payment/admin_pricing/view'));
const AllFeaturesPage = lazy(() => import('src/pages/all-features'));
const BasicFeaturesPage = lazy(() => import('src/pages/basic-features'));
const CustomFeaturesPage = lazy(() => import('src/pages/custom-features'));
export const mainRoutes = [
  {
    element: (
      <MainLayout>
        <Suspense fallback={<SplashScreen />}>
          <Outlet />
        </Suspense>
      </MainLayout>
    ),
    children: [
      { path: '/plan-pricing/:name', element: <PricingTable /> },
      { path: '/proceed-pay/:bill_type', element: <BillingSummary /> },
      { path: '/pricing-cards', element: <PricingCard /> },
      { path: '*', element: <Page404 /> },
      { path: 'all-features', element: <AllFeaturesPage /> },
      { path: 'basic-features', element: <BasicFeaturesPage /> },
      { path: 'custom-features', element: <CustomFeaturesPage /> },
    ],
  },
];
