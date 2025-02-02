// import { Helmet } from 'react-helmet-async';

// import { useParams } from 'src/routes/hooks';

// import { PostEditView } from 'src/sections/blog/view';

// // ----------------------------------------------------------------------

// export default function  FillSurveyEditPage() {
//   const params = useParams();

//   const { id } = params;

//   return (
//     <>
//       <Helmet>
//         <title> Dashboard: Survey Edit</title>
//       </Helmet>

//       <PostEditView id={`${id}`} />
//     </>
//   );
// }

import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { JobViewForm } from 'src/sections/survey-view/view';

// ----------------------------------------------------------------------

export default function FillSurveyDetailsPage() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Fill Survey Details</title>
      </Helmet>

      <JobViewForm id={`${id}`} />
    </>
  );
}
