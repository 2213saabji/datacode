import React, {createContext, useContext} from 'react';
import {useNavigation as useReactNavigation} from '@react-navigation/native';

const NavigationContext = createContext(null);

export const NavigationProvider = ({children}) => {
  const navigation = useReactNavigation();
  return (
    <NavigationContext.Provider value={navigation}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const navigation = useContext(NavigationContext);
  if (!navigation) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return navigation;
};
