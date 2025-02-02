// components/AuthGuard.js
import React from 'react';
import {View, Text} from 'react-native';
import useAuth from '../hooks/useAuth';

const AuthGuard = ({
  children,
  fallback = <Text>You need to be authenticated to access this screen.</Text>,
}) => {
  const {isAuthenticated} = useAuth();

  if (!isAuthenticated) {
    return <View>{fallback}</View>;
  }

  return <>{children}</>;
};

export default AuthGuard;
