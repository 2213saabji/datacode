// ----------------------------------------------------------------------

export const CANDIDATE_GENDER_OPTIONS = [
  { label: 'MALE', value: 'Male' },
  { label: 'FEMALE', value: 'Female' },
  { label: 'OTHERS', value: 'Others' },
];

export const CANDIDATE_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const CANDIDATE_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const CANDIDATE_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const CANDIDATE_COUNTRY = [
  { value: 'india', label: 'INDIA' },
  { value: 'afghanistan', label: 'AFGHANISTAN' },
  { value: 'armenia', label: 'ARMENIA' },
  { value: 'azerbaijan', label: 'AZERBAIJAN' },
  { value: 'bahrain', label: 'BAHRAIN' },
  { value: 'bangladesh', label: 'BANGLADESH' },
  { value: 'bhutan', label: 'BHUTAN' },
  { value: 'brunei', label: 'BRUNEI' },
  { value: 'cambodia', label: 'CAMBODIA' },
  { value: 'china', label: 'CHINA' },
  { value: 'cyprus', label: 'CYPRUS' },
  { value: 'georgia', label: 'GEORGIA' },
  { value: 'indonesia', label: 'INDONESIA' },
  { value: 'iran', label: 'IRAN' },
  { value: 'iraq', label: 'IRAQ' },
  { value: 'israel', label: 'ISRAEL' },
  { value: 'japan', label: 'JAPAN' },
  { value: 'jordan', label: 'JORDAN' },
  { value: 'kazakhstan', label: 'KAZAKHSTAN' },
  { value: 'kuwait', label: 'KUWAIT' },
  { value: 'kyrgyzstan', label: 'KYRGYZSTAN' },
  { value: 'laos', label: 'LAOS' },
  { value: 'lebanon', label: 'LEBANON' },
  { value: 'malaysia', label: 'MALAYSIA' },
  { value: 'maldives', label: 'MALDIVES' },
  { value: 'mongolia', label: 'MONGOLIA' },
  { value: 'myanmar', label: 'MYANMAR' },
  { value: 'nepal', label: 'NEPAL' },
  { value: 'north korea', label: 'NORTH KOREA' },
  { value: 'oman', label: 'OMAN' },
  { value: 'pakistan', label: 'PAKISTAN' },
  { value: 'palestine', label: 'PALESTINE' },
  { value: 'philippines', label: 'PHILIPPINES' },
  { value: 'qatar', label: 'QATAR' },
  { value: 'saudi arabia', label: 'SAUDI ARABIA' },
  { value: 'singapore', label: 'SINGAPORE' },
  { value: 'south korea', label: 'SOUTH KOREA' },
  { value: 'sri lanka', label: 'SRI LANKA' },
  { value: 'syria', label: 'SYRIA' },
  { value: 'taiwan', label: 'TAIWAN' },
  { value: 'tajikistan', label: 'TAJIKISTAN' },
  { value: 'thailand', label: 'THAILAND' },
  { value: 'timor-leste', label: 'TIMOR-LESTE' },
  { value: 'turkey', label: 'TURKEY' },
  { value: 'turkmenistan', label: 'TURKMENISTAN' },
  { value: 'united arab emirates', label: 'UNITED ARAB EMIRATES' },
  { value: 'uzbekistan', label: 'UZBEKISTAN' },
  { value: 'vietnam', label: 'VIETNAM' },
  { value: 'yemen', label: 'YEMEN' },
];

export const CANDIDATE_LEGAL_CASE_OPTIONS = [
  { value: '0', label: '0' },
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' },
];
export const CANDIDATE_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const CANDIDATE_IDENTITY_OPTIONS = [
  { label: 'Aadhaar', value: 'Aadhaar' },
  { label: 'PAN', value: 'Pan' },
  { label: 'Voter', value: 'Voter ID' },
];

export const CANDIDATE_SIGNATURE_OPTIONS = [
  { label: 'Thumb', value: 'Thumb' },
  { label: 'Physical', value: 'Physical' },
  { label: 'Digital', value: 'Digital' },
];

export const CANDIDATE_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const CANDIDATE_CATEGORY_GROUP_OPTIONS = [
  {
    group: 'Clothing',
    classify: ['Shirts', 'T-shirts', 'Jeans', 'Leather', 'Accessories'],
  },
  {
    group: 'Tailored',
    classify: ['Suits', 'Blazers', 'Trousers', 'Waistcoats', 'Apparel'],
  },
  {
    group: 'Accessories',
    classify: ['Shoes', 'Backpacks and bags', 'Bracelets', 'Face masks'],
  },
];

export const CANDIDATE_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];

export const INDIAN_CITIES = [
  { value: 'mumbai', label: 'Mumbai' },
  { value: 'delhi', label: 'Delhi' },
  { value: 'bangalore', label: 'Bangalore' },
  { value: 'hyderabad', label: 'Hyderabad' },
  { value: 'ahmedabad', label: 'Ahmedabad' },
  { value: 'chennai', label: 'Chennai' },
  { value: 'kolkata', label: 'Kolkata' },
  { value: 'pune', label: 'Pune' },
  { value: 'jaipur', label: 'Jaipur' },
  { value: 'surat', label: 'Surat' },
  { value: 'lucknow', label: 'Lucknow' },
  { value: 'kanpur', label: 'Kanpur' },
  { value: 'nagpur', label: 'Nagpur' },
  { value: 'visakhapatnam', label: 'Visakhapatnam' },
  { value: 'indore', label: 'Indore' },
  { value: 'thane', label: 'Thane' },
  { value: 'bhopal', label: 'Bhopal' },
  { value: 'patna', label: 'Patna' },
  { value: 'vadodara', label: 'Vadodara' },
  { value: 'ghaziabad', label: 'Ghaziabad' },
  { value: 'ludhiana', label: 'Ludhiana' },
  { value: 'agra', label: 'Agra' },
  { value: 'nashik', label: 'Nashik' },
  { value: 'faridabad', label: 'Faridabad' },
  { value: 'meerut', label: 'Meerut' },
  { value: 'rajkot', label: 'Rajkot' },
  { value: 'varanasi', label: 'Varanasi' },
  { value: 'srinagar', label: 'Srinagar' },
  { value: 'aurangabad', label: 'Aurangabad' },
  { value: 'dhanbad', label: 'Dhanbad' },
  { value: 'amritsar', label: 'Amritsar' },
  { value: 'allahabad', label: 'Allahabad' },
  { value: 'jabalpur', label: 'Jabalpur' },
  { value: 'ranchi', label: 'Ranchi' },
  { value: 'gwalior', label: 'Gwalior' },
  { value: 'vijayawada', label: 'Vijayawada' },
  { value: 'jodhpur', label: 'Jodhpur' },
  { value: 'madurai', label: 'Madurai' },
  { value: 'raipur', label: 'Raipur' },
  { value: 'kota', label: 'Kota' },
  { value: 'guwahati', label: 'Guwahati' },
  { value: 'chandigarh', label: 'Chandigarh' },
  { value: 'solapur', label: 'Solapur' },
  { value: 'hubli', label: 'Hubli' },
  { value: 'bareilly', label: 'Bareilly' },
  { value: 'moradabad', label: 'Moradabad' },
  { value: 'other', label: 'Other' },
];

export const EDUCATIONAL_DEGREES = [
  { value: 'High School Diploma', label: 'High School Diploma' },
  { value: 'Associate Degree', label: 'Associate Degree' },
  { value: "Bachelor's Degree", label: "Bachelor's Degree" },
  { value: "Master's Degree", label: "Master's Degree" },
  { value: 'Doctorate (Ph.D.)', label: 'Doctorate (Ph.D.)' },
  { value: 'Professional Degree', label: 'Professional Degree' },
  { value: 'Vocational Degree/Certificate', label: 'Vocational Degree/Certificate' },
  { value: 'Diploma', label: 'Diploma' },
  { value: 'Postdoctoral Degree', label: 'Postdoctoral Degree' },
  { value: 'Honorary Degree', label: 'Honorary Degree' },
  { value: 'No Education', label: 'No Education' },
];

export const JOB_TITLES = [
  // Professional & Technical
  { value: 'Farmer', label: 'Farmer' },
  { value: 'Labour', label: 'Labour' },
  { value: 'Student', label: 'Student' },
  { value: 'Self Employed', label: 'Self Employed' },
  { value: 'Government Employee', label: 'Government Employee' },
  { value: 'Private Employee', label: 'Private Employee' },
  { value: 'Others', label: 'Others' },

  // // Management
  // { value: 'Manager', label: 'Manager' },
  // { value: 'Project Manager', label: 'Project Manager' },
  // { value: 'Operations Manager', label: 'Operations Manager' },
  // { value: 'Human Resources Manager', label: 'Human Resources Manager' },
  // { value: 'Financial Manager', label: 'Financial Manager' },

  // // Sales & Marketing
  // { value: 'Sales Representative', label: 'Sales Representative' },
  // { value: 'Marketing Specialist', label: 'Marketing Specialist' },

  // // Administrative & Support
  // { value: 'Administrative Assistant', label: 'Administrative Assistant' },
  // { value: 'Executive Assistant', label: 'Executive Assistant' },
  // { value: 'Customer Service Representative', label: 'Customer Service Representative' },

  // // Healthcare Support
  // { value: 'Medical Assistant', label: 'Medical Assistant' },
  // { value: 'Dental Assistant', label: 'Dental Assistant' },

  // // Skilled Labor & Trade
  // { value: 'Plumber', label: 'Plumber' },
  // { value: 'Electrician', label: 'Electrician' },
  // { value: 'Carpenter', label: 'Carpenter' },
  // { value: 'Welder', label: 'Welder' },
  // { value: 'Mason', label: 'Mason' },
  // { value: 'Painter', label: 'Painter' },
  // { value: 'Mechanic', label: 'Mechanic' },

  // // Helper & Laborer
  // { value: 'Construction Worker', label: 'Construction Worker' },
  // { value: 'Warehouse Worker', label: 'Warehouse Worker' },
  // { value: 'Janitor', label: 'Janitor' },
  // { value: 'Landscaper', label: 'Landscaper' },
  // { value: 'Cleaner', label: 'Cleaner' },
  // { value: 'Driver', label: 'Driver' },
];
export const CITIZENSHIP_OPTIONS_INDIA = [
  { value: 'Indian', label: 'Indian' },
  { value: 'Non-Resident Indian (NRI)', label: 'Non-Resident Indian (NRI)' },
  { value: 'Overseas Citizen of India (OCI)', label: 'Overseas Citizen of India (OCI)' },
  { value: 'Person of Indian Origin (PIO)', label: 'Person of Indian Origin (PIO)' },
  { value: 'Foreign Citizen', label: 'Foreign Citizen' },
];

export const Product_Name = [
  // Professional & Technical
  { value: 1, label: 'EMS' },
  { value: 2, label: 'LMS' },
  { value: 3, label: 'TMS' },
  { value: 4, label: 'BMS' },
];
