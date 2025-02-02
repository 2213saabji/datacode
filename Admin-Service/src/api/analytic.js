import useSWR from 'swr';
import { useMemo } from 'react';

// import axios from 'src/utils/axios' ;

import { fetcher, endpoints } from 'src/utils/axios-analytic';

// ----------------------------------------------------------------------
// ----------------------------------------------------------------------
// Fetch Api Calls For Analytics
// ----------------------------------------------------------------------

// trip starts
export function useGetTrips() {
  const URL = endpoints.trip.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      trips: data || [],
      tripsLoading: isLoading,
      tripsError: error,
      tripsValidating: isValidating,
      tripsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetTrip(tripId) {
  const URL = tripId ? `${endpoints.trip.status}/${tripId}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      trip: data,
      tripLoading: isLoading,
      tripError: error,
      tripValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

//   trip ends

// elections starts
export function useGetElections() {
  const URL = endpoints.election.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      elections: data || [],
      electionsLoading: isLoading,
      electionsError: error,
      electionsValidating: isValidating,
      electionsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// election ends

// ----------------------------------------------------------------------

// booth starts
export function useGetBooths() {
  const URL = endpoints.booth.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      booths: data || [],
      boothsLoading: isLoading,
      boothsError: error,
      boothsValidating: isValidating,
      boothsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// booth ends

// ----------------------------------------------------------------------

// wards starts
export function useGetWards() {
  const URL = endpoints.ward.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      wards: data || [],
      wardsLoading: isLoading,
      wardsError: error,
      wardsValidating: isValidating,
      wardsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// booth ends

// ----------------------------------------------------------------------

// polling starts
export function useGetPolling() {
  const URL = endpoints.pollingStation.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      pollingStations: data || [],
      pollingStationsLoading: isLoading,
      pollingStationsError: error,
      pollingStationsValidating: isValidating,
      pollingStationsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// polling ends

// ----------------------------------------------------------------------

// candidates starts
export function useGetCandidates() {
  const URL = endpoints.candidate.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      candidates: data || [],
      candidatesLoading: isLoading,
      candidatesError: error,
      candidatesValidating: isValidating,
      candidatesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetCandidateByFilter(filterType) {
  const URL = filterType ? `${endpoints.trip.filter}/${filterType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      candidates: data,
      candidatesLoading: isLoading,
      candidatesError: error,
      candidatesValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// candidate ends

// ----------------------------------------------------------------------

// voters starts
export function useGetVoters() {
  const URL = endpoints.voter.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      voters: data || [],
      votersLoading: isLoading,
      votersError: error,
      votersValidating: isValidating,
      votersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// voters ends

// male voters starts
export function useGetMaleVoters() {
  const URL = endpoints.voter.male;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      maleVoters: data || [],
      maleVotersLoading: isLoading,
      votersError: error,
      votersValidating: isValidating,
      votersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// voters ends

// female voters starts
export function useGetFemaleVoters() {
  const URL = endpoints.voter.female;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      femaleVoters: data || [],
      femaleVotersLoading: isLoading,
      votersError: error,
      votersValidating: isValidating,
      votersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// voters ends

// Youth voters starts
export function useGetYouthVoters() {
  const URL = endpoints.voter.youth;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      youthVoters: data || [],
      youthVotersLoading: isLoading,
      votersError: error,
      votersValidating: isValidating,
      votersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// voters ends

// elderly voters starts
export function useGetElderlyVoters() {
  const URL = endpoints.voter.elder;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      elderlyVoters: data || [],
      elderlyVotersLoading: isLoading,
      votersError: error,
      votersValidating: isValidating,
      votersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}
// voters ends

// ----------------------------------------------------------------------

// drivers starts
export function useGetDrivers() {
  const URL = endpoints.driver.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      drivers: data || [],
      driversLoading: isLoading,
      driversError: error,
      driversValidating: isValidating,
      driversEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// drivers ends

// ----------------------------------------------------------------------

// users starts
export function useGetUsers() {
  // console.log(endpoints.user.all);
  const URL = endpoints.user.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      users: data || [],
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
      usersEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );

  // console.log(memoizedValue)
  return memoizedValue;
}

// ----------------------------------------------------------------------

export function useGetUsersByRole(roleType) {
  const URL = roleType ? `${endpoints.trip.role}/${roleType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      users: data,
      usersLoading: isLoading,
      usersError: error,
      usersValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// users ends

// ----------------------------------------------------------------------

// claims starts
export function useGetClaims() {
  const URL = endpoints.claim.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      claims: data || [],
      claimsLoading: isLoading,
      claimsError: error,
      claimsValidating: isValidating,
      claimsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// claims ends

export function useGetClaimByStatus(statusType) {
  const URL = statusType ? `${endpoints.claim.status}/${statusType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      claims: data,
      claimsLoading: isLoading,
      claimsError: error,
      claimsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// vehicles starts
export function useGetVehicles() {
  const URL = endpoints.vehicle.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      vehicles: data || [],
      vehiclesLoading: isLoading,
      vehiclesError: error,
      vehiclesValidating: isValidating,
      vehiclesEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// vehicles ends

// ----------------------------------------------------------------------

// otp starts
export function useGetOtps() {
  const URL = endpoints.otp.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      otps: data || [],
      otpsLoading: isLoading,
      otpsError: error,
      otpsValidating: isValidating,
      otpsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// otp ends

export function useGetOtpsByStatus(statusType) {
  const URL = statusType ? `${endpoints.claim.status}/${statusType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      otps: data,
      otpsLoading: isLoading,
      otpsError: error,
      otpsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------
// email otp starts
export function useGetEmailOtps() {
  const URL = endpoints.emailOtp.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      emailOtps: data || [],
      otpsLoading: isLoading,
      otpsError: error,
      otpsValidating: isValidating,
      otpsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// otp ends

export function useGetEmailOtpsByStatus(statusType) {
  const URL = statusType ? `${endpoints.claim.status}/${statusType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      otps: data,
      otpsLoading: isLoading,
      otpsError: error,
      otpsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// ----------------------------------------------------------------------

// contact starts
export function useGetContacts() {
  const URL = endpoints.contact.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      contacts: data || [],
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
      contactsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}
// otp ends

export function useGetContactsByStatus(statusType) {
  const URL = statusType ? `${endpoints.contact.status}/${statusType}` : null;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      contacts: data,
      contactsLoading: isLoading,
      contactsError: error,
      contactsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

// Survey
// claims starts
export function useGetActiveSurveys() {
  const URL = endpoints.survey.active;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      activeSurvey: data || [],
      activeSurveyLoading: isLoading,
      activeSurveyError: error,
      activeSurveyValidating: isValidating,
      activeSurveyEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetClosedSurveys() {
  const URL = endpoints.survey.closed;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      closedSurvey: data || [],
      closedSurveyLoading: isLoading,
      closedSurveyError: error,
      closedSurveyValidating: isValidating,
      closedSurveyEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetProjects() {
  const URL = endpoints.project.counts;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      projects: data || [],
      projectsLoading: isLoading,
      projectsError: error,
      projectsValidating: isValidating,
      projectsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

// complaint starts
export function useGetComplaints() {
  const URL = endpoints.complaint.all;
  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      complaints: data || [],
      complaintsLoading: isLoading,
      complaintsError: error,
      complaintsValidating: isValidating,
      complaintsEmpty: !isLoading && !data?.length,
    }),
    [data, error, isLoading, isValidating]
  );
  return memoizedValue;
}

export function useGetComplaintsInprogress() {
  const URL = endpoints.complaint.progres;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      complaintsInprogress: data,
      complaintsInprogressLoading: isLoading,
      complaintsError: error,
      complaintsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetComplaintsActive() {
  const URL = endpoints.complaint.active;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      complaintsActive: data,
      complaintsActiveLoading: isLoading,
      complaintsError: error,
      complaintsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetComplaintsClosed() {
  const URL = endpoints.complaint.closed;

  const { data, isLoading, error, isValidating } = useSWR(URL, fetcher);
  const memoizedValue = useMemo(
    () => ({
      complaintsClosed: data,
      complaintsClosedLoading: isLoading,
      complaintsError: error,
      complaintsValidating: isValidating,
    }),
    [data, error, isLoading, isValidating]
  );

  return memoizedValue;
}

export function useGetYouthGenderCounts() {
  const maleURL = endpoints.youth.male;
  const femaleURL = endpoints.youth.female;

  const {
    data: maleData,
    isLoading: maleLoading,
    error: maleError,
    isValidating: maleValidating,
  } = useSWR(maleURL, fetcher);
  const {
    data: femaleData,
    isLoading: femaleLoading,
    error: femaleError,
    isValidating: femaleValidating,
  } = useSWR(femaleURL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      male: maleData?.data?.[0]?.total_youth_voters,
      female: femaleData?.data?.[0]?.total_youth_voters,
      maleLoading,
      maleError,
      maleValidating,
      femaleLoading,
      femaleError,
      femaleValidating,
    }),
    [
      maleData,
      femaleData,
      maleLoading,
      maleError,
      maleValidating,
      femaleLoading,
      femaleError,
      femaleValidating,
    ]
  );

  return memoizedValue;
}

export function useGetVoterReligionCounts() {
  const sikhURL = endpoints.religion.sikh;
  const hinduURL = endpoints.religion.hindu;
  const muslimURL = endpoints.religion.muslim;
  const christianURL = endpoints.religion.christian;

  const {
    data: sikhData,
    isLoading: sikhLoading,
    error: sikhError,
    isValidating: sikhValidating,
  } = useSWR(sikhURL, fetcher);
  const {
    data: hinduData,
    isLoading: hinduLoading,
    error: hinduError,
    isValidating: hinduValidating,
  } = useSWR(hinduURL, fetcher);
  const {
    data: muslimData,
    isLoading: muslimLoading,
    error: muslimError,
    isValidating: muslimValidating,
  } = useSWR(muslimURL, fetcher);
  const {
    data: christianData,
    isLoading: christianLoading,
    error: christianError,
    isValidating: christianValidating,
  } = useSWR(christianURL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      sikh: sikhData,
      hindu: hinduData,
      muslim: muslimData,
      christian: christianData,
      sikhLoading,
      sikhError,
      sikhValidating,
      hinduLoading,
      hinduError,
      hinduValidating,
      muslimLoading,
      muslimError,
      muslimValidating,
      christianLoading,
      christianError,
      christianValidating,
    }),
    [
      sikhData,
      sikhLoading,
      sikhError,
      sikhValidating,
      hinduData,
      hinduLoading,
      hinduError,
      hinduValidating,
      muslimData,
      muslimLoading,
      muslimError,
      muslimValidating,
      christianData,
      christianLoading,
      christianError,
      christianValidating,
    ]
  );

  return memoizedValue;
}

export function useGetVoterJobCounts() {
  const businessmanURL = endpoints.job.businessman;
  const labourURL = endpoints.job.labour;
  const farmerURL = endpoints.job.farmer;
  const governmentURL = endpoints.job.government;

  const {
    data: businessmanData,
    isLoading: businessmanLoading,
    error: businessmanError,
    isValidating: businessmanValidating,
  } = useSWR(businessmanURL, fetcher);
  const {
    data: labourData,
    isLoading: labourLoading,
    error: labourError,
    isValidating: labourValidating,
  } = useSWR(labourURL, fetcher);
  const {
    data: farmerData,
    isLoading: farmerLoading,
    error: farmerError,
    isValidating: farmerValidating,
  } = useSWR(farmerURL, fetcher);
  const {
    data: governmentData,
    isLoading: governmentLoading,
    error: governmentError,
    isValidating: governmentValidating,
  } = useSWR(governmentURL, fetcher);

  const memoizedValue = useMemo(
    () => ({
      businessman: businessmanData,
      labour: labourData,
      farmer: farmerData,
      government: governmentData,
      businessmanLoading,
      businessmanError,
      businessmanValidating,
      labourLoading,
      labourError,
      labourValidating,
      farmerLoading,
      farmerError,
      farmerValidating,
      governmentLoading,
      governmentError,
      governmentValidating,
    }),
    [
      businessmanData,
      businessmanLoading,
      businessmanError,
      businessmanValidating,
      labourData,
      labourLoading,
      labourError,
      labourValidating,
      farmerData,
      farmerLoading,
      farmerError,
      farmerValidating,
      governmentData,
      governmentLoading,
      governmentError,
      governmentValidating,
    ]
  );

  return memoizedValue;
}
