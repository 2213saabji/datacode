import PropTypes from 'prop-types';
import { useRef, useState, forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Tooltip from '@mui/material/Tooltip';
import CloseIcon from '@mui/icons-material/Close';
import { alpha, styled } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import { Modal, IconButton, Typography } from '@mui/material';

import { RouterLink } from 'src/routes/components';

import Iconify from '../../iconify';
import TooltipContent from './TooltipContent';

// ----------------------------------------------------------------------

const NavItem = forwardRef(
  (
    {
      title,
      path,
      icon,
      info,
      disabled,
      caption,
      roles,
      //
      open,
      depth,
      active,
      hasChild,
      externalLink,
      currentRole = 'admin',
      ...other
    },
    ref
  ) => {
    const subItem = depth !== 1;
    // console.log('--------->', title)

    const [modalOpen, setModalOpen] = useState(false);

    const timerRef = useRef(null);

    // const handleMouseEnter = () => {
    //   if (title === 'COMPLAINT SECTION') {
    //     timerRef.current = setTimeout(() => {
    //       setModalOpen(true);
    //     }, 1000); // 2 seconds
    //   }
    // };

    const handleMouseLeave = () => {
      clearTimeout(timerRef.current);
      setModalOpen(false);
    };

    const getTitle = (titlee) => {
      switch (titlee) {
        case 'COMPLAINT SECTION':
          return {
            matched: true,
            description:
              'Using the complaint section, you can complain about public problems in your area and get immediate redressal of your complaint from your leaders and central and state officials and employees. For this, you have to select your problem in the app and register your complaint by choosing central and state complaint.',
          };
        case ' CAREER ROADMAP':
          return {
            matched: true,
            description:
              'By using Career Road Map you can find solution to all the problems from your student life to your working life.',
          };
        case 'FARMER CAREER ROADMAP':
          return {
            matched: true,
            description:
              'Farmers can select the weather, soil and crop and get more yield by knowing the nutrients required for the crop and the factors responsible for higher yield. They can buy and sell agricultural equipment and animals by getting information about them and can also earn profit by selling their crop at a higher price than the nearby markets.',
          };
        case 'STUDENT CAREER ROADMAP':
          return {
            matched: true,
            description:
              'After class 10th, the student can choose the field and position of his choice and can make his life better by getting a job by getting all the information required to get a job. Also, he can get a scholarship.',
          };
        case 'BUSINESS CAREER ROADMAP':
          return {
            matched: true,
            description:
              'People who want to do business can choose their business and get complete information about business like business registration, loan, buying material, selling material etc.',
          };
        case 'WOMEN EMPOWERMENT':
          return {
            matched: true,
            description:
              'Which jobs are available for women in which sector, which government schemes can be availed, along with this you can secure your life by getting a job using education and training, financial economic jobs, health care and reproductive rights, legal aid and advocacy opportunities, leadership and advice.',
          };
        case 'PROPERTY BUY OR SELL':
          return {
            matched: true,
            description:
              'By paying just ₹499 you can sell your property directly to a genuine buyer and buy it from a genuine seller. Both the buyer and the seller will be the owners of the property, which will save you a lot of money on brokerage and you can use that money to get your property registered and make a profit.',
          };
        case ' GOVERNMENT SCHEME':
          return {
            matched: true,
            description:
              'By taking advantage of the schemes of the Central and State Government, you can reduce and eliminate the problems in your life to a great extent, for which see the schemes available here.',
          };
        case ' ATTPL BUSINESS':
          return {
            matched: true,
            description:
              'You can also work with us as a channel partner in ATTPL services and earn profits.',
          };
        case 'GET LABOUR JOB':
          return {
            matched: true,
            description:
              'Carpenters, plumbers, electricians, mechanics, painters, construction workers can find jobs for themselves by applying filters of kilometers around them in Get Labor Jobs from home and after understanding the work through the photo, they can go to the location by talking on the mobile and do their work. Workers do not need to go to Chowkti daily to find a job.',
          };
        case 'APPLY FOR JOB':
          return { matched: true, description: 'Be it a man or a woman, illiterate or educated, professional or farmer, or laborer, want a job? So by December 2026, ATTPL is providing 1 crore, 40 lakh non-government, registered, hybrid jobs not only in India but for the first time in the whole world, which includes 98 lakh jobs in agriculture, construction and industrial jobs for farmers, laborers and women and 42 lakh jobs for corporate and service sector in which ATTPL is providing jobs in its service areas like finance, consulting, solar energy, IT, transportation, stone and mineral mining and construction. Go to the Apply for Job option and fill the form based on your skill, experience and your desire and apply for a permanent job. In which you will get the benefit of ESI, FP. In which you do not need to go out of the house for a job, you will get the facility to work near your home or on your favorite project. And not only this, you can also change the job anytime as per your choice.' };
          case 'APPLY FOR INDUSTRIES':
          return { matched: true, description:'Apply for Storage, Grading Unit, Processing Unit, Grinding Unit, Packaging Unit, ATTPL Stores and ATTPL Transportation at Panchayat level.'}
          default:
          return { matched: false, description: '' }; // Default case if no conditions are met
      }
    };

    const titleInfo = getTitle(title);

    const tooltipStyles = {
      tooltip: {
        background: 'linear-gradient(50deg, rgba(254, 242, 221, 0.9), rgba(255, 216, 179, 0.9))', // Background color
        color: 'black', // Text color
        padding: '18px 16px', // Padding
        borderRadius: '0 15px 15px 15px', // Border radius
        fontSize: '14px', // Font size
        fontWeight: '700',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.4)',
      },
    };

    // const TooltipContent = (iconn, titlee) => (
    //   <Box sx={{ display: 'flex', alignItems: 'center' }}>
    //     <Box component="span" className="icon" sx={{ marginRight: '8px' }}>
    //       {iconn}
    //     </Box>
    //     <Typography variant="body2">{titlee}</Typography>
    //   </Box>
    // );

    // TooltipContent.propTypes:{
    //   iconn: PropTypes.element,
    //   titlee: PropTypes.string,
    // }

    const renderContent = (
      <StyledNavItem
        ref={ref}
        disableGutters
        open={open}
        depth={depth}
        active={active}
        disabled={disabled}
        // onMouseEnter={handleMouseEnter}
        // onMouseLeave={handleMouseLeave}
        // onBlur={handleMouseLeave}
        {...other}
      >
        {!subItem && icon && (
          <Box component="span" className="icon">
            {icon}
          </Box>
        )}

        {subItem && icon ? (
          <Box component="span" className="icon">
            {icon}
          </Box>
        ) : (
          <Box component="span" className="sub-icon" />
        )}

        {title && (
          <Tooltip
            title={
              titleInfo.matched ? <TooltipContent name={title} title={titleInfo.description} /> : ''
            }
            placement="bottom-start"
            sx={{ color: 'black' }}
            PopperProps={{
              sx: {
                '.MuiTooltip-tooltip': {
                  ...tooltipStyles.tooltip,
                  width: 'auto', // Set desired width
                  maxWidth: '400px',
                },
              },
              modifiers: [
                {
                  name: 'offset',
                  options: {
                    offset: [170, 0], // Adjust the values as needed
                  },
                },
                {
                  name: 'flip',
                  options: {
                    fallbackPlacements: ['bottom-start', 'top-end', 'bottom-end'], // Specify fallback placements
                  },
                },
                {
                  name: 'preventOverflow',
                  options: {
                    boundary: 'viewport', // Prevents tooltip from overflowing the viewport
                    padding: 8, // Adds some space between the tooltip and the viewport edge
                  },
                },
                {
                  name: 'arrow',
                  options: {
                    padding: 8, // Ensure arrow has enough space around it
                  },
                },
              ],
            }}
          >
            <Box component="span" sx={{ flex: '1 1 auto', minWidth: 0 }}>
              <Box component="span" className="label">
                {title}
              </Box>

              {caption && (
                <Tooltip title={caption} placement="top-start">
                  <Box component="span" className="caption">
                    {caption}
                  </Box>
                </Tooltip>
              )}
            </Box>
          </Tooltip>
        )}

        {info && (
          <Box component="span" className="info">
            {info}
          </Box>
        )}

        {hasChild && (
          <Iconify
            width={16}
            className="arrow"
            icon={open ? 'eva:arrow-ios-downward-fill' : 'eva:arrow-ios-forward-fill'}
          />
        )}
      </StyledNavItem>
    );

    // Hidden item by role
    if (roles && !roles.includes(`${currentRole}`)) {
      return null;
    }

    if (hasChild) {
      return renderContent;
    }

    if (externalLink)
      return (
        <Link
          href={path}
          target="_blank"
          rel="noopener"
          color="inherit"
          underline="none"
          sx={{
            ...(disabled && {
              cursor: 'default',
            }),
          }}
        >
          {renderContent}
        </Link>
      );

    return (
      <>
        <Link
          component={RouterLink}
          href={path}
          color="inherit"
          underline="none"
          sx={{
            ...(disabled && {
              cursor: 'default',
            }),
          }}
        >
          {renderContent}
        </Link>
        {/* <ComplaintModal open={modalOpen} onClose={handleMouseLeave} /> */}
        <Modal
          open={modalOpen}
          sx={{
            bgcolor: 'transparent',
            width: '50%',
            '& .MuiBackdrop-root': {
              backgroundColor: 'transparent', // Make the backdrop transparent
            },
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '60%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              bgcolor: 'rgba(0, 0, 0, 0.8)',
              border: '1px solid #000',
              borderRadius: 2,
              boxShadow: 24,
              p: 4,
            }}
          >
            <IconButton
              onClick={handleMouseLeave}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'white',
              }}
            >
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" component="h2" color="white">
              Complaint Section
            </Typography>
            <Typography sx={{ mt: 2, color: '#33a1f1' }}>
              Using the complaint section, you can complain about public problems in your area and
              get immediate redressal of your complaint from your leaders and central and state
              officials and employees. For this, you have to select your problem in the app and
              register your complaint by choosing central and state complaint.
            </Typography>
          </Box>
        </Modal>
      </>
    );
  }
);

NavItem.propTypes = {
  open: PropTypes.bool,
  active: PropTypes.bool,
  path: PropTypes.string,
  depth: PropTypes.number,
  icon: PropTypes.element,
  info: PropTypes.element,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  hasChild: PropTypes.bool,
  caption: PropTypes.string,
  externalLink: PropTypes.bool,
  currentRole: PropTypes.string,
  roles: PropTypes.arrayOf(PropTypes.string),
};

export default NavItem;

// ----------------------------------------------------------------------

const StyledNavItem = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})(({ active, open, depth, theme }) => {
  const subItem = depth !== 1;

  const opened = open && !active;

  const deepSubItem = Number(depth) > 2;

  const noWrapStyles = {
    width: '100%',
    maxWidth: '100%',
    display: 'block',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  };

  const baseStyles = {
    item: {
      marginBottom: 4,
      borderRadius: 8,
      color: theme.palette.text.secondary,
      padding: theme.spacing(0.5, 1, 0.5, 1.5),
    },
    icon: {
      width: 24,
      height: 24,
      flexShrink: 0,
      marginRight: theme.spacing(2),
      color:
        theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
    },
    label: {
      ...noWrapStyles,
      ...theme.typography.body2,
      textTransform: 'capitalize',
      fontWeight: theme.typography[active ? 'fontWeightSemiBold' : 'fontWeightMedium'],
    },
    caption: {
      ...noWrapStyles,
      ...theme.typography.caption,
      color: theme.palette.text.disabled,
    },
    info: {
      display: 'inline-flex',
      marginLeft: theme.spacing(0.75),
    },
    arrow: {
      flexShrink: 0,
      marginLeft: theme.spacing(0.75),
    },
  };

  return {
    // Root item
    ...(!subItem && {
      ...baseStyles.item,
      minHeight: 44,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        display: 'none',
      },
      '& .label': {
        ...baseStyles.label,
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
      },
      ...(active && {
        color:
          theme.palette.mode === 'light' ? theme.palette.primary.main : theme.palette.primary.light,
        backgroundColor: alpha(theme.palette.primary.main, 0.08),
        '&:hover': {
          backgroundColor: alpha(theme.palette.primary.main, 0.16),
        },
      }),
      ...(opened && {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.action.hover,
      }),
    }),

    // Sub item
    ...(subItem && {
      ...baseStyles.item,
      minHeight: 36,
      '& .icon': {
        ...baseStyles.icon,
      },
      '& .sub-icon': {
        ...baseStyles.icon,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          content: '""',
          width: 4,
          height: 4,
          borderRadius: '50%',
          backgroundColor: theme.palette.text.disabled,
          transition: theme.transitions.create(['transform'], {
            duration: theme.transitions.duration.shorter,
          }),
          ...(active && {
            transform: 'scale(2)',
            backgroundColor: theme.palette.primary.main,
          }),
        },
      },
      '& .label': {
        ...baseStyles.label,
      },
      '& .caption': {
        ...baseStyles.caption,
      },
      '& .info': {
        ...baseStyles.info,
      },
      '& .arrow': {
        ...baseStyles.arrow,
      },
      ...(active && {
        color: theme.palette.text.primary,
      }),
    }),

    // Deep sub item
    ...(deepSubItem && {
      paddingLeft: `${theme.spacing(Number(depth))} !important`,
    }),
  };
});
