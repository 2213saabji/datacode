import { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';

import { GuestGuard } from 'src/auth/guard';
import AuthClassicLayout from 'src/layouts/auth/classic';

import { SplashScreen } from 'src/components/loading-screen';
// import { Box } from '@mui/material';

// JWT
const JwtLoginPage = lazy(() => import('src/pages/auth/jwt/login'));
const JwtRegisterPage = lazy(() => import('src/pages/auth/jwt/register'));
const JwtForgotPasswordPage = lazy(() => import('src/pages/auth/jwt/forgotpassword'));
const PaymentPage = lazy(() => import('src/pages/payment'));

const authJwt = {
  path: 'jwt',
  element: (
    <Suspense fallback={<SplashScreen />}>
      <Outlet />
    </Suspense>
  ),
  children: [
    {
      path: 'login',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="Hi, Welcome back">
            <JwtLoginPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'register',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="">
            <JwtRegisterPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'forgotpassword',
      element: (
        <GuestGuard>
          <AuthClassicLayout title="Hi, Welcome back">
            <JwtForgotPasswordPage />
          </AuthClassicLayout>
        </GuestGuard>
      ),
    },
    {
      path: 'payment',
      element: (
        <GuestGuard>
          {/* <AuthClassicLayout title=""> */}
          <PaymentPage />
          {/* </AuthClassicLayout> */}
        </GuestGuard>
      ),
    },
  ],
};

export const authRoutes = [
  {
    path: 'auth',
    children: [authJwt],
  },
];
