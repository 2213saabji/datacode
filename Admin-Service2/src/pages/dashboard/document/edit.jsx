import { Helmet } from 'react-helmet-async';
 
import { useParams } from 'src/routes/hooks';
 
import {DocuemntEditView} from 'src/sections/document/view'
 
// ----------------------------------------------------------------------
 
export default function CaseEditPage() {
  const params = useParams();
 
  const { id } = params;
 
  return (
    <>
      <Helmet>
        <title> Dashboard: Case Edit</title>
      </Helmet>
 
      <DocuemntEditView id={`${id}`} />
    </>
  );
}
