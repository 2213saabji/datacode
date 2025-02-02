import PropTypes from 'prop-types';
import { useMemo, useEffect, useReducer, useCallback } from 'react';

import { deleter } from 'src/utils/axios-ums';
// import { poster } from 'src/utils/axios-ums';
import axios, { poster, endpoints } from 'src/utils/axios-auth';

import { callPoster } from 'src/api/auth';
import { registerPoster } from 'src/api/accountRegister';
import { UpdateCandidateProfile } from 'src/api/candidate';

import { AuthContext } from './auth-context';
import { isValidToken, setLocalStorage } from './utils';

const initialState = {
  user: null,
  open: false,
  openModal: false,
  loading: true,
  toggling: true,
};

// const { } = use

const reducer = (state, action) => {
  if (action.type === 'INITIAL') {
    return {
      ...state,
      loading: false,
      user: action.payload.user,
      toggling: true,
    };
  }
  if (action.type === 'LOGIN') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'REGISTER') {
    return {
      ...state,
      user: action.payload.user,
    };
  }
  if (action.type === 'LOGOUT') {
    return {
      ...state,
      user: null,
    };
  }
  if (action.type === 'TOGGLING') {
    return {
      ...state,
      toggling: action.payload.toggling,
    };
  }
  if (action.type === 'PAYMENTOPEN') {
    return {
      ...state,
      open: action.payload.open,
    };
  }
  if (action.type === 'PAYMENTMODALOPEN') {
    return {
      ...state,
      openModal: action.payload.openModal,
    };
  }

  return state;
};

// ----------------------------------------------------------------------

const STORAGE_KEY = 'accessToken';

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // refferal points fetcher
  const refferal = useCallback(async (token) => {
    const response = await axios.get(endpoints.auth.refferal, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response?.data?.data;
  }, []);

  const userdata = useCallback(
    async (token) => {
      const res = await axios.get(endpoints.auth.me, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const refferaldata = await refferal(token);
      const { data } = res.data;

      return { ...data, refferaldata };
    },
    [refferal]
  );

  const initialize = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem(STORAGE_KEY);

      if (accessToken && isValidToken(accessToken)) {
        setLocalStorage(accessToken);

        const user = await userdata(accessToken);

        dispatch({
          type: 'INITIAL',
          payload: {
            user: {
              ...user,
              accessToken,
            },
          },
        });
      } else {
        dispatch({
          type: 'INITIAL',
          payload: {
            user: null,
          },
        });
      }
    } catch (error) {
      dispatch({
        type: 'INITIAL',
        payload: {
          user: null,
        },
      });
    }
  }, [userdata]);


  // ----------------------------------------------------------------------

  const checkAuthenticated = state.user ? 'authenticated' : 'unauthenticated';

  const status = state.loading ? 'loading' : checkAuthenticated;

  const memoizedValue = useMemo(
    () => ({
      user: state.user,
      open: state.open,
      openModal: state.openModal,
      method: 'jwt',
      loading: status === 'loading',
      authenticated: status === 'authenticated',
      unauthenticated: status === 'unauthenticated',
      toggling: state.toggling,
      dispatch,
  
    }),
    [state.open, state.openModal, state.toggling, state.user, status]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node,
};

// ------------------------------------------
