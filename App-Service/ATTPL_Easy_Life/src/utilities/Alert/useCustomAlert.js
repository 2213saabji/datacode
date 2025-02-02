import React, {createContext, useState, useContext, useCallback} from 'react';
import CustomAlert from './CustomAlert';

const AlertContext = createContext();

export const AlertProvider = ({children}) => {
  const [alert, setAlert] = useState(null);

  const showAlert = useCallback((message, type, onConfirm) => {
    setAlert({type, message, onConfirm});
  }, []);

  const hideAlert = useCallback(() => {
    setAlert(null);
  }, []);

  return (
    <AlertContext.Provider value={{showAlert, hideAlert}}>
      {children}
      {alert && (
        <CustomAlert
          message={alert.message}
          type={alert.type}
          onClose={hideAlert}
          onConfirm={alert.onConfirm}
        />
      )}
    </AlertContext.Provider>
  );
};

export const useCustomAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useCustomAlert must be used within an AlertProvider');
  }
  return context;
};
