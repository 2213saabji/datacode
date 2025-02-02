import { Helmet } from 'react-helmet-async';
 
import { useParams } from 'src/routes/hooks';
 
import {DocuemntDetailsView} from 'src/sections/document/view'
 
// ----------------------------------------------------------------------
 
export default function CaseDetailsPage() {
  const params = useParams();
 
  const { id } = params;
 
  return (
    <>
      <Helmet>
        <title> Dashboard: Document Details</title>
      </Helmet>
 
      <DocuemntDetailsView   id={`${id}`}  />
    </>
  );
}
 
 