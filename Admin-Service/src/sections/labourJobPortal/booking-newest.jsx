import PropTypes from 'prop-types';
import { useCallback } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
// import Avatar from '@mui/material/Avatar';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useResponsive } from 'src/hooks/use-responsive';

import { fDateTime } from 'src/utils/format-time';

// import Label from 'src/components/label';
// import Image from 'src/components/image';
import Iconify from 'src/components/iconify';
import EmptyContent from 'src/components/empty-content';
import Carousel, { useCarousel, CarouselArrows } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function BookingNewest({ title, subheader, list, res_list, sx, ...other }) {
  const mdUp = useResponsive('up', 'md');

  const router = useRouter();

  const handleViewForm = useCallback(
    (id) => {
      router.push(paths.dashboard.fill_survey.details(id));
    },
    [router]
  );
  const theme = useTheme();

  const carousel = useCarousel({
    slidesToShow: 4,
    responsive: [
      {
        breakpoint: theme.breakpoints.values.lg,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  const openBookings = res_list.filter((item) => item.surveyStatus === 'Open');
  // console.log("openBookings---->", openBookings)

  // If there are fewer than 4 open bookings, render them directly without a carousel

  if (openBookings.length <= 3 && mdUp) {
    return (
      <>
        <CardHeader title={title} subheader={subheader} sx={{ p: 0, mb: 3 }} />
        <Box sx={{ py: 2, display: 'flex', flexDirection: 'row', ...sx }} {...other}>
          {openBookings.length !== 0 ? (
            openBookings.map((item, i) => (
              <BookingItem key={i} item={item} funClick={handleViewForm} />
            ))
          ) : (
            <EmptyContent
              title="No Data"
              description="There are no new surveys available at the moment."
              sx={{ py: 0 }}
            />
          )}
        </Box>
      </>
    );
  }

  return (
    <Box sx={{ py: 2, ...sx }} {...other}>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<CarouselArrows onNext={carousel.onNext} onPrev={carousel.onPrev} />}
        sx={{
          p: 0,
          mb: 3,
        }}
      />

      {/* Render differently based on the number of open bookings */}
      {openBookings.length === 0 && (
        <EmptyContent
          title="No Data"
          description="There are no surveys available at the moment."
          sx={{ py: 10 }}
        />
      )}
      {openBookings.length !== 0 && (
        <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
          {openBookings.map((item, i) => (
            <BookingItem key={i} item={item} funClick={handleViewForm} />
          ))}
        </Carousel>
      )}
    </Box>
  );
}

BookingNewest.propTypes = {
  list: PropTypes.array,
  subheader: PropTypes.string,
  sx: PropTypes.object,
  title: PropTypes.string,
  res_list: PropTypes.object,
};

// ----------------------------------------------------------------------

function BookingItem({ item, funClick }) {
  const {
    surveyName,
    surveyId,
    created_at,
    surveyTitle,
    // surveyStatus
  } = item;

  return (
    <Paper
      sx={{
        mr: 3,
        borderRadius: 2,
        position: 'relative',
        bgcolor: 'background.neutral',
      }}
    >
      <Stack
        spacing={2}
        sx={{
          px: 2,
          pb: 1,
          pt: 2.5,
          minHeight: 130,
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          {/* <Avatar alt={name} src={avatarUrl} /> */}
          <ListItemText
            primary={surveyName}
            secondary={fDateTime(created_at)}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
              color: 'text.disabled',
            }}
          />
        </Stack>

        <Stack
          rowGap={1.5}
          columnGap={3}
          flexWrap="wrap"
          direction="row"
          alignItems="center"
          sx={{ color: 'text.secondary', typography: 'caption' }}
        >
          <Stack direction="row" alignItems="center">
            <Iconify width={16} icon="solar:calendar-date-bold" sx={{ mr: 0.5, flexShrink: 0 }} />
            {surveyTitle}
          </Stack>

          {/* <Stack direction="row" alignItems="center">
            <Iconify
              width={16}
              icon="solar:users-group-rounded-bold"
              sx={{ mr: 0.5, flexShrink: 0 }}
            />
            {guests} Filled
          </Stack> */}
        </Stack>
      </Stack>

      {/* <Label
        variant="filled"
        sx={{
          right: 16,
          zIndex: 9,
          bottom: 16,
          position: 'absolute',
        }}
      >
        {isHot && '🔥'} ${price}
      </Label> */}

      {/* <Box sx={{ p: 1, position: 'relative' }}>
        <Image alt={coverUrl} src={coverUrl} ratio="1/1" sx={{ borderRadius: 1.5 }} />
      </Box> */}

      <div style={{ textAlign: 'center' }}>
        <Button
          variant="outlined"
          onClick={() => funClick(surveyId)}
          style={{ width: '200px', margin: '10px' }}
        >
          Open
        </Button>
      </div>
    </Paper>
  );
}

BookingItem.propTypes = {
  item: PropTypes.object,
  funClick: PropTypes.func.isRequired,
};
