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
import { FarmerRegEditView } from 'src/sections/Farmer-Service/equipment/view';


// ----------------------------------------------------------------------

export default function FarmerDetailsEditPage() {
    const params = useParams();

    const { id,equipmentDetailsId } = params;

    return (
        <>
            <Helmet>
                <title> Dashboard:  Edit Farmer Details</title>
            </Helmet>

            <FarmerRegEditView id={`${id}`} equipmentDetailsId={`${equipmentDetailsId}`} />
        </>
    );
}
