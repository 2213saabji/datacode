/* eslint-disable no-unused-vars */
import PropTypes from 'prop-types';

import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import { useGetCollege } from 'src/api/Institution/college';
import { useGetcoaching } from 'src/api/Institution/coaching';
import { useGetSchoolDetail } from 'src/api/Institution/schoolDetails';
import {
  useGetInstituteDetail,
  useGetInstituteOwnerDetail,
} from 'src/api/Institution/InstituteCreate';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import College from '../College';
import Coaching from '../Coaching';
import InstituteNewEditForm from '../Institute-new-edit-form';

// import JobNewEditForm from '../job-new-edit-form';

// ----------------------------------------------------------------------

export default function InstitutionEditView({ id, studentCareerOption }) {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const { InsituteOwner } = useGetInstituteOwnerDetail(user?.userId);
  const filteredInstituteOwner = InsituteOwner?.data?.filter((item) => item.approvalStatus === 1);
  const instituteOwnerId = filteredInstituteOwner
    ? filteredInstituteOwner[0]?.institutionOwnerId
    : null;
  const { Insitute: instituteData } = useGetInstituteDetail(instituteOwnerId);

  const institutionType = instituteData?.data.map((item) => item.institutionType);
  console.log('studentCareerOption:', studentCareerOption);

  const { school: currentSchool } = useGetSchoolDetail(id);
  const { college: currentCollege } = useGetCollege(id);
  const { coaching: currentCoaching } = useGetcoaching(id);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading="INSTITUTION EDIT"
        links={[
          {
            name: 'Dashboard',
            href: paths.dashboard.root,
          },
          {
            name: 'Institution',
            href: paths.dashboard.StudentCareer.root,
          },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      {/* <EmptyContent
        filled
        title='Coming Soon...'
        sx={{ py: 10 }}
      /> */}

      {studentCareerOption === 'school' && <InstituteNewEditForm currentSchool={currentSchool} />}
      {studentCareerOption === 'college' && <College currentCollege={currentCollege} />}
      {studentCareerOption === 'coaching' && <Coaching currentCoaching={currentCoaching} />}
    </Container>
  );
}

InstitutionEditView.propTypes = {
  id: PropTypes.string,
  studentCareerOption: PropTypes.string,
};
