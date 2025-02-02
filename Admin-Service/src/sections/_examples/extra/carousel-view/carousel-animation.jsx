/* eslint-disable no-unused-vars */
// import { useState } from 'react';
import { m } from 'framer-motion';
import PropTypes from 'prop-types';
import ReactPlayer from 'react-player';

import Box from '@mui/material/Box';
import { Stack } from '@mui/system';
import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import { alpha, useTheme } from '@mui/material/styles';

import { bgGradient } from 'src/theme/css';

import Image from 'src/components/image';
import { varFade, MotionContainer } from 'src/components/animate';
import Carousel, { useCarousel, CarouselArrowIndex } from 'src/components/carousel';

// ----------------------------------------------------------------------

export default function CarouselAnimation({ data, btn }) {
  const carousel = useCarousel({
    speed: 800,
    autoplay: true,
  });

  return (
    <Card>
      <Carousel ref={carousel.carouselRef} {...carousel.carouselSettings}>
        {data.map((item, index) => (
          <CarouselItem
            key={item.id}
            item={item}
            active={index === carousel.currentIndex}
            btn={btn}
          />
        ))}
      </Carousel>

      {/* {!data.some(item => item.embedCode) && ( */}
      <CarouselArrowIndex
        index={carousel.currentIndex}
        total={data.length}
        onNext={carousel.onNext}
        onPrev={carousel.onPrev}
      />
      {/* )} */}
    </Card>
  );
}

CarouselAnimation.propTypes = {
  data: PropTypes.array,
  btn: PropTypes.string,
};

// ----------------------------------------------------------------------

function CarouselItem({ item, active, btn }) {
  const theme = useTheme();

  // const [isReady, setIsReady] = useState(false);

  // const handleReady = () => {
  //   setIsReady(true);
  //   console.log('isReady---------->', isReady)
  // };

  const forward = () => {
    window.open(item.path, '_blank');
  };
  const { coverUrl, title, embedCode } = item;

  const variants = theme.direction === 'rtl' ? varFade().inLeft : varFade().inRight;

  return (
    <Paper sx={{ position: 'relative' }}>
      {embedCode ? (
        <Stack
          sx={{
            height: { xs: '200px', sm: '400px', md: '230px' },
            width: '100%',
            bgcolor: 'black',
          }}
        >
          <ReactPlayer
            url={embedCode}
            width="100%"
            height="100%"
            playing
            loop
            muted
            // onReady={()=>handleReady()}
            // light={isReady ? null : coverUrl}
          />
        </Stack>
      ) : (
        <Image dir="ltr" alt={title} src={coverUrl} ratio="16/9" />
      )}
      <Box
        sx={{
          top: 0,
          width: 1,
          height: 1,
          position: 'absolute',
          ...bgGradient({
            direction: 'to top',
            startColor: `${theme.palette.grey[900]} 0%`,
            endColor: `${alpha(theme.palette.grey[900], 0)} 100%`,
          }),
        }}
      />

      <CardContent
        component={MotionContainer}
        animate={active}
        action
        sx={{
          left: 0,
          bottom: 0,
          maxWidth: 720,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <m.div variants={variants}>
          <Typography variant="h4" gutterBottom>
            {item.title}
          </Typography>
        </m.div>

        <m.div variants={variants}>
          <Typography variant="body2" noWrap gutterBottom>
            {item.description}
          </Typography>
        </m.div>

        {/* {btn === "true" && <m.div variants={variants}>
          <Button variant="contained" sx={{ mt: 3 }} color="primary"
            // href={item.path} 
            onClick={forward} >
            View More
          </Button>
        </m.div>
        } */}
      </CardContent>
    </Paper>
  );
}

CarouselItem.propTypes = {
  active: PropTypes.bool,
  btn: PropTypes.string,
  item: PropTypes.object,
};
