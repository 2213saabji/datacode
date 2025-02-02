// hooks/useFetchDoctors.js

import { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { fetchalldoctor } from '../../redux/slices/CMS/doctorappointmentbooking'; // Adjust path as necessary
import { useCustomAlert } from '../../utilities/Alert/useCustomAlert';

const useFetchDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const { showAlert } = useCustomAlert();

  const fetchDoctors = useCallback(async () => {
    try {
      const result = await dispatch(fetchalldoctor());
      if (fetchalldoctor.fulfilled.match(result)) {
        setDoctors(result.payload);
      } else {
        showAlert('Failed To Fetch Doctors');
      }
    } catch (error) {
      showAlert('Error', 'An unexpected error occurred');
    }
  }, [dispatch, showAlert]);

  useEffect(() => {
    fetchDoctors(); // Fetch doctors when the component mounts
  }, [fetchDoctors]);

  return doctors;
};

export default useFetchDoctors;
