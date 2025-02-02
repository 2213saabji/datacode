import PropTypes from 'prop-types';
import { enqueueSnackbar } from 'notistack';
import { useState, useEffect, useCallback } from 'react';

import Collapse from '@mui/material/Collapse';

import { paths } from 'src/routes/paths';
import { usePathname } from 'src/routes/hooks';
import { useActiveLink } from 'src/routes/hooks/use-active-link';

import NavItem from './nav-item';

// ----------------------------------------------------------------------

export default function NavList({ data, depth, slotProps }) {
  const pathname = usePathname();
  const [addressFormSubmitted] = useState(true);
  // eslint-disable-next-line prefer-const
  // function formSubmitChecker(){
  //   if(
  //     user?.UserProfile?.currentJobTitle &&
  //     user?.UserProfile?.dateOfBirth &&
  //     user?.UserProfile?.fatherName &&
  //     user?.UserProfile?.firstName &&
  //     user?.UserProfile?.gender &&
  //     user?.UserProfile?.highestQualification &&
  //     user?.UserProfile?.lastName &&
  //     user?.UserProfile?.motherName &&
  //     user?.UserProfile?.politicalPartyAffiliation &&
  //     user?.UserProfile?.whatsappNumber &&
  //     user?.UserAddressesses[0]?.addressType &&
  //     user?.UserAddressesses[0]?.country &&
  //     user?.UserAddressesses[0]?.streetAddress &&
  //     user?.UserAddressesses[0]?.userCity &&
  //     user?.UserAddressesses[0]?.userState
  //   ){
  //     setAddressFormSubmitted(true);
  //   }
  // }
  //   useEffect(()=>{
  //     formSubmitChecker();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   },[])

  const active = useActiveLink(data.path, !!data.children);

  const [openMenu, setOpenMenu] = useState(active);

  useEffect(() => {
    // if (!active) {
    //   handleCloseMenu();
    // }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleToggleMenu = useCallback(() => {
    if (data.children) {
      setOpenMenu((prev) => !prev);
    }
  }, [data.children]);

  async function showpopup() {
    if (addressFormSubmitted === false) {
      enqueueSnackbar('Profile and Address Form should be filled to get Access', {
        variant: 'error',
      });
    }
  }

  return (
    <>
      <NavItem
        open={openMenu}
        onClick={() => {
          handleToggleMenu();
          showpopup();
        }}
        //
        title={data.title}
        path={addressFormSubmitted ? data.path : paths.dashboard.user.profile}
        icon={data.icon}
        info={data.info}
        roles={data.roles}
        caption={data.caption}
        disabled={data.disabled}
        depth={depth}
        hasChild={!!data.children}
        externalLink={data.path.includes('http')}
        currentRole={slotProps?.currentRole}
        //
        active={active}
        className={active ? 'active' : ''}
        sx={{
          mb: `${slotProps?.gap}px`,
          ...(depth === 1 ? slotProps?.rootItem : slotProps?.subItem),
        }}
      />

      {!!data.children && (
        <Collapse in={openMenu} unmountOnExit sx={{ ml: 2 }}>
          <NavSubList data={data.children} depth={depth} slotProps={slotProps} />
        </Collapse>
      )}
    </>
  );
}

NavList.propTypes = {
  data: PropTypes.object,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};

// ----------------------------------------------------------------------

function NavSubList({ data, depth, slotProps }) {
  return (
    <>
      {data.map((list) => (
        <NavList key={list.title} data={list} depth={depth + 1} slotProps={slotProps} />
      ))}
    </>
  );
}

NavSubList.propTypes = {
  data: PropTypes.array,
  depth: PropTypes.number,
  slotProps: PropTypes.object,
};
