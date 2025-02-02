import PropTypes from 'prop-types';
import { useState, useCallback } from 'react';

import { Box } from '@mui/system';
import { Container } from '@mui/material';

import { useAuthContext } from 'src/auth/hooks';
import { useGetCompalintsState, useGetCompalintsCenter } from 'src/api/blog';

import SvgColor from 'src/components/svg-color';

import ComplaintCard from './complaint-card';
import ComplaintTabs from './complaint-tabs';

const subProblems = [
  { title: 'Staffing shortages', navigate: 'https://dge.gov.in/dge/LMIS_Dashboard' },
  {
    title: 'Financial constraints',
    navigate:
      'https://journals.sagepub.com/doi/10.1177/0972262920988390?icid=int.sj-full-text.similar-articles.9',
  },
  {
    title: 'Patient overcrowding',
    navigate: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC9498666/',
  },
  {
    title: 'Medical errors and patient safety',
    navigate: 'https://www.ncbi.nlm.nih.gov/books/NBK2652/',
  },
  {
    title: 'Technology integration and interoperability',
    navigate: 'https://indiaai.gov.in/ai-standards/interoperability',
  },
  { title: 'Regulatory compliance', navigate: 'https://eodbrcp.dpiit.gov.in/' },
  {
    title: 'Patient satisfaction and experience',
    navigate: 'https://www.ncbi.nlm.nih.gov/pmc/articles/PMC8433860/',
  },
  {
    title: 'Resource allocation',
    navigate: 'https://www.shiksha.com/online-courses/resource-allocation-certification',
  },
  {
    title: 'Emergency preparedness and disaster response',
    navigate: 'https://sachet.ndma.gov.in/',
  },
  {
    title: 'Ethical dilemmas',
    navigate: 'https://www.clearias.com/ethical-concerns-dilemmas-government-private-institutions/',
  },
];

const central = [
  {
    title: 'Staffing shortages',
    description: 'स्टाफ की कमी',
    path: '/assets/images/complaintSection2/HospitalIssues/center/Staffing-shortages.webp',
    email: 'contact@mohfw.gov.in',
  },
  {
    title: 'Financial constraints',
    description: 'वित्तीय बाधाएँ',
    path: '/assets/images/complaintSection2/HospitalIssues/center/FINANCIALCONSTRAINTS.webp',
    email: 'contactus@finmin.nic.in',
  },
  {
    title: 'Patient overcrowding',
    description: 'मरीज़ों की भीड़भाड़',
    path: '/assets/images/complaintSection2/HospitalIssues/center/PatientOvercrowding.webp',
    email: 'contact@mohfw.gov.in',
  },
  {
    title: 'Medical errors and patient safety',
    description: 'चिकित्सीय त्रुटियाँ और रोगी सुरक्षा',
    path: '/assets/images/complaintSection2/HospitalIssues/center/Medical-errors-and-patientSafety.webp',
    email: 'nabhnabh@gmail.com',
  },
  {
    title: 'Technology integration and interoperability',
    description: 'प्रौद्योगिकी एकीकरण और अंतरसंचालनीयता',
    path: '/assets/images/complaintSection2/HospitalIssues/center/Technology-integration-and-interoperability(2).webp',
    email: 'contact@moahfw.nic.in',
  },
  {
    title: 'Regulatory compliance',
    description: 'विनियामक अनुपालन',
    path: '/assets/images/complaintSection2/HospitalIssues/center/RegulatoryCompliance.webp',
    email: 'dci@nic.in',
  },
  {
    title: 'Patient satisfaction and experience',
    description: 'रोगी की संतुष्टि और अनुभव',
    path: '/assets/images/complaintSection2/HospitalIssues/center/Patient Satisfaction and experience.webp',
    email: 'info@nabh.co',
  },
  {
    title: 'Resource allocation',
    description: 'संसाधन आवंटन',
    path: '/assets/images/complaintSection2/HospitalIssues/center/ETHICALDILEMMAS.webp',
    email: 'contact@mohfw.gov.in',
  },
  {
    title: 'Emergency preparedness and disaster response',
    description: 'आपातकालीन तैयारी और आपदा प्रतिक्रिया',
    path: '/assets/images/complaintSection2/HospitalIssues/center/EMERGENCY PREPAREDNESS AND DISASTER RESPONSE.webp',
    email: 'info@ndma.gov.in',
  },
  {
    title: 'Ethical dilemmas',
    description: 'नैतिक दुविधाएँ',
    path: '/assets/images/complaintSection2/HospitalIssues/center/ETHICALDILEMMAS(2).webp',
    email: 'info@ndma.gov.in',
  },
];

// Update the navigate property in central array using subProblems array
central.forEach((problem) => {
  const matchedProblem = subProblems.find((subProblem) => subProblem.title === problem.title);
  if (matchedProblem) {
    problem.navigate = matchedProblem.navigate;
  }
});

export default function ComplaintHospital({ id }) {
  const { user } = useAuthContext();
  const [currentTab, setCurrentTab] = useState('central');
  const { complaintsAllCards } = useGetCompalintsCenter(id);
  const { complaintsAllStateCards } = useGetCompalintsState(
    id,
    user?.UserAddressesses?.[0]?.userState
  );
  console.log('complaintsCenterCards', complaintsAllCards);

  const handleChangeTab = useCallback((event, newValue) => {
    setCurrentTab(newValue);
  }, []);

  const icon = (name) => <SvgColor src={`/assets/icons/menuicons/${name}.svg`} />;

  const TABS = [
    {
      value: 'central',
      label: 'Central Complaint',
      icon: icon('Profile'),
    },
    {
      value: 'state',
      label: 'State Complaint',
      icon: icon('Profile'),
    },
  ];

  return (
    <Container
      sx={{
        pl: 2,
        pb: 10,
        pt: { xs: 1, md: 2 },
        position: 'relative',
      }}
    >
      <Box
        gap={2}
        display="grid"
        gridTemplateColumns={{
          xs: 'repeat(1, 1fr)',
          md: 'repeat(1, 1fr)',
        }}
      >
        <ComplaintTabs activeTab={currentTab} handleChangeTab={handleChangeTab} tabs={TABS} />

        {currentTab === 'state' && <ComplaintCard cards={complaintsAllStateCards} />}

        {currentTab === 'central' && <ComplaintCard cards={complaintsAllCards} />}
      </Box>
    </Container>
  );
}

ComplaintHospital.propTypes = {
  id: PropTypes.string.isRequired,
};
