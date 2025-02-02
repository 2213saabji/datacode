export const ELECTION_METHODS_OPTIONS = [
  { value: 'FPTP', label: 'First Past the Post (FPTP)' },
  { value: 'PR', label: 'Proportional Representation (PR)' },
  { value: 'EVM', label: 'Electronic Voting Machines (EVMs)' },
  { value: 'Postal Voting', label: 'Postal Voting' },
  { value: 'Ballot Paper Voting', label: 'Ballot Paper Voting' },
  { value: 'VVPAT', label: 'Voter Verified Paper Audit Trail (VVPAT)' },
];

export const ELECTION_ELIGIBILITY_TYPE_OPTIONS = [
  { label: 'NRI', value: 'NRI' },
  { label: 'CITIZEN', value: 'Citizen' },
];

export const ELECTION_CONFIGURATION_TYPE_OPTIONS = [
  { label: 'PUBLIC', value: 'Public' },
  { label: 'STANDARD', value: 'Standard' },
];

export const ELECTION_TYPE_OPTIONS = [
  { value: 'mp', label: 'Member of Parliament (MP)' },
  { value: 'mla', label: 'Member of Legislative Assembly (MLA)' },
  { value: 'nagar_nigam_chairman', label: 'Nagar Nigam (Chairman)' },
  { value: 'nagar_nigam_parishad', label: 'Nagar Nigam Parishad' },
  { value: 'zila_pramukh', label: 'Zila Pramukh' },
  { value: 'zila_parishad', label: 'Zila Parishad' },
  { value: 'panchayat_samiti_pradhan', label: 'Panchayat Samiti Pradhan' },
  { value: 'panchayat_samiti_member', label: 'Panchayat Samiti Member' },
  { value: 'sarpanch', label: 'Sarpanch' },
  { value: 'ward_panch', label: 'Ward Panch' },
];
