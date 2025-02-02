import { Link } from 'react-router-dom';

import { Box } from '@mui/system';
import { Grid, Card, Typography, CardContent } from '@mui/material';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
// import FireTruckIcon from '@mui/icons-material/FireTruck';
// import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
// import Image from 'src/components/image/image';

export default function StudentCareer() {
  const cardsData = [
    {
      id: 1,
      title: 'Indeed',
      description: 'Search for jobs, post resumes, and research companies.',
      navigate: 'https://www.indeed.com',
      path: '/assets/images/careers/indeed.png',
    },
    {
      id: 2,
      title: 'LinkedIn Jobs',
      description: 'Find job opportunities and network with professionals.',
      navigate: 'https://www.linkedin.com/jobs',
      path: '/assets/images/careers/LinkedIn.png',
    },
    {
      id: 3,
      title: 'Glassdoor',
      description: 'Discover job listings, company reviews, and salary insights.',
      navigate: 'https://www.glassdoor.com/Job/index.htm',
      path: '/assets/images/careers/glassdoor.png',
    },
    {
      id: 4,
      title: 'Monster',
      description: 'Search for jobs, get career advice, and explore companies.',
      navigate: 'https://www.monster.com',
      path: '/assets/images/careers/monster.png',
    },
    {
      id: 5,
      title: 'CareerBuilder',
      description: 'Explore job listings, build resumes, and find career resources.',
      navigate: 'https://www.careerbuilder.com',
      path: '/assets/images/careers/careerbuilder.png',
    },
    {
      id: 6,
      title: 'SimplyHired',
      description: 'Find job listings, research companies, and get career advice.',
      navigate: 'https://www.simplyhired.com',
      path: '/assets/images/careers/simplyhired.png',
    },
    {
      id: 7,
      title: 'ZipRecruiter',
      description: 'Search for jobs, get email alerts, and apply with ease.',
      navigate: 'https://www.ziprecruiter.com',
      path: '/assets/images/careers/ziprecruiter.png',
    },
    {
      id: 8,
      title: 'Snagajob',
      description: 'Discover hourly jobs, part-time work, and seasonal employment.',
      navigate: 'https://www.snagajob.com',
      path: '/assets/images/careers/Snagajob.png',
    },
    {
      id: 9,
      title: 'Upwork',
      description: 'Discover hourly jobs, part-time work, and seasonal employment.',
      navigate: 'https://www.upwork.com/',
      path: '/assets/images/careers/Upwork.png',
    },
    {
      id: 10,
      title: 'WorkIndia',
      description: 'Discover hourly jobs, part-time work, and seasonal employment.',
      navigate: 'https://www.workindia.in/',
      path: '/assets/images/careers/workIndia.png',
    },
  ];

  return (
    <Box>
      <Grid container spacing={4} sx={{ mt: 2, gridGap: 16, justifyContent: 'space-evenly' }}>
        {cardsData.map((card) => (
          <Grid
            item
            key={card.id}
            xs={10}
            sm={8}
            md={4}
            lg={3}
            sx={{
              borderRadius: '20px',
              // boxShadow: '1px 1px 3px 1px rgba(0, 0, 0, 0.3)',
              boxShadow: '0px 0px 7px 2px rgba(0,0,0,0.15)',
              padding: '0 !important',
              margin: '0 !important',
            }}
          >
            <Link
              to={card.navigate}
              target="_blank"
              style={{ textDecoration: 'none', textAlign: 'center' }}
            >
              <Card sx={{ height: '100%' }}>
                <CardContent>
                  <Box component="img" src={card.path} alt={card.title} />
                  {/* <Typography variant="h5" >
                    {card.title}
                  </Typography> */}
                  <Typography variant="body2" mt={5} color="textSecondary">
                    {card.description}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
