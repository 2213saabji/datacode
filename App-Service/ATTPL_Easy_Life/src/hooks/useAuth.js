// hooks/useAuth.js
import {useDispatch, useSelector} from 'react-redux';
import {logout, toggleOpenModal} from '../redux/slices/UMS/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const openModal = useSelector(state => state.auth.openModal);
  const open = useSelector(state => state.auth.open);

  const loggingOut = () => {
    dispatch(logout());
  };

  const openPaymentPopup = () => {
    if (open) {
      dispatch(toggleOpenModal());
      return true;
    }
    return false;
  };

  return {
    isAuthenticated,
    openModal,
    open,
    loggingOut,
    openPaymentPopup,
  };
};

export default useAuth;
