import { Helmet } from 'react-helmet-async';
// import FarmerRegCreateView from 'src/sections/Farmer-Service/equipment/view/farmer-reg-create-view';
import { EmergencyCreateView } from 'src/sections/Emergency Services/view';


// ----------------------------------------------------------------------

export default function EmergencyContactCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: ADD EMERGENCY HELPLINE NUMBER</title>
      </Helmet>

      <EmergencyCreateView />
    </>
  );
}
