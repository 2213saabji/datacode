import { Helmet } from 'react-helmet-async';
 
import { DocuemntListView } from 'src/sections/document/view';
// ----------------------------------------------------------------------
 
export default function CaseManagementListPage() {
  return (
    <>
      <Helmet>
        <title> Dashboard:</title>
      </Helmet>
 
      <DocuemntListView />
    </>
  );
}