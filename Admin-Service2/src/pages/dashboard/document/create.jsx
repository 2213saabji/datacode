import { Helmet } from 'react-helmet-async';
 
import {DocuemntCreateView} from 'src/sections/document/view'
// ----------------------------------------------------------------------
 
export default function CaseCreatePage() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Document Upload</title>
      </Helmet>
 
      <DocuemntCreateView />
    </>
  );
}
 