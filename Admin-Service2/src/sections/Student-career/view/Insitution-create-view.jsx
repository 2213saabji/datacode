import { useState, useEffect } from 'react';

import Container from '@mui/material/Container';
import { Box, Select, MenuItem, InputLabel, FormControl } from '@mui/material';

import { paths } from 'src/routes/paths';

import { useAuthContext } from 'src/auth/hooks';
import {
  useGetInstituteDetail,
  useGetInstituteOwnerDetail,
} from 'src/api/Institution/InstituteCreate';

import { useSettingsContext } from 'src/components/settings';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs';

import College from '../College';
import Coaching from '../Coaching';
import InstituteNewEditForm from '../Institute-new-edit-form';

// ----------------------------------------------------------------------

export default function InstituteCreateView() {
  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const { InsituteOwner } = useGetInstituteOwnerDetail(user?.userId);
  const filteredInstituteOwner = InsituteOwner?.data?.filter((item) => item.approvalStatus === 1);
  const instituteOwnerId = filteredInstituteOwner ? filteredInstituteOwner[0]?.userId : null;
  const { institute: instituteData } = useGetInstituteDetail(instituteOwnerId);
  console.log('instituteData--->', instituteData);

  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedInstitution, setSelectedInstitution] = useState(null);

  useEffect(() => {
    if (instituteData?.data) {
      const uniqueData = [];
      const uniqueOptions = instituteData.data
        .map((item) => {
          if (!uniqueData.includes(item.institutionType)) {
            uniqueData.push(item.institutionType);
            return item.institutionType;
          }
          return null;
        })
        .filter((item) => item !== null);
      setOptions(uniqueOptions);
      setSelectedOption(uniqueOptions[0]);
    }
  }, [instituteData]);

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
    const institution = instituteData?.data.find(
      (item) => item.institutionType === event.target.value
    );
    setSelectedInstitution(institution);
  };

  useEffect(() => {
    if (selectedOption && instituteData) {
      const institution = instituteData.data.find(
        (item) => item.institutionType === selectedOption
      );
      setSelectedInstitution(institution);
    }
  }, [selectedOption, instituteData]);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={{ xs: 3, md: 5 }}>
        <CustomBreadcrumbs
          heading={`Register Your ${selectedOption}`}
          links={[
            {
              name: 'Dashboard',
              href: paths.dashboard.root,
            },
            {
              name: `${selectedOption}`,
              href: paths.dashboard.StudentCareer.instituteList,
            },
            { name: `New ${selectedOption}` },
          ]}
        />
        <FormControl sx={{ width: '150px' }}>
          <InputLabel
            sx={{
              color: '#3a8ff3',
              '&.Mui-focused': {
                color: '#3a8ff3',
              },
            }}
          >
            Institution Type
          </InputLabel>
          <Select
            value={selectedOption}
            onChange={handleChange}
            label="Institution Type"
            variant="outlined" // Ensure the variant is set to outlined
            sx={{
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: 'black',
              },
              '&:hover .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3a8ff3',
              },
              '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                borderColor: '#3a8ff3',
              },
            }}
          >
            {options.map((option, index) => (
              <MenuItem key={index} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      {selectedOption === 'College' && selectedInstitution && (
        <College institutionId={selectedInstitution.institutionId} />
      )}
      {selectedOption === 'Coaching center' && selectedInstitution && (
        <Coaching institutionId={selectedInstitution.institutionId} />
      )}
      {selectedOption === 'School' && selectedInstitution && (
        <InstituteNewEditForm institutionId={selectedInstitution.institutionId} />
      )}
    </Container>
  );
}
