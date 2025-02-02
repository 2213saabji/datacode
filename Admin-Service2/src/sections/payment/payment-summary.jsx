import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';

import Label from 'src/components/label';
import Iconify from 'src/components/iconify';
// import Razorpay from 'razorpay';

import { createOrder, updateOrder } from 'src/api/exp_order';

import { useSnackbar } from 'src/components/snackbar';

// ----------------------------------------------------------------------
// Define text for each bill type
const billTypeText = {
  monthly: {
    title: 'mo',
  },
  annual: {
    title: 'yr',
  },
  '6-months': {
    title: '6-mo',
  },
};

export default function PaymentSummary({ sx, ...other }) {
  // const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  // const navigate = useNavigate()
  const { bill_type } = useParams();

  // Get the text based on the bill type
  const { title } = billTypeText[bill_type];

  const total_bill = localStorage.getItem('total');

  // ultimate handle payclick

  // REdirect after payment

  async function handleRedirectAndUpdate(res, orderId) {
    //    window.location.href = "https://attplems.com/#home";
    // enqueueSnackbar('payment successfull', { variant: 'success' });
    // console.log("orderId",orderId,res);
    // return;
    const { error, razorpay_order_id, razorpay_payment_id, razorpay_signature } = res;
    if (razorpay_order_id && razorpay_payment_id && razorpay_signature) {
      // update order details
      const response = await updateOrder(orderId, { verifyPayment: res, paymentStatus: 'success' });
      // console.log("yahan pahucha 1st",response);
      if (response.status_code === 200) {
        enqueueSnackbar('payment successfull', { variant: 'success' });
        // window.location.href = "https://app.attplems.com/auth/jwt/login?returnTo=%2F"
      } else {
        console.log('failed to pay: ', error);
        enqueueSnackbar('Failed payment', { variant: 'error' });
      }
    } else {
      console.log('failed to pay: ', error);
      enqueueSnackbar('Failed payment', { variant: 'error' });
    }
    // aditional step needed to verify sigature, better to implement webhook
    // cant relay on client side
  }

  // Deepak code
  const pay = async () => {
    // crate order
    const response = await createOrder({ amount: total_bill });
    const { key, amount, currency, orderId, order_id } = response.data;

    // console.log(response);

    const options = {
      key,
      order_id,
      // This is Api key. you will get it from razorpay dashboard > account and settings > API keys
      amount,
      currency, // your 3 letter currency code
      name: 'Attpl Group', // project or transaction name
      description: 'Test Transaction',
      handler(res) {
        // console.log("response", response);
        handleRedirectAndUpdate(res, orderId); // after payment completes on stripe this function will be called and you can do your stuff
      },
      prefill: {
        name: 'Attpl Group',
        email: 'Attpl@gmail.com',
        contact: '98123456778',
      },
      notes: {
        address: 'India',
      },
      theme: {
        // color: "#158993",
        color: '#0096FF',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  // Razopay ends

  const renderPrice = (
    <Stack direction="row" justifyContent="flex-end">
      <Typography variant="h4">₹</Typography>

      <Typography variant="h2">{total_bill}</Typography>

      <Typography
        component="span"
        sx={{
          alignSelf: 'center',
          color: 'text.disabled',
          ml: 1,
          typography: 'body2',
        }}
      >
        /{title}
      </Typography>
    </Stack>
  );

  return (
    <Box
      sx={{
        p: 5,
        borderRadius: 2,
        bgcolor: 'rgb(225, 226, 227)',
        ...sx,
      }}
      {...other}
    >
      <Typography variant="h6" sx={{ mb: 5 }}>
        Billed Summary
      </Typography>

      <Stack spacing={2.5}>
        <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Subscription
          </Typography>

          <Label color="error">PREMIUM</Label>
        </Stack>

        {/* <Stack direction="row" justifyContent="space-between">
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Billed Monthly
          </Typography>
          <Switch defaultChecked />
        </Stack> */}

        {renderPrice}

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="subtitle1">Total Billed</Typography>

          <Typography variant="subtitle1">{total_bill}</Typography>
        </Stack>

        <Divider sx={{ borderStyle: 'dashed' }} />
      </Stack>

      <Typography component="div" variant="caption" sx={{ color: 'text.secondary', mt: 1 }}>
        * Plus applicable taxes
      </Typography>

      <Button fullWidth size="large" variant="contained" sx={{ mt: 5, mb: 3 }} onClick={pay}>
        Proceed To Pay!
      </Button>

      <Stack alignItems="center" spacing={1}>
        <Stack direction="row" alignItems="center" spacing={1}>
          <Iconify icon="solar:shield-check-bold" sx={{ color: 'success.main' }} />
          <Typography variant="subtitle2">Secure credit card payment</Typography>
        </Stack>

        <Typography variant="caption" sx={{ color: 'text.disabled', textAlign: 'center' }}>
          This is a secure 128-bit SSL encrypted payment
        </Typography>
      </Stack>
    </Box>
  );
}

PaymentSummary.propTypes = {
  sx: PropTypes.object,
};
