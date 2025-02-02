export const SERVICE_OPTIONS = [
    { label: 'Open', value: 'open' },
    { label: 'Close', value: 'close' },
    { label: 'Upcoming', value: 'upcoming' },
  ];
export const SERVICE_PROVIDER_TYPE = [
  {label: 'Lawyer',value:'lawyer'},
  {label:'Vendor',value:'vendor'},
  {label:'CA',value:'ca'}
]
  export const SERVICE_AREA = [
    { label: "Andhra Pradesh", value: "andhra_pradesh" },
    { label: "Arunachal Pradesh", value: "arunachal_pradesh" },
    { label: "Assam", value: "assam" },
    { label: "Bihar", value: "bihar" },
    { label: "Chhattisgarh", value: "chhattisgarh" },
    { label: "Goa", value: "goa" },
    { label: "Gujarat", value: "gujarat" },
    { label: "Haryana", value: "haryana" },
    { label: "Himachal Pradesh", value: "himachal_pradesh" },
    { label: "Jharkhand", value: "jharkhand" },
    { label: "Karnataka", value: "karnataka" },
    { label: "Kerala", value: "kerala" },
    { label: "Madhya Pradesh", value: "madhya_pradesh" },
    { label: "Maharashtra", value: "maharashtra" },
    { label: "Manipur", value: "manipur" },
    { label: "Meghalaya", value: "meghalaya" },
    { label: "Mizoram", value: "mizoram" },
    { label: "Nagaland", value: "nagaland" },
    { label: "Odisha", value: "odisha" },
    { label: "Punjab", value: "punjab" },
    { label: "Rajasthan", value: "rajasthan" },
    { label: "Sikkim", value: "sikkim" },
    { label: "Tamil Nadu", value: "tamil_nadu" },
    { label: "Telangana", value: "telangana" },
    { label: "Tripura", value: "tripura" },
    { label: "Uttar Pradesh", value: "uttar_pradesh" },
    { label: "Uttarakhand", value: "uttarakhand" },
    { label: "West Bengal", value: "west_bengal" }
];
 
export const DISTRICT_OPTIONS = [
  { label: 'Ajmer', value: 'ajmer' },
  { label: 'Alwar', value: 'alwar' },
  { label: 'Banswara', value: 'banswara' },
  { label: 'Baran', value: 'baran' },
  { label: 'Barmer', value: 'barmer' },
  { label: 'Bharatpur', value: 'bharatpur' },
  { label: 'Bhilwara', value: 'bhilwara' },
  { label: 'Bikaner', value: 'bikaner' },
  { label: 'Bundi', value: 'bundi' },
  { label: 'Chittorgarh', value: 'chittorgarh' },
  { label: 'Churu', value: 'churu' },
  { label: 'Dausa', value: 'dausa' },
  { label: 'Dholpur', value: 'dholpur' },
  { label: 'Dungarpur', value: 'dungarpur' },
  { label: 'Hanumangarh', value: 'hanumangarh' },
  { label: 'Jaipur', value: 'jaipur' },
  { label: 'Jaisalmer', value: 'jaisalmer' },
  { label: 'Jalore', value: 'jalore' },
  { label: 'Jhalawar', value: 'jhalawar' },
  { label: 'Jhunjhunu', value: 'jhunjhunu' },
  { label: 'Jodhpur', value: 'jodhpur' },
  { label: 'Karauli', value: 'karauli' },
  { label: 'Kota', value: 'kota' },
  { label: 'Nagaur', value: 'nagaur' },
  { label: 'Pali', value: 'pali' },
  { label: 'Pratapgarh', value: 'pratapgarh' },
  { label: 'Rajsamand', value: 'rajsamand' },
  { label: 'Rajasthan', value: 'rajasthan' },
  { label: 'Sawai Madhopur', value: 'sawai_madhopur' },
  { label: 'Sikar', value: 'sikar' },
  { label: 'Sirohi', value: 'sirohi' },
  { label: 'Tonk', value: 'tonk' },
  { label: 'Udaipur', value: 'udaipur' },
];
export const TEHSIL_OPTIONS = [
  { label: 'Ajmer', value: 'ajmer', tehsils: [
    { label: 'Ajmer', value: 'ajmer' },
    { label: 'Beawar', value: 'beawar' },
    { label: 'Kishangarh', value: 'kishangarh' },
    { label: 'Masuda', value: 'masuda' },
    { label: 'Nasirabad', value: 'nasirabad' },
    { label: 'Ratangarh', value: 'ratangarh' }
  ]},
  { label: 'Alwar', value: 'alwar', tehsils: [
    { label: 'Alwar', value: 'alwar' },
    { label: 'Bhiwadi', value: 'bhiwadi' },
    { label: 'Kishangarh Bas', value: 'kishangarh_bas' },
    { label: 'Laxmangarh', value: 'laxmangarh' },
    { label: 'Rajgarh', value: 'rajgarh' },
    { label: 'Siliserh', value: 'siliserh' }
  ]},
  { label: 'Bikaner', value: 'bikaner', tehsils: [
    { label: 'Bikaner', value: 'bikaner' },
    { label: 'Deshnoke', value: 'deshnoke' },
    { label: 'Lalgarh', value: 'lalgarh' },
    { label: 'Pugal', value: 'pugal' },
    { label: 'Khajuwala', value: 'khajuwala' }
  ]},
  { label: 'Jodhpur', value: 'jodhpur', tehsils: [
    { label: 'Jodhpur', value: 'jodhpur' },
    { label: 'Osian', value: 'osian' },
    { label: 'Bhopalgarh', value: 'bhopalgarh' },
    { label: 'Mandal', value: 'mandal' },
    { label: 'Phalodi', value: 'phalodi' }
  ]},
  { label: 'Udaipur', value: 'udaipur', tehsils: [
    { label: 'Udaipur', value: 'udaipur' },
    { label: 'Kotra', value: 'kotra' },
    { label: 'Girwa', value: 'girwa' },
    { label: 'Salumber', value: 'salumber' },
    { label: 'Mavli', value: 'mavli' }
  ]},
  { label: 'Jaipur', value: 'jaipur', tehsils: [
    { label: 'Jaipur North', value: 'jaipur_north' },
    { label: 'Jaipur South', value: 'jaipur_south' },
    { label: 'Bagru', value: 'bagru' },
    { label: 'Sanganer', value: 'sanganer' },
    { label: 'Phagi', value: 'phagi' }
  ]}
];
export const VILLAGE_OPTIONS = [
  { label: 'Ajmer', tehsil: 'Ajmer' },
  { label: 'Beawar', tehsil: 'Ajmer' },
  { label: 'Bhilwara', tehsil: 'Ajmer' },
  { label: 'Kharwa', tehsil: 'Ajmer' },
  { label: 'Kotra', tehsil: 'Ajmer' },
  { label: 'Manoharpur', tehsil: 'Ajmer' },
  { label: 'Nasirabad', tehsil: 'Ajmer' },
  { label: 'Rohat', tehsil: 'Ajmer' },
  { label: 'Sarwar', tehsil: 'Ajmer' },
  { label: 'Sankhera', tehsil: 'Ajmer' },
 
  { label: 'Kishangarh', tehsil: 'Kishangarh' },
  { label: 'Nandri', tehsil: 'Kishangarh' },
  { label: 'Ranoli', tehsil: 'Kishangarh' },
  { label: 'Sirohi', tehsil: 'Kishangarh' },
  { label: 'Thikariya', tehsil: 'Kishangarh' },
  { label: 'Tonk', tehsil: 'Kishangarh' },
 
  { label: 'Bhanwaria', tehsil: 'Nasirabad' },
  { label: 'Jaitpura', tehsil: 'Nasirabad' },
  { label: 'Kharwa', tehsil: 'Nasirabad' },
  { label: 'Kharwa Kalan', tehsil: 'Nasirabad' },
  { label: 'Pithana', tehsil: 'Nasirabad' },
 
  { label: 'Merta City', tehsil: 'Merta' },
  { label: 'Bilara', tehsil: 'Merta' },
  { label: 'Dhani', tehsil: 'Merta' },
  { label: 'Ladpura', tehsil: 'Merta' },
  { label: 'Pallu', tehsil: 'Merta' },
  { label: 'Salapura', tehsil: 'Merta' },
 
  { label: 'Rohat', tehsil: 'Rohat' },
  { label: 'Dhandholi', tehsil: 'Rohat' },
  { label: 'Gagwana', tehsil: 'Rohat' },
  { label: 'Jakhod', tehsil: 'Rohat' },
  { label: 'Sangal', tehsil: 'Rohat' },
 
  { label: 'Sarwar', tehsil: 'Sarwar' },
  { label: 'Kaloongi', tehsil: 'Sarwar' },
  { label: 'Kanhaiya', tehsil: 'Sarwar' },
  { label: 'Kharwa', tehsil: 'Sarwar' },
  { label: 'Modak', tehsil: 'Sarwar' },
 
  { label: 'Beawar', tehsil: 'Beawar' },
  { label: 'Aligarh', tehsil: 'Beawar' },
  { label: 'Barna', tehsil: 'Beawar' },
  { label: 'Doodhwa', tehsil: 'Beawar' },
  { label: 'Gudha', tehsil: 'Beawar' },
];
export const COURT_TYPES = [
  { label: 'Criminal Court', value: 'criminal' },
  { label: 'Civil Court', value: 'civil' },
  { label: 'Family Court', value: 'family' },
  { label: 'Traffic Court', value: 'traffic' },
  { label: 'Probate Court', value: 'probate' },
  { label: 'Juvenile Court', value: 'juvenile' },
  { label: 'Small Claims Court', value: 'small_claims' },
  { label: 'Landlord-Tenant Court', value: 'landlord_tenant' },
];