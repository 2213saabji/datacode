import { Helmet } from 'react-helmet-async';

import { JwtForgotPasswordView } from 'src/sections/auth/jwt';

// ----------------------------------------------------------------------

export default function ForgotPasswordPage() {
  return (
    <>
      <Helmet>
        <title> ATTPL: Register</title>
      </Helmet>

      <JwtForgotPasswordView />
    </>
  );
}
