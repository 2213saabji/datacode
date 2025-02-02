import { Box, Button, Container } from '@mui/material';

import { RouterLink } from 'src/routes/components';

// import SvgColor from 'src/components/svg-color';

import EmergancyServiceCards from '../emergancy-service-card';
import EmergancyServicesBanner from '../emergancy-service-banner';

// import WomanFinanceEmpowerment from '../woman_finance';

export default function EmergancyServices() {
  // const theme = useTheme();

  // const [currentTab, setCurrentTab] = useState('education');

  // const handleChangeTab = useCallback((event, newValue) => {
  //   setCurrentTab(newValue);
  // }, []);

  // const icon = (name) => <SvgColor src={`/assets/images/womanEmpowerment/icon/${name}.svg`} />;

  // const TABS = [
  //   {
  //     value: 'education',
  //     label: 'EDUCATION & TRAINING',
  //     icon: icon('Education'),
  //   },
  //   {
  //     value: 'finance',
  //     label: 'FINANCIAl & ECONOMIC',
  //     icon: icon('Finance'),
  //   },
  //   {
  //     value: 'reproductive',
  //     label: 'HEALTHCARE & REPRODUCTIVE RIGHTS',
  //     icon: icon('Healthcare'),
  //   },
  //   {
  //     value: 'legal',
  //     label: 'LEAGAL AID & ADVOCACY',
  //     icon: icon('LegalAid'),
  //   },
  //   {
  //     value: 'leadership',
  //     label: 'LEADERSHIP & MENTORSHIP',
  //     icon: icon('Leadership'),
  //   },
  // ];

  return (
    <>
      <EmergancyServicesBanner />

      <Button
        component={RouterLink}
        to="/dashboard"
        variant="outlined"
        color="primary"
        style={{ textDecoration: 'none', width: '150px', padding: '3px 5px', mt: 2, mb: 2 }}
      >
        Back
      </Button>

      <Container
        sx={{
          pl: 2,
          pb: 10,
          pt: { xs: 4, md: 5 },
          position: 'relative',
        }}
      >
        <Box
          gap={2}
          display="grid"
          gridTemplateColumns={{
            xs: 'repeat(1, 1fr)',
            md: 'repeat(1, 1fr)',
          }}
        >
          {/* <Tabs
            value={currentTab}
            onChange={handleChangeTab}
            sx={{
              width: 1,
              bottom: 0,
              zIndex: 9,
              pl: 3,
              pb: 1,
              borderRadius: 1,
              // position: 'absolute',
              bgcolor: 'background.paper',
              [`& .${tabsClasses.flexContainer}`]: {
                pr: { md: 3 },
                justifyContent: {
                  sm: 'center',
                  md: 'flex-start',
                },
              },
              '& .MuiTabs-scrollButtons': {
                // Styles for scroll buttons
                color: theme.palette.primary.dark, // Change color of scroll buttons
                '& svg': {
                  width: '30px', // Adjust the width as needed
                  height: '30px', // Adjust the height as needed
                },
              },
            }}
          >
            {TABS.map((tab) => (
              <Tab
                key={tab.value}
                value={tab.value}
                icon={tab.icon}
                label={tab.label}
                sx={{
                  color: theme.palette.primary.main, // Change the text color to red (you can use any valid CSS color here)
                }}
              />
            ))}
          </Tabs> */}

          {/* {currentTab === 'education' && <WomanEducationEmpowerment />}
          {currentTab === 'finance' && <WomanFinanceEmpowerment />}
          {currentTab === 'reproductive' && <WomanEmpowermentReproductive />}
          {currentTab === 'legal' && <WomanEmpowermentLegalAndAdvocacy />}
          {currentTab === 'leadership' && <WomanEmpowermentLeadershipAndMentor />} */}
          <EmergancyServiceCards />
        </Box>
      </Container>
    </>
  );
}
