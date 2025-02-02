/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

const loginPaths = {
  jwt: paths.auth.jwt.login,
};

// ----------------------------------------------------------------------

export default function AuthGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

AuthGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();

  const { authenticated, method, userdata, user, dispatch } = useAuthContext();
  const params = new URLSearchParams(window.location.search);
  const token = params.get('token');

  const [checked, setChecked] = useState(false);

  const check = useCallback(() => {
    //   async function crossToken(){
    //     const data = await userdata(token)
    //     setLocalStorage(token);
    //     if(data){
    //     dispatch({
    //       type: 'LOGIN',
    //       payload: {
    //         user: {
    //           ...data,
    //           token,
    //         },
    //       },
    //     });
    //     setChecked(true);
    //     router.push(PATH_AFTER_LOGIN);
    //   }
    //  }
    if (!authenticated && !token) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      }).toString();

      const loginPath = loginPaths[method];

      const href = `${loginPath}?${searchParams}`;

      router.replace(href);
    }
    // else if(token){
    //   crossToken();
    // }
    else {
      setChecked(true);
    }
  }, [authenticated, method, router, token]);

  useEffect(() => {
    check();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!checked) {
    return null;
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
