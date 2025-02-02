import { Helmet } from 'react-helmet-async';

import { useParams } from 'src/routes/hooks';

import { InstitutionEditView } from 'src/sections/Student-career/view';

export default function InstituteEdit() {
  const params = useParams();

  const { id, studentCareerOption } = params;
  console.log('studentCareerOption--->', studentCareerOption);
  return (
    <>
      <Helmet>
        <title> Dashboard: Institute Edit </title>
      </Helmet>

      <InstitutionEditView id={`${id}`} studentCareerOption={studentCareerOption} />
    </>
  );
}
