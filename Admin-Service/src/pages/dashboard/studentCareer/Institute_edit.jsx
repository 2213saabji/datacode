import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { InstitutionEditView } from 'src/sections/Student-career/view';

export default function InstituteEdit() {
  const params = useParams();

  const { id } = params;

  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Create</title>
      </Helmet>

      <InstitutionEditView id={`${id}`} />
    </>
  );
}
