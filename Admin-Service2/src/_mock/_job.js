import { countries } from 'src/assets/data';

import { _mock } from './_mock';

// ----------------------------------------------------------------------

export const JOB_DETAILS_TABS = [
  { value: 'content', label: 'Job Content' },
  { value: 'candidates', label: 'Candidates' },
];

export const SURVEY_DETAILS_TABS = [
  { value: 'content', label: 'Survey Content' },
  { value: 'candidates', label: 'Candidates Filled' },
];

export const JOB_SKILL_OPTIONS = [
  'UI',
  'UX',
  'Html',
  'JavaScript',
  'TypeScript',
  'Communication',
  'Problem Solving',
  'Leadership',
  'Time Management',
  'Adaptability',
  'Collaboration',
  'Creativity',
  'Critical Thinking',
  'Technical Skills',
  'Customer Service',
  'Project Management',
  'Problem Diagnosis',
];

export const JOB_WORKING_SCHEDULE_OPTIONS = [
  'Monday to Friday',
  'Weekend availability',
  'Day shift',
];

export const JOB_DISTANCE_OPTIONS = [
  { value: 10, label: '10 Km' },
  { value: 20, label: '20 Km' },
  { value: 40, label: '40 Km' },
  { value: 60, label: '60 Km' },
  { value: 80, label: '80 Km' },
  { value: 100, label: '100 Km' },
];

export const JOB_EMPLOYMENT_TYPE_OPTIONS = [
  { value: 'Full Time', label: 'Full Time' },
  { value: 'Part Time', label: 'Part Time' },
  { value: 'On Demand', label: 'On Demand' },
];

export const JOB_EXPERIENCE_OPTIONS = [
  { value: 'No experience', label: 'No experience' },
  { value: '1 year exp', label: '1 year exp' },
  { value: '2 year exp', label: '2 year exp' },
  { value: '> 3 year exp', label: '> 3 year exp' },
];

export const JOB_BENEFIT_OPTIONS = [
  { value: 'Free parking', label: 'Free parking' },
  { value: 'Bonus commission', label: 'Bonus commission' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Device support', label: 'Device support' },
  { value: 'Health care', label: 'Health care' },
  { value: 'Training', label: 'Training' },
  { value: 'Health Insurance', label: 'Health Insurance' },
  { value: 'Retirement Plans', label: 'Retirement Plans' },
  { value: 'Paid Time Off', label: 'Paid Time Off' },
  { value: 'Flexible Work Schedule', label: 'Flexible Work Schedule' },
];

export const JOB_CATEGORY_PLUMBER = [
  {
    value: 'residential_plumbing',
    label: 'Residential Plumbing',
  },
  {
    value: 'commercial_plumbing',
    label: 'Commercial Plumbing',
  },
  {
    value: 'industrial_plumbing',
    label: 'Industrial Plumbing',
  },
  {
    value: 'service_and_repair_plumbing',
    label: 'Service and Repair Plumbing',
  },
  {
    value: 'new_construction_plumbing',
    label: 'New Construction Plumbing',
  },
  {
    value: 'water_supply_plumbing',
    label: 'Water Supply Plumbing',
  },
  {
    value: 'gas_plumbing',
    label: 'Gas Plumbing',
  },
  {
    value: 'drainage_and_waste_plumbing',
    label: 'Drainage and Waste Plumbing',
  },
  {
    value: 'emergency_plumbing',
    label: 'Emergency Plumbing',
  },
];

export const JOB_CATEGORY_CARPENTER = [
  {
    value: 'residential_carpentry',
    label: 'Residential Carpentry',
  },
  {
    value: 'commercial_carpentry',
    label: 'Commercial Carpentry',
  },
  {
    value: 'finish_carpentry',
    label: 'Finish Carpentry',
  },
  {
    value: 'rough_carpentry',
    label: 'Rough Carpentry',
  },
  {
    value: 'cabinetmaking',
    label: 'Cabinetmaking',
  },
  {
    value: 'framing',
    label: 'Framing',
  },
  {
    value: 'formwork',
    label: 'Formwork',
  },
  {
    value: 'restoration_carpentry',
    label: 'Restoration Carpentry',
  },
  {
    value: 'remodeling_carpentry',
    label: 'Remodeling Carpentry',
  },
];

export const JOB_CATEGORY_MECHANIC = [
  {
    value: 'automotive_mechanic',
    label: 'Automotive Mechanic',
  },
  {
    value: 'diesel_mechanic',
    label: 'Diesel Mechanic',
  },
  {
    value: 'aircraft_mechanic',
    label: 'Aircraft Mechanic',
  },
  {
    value: 'marine_mechanic',
    label: 'Marine Mechanic',
  },
  {
    value: 'industrial_mechanic',
    label: 'Industrial Mechanic',
  },
  {
    value: 'motorcycle_mechanic',
    label: 'Motorcycle Mechanic',
  },
  {
    value: 'heavy_equipment_mechanic',
    label: 'Heavy Equipment Mechanic',
  },
  {
    value: 'small_engine_mechanic',
    label: 'Small Engine Mechanic',
  },
  {
    value: 'maintenance_mechanic',
    label: 'Maintenance Mechanic',
  },
];

export const JOB_CATEGORY_WELDER = [
  {
    value: 'arc_welding',
    label: 'Arc Welding',
  },
  {
    value: 'mig_welding',
    label: 'MIG Welding',
  },
  {
    value: 'tig_welding',
    label: 'TIG Welding',
  },
  {
    value: 'stick_welding',
    label: 'Stick Welding',
  },
  {
    value: 'flux_core_welding',
    label: 'Flux Core Welding',
  },
  {
    value: 'pipe_welding',
    label: 'Pipe Welding',
  },
  {
    value: 'structural_welding',
    label: 'Structural Welding',
  },
  {
    value: 'fabrication_welding',
    label: 'Fabrication Welding',
  },
  {
    value: 'spot_welding',
    label: 'Spot Welding',
  },
];

export const JOB_CATEGORY_PAINTER = [
  {
    value: 'residential_painting',
    label: 'Residential Painting',
  },
  {
    value: 'commercial_painting',
    label: 'Commercial Painting',
  },
  {
    value: 'industrial_painting',
    label: 'Industrial Painting',
  },
  {
    value: 'decorative_painting',
    label: 'Decorative Painting',
  },
  {
    value: 'automotive_painting',
    label: 'Automotive Painting',
  },
  {
    value: 'restoration_painting',
    label: 'Restoration Painting',
  },
  {
    value: 'spray_painting',
    label: 'Spray Painting',
  },
  {
    value: 'wallpapering',
    label: 'Wallpapering',
  },
  {
    value: 'sign_painting',
    label: 'Sign Painting',
  },
];

export const JOB_CATEGORY_ELECTRICIAN = [
  {
    value: 'residential_electrician',
    label: 'Residential Electrician',
  },
  {
    value: 'commercial_electrician',
    label: 'Commercial Electrician',
  },
  {
    value: 'industrial_electrician',
    label: 'Industrial Electrician',
  },
  {
    value: 'maintenance_electrician',
    label: 'Maintenance Electrician',
  },
  {
    value: 'construction_electrician',
    label: 'Construction Electrician',
  },
  {
    value: 'automotive_electrician',
    label: 'Automotive Electrician',
  },
  {
    value: 'lineman',
    label: 'Lineman',
  },
  {
    value: 'inside_wireman',
    label: 'Inside Wireman',
  },
  {
    value: 'outside_linemen',
    label: 'Outside Linemen',
  },
];

export const JOB_CATEGORY_CONSTRUCTION_WORKER = [
  {
    value: 'general_laborer',
    label: 'General Laborer',
  },
  {
    value: 'heavy_equipment_operator',
    label: 'Heavy Equipment Operator',
  },
  {
    value: 'concrete_worker',
    label: 'Concrete Worker',
  },
  {
    value: 'steel_worker',
    label: 'Steel Worker',
  },
  {
    value: 'scaffolder',
    label: 'Scaffolder',
  },
  {
    value: 'bricklayer',
    label: 'Bricklayer',
  },
  {
    value: 'drywall_installer',
    label: 'Drywall Installer',
  },
  {
    value: 'insulation_worker',
    label: 'Insulation Worker',
  },
  {
    value: 'glazier',
    label: 'Glazier',
  },
  {
    value: 'flooring_installer',
    label: 'Flooring Installer',
  },
  {
    value: 'tile_setter',
    label: 'Tile Setter',
  },
  {
    value: 'landscape_laborer',
    label: 'Landscape Laborer',
  },
  {
    value: 'site_supervisor',
    label: 'Site Supervisor',
  },
  {
    value: 'asbestos_removal_worker',
    label: 'Asbestos Removal Worker',
  },
  {
    value: 'roofing_worker',
    label: 'Roofing Worker',
  },
  {
    value: 'paving_worker',
    label: 'Paving Worker',
  },
  {
    value: 'crane_operator',
    label: 'Crane Operator',
  },
  {
    value: 'surveying_technician',
    label: 'Surveying Technician',
  },
  {
    value: 'excavator_operator',
    label: 'Excavator Operator',
  },
];

export const JOB_PUBLISH_OPTIONS = [
  {
    value: 'published',
    label: 'Published',
  },
  {
    value: 'draft',
    label: 'Draft',
  },
];

export const JOB_SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
];

const CANDIDATES = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  role: _mock.role(index),
  name: _mock.fullName(index),
  avatarUrl: _mock.image.avatar(index),
}));

const CONTENT = `
<h6>Job Description</h6>
<br/>

<p>Occaecati est et illo quibusdam accusamus qui. Incidunt aut et molestiae ut facere aut. Est quidem iusto praesentium excepturi harum nihil tenetur facilis. Ut omnis voluptates nihil accusantium doloribus eaque debitis.</p>

<br/>
<br/>

<h6>Key Responsibilities</h6>
<br/>
<ul>
  <li>Working with agency for design drawing detail, quotation and local production.</li>
  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>
  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>
  <li>Planning and executing the open/renovation/ closing store procedure.</li>
  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>
  <li>Monitor costs and work within budget.</li>
  <li>Liaise with suppliers and source elements.</li>
</ul>

<br/>
<br/>

<h6>Why You'll Love Working Here</h6>
<br/>
<ul>
  <li>Working with agency for design drawing detail, quotation and local production.</li>
  <li>Produce window displays, signs, interior displays, floor plans and special promotions displays.</li>
  <li>Change displays to promote new product launches and reflect festive or seasonal themes.</li>
  <li>Planning and executing the open/renovation/ closing store procedure.</li>
  <li>Follow‐up store maintenance procedure and keep updating SKU In &amp; Out.</li>
  <li>Monitor costs and work within budget.</li>
  <li>Liaise with suppliers and source elements.</li>
</ul>
`;

export const _jobs = [...Array(12)].map((_, index) => {
  const publish = index % 3 ? 'published' : 'draft';

  const salary = {
    type: (index % 5 && 'Custom') || 'Hourly',
    price: _mock.number.price(index),
    negotiable: _mock.boolean(index),
  };

  const benefits = JOB_BENEFIT_OPTIONS.slice(0, 3).map((option) => option.label);

  const experience =
    JOB_EXPERIENCE_OPTIONS.map((option) => option.label)[index] || JOB_EXPERIENCE_OPTIONS[1].label;

  const employmentTypes = (index % 2 && ['Part-time']) ||
    (index % 3 && ['On Demand']) ||
    (index % 4 && ['Negotiable']) || ['Full-time'];

  const company = {
    name: _mock.companyName(index),
    logo: _mock.image.company(index),
    phoneNumber: _mock.phoneNumber(index),
    fullAddress: _mock.fullAddress(index),
  };

  const locations = countries.slice(1, index + 2).map((option) => option.label);

  return {
    id: _mock.id(index),
    salary,
    publish,
    company,
    benefits,
    locations,
    experience,
    employmentTypes,
    content: CONTENT,
    candidates: CANDIDATES,
    role: _mock.role(index),
    title: _mock.jobTitle(index),
    createdAt: _mock.time(index),
    expiredDate: _mock.time(index),
    skills: JOB_SKILL_OPTIONS.slice(0, 3),
    totalViews: _mock.number.nativeL(index),
    workingSchedule: JOB_WORKING_SCHEDULE_OPTIONS.slice(0, 2),
  };
});
