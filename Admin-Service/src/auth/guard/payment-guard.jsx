/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Modal, Stack, Button } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getter, endpoints } from 'src/utils/axios-ums';

import { VITE_NODE_ENV, PATH_AFTER_LOGOUT } from 'src/config-global';
import { createOrder, updateOrder, checkPayment } from 'src/api/exp_order';

import { useSnackbar } from 'src/components/snackbar';
import { usePopover } from 'src/components/custom-popover';
import { SplashScreen } from 'src/components/loading-screen';

import { useAuthContext } from '../hooks';

// ----------------------------------------------------------------------

export default function PaymentGuard({ children }) {
  const { loading } = useAuthContext();

  return <>{loading ? <SplashScreen /> : <Container> {children}</Container>}</>;
}

PaymentGuard.propTypes = {
  children: PropTypes.node,
};

// ----------------------------------------------------------------------

function Container({ children }) {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isMobile, setIsMobile] = useState(false);
  const { user, logout, open, dispatch, openModal, closePaymentModal } = useAuthContext();
  // const [open,setOpen]=useState(false);

  const popover = usePopover();

  const handleLogout = async () => {
    try {
      await logout();
      popover.onClose();
      router.push(PATH_AFTER_LOGOUT);
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  useEffect(() => {
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 767px)').matches);
    };

    checkDevice();
    window.addEventListener('resize', checkDevice);

    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      if (open) {
        onSubmitUserDetails();
      }
    }, 5000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmitUserDetails = async (data) => {
    try {
      const url = endpoints.user.updateTooglePaymentStatus;

      const response = await getter(url);
      const phone = user?.phone;
      const paymentCheckData = await checkPayment(phone);

      if (paymentCheckData) {
        // setShow({
        //   emForm: false,
        //   otpForm: false,
        //   detailForm: false,
        //   upiForm: false,
        //   pasForm: true,
        // });
        // setOpen(false)
        dispatch({
          type: 'PAYMENTOPEN',
          payload: {
            open: false,
          },
        });
      } else if (response?.data?.data?.showPaymentPage) {
        localStorage.setItem('togglePayment', response?.data?.data?.showPaymentPage);
        // setOpen(true)
        dispatch({
          type: 'PAYMENTOPEN',
          payload: {
            open: true,
          },
        });
        // dispatch({
        //   type: 'TOGGLING',
        //   payload: {
        //     toggling: false,
        //   },
        // });
        // setShow({
        //   emForm: false,
        //   otpForm: false,
        //   detailForm: false,
        //   upiForm: true,
        //   pasForm: false,
        // });
      } else {
        // setShow({
        //   emForm: false,
        //   otpForm: false,
        //   detailForm: false,
        //   upiForm: false,
        //   pasForm: true,
        // });
        // setOpen(false)
        dispatch({
          type: 'PAYMENTOPEN',
          payload: {
            open: false,
          },
        });
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  useEffect(() => {
    onSubmitUserDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function isAndroidApp() {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    return /android/i.test(userAgent) && /wv/i.test(userAgent);
  }
  function isBrowser() {
    return !isAndroidApp();
  }

  const openInChrome = () => {
    let url;
    if (VITE_NODE_ENV === 'PROD') {
      url = `https://app.attplems.com/auth/jwt/login?token=${user?.accessToken}`;
    } else if (VITE_NODE_ENV === 'DEV') {
      url = `https://appdev.attplems.com/auth/jwt/login?token=${user?.accessToken}`;
    }
    window.open(url, '_system');
  };

  function clickpay() {
    // if (user.phone === "7814692265" || user.phone === "6283929651" || user.phone === "9145415691" || user.phone === "8292217539" || user.phone === "9714322345") {
    if (isAndroidApp()) {
      openInChrome();
    } else if (isBrowser()) {
      pay();
    }
    // }
    // else {
    //   pay();
    // }
  }

  // razor pay start
  let total_bill;
  if (
    user.phone === '7814692265' ||
    user.phone === '6283929651' ||
    user.phone === '9145415691' ||
    user.phone === '8292217539' ||
    user.phone === '9714322345'
  ) {
    total_bill = '1';
  } else {
    total_bill = '99';
  }

  // ultimate handle payclick

  // Redirect after payment

  async function handleRedirectAndUpdate(res, orderId) {
    //    window.location.href = "https://attplems.com/#home";
    // enqueueSnackbar('payment successfull', { variant: 'success' });

    // return;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      // update order details
      const response = await updateOrder(orderId, { verifyPayment: res, paymentStatus: 'success' });
      if (response.status_code === 200) {
        // dispatch({
        //   type: 'TOGGLING',
        //   payload: {
        //     toggling: true,
        //   },
        // });
        // setShow({ emForm: false, otpForm: false, upiForm: false, pasForm: true });
        // setOpen(false);
        // dispatch({
        //   type: 'PAYMENTOPEN',
        //   payload: {
        //     open:false
        //   },
        // });
        enqueueSnackbar('payment successfull', { variant: 'success' });
        // if (isMobile) {
        //   window.location.href = "intent://my_host#Intent;scheme=my_scheme;action=my_action;end";
        // }
        window.location.href = 'https://app.attplems.com/auth/jwt/login?returnTo=%2F';
      } else {
        enqueueSnackbar('Failed payment', { variant: 'error' });
        // if (isMobile) {
        window.location.href = 'intent://my_host#Intent;scheme=my_scheme;action=my_action;end';
        // }
      }
    } else {
      enqueueSnackbar('Failed payment', { variant: 'error' });
      // if (isMobile) {
      window.location.href = 'intent://my_host#Intent;scheme=my_scheme;action=my_action;end';
      // }
    }
    // aditional step needed to verify sigature, better to implement webhook
    // cant relay on client side
  }

  let bool = true;
  const pay = async () => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 3000);
        const response = await createOrder({ amount: total_bill, phoneNumber: user?.phone });
        const { key, amount, currency, orderId, order_id } = response.data;

        const options = {
          key,
          order_id,
          // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
          amount,
          currency, // your 3 letter currency code
          name: 'Attpl Group', // project or transaction name
          description: 'Test Transaction',
          handler: (res) => {
            if (isMobile) {
              window.location.href =
                'intent://my_host#Intent;scheme=my_scheme;action=my_action;end';
            } else {
              onSubmitUserDetails();
            }
            // handleRedirectAndUpdate(res, orderId); // after payment completes on stripe this function will be called and you can do your stuff
          },
          prefill: {
            name: user?.UserProfile?.firstName,
            email: '',
            contact: user?.phone,
          },
          notes: {
            address: 'India',
          },
          theme: {
            color: '#0096FF',
          },
          method: {
            netbanking: true,
            card: true,
            upi: true,
            wallet: true,
            emi: true,
            bank_transfer: true,
            upi_intent: true,
            qr: true,
          },
          upi: {
            preferredApps: ['googlePay', 'phonePe', 'paytm'],
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      }
    } catch (err) {
      console.error(err);
      enqueueSnackbar('Something went wrong.', { variant: 'error' });
    }
  };

  if (openModal) {
    // if (open) {
    return (
      <Modal
        open={openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        BackdropProps={{
          style: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <Box>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'background.paper',
              borderRadius: '18px',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Stack>
              <Box component="img" sx={{ width: 350, mb: 5, m: 'auto' }} src="/paymentNew.png" />

              <Button
                variant="contained"
                type="submit"
                sx={{ background: '#078dee', width: 150, m: 'auto', mt: 3 }}
                onClick={() => {
                  clickpay();
                }}
              >
                Pay Rs. 99
              </Button>
            </Stack>
            <CloseIcon
              onClick={() => closePaymentModal()}
              style={{
                color: 'black',
                top: 0,
                right: 0,
                borderRadius: 100,
                marginTop: '20px',
                marginRight: '20px',
                position: 'absolute',
              }}
            />
          </Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              background: '#078dee',
              width: 120,
              m: 'auto',
              mt: 3,
              position: 'absolute',
              // top: '0',
              right: { xs: '5px', md: '25px' },
              // transform: 'translate(-50%, -10%)',
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </Box>
      </Modal>
    );
  }

  return <>{children}</>;
}

Container.propTypes = {
  children: PropTypes.node,
};
