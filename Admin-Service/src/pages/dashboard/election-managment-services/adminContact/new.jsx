// import { Helmet } from 'react-helmet-async';

// import { DesireCreateView } from 'src/sections/Desire-manegament/view';

// // ----------------------------------------------------------------------

// export default function AppointmentCreatePage() {
//   return (
//     <>
//       <Helmet>
//         <title> Dashboard: Create a new Desire</title>
//       </Helmet>

//       <DesireCreateView />
//     </>
//   );
// }
import { Helmet } from 'react-helmet-async';

import { ContactCreateView } from 'src/sections/adminContact/view';

// ----------------------------------------------------------------------

export default function ContactCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Contact Create</title>
      </Helmet>

      <ContactCreateView />
    </>
  );
}
