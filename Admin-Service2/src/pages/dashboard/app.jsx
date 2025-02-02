import { Helmet } from 'react-helmet-async';

// import { useGetVotersDetails } from 'src/api/voter';

import { useAuthContext } from 'src/auth/hooks';

import { OverviewAppView } from 'src/sections/overview/app/view';
import { OverviewAppViewVoter } from 'src/sections/overview/appVoter/view';
import { useGetSeller } from 'src/api/agriculture/sellerDetails';
import { useGetSingleInstituteOwnerRequestList, useGetSingleSellerOwnerRequestList } from 'src/api/requestLicenseAcceptance';
import SellerDetailsModal from 'src/sections/Farmer-Service/register/seller-details-modal';
import InstituteOwnerDetailsModal from 'src/sections/Student-career/Institution Details/instituteOwner-details-modal';
import { useGetInstituteDetail } from 'src/api/Institution/InstituteCreate';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

export default function OverviewAppPage() {
  const { user } = useAuthContext();

  // Agriculture Seller section
  const { users } = useGetSingleSellerOwnerRequestList(user.userId, user.accessToken) || [];
  const approvedSellerOwner = users?.data?.find((seller) => seller.approvalStatus === 1);
  const { seller } = useGetSeller(approvedSellerOwner?.userId);

  useEffect(() => {
    if (user.userRoleId === 46) {
      localStorage.setItem('sellerDetails', JSON.stringify(seller?.data?.[0]));
    }
  }, [seller, user]);

  const { users: instituteUsers } = useGetSingleInstituteOwnerRequestList(user.userId, user.accessToken) || [];
  const approvedInstituteOwner = instituteUsers?.data?.find((institute) => institute.approvalStatus === 1);
  const { institute } = useGetInstituteDetail(approvedInstituteOwner?.userId);
  useEffect(() => {
    if (user.userRoleId === 44) {
      localStorage.setItem('instituteOwnerDetails', JSON.stringify(institute?.data?.[0]));
    }
  }, [institute, user.userRoleId]);

  return (
    <>
      <Helmet>
        <title> Dashboard: App</title>
      </Helmet>

      {/* Login modal popup */}
      {/* <Model /> */}
      {/* {(!user?.email || !user?.UserProfile?.dateOfBirth || !user?.UserProfile?.gender || !user?.UserProfile?.firstName || !user?.UserIdentityDetails[0]?.identityNumber || !detailList?.partyId || !detailList?.epicNo || !detailList?.wardNo) && <Model />} */}
      {/* { user?.PopUpDetail?.popUpProfileForm === true && <Model />} */}

      {/* Survey popup */}
      {/* {user?.PopUpDetail?.popUpSurveyForm === true && <SurveyPopup/>} */}

      {user?.userRoleId === 9 ? (
        <OverviewAppViewVoter />
      ) : (
        <OverviewAppView />
      )}

      {/* Agriculture Seller section */}
      {seller?.data?.length === 0 && user?.userRoleId === 46 && <SellerDetailsModal approvedSellerOwner={approvedSellerOwner} />}

      {institute?.data?.length === 0 && user?.userRoleId === 44 && <InstituteOwnerDetailsModal />}

      {/* {user?.userRoleId === 8 && <SocketImplement userId={user?.userId} />} */}
    </>
  );
}
