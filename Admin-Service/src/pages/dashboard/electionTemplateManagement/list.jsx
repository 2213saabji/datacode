// import { Helmet } from 'react-helmet-async';

// import { TemplateListView } from '../../../sections/electionTemplateManagement/view';

// // ----------------------------------------------------------------------

// export default function ElectionTemplateList() {

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard: Template List</title>
//       </Helmet>
//       <TemplateListView  />
//     </>
//   );
// }

import { Helmet } from 'react-helmet-async';

import { FileManagerView } from 'src/sections/template-managment/view';

// ----------------------------------------------------------------------

export default function FileManagerPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Templates Manager</title>
      </Helmet>

      <FileManagerView />
    </>
  );
}
