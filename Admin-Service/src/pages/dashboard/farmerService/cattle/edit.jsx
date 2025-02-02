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

import { CattleRegEditView } from 'src/sections/Farmer-Service/cattle/view';

// ----------------------------------------------------------------------

export default function CattleEditPage() {
  const params = useParams();
  const { id, cattleId } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Edit Cattle Details</title>
      </Helmet>

      <CattleRegEditView id={`${id}`} cattleId={`${cattleId}`}/>
    </>
  );
}
