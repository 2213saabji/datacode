import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

// import { fNumber } from 'src/utils/format-number';

import { useAuthContext } from 'src/auth/hooks';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function UserProfilePercentage({
  scale,
  url,
  setAddressFormSubmitted,
  addressFormSubmitted,
  currentTab,
  setCurrentTab,
  mandatoryFormErrorShow,
}) {
  const theme = useTheme();
  const router = useRouter();
  const { user } = useAuthContext();

  const identityTypeCheckpoint = (identity) => {
    if (user?.UserIdentityDetails) {
      return user.UserIdentityDetails?.some(detail => detail.identityType === identity);
    }
    return false;
  };
  

  // const[user,setuser]=useState(u);
  // useEffect(()=>{
  //     if(!user?.UserProfile){
  //         setuser(u);
  //     }
  // },[user,u])
  const [profilePercentage, setProfilePercentage] = useState(0);
  function profileCompletionChecker() {
    // console.log("userdata", user)
    if (user?.phone) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.isMobileVerified) {
      setProfilePercentage((prev) => prev + 4);
    }
    // if (user?.isEmailVerified) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    // if (user?.email) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    if (user?.UserProfile && user?.UserProfile?.userProfileImageDetails) {
      setProfilePercentage((prev) => prev + 8);
    }
    if (user?.UserProfile && user?.UserProfile?.firstName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.dateOfBirth) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.fatherName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.motherName) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.gender) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.religion) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.tehsilName) {
      setProfilePercentage((prev) => prev + 4);
    }
    // if (user?.UserProfile && user?.UserProfile?.nationality) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    if (user?.UserProfile && user?.UserProfile?.whatsappNumber) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.politicalPartyAffiliation) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.currentJobTitle) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserProfile && user?.UserProfile?.highestQualification) {
      setProfilePercentage((prev) => prev + 4);
    }
    // if (
    //   user?.UserIdentityDetails &&
    //   user?.UserIdentityDetails[0] &&
    //   user?.UserIdentityDetails[0]?.identityImageDetails
    // ) {
    //   setProfilePercentage((prev) => prev + 10);
    // }
    if (
      identityTypeCheckpoint("AADHAAR")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      identityTypeCheckpoint("VOTER")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      identityTypeCheckpoint("PASSPORT")
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    // if (
    //   user?.UserIdentityDetails &&
    //   user?.UserIdentityDetails[0] &&
    //   user?.UserIdentityDetails[0]?.identityNumber
    // ) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    // if (
    //   user?.UserIdentityDetails &&
    //   user?.UserIdentityDetails[0] &&
    //   user?.UserIdentityDetails[0]?.issueDate
    // ) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.streetAddress
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.userCity
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.userState
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.postalCode
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (user?.UserAddressesses && user?.UserAddressesses[0] && user?.UserAddressesses[0]?.country) {
      setProfilePercentage((prev) => prev + 4);
    }
    // if (
    //   user?.UserAddressesses &&
    //   user?.UserAddressesses[0] &&
    //   user?.UserAddressesses[0]?.latitude
    // ) {
    //   setProfilePercentage((prev) => prev + 4);
    // }
    // if (
    //   user?.UserAddressesses &&
    //   user?.UserAddressesses[0] &&
    //   user?.UserAddressesses[0]?.longitude
    // ) {
    //   setProfilePercentage((prev) => prev + 4);
    // }

    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.wardNo
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
    if (
      user?.UserAddressesses &&
      user?.UserAddressesses[0] &&
      user?.UserAddressesses[0]?.addressType
    ) {
      setProfilePercentage((prev) => prev + 4);
    }
  }
  const label1 = 'Profile';
  const label2 = 'Completion';
  //   const total= 38566;
  const smUp = useResponsive('up', 'sm');

  useEffect(() => {
    profileCompletionChecker();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const chart = {
    series: [{ label1: `Profile`, label2: `Completion`, percent: profilePercentage, total: 38566 }],
  };

  const {
    colors = [
      [theme.palette.primary.light, theme.palette.primary.main],
      [theme.palette.warning.light, theme.palette.warning.main],
    ],
    // series,
    options,
  } = chart;

  const chartOptionsCheckIn = useChart({
    fill: {
      type: 'gradient',
      gradient: {
        colorStops: [
          { offset: 0, color: colors[0][0], opacity: 1 },
          { offset: 100, color: colors[0][1], opacity: 1 },
        ],
      },
    },
    chart: {
      sparkline: {
        enabled: true,
      },
    },
    grid: {
      padding: {
        top: -9,
        bottom: -9,
      },
    },
    legend: {
      show: false,
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '64%' },
        track: { margin: 0 },
        dataLabels: {
          name: { show: false },
          value: {
            offsetY: 6,
            fontSize: theme.typography.subtitle2.fontSize,
          },
        },
      },
    },
    ...options,
  });

  // const chartOptionsCheckout = {
  //     ...chartOptionsCheckIn,
  //     fill: {
  //         type: 'gradient',
  //         gradient: {
  //             colorStops: [
  //                 { offset: 0, color: colors[1][0], opacity: 1 },
  //                 { offset: 100, color: colors[1][1], opacity: 1 },
  //             ],
  //         },
  //     },
  // };

  return (
    <Card
      sx={{
        maxWidth: 300,
        boxShadow: 'none',
        backgroundColor: 'transparent',
        scale: `${scale}`,
      }}
      onClick={() => {
        router.push(url);
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'column', md: 'column' }}
        divider={
          <Divider
            orientation={smUp ? 'vertical' : 'horizontal'}
            flexItem
            sx={{ borderStyle: 'dashed' }}
          />
        }
      >
        {/* {mandatoryFormErrorShow && !addressFormSubmitted && <Stack alignItems="flex-end" sx={{ mt: 3 }} onClick={()=>setCurrentTab("editprofile")}>
          <LoadingButton sx={{ background: "red" }} type="submit" variant="contained">
            Click Here to fill the Mandatory form to get Access
          </LoadingButton>
        </Stack>
        } */}

        <Stack
          key={label1}
          spacing={3}
          direction="row"
          alignItems="center"
          justifyContent={{ sm: 'center' }}
          sx={{
            // py: 5,
            width: 1,
            px: { xs: 3, sm: 0 },
          }}
        >
          <Chart
            dir="ltr"
            type="radialBar"
            series={[profilePercentage]}
            options={chartOptionsCheckIn}
            width={106}
            height={106}
          />

          <div>
            {profilePercentage === 100 ? (
              <Typography variant="h4" sx={{ opacity: 0.72 }}>
                Profile Completed
              </Typography>
            ) : (
              <Typography variant="h4" sx={{ opacity: 0.72 }}>
                {label1}
                <br />
                {label2}
              </Typography>
            )}

            {/* <Typography variant="h4" sx={{ mb: 0.5 }}>
                {fNumber(total)}
              </Typography> */}
          </div>
        </Stack>
      </Stack>
    </Card>
  );
}

UserProfilePercentage.propTypes = {
  scale: PropTypes.string,
  url: PropTypes.string,
  addressFormSubmitted: PropTypes.bool,
  setAddressFormSubmitted: PropTypes.func,
  currentTab: PropTypes.string,
  setCurrentTab: PropTypes.func,
  mandatoryFormErrorShow: PropTypes.bool,
};
