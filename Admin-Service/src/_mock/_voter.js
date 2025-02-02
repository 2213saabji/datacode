// ----------------------------------------------------------------------

export const VOTER_GENDER_OPTIONS = [
  { label: 'MALE', value: 'Male' },
  { label: 'FEMALE', value: 'Female' },
  { label: 'OTHERS', value: 'Others' },
];

export const VOTER_CATEGORY_OPTIONS = ['Shose', 'Apparel', 'Accessories'];

export const VOTER_RATING_OPTIONS = ['up4Star', 'up3Star', 'up2Star', 'up1Star'];

export const VOTER_COLOR_OPTIONS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

export const VOTER_COUNTRY = [
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

export const VOTER_LEGAL_CASE_OPTIONS = [
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

export const INDIAN_POLITICAL_PARTIES = [
  { value: 'bjp', label: 'Bharatiya Janata Party (BJP)' },
  { value: 'inc', label: 'Indian National Congress (INC)' },
  { value: 'aap', label: 'Aam Aadmi Party (AAP)' },
  { value: 'bsp', label: 'Bahujan Samaj Party (BSP)' },
  { value: 'shivsena', label: 'Shiv Sena' },
  { value: 'cpim', label: 'Communist Party of India (Marxist) (CPI(M))' },
  { value: 'bjd', label: 'Biju Janata Dal (BJD)' },
  { value: 'tdp', label: 'Telugu Desam Party (TDP)' },
  { value: 'dmk', label: 'Dravida Munnetra Kazhagam (DMK)' },
  { value: 'jdu', label: 'Janata Dal (United) (JDU)' },
  { value: 'trs', label: 'Telangana Rashtra Samithi (TRS)' },
  { value: 'rdsd', label: 'Rajasthan Dev Sena Dal (RDSD)' },

  // Add more parties as needed
];

export const VOTER_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const VOTER_IDENTITY_OPTIONS = [
  { label: 'Type A', value: 'Type A' },
  { label: 'Type B', value: 'Type B' },
  { label: 'Type C', value: 'Type C' },
];

export const VOTER_SIGNATURE_OPTIONS = [
  { label: 'streetAddress', value: 'streetAddress' },
  { label: 'city', value: 'city' },
  { label: 'state', value: 'state' },
  { label: 'postalCode', value: 'postalCode' },
  { label: 'country', value: 'country' },
  { label: 'latitude', value: 'latitude' },
  { label: 'longitude', value: 'longitude' },
  { label: 'addressType', value: 'addressType' },
];

export const VOTER_SORT_OPTIONS = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'priceDesc', label: 'Price: High - Low' },
  { value: 'priceAsc', label: 'Price: Low - High' },
];

export const VOTER_CATEGORY_GROUP_OPTIONS = [
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

export const VOTER_CHECKOUT_STEPS = ['Cart', 'Billing & address', 'Payment'];
