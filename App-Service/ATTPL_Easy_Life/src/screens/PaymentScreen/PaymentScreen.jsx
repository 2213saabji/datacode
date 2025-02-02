import React, { useEffect } from 'react';
import {
  Modal,
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  selectOpen,
  selectOpenModal,
  selectUser,
} from '../../redux/selectors/UMS/authSelectors';
import {useDispatch, useSelector} from 'react-redux';
import {selectTheme} from '../../redux/selectors';
import RazorpayCheckout from 'react-native-razorpay';
import {useCustomAlert} from '../../utilities/Alert/useCustomAlert';
import {createOrder, logout, paymentPopupClose} from '../../redux/slices/UMS/authSlice';

const RazorPayPaymentScreen = () => {
  // { openModal, closePaymentModal, clickpay, handleLogout }
  const {colors, fonts} = useSelector(selectTheme);
  const openModal = useSelector(selectOpenModal);
  const open = useSelector(selectOpen);
  const user = useSelector(selectUser);
  const {showAlert} = useCustomAlert();
  const dispatch = useDispatch();

  const loggingOut = () => {
    dispatch(logout());
  };
  
  const PaymentClose = () => {
    dispatch(paymentPopupClose());
  };


  
  let total_bill;
  // if (
  //   user.phone === '7814692265' ||
  //   user.phone === '6283929651' ||
  //   user.phone === '9145415691' ||
  //   user.phone === '8292217539' ||
  //   user.phone === '9714322345'
  // ) {
    total_bill = '1';
  // } else {
  //   total_bill = '99';
  // }

  let bool = true;

  const pay = async () => {
    try {
      if (bool) {
        bool = false;
        setTimeout(() => {
          bool = true;
        }, 3000);
        const response = await dispatch(
          createOrder({amount: total_bill, phoneNumber: user?.phone}),
        );
        console.log("helopayment")
        if (createOrder.fulfilled.match(response)) {
          const {key, amount, currency, orderId, order_id} =
            response?.payload?.data?.data;
          const options = {
            key, // Your Razorpay API key
            amount: amount.toString(), // Amount in paise
            currency, // Your currency code
            name: 'Attpl Group',
            description: 'Test Transaction',
            order_id: order_id, // Order ID obtained from the server
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

          RazorpayCheckout.open(options)
            .then(data => {
              Alert.alert(`Success: ${data.razorpay_payment_id}`);
              //   onSubmitUserDetails();
            })
            .catch(error => {
              Alert.alert(`Error: ${error.code} | ${error.description}`);
              console.error(error);
            });
        } else if (createOrder.rejected.match(response)) {
          showAlert('An unexpected error occurred', 'error');
        }
      }
    } catch (err) {
      console.error(err);
      Alert.alert('Something went wrong.');
    }
  };

  return (
    <Modal
      transparent={true}
      visible={openModal}
      //   onRequestClose={closePaymentModal}
    >
      <View style={styles.backdrop}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              PaymentClose();
            }}>
            <Text style={styles.closeText}>X</Text>
          </TouchableOpacity>
          <Image
            source={require('../../assets/payment/paymentNew.png')}
            style={styles.image}
          />
          <TouchableOpacity
            style={[styles.payButton, {backgroundColor: colors.primary}]}
            onPress={() => {
              pay();
            }}>
            <Text style={[styles.payButtonText, {color: colors.text}]}>
              Pay Rs. 99
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[styles.logoutButton, {backgroundColor: colors.primary}]}
          onPress={() => {
            loggingOut()
          }}>
          <Text style={[styles.payButtonText, {color: colors.text}]}>
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: 400,
    backgroundColor: 'white',
    borderRadius: 18,
    padding: 20,
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: 350,
    height: 400,
    marginBottom: 20,
  },
  closeIcon: {
    position: 'absolute',
    top: 20,
    right: 40,
    zIndex:100,
  },
  closeText: {
    color: 'black',
    width:50,
    height:50,
    textAlign:"center",
    textAlignVertical:'center',
    fontSize: 24,
  },
  payButton: {
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 5,
    transform: [{scale: 1.2}],
  },
  logoutButton: {
    position: 'absolute',
    top: 30,
    right: 30,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 5,
    transform: [{scale: 1.2}],
  },
});

export default RazorPayPaymentScreen;
