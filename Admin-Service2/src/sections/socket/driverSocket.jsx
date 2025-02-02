/* eslint-disable no-unused-vars */
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import {  useRef, useState ,useEffect,useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { generateTmsOtp } from 'src/api/ambulancetrip';
import { ATTPL_TMS_SOCKET_API } from 'src/config-global';

import { CabRequest } from 'src/components/alert/CabRequestModal';
import { DeliveryRequest } from 'src/components/alert/DeliveryRequestModal';

import { ConfirmModal } from '../../components/alert/TripAcceptAlert';

export function SocketImplement({ userId }) {
  const router = useRouter();

  const [coordinates, setCoordinates] = useState({ latitude: null, longitude: null });

  // ambulance
  const [modalOpen, setModalOpen] = useState(false);
  const [trip, setTrip] = useState(null);
  // delivery Request
  const [deliveryModal, setDeliveryModal] = useState(false);
  const [deliveryTrip, setDeliveryTrip] = useState(null);

  // cab request
  const [cabModal, setCabModal] = useState(false);
  const [cabTrip, setCabTrip] = useState(null);

  const socketRef = useRef(null);

  const lastLocationRef = useRef(null);


  const calculateDistance = useCallback((pos1, pos2) => {
    if (!pos1 || !pos2) return 0;

    const rad = (x) => (x * Math.PI) / 180;
    const R = 6378137;
    const dLat = rad(pos2.latitude - pos1.latitude);
    const dLong = rad(pos2.longitude - pos1.longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(rad(pos1.latitude)) *
        Math.cos(rad(pos2.latitude)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  }, []);

  useEffect(() => {
    const getPosition = () =>
      new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

    const updateDriverLocation = async () => {
      try {
        let currentLocation;
        // If it's the first update, get the actual position
        const position = await getPosition();
        let distance;
        if (!lastLocationRef.current) {
          currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
        } else {
          // For subsequent updates, move 1 meter from the last position

          // currentLocation = moveLatLngByDistance(
          //   lastLocationRef.current.latitude,
          //   lastLocationRef.current.longitude,
          //   10
          // );
          const newPosition = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          distance = calculateDistance(currentLocation, newPosition);
        }

        // Emit the updated location to the server
        if (distance >= 1) {
          // Update last location
          lastLocationRef.current = currentLocation;

          console.log(currentLocation);
          console.log(currentLocation);
          socketRef.current.emit('driverLocationUpdate', currentLocation);

          console.log('Location updated:', currentLocation);
        } else {
          console.log('Driver Not Moved ', currentLocation);
        }
      } catch (error) {
        console.error('Error updating location:', error);
      }
    };

    // Update location every 5 seconds
    const intervalId = setInterval(updateDriverLocation, 5000);

    // Clean up interval on unmount
    return () => clearInterval(intervalId);
  }, [calculateDistance]);

  const onSuccess = (location) => {
    setCoordinates({
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    });
  };

  const onError = (error) => {
    console.log(error);
    enqueueSnackbar('Geolocation is not supported by this browser.', { variant: 'error' });
  };

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      onError({
        message: 'Geolocation is not supported by your browser',
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }, []);

  useEffect(() => {
    if (!socketRef.current && coordinates.latitude && coordinates.longitude) {
      socketRef.current = io(`${ATTPL_TMS_SOCKET_API}`, {
        query: {
          driverId: userId,
          location: JSON.stringify(coordinates),
          reconnection: true,
          reconnectionAttempts: 5,
          reconnectionDelay: 1000,
        },
      });
    }
  }, [coordinates, userId]);

  useEffect(() => {
    if (socketRef.current) {
      const socket = socketRef.current;
      socket.on('connect', () => {
        console.log('Driver Connected');
      });

      socket.on('newTrip', (receiveTrip) => {
        // console.log('confirm trip', receiveTrip);
        setTrip(receiveTrip);
        setModalOpen(true);
      });

      socket.on('tripAccepted', async (responses) => {
        if (responses.success) {
          const { ambulanceUser, tripId } = responses.updatedTrip.updatedTrip;
          // console.log(ambulanceUser);

          const { phone, UserProfile } = ambulanceUser;

          const userName = [UserProfile?.firstName, UserProfile?.middleName, UserProfile?.lastName]
            .filter(Boolean)
            .join(' ')
            .trim();

          // console.log(userName);
          try {
            const { status, refId, otpCodeId } = await generateTmsOtp(
              { mobileNumber: phone },
              userName
            );

            if (status === 'Created') {
              localStorage.setItem('tmsOtpRef', refId);
              localStorage.setItem('tmsOtpCodeId', otpCodeId);

              // Check if items are stored
              const storedOtpRef = localStorage.getItem('tmsOtpRef');
              const storedOtpCodeId = localStorage.getItem('tmsOtpCodeId');

              router.push(paths.dashboard.ambulancetrip.details(tripId));
              if (storedOtpRef !== null && storedOtpCodeId !== null) {
                console.log('OTP reference and code ID stored successfully');
              } else {
                console.log('Failed to store OTP reference or code ID');
                // Handle the error - maybe retry storing or inform the user
              }
              enqueueSnackbar('Sent OTP successfully!', { variant: 'success' });
            }
          } catch (error) {
            console.error('Error generating OTP:', error);
            enqueueSnackbar('Failed to send OTP', { variant: 'error' });
          }
        } else {
          alert(responses.message);
        }
      });

      // delivery request
      socket.on('newDeliveryTrip', (receiveTrip) => {
        console.log('confirm trip', receiveTrip);
        setDeliveryTrip(receiveTrip);
        setDeliveryModal(true);
      });

      // cab request
      socket.on('newCabTrip', (receiveTrip) => {
        console.log('confirm trip', receiveTrip);
        setCabTrip(receiveTrip);
        setCabModal(true);
      });

      socket.on('cabRequestAccepted', (receiveTrip) => {
        console.log('cab request accepted', receiveTrip);
      });

      return () => {
        socket.off('newTrip');
        socket.off('tripAccepted');
      };
    }
    return undefined;
  }, [coordinates.latitude, coordinates.longitude, router]);

  // useEffect(() => {
  //   startGeolocationTracking();
  // }, [startGeolocationTracking]);

  const acceptTrip = useCallback(async (ambulancetrip) => {
    if (socketRef.current) {
      const { tripId } = ambulancetrip.newTrip;
      socketRef.current.emit('acceptTrip', { tripId });
    }
  }, []);

  const acceptDeliveryTrip = useCallback(
    (bookingId) => {
      if (!socketRef.current) {
        console.error('Socket connection not established');
        return;
      }

      console.log('Accepting delivery trip:', bookingId);

      socketRef.current.emit('acceptDeliveryTrip', bookingId, (error) => {
        if (error) {
          console.error('Error accepting delivery trip:', error);
        } else {
          console.log('Delivery trip accepted successfully');
        }
      });

      if (bookingId) {
        router.push(paths.dashboard.deliveryService.details(bookingId));
      } else {
        router.push(paths.dashboard.deliveryService.list);
      }
    },
    [router]
  );


  // send otp to user for cab service
   const sendOtpToUser = useCallback(async(phone,UserProfile)=>{
    try {
      const userName = [UserProfile?.firstName, UserProfile?.middleName, UserProfile?.lastName]
      .filter(Boolean)
      .join(' ')
      .trim();

      const { status, refId, otpCodeId } = await generateTmsOtp(
        { mobileNumber: phone },
        userName
      );

      if (status === 'Created') {
        localStorage.setItem('tmsOtpRef', refId);
        localStorage.setItem('tmsOtpCodeId', otpCodeId);

        // Check if items are stored
        const storedOtpRef = localStorage.getItem('tmsOtpRef');
        const storedOtpCodeId = localStorage.getItem('tmsOtpCodeId');

        // router.push(paths.dashboard.ambulancetrip.details(tripId));
        if (storedOtpRef !== null && storedOtpCodeId !== null) {
          console.log('OTP reference and code ID stored successfully');
        } else {
          console.log('Failed to store OTP reference or code ID');
          // Handle the error - maybe retry storing or inform the user
        }
        enqueueSnackbar('Sent OTP successfully!', { variant: 'success' });
      }
    } catch (error) {
      console.error('Error generating OTP:', error);
      enqueueSnackbar('Failed to send OTP', { variant: 'error' });
    }
  } ,[])

  const acceptCabTrip = useCallback(
    async (cabRequestId,userData) => {

      const {phone,UserProfile} = userData;
      if (!socketRef.current) {
        console.error('Socket connection not established');
        return;
      }

      console.log('Accepting delivery trip:', cabRequestId);

      socketRef.current.emit('acceptedCabTripEvent', cabRequestId, async(error) => {
        if (error) {
          console.error('Error accepting delivery trip:', error);
        } else {
          console.log('Delivery trip accepted successfully');
        }
      });


      if (cabRequestId) {
        console.log("cab request accepted")
        await sendOtpToUser(phone,UserProfile);
        router.push(paths.dashboard.cabService.details(cabRequestId));
        } else {
          router.push(paths.dashboard.cabService.list);
        }
    },
    [router,sendOtpToUser]
  );

  // ambulance request confirm
  const handleConfirm = () => {
    // console.log(trip.newTrip.tripId);
    if (trip.success) {
      acceptTrip(trip);
      setModalOpen(false);
    }
  };

  // ambulance request cancel
  const handleCancel = () => {
    setModalOpen(false);
  };

  // delivery request manage
  const handleConfirmDelivery = () => {
    const { bookingId } = deliveryTrip;
    console.log(bookingId);
    if (bookingId) {
      acceptDeliveryTrip(bookingId);
      setDeliveryModal(false);
    }
  };

  const handleCancelDelivery = () => {
    setDeliveryModal(false);
  };

    // delivery request manage
    const handleConfirmCab = () => {
      const { cabRequestId,requester } = cabTrip;
      console.log(cabTrip);
      if (cabRequestId) {
        acceptCabTrip(cabRequestId,requester);
        setCabModal(false);
      }
    };

    const handleCancelcab = () => {
      setCabModal(false);
    };

  return (
    <>
      {trip !== null && (
        <ConfirmModal
          isOpen={modalOpen}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
          trip={trip}
        />
      )}
      {deliveryTrip !== null && (
        <DeliveryRequest
          isOpen={deliveryModal}
          onConfirm={handleConfirmDelivery}
          onCancel={handleCancelDelivery}
          data={deliveryTrip}
        />
      )}
      {cabTrip !== null && (
        <CabRequest
          isOpen={cabModal}
          onConfirm={handleConfirmCab}
          onCancel={handleCancelcab}
          data={cabTrip}
        />
      )}
    </>
  );
}

SocketImplement.propTypes = {
  userId: PropTypes.number.isRequired,
};
